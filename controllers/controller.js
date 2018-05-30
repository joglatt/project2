var express = require("express");
var router = express.Router();

//Inport the model for its database functions
var project2models = require("../models/project2models");

router.get("/", function(req, res){

});


//Registering new User into UserInfo
router.post("/users/register", function(req, res){
    //Input nuser info
    UserInfo.create([
        "name", "sex", "age", "weight", "height"
    ], 
    [
        req.body.name, req.body.sex, req.body.age, req.body.weight, req.body.height

    ], function(result) {
        //Send back ID of new User
        res.json({ id: result.insertID});

    });
});


//Entering new Workout into database
router.post("/workouts/newworkouts", function(req, res){
    //Input workout info
    Workouts.create([
        "uid", "type", "duration"
    ],
    [
        req.body.UID, req.body.type, req.body.duration
        
    ], function(result){
        //Send back the Id of the newly inputted workout
        res.jason({ id: result.insertID})
    });
});