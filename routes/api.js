// routes/api.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

router.get('/photos', authMiddleware, (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = 20;
    const start = (page - 1) * perPage;
    const end = start + perPage;

    fs.readdir(path.join(__dirname, '../public/uploads'), (err, files) => {
        if (err) return res.status(500).json({ error: 'Nie udało się odczytać zdjęć' });

        const sorted = files.sort((a, b) => b.localeCompare(a)); // opcjonalnie
        const chunk = sorted.slice(start, end);
        res.json({ photos: chunk, hasMore: end < files.length });
    });
});

module.exports = router;
