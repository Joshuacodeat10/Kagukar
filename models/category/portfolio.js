const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
//POSITION OF RESPECTIVE USERS
const portfolioSchema = new Schema({
    name: String,
    description: String,
    ranking: String, //to determine the access level of the account
    count: {
        type: Number,
        default: 0
    }, //Number of people required on the same portfolio
})

const Portfolio = new mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;