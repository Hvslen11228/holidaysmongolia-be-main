import mongoose from "mongoose";
import { Types } from "mongoose";

const userSchema = new mongoose.Schema<any>(
  {
    authorId: Types.ObjectId,
    featuredImage: String,
    title: String,
    desc: String,
    body: String,
    date: String,
    href: String,
    commentCount: Number,
    viewdCount: Number,
    readingTime: Number,
    bookmark: Object,
    like: Object,
    categoriesId: Array,
    postType: String,
    lang: String,
  },
  { timestamps: true }
);

const users = mongoose.model<any>("blogs", userSchema);
export default users;
