const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
    
router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.delete('/deleteUser', userController.deleteUser);
router.post('/newVisual', userController.createNewVisual);
router.get('/deleteVisual', userController.deleteVisual);

module.exports = router;