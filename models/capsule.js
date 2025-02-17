import mongoose from "mongoose";
const { Schema } = mongoose;

const capsuleSchema = new Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: false },
    date: { type: Date, require: true },
    username: { type: String, require: true },
  },
  { timestamps: true }
);

const Capsule = mongoose.model("Capsule", capsuleSchema);
export default Capsule;
