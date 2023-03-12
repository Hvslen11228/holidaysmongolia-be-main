import mongoose from "mongoose";
import { Types } from "mongoose";

const userSchema = new mongoose.Schema<any>(
  {
    user_id: Types.ObjectId,
    amount: Number,
    accommodations: Array,
    type: Boolean,
    tour_id: Types.ObjectId,
    date: String,
    pay_type: {
      type: String,
      default: "not pay",
    },
  },
  { timestamps: true }
);

const users = mongoose.model<any>("xanaduorders", userSchema);
export default users;
