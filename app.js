require("dotenv").config();

const express = require("express")
const app = express()
const PORT = process.env.PORT;
const path = require("path")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const { checkForAuthCookie } = require("./middleware/auth")

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("mongodb connected!!"))

const staticRouter = require("./routes/staticRouter")
const userRouter = require("./routes/user")
const urlRouter = require("./routes/url")



app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(checkForAuthCookie("token"))
app.use(express.static(path.resolve("./public")));

app.use("/user", staticRouter)
app.use("/user", userRouter)
app.use("/", urlRouter)


app.listen(PORT, () => console.log("server started at port 3000!!"));
