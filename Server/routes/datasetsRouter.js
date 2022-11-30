const express = require('express');
const router = express.Router();
const datasetsController = require('../controllers/datasetsController');

router.get('/', datasetsController.getAllDatasets);

module.exports = router;