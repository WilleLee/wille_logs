import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;
// const MONGO_URI = process.env.MONGO_URI_PROD as string;

const connection: any = {};

const connectMongo = async () => {
  try {
    // if (process.env.NODE_ENV === "test") {
    //   console.log("🛠️ you are on a test environment");
    //   return;
    // }
    if (connection.isConnected) {
      console.log("👌🏻 USING EXISTING CONNECTION");
      return;
    }
    await mongoose.connect(MONGO_URI);
    console.log("✅ CONNECTED TO MONGO");

    connection.isConnected = mongoose.connections[0].readyState;
  } catch (err) {
    console.log(err);
    console.log("❌ error connecting to mongo");
  }
};

export default connectMongo;
