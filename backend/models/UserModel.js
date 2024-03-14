const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for the user"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email for the user"],
    unique: true,
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      "Please provide a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Please provide a password for the user"],
    minlength: 6,
    select: false, // Hide password from query results
  },
  location: {
    type: String,
    required: [true, "Please provide a location for the user"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
