import mongoose from "mongoose";
import { Types } from "mongoose";

const userSchema = new mongoose.Schema<any>(
  {
    id: String,
    title: String,
    thumbnail: String,
  },
  { timestamps: true }
);

const users = mongoose.model<any>("videos", userSchema);
export default users;
