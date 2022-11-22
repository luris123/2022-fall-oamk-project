const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
    
router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.post('/newVisual', userController.createNewVisual);

module.exports = router;