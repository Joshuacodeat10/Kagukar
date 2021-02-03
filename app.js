//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");


const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
const multer = require("multer");
const regex = require("regex");
const httpMsgs = require("http-msgs");
const csrf = require("csurf");
const fs = require("fs");

const app = express();

app.use(express.static("public"));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true,
}), bodyParser.json());

app.use(
    session({
        secret: "Our little secret.",
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb+srv://vicheans:olateju@inventorydb.azfda.mongodb.net/portalDB", {
    useNewUrlParser: true
});

mongoose.set("useCreateIndex", true);

app.get('/', (req, res)=>{
    res.send("Welcome")
})


let port = process.env.PORT;
if (port == null || port == "") {
    port = 1200;
}

app.listen(port, function () {
    console.log("Server started on port successfully.");
});






