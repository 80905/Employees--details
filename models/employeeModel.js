const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  firstName: {
    type: String,
    required: [true, "A user must have a name!!"],
    trim: true,
    maxlength: [
      25,
      "A User first name must have less than or equal to 25 characters!!",
    ],
    minlength: [
      2,
      "A User first name must have more than or equal to 2 characters!!",
    ],
  },
  lastName: {
    type: String,
    required: [true, "A user must have a name!!"],
    trim: true,
    maxlength: [
      25,
      "A user last  name must have less than or equal to 25 characters!!",
    ],
    minlength: [
      2,
      "A user last name must have more than or equal to 2 characters!!",
    ],
  },
  email: {
    type: String,
    required: [true, "A user must have an email id!!"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email id!"],
  },
  password: {
    type: String,
    required: [true, "A user must have a password!!"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "A user must have a passwordConfirm!!"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not same!!",
    },
  },
  profileImage: [
    {
      profilePicId: String,
      url: String,
    },
  ],
  country: {
    type: String,
  },
  phoneNumber: {
    type: String,
    unique: true,
  },
  createdAT: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.comparePassword = async function (
  loginPassword,
  signupPassword
) {
  return await bcrypt.compare(loginPassword, signupPassword);
};
const User = mongoose.model("User", userSchema);
module.exports = User;
