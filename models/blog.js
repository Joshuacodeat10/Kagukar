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

     author: String,
     authorid: String,

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
    views: {
        type: Number,
        default: 0
    },

    optionA: String, 
    optionB: String, 
    optionC: String, 
    optionD: String, 
    answer: String,

}, {timestamps: true})

const Blog = new mongoose.model("Blog", blogSchema);

module.exports = Blog;