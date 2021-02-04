const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
//PORTFOLIO'S SPECIALIZATION FOR HOSPITALS, SUBJECTS FOR SCHOOLS
const categorySchema = new Schema({
    type: String, //main category or sub-category
    image: {
        type: String,
        required: false
    },
    name: String,
    tag: String,
    description: String,
    date: String,
    count: Number, //How many people can keep this position
})

const Category = new mongoose.model("Category", categorySchema);

module.exports = Category;