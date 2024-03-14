const Cafe = require("../models/CafeCollection");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");



exports.getAllCafe = asyncHandler(async (req, res, next) => {
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
  query = Cafe.find(JSON.parse(queryStr));

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
  const limit = parseInt(req.query.limit, 10) || 6;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Cafe.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const cafes = await query;

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
    count: cafes.length,
    pagination,
    data: cafes,
  });
});


// exports.getAllBootcamps = asyncHandler(async (req, res, next) => {
//   let query;

//   // Copy req.query
//   const reqQuery = { ...req.query };

//   // Fields to exclude from query
//   const removeFields = ['select', 'sort', 'page', 'limit'];

//   // Loop over removeFields and delete them from reqQuery
//   removeFields.forEach((param) => delete reqQuery[param]);

//   // Create query string
//   let queryStr = JSON.stringify(reqQuery);

//   // Create operators ($gt, $gte, etc)
//   queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);

//   // Finding resource
//   query = Cafe.find(JSON.parse(queryStr));

//   // Select Fields
//   if (req.query.select) {
//     const fields = req.query.select.split(',').join(' ');
//     query = query.select(fields);
//   }

//   // Sort
//   if (req.query.sort) {
//     const sortBy = req.query.sort.split(',').join(' ');
//     query = query.sort(sortBy);
//   } else {
//     query = query.sort('-createdAt');
//   }

//   // Pagination
//   const page = parseInt(req.query.page, 10) || 1;
//   const limit = parseInt(req.query.limit, 10) || 3;
//   const startIndex = (page - 1) * limit;
//   const endIndex = page * limit;
//   const total = await Cafe.countDocuments();

//   query = query.skip(startIndex).limit(limit);

//   // Executing query
//   const books = await query;

//   // Pagination result
//   const pagination = {};

//   if (endIndex < total) {
//     pagination.next = {
//       page: page + 1,
//       limit,
//     };
//   }

//   if (startIndex > 0) {
//     pagination.prev = {
//       page: page - 1,
//       limit,
//     };
//   }

//   res.status(200).json({
//     success: true,
//     count: books.length,
//     pagination,
//     data: books,
//   });
// });


exports.createNewCafe = asyncHandler(async (req, res, next) => {
  // res.send("create new bootcamp route");

  const cafe = await Cafe.create(req.body);
  res.status(201).json({
    success: true,
    data: cafe,
  });
});

exports.updateCafeById = asyncHandler(async (req, res, next) => {
  // res.send("update cafe By Id");

  let cafe = await Cafe.findById(req.params.id);

  if (!cafe) {
    return next(
      new ErrorResponse(`Book with id ${req.params.id} was not found`, 404)
    );
  }

  cafe = await Cafe.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  
  res.status(201).json({
    success: true,
    data: cafe,
  });
});

exports.deleteCafeById = asyncHandler(async (req, res, next) => {
  // res.send("delete cafe By Id");

  let cafe = await Cafe.findById(req.params.id);

  if (!cafe) {
    return next(
      new ErrorResponse(`Book with id ${req.params.id} was not found`, 404)
    );
  }

  await Cafe.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
