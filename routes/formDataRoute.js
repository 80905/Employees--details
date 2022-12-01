const express = require("express");

const { userData, getData } = require("../controllers/formDataController");

const router = express.Router();

router.route("/create").post(userData);
router.route("/get").get(getData);

module.exports = router;
