// Import the ORM to create functions that will interact with the database
var orm = require("../config/orm.js");

var burger = {
  all: function (cb) { orm.all("burgers", cb )},

  create: function (objColVals, cb) { orm.create("burgers", objColVals, cb )},

  update: function (objColVals, condi, cb) { orm.update("burgers", objColVals, condi, cb )},

  delete: function (condi, cb) { orm.delete("burgers", condi, cb )}
}

// Export the database functions for the controller (burgersController.js)
module.exports = burger;
