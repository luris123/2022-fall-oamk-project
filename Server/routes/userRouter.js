const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
    
router.get('/', userController.getUsers);
router.get('/getView', userController.getView);
router.post('/', userController.createUser);
router.delete('/deleteUser', userController.deleteUser);
router.post('/newView', userController.createNewView);
router.delete('/deleteView', userController.deleteView);

router.route('/')
    .get(userController.getUsers)
    .post(userController.createUser);

router.route('/getView')
    .post(userController.getView);

router.route('/deleteUser')
    .delete(userController.deleteUser);

router.route('/newView')
    .post(userController.createNewView);

router.route('/deleteView')
    .delete(userController.deleteView);

module.exports = router;