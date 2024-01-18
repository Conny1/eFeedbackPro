import mongoose, { Schema } from "mongoose";
export const businesschema = new Schema(
  {
    name: {
      type: String,
    },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    logoUrl: String,
    feedback: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Feedback",
      },
    ],
  },
  { timestamps: true }
);

const Business =
  mongoose.models.Business || mongoose.model("Business", businesschema);

export default Business;
