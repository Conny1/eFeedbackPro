import mongoose, { Schema } from "mongoose";
export const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: [true, "A user with that Email exist"],
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      unique: [true, "A user with that Email exist"],
      required: [true, "Password is required"],
    },
    subToken: String,
    plan: {
      type: String,
      default: "",
    },
    isadmin: {
      type: Boolean,
      default: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
