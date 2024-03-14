const express = require("express");
const paymentController = require("../controllers/PaymentController");
const router = express.Router();

// @route - /api/v1/payments/
router
  .route("/")
  .get(paymentController.getAllPayments)
  .post(paymentController.createPayment);

// @route - /api/v1/payments/:id
router
  .route("/:id")
  .put(paymentController.updatePaymentById)
  .delete(paymentController.deletePaymentById);

module.exports = router;
