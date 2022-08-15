const express = require("express");
const app = express();
// const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const errorMiddleware = require("./middleware/errors");

// app.use(cors);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

// import all routes
const auth = require("./routes/auth");
const attendance = require("./routes/attendance");

app.use("/api/v1/auth", auth);
app.use("/api/v1/attendance", attendance);

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
