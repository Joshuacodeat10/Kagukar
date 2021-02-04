const express = require("express");
const router = express.Router();


//item Model
const item = require("../../models/items");

// @route GET api/items
// ---@desc to get all items
// ---@access Public
// '/' represents the actual 'api/items' route
router.get("/", (req, res) => {
    item.find()
      .sort({date: -1})
      .then(items => res.json(items))
})

// @route POST api/items
// ---@desc to CREATE a POST
// ---@access Public

router.post("/", (req, res) => {
    const newItem = new item({
        name: req.body.name,
        date: new Date().toLocaleDateString()
    })

   //after saving, the .then() spits out the item collections
   // back into JSON
    newItem.save().then(
        (item)=>res.json(item)
    )
    })

// @route DELETE api/items
// ---@desc to Delete an items
// ---@access Public
// 404 incase the ID is not found, send status as false ()React sensitive
router.get("/:id", (req, res) => {
    item.findById(req.param.id)
      .then(items => 
            items.remove()
            .then(()=> res.json({success: true}))
            )
        .catch(err => res.status(404).json({success: false}))
})





module.exports = router;