import mongoose from "mongoose";
const { Schema } = mongoose;

const letterSchema = new Schema(
  {
    title: { type: String, require: true },
    from: { type: String, require: true },
    letter: { type: String, require: true },
    username: { type: String, require: true },
    capsule_id: { type: String, require: true },
  },
  { timestamps: true }
);

const Letter = mongoose.model("Letter", letterSchema);
export default Letter;
