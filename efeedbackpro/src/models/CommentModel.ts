import mongoose, { Schema } from "mongoose";
export const commentSchema = new Schema(
  {
    comment: {
      type: String,
    },
    likes: {
      type: Number,
      default: 0,
    },
    feedback: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Feedback",
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
  },
  { timestamps: true }
);

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
