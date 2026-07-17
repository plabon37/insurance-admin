import mongoose from "mongoose";

export const connectToDB = async () => {
  const dbUri = process.env.MONGODB_URI;

  if (!dbUri) {
    throw new Error("MONGODB_URI is not defined");
  }

  if (mongoose.connection.readyState === 1) {
    return;
  }

  await mongoose.connect(dbUri);

  console.log("✅ MongoDB Connected");
  console.log("Database:", mongoose.connection.name);
};