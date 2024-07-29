const DoctorContactData = require('../models/DoctorContactDataModel');

module.exports = {
    createDoctorContactData: async (req, res, next) => {
        try {
            const newDoctorContactData = new DoctorContactData(req.body);
            await newDoctorContactData.save();
            res.status(200).send({ message: "Doctor contact data created successfully", success: true, data: newDoctorContactData });
        } catch (error) {
            console.error("Error creating doctor contact data:", error);
            res.status(500).send({ message: "Error creating doctor contact data", success: false, error });
        }
    },

    getAllDoctorContactData: async (req, res, next) => {
        try {
            const doctorContactData = await DoctorContactData.find();
            res.status(200).json({
                status: "success",
                message: "All Doctor contact data retrieved successfully",
                data: doctorContactData,
            });
        } catch (error) {
            console.error("Error retrieving doctor contact data:", error);
            res.status(500).send({ message: "Error retrieving doctor contact data", success: false, error });
        }
    },
};
