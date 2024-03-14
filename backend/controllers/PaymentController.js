const Payment = require("../models/PaymentModel");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

exports.getAllPayments = asyncHandler(async (req, res, next) => {
  const payments = await Payment.find();

  res.status(200).json({
    success: true,
    count: payments.length,
    data: payments,
  });
});

exports.createPayment = asyncHandler(async (req, res, next) => {
  const payment = await Payment.create(req.body);

  res.status(201).json({
    success: true,
    data: payment,
  });
});

exports.updatePaymentById = asyncHandler(async (req, res, next) => {
  let payment = await Payment.findById(req.params.id);

  if (!payment) {
    return next(
      new ErrorResponse(`Payment with id ${req.params.id} was not found`, 404)
    );
  }

  payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    success: true,
    data: payment,
  });
});

exports.deletePaymentById = asyncHandler(async (req, res, next) => {
  const payment = await Payment.findById(req.params.id);

  if (!payment) {
    return next(
      new ErrorResponse(`Payment with id ${req.params.id} was not found`, 404)
    );
  }

  await Payment.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
