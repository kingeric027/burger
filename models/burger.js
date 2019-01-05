var orm = require("../config/orm.js");

//Create the code that will call the ORM functions using 
//burger specific input for the ORM 
// Import the ORM to create functions that will interact with the database.

var burger = {
  all: function(cb) {
    orm.selectAll("burgers", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    orm.insertOne("burgers", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.updateOne("burgers", objColVals, condition, function(res) {
      cb(res);
    });
  }
};

//Export at the end of this file (What do I export?)
module.exports = burger