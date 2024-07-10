const Slot = require('../models/slotModel');

module.exports = {
    // Create a new slot
    createSlot: async (req, res, next) => {
        try {
            const { startTime, endTime } = req.body;
            
            // Check if the slot already exists
            const slotExists = await Slot.findOne({ startTime, endTime });
            if (slotExists) {
                return res.status(400).send({ message: "Slot already exists", success: false });
            }

            const newSlot = new Slot(req.body);
            await newSlot.save();
            res.status(200).send({ message: "Slot created successfully", success: true, data: newSlot });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Error creating slot", success: false, error });
        }
    },

    // Get a slot by ID
    getSlotById: async (req, res, next) => {
        try {
            const slotId = req.params.slotID;
            const slot = await Slot.findById(slotId);
            if (!slot) {
                return res.status(404).json({
                    status: "error",
                    message: "Slot not found",
                    data: null,
                });
            }
            res.status(200).json({
                status: "success",
                message: "Slot details retrieved successfully",
                data: slot,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Error retrieving slot details", success: false, error });
        }
    },

    // Get all slots
    getAllSlots: async (req, res, next) => {
        try {
            const slots = await Slot.find();
            res.status(200).json({
                status: "success",
                message: "All slots retrieved successfully",
                data: slots,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Error retrieving slots", success: false, error });
        }
    },

    // Update a slot
    updateSlot: async (req, res, next) => {
        try {
            const slotId = req.params.slotID;
            const updatedData = req.body;
            const slot = await Slot.findByIdAndUpdate(slotId, updatedData, { new: true });

            if (!slot) {
                return res.status(404).json({
                    status: "error",
                    message: "Slot not found",
                    data: null,
                });
            }

            res.status(200).json({
                status: "success",
                message: "Slot details updated successfully",
                data: slot,
            });
        } catch (error) {
            console.error('Error updating slot details:', error);
            res.status(500).json({
                status: "error",
                message: "Error updating slot details",
                success: false,
                error: error.message || error,
            });
        }
    },

    // Delete a slot
    deleteSlot: async (req, res, next) => {
        try {
            const slotId = req.params.slotID;
            const slot = await Slot.findByIdAndDelete(slotId);
            if (!slot) {
                return res.status(404).json({
                    status: "error",
                    message: "Slot not found",
                    data: null,
                });
            }

            res.status(200).json({
                status: "success",
                message: "Slot deleted successfully",
                data: slot,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Error deleting slot", success: false, error });
        }
    }
};
