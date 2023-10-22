const {
  upload,
  createSiteName,
  getSiteName,
} = require("../controllers/siteNameController");

const router = require("express").Router();

router.post("/", upload.single("image"), createSiteName);
// http://localhost:5050/uploads/{filename}

router.get("/", getSiteName);

module.exports = router;
