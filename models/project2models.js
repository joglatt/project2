var orm = require("../config/orm");

//Database Functions for the UserInfo Table
var UserInfo = {
    //Select all User info from the UserInfo Table
    all: function(cb) {
        orm.all("UserInfo", function(res){
            cb(res);
        });
    },
    //Create new users for the UserInfo table
    create: function(cb) {
        orm.create("UserInfo", cols, vals, function(res){
            cb(res);
        });
    },
    //Updates the entries in the UserInfo table
    update: function(objColVals, condition, cb){
        orm.update("UserInfo", condition, function(res){
            cb(res);
        });
    },
    delete: function(condition, cb) {
        orm.delete("UserInfo", condition, function(res){
            cb(res);
        });
    }

};



//Database Funtions for the Workouts Table

var Workouts = {
    //Select all User info from the Workouts Table
    all: function(cb) {
        orm.all("Workouts", function(res){
            cb(res);
        });
    },
    //Create new users for the Workouts table
    create: function(cb) {
        orm.create("Workouts", cols, vals, function(res){
            cb(res);
        });
    },
    //Updates the entries in the Workouts table
    update: function(objColVals, condition, cb){
        orm.update("Workouts", condition, function(res){
            cb(res);
        });
    },
    //Deletes the entries in the Workouts tables
    delete: function(condition, cb) {
        orm.delete("Workouts", condition, function(res){
            cb(res);
        });
    }
};


module.exports = project2models;