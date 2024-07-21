const User = require('../models/userModel')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
module.exports = {

    create: async (req, res, next) => {
        try {
            console.log("Received register request:", req.body);
            const userExits = await User.findOne({ email: req.body.email });
            if (userExits) {
                console.log("user already existys")
                return res
                    .status(412)
                    .send({ message: "User Already Exists!!!", success: false });
            }
            const password = req.body.password;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            req.body.password = hashedPassword;
            const newuser = new User(req.body);

            await newuser.save();
            res
                .status(200)
                .send({ message: "User Created SuccessFully", success: true });
        } catch (error) {
            console.log(error);
            res
                .status(500)
                .send({ message: "Error Creating User", success: false, error });
        }
    },
    authenticate: async (req, res, next) => {
        console.log("request -------------->", req.body);
        try {
            const userInfo = await User.findOne({ email: req.body.email });
            console.log("1")

            if (!userInfo) {
                console.log("2")
                res.status(412).json({

                    status: "error",
                    message: "Invalid email/password!!!",
                    data: null,
                });
                return;
            }

            const isPasswordValid = await bcrypt.compare(
                req.body.password,
                userInfo.password
            );
            if (isPasswordValid) {
                console.log("3")
                const token = jwt.sign({ id: userInfo._id }, req.app.get("secretKey"), {
                    expiresIn: "24h",
                });
                console.log("4")
                res.json({
                    status: "success",
                    message: "User found!!!",
                    data: { user: userInfo, token: token },
                });
            } else {

                res.status(412).json({
                    status: "error",
                    message: "Invalid email/password!!!",
                    data: null,
                });
            }
        } catch (error) {
            console.log("00")
            next(error);
        }
    },
}