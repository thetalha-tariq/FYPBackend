const express = require('express');
const slotController = require('../app/api/controller/slotController')
const Slot = require("../app/api/models/slotModel");
const router = express.Router();

router.post('/createSlot', slotController.createSlot);
router.get('/:slotID', slotController.getSlotById);
router.get('/', slotController.getAllSlots);
router.put('/:slotID', slotController.updateSlot);
router.delete('/:slotID', slotController.deleteSlot);

module.exports = router;
