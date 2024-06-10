import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

const connection: any = {};

const connectMongo = async () => {
  try {
    // if (process.env.NODE_ENV === "test") {
    //   console.log("🛠️ you are on a test environment");
    //   return;
    // }
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

export default connectMongo;
