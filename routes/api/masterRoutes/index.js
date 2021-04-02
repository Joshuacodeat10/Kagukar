//jshint esversion:6
const express = require("express");
const router = express.Router();
const passport = require("passport");
const httpMsgs = require("http-msgs");
const Master = require("../../../models/master");
const User = require("../../../models/user");
const Blog = require("../../../models/blog");
const Experience = require("../../../models/person/experience");
const options = require("../../../config/options");
const notif = require("../../../config/response");
const resetPass = require("../../../config/reset");
const fileUpload = require("../../../config/fileUpload")
const page = "admin"
const phase = "dashboard"


router.get("/", (req, res) => {
 

        //---route function start
        if (req.isAuthenticated()){
        if (req.user.cache == "creator" && req.user.verified || req.user.cache == "administrator") {

            Master.findOne({}, (err, master) => {
                User.find({}, (err, users) => {
                Blog.find((req.user.cache == "creator"? {authorid: req.user.id} : {}), (err, blog) => {
                Experience.find((req.user.cache == "creator"? {authorid: req.user.id} : {}), (err, exp) => {
            res.render("dashboard/pages/dashboard/index", {
                csrfToken: req.csrfToken(),
                master, page, phase, user: req.user, users, blog, exp
                })
                })
                })
                })
                })

        } else {
            res.redirect("/api/auth")
        } } else {
            res.redirect("/api/auth")
        }


        //---route function end

       
})

module.exports = router;