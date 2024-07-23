const express = require('express');
const router = express.Router();
const UserContactDataController = require('../app/api/controller/userContactDataController');


router.post('/create', UserContactDataController.createUserContactData);


router.get('/', UserContactDataController.getAllUserContactData);

module.exports = router;
