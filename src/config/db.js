import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGOOSE_DB_CONNECTION_STRING;
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
