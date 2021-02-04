const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
//NOTIFICATION OR MESSAGE
const messageSchema = new Schema({
    sender: String,
    reciever: String,
    details: String,
    type: String, //message or notification: share, like, tag  
    time: String,
    date: String,
})

const Message = new mongoose.model("Message", messageSchema);

module.exports = Message;