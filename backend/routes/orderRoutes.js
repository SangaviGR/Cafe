const express = require("express");
const orderController = require("../controllers/OrderController");
const router = express.Router();

// @route - /api/v1/orders/
router
  .route("/")
  .get(orderController.getAllOrders)
  .post(orderController.createOrder);

// @route - /api/v1/orders/:id
router
  .route("/:id")
  .put(orderController.updateOrderById)
  .delete(orderController.deleteOrderById);

module.exports = router;
