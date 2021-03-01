const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema

const educationSchema = new Schema({
    question: String,
    optionA: String,
    optionB: String,
    optionC: String,
    optionD: String,
    answer: String,

    itemid: String,
})

const Education = new mongoose.model("Education", educationSchema);

module.exports = Education;