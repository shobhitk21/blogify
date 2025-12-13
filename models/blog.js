const { mongoose, model, Schema } = require("mongoose")


const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true
    },
    coverImageURL: {
        type: String,
        require: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
}, { timestamps: true });

const Blog = model("blog", blogSchema)
module.exports = Blog;