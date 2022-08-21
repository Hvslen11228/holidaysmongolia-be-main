import mongoose from "mongoose";
import { Types } from "mongoose";

const userSchema = new mongoose.Schema<any>(
  {
    firstName: String,
    lastName: String,
    displayName: String,
    email: String,
    gender: String,
    avatar: String,
    bgImage: String,
    count: Number,
    href: String,
    desc: String,
    jobName: String,
    type: {
      type: String,
      default: "mod",
    },
    password: String,
  },
  { timestamps: true }
);

const users = mongoose.model<any>("authors", userSchema);
export default users;
