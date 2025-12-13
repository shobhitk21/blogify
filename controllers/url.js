const mongoose = require("mongoose");
const Blog = require("../models/blog");
const Comment = require("../models/comment");


async function ensureMongoConnected() {
  if (mongoose.connection.readyState === 1) return;

  await mongoose.connect(process.env.MONGO_URL, {
    serverSelectionTimeoutMS: 5000,
  });
}


async function handleHomePage(req, res) {
  try {
    await ensureMongoConnected();

    const allBlogs = await Blog.find({});

    res.render("home", {
      user: req.user,
      blogs: allBlogs,
    });
  } catch (err) {
    console.error("Home page error:", err);
    res.status(500).send("Failed to load home page");
  }
}

async function handleCreateNewBLog(req, res) {
  try {
    res.render("addBlog", {
      user: req.user,
    });
  } catch (err) {
    console.error("Create blog page error:", err);
    res.status(500).send("Failed to load create blog page");
  }
}

async function handleReadFullBlog(req, res) {
  try {
    await ensureMongoConnected();

    const blog = await Blog.findById(req.params.id).populate("createdBy");
    const comment = await Comment.find({ blogId: req.params.id }).populate(
      "createdBy"
    );

    res.render("blog", {
      user: req.user,
      blog,
      comment,
    });
  } catch (err) {
    console.error("Read blog error:", err);
    res.status(500).send("Failed to load blog");
  }
}

module.exports = {
  handleHomePage,
  handleCreateNewBLog,
  handleReadFullBlog,
};
