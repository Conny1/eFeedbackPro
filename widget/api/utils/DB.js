import mongoose from "mongoose";

export const connecttoDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/efeedbackpro");
    console.log("connected to mongoDb database");
  } catch (error) {
    console.log("Error connecting to db" + error);
  }
};
