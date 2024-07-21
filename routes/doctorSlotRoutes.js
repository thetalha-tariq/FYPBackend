const express = require('express');
const doctorSlotController = require('../app/api/controller/doctorSlotController');
const router = express.Router();

router.post('/createDoctorSlot', doctorSlotController.createDoctorSlot);
router.get('/:doctorSlotID', doctorSlotController.getDoctorSlotById);
router.get('/', doctorSlotController.getAllDoctorSlots);
router.put('/:doctorSlotID', doctorSlotController.updateDoctorSlot);
router.delete('/:doctorSlotID', doctorSlotController.deleteDoctorSlot);

module.exports = router;
