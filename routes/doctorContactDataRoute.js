const express = require('express');
const router = express.Router();
const DoctorContactDataController = require('../app/api/controller/doctorContactDataController');


router.post('/create', DoctorContactDataController.createDoctorContactData);


router.get('/', DoctorContactDataController.getAllDoctorContactData);

module.exports = router;
