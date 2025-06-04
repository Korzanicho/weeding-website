// middleware/upload.js
const multer = require("multer");

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|heic/;
  const extname = allowedTypes.test(file.originalname.toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(
      new Error("Nieprawidłowy format pliku. Dozwolone: jpg, jpeg, png, heic."),
    );
  }
};

module.exports = multer({
  storage: multer.memoryStorage(),
  // limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});
