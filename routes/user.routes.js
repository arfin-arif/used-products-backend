const { getAllProducts } = require("../controllers/productController");
const { createUser, removeUser, updateUser, getSingleUser, getAllUsers } = require("../controllers/usersController");

const router = require("express").Router();

router
    /**
     *  @apiGet to get all the courses
     *  @url  http://localhost:5000/api/products
     **/
    .post('/register', createUser)
    .delete('/remove/:userId', removeUser)
router
    .patch('/update/:userId', updateUser)

router.get('/:userId', getSingleUser)
router.get('/', getAllUsers)


module.exports = router;