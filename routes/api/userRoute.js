//jshint esversion:6
const express = require("express");
const router = express.Router();
const passport = require("passport");
const httpMsgs = require("http-msgs");

const User = require("../../models/user");
const Experience = require("../../models/person/experience");
const options = require("../../config/options");
const notif = require("../../config/response");
const resetPass = require("../../config/reset");
const fileUpload = require("../../config/fileUpload")
const page = "user"


//LOGIN RENDER ROUTE
router.get("/", (req, res) => {

if (req.isAuthenticated() && req.user.cache !== "administrator" || req.isAuthenticated() && req.user.cache !== "creator") {
  res.redirect("/")
}

  User.find({}, (err, users) => {
    if (users.length === 0) {
      User.register({
          // username: process.env.DEF_ADMIN.toLowerCase(),
          // name: process.env.NAME,
          // date: new Date().toLocaleDateString("en-US", options),
          // secret: process.env.SECRET,
          // cache: process.env.CACHE
          username: 'christianovik009@gmail.com',
          name:'Victor Olateju',
          date: new Date().toLocaleDateString("en-US", options),
          secret: 'master',
          cache:'administrator',
        },
        // process.env.DEF_PASS,
          'olupemi',
        function (err, user) {
          console.log("User Initialized Successfully");
        }
      );
    }
  });

  // res.json({ csrfToken: req.csrfToken() });
  // if (req.isAuthenticated()) {
  //   res.redirect("/dashboard");
  // } else {
  res.render("dashboard/pages/login/userLogin", {
    csrfToken: req.csrfToken(),
    page, user: req.user
  });
  // }
});

// --- @LOGIN POST ROUTE
router.post("/", function (req, res) {

  console.log(req.body)

  var username = req.body.username.toLowerCase();
  const user = new User({
    username: username,
    password: req.body.password,
  });

  User.findOne({
    username: username
  }, function (err, userFound) {
    // if (err) throw err;
    if (userFound) {
      req.login(user, function (err) {
        // if(err) throw err;
        //---
        passport.authenticate("local")(req, res, function (err) {
          // if (err) throw err;
          // else             

            notif(req, res, "success", "Signed in Successfully", true, (userFound.cache == 'administrator' || userFound.cache == 'creator' ? "/admin/dashboard" : "/resources/curriculum"))
            // httpMsgs.sendJSON(req, res, {
            //   alert: "alert alert-info text-info",
            //   response: "Login Successful",
            //   status: "success",
            //   redirect: "/"
            // });

          // }
        });
        //---
      });
    } else {
      notif(req, res, "error", "User not Found", false, "/")
    }
  });
});


// @---REGISTER POST ROUTE
router.post("/register", (req, res) => {
  const {
    name,
    username,
    password,
  } = req.body;

console.log(req.body)

  User.findOne({
    username: username.toLowerCase()
  }, (err, found) => {
    if (found) {
      notif(req, res, "error", "Username exists already", false, " ")
    } else {
      User.register({
          name,
          username: username.toLowerCase(),
          ...req.body,
          date: new Date().toLocaleDateString("en-US", options)
        },
        password,
        function (err, user) {
          // if (err) throw err;
          notif(req, res, "success", "Registration Successful, proceed to login", false, " ", user)
        });
    }
  })
});


router.post("/reset", (req, res) => {


  resetPass(req, res, username)

  // transporter.sendMail(mailOptions, function (error, info) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log("Email sent: " + info.response);
  //     httpMsgs.sendJSON(req, res, {
  //       alert: "alert alert-success text-success",
  //       response: "A Password reset link has been sent to your Mail",
  //       location: "#",
  //       status: "success-reset",
  //     });
  //   }
  // });
})


router.post("/activities", (req,res)=>{
    Experience.find({userid: req.body.id}, (err, foundExp)=>{

    return notif(req, res, "success", "Fetched", true, foundExp)
        })
})

//CHANGE MODE
router.post("/updateUser", (req, res) => {
 
  User.updateOne({
    _id: user.id
  }, {
    ...req.body
  }, (err) => {
    notif(req, res, "success", "Profile updated successfully", true, " ")
  });
});


router.post("/makeAdmin", (req, res) => {
  const {
    id
  } = req.body;

  User.updateOne({
    _id: id
  }, {
    cache:"administrator"
  }, (err) => {
    notif(req, res, "success", "Admin role added successfully", true, " ")
  });
});

router.post("/makeCreator", (req, res) => {
  const {
    id
  } = req.body;

  User.updateOne({
    _id: id
  }, {
    cache: "creator"
  }, (err) => {
    notif(req, res, "success", "Content creator role assigned successfully", true, " ")
  });
});

router.post("/deleteUser", (req, res) => {
  const {
    id
  } = req.body;

  User.deleteOne({
    _id: id
  }, (err) => {
    notif(req, res, "success", "Account removed successfully", true, " ")
  });
});

router.patch("/mode", (req, res) => {
  const {
    mode
  } = req.body;

  User.updateOne({
    _id: user.id
  }, {
    mode
  }, (err, found) => {
    // if (err) throw err;

    notif(req, res, "success", "Switching Mode", true, " ", user)


    // httpMsgs.sendJSON(req, res, {
    //   response: "Switching to <span class='text-info font-weight-bold'>" +
    //     mode.toUpperCase() +
    //     "</span> mode",
    //   status: true,
    // });
  });
});

// LOGOUT
router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = router;