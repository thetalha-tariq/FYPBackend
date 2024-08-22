const express = require('express');
const doctorController = require('../app/api/controller/doctorController');
const router = express.Router();
const multer = require('multer');
const path = require('path');
// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/DoctorImage/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

router.post('/create', doctorController.createDoctor);
router.get('/:doctorID', doctorController.getDoctorById);
router.get('/', doctorController.getAllData);
router.get('/groomers', doctorController.getAllGroomers);
router.get('/doctors', doctorController.getAllDoctors);
router.put('/:doctorID', doctorController.updateDoctor);
router.put('/:doctorID/changePassword', doctorController.changePassword);
router.put('/:doctorID/uploadPhoto', upload.single('image'), doctorController.uploadPhoto);
router.delete('/:doctorID', doctorController.deleteDoctor);
router.post('/loginDoctor', doctorController.authenticateDoctor);

module.exports = router;
