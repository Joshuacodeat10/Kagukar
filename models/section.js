const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//DEPARTMENT FOR HOSPITAL : CLASS FOR SCHOOL

const sectionSchema = new Schema({
    image: {
        type: String,
        required: false
    },

    name: String,
    slug: String,
    code: String,
    passCode: String, //Registraton code for Staffs to register under respective section
    date: String,
    type: String, //Whether hospital, primary, commerce e.t.c
    category: String, //for secondary with science, art ----
    map: String,

    mobile: String,
    email: String,

    aboutText: String,
    about: String,

    reviews: String,
    authorid: String,

    verified: {
        type: Boolean,
        default: false
    },

    hod: String,
    //SERVICE HOURS
    mon: String,
    tue: String,
    wed: String,
    thu: String,
    fri: String,
    sat: String,
    sun: String,

    messageCount: String,
    commentCount: {
        type: Number,
        default: 0
    },

    //STATS
    //for staff account type
    staffCount: {
        type: Number,
        default: 0
    },
    //for client account type
    clientCount: {
        type: Number,
        default: 0
    }

})

const Section = new mongoose.model("Section", sectionSchema);

module.exports = Section;