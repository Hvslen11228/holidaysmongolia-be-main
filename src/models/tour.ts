import mongoose from "mongoose";
import { Types } from "mongoose";

const userSchema = new mongoose.Schema<any>(
  {
    authorId: Types.ObjectId,
    date: String,
    href: String,
    listingCategoryId: Types.ObjectId,
    title: String,
    featuredImage: String,
    galleryImgs: Array,
    commentCount: Number,
    viewCount: Number,
    like: Boolean,
    address: String,
    reviewStart: Number,
    reviewCount: Number,
    price: String,
    maxGuests: Number,
    saleOff: String,
    isAds: Boolean,
    map: Object,
    about: String,
  },
  { timestamps: true }
);

const users = mongoose.model<any>("tours", userSchema);
export default users;
