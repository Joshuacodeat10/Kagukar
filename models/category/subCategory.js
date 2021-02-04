const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
//SPECIALIZATION FOR HOSPITALS, SUBJECTS FOR SCHOOLS
const subcategorySchema = new Schema({
    category: String, //id of the main category
    image: {
        type: String,
        required: false
    },
    name: String,
    tag: String,
    description: String,
    date: String
})

const Subcategory = new mongoose.model("Subcategory", subcategorySchema);

module.exports = Subcategory;