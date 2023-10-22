const {
  getAllProducts,
  removeProduct,
  updateProduct,
  getAProduct,
  createProduct,
  upload,
} = require("../controllers/productController");

const router = require("express").Router();

router.post("/", upload.single("thumbnail"), createProduct);
// http://localhost:5050/uploads/{filename}

router.get("/", getAllProducts);
router.delete("/remove/:id", removeProduct);
router.patch("/update/:id", upload.single("thumbnail"), updateProduct);

router.get("/:id", getAProduct);

module.exports = router;
