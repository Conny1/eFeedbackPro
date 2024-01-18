import mongoose, { Schema } from "mongoose";
export const ClientSchema = new Schema(
  {
    email: {
      type: String,
      //   unique:[true, 'A client with this Email exists']
    },
    feedback: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Feedback",
    },

    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
    },
  },
  { timestamps: true }
);

const Client = mongoose.models.Client || mongoose.model("Client", ClientSchema);

export default Client;
