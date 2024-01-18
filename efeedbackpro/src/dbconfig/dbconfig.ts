import mongoose from "mongoose";

export const connectToDb = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/efeedbackpro");
  const connection = mongoose.connection;
  connection.on("connected", () => {
    console.log("connected to mongoDb");
  });
};
