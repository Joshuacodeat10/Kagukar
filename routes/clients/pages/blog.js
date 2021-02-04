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

const [page, phase, published] = ['user', 'blog', true]

router.get("/", (req, res) => {
    Master.findOne({}, (err, master) => {

        if (req.isAuthenticated() || !req.isAuthenticated()) {
            Blog.find({published}, (err, blog) => {
                    res.render("client/" + master.type + "/pages/blog/blog", {
                        csrfToken: req.csrfToken(),
                        master,
                        page,
                        phase,
                        blog
                    })
                })
                .sort({
                    date: -1
                })
        }
    })
})

router.get("/read/:slug", (req, res) => {
    const {slug} = req.params

    Master.findOne({}, (err, master) => {

        if (req.isAuthenticated() || !req.isAuthenticated()) {
            Blog.find({published}, (err, blog) => {
                    Blog.findOne({slug}, (err, blogPost) => {
                        res.render("client/" + master.type + "/pages/blog/blog-read", {
                            csrfToken: req.csrfToken(),
                            master,
                            page,
                            phase,
                            blog,
                            blogPost
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