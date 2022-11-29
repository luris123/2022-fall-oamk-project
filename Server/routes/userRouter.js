const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
    
router.get('/', userController.getUsers);
router.get('/getView', userController.getView);
router.post('/', userController.createUser);
router.delete('/deleteUser', userController.deleteUser);
router.post('/newView', userController.createNewView);
router.delete('/deleteView', userController.deleteView);

module.exports = router;