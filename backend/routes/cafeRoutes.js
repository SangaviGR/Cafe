const express = require("express");
const cafeController = require("../controllers/CafeController");
const router = express.Router();

// @route - /api/v1/bootcamps/
router
  .route("/")
  .get(cafeController.getAllCafe)
  .post(cafeController.createNewCafe);

// @route - /api/v1/bootcamps/someid
router
  .route("/:id")
  .put(cafeController.updateCafeById)
  .delete(cafeController.deleteCafeById);

module.exports = router;