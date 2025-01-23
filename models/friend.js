const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const friendSchema = new Schema(
  {
    username: { type: String, require: true },
    img: { type: String, require: false, default: "https://fl-1.cdn.flockler.com/embed/no-image.svg" },
    name: { type: String, require: true },
    nickname: { type: String, require: true },
    birthday: { type: Date, require: false },
    contact_number: { type: String, require: false },
    email: { type: String, require: false },
    address: { type: String, require: false },
    hobbies: { type: Array, require: false },
    dream: { type: String, require: false },
    likes: { type: Array, require: false },
    dislikes: { type: Array, require: false },
    notes: { type: String, require: false },
    zodiac: { type: String, require: false },
    emoji: { type: String, require: false },
    eventbridge_rule_name: { type: String, require: false },

  },
  { timestamps: true }
);

const Friend = mongoose.model("Friend", friendSchema);
module.exports = Friend;
