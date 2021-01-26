// Import MySQL connection
const connection = require("../config/connection.js")

function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
  all: function(table, cb) {
    connection.query(`SELECT * FROM ${table}`, (err, result) => {
      if (err) throw err
      cb(result)
    })
  },
  create: function(table, objColVals, cb) {
    connection.query(`INSERT INTO ${table} SET ?`, [objColVals], (err, result) => {
      if (err) throw err
      cb(result)
    })
  },
  update: function(table, objColVals, condi, cb) {
    var query = connection.query(`UPDATE ${table} SET ${objToSql(objColVals)} WHERE ${condi}` , (err, result) => {
      if (err) throw err
      cb(result)
    })
  },
  delete: function(table, condi, cb) {
    connection.query(`DELETE FROM ${table} WHERE ${condi}`, (err, result) => {
      if (err) throw err
      cb(result)
    })
  }
}

// Export the orm object for the model (burger.js).
module.exports = orm
