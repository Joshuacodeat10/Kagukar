const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema

const experienceSchema = new Schema({
    position: String,
    organization: String,
    duration: String,
    userid: String,
})

const Experience = new mongoose.model("Experience", experienceSchema);

module.exports = Experience;