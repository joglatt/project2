var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var bcrypt = require("bcrypt-nodejs");
var model = require("../models/users");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(
  "local-login",
  new LocalStrategy(
    {
      // by default, local strategy uses username and password, we will override with email
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {
      // callback with email and password from our form
      model.selectWhere("username", username, function(err, rows) {
        if (err) return done(err);
        if (!rows.length) {
          return done(null, false, { message: "No user found." });
        }

        // if the user is found but the password is wrong
        if (!bcrypt.compareSync(password, rows[0].password))
          return done(null, false, { message: "Oops! Wrong password." });

        // all is well, return successful user
        return done(null, rows[0]);
      });
    }
  )
);

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      // by default, local strategy uses username and password, we will override with email
      usernameField: "email",
      passwordField: "password",
      sexField: "sex",
      heightField: "height",
      weightField: "weight",
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },

    function(req, username, password, done) {
      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      model.selectWhere("username", username, function(err, rows) {
        if (err) return done(err);
        if (rows.length) {
          return done(null, false, {
            message: "That username is already taken."
          });
        } else {
          // if there is no user with that username
          // create the user
          var newUser = {
            username: username,
            password: bcrypt.hashSync(password, null, null), // use the generateHash function in our user model
            sex: req.body.sex,
            height: req.body.height,
            weight: req.body.weight
          };
          // console.log("newUser");
          // console.log(newUser);
          model.create(
            {
              username: newUser.username,
              password: newUser.password,
              sex: newUser.sex,
              height: newUser.height,
              weight: newUser.weight
            },
            function(err, rows) {
              newUser.id = rows.insertId;

              return done(null, newUser);
            }
          );
        }
      });
    }
  )
);

// required for persistent login sessions
// passport needs ability to serialize and unserialize users out of session

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
  model.selectWhere("id", id, function(err, rows) {
    done(err, rows[0]);
  });
});

// Exporting our configured passport
module.exports = passport;
