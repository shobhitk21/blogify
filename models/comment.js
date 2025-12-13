const { mongoose, model, Schema } = require("mongoose");

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
    },
    blogId: {
        type: Schema.Types.ObjectId,
        ref: "blog"
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
}, { timestamps: true });

const Comment = model("comment", commentSchema);

module.exports = Comment;
