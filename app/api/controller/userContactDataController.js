const UserContactData = require('../models/UserContactDataModel');

module.exports = {
    createUserContactData: async (req, res, next) => {
        try {
            const newUserContactData = new UserContactData(req.body);
            await newUserContactData.save();
            res.status(200).send({ message: "User contact data created successfully", success: true, data: newUserContactData });
        } catch (error) {
            console.error("Error creating user contact data:", error);
            res.status(500).send({ message: "Error creating user contact data", success: false, error });
        }
    },

    getAllUserContactData: async (req, res, next) => {
        try {
            const userContactData = await UserContactData.find();
            res.status(200).json({
                status: "success",
                message: "All user contact data retrieved successfully",
                data: userContactData,
            });
        } catch (error) {
            console.error("Error retrieving user contact data:", error);
            res.status(500).send({ message: "Error retrieving user contact data", success: false, error });
        }
    },
};
