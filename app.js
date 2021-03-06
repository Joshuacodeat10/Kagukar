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
    }));

app.use(passport.initialize());
app.use(passport.session());

var csrfProtection = csrf();
app.use(csrfProtection);

mongoose.connect("mongodb+srv://User:user@kagukar-cluster.fol4w.mongodb.net/myFirstDatabase", {
// mongoose.connect("mongodb://localhost:27017/portalDB", {
    useNewUrlParser: true,
    // useUnifiedTopology: true
});

mongoose.set("useCreateIndex", true);

const Master = require("./models/master");
const Content = require("./models/blog");
const Users = require("./models/user");
const Experience = require("./models/person/experience");
const Education = require("./models/person/education");

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
                    contents, param: ''
                });
            })
        })
    })
})

//DASHBOARD ROUTES
app.use('/api/admin', admin);
app.use('/admin/dashboard', adminDashboard);
app.use('/admin/dashboard/settings', adminSettings);
// app.use('/dashboard/contents', blog);
app.use('/dashboard/blog', blog);

app.get('/dashboard/contents', (req, res)=>{
    res.redirect('/dashboard/blog/all')
});


// app.use("/page/blog", pageBlog); //--- BLOG CLIENT SIDE


//ADD DOCTOR, TEACHER, STUDENT, PATIENT, AGENT etc.
app.use('/dashboard/person', person);

//ADD DEPARTMENT, CLASS, STORE, PATIENT, AGENT etc.
app.use('/dashboard/section', section);
app.use('/dashboard/components', component);

app.use("/api/auth", users);
app.use("/api/items", items);
app.use("/api/users", users);
app.use("/resources", pageBlog);


app.get("/profile", (req, res)=>{
    if(req.isAuthenticated()){
    Master.findOne({}, (err, master)=>{
     Experience.find({userid: req.user.id}, (err, foundExp)=>{

                    // csrfToken: req.csrfToken(),
       res.render("client/secondary/pages/profile", {user: req.user, master, 
                    csrfToken: req.csrfToken(), foundExp, param: ''
                    })
        })
     })
    }else{
        res.redirect('/')
    }
})

app.get("/info/:info", (req, res) => {

    Master.findOne({}, (err, master) => {
        res.render("client/secondary/pages/info", {
            user: req.user,
                    csrfToken: req.csrfToken(),
                        master, param: req.params.info
        })
    })
})



app.get("/update/profile", (req, res) => {
    if (req.isAuthenticated()) {
        Master.findOne({}, (err, master) => {
            csrfToken: req.csrfToken(),
            res.render("client/secondary/pages/kaguAuth", {
                user: req.user,
                master, page:"admin",
                csrfToken: req.csrfToken(), param: ''
            })
        })
    } else {
        res.redirect('/')
    }
})

app.post('/engage', async (req, res) =>{

console.log(req.body);


var questions
if(req.body.itemType === 'test'){
    questions = await Education.find({itemid: req.body.itemid})
}


// console.log(questions)


if (!req.isAuthenticated()) {
    httpMsgs.sendJSON(req, res, {
        questions
    });
    return
}

const authId = await Content.findOne({_id: req.body.itemid});
// console.log(authId);

const newExp = new Experience({
    ...req.body,
    userid: req.user.id,
    authorid: authId.authorid,
    count: 1
})

    Experience.findOne({userid: req.user.id, itemid: req.body.itemid}, (err, found)=>{
        if(found){
                Experience.updateOne({
                            userid: req.user.id,
                            itemid: req.body.id,
                        }, {
                            // $inc: {
                            //     'count': 1
                            // }
                            count: found.count+1
                        }, (err) => {

                        })

        }else{
            newExp.save();
        }
    })

    Content.updateOne({
        _id: req.body.itemid
    }, {
        $inc: {
            'views': 1
        }
    }, (err) => {})
    

      httpMsgs.sendJSON(req, res, {
         questions
      });
    
})

// app.use("/explore", explore)

app.use(function (req, res, next) {
    res.status(404).render("dashboard/pages/error/error404", {error: '404', msg: 'Oops ! Sorry We Can\'t Find That Page'});
})


app.use(function (req, res, next) {
    res.status(500)
        .render("dashboard/pages/error/error404", {error: '500', msg: "Oops! Something broke, kindly refresh page and try again."});
})


let port = process.env.PORT;
if (port == null || port == "") {
    port = 1200;
}

app.listen(port, function () {
    console.log("Server started on port successfully.");
});
