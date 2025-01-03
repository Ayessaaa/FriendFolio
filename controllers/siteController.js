const { render } = require("ejs");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const session = require("express-session");

const User = require("../models/user");
const Friend = require("../models/friend");

const home = (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    User.find({ username: req.session.username })
      .exec()
      .then((result) => {
        res.render("home");
      })
      .catch((err) => console.log(err));
  } else {
    res.redirect("/log-in");
  }
};

const addFriend = (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    res.render("addFriend");
  } else {
    res.redirect("/log-in");
  }
};

const friends = (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {

    Friend.find({username: req.session.username})
    .then((result)=>{
      res.render("friends", {profile: result[0]});
    }).catch((err)=> console.log(err))
    
  } else {
    res.redirect("/log-in");
  }
};

function arraySplitter(value) {
  var arr = value.split(",");
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].trim();
  }
  console.log(arr)
  return arr;
}

const friendsPost = (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    const friend = new Friend({
      username: req.session.username,
      img: "nothing yet",
      name: req.body.name,
      nickname: req.body.nickname,
      birthday: req.body.bday,
      contact_number: req.body.contact,
      email: req.body.email,
      address: req.body.address,
      hobbies: arraySplitter(req.body.hobbies),
      dream: req.body.dream,
      likes: arraySplitter(req.body.likes),
      dislikes: arraySplitter(req.body.dislikes),
      notes: req.body.notes,
    });

    friend
      .save()
      .then((result) => {
        res.redirect("/friends");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.redirect("/log-in");
  }
};

const polariods = (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    res.render("polariods");
  } else {
    res.redirect("/log-in");
  }
};

module.exports = {
  home,
  addFriend,
  friends,
  friendsPost,
  polariods,
};
