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

var csrfProtection = csrf();
app.use(csrfProtection);

mongoose.connect("mongodb+srv://vicheans:olateju@inventorydb.azfda.mongodb.net/portalDB", {
// mongoose.connect("mongodb://localhost:27017/portalDB", {
    useNewUrlParser: true
});

mongoose.set("useCreateIndex", true);

const Master = require("./models/master");
const Content = require("./models/blog");
const Users = require("./models/user");



app.get('/', (req, res)=>{
    Master.findOne({}, (err, master) => {
        // if (err) throw err;
        Content.find({}, (err, contents) => {
            // if (err) throw err;
            Users.find({}, (err, users) => {
                // if (err) throw err;
                res.render("client/secondary/pages/index", {
                    csrfToken: req.csrfToken(),
                    master,
                    user: req.user,
                    contents
                });
            })
        })
    })
})


let port = process.env.PORT;
if (port == null || port == "") {
    port = 1200;
}

app.listen(port, function () {
    console.log("Server started on port successfully.");
});