const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema

const educationSchema = new Schema({
    degree: String,
    school: String,
    duration: String,
    userid: String,
})

const Education = new mongoose.model("Education", educationSchema);

module.exports = Education;