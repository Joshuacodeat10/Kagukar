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
const removeFile = require("../../../config/deletefile")

const page = 'admin';
const phase = 'staff';


router.get('/', (req, res) => {
    Master.findOne({}, (err, master) => {
        if (err) throw err;
        if (req.isAuthenticated()) {
            Section.find({}, (err, section) => {
                    User.find({}, (err, user) => {
                        if (err) throw err;
                        res.render("dashboard/pages/dashboard/components/sections", {
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
        } else {
            res.redirect("/api/users")
        }

    })
})


router.post('/', fileUpload.single("image"), (req, res) => {
    const image = '/uploads/' + req.file.filename;

    const newSection = new Section({
        ...req.body,
        image,
        author: req.user.name,
        authorid: req.user._id,
        date: new Date().toLocaleDateString("en-US", options),
    })

    Section.findOne({
        slug: req.body.slug
    }, (err, found) => {
        if (found) {
            notif(req, res, "error", "Department with the given Name exists already", false, "#")
        } else {
            newSection.save()
            notif(req, res, "success", "Department Added Successfully", true, "#", newSection)
        }
    })
})


router.patch("/", fileUpload.single("image"), (req, res, next) => {
    var image;
    if (req.file) {
        image = '/uploads/' + req.file.filename
        Section.findOne({
            _id: req.body.id
        }, (err, found) => {
            var path = "public/" + found.image

            updateBlog(image, req, res, path)

        })
    } else {
        Section.findOne({
            _id: req.body.id
        }, (err, found) => {
            image = found.image
            updateBlog(image, req, res)
        })
    }
})
//FUNCTION TO UPDATE BLOG POST
function updateBlog(image, req, res, path) {
    //START HOD/CLASS MASTER SET
    if (req.body.hod) {
        Section.findOne({
            _id: req.body.id
        }, (err, found) => {
            if (err) throw err;

            if (found) {
                User.updateOne({
                    _id: found.hod
                }, {
                    cache: "junior"
                }, (err) => {
                    console.log("Hod set to Junior role ")
                })
            }

            User.updateOne({
                _id: req.body.hod
            }, {
                cache: "senior"
            }, (err) => {
                console.log("Hod set to Senior role")
            })
        })
    }
    //END HOD/CLASS MASTER SET

    Section.updateOne({
        _id: req.body.id
    }, {
        ...req.body,
        verified: req.body.verified,
        image
    }, (err, updated) => {
        console.log(updated)
        if (err) throw err;
        if (req.body.hod) {
             notif(req, res, "success", "Role Appointed Successfully", true, "#", {
                 ...req.body,
                 image
             })
        } else {
            notif(req, res, "success", req.body.name + " Department Updated Successfully", true, "#", {
                ...req.body,
                image
            })
        }

        if (path) {
            removeFile(path)
        }
    })
}

// @route DELETE dashboard/department
// ---@desc to Delete an dapartment
router.post("/delete", fileUpload.single("image"), (req, res) => {

    const {
        selected
    } = req.body;

    var arraySelected = selected.split(" ");
    var selects = arraySelected.filter(a => a);

    Section.find({
        _id: {
            '$in': selects
        }
    }, function (err, f) {
        Section.deleteMany({
            _id: {
                '$in': selects
            }
        }, function (err) {
            if (err) throw err;
            f.map(x => {
                console.log(x.image)
                var path = "public/" + x.image
                removeFile(path)
            })

            notif(req, res, "success", "Department(s) Deleted Successfully", true, "#")
        })
    })
})



module.exports = router;