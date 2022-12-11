const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.route('/')
    .post(userController.createUser);

router.route('/getView')
    .post(userController.getView);

router.route('/deleteUser')
    .post(userController.deleteUser);

router.route('/newView')
    .post(userController.createNewView);

router.route('/deleteView')
    .post(userController.deleteView);

module.exports = router;