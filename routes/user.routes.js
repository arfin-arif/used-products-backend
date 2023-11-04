const {
  removeUser,
  updateUser,
  getSingleUser,
  getAllUsers,
  registerUser,
  loginUser,
} = require("../controllers/usersController");

const router = require("express").Router();
router.post("/login", loginUser);
router
  /**
   *  @apiGet to get all the courses
   *  @url  http://localhost:5050/api/users/register
   **/
  .post("/register", registerUser);

router.delete("/remove/:id", removeUser);
router.patch("/update/:id", updateUser);

router.get("/:id", getSingleUser);
router.get("/", getAllUsers);

module.exports = router;
