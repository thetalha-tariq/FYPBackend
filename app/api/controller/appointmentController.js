const Appointment = require('../models/appointmentModel');
const DoctorSlot = require('../models/doctorSlotModel');
const { sendConfirmationEmail } = require('../../../services/emailService')

module.exports = {
    // Create a new appointment
    createAppointment: async (req, res) => {
        console.log('createAppointment called');
        try {
            const { userId, doctorSlotId, status,name,email,phone,petName,disease,groomingServices,doctorId } = req.body;

            // Check if the slot is already booked
            const slot = await DoctorSlot.findById(doctorSlotId);
            if (!slot) {
                return res.status(400).send({ message: "Doctor slot not found", success: false });
            }
            if (slot.booked) {
                return res.status(400).send({ message: "Doctor slot is already booked", success: false });
            }

            const newAppointment = new Appointment({ userId, doctorSlotId, status,name,email,phone,petName,disease,groomingServices,doctorId });
            await newAppointment.save();

            // Mark the slot as booked
            slot.booked = true;
            await slot.save();

            res.status(200).send({ message: "Appointment created successfully", success: true, data: newAppointment });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Error creating appointment", success: false, error });
        }
    },
    //Restrict User not to book more than one appointment in a day
    // createAppointment: async (req, res) => {
    //     console.log('createAppointment called');
    //     try {
    //         const { userId, doctorSlotId, status, name, email, phone, petName, disease, groomingService, doctorId } = req.body;

    //         // Check if the slot is already booked
    //         const slot = await DoctorSlot.findById(doctorSlotId);
    //         if (!slot) {
    //             return res.status(400).send({ message: "Doctor slot not found", success: false });
    //         }
    //         if (slot.booked) {
    //             return res.status(400).send({ message: "Doctor slot is already booked", success: false });
    //         }

    //         // Check if the user already has an appointment on the same day
    //         const appointmentDate = moment(slot.slotId.date).startOf('day');
    //         const existingAppointment = await Appointment.findOne({
    //             userId,
    //             'doctorSlotId.slotId.date': { $gte: appointmentDate.toDate(), $lt: appointmentDate.add(1, 'day').toDate() }
    //         });

    //         if (existingAppointment) {
    //             return res.status(400).send({ message: "User already has an appointment on this day", success: false });
    //         }

    //         const newAppointment = new Appointment({ userId, doctorSlotId, status, name, email, phone, petName, disease, groomingService, doctorId });
    //         await newAppointment.save();

    //         // Mark the slot as booked
    //         slot.booked = true;
    //         await slot.save();

    //         res.status(200).send({ message: "Appointment created successfully", success: true, data: newAppointment });
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).send({ message: "Error creating appointment", success: false, error });
    //     }
    // },


    // Get an appointment by ID
    getAppointmentById: async (req, res) => {
        console.log('getAppointmentById called');
        try {
            const appointmentId = req.params.appointmentID;
            const appointment = await Appointment.findById(appointmentId)
                                                 .populate({
                                                    path: 'doctorSlotId',
                                                    populate: { path: 'doctorId' }
                                                 })
                                                 .populate('userId');

            if (!appointment) {
                return res.status(404).json({
                    status: "error",
                    message: "Appointment not found",
                    data: null,
                });
            }
            res.status(200).json({
                status: "success",
                message: "Appointment details retrieved successfully",
                data: appointment,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Error retrieving appointment details", success: false, error });
        }
    },

    // Get all appointments
    getAllAppointments: async (req, res) => {
        console.log('getAllAppointments called');
        try {
            const appointments = await Appointment.find()
            .populate({
                path: 'doctorSlotId',
                populate: {
                  path: 'slotId',
                  model: 'slots'
                }
              })
              .populate('userId')
              .populate('doctorId');
            res.status(200).json({
                status: "success",
                message: "All appointments retrieved successfully",
                data: appointments,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Error retrieving appointments", success: false, error });
        }
    },

    // Update an appointment
    updateAppointment: async (req, res) => {
        console.log('updateAppointment called');
        try {
            const appointmentId = req.params.appointmentID;
            const updatedData = req.body;
            
            // Populate the nested fields correctly
            const appointment = await Appointment.findByIdAndUpdate(appointmentId, updatedData, { new: true })
                                                  .populate({
                                                    path: 'doctorSlotId',
                                                    populate: {
                                                      path: 'slotId',
                                                      model: 'slots'
                                                    }
                                                  })
                                                  .populate('userId');

            if (!appointment) {
                return res.status(404).json({
                    status: "error",
                    message: "Appointment not found",
                    data: null,
                });
            }

            if (updatedData.status === 'Confirmed') {
                const slotDetails = {
                    date: appointment.doctorSlotId.slotId.date,
                    startTime: appointment.doctorSlotId.slotId.startTime,
                    endTime: appointment.doctorSlotId.slotId.endTime
                };
                await sendConfirmationEmail(appointment.userId.email, slotDetails);
                
            }
                    
            res.status(200).json({
                status: "success",
                message: "Appointment details updated successfully",
                data: appointment,
            });
        } catch (error) {
            console.error('Error updating appointment details:', error);
            res.status(500).json({
                status: "error",
                message: "Error updating appointment details",
                success: false,
                error: error.message || error,
            });
        }
    },

    // Delete an appointment
    deleteAppointment: async (req, res) => {
        console.log('deleteAppointment called');
        try {
            const appointmentId = req.params.appointmentID;
            const appointment = await Appointment.findByIdAndDelete(appointmentId);
            if (!appointment) {
                return res.status(404).json({
                    status: "error",
                    message: "Appointment not found",
                    data: null,
                });
            }

            // Mark the slot as available again
            const slot = await DoctorSlot.findById(appointment.doctorSlotId);
            if (slot) {
                slot.booked = false;
                await slot.save();
            }

            res.status(200).json({
                status: "success",
                message: "Appointment deleted successfully",
                data: appointment,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Error deleting appointment", success: false, error });
        }
    },
    getAppointmentsByDoctorId: async (req, res) => {
        console.log('getAppointmentsByDoctorId called');
        try {
          const doctorId = req.params.doctorId;
          const appointments = await Appointment.find({ doctorId }).populate({
            path: 'doctorSlotId',
            populate: {
                path: 'slotId',
                model: 'slots'
            }
        }).populate('userId');
    
          if (!appointments) {
            return res.status(404).json({
              status: "error",
              message: "Appointments not found",
              data: null,
            });
          }
          res.status(200).json({
            status: "success",
            message: "Appointments retrieved successfully",
            data: appointments,
          });
        } catch (error) {
          console.log(error);
          res.status(500).send({ message: "Error retrieving appointments", success: false, error });
        }
      },

      getAppointmentsByUserId: async (req, res) => {
        console.log('getAppointmentsByUserId called');
        try {
            const userId = req.params.userId;
    
            const appointments = await Appointment.find({ userId })
                .populate({
                    path: 'doctorSlotId',
                    populate: {
                        path: 'doctorId',
                        model: 'Doctor'
                    }
                })
                .populate({
                    path: 'doctorSlotId',
                    populate: {
                        path: 'slotId',
                        model: 'slots'
                    }
                });
    
            if (!appointments || appointments.length === 0) {
                return res.status(404).json({
                    status: "error",
                    message: "Appointments not found",
                    data: null,
                });
            }
            res.status(200).json({
                status: "success",
                message: "Appointments retrieved successfully",
                data: appointments,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Error retrieving appointments", success: false, error });
        }
    },
};
