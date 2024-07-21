const DoctorSlot = require('../models/doctorSlotModel');

module.exports = {
    // Create a new doctor slot
    createDoctorSlot: async (req, res, next) => {
        try {
            const { doctorId, slotId, day, date, booked } = req.body;
            
            // Check if the slot is already booked for the doctor on the given date
            const slotExists = await DoctorSlot.findOne({ doctorId, slotId, date });
            if (slotExists) {
                return res.status(400).send({ message: "Slot already booked", success: false });
            }

            const newDoctorSlot = new DoctorSlot(req.body);
            await newDoctorSlot.save();
            res.status(200).send({ message: "Doctor slot created successfully", success: true, data: newDoctorSlot });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Error creating doctor slot", success: false, error });
        }
    },

    // Get a doctor slot by ID
    getDoctorSlotById: async (req, res, next) => {
        try {
            const doctorId = req.params.doctorSlotID;
            const doctorSlots = await DoctorSlot.find({ doctorId: doctorId });
            console.log("doctorId:",req.params.doctorSlotID);
    
            if (!doctorSlots.length) {
                return res.status(404).json({
                    status: "error",
                    message: "Doctor slots not found",
                    data: null,
                });
            }
    
            res.status(200).json({
                status: "success",
                message: "Doctor slots details retrieved successfully",
                data: doctorSlots,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Error retrieving doctor slots details", success: false, error });
        }
    },

    // Get all doctor slots
    getAllDoctorSlots: async (req, res, next) => {
        try {
            const doctorSlots = await DoctorSlot.find();
            res.status(200).json({
                status: "success",
                message: "All doctor slots retrieved successfully",
                data: doctorSlots,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Error retrieving doctor slots", success: false, error });
        }
    },

    // Update a doctor slot
    updateDoctorSlot: async (req, res, next) => {
        try {
            const doctorSlotId = req.params.doctorSlotID;
            const updatedData = req.body;
            const doctorSlot = await DoctorSlot.findByIdAndUpdate(doctorSlotId, updatedData, { new: true });

            if (!doctorSlot) {
                return res.status(404).json({
                    status: "error",
                    message: "Doctor slot not found",
                    data: null,
                });
            }

            res.status(200).json({
                status: "success",
                message: "Doctor slot details updated successfully",
                data: doctorSlot,
            });
        } catch (error) {
            console.error('Error updating doctor slot details:', error);
            res.status(500).json({
                status: "error",
                message: "Error updating doctor slot details",
                success: false,
                error: error.message || error,
            });
        }
    },

    // Delete a doctor slot
    deleteDoctorSlot: async (req, res, next) => {
        try {
            const doctorSlotId = req.params.doctorSlotID;
            const doctorSlot = await DoctorSlot.findByIdAndDelete(doctorSlotId);
            if (!doctorSlot) {
                return res.status(404).json({
                    status: "error",
                    message: "Doctor slot not found",
                    data: null,
                });
            }

            res.status(200).json({
                status: "success",
                message: "Doctor slot deleted successfully",
                data: doctorSlot,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Error deleting doctor slot", success: false, error });
        }
    }
};
