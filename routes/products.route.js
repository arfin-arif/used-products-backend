const { getAllProducts, addProduct, removeProduct, updateProduct, getAProduct, getProducts } = require("../controllers/productController");

const router = require("express").Router();

router
    /**
     *  @apiGet to get all the courses
     *  @url  http://localhost:5000/api/products
     */
    .get('/all', getAllProducts)
    .post('/', addProduct)
    .delete('/remove/:id', removeProduct)
router
    .patch('/update/:id', updateProduct)

router.get('/by-id/:id', getAProduct)
router.get('/', getProducts)

module.exports = router;