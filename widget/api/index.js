import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import feedbackRoute from "./routes/feedback.js";
import { connecttoDB } from "./utils/DB.js";
// ****
// server configs
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

// routes
app.use("/api", feedbackRoute);

app.use((error, req, resp, next) => {
  const status = error.status || 500;
  const message = error.message || "Server Error";
  const stack = error.stack;

  return resp.json({
    succes: false,
    status,
    message,
    stack,
  });
});

const port = process.env.PORT || 5000;

app.listen(port, async () => {
  console.log("Server is running on port: " + port);
  await connecttoDB();
});
