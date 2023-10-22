const multer = require("multer");
const path = require("path");
const SiteName = require("../models/siteNameandImageModel");

// Set storage for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, uniqueSuffix + extension);
  },
});

// File filter to allow only image file types
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

module.exports.upload = multer({ storage: storage, fileFilter: fileFilter });
module.exports.createSiteName = async (req, res, next) => {
  try {
    const { siteName } = req.body;

    // Clear existing data
    await SiteName.deleteMany({});

    const siteneme = new SiteName({
      siteName,
      image: req.file.filename,
    });

    await siteneme.save();

    res.status(201).json({ message: "siteneme created successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports.getSiteName = async (req, res, next) => {
  try {
    const sitenem = await SiteName.find({});
    res.json(sitenem);
  } catch (error) {
    next(error);
  }
};
