import mongoose from "mongoose";

const databaseUrl = process.env.DB_URL as string;

export const connectToDb = async () => {
  await mongoose.connect(databaseUrl);
  const connection = mongoose.connection;
  connection.on("connected", () => {
    console.log("connected to mongoDb");
  });
};
