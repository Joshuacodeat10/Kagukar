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
    useNewUrlParser: true,
    useUnifiedTopology: true
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
const pageContent = require("./routes/clients/pages/blog");
const pageSection = require("./routes/clients/pages/section");
const pageInfo = require("./routes/clients/pages/info");
const pagePeople = require("./routes/clients/pages/person");
const pageAuth = require("./routes/clients/pages/auth");


app.get('/', (req, res)=>{
    // Master.findOne({}, (err, master) => {
        // if (err) throw err;
        // Content.find({}, (err, contents) => {
            // if (err) throw err;
            Users.find({}, (err, users) => {
                // if (err) throw err;
                res.render("client/secondary/pages/index", {
                    csrfToken: req.csrfToken(),
                    master,
                    user: req.user,
                    // contents
                });
            })
        // })
    // })
})


//USE ITEMS ROUTES -
app.use("/page/auth", pageAuth); //--- LOGIN CLIENT SIDE
app.use("/page/contents", pageContent); //--- BLOG CLIENT SIDE
app.use("/page/info", pageInfo); //--- CLIENT SIDE ORGANIZATION INFORMATIONS {about, polict etc.}
app.use("/page/section", pageSection); //--- DEPARTMENTS CLIENT SIDE
app.use("/page/user", pagePeople); //--- USERS CLIENT SIDE


//DASHBOARD ROUTES
app.use('/api/admin', admin);
app.use('/admin/dashboard', adminDashboard);
app.use('/admin/dashboard/settings', adminSettings);

app.use('/dashboard/blog', blog);

//ADD DOCTOR, TEACHER, STUDENT, PATIENT, AGENT etc.
app.use('/dashboard/person', person);

//ADD DEPARTMENT, CLASS, STORE, PATIENT, AGENT etc.
app.use('/dashboard/section', section);
app.use('/dashboard/components', component);

app.use("/api/auth", users);
app.use("/api/items", items);
app.use("/api/users", users);
app.use("/api/blog", blog);


//ERROR 404 OUTLINE//////////////////////////////////////////////////////
app.use(function (req, res, next) {
    res.status(404).render("dashboard/pages/error/error404"
        // , {
        //   csrfToken: req.csrfToken()
        // }
    );
})

app.use(function (req, res, next) {
    res.status(500)
        .render("dashboard/pages/error/error500"
            // , {
            //   csrfToken: req.csrfToken()
            // }
        );
})





let port = process.env.PORT;
if (port == null || port == "") {
    port = 1200;
}

app.listen(port, function () {
    console.log("Server started on port successfully.");
});