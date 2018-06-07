// Requiring our models and passport as we've configured it
var passport = require("../config/passport");
var user = require("../models/users");
var project2models = "../models/project2models";

module.exports = function(app) {
  function auth(req, res, next, authMethod) {
    passport.authenticate(authMethod, function(err, user, info) {
      if (err) {
        res.status(500);
        res.json(err);
      }
      if (!user) {
        res.status(401);
        res.json(info.message);
      } else {
        req.logIn(user, function(err) {
          if (err) {
            return next(err);
          }
          res.status(200);
          res.json("/members");
        });
      }
    })(req, res);
  }

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", function(req, res, next) {
    auth(req, res, next, "local-login");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res, next) {
    auth(req, res, next, "local-signup");
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send to home page
      res.redirect("/");
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  //create new workout

  // app.get("/api/workout_data", function(req, res) {
  //   res.json(req.body);
  // });
  app.post("/api/workout_data", function(req, res) {
    user.createWorkout(
      ["UID", "type", "duration", "calories"],
      [req.body.id, req.body.type, req.body.duration, req.body.calories],
      function(result) {
        if (result.changedRows == 0) {
          // If no rows were changed, then the ID must not exist, so 404
          return res.status(404).end();
        } else {
          res.status(200).end();
        }
      }
    );
  });

  //update weight
  app.put("/api/user_data", function(req, res) {
    console.log(req.body);
    var condition = `id = ${req.body.id}`;
    user.update(
      {
        weight: req.body.weight
      },
      condition,
      function(result) {
        if (result.changedRows == 0) {
          return res.status(404).end();
        } else {
          res.status(200).end();
        }
      }
    );
  });

  //----------------------------------
  /**
  GET /users
  GET /user(s)/{id}
  POST /users
  PUT /user(s)/{id}

  GET /users
  GET /user/{id}/workouts
*/
  //--------------------------------------
  app.get("/users", function(req, res) {
    user.allUsers(function(result) {
      var data = result;
      console.log(data);
    });
  });

  app.get("/users/workouts", function(req, res) {
    user.allWorkouts(function(result) {
      var data = result;
      console.log(data);
    });
  });

  app.get("/users/", function(req, res) {
    user.allWorkouts(function(result) {
      var data = result;
      console.log(data);
    });
  });

  app.get("/api/workout_data", function(req, res) {
    // console.log(req.user.id);


    user.selectHistory("uid", req.user.id, function(err, result) {
      res.json(result);
      // console.log(result);

    });
  });
};
