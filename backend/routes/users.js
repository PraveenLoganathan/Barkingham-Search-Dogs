var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/user");

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send({ error: "No User Exists" });
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
});

router.post("/register", (req, res) => {
  User.findOne(
    {
      username: req.body.username,
    },
    async (err, doc) => {
      if (err) throw err;
      if (doc) res.send({ error: "User Already Exists" });
      if (!doc) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
          username: req.body.username,
          password: hashedPassword,
        });
        await newUser.save();
        res.send("User Created");
      }
    }
  );
});

router.get("/checkAuthenticated", (req, res) => {
  res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});

router.get("/logout", (req, res) => {
  req.logout(req.user, (err) => {
    if (err) throw err;
    res.status(204).send({
      message: "User Logged Out",
    });
  });
});

module.exports = router;
