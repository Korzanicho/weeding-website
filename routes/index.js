// routes/index.js
const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');
const uploadController = require('../controllers/uploadController');

// Widoki
router.get('/', viewController.getHome);
router.get('/history', viewController.getHistory);
router.get('/photos', viewController.getPhotos);

// Upload
router.post('/upload', uploadController.uploadImages);

module.exports = router;