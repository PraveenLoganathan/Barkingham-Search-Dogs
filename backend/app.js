require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const path = require("path");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
//----------------------------------------- END OF IMPORTS---------------------------------------------------

//Set up default mongoose connection
const mongoDB = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@cluster0.d7ft3uj.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Router paths
var indexRouter = require("./routes/index");
var dogsRouter = require("./routes/dogs");
var usersRouter = require("./routes/users");
var favoritesRouter = require("./routes/favorites");

var app = express();

// Middleware
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: "http://localhost:3000", // Location of the react app were connecting to
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: mongoDB,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

app.use("/", indexRouter);
app.use("/ratings", dogsRouter);
app.use("/users", usersRouter);
app.use("/favorites", favoritesRouter);

module.exports = app;
//----------------------------------------- END OF MIDDLEWARE---------------------------------------------------

//Start Server
app.listen(4000, () => {
  console.log("Server Has Started");
});
