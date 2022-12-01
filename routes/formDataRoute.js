const express = require("express");

const {
  userData,
  getData,
  uploadimages,
  uploadFiles,
} = require("../controllers/formDataController");

const router = express.Router();

router.post("/create", userData);
router.get("/get", getData);
router.patch("/upload-files/:id", uploadimages, uploadFiles);

module.exports = router;
