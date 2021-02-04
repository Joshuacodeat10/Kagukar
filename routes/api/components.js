//jshint esversion:6
const express = require("express");
const router = express.Router();

const Blog = require("../../models/blog");
const Master = require("../../models/master");
const options = require("../../config/options");
const notif = require("../../config/response");
const resetPass = require("../../config/reset");
const fileUpload = require("../../config/fileUpload")
const removeFile = require("../../config/deletefile")
const Category = require("../../models/category")
const Subcategory = require("../../models/category/subCategory")
const Portfolio = require("../../models/category/portfolio")

const page = 'admin';
const phase = 'Components';

var account
// @route GET api/items
// ---@desc to get all items
// ---@access Public
// '/' represents the actual 'api/items' route
router.get("/", (req, res) => {
    Master.findOne({}, (err, master) => {


        if (req.isAuthenticated()) {
            Category.find({}, (err, category) => {
                    Subcategory.find({}, (err, sub) => {
                        Portfolio.find({}, (err, portfolio) => {
                            res.render("dashboard/pages/dashboard/components", {
                                csrfToken: req.csrfToken(),
                                master,
                                page,
                                phase,
                                category,
                                sub,
                                portfolio
                            })
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


router.post("/", fileUpload.single("image"), (req, res) => {

    const image = '/uploads/' + req.file.filename;

    const newCategory = new Category({
        ...req.body,
        image,
        date: new Date().toLocaleDateString("en-US", options),
    })

    Category.findOne({
        name: req.body.name
    }, (err, found) => {
        if (found) {
            notif(req, res, "error", "Category exists already", false, "#")
        } else {
            newCategory.save()
            notif(req, res, "success", "Category Added Successfully", true, "#", newBlog)
        }
    })
})

router.patch("/", fileUpload.single("image"), (req, res, next) => {
    var image;
    if (req.file) {
        image = '/uploads/' + req.file.filename
        Category.findOne({
            _id: req.body.id
        }, (err, found) => {
            var path = "public/" + found.image

            updateEntry(Category, image, req, res, path)

        })
    } else {
        Category.findOne({
            _id: req.body.id
        }, (err, found) => {
            image = found.image
            updateEntry(Category, image, req, res)
        })
    }
})


//SUB CATEGORY UPDATE
router.post("/subcategory", fileUpload.single("image"), (req, res) => {

    const image = '/uploads/' + req.file.filename;

    const newSub = new Subcategory({
        ...req.body,
        image,
        date: new Date().toLocaleDateString("en-US", options),
    })

    Subcategory.findOne({
        name: req.body.name
    }, (err, found) => {
        if (found) {
            notif(req, res, "error", "Category exists already", false, "#")
        } else {
            newSub.save()
            notif(req, res, "success", "Category Added Successfully", true, "#", newBlog)
        }
    })
})


router.patch("/subcategory", fileUpload.single("image"), (req, res, next) => {
    var image;
    if (req.file) {
        image = '/uploads/' + req.file.filename
        Subcategory.findOne({
            _id: req.body.id
        }, (err, found) => {
            var path = "public/" + found.image

            updateSub(Subcategory, image, req, res, path)

        })
    } else {
        Subcategory.findOne({
            _id: req.body.id
        }, (err, found) => {
            image = found.image
            updateSub(Subcategory, image, req, res)
        })
    }
})


router.post("/portfolio", fileUpload.single("image"), (req, res) => {

    const newPortfolio = new Portfolio({
        ...req.body,
        date: new Date().toLocaleDateString("en-US", options),
    })

    Portfolio.findOne({
        name: req.body.name
    }, (err, found) => {
        if (found) {
            notif(req, res, "error", "Portfolio exists already", false, "#")
        } else {
            newPortfolio.save()
            notif(req, res, "success", "Portfolio Added Successfully", true, "#", newBlog)
        }
    })
})

router.patch("/subcategory", fileUpload.single("image"), (req, res, next) => {
    var image;
    
        Portfolio.findOne({
            _id: req.body.id
        }, (err, found) => {
            updateSub(Portfolio, image, req, res)
        })
    
})


//FUNCTION TO UPDATE ENTRY POST
function updateEntry(model, image, req, res, path) {

    model.updateOne({
        _id: req.body.id
    }, {
        ...req.body,
        image
    }, (err, updated) => {
        console.log(updated)
        if (err) throw err;
        notif(req, res, "success", "Entry Updated Successfully", true, "#", {
            ...req.body,
            image
        })

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

    Blog.find({
        _id: {
            '$in': selects
        }
    }, function (err, f) {
        Blog.deleteMany({
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
            notif(req, res, "success", "Category Deleted Successfully", true, "#")
        })
    })
})



module.exports = router;