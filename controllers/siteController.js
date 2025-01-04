const { render } = require("ejs");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const cloudinary = require("cloudinary").v2;

const User = require("../models/user");
const Friend = require("../models/friend");

const home = (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    Friend.find({ username: req.session.username })
      .exec()
      .then((result) => {
        res.render("home", {friends: result});
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
    Friend.find({ username: req.session.username })
      .then((result) => {
        res.render("friends", { friends: result });
      })
      .catch((err) => console.log(err));
  } else {
    res.redirect("/log-in");
  }
};

function arraySplitter(value) {
  var arr = value.split(",");
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].trim();
  }
  console.log(arr);
  return arr;
}

function zodiacFunction(bday) {
  if (bday) {
    const date = new Date(
      new Date(bday).getMonth() + 1 + "/" + new Date(bday).getDate() + "/2000"
    );

    console.log(
      new Date(bday).getMonth() + 1 + "/" + new Date(bday).getDate() + "/2000"
    );

    if (new Date("03/21/2000") <= date && date <= new Date("04/19/2000")) {
      return ["Aries", "♈"];
    } else if (
      new Date("04/20/2000") <= date &&
      date <= new Date("05/20/2000")
    ) {
      return ["Taurus", "♉"];
    } else if (
      new Date("05/21/2000") <= date &&
      date <= new Date("06/21/2000")
    ) {
      return ["Gemini", "♊"];
    } else if (
      new Date("06/22/2000") <= date &&
      date <= new Date("07/22/2000")
    ) {
      return ["Cancer", "♋"];
    } else if (
      new Date("07/23/2000") <= date &&
      date <= new Date("08/22/2000")
    ) {
      return ["Leo", "♌"];
    } else if (
      new Date("08/23/2000") <= date &&
      date <= new Date("09/22/2000")
    ) {
      return ["Virgo", "♍"];
    } else if (
      new Date("09/23/2000") <= date &&
      date <= new Date("10/23/2000")
    ) {
      return ["Libra", "♎"];
    } else if (
      new Date("10/24/2000") <= date &&
      date <= new Date("11/21/2000")
    ) {
      return ["Scorpio", "♏"];
    } else if (
      new Date("11/22/2000") <= date &&
      date <= new Date("12/21/2000")
    ) {
      return ["Sagittarius", "♐"];
    } else if (
      new Date("01/20/2000") <= date &&
      date <= new Date("02/18/2000")
    ) {
      return ["Aquarius", "♒"];
    } else if (
      new Date("02/19/2000") <= date &&
      date <= new Date("03/20/2000")
    ) {
      return ["Pisces", "♓"];
    } else {
      return ["Capricorn", "♑"];
    }
  } else {
    return ["", ""];
  }
}

const friendsPost = (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  const [zodiac, emoji] = zodiacFunction(req.body.birthday);

  var path = "https://fl-1.cdn.flockler.com/embed/no-image.svg";

  try {
    path = req.file.path;
  } catch {
    path = "https://fl-1.cdn.flockler.com/embed/no-image.svg";
  }

  if (isLoggedIn) {
    const friend = new Friend({
      username: req.session.username,
      img: path,
      name: req.body.name,
      nickname: req.body.nickname,
      birthday: req.body.birthday,
      contact_number: req.body.contact,
      email: req.body.email,
      address: req.body.address,
      hobbies: arraySplitter(req.body.hobbies),
      dream: req.body.dream,
      likes: arraySplitter(req.body.likes),
      dislikes: arraySplitter(req.body.dislikes),
      notes: req.body.notes,
      zodiac: zodiac,
      emoji: emoji,
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

const editFriendID = (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    Friend.find({ _id: req.params.id })
      .then((result) => {
        res.render("editFriend", { friend: result[0] });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.redirect("/log-in");
  }
};

const editFriendIDPost = (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    const [zodiac, emoji] = zodiacFunction(req.body.birthday);

    Friend.findOneAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        nickname: req.body.nickname,
        birthday: req.body.birthday,
        contact_number: req.body.contact,
        email: req.body.email,
        address: req.body.address,
        hobbies: arraySplitter(req.body.hobbies),
        dream: req.body.dream,
        likes: arraySplitter(req.body.likes),
        dislikes: arraySplitter(req.body.dislikes),
        notes: req.body.notes,
        zodiac: zodiac,
        emoji: emoji,
      }
    )
    .catch((err) => {
      console.log(err);
    });
    res.redirect("/friend/"+req.params.id)
  } else {
    res.redirect("/log-in");
  }
};

const editFriend = (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    res.redirect("/edit-friend");
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

const friend = (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    res.redirect("/friends");
  } else {
    res.redirect("/log-in");
  }
};

const friendID = (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    Friend.find({ _id: req.params.id })
      .then((result) => {
        res.render("friend", { friend: result[0] });
      })
      .catch((err) => {
        console.log(err);
      });
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
  friend,
  friendID,
  editFriend,
  editFriendID,
  editFriendIDPost,
};
