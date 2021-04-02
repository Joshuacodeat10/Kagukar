const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema

const experienceSchema = new Schema({
    itemTitle: String,
    itemType: String,
    itemid: String,
    userid: String,
    authorid: String,
    count: Number,
}, {timestamps: true})

const Experience = new mongoose.model("Experience", experienceSchema);

module.exports = Experience;