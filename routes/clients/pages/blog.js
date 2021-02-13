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

router.get("/:type", (req, res) => {
    Master.findOne({}, (err, master) => {

        console.log(req.params)

        if (req.isAuthenticated() || !req.isAuthenticated()) {
            Blog.find({type: req.params.type, published}, (err, blog) => {
                    res.render("client/secondary/pages/resources/index", {
                        csrfToken: req.csrfToken(),
                        master,
                        param: req.params.type,
                        page,
                        user: req.user,
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
                        res.render("client/secondary/pages/resources/single", {
                            csrfToken: req.csrfToken(),
                            master,
                            page,
                            phase,
                            user: req.user,
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