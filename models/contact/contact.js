const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
//NOTIFICATION OR contact
const contactSchema = new Schema({
    sender: String,
    image: {
        type: String,
        required: false
    },
    type: String, //Complaint, Commendation, Suggestion
    reciever: String, //department of concern
    subject: String,
    details: String,
    time: String,
    date: String,

    files: String,//under probation
})

const Contact = new mongoose.model("Contact", contactSchema);

module.exports = Contact;