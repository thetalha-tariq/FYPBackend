const express = require("express");
const router = express.Router();
const userController = require('../app/api/controller/userController')




router.post('/register', userController.create);
router.post("/login", userController.authenticate);
router.delete('/:userId', userController.deleteuser);
router.put('/:userId', userController.updateuser);
router.get('/:userId', userController.getuserId);
router.get('/', userController.getAllUsers);


router.post('/forgotPassword', userController.forgotPassword);
router.post('/resetPassword', userController.resetPassword);
module.exports = router;
