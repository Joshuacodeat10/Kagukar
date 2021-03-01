const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema

const awardSchema = new Schema({
    itemTitle: String,
    userid: String,
    point: Number,
}, {timestamps: true})

const Award = new mongoose.model("Award", awardSchema);

module.exports = Award;