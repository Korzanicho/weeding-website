// controllers/viewController.js
const fs = require('fs');
const path = require('path');

exports.getHome = (req, res) => {
    res.render('index', { title: 'Adrian & Klaudia' });
};

exports.getHistory = (req, res) => {
    const additionalStyles = [
        'https://cdn.jsdelivr.net/npm/lightgallery@2.7.1/css/lightgallery-bundle.min.css',
        '/css/timeline.css'
    ];
    res.render('history', { title: 'O nas', additionalStyles });
};

exports.getPhotos = (req, res) => {
    const additionalStyles = [
        'https://cdn.jsdelivr.net/npm/lightgallery@2.7.1/css/lightgallery-bundle.min.css',
        '/css/gallery.css'
    ];
    const additionalScripts = [
        'https://cdn.jsdelivr.net/npm/lightgallery@2.7.1/lightgallery.min.js',
        'https://cdn.jsdelivr.net/npm/lightgallery@2.7.1/plugins/thumbnail/lg-thumbnail.min.js',
        'https://cdn.jsdelivr.net/npm/lightgallery@2.7.1/plugins/zoom/lg-zoom.min.js',
        '/gallery.js'
    ];
    fs.readdir(path.join(__dirname, '../public/uploads'), (err, files) => {
        if (err) {
            return res.render('photos', { title: 'Zdjęcia', images: [], error: 'Błąd wczytywania zdjęć', additionalStyles, additionalScripts });
        }
        res.render('photos', { title: 'Zdjęcia', images: files, additionalStyles, additionalScripts });
    });
};
