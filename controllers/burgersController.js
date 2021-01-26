var express = require("express")
var router = express.Router()

// Import the model (cat.js) to use its database functions.
var burger = require("../models/burger.js")

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
  burger.all(data => { res.render("index", {burgers: data})})
})

router.post("/api/burgers", function (req, res) {
  console.log(req.body)
  burger.create(req.body, (result) => { res.json({ id: result.insertId }) })
})

router.put("/api/burgers/:id", function (req, res) {
  var condi = "id = " + req.params.id
  burger.update(req.body, condi, (result) => {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end()
    } else {
      res.status(200).end()
    }
  })
})

router.delete("/api/burgers/:id", function (req, res) {
  var condi = "id = " + req.params.id;
  burger.delete(condi, (result) => {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end()
    } else {
      res.status(200).end()
    }
  })
})

// Export routes for server.js to use.
module.exports = router;
