// https://dev.to/evansitworld/upload-images-with-nodejs-and-express-to-the-cloud-using-cloudinary-26e4
// https://stackoverflow.com/questions/4459379/preview-an-image-before-it-is-uploaded
// https://www.peterfisher.me.uk/blog/javascript-sort-by-soonest-date-object/

import "dotenv/config";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import session from "express-session";
import multer from "multer";
import storage from "./storage/storage.js";
import authController from "./controllers/authController.js";
import siteController from "./controllers/siteController.js";

const upload = multer({ storage });

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

app.get("/guide", (req, res) => {
  res.render("guide");
});

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

app.get("/friends", siteController.friends);
app.post("/friends", upload.single("image"), siteController.friendsPost);

app.get("/friend", siteController.friend);
app.get("/friend/delete/:id", siteController.friendDelete);
app.get("/friend/:id", siteController.friendID);
app.get("/friend-gift-idea/:id", siteController.friendIDGiftIdea);

app.get("/edit-friend", siteController.editFriend);
app.get("/edit-friend/:id", siteController.editFriendID);
app.post(
  "/edit-friend/:id",
  upload.single("image"),
  siteController.editFriendIDPost
);

app.get("/my-profile", siteController.myProfile);
app.get("/edit-profile", siteController.editProfile);
app.post(
  "/edit-profile",
  upload.single("image"),
  siteController.editProfilePost
);

app.get("/add-friend-qr/:id", siteController.addFriendQR);
app.post("/add-friend-qr/:id", siteController.addFriendQRPost);

app.get("/create-profile", siteController.createProfile);
app.post(
  "/create-profile",
  upload.single("image"),
  siteController.createProfilePost
);

app.get("/polariods", siteController.polariods);

app.get("/polariod", siteController.polariod);
app.get("/polariod/delete/:id", siteController.polariodDelete);
app.get("/polariod/:id", siteController.polariodID);

app.get("/edit-polariod", siteController.editPolariod);
app.get("/edit-polariod/:id", siteController.editPolariodID);
app.post("/edit-polariod/:id", siteController.editPolariodIDPost);

app.get("/add-polariod", siteController.addPolariod);
app.get("/add-polariod/:id", siteController.addPolariodID);
app.post(
  "/add-polariod/:id",
  upload.single("image"),
  siteController.addPolariodIDPost
);

app.get("/gift/:id", siteController.gift);

app.get("/gift-select", siteController.giftSelect);

app.get("/create-gift/:id", siteController.createGift);
app.post("/create-gift/:id", siteController.createGiftPost);

app.get("/unsubscribe-email/:date", siteController.unsubscribeEmail);
app.get(
  "/unsubscribe-email-confirm/:date",
  siteController.unsubscribeEmailConfirm
);
app.get("/unsubscribe-done", siteController.unsubscribeDone);

app.get("/letters", siteController.letters);
app.get("/letter-submitted", siteController.letterSubmitted)

app.get("/new-letter-capsule", siteController.newLetterCapsule);
app.post("/new-letter-capsule", siteController.newLetterCapsulePost);

app.get("/letter-capsule/:id", siteController.letterCapsule);

app.get("/add-letter/:id", siteController.addLetter);
app.post("/add-letter/:id", siteController.addLetterPost)
