import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, require: true },
    password: { type: String, require: true },
    email: { type: String, require: true },
    timezone: {type: String, require: true}
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
