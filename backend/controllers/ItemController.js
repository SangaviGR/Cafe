const Item = require("../models/Items");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

exports.getAllItems = asyncHandler(async (req, res, next) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude from query
  const removeFields = ['select', 'sort', 'page', 'limit'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);

  // Finding resource
  query = Item.find(JSON.parse(queryStr)).populate('cafeId');

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 3;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Item.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const items = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.status(200).json({
    success: true,
    count: items.length,
    pagination,
    data: items,
  });
});

exports.createItem = asyncHandler(async (req, res, next) => {
  const item = await Item.create(req.body);
  res.status(201).json({
    success: true,
    data: item,
  });
});

exports.updateItemById = asyncHandler(async (req, res, next) => {
  let item = await Item.findById(req.params.id);

  if (!item) {
    return next(
      new ErrorResponse(`Item with id ${req.params.id} was not found`, 404)
    );
  }

  item = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    success: true,
    data: item,
  });
});

exports.deleteItemById = asyncHandler(async (req, res, next) => {
  let item = await Item.findById(req.params.id);

  if (!item) {
    return next(
      new ErrorResponse(`Item with id ${req.params.id} was not found`, 404)
    );
  }

  await Item.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
