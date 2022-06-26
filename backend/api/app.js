const express = require("express");
const app = express();

// const dotenv = require("dotenv");
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

app.use("/api/v1", auth);

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
