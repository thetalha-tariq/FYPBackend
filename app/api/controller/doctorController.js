const Doctor = require('../models/doctorModel');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
module.exports = {
    // Create a new doctor
    createDoctor: async (req, res, next) => {
        try {
            const { name, specialization,password, email, phone, slotsPerDay } = req.body;
            
            // Check if the doctor already exists
            const doctorExists = await Doctor.findOne({ email });
            if (doctorExists) {
                return res.status(400).send({ message: "Doctor already exists", success: false });
            }

            const newDoctor = new Doctor(req.body);
            await newDoctor.save();
            res.status(200).send({ message: "Doctor created successfully", success: true, data: newDoctor });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Error creating doctor", success: false, error });
        }
    },
    authenticateDoctor: async (req, res) => {
        try {
          const { email, password } = req.body;
    
          // Check if the doctor exists
          const doctor = await Doctor.findOne({ email });
          if (!doctor) {
            return res.status(400).send({ message: "Invalid credentials", success: false });
          }
    
          // Check if the password matches
          if (doctor.password !== password) {
            return res.status(400).send({ message: "Invalid credentials", success: false });
          }
          if(doctor.password==password)
          {
           // return res.status(200).send({ message: "Login Successfully", success: true });
          
            console.log("3")
            const token = jwt.sign({ id: doctor._id }, req.app.get("secretKey"), {
                expiresIn: "24h",
            });
            console.log("4")
            res.json({
                status: "success",
                message: "Doctor found!!!",
                data: { doctor: doctor, token: token },
            });
        } else {

            res.status(412).json({
                status: "error",
                message: "Invalid email/password!!!",
                data: null,
            });
        }
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ message: "Error authenticating doctor", success: false, error });
          }
    },

    // Get a doctor by ID
    getDoctorById: async (req, res, next) => {
        try {
            const doctorId = req.params.doctorID;
            const doctor = await Doctor.findById(doctorId);
            if (!doctor) {
                return res.status(404).json({
                    status: "error",
                    message: "Doctor not found",
                    data: null,
                });
            }
            res.status(200).json({
                status: "success",
                message: "Doctor details retrieved successfully",
                data: doctor,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Error retrieving doctor details", success: false, error });
        }
    },

    // Get all doctors
    getAllData: async (req, res, next) => {
        try {
            const doctors = await Doctor.find();
            res.status(200).json({
                status: "success",
                message: "All doctors retrieved successfully",
                data: doctors,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Error retrieving doctors", success: false, error });
        }
    },

    // Update a doctor
    updateDoctor: async (req, res, next) => {
        try {
            const doctorId = req.params.doctorID;
            const updatedData = req.body;
            const doctor = await Doctor.findByIdAndUpdate(doctorId, updatedData, { new: true });

            if (!doctor) {
                return res.status(404).json({
                    status: "error",
                    message: "Doctor not found",
                    data: null,
                });
            }

            res.status(200).json({
                status: "success",
                message: "Doctor details updated successfully",
                data: doctor,
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

    // Delete a doctor
    deleteDoctor: async (req, res, next) => {
        try {
            const doctorId = req.params.doctorID;
            const doctor = await Doctor.findByIdAndDelete(doctorId);
            if (!doctor) {
                return res.status(404).json({
                    status: "error",
                    message: "Doctor not found",
                    data: null,
                });
            }

            res.status(200).json({
                status: "success",
                message: "Doctor deleted successfully",
                data: doctor,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Error deleting doctor", success: false, error });
        }
    },
    getAllDoctors: async (req, res, next) => {
        try {
            const doctors = await Doctor.find({ role: 'doctor' });
            res.status(200).json({
                status: "success",
                message: "All doctors retrieved successfully",
                data: doctors,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Error retrieving doctors", success: false, error });
        }
    },

    // Get all groomers with role 'groomer'
    getAllGroomers: async (req, res, next) => {
        try {
            const groomers = await Doctor.find({ role: 'groomer' });
            res.status(200).json({
                status: "success",
                message: "All groomers retrieved successfully",
                data: groomers,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Error retrieving groomers", success: false, error });
        }
    }
};
