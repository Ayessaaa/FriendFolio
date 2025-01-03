const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const session = require("express-session");

const { render } = require("ejs");
dotenv.config({ path: ".env" });

const authController = require("./controllers/authController");
const siteController = require("./controllers/siteController");

const app = express();

app.set("view engine", "ejs");

const dbURI = process.env.DB_URI;
if (!dbURI) {
  throw new Error("MONGO_URI is not defined in the environment variables");
}

mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false,
  })
);

// app.get("/guide", siteController.guide);

app.get("/sign-up", authController.signUp);

app.get("/sign-up/:err", authController.signUpError);

app.get("/log-in", authController.logIn);

app.get("/log-in/:err", authController.logInError);

app.post("/auth/sign-up", authController.authSignUp);

app.post("/auth/log-in", authController.authLogIn);

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/log-in");
    }
  });
});

app.get("/", (req, res) => {
  res.redirect("/home");
});

app.get("/home", siteController.home);

app.get("/add-friend", siteController.addFriend);

app.get("/friends", siteController.friends)
app.post("/friends", siteController.friendsPost)

app.get("/polariods", siteController.polariods)


