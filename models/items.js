const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema

const itemSchema = new Schema({
    name: {type:String, required: true},
    date: {type: Date, default: Date.now}
})

const Item = new mongoose.model("Item", itemSchema);

module.exports = Item;