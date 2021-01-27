var express = require("express")
var router = express.Router()

// Import the model (burger.js) to use its database functions
var burger = require("../models/burger.js")

// Create routes and set up logic within those routes
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
      return res.status(404).end()
    } else {
      res.status(200).end()
    }
  })
})

// Export routes for server.js to use
module.exports = router;
