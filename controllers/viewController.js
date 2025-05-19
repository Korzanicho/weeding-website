// controllers/viewController.js
const fs = require('fs');
const path = require('path');

exports.getHome = (req, res) => {
    res.render('index', { title: 'Adrian & Klaudia' });
};

exports.getHistory = (req, res) => {
    res.render('history', { title: 'O nas' });
};

exports.getPhotos = (req, res) => {
    fs.readdir(path.join(__dirname, '../public/uploads'), (err, files) => {
        if (err) {
            return res.render('photos', { title: 'Zdjęcia', images: [], error: 'Błąd wczytywania zdjęć' });
        }
        res.render('photos', { title: 'Zdjęcia', images: files });
    });
};
