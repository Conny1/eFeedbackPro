import express from "express";
import { useraddFeedback } from "../controlers/feedback.js";

const route = express.Router();

route.post("/feedback", useraddFeedback);

export default route;
