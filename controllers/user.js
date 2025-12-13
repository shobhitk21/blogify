const mongoose = require("mongoose");
const User = require("../models/user");
const Blog = require("../models/blog");
const Comment = require("../models/comment");

async function handleUserSignup(req, res) {
    const { fullName, email, password } = req.body;
    await User.create({
        fullName,
        email,
        password,
    })

    res.render("login")         //P - login user directly to home page
}


async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    try {
        const token = await User.matchedPasswordAndGenerateCookie(email, password);
        return res.cookie("token", token).redirect("/");

    } catch (error) {
        res.render("login", {
            error: "incorrect email or password"
        });
    }
}

async function handleAddNewBlog(req, res) {
    const { title, body } = req.body;
    // const coverImageURL = ;



    await Blog.create({
        title,
        body,
        coverImageURL: req.file.filename,
        createdBy: req.user.id,
    })

    res.redirect("/")
}

async function handleNewComment(req, res) {
    const { content } = req.body;
    const com = await Comment.create({
        content,
        blogId: req.params.blogID,
        createdBy: req.user.id,
    })
    res.redirect(`/blog/${req.params.blogID}`)
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
    handleAddNewBlog,
    handleNewComment,
}