const express = require('express');
const appointmentController = require('../app/api/controller/appointmentController');
const router = express.Router();

router.post('/createAppointment', appointmentController.createAppointment);
router.get('/:appointmentID', appointmentController.getAppointmentById);
router.get('/', appointmentController.getAllAppointments);
router.put('/:appointmentID', appointmentController.updateAppointment);
router.delete('/:appointmentID', appointmentController.deleteAppointment);

router.get('/doctor/:doctorId', appointmentController.getAppointmentsByDoctorId);
router.get('/user/:userId',appointmentController.getAppointmentsByUserId);
module.exports = router;

