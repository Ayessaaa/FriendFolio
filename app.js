// https://dev.to/evansitworld/upload-images-with-nodejs-and-express-to-the-cloud-using-cloudinary-26e4
// https://stackoverflow.com/questions/4459379/preview-an-image-before-it-is-uploaded
// https://www.peterfisher.me.uk/blog/javascript-sort-by-soonest-date-object/

require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const session = require("express-session");

const cloudinary = require('cloudinary').v2;

const { storage } = require('./storage/storage');
const multer = require('multer');
const upload = multer({ storage });

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
app.post("/friends", upload.single('image'), siteController.friendsPost)

app.get("/friend", siteController.friend)
app.get("/friend/:id", siteController.friendID)

app.get("/edit-friend", siteController.editFriend);
app.get("/edit-friend/:id", siteController.editFriendID);
app.post("/edit-friend/:id", siteController.editFriendIDPost);

app.get("/polariods", siteController.polariods)

app.get("/polariod", siteController.polariod)
app.get("/polariod/:id", siteController.polariodID)

app.get("/edit-polariod", siteController.editPolariod)
app.get("/edit-polariod/:id", siteController.editPolariodID)
app.post("/edit-polariod/:id", siteController.editPolariodIDPost)

app.get("/add-polariod", siteController.addPolariod)
app.get("/add-polariod/:id", siteController.addPolariodID)
app.post("/add-polariod/:id", upload.single('image'), siteController.addPolariodIDPost)

app.get("/gift/:gift_id", siteController.gift)

app.get("/gift-select", siteController.giftSelect)





