//jshint esversion:6
const express = require("express");
const router = express.Router();
const passport = require("passport");
const httpMsgs = require("http-msgs");
const Blog = require("../../../models/blog");
const Master = require("../../../models/master");
const options = require("../../../config/options");
const notif = require("../../../config/response");
const resetPass = require("../../../config/reset");
const fileUpload = require("../../../config/fileUpload")

var [page, phase] = [' ', ' ']; 


router.get("/about", (req, res) => {

    [page, phase] = ['Info', 'About']

    Master.findOne({}, (err, master) => {

        if (req.isAuthenticated() || !req.isAuthenticated()) {
            res.render("client/" + master.type + "/pages/info/about", {
                csrfToken: req.csrfToken(),
                master,
                page,
                phase,
            })
        }
    })
})

router.get("/privacy-policy", (req, res) => {

    [page, phase] = ['Info', 'Privacy Policy']

    Master.findOne({}, (err, master) => {

        if (req.isAuthenticated() || !req.isAuthenticated()) {
            res.render("client/" + master.type + "/pages/info/policy", {
                    csrfToken: req.csrfToken(),
                    master,
                    page,
                    phase,
                })
        }
    })
})

router.get("/terms-n-condition", (req, res) => {

    [page, phase] = ['Info', 'Terms & Conditions']

    Master.findOne({}, (err, master) => {
        if (req.isAuthenticated() || !req.isAuthenticated()) {
            res.render("client/" + master.type + "/pages/info/tnc", {
                    csrfToken: req.csrfToken(),
                    master,
                    page,
                    phase,
                })
        }
    })
})

module.exports = router;