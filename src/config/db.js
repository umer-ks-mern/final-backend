
import mongoose from "mongoose";

const connectDB = async () => {
  const uri = "mongodb://127.0.0.1:27017/Instagram";
  try {
    await mongoose
    .connect(uri, {
      autoCreate: true,
      autoIndex: true,
    })
    .then((res) => {
      console.log("Database Connected..");
    })
  }
    catch(err) {
      console.log("Database Not Connected !!", err);
    };
};


export default connectDB;