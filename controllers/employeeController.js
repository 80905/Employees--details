"use strict";

const User = require("../models/employeeModel");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const Email = require("../utils/email");
const { s3Uploadv2 } = require("../utils/s3image");

//Generating token.........................
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

//Sign up the User and send mail........................
exports.signUp = async (req, res, next) => {
  try {
    console.log(req.body);
    const findUser = await User.find({
      $or: [{ email: req.body.email }, { phoneNumber: req.body.phoneNumber }],
    }).lean();

    if (findUser.length > 0) {
      return res.status(400).json({
        status: "fail",
        message: `Email or phone number is already exist ! Kindly try another.`,
      });
    }
    const findUsers = await User.find().lean();
    const obj = req.body;
    const id = findUsers.length + 1;

    obj.id = id;

    const createUser = await User.create(obj);

    const token = createToken(createUser._id);

    await new Email(createUser).sendWelcome();

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      token,
      data: {
        user: createUser,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

//Log in the User.............................
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Kindly provide the emial and password",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password, user.password))) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect email or password!",
      });
    }

    const token = createToken(user._id);

    res.status(200).json({
      status: "success",
      message: "You are logged in successfully !",
      token,
    });
  } catch (error) {
    console.log(error.message);
  }
};

//Upload profile pic of user...............
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  console.log(file);
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadimages = upload.array("profileImage", 1);

exports.uploadFiles = async (req, res, next) => {
  try {
    const result = await s3Uploadv2(req.files);

    const update = await User.findOneAndUpdate(
      { _id: req.params.Id },
      {
        $set: {
          profileImage: {
            profilePicId: result[0].ETag.split('"')[1],
            url: result[0].Location,
          },
        },
      }
    );

    res.status(200).json({
      status: "success",
      message: "Profile Image uploaded successfully ",
      data: { update },
    });
  } catch (error) {
    console.log(error);
  }
};

//Update the User by id.......................
exports.updateUser = async (req, res, next) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: "success",
      message: "User updated successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

//Get all the Users......................
exports.getUser = async (req, res, next) => {
  try {
    const getUser = await User.find();
    res.status(200).json({
      status: "success",
      message: "User created successfully",
      data: {
        user: getUser,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

//Delete User By their Id................
exports.deleteUser = async (req, res, next) => {
  try {
    const deleteUser = await User.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
