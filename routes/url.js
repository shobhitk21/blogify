const express = require("express");
const router = express.Router();
const { handleHomePage, handleCreateNewBLog, handleReadFullBlog } = require("../controllers/url")

router.get("/", handleHomePage)

router.get("/logout", (req, res) => {
    res.clearCookie("token").redirect("/")
})

router.get("/add-new-blog", handleCreateNewBLog)

router.get("/blog/:id", handleReadFullBlog)

module.exports = router;