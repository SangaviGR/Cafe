const Order = require("../models/OrderModel");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

exports.getAllOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find();

  res.status(200).json({
    success: true,
    count: orders.length,
    data: orders,
  });
});

exports.createOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.create(req.body);

  res.status(201).json({
    success: true,
    data: order,
  });
});

exports.updateOrderById = asyncHandler(async (req, res, next) => {
  let order = await Order.findById(req.params.id);

  if (!order) {
    return next(
      new ErrorResponse(`Order with id ${req.params.id} was not found`, 404)
    );
  }

  order = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    success: true,
    data: order,
  });
});

exports.deleteOrderById = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(
      new ErrorResponse(`Order with id ${req.params.id} was not found`, 404)
    );
  }

  await Order.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
