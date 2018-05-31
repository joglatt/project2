var orm = require("../config/orm.js");

var user = {
  selectWhere: function(cols, vals, cb) {
    orm.selectWhere("userInfo", cols, vals, function(err, rows) {
      cb(err, rows);
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, cb) {
    orm.create("userInfo", cols, function(err, rows) {
      console.log("rows ");
      console.log(rows);
      cb(err, rows);
    });
  },
  all: function(cb) {
    orm.all("userInfo", function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("userInfo", condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("userInfo", condition, function(res) {
      cb(res);
    });
  }
};

var Workouts = {
  //Select all User info from the Workouts Table
  all: function(cb) {
    orm.all("Workouts", function(res) {
      cb(res);
    });
  },
  //Create new users for the Workouts table
  create: function(cb) {
    orm.create("Workouts", cols, vals, function(res) {
      cb(res);
    });
  },
  //Updates the entries in the Workouts table
  update: function(objColVals, condition, cb) {
    orm.update("Workouts", condition, function(res) {
      cb(res);
    });
  },
  //Deletes the entries in the Workouts tables
  delete: function(condition, cb) {
    orm.delete("Workouts", condition, function(res) {
      cb(res);
    });
  }
};
// Export the database functions for the controller (catsController.js).
module.exports = user;
// module.exports = workouts;
