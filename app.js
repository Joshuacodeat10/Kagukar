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

const admin = require("./routes/api/masterRoute");
const adminDashboard = require("./routes/api/masterRoutes/index");
const adminSettings = require("./routes/api/masterRoutes/settings");

//ADD STAFFS/CLIENTS
const person = require("./routes/api/person/person");
const section = require("./routes/api/section/section");
const users = require("./routes/api/userRoute");
const items = require("./routes/api/itemRoute");
const blog = require("./routes/api/blogRoute");
const component = require("./routes/api/components");

//CLIENT ROUTES
const pageBlog = require("./routes/clients/pages/blog");

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

//DASHBOARD ROUTES
app.use('/api/admin', admin);
app.use('/admin/dashboard', adminDashboard);
app.use('/admin/dashboard/settings', adminSettings);

//ADD DOCTOR, TEACHER, STUDENT, PATIENT, AGENT etc.
app.use('/dashboard/person', person);

//ADD DEPARTMENT, CLASS, STORE, PATIENT, AGENT etc.
app.use('/dashboard/section', section);
app.use('/dashboard/components', component);

app.use("/api/auth", users);
app.use("/api/items", items);
app.use("/api/users", users);
app.use("/api/blog", blog);




let port = process.env.PORT;
if (port == null || port == "") {
    port = 1200;
}

app.listen(port, function () {
    console.log("Server started on port successfully.");
});