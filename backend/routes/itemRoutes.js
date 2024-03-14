const express = require("express");
const itemController = require("../controllers/ItemController");
const router = express.Router();

// @route - /api/v1/items/
router
  .route("/")
  .get(itemController.getAllItems)
  .post(itemController.createItem);

// @route - /api/v1/items/:id
router
  .route("/:id")
  .put(itemController.updateItemById)
  .delete(itemController.deleteItemById);

module.exports = router;
