//jshint esversion:6
const express = require("express");
const router = express.Router();
const passport = require("passport");
const httpMsgs = require("http-msgs");
const Master = require("../../models/master");
const User = require("../../models/user");
const options = require("../../config/options");
const notif = require("../../config/response");
const resetPass = require("../../config/reset");
const fileUpload = require("../../config/fileUpload")

const page = "admin"
const phase = 'add-person';

router.get("/", (req, res) => {
    Master.findOne({}, (err, master) => {

        //---route function start
        if (req.isAuthenticated()) {
            res.render("dashboard/pages/dashboard/person", {
                csrfToken: req.csrfToken(),
                master,
                page,
                phase
            })
        } else {
            res.redirect("/api/users")
        }
        //---route function end

    })
})

router.post("/", fileUpload.single("logo"), (req, res) => {
    var logo;
    if (req.file) {
        logo = '/uploads/' + req.file.filename
        updateMaster(logo, req, res)
    } else {
        User.findOne({
            username: req.body.username
        }, (err, found) => {
            if (found) {
        notif(req, res, "error", "User exists already", false, "#")
            } else {
                logo = found.logo
                updateMaster(logo, req, res)
            }
        })
    }

})


function updateMaster(logo, req, res) {
    User.updateOne({
        secret: "christianovik009@gmail.com"
    }, {
        ...req.body,
        logo,
    }, (err) => {
        if (err) throw err;
        console.log("Successfully Updated")
        notif(req, res, "success", "Settings Updated Successfully", true, "#")
    })
}


module.exports = router;