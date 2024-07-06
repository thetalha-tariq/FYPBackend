const express = require("express");
const router = express.Router();
const Doctor = require("../app/api/models/doctorModel");
const DoctorController = require('../app/api/controller/doctorController')

router.post("/create", DoctorController.create);
router.get("/", DoctorController.getAllDoctors);
router.post("/authenticate", DoctorController.authenticate)
router.get("/:doctorID", DoctorController.getDoctor);
router.put("/:doctorID", DoctorController.updateDoctor);
router.delete("/:doctorID", DoctorController.deleteDoctor);

module.exports = router;
