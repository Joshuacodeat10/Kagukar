//jshint esversion:6
const express = require("express");
const router = express.Router();
const passport = require("passport");
const httpMsgs = require("http-msgs");
const Blog = require("../../models/blog");
const Master = require("../../models/master");
const options = require("../../config/options");
const notif = require("../../config/response");
const resetPass = require("../../config/reset");
const fileUpload = require("../../config/fileUpload")
const removeFile = require("../../config/deletefile")

const page = 'admin';
const phase = 'blog';

var account
// @route GET api/items
// ---@desc to get all items
// ---@access Public
// '/' represents the actual 'api/items' route
router.get("/:account", (req, res) => {
  // Master.findOne({}, (err, master) => {

    console.log(req.params.account)
    console.log(req.param)

    if (req.isAuthenticated()) {
      Blog.find({}, (err, blog) => {
          res.render("dashboard/pages/dashboard/blog", {
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
    } else {
      res.redirect("/api/users")
    }

  // })
})


router.post("/", fileUpload.single("image"), (req, res) => {

  const image = '/uploads/' + req.file.filename;

  const newBlog = new Blog({
    ...req.body,
    image,
    author: req.user.name,
    authorid: req.user._id,
    date: new Date().toLocaleDateString("en-US", options),
  })

  Blog.findOne({
    slug: req.body.slug
  }, (err, found) => {
    if (found) {
      notif(req, res, "error", "Post with the given Title exists already", false, "#")
    } else {
      newBlog.save()
      notif(req, res, "success", "Post Added Successfully", true, "#", newBlog)
    }
  })

  //after saving, the .then() spits out the item collections
})

router.patch("/", fileUpload.single("image"), (req, res, next) => {
  var image;
  if (req.file) {
    image = '/uploads/' + req.file.filename
    Blog.findOne({
      _id: req.body.id
    }, (err, found) => {
      var path = "public/" + found.image

      updateBlog(image, req, res, path)

    })
  } else {
    Blog.findOne({
      _id: req.body.id
    }, (err, found) => {
      image = found.image
      updateBlog(image, req, res)
    })
  }
})
//FUNCTION TO UPDATE BLOG POST
function updateBlog(image, req, res, path) {

  Blog.updateOne({
    _id: req.body.id
  }, {
    ...req.body,
    published: req.body.published,
    image
  }, (err, updated) => {
    console.log(updated)
    if (err) throw err;
    notif(req, res, "success", "Post Updated Successfully", true, "#", {
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
      notif(req, res, "success", "Post(s) Deleted Successfully", true, "#")
    })
  })
})



router.get("/all", (req, res) => {

  Blog.find({}, (err, blog) => {
      // console.log("blog " + blog)
      Category.find({}, (err, category) => {
        res.json({
          blog: blog,
          category: category
        })
      })
    })
    .sort({
      date: -1
    })
})

// @route POST api/items
// ---@desc to CREATE a POST
// ---@access Public
router.get("/read/:slug", (req, res) => {

  console.log(req.params.slug)

  Blog.findOne({
    slug: req.params.slug
  }, (err, found) => {
    console.log(found)
    res.json(found)
  })
})
// @route DELETE api/items
// ---@desc to Delete an items
// ---@access Public
// 404 incase the ID is not found, send status as false ()React sensitive
router.get("/:id", (req, res) => {
  console.log(req.params.id)
  Blog.findOne({
    _id: req.params.id
  }, (err, found) => {
    console.log(found)
    res.send(found)
  })
})


router.put("/image/:id", fileUpload.single("file"), (req, res, next) => {
  console.log("The ID " + req.params.id)
  console.log(req.file)
  // console.log("Body "+ JSON.stringify(req.body))
  // const {title, slug, category, article, cache, status} = req.body;

  Blog.updateOne({
      _id: req.params.id
    }, {
      image: req.file.filename
    }, function (err) {
      if (err) {
        console.log(err)
      } else {
        console.log("Blog Image Updated successfully")
      }
    })
    .then(
      (Blog) => res.json(Blog)
    )
  // Blog.findById(req.params.id)
  //   .then(Blog => 
  //         Blog.remove()
  //         .then(()=> res.json({success: true}))
  //         )
  //     .catch(err => res.status(404).json({success: false}))
})

// })


router.post("/read/comment", (req, res) => {
  console.log(req.body);

  Blog.updateOne({
      _id: req.body.postId
    }, {
      // $push:  {
      "stat2.commentCount": 007,
      "stat2.likes": 000,
      "stat2.views": 0234,
      // }
      // stats[0].commentCount: 456,
      // stat2:{
      //   commentCount: 005,
      //   views: 111,
      //   likes: 1234
      // }
    }, function (err) {
      if (err) {
        console.log(err)
      } else {
        console.log("Blog Updated successfully")
      }
    })
    .then(
      (Blog) => res.json(Blog)
    )


  // res.json(req.body)
})

module.exports = router;