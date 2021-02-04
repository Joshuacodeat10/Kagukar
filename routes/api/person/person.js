//jshint esversion:6
const express = require("express");
const router = express.Router();
const passport = require("passport");
const httpMsgs = require("http-msgs");
const Blog = require("../../../models/blog");
const Master = require("../../../models/master");
const User = require("../../../models/user");
const options = require("../../../config/options");
const notif = require("../../../config/response");
const resetPass = require("../../../config/reset");
const fileUpload = require("../../../config/fileUpload")
const removeFile = require("../../../config/deletefile")
const Section = require("../../../models/section");

const page = 'admin';
const phase = 'staff';


router.get('/', (req, res)=>{
    Master.findOne({}, (err, master) => {

        if (req.isAuthenticated()) {
            User.find({}, (err, user) => {
            Section.find({}, (err, section) => {
                    res.render("dashboard/pages/dashboard/components/person", {
                        csrfToken: req.csrfToken(),
                        master,
                        page,
                        phase,
                        user, section
                    })
                })
            })
                .sort({
                    date: -1
                })
        } else {
            res.redirect("/api/users")
        }

    })
})


// @---REGISTER POST ROUTE
router.post("/", fileUpload.single("image"), (req, res) => {
    console.log(req.body)
    const {
        username,
        password
    } = req.body;

    User.findOne({
        username
    }, (err, found) => {
        if (found) {
            notif(req, res, "error", "Profile with the provided Email exists already", false, " ")
        } else {
            User.register({
                    ...req.body,
                    date: new Date().toLocaleDateString("en-US", options)
                },
                password,
                function (err, user) {
                    if (err) throw err;
                    notif(req, res, "success", "Profile Created Successful", true, " ", user)
                });
        }
    })
});




module.exports = router;
