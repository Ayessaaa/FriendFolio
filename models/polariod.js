import mongoose from "mongoose";
const { Schema } = mongoose;

const polariodSchema = new Schema(
  {
    username: { type: String, require: true },
    img: { type: String, require: true,},
    friend_id: { type: String, require: true},
    nickname: { type: String, require: true },
    date: {type: Date, require: false},
    title: {type: String, require: false},
    body: {type: String, require: false}
  },
  { timestamps: true }
);

const Polariod = mongoose.model("Polariod", polariodSchema);
export default Polariod;
