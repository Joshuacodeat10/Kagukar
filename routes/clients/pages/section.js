//jshint esversion:6
const express = require("express");
const router = express.Router();
const passport = require("passport");
const httpMsgs = require("http-msgs");
const Blog = require("../../../models/blog");
const Section = require("../../../models/section");
const Master = require("../../../models/master");
const User = require("../../../models/user");
const options = require("../../../config/options");
const notif = require("../../../config/response");
const resetPass = require("../../../config/reset");
const fileUpload = require("../../../config/fileUpload")

var [page, phase, verified, published] = ['user', 'section', true, true]


router.get("/:department", (req, res) => {
    Master.findOne({}, (err, master) => {

        if (req.isAuthenticated() || !req.isAuthenticated()) {
            Section.find({
                    verified
                }, (err, section) => {
                    User.find({
                        // verified
                    }, (err, user) => {
                        res.render("client/" + master.type + "/pages/section/section", {
                            csrfToken: req.csrfToken(),
                            master,
                            page,
                            phase,
                            section,
                            user
                        })
                    })
                })
                .sort({
                    date: -1
                })
        }
    })
})


router.get("/:department/:slug", (req, res) => {
    const {
        slug
    } = req.params

    Master.findOne({}, (err, master) => {

        if (master.type == 'hospital') {
            phase = "Department"
        } else if (master.type == 'primary' || master.type == 'secondary') {
            phase = "Class"
        }

        if (req.isAuthenticated() || !req.isAuthenticated()) {
            Blog.find({
                    published
                }, (err, blog) => {
                    Section.findOne({
                        slug
                    }, (err, section) => {
                        User.find({
                            // verified
                        }, (err, user) => {
                            res.render("client/" + master.type + "/pages/section/section-view", {
                                csrfToken: req.csrfToken(),
                                master,
                                page,
                                phase,
                                blog,
                                section, user
                            })
                        })
                    })
                })
                .sort({
                    date: -1
                })
        }
    })
})




module.exports = router;