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
  update: function(objColVals, condition, cb) {
    orm.update("userInfo", condition, function(res) {
      cb(res);
    });
  },

  all: function(cb) {
    orm.all("Workouts", function(res) {
      cb(res);
    });
  },
  //Create new users for the Workouts table
  createWorkout: function(cols, vals, cb) {  
    orm.createWorkout("Workouts", cols, vals, function(res) {
      cb(res);
    });
  },
  //Updates the entries in the Workouts table
  updateWorkout: function(objColVals, condition, cb) {
    orm.update("Workouts", condition, function(res) {
      cb(res);
    });
  },
  //Deletes the entries in the Workouts tables
  deleteWorkout: function(condition, cb) {
    orm.delete("Workouts", condition, function(res) {
      cb(res);
    });
  }
};
// Export the database functions for the controller (catsController.js).
module.exports = user;
