import mongoose from "mongoose";

export interface usersDoc extends mongoose.Document {
  user_email: string;
  password: string;
  user_id: number;
}

const userSchema = new mongoose.Schema<usersDoc>(
  {
    user_email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Нууц үгээ оруулна уу."],
      trim: true,
    },
    user_id: Number,
  },
  { timestamps: true }
);

const users = mongoose.model<usersDoc>("users", userSchema);
export default users;
