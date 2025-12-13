const express = require("express")
const User = require("../models/user")
const Blog = require("../models/blog")
const Comment = require("../models/comment");
// const { comment } = require("postcss");

async function handleHomePage(req, res) {

    const allBlogs = await Blog.find({});

    res.render("home", {
        user: req.user,
        blogs: allBlogs,
    })
}

async function handleCreateNewBLog(req, res) {
    res.render("addBlog", {
        user: req.user
    })
}

async function handleReadFullBlog(req, res) {
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    const comment = await Comment.find({ blogId: req.params.id }).populate("createdBy");
    res.render("blog", {
        user: req.user,
        blog,
        comment
    })
}

module.exports = { handleHomePage, handleCreateNewBLog, handleReadFullBlog }