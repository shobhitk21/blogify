const express = require("express");
const router = express.Router();
const multer = require("multer");
const { handleUserSignup, handleUserLogin, handleAddNewBlog,handleNewComment } = require("../controllers/user")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/uploads")
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9)
        cb(null, `${file.originalname}-${uniqueSuffix}.${file.mimetype.split("/")[1]}`)
    }
})
const upload = multer({ storage: storage })


router.post("/signup", handleUserSignup)

router.post("/login", handleUserLogin)

router.post("/add-new-blog", upload.single("coverImage"), handleAddNewBlog)

router.post("/comment/:blogID",handleNewComment)

module.exports = router;