//jshint esversion:6
const express = require("express");
const router = express.Router();
const passport = require("passport");
const httpMsgs = require("http-msgs");
const User = require("../../models/master");
const options = require("../../config/options");
const notif = require("../../config/response");
const resetPass = require("../../config/reset");
const fileUpload = require("../../config/fileUpload")

const page = "admin"
//LOGIN RENDER ROUTE
router.get("/", (req, res) => {

  User.find({}, (err, users) => {
    if (users.length === 0) {
      // User.register({
      //     username: process.env.DEF_ADMIN.toLowerCase(),
      //     name: process.env.NAME,
      //     date: new Date().toLocaleDateString("en-US", options),
      //     status: process.env.STATUS,
      //     secret: process.env.SECRET,
      //     cache: process.env.CACHE,
      //   },
      //   process.env.DEF_PASS,
      //   function (err, user) {
      //     console.log("User Initialized Successfully");
      //   }
      // );
       User.register({
           // username: process.env.DEF_ADMIN.toLowerCase(),
           // name: process.env.NAME,
           // date: new Date().toLocaleDateString("en-US", options),
           // secret: process.env.SECRET,
           // cache: process.env.CACHE
           username: 'christianovik009@gmail.com',
           name: 'Victor Olateju',
           date: new Date().toLocaleDateString("en-US", options),
           secret: 'master',
           type: 'secondary',
           cache: 'administrator',
           nameOfEstablishment:'Kagukar'
         },
         // process.env.DEF_PASS,
         'olupemi',
         function (err, user) {
           console.log("User Initialized Successfully");
         }
       );
    }
  });

  if (!req.isAuthenticated()) {
    res.render("dashboard/pages/login/adminLogin", {
      csrfToken: req.csrfToken(),
      page
    });
  } else {
    res.redirect("/admin/dashboard")
  }

});

//LOGIN POST ROUTE
router.post("/", function (req, res) {

  var username = req.body.username.toLowerCase();
  const user = new User({
    username: username,
    password: req.body.password,
  });

  User.findOne({
    username
  }, function (err, userFound) {
    if (err) throw err;
    if (userFound) {
      req.login(user, function (err, users) {
        if (err) throw err

        passport.authenticate("local")(req, res, function (err) {
          if (err) throw err;

          notif(req, res, "success", "Signed in Successfully", true, "/admin/dashboard")
        });

      });
    } else {
      notif(req, res, "error", "Unauthorized Access!", false, "/")
    }
  });
});

//CHANGE MODE
router.patch("/user/mode", (req, res) => {
  const {
    id,
    mode
  } = req.body;

  User.updateOne({
    _id: id
  }, {
    mode: mode
  }, (err, found) => {
    if (err) {
      console.log(err);
      httpMsgs.sendJSON(req, res, {
        response: "Oops! Can't switch mode at this time",
        status: false,
      });
    } else {
      httpMsgs.sendJSON(req, res, {
        response: "Switching to <span class='text-info font-weight-bold'>" +
          mode.toUpperCase() +
          "</span> mode",
        status: true,
      });
    }
  });
});

// LOGOUT
router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/api/admin");
});

module.exports = router;