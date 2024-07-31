const User = require('../models/userModel')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
module.exports = {

    create: async (req, res, next) => {
        try {
            console.log("Received register request:", req.body);
            const userExits = await User.findOne({ email: req.body.email });
            if (userExits) {
                console.log("user already exist")
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
    },

    forgotPassword: async (req, res, next) => {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({
                    status: "error",
                    message: "User with this email does not exist",
                });
            }

            const resetToken = crypto.randomBytes(32).toString("hex");
            const hash = await bcrypt.hash(resetToken, 10);

            user.resetPasswordToken = hash;
            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
            await user.save();

            const resetUrl = `http://localhost:3000/resetPassword?token=${resetToken}&id=${user._id}`;

            const transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });
            console.log('Email Username:', process.env.EMAIL_USER);
            console.log('Email Password:', process.env.EMAIL_PASS);
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: user.email,
                subject: "Password Reset",
                text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
                      `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
                      `${resetUrl}\n\n` +
                      `If you did not request this, please ignore this email and your password will remain unchanged.\n`
            };
            console.log('Email Password:', process.env.EMAIL_PASS);
            console.log(mailOptions)
            await transporter.sendMail(mailOptions);
            console.log('Email Password:', process.env.EMAIL_PASS);
            res.status(200).json({
                status: "success",
                message: "Password reset email sent successfully",
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Error sending password reset email", success: false, error });
        }
    },

    resetPassword: async (req, res, next) => {
        try {
            const { token, id } = req.query;
            const { password } = req.body;
            console.log(req.body);
            console.log(req.query);
            const user = await User.findById(id);
            if (!user) {
                return res.status(400).json({
                    status: "error",
                    message: "Invalid or expired password reset token",
                });
            }
            console.log(token);
            console.log(user.resetPasswordToken);
            const isTokenValid = await bcrypt.compare(token, user.resetPasswordToken);
            if (!isTokenValid) {
                return res.status(400).json({
                    status: "error",
                    message: "Invalid or expired password reset token",
                });
            }

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save();

            res.status(200).json({
                status: "success",
                message: "Password reset successfully",
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Error resetting password", success: false, error });
        }
    }
}