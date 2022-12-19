const express = require("express");

const {
  signUp,
  login,
  uploadimages,
  uploadFiles,
  updateUser,
  getUser,
  deleteUser,
} = require("../controllers/employeeController");

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.patch("/upload-files/:id", uploadimages, uploadFiles);
router.patch("/update-user/:id", updateUser);
router.get("/get-user", getUser);
router.delete("/delete-user/:id", deleteUser);

module.exports = router;
