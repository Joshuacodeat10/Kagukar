//jshint esversion:6
const express = require("express");
const router = express.Router();
const Blog = require("../../../models/blog");
const Section = require("../../../models/section");
const Master = require("../../../models/master");
const User = require("../../../models/user");
const Category = require("../../../models/category");
const options = require("../../../config/options");
const notif = require("../../../config/response");
const resetPass = require("../../../config/reset");
const fileUpload = require("../../../config/fileUpload")
const removeFile = require("../../../config/deletefile")
const Award = require("../../../models/person/award")
const Education = require("../../../models/person/education")
const Experience = require("../../../models/person/experience")


var [page, phase, verified, published] = ['user', 'section', true, true]

//GET RESPECTIVE USER DETAILS
router.get("/:person", (req, res) => {
    Master.findOne({}, (err, master) => {

        if (req.isAuthenticated() || !req.isAuthenticated()) {
            Section.find({
                    verified
                }, (err, section) => {
                    User.find({
                        // verified
                    }, (err, user) => {
                        res.render("client/" + master.type + "/pages/person/person", {
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

//VIEW USER PROFILE
router.get("/:person/:slug", (req, res) => {
    const {
        slug
    } = req.params

    Master.findOne({}, (err, master) => {

        if (master.type == 'hospital') {
            phase = "Profile"
        } else if (master.type == 'primary' || master.type == 'secondary') {
            phase = "Profile"
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
                        }, (err, users) => {
                            User.findOne({
                                slug
                            }, (err, profile) => {
                                res.render("client/" + master.type + "/pages/person/profile/profile", {
                                    csrfToken: req.csrfToken(),
                                    master,
                                    page,
                                    phase,
                                    blog,
                                    section,
                                    users,
                                    profile
                                })
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

//USER PROFILE SETTINGS
router.get("/profile/settings/dashboard", (req, res) => {
    //    const {
    //        slug
    //    } = req.params;
    if (req.isAuthenticated()) {
        Master.findOne({}, (err, master) => {
            if (req.isAuthenticated() || !req.isAuthenticated()) {
                Section.find({
                        verified
                    }, (err, section) => {
                        // User.findOne({
                        //     slug
                        // }, (err, profile) => {
                        res.render("client/" + master.type + "/pages/person/profile/profile-settings", {
                            csrfToken: req.csrfToken(),
                            master,
                            page,
                            phase,
                            section,
                            // profile
                        })
                        // })
                    })
                    .sort({
                        date: -1
                    })
            }
        })
    } else {
        res.redirect('/page/auth')
    }
})



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
        image
    }, (err, updated) => {
        console.log(updated)
        if (err) throw err;
        notif(req, res, "success", "Profile Updated Successfully", true, "#", {
            ...req.body,
            image
        })

        if (path) {
            removeFile(path)
        }
    })
}


module.exports = router;