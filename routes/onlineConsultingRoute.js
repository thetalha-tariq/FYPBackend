const express = require('express');
const router = express.Router();
const onlineConsultingController = require('../app/api/controller/onlineConsultingController');

router.post('/create', onlineConsultingController.createOnlineConsulting);
router.delete('/:consultingID', onlineConsultingController.deleteOnlineConsulting);
router.put('/:consultingID', onlineConsultingController.updateOnlineConsulting);
router.get('/:consultingID', onlineConsultingController.getOnlineConsultingById);
router.get('/', onlineConsultingController.getAllOnlineConsultings);
router.get('/user/:userId',onlineConsultingController.getOnlineConsultingByUserId);
router.get('/doctor/:doctorId', onlineConsultingController.getOnlineConsultingByDoctorId);
//router.put('/:consultingID', onlineConsultingController.updateOnlineConsultingStatus);
router.put('/approvePayment/:consultingID', onlineConsultingController.approvePayment);

module.exports = router;
