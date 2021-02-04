const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema

const awardSchema = new Schema({
    degree: String,
    school: String,
    duration: String,
    userid: String,
})

const Award = new mongoose.model("Award", awardSchema);

module.exports = Award;