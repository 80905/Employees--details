const mongoose = require("mongoose");
const app = require("./app");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

mongoose
  .connect(process.env.DATABASE_LOCAL, {})
  .then(() => console.log("DB connection has been done!!"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(
    `Here I am listening you at port:${port}. Date: ${new Date().toLocaleString()}`
  );
});
