import mongoose from "mongoose";
import { Types } from "mongoose";

const userSchema = new mongoose.Schema<any>(
  {
    about_en: String,
    about_mon: String,
    image: String,
  },
  { timestamps: true }
);

const users = mongoose.model<any>("medias", userSchema);
export default users;
