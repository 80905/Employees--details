const express = require("express");
const router = require("./routes/formDataRoute");

const app = express();

app.use(express.json());

const formdataRouter = require("./routes/formDataRoute");
app.use("User", formdataRouter);

module.exports = app;
