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
    getuserId: async (req, res, next) => {
        try {
            const userId = req.params.userId;
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({
                    status: "error",
                    message: "User not found",
                    data: null,
                });
            }
            res.status(200).json({
                status: "success",
                message: "User details retrieved successfully",
                data: user,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Error retrieving user details", success: false, error });
        }
    },
    getAllUsers: async (req, res, next) => {
        try {
            const users = await User.find();
            res.status(200).json({
                status: "success",
                message: "All Users retrieved successfully",
                data: users,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Error retrieving user", success: false, error });
        }
    },
    updateuser: async (req, res, next) => {
        try {
            const userId = req.params.userId;
            const updatedData = req.body;
            const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });

            if (!user) {
                return res.status(404).json({
                    status: "error",
                    message: "User not found",
                    data: null,
                });
            }

            res.status(200).json({
                status: "success",
                message: "User details updated successfully",
                data: user,
            });
        } catch (error) {
            console.error('Error updating user details:', error);
            res.status(500).json({
                status: "error",
                message: "Error updating user details",
                success: false,
                error: error.message || error,
            });
        }
    },
    deleteuser: async (req, res, next) => {
        try {
            const userId = req.params.userId;
            const user = await User.findByIdAndDelete(userId);
            if (!user) {
                return res.status(404).json({
                    status: "error",
                    message: "User not found",
                    data: null,
                });
            }

            res.status(200).json({
                status: "success",
                message: "User deleted successfully",
                data: user,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Error deleting user", success: false, error });
        }
    }

}