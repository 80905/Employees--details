"use strict";

const User = require("../models/formDataModel");
const multer = require("multer");

exports.userData = async (req, res, next) => {
  try {
    console.log(req.body);
    const createUser = await User.create(req.body);
    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: {
        user: createUser,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getData = async (req, res, next) => {
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

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  console.log(file);
  if (file.mimetype.startsWith("image") || file.mimetype.startsWith("pdf")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadimages = upload.array("image");
exports.uploadFiles = async (req, res, next) => {
  const filename = `user-${Date.now()}.jpeg`;
  let query = [
    {
      fileType: req.body.fileType,
      fileName: req.body.fileName,
    },
  ];

  const uploadImages = await User.findByIdAndUpdate(
    { _id: req.params.id },
    { images: query }
  );
};
