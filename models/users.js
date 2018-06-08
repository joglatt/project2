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
      console.log("rows");
      console.log(rows);
      cb(err, rows);
    });
  },
  update: function(cols, condition, cb) {
    orm.update("userInfo", cols, condition, function(res) {
      cb(res);
    });
  },

  allWorkouts: function(cb) {
    orm.all("workouts", function(res) {
      cb(res);
    });
  },

  allUsers: function(cb) {
    orm.all("workouts", function(res) {
      cb(res);
    });
  },
  //Create new users for the Workouts table
  createWorkout: function(cols, vals, cb) {
    orm.createWorkout("workouts", cols, vals, function(res) {
      cb(res);
    });
  },
  //Updates the entries in the Workouts table
  updateWorkout: function(objColVals, condition, cb) {
    orm.update("workouts", condition, function(res) {
      cb(res);
    });
  },
  //Deletes the entries in the Workouts tables
  deleteWorkout: function(condition, cb) {
    orm.delete("workouts", condition, function(res) {
      cb(res);
    });
  },

  selectHistory: function(col, vals, cb) {

    orm.selectHistory("workouts", col, vals, function(err, res) {
      cb(err, res);

    });
  },
};
module.exports = user;
