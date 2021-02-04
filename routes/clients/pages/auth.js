//jshint esversion:6
const express = require("express");
const router = express.Router();
const passport = require("passport");
const httpMsgs = require("http-msgs");
const Master = require("../../../models/master");
const User = require("../../../models/user");
const options = require("../../../config/options");
const notif = require("../../../config/response");
const resetPass = require("../../../config/reset");
const fileUpload = require("../../../config/fileUpload")
const removeFile = require("../../../config/deletefile")

const page = "user"


//LOGIN RENDER ROUTE
router.get("/", (req, res) => {

    Master.findOne({}, (err, master) => {

        // if (req.isAuthenticated()) {
            // res.redirect("/")
        // }
        // else{
            res.render("client/" + master.type + "/pages/auth/auth", {
                csrfToken: req.csrfToken(),
                page,
                master
            })
        // }
    })

});

// --- @LOGIN POST ROUTE
router.post("/", fileUpload.single("image"), function (req, res) {
    var username = req.body.username.toLowerCase();
    const user = new User({
        username,
        password: req.body.password,
    });

    User.findOne({
        username
    }, function (err, userFound) {
        // if (err) throw err;
        if (userFound) {
            req.login(user, function (err) {
                // if (err) throw err;
                //---
                passport.authenticate("local")(req, res, function (err) {
                    // if (err) throw err;
                    // else {

                        notif(req, res, "success", "Signed in Successfully", true, "/")

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
router.post("/register", fileUpload.single("image"), (req, res) => {
    const {
        name,
        username,
        password
    } = req.body;

    User.findOne({
        username
    }, (err, found) => {
        if (found) {
            notif(req, res, "error", "Username exists already", false, " ")
        } else {
            User.register({
                    name,
                    username,
                    date: new Date().toLocaleDateString("en-US", options)
                },
                password,
                function (err, user) {
                    // if (err) throw err;
                    notif(req, res, "success", "Registration Successful", true, " ", user)
                });
        }
    })
});



router.patch("/", fileUpload.single("image"), (req, res, next) => {
    var image;
    if (req.file) {
        image = '/uploads/' + req.file.filename
        User.findOne({
            _id: user._id
        }, (err, found) => {
            var path = "public/" + found.image
            updateUser(image, req, res, path)
        })
    } else {
        User.findOne({
            _id: user._id
        }, (err, found) => {
            image = found.image
            updateUser(image, req, res)
        })
    }
})
//FUNCTION TO UPDATE USER ACCOUNT
function updateUser(image, req, res, path) {

    User.updateOne({
        _id: user._id
    }, {
        ...req.body,
        verified: req.body.verified,
        image
    }, (err, updated) => {
        console.log(updated)
        // if (err) throw err;
        notif(req, res, "success", "Profile Updated Successfully", true, "#", {
            ...req.body,
            image
        })

        if (path) {
            removeFile(path)
        }
    })
}



router.post("/reset", (req, res) => {

    resetPass(username)
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
            httpMsgs.sendJSON(req, res, {
                alert: "alert alert-success text-success",
                response: "A Password reset link has been sent to your Mail",
                location: "#",
                status: "success-reset",
            });
        }
    });
})



// LOGOUT
router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/page/auth");
});

module.exports = router;