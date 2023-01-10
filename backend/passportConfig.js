const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;
const User = require("./models/user");

module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false); // <-- null is error and false is user
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    User.findById(id, function (err, user) {
      cb(err, user);
      console.log(user);
    });
  });
};
