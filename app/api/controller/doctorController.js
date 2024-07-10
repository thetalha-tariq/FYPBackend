const Doctor = require('../models/doctorModel');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
    // Create a new doctor
    create: async (req, res, next) => {
        try {
            console.log("Received register request:", req.body);
            const doctorExists = await Doctor.findOne({ email: req.body.email });
            if (doctorExists) {
                return res.status(200).send({ message: "Doctor already exists", success: false });
            }
            const password = req.body.password;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            req.body.password = hashedPassword;
            const newDoctor = new Doctor(req.body);
            console.log("Line 19:", req.body);
            await newDoctor.save();
            res.status(200).send({ message: "Doctor created successfully", success: true });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Error creating doctor", success: false, error });
        }
    },

    // Authenticate a doctor
    authenticate: async (req, res, next) => {
        console.log("Received authentication request:", req.body);
        try {
            const doctorInfo = await Doctor.findOne({ email: req.body.email });
            if (!doctorInfo) {
                return res.status(412).json({
                    status: "error",
                    message: "Invalid email/password",
                    data: null,
                });
            }

            const isPasswordValid = await bcrypt.compare(req.body.password, doctorInfo.password);
            if (isPasswordValid) {
                const token = jwt.sign({ id: doctorInfo._id }, req.app.get("secretKey"), {
                    expiresIn: "24h",
                });
                res.json({
                    status: "success",
                    message: "Doctor authenticated successfully",
                    data: { doctor: doctorInfo, token: token },
                });
            } else {
                res.status(412).json({
                    status: "error",
                    message: "Invalid email/password",
                    data: null,
                });
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    },

    // Get doctor details
    getDoctor: async (req, res, next) => {
        try {
            const doctorId = req.params.doctorID;
            console.log("id",doctorId);
            const doctorInfo = await Doctor.findById(doctorId);
            if (!doctorInfo) {
                return res.status(404).json({
                    status: "error",
                    message: "Doctor not found",
                    data: null,
                });
            }
            res.status(200).json({
                status: "success",
                message: "Doctor details retrieved successfully",
                data: doctorInfo,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Error retrieving doctor details", success: false, error });
        }
    },
    getAllDoctors: async (req, res, next) => {
        try {
            const doctors = await Doctor.find();
            res.status(200).json({
                status: "success",
                message: "All Doctors retrieved successfully",
                data: doctors,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Error retrieving doctors", success: false, error });
        }
    },
    // Update doctor details
    updateDoctor :async (req, res, next) => {
        try {
            const doctorId = req.params.doctorID;
            const updatedData = req.body;
    
            // Check if password needs to be updated and hash it
            if (updatedData.password) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(updatedData.password, salt);
                updatedData.password = hashedPassword;
            }
    
            // Find the doctor by ID and update the details
            const doctorInfo = await Doctor.findByIdAndUpdate(doctorId, updatedData, { new: true });
    
            if (!doctorInfo) {
                return res.status(404).json({
                    status: "error",
                    message: "Doctor not found",
                    data: null,
                });
            }
    
            res.status(200).json({
                status: "success",
                message: "Doctor details updated successfully",
                data: doctorInfo,
            });
        } catch (error) {
            console.error('Error updating doctor details:', error);
            res.status(500).json({
                status: "error",
                message: "Error updating doctor details",
                success: false,
                error: error.message || error,
            });
        }
    },
    
    deleteDoctor: async (req, res, next) => {
        try {
            const doctorId = req.params.doctorID;
            const doctorInfo = await Doctor.findByIdAndDelete(doctorId);
            if (!doctorInfo) {
                return res.status(404).json({
                    status: "error",
                    message: "Doctor not found",
                    data: null,
                });
            }

            res.status(200).json({
                status: "success",
                message: "Doctor deleted successfully",
                data: doctorInfo,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Error deleting doctor", success: false, error });
        }
    }

};
