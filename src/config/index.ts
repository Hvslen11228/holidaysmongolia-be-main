import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/seller", {
      // useNewUrlParser: true,
      // useCreateIndex: true,
      // useUnifiedTopology: true,
    });
    console.log(`MongoDB холбогдлоо : ${conn.connection.host}`);
  } catch (error) {
    console.log(`MongoDB алдаа : ${error}`);
  }
};

module.exports = connectDB;
