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
const Polariod = require("../models/polariod");
const Gift = require("../models/gift");
const { error } = require("console");

const home = (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    Friend.find({ username: req.session.username })
      .exec()
      .then((resultFriend) => {
        Polariod.find({ username: req.session.username })
          .sort({ date: "desc" })
          .then((resultPolariod) => {
            res.render("home", {
              friends: resultFriend,
              polariods: resultPolariod,
              username: req.session.username,
            });
          });
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

const friendsPost = async (req, res) => {
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

    await friend
      .save()
      .then((result) => {
        res.redirect("/friends");
      })
      .catch((err) => {
        console.log(err);
      });

    if (req.body.birthday !== "") {
      async function callAPI() {
        // Create a headers object and add content type
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const birthday = new Date(req.body.birthday);
        const birthdaySplit = birthday.toDateString().split(" ");
        birthday.setHours(0);

        eventbridgeDate = Date.now();

        await Friend.findOneAndUpdate(
          { _id: friend._id },
          { eventbridge_rule_name: eventbridgeDate }
        ).catch((err)=>{
          console.log(err)
        })

        // Create the JSON payload
        const payload = await JSON.stringify({
          to: req.session.email,
          birthday: birthdaySplit[1] + " " + birthdaySplit[2],
          username: req.session.username,
          birthday_name: req.body.nickname,
          birthday_img: path,
          scheduleTime: `0 ${birthday.getUTCHours()} ${birthday.getUTCDate()} ${
            birthday.getUTCMonth() + 1
          } ? *`,
          date: eventbridgeDate,
        });

        console.log(payload);

        // Set up the request options
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: payload,
          redirect: "follow",
        };

        // Make the API call
        await fetch(
          "https://kxev6v3gc2.execute-api.ap-southeast-1.amazonaws.com/dev",
          requestOptions
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
          })
          .then((result) => console.log(result))
          .catch((error) => console.error("error", error));
      }
      await callAPI();
    }
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

const editFriendIDPost = async (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    const [zodiac, emoji] = zodiacFunction(req.body.birthday);

    try {
      var path = req.file.path;
    } catch {
      await Friend.find({
        username: req.session.username,
        _id: req.params.id,
      }).then((result) => {
        var path = result[0].img;
        console.log(result);
      });
    }

    await Friend.findOneAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        img: path,
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
      .then(async (result) => {
        if (
          new Date(result.birthday).getTime() !==
          new Date(req.body.birthday).getTime()
        ) {
          // delete
          async function deleteAPI() {
            // Create a headers object and add content type
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            console.log(result)

            // Create the JSON payload
            const payload = await JSON.stringify({
              date: result.eventbridge_rule_name,
            });

            // Set up the request options
            const requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: payload,
              redirect: "follow",
            };

            // Make the API call
            await fetch(
              "https://kxev6v3gc2.execute-api.ap-southeast-1.amazonaws.com/dev/delete",
              requestOptions
            )
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
              })
              .then((result) => console.log(result))
              .catch((error) => console.error("error", error));
          }
          await deleteAPI();

          // add
          async function callAPI() {
            // Create a headers object and add content type
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const birthday = new Date(req.body.birthday);
            const birthdaySplit = birthday.toDateString().split(" ");
            birthday.setHours(0);


            await Friend.findOneAndUpdate(
              { _id: friend._id },
              { eventbridge_rule_name: result.eventbridge_rule_name }
            );

            const friendResult = await Friend.find({_id: req.params.id})

            console.log(friendResult[0].img);

            // Create the JSON payload
            const payload = await JSON.stringify({
              to: req.session.email,
              birthday: birthdaySplit[1] + " " + birthdaySplit[2],
              username: req.session.username,
              birthday_name: req.body.nickname,
              birthday_img: friendResult[0].img,
              scheduleTime: `0 ${birthday.getUTCHours()} ${birthday.getUTCDate()} ${
                birthday.getUTCMonth() + 1
              } ? *`,
              date: eventbridgeDate,
            });
            // Set up the request options
            const requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: payload,
              redirect: "follow",
            };

            console.log(payload);

            // Make the API call
            await fetch(
              "https://kxev6v3gc2.execute-api.ap-southeast-1.amazonaws.com/dev",
              requestOptions
            )
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
              })
              .then((result) => console.log(result))
              .catch((error) => console.error("error", error));
          }
          await callAPI();
        }
      })
      .catch((err) => {
        console.log(err);
      });
    res.redirect("/friend/" + req.params.id);
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
    Polariod.find({ username: req.session.username })
      .sort({ date: "desc" })
      .then((result) => {
        res.render("polariods", { polariods: result });
      });
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

const friendDelete = async (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    console.log(req.params.id);
    await Friend.find({ _id: req.params.id }).then(async (resultFriend) => {
      async function deleteAPI() {
        // Create a headers object and add content type
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // Create the JSON payload
        const payload = await JSON.stringify({
          date: resultFriend[0].eventbridge_rule_name,
        });

        // Set up the request options
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: payload,
          redirect: "follow",
        };

        // Make the API call
        await fetch(
          "https://kxev6v3gc2.execute-api.ap-southeast-1.amazonaws.com/dev/delete",
          requestOptions
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
          })
          .then((result) => console.log(result))
          .catch((error) => console.error("error", error));
      }
      await deleteAPI();
    });
    await Friend.findOneAndDelete({ _id: req.params.id })
      .then(async (result) => {
        res.redirect("/friends");
      })
      .catch((err) => console.log(err));
  } else {
    res.redirect("/log-in");
  }
};

const friendID = (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    Friend.find({ _id: req.params.id, username: req.session.username })
      .then((resultFriend) => {
        Polariod.find({
          friend_id: req.params.id,
          username: req.session.username,
        })
          .sort({ date: "desc" })
          .then((resultPolariod) => {
            res.render("friend", {
              friend: resultFriend[0],
              polariods: resultPolariod,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.redirect("/log-in");
  }
};

const addPolariod = (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    res.redirect("/polariods");
  } else {
    res.redirect("/log-in");
  }
};

const addPolariodID = (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    Friend.find({ _id: req.params.id }).then((result) => {
      res.render("addPolariod", { friend: result[0] });
    });
  } else {
    res.redirect("/log-in");
  }
};

const addPolariodIDPost = (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  var path = "https://fl-1.cdn.flockler.com/embed/no-image.svg";

  try {
    path = req.file.path;
  } catch {
    path = "https://fl-1.cdn.flockler.com/embed/no-image.svg";
  }

  if (isLoggedIn) {
    const polariod = new Polariod({
      username: req.session.username,
      img: path,
      friend_id: req.params.id,
      nickname: req.body.nickname,
      date: req.body.date,
      title: req.body.title,
      body: req.body.body,
    });

    polariod
      .save()
      .then()
      .catch((err) => {
        console.log(err);
      });
    res.redirect("/friend/" + req.params.id);
  } else {
    res.redirect("/log-in");
  }
};

const polariod = (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    res.redirect("/polariods");
  } else {
    res.redirect("/log-in");
  }
};

const polariodDelete = (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    Polariod.findOneAndDelete({ _id: req.params.id })
      .then((result) => {
        res.redirect("/polariods");
      })
      .catch((err) => console.log(err));
  } else {
    res.redirect("/log-in");
  }
};

const polariodID = (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    Polariod.find({ _id: req.params.id }).then((result) => {
      res.render("polariod", { polariod: result[0] });
    });
  } else {
    res.redirect("/log-in");
  }
};

const editPolariod = (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    res.redirect("/polariods");
  } else {
    res.redirect("/log-in");
  }
};

const editPolariodID = (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    Polariod.find({ _id: req.params.id }).then((result) => {
      res.render("editPolariod", { polariod: result[0] });
    });
  } else {
    res.redirect("/log-in");
  }
};

const editPolariodIDPost = (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    Polariod.findOneAndUpdate(
      { _id: req.params.id },
      {
        username: req.body.username,
        date: req.body.date,
        title: req.body.title,
        body: req.body.body,
      }
    ).then((result) => {
      res.redirect("/polariod/" + req.params.id);
    });
  } else {
    res.redirect("/log-in");
  }
};

const gift = (req, res) => {
  Gift.find({ _id: req.params.id })
    .then((resultGift) => {
      Polariod.find({ friend_id: resultGift[0].friend_id })
        .sort({ date: "asc" })
        .then((resultPolariod) => {
          res.render("gift", {
            gift: resultGift[0],
            polariods: resultPolariod,
          });
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

const giftSelect = (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    Friend.find({ username: req.session.username })
      .then((result) => {
        res.render("giftSelect", { friends: result });
      })
      .catch((err) => console.log(err));
  } else {
    res.redirect("/log-in");
  }
};

const createGift = (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    Friend.find({ username: req.session.username, _id: req.params.id })
      .then((result) => {
        res.render("createGift", { friend: result[0] });
      })
      .catch((err) => console.log(err));
  } else {
    res.redirect("/log-in");
  }
};

const createGiftPost = (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn) {
    const gift = new Gift({
      username: req.session.username,
      friend_id: req.params.id,
      title: req.body.title,
      greeting: req.body.greeting,
      message: req.body.message,
    });

    gift
      .save()
      .then((result) => {
        res.redirect("/gift/" + gift.id);
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
  addPolariod,
  addPolariodID,
  addPolariodIDPost,
  polariod,
  polariodID,
  editPolariod,
  editPolariodID,
  editPolariodIDPost,
  gift,
  giftSelect,
  createGift,
  createGiftPost,
  polariodDelete,
  friendDelete,
};
