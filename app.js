require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { checkForAuthCookie } = require("./middleware/auth");

// MongoDB 
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err));

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

// Routes
app.use("/user", staticRouter);
app.use("/user", userRouter);
app.use("/", urlRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
