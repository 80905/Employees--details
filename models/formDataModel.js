const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "A User must have a name!!"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "A User must have a name!!"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "A user must have an email id!!"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email id!"],
  },

  dateOfBirth: {
    type: Date,
    required: [true, "A user must have a date of birth !"],
  },

  addressess: [{}],
  images: [
    {
      fileName: String,
      fileType: String,
    },
  ],
  pdf: [
    {
      fileName: String,
      fileType: String,
    },
  ],
  createdAT: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
