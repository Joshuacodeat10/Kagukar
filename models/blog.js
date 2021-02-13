const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//Create Schema

const blogSchema = new Schema({
    title: String,
  
    slug: String,

    genre: String,
    category: String,

    articleText: String,
    article: String,
    type: String,
    cache: String,

    image: {
        type: String,
        required: false
    },

     author: {
         type: Schema.Types.ObjectId,
         ref: "User"
     },

    published: {
        type: Boolean,
        default: false
    },

    //STATS
    commentCount: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    views: [{
        type: Schema.Types.ObjectId,
        ref: "User", default: 0
    }],

    answer: String,

}, {timestamps: true})

const Blog = new mongoose.model("Blog", blogSchema);

module.exports = Blog;