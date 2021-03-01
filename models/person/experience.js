const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema

const experienceSchema = new Schema({
    itemTitle: String,
    type: String,
    itemid: String,
    userid: String,
    count: Number,
}, {timestamps: true})

const Experience = new mongoose.model("Experience", experienceSchema);

module.exports = Experience;