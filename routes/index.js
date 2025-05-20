// routes/index.js
const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');
const authMiddleware = require('../middleware/auth');
const uploadController = require('../controllers/uploadController');

// Widoki
router.get('/', viewController.getHome);
router.get('/history', viewController.getHistory);
router.get('/photos', authMiddleware, viewController.getPhotos);

// Upload
router.post('/upload', authMiddleware, uploadController.uploadImages);

//login
router.get('/login', (req, res) => {
    res.render('login', { title: 'Dostęp do galerii', error: null });
});

router.post('/login', (req, res) => {
    console.log(req.body, 'req')
    const { password } = req.body;
    if (password === process.env.GALLERY_PASSWORD) {
        req.session.authorized = true;
        return res.redirect('/photos');
    } else {
        res.render('login', { title: 'Dostęp do galerii', error: 'Nieprawidłowe hasło.' });
    }
});

module.exports = router;