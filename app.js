const express = require("express");
// const router = require("./routes/formDataRoute");

const formdataRouter = require("./routes/employeeRoute");
const app = express();

app.use(express.json());

app.use("/user", formdataRouter);

module.exports = app;
