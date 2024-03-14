const express = require("express");
const userController = require("../controllers/UserController");
const router = express.Router();

// @route - /api/v1/users/
router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

// @route - /api/v1/users/:id
router
  .route("/:id")
  .put(userController.updateUserById)
  .delete(userController.deleteUserById);

module.exports = router;
