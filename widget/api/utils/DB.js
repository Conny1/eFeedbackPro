import mongoose from "mongoose";

export const connecttoDB = async () => {
  try {
    const databaseUrl = process.env.DB_URL;
    await mongoose.connect(databaseUrl);
    console.log("connected to mongoDb database");
  } catch (error) {
    console.log("Error connecting to db" + error);
  }
};
