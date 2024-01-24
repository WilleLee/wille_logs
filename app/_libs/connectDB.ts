import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

const connection: any = {};

const connectDB = async () => {
  console.log("mongo uri", MONGO_URI);
  try {
    if (connection.isConnected) {
      console.log("✅ using existing connection");
      return;
    }
    await mongoose.connect(MONGO_URI);
    console.log("✅ conntected to mongo");

    connection.isConnected = mongoose.connections[0].readyState;
  } catch (err) {
    console.log(err);
    console.log("❌ error connecting to mongo");
  }
};

export default connectDB;
