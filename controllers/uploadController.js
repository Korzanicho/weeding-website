const { fileTypeFromBuffer } = require("file-type");
const fsPromises = require("fs/promises");
const path = require("path");
const upload = require("../middleware/upload");
const viewController = require("../controllers/viewController");

exports.uploadImages = (req, res) => {
  upload.array("images", 50)(req, res, async (err) => {
    if (err) {
      return res.render("photos", {
        error: err.message,
        title: "Zdjęcia",
        images: [],
      });
    }

    const allowedMime = ["image/jpeg", "image/png", "image/heic", "image/jpg"];

    const MAX_SIZE = 5 * 1024 * 1024;

    const rejected = [];

    for (const file of req.files) {
      const type = await fileTypeFromBuffer(file.buffer);
      if (!type || !allowedMime.includes(type.mime)) {
        rejected.push({
          message: "Nieprawidłowy typ pliku",
          originalName: file.originalname,
        });
        res.render("photos", {
          error: `Plik "${file.originalname}" nie jest dozwolonym obrazem.`,
        });
        continue;
      }
      if (file.size > MAX_SIZE) {
        rejected.push({
          message: "Za duży rozmiar pliku",
          originalName: file.originalname,
        });
        continue;
      }

      const fileName = Date.now() + path.extname(file.originalname);
      await fsPromises.writeFile(`public/uploads/${fileName}`, file.buffer);
    }

    if (rejected.length > 0) {
      res.body = {
        error: rejected,
      };
      viewController.getPhotos(req, res);
      return;
    }

    res.redirect("/photos");
  });
};
