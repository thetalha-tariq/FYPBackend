const express = require('express');
const doctorController = require('../app/api/controller/doctorController');
const router = express.Router();

router.post('/create', doctorController.createDoctor);
router.get('/:doctorID', doctorController.getDoctorById);
router.get('/', doctorController.getAllData);
router.get('/groomers',doctorController.getAllGroomers);
router.get('/doctors',doctorController.getAllDoctors);
router.put('/:doctorID', doctorController.updateDoctor);
router.delete('/:doctorID', doctorController.deleteDoctor);
router.post('/loginDoctor', doctorController.authenticateDoctor);



module.exports = router;
