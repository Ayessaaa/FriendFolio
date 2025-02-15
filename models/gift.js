import mongoose from "mongoose";
const { Schema } = mongoose;

const giftSchema = new Schema(
  {
    username: { type: String, require: true },
    friend_id: { type: String, require: true},
    title: {type: String, require: true},
    greeting: {type: String, require: true},
    message: {type: String, require: true}
  },
  { timestamps: true }
);

const Gift = mongoose.model("Gift", giftSchema);
export default Gift;
