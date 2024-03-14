const express = require("express");
const pickupController = require("../controllers/PickUpController");
const router = express.Router();

router
  .route("/")
  .get(pickupController.getAllPickups)
  .post(pickupController.createPickup);

router
  .route("/:id")
  .put(pickupController.updatePickupById)
  .delete(pickupController.deletePickupById);

module.exports = router;
