const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema

const subscribeSchema = new Schema({
    userID: String,
    subscription: {
        endpoint: {
            type: String
        },
        expirationTime: {
            type: String,
            default: null
        },
        keys: {
            p256dh: {
                type: String
            },
            auth: {
                type: String
            }
        }
    }
})

const Subscriber = new mongoose.model("Subscriber", subscribeSchema);

module.exports = Subscriber;