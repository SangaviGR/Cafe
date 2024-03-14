const Pickup = require("../models/PickUpModel");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

exports.getAllPickups = asyncHandler(async (req, res, next) => {
  const pickups = await Pickup.find();

  res.status(200).json({
    success: true,
    count: pickups.length,
    data: pickups,
  });
});

exports.createPickup = asyncHandler(async (req, res, next) => {
  const pickup = await Pickup.create(req.body);

  res.status(201).json({
    success: true,
    data: pickup,
  });
});

exports.updatePickupById = asyncHandler(async (req, res, next) => {
  let pickup = await Pickup.findById(req.params.id);

  if (!pickup) {
    return next(
      new ErrorResponse(`Pickup with id ${req.params.id} was not found`, 404)
    );
  }

  pickup = await Pickup.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: pickup,
  });
});

exports.deletePickupById = asyncHandler(async (req, res, next) => {
  const pickup = await Pickup.findById(req.params.id);

  if (!pickup) {
    return next(
      new ErrorResponse(`Pickup with id ${req.params.id} was not found`, 404)
    );
  }

  await Pickup.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
