// Requiring our models and passport as we've configured it
var passport = require("../config/passport");

module.exports = function (app) {

  function auth(req, res, next, authMethod) {
    passport.authenticate(authMethod, function (err, user, info) {
      if (err) {
        res.status(500)
        res.json(err)
      }
      if (!user) {
        res.status(401)
        res.json(info.message)
      }
      else {
        req.logIn(user, function (err) {
          if (err) { return next(err); }
          res.status(200)
          res.json("/members");
        });
      }
    })(req, res)
  }

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", function (req, res, next) {
    auth(req, res, next, "local-login")
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res, next) {
    auth(req, res, next, "local-signup")
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send to home page
      res.redirect("/");
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

};
