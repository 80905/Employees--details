"use strict";

const User = require("../models/formDataModel");

exports.userData = async (req, res, next) => {
  try {
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
