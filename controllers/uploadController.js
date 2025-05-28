// controllers/uploadController.js
const { fileTypeFromBuffer } = require('file-type');
const fsPromises = require('fs/promises');
const path = require('path');
const upload = require('../middleware/upload');

exports.uploadImages = (req, res) => {
    upload.array('images', 10)(req, res, async (err) => {
        if (err) {
            return res.render('photos', { error: err.message, title: 'Zdjęcia', images: [] });
        }

        const allowedMime = [
            'image/jpeg', 'image/png', 'image/heic', 'image/jpg'
        ];

        for (const file of req.files) {
            const type = await fileTypeFromBuffer(file.buffer);
            if (!type || !allowedMime.includes(type.mime)) {
                return res.render('photos', { error: `Plik "${file.originalname}" nie jest dozwolonym obrazem.` });
            }

            const fileName = Date.now() + path.extname(file.originalname);
            await fsPromises.writeFile(`public/uploads/${fileName}`, file.buffer);
        }

        res.redirect('/photos');
    });
};
