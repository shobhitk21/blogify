require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { checkForAuthCookie } = require("./middleware/auth");

mongoose.set("bufferCommands", false);

let isConnected = false;

const connectMongo = async () => {
  if (isConnected) return;

  await mongoose.connect(process.env.MONGO_URL, {
    serverSelectionTimeoutMS: 5000,
  });

  isConnected = true;
  console.log("MongoDB connected");
};

// Start connection
connectMongo();

app.use(async (req, res, next) => {
    if (mongoose.connection.readyState === 1) {
      return next();
    }
  
    try {
      await connectMongo();
      next();
    } catch (err) {
      res.status(503).send("Database not connected");
    }
  });
  

// ⬇️ CRITICAL middleware (fixes your error)
app.use(async (req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    return next();
  }

  try {
    await connectMongo();
    next();
  } catch (err) {
    return res.status(503).send("Database connection failed");
  }
});

// Routes
const staticRouter = require("./routes/staticRouter");
const userRouter = require("./routes/user");
const urlRouter = require("./routes/url");

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthCookie("token"));
app.use(express.static(path.join(__dirname, "public")));

// Route usage
app.use("/user", staticRouter);
app.use("/user", userRouter);
app.use("/", urlRouter);

module.exports = app;
