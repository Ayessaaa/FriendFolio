const { render } = require("ejs");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const session = require("express-session");

const User = require("../models/user");

const signUp = (req, res) => {
  res.render("sign-up", { error: false });
};

const signUpError = (req, res) => {
  const err = req.params.err;
    res.render("sign-up", { error: err });
};

const authSignUp = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const result = await User.find({ username: username });
    const emailResult = await User.find({ email: email });
    if (result.length == 0) {
      if (emailResult.length == 0) {
        let hashedPassword = await bcrypt.hash(password, 8);
        const newUser = new User({
          username: username,
          email: email,
          password: hashedPassword,
        });
  
        await newUser.save();
        req.session.isLoggedIn = true;
        req.session.username = username;
        req.session.email = email;
  
        res.redirect("/home");
      } else {
        res.redirect("/sign-up/email-taken");
      }
    } else {
      res.redirect("/sign-up/username-taken");
    }

    
  } catch (error) {
    console.log(error);
  }
};

const logIn = (req, res) => {
  res.render("log-in", { error: false });
};

const logInError = (req, res) => {
  const err = req.params.err;
  res.render("log-in", { error: err });
};

const authLogIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (username.includes("@")){
      const result = await User.find({ email: username });

      if (result.length == 0) {
        res.redirect("/log-in/acc-not-exists");
      } else {
        bcrypt.compare(password, result[0].password, (err, result) => {
          if (err) {
            console.error("Error comparing passwords:", err);
            return;
          }
  
          if (result) {
            req.session.isLoggedIn = true;
            req.session.username = username;
            res.redirect("/home");
          } else {
            res.redirect("/log-in/wrong-password");
          }
        });
      }
    } else {
      const result = await User.find({ username: username });
      if (result.length == 0) {
        res.redirect("/log-in/acc-not-exists");
      } else {
        bcrypt.compare(password, result[0].password, (err, result) => {
          if (err) {
            console.error("Error comparing passwords:", err);
            return;
          }
  
          if (result) {
            req.session.isLoggedIn = true;
            req.session.username = username;
            res.redirect("/home");
          } else {
            res.redirect("/log-in/wrong-password");
          }
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signUp,
  signUpError,
  logIn,
  logInError,
  authLogIn,
  authSignUp,
};
