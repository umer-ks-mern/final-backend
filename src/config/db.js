
import mongoose from "mongoose";
const connectDB = async () => {
  const uri = "mongodb://127.0.0.1:27017/Instagram";
  mongoose
    .connect(uri, {
      autoCreate: true,
      autoIndex: true,
    })
    .then((res) => {
      console.log("Database Connect Ho gya ha..");
    })
    .catch((err) => {
      console.log("Database Connect nahi Hua!!", err);
    });
};


export default connectDB;