import mongoose from "mongoose";

const subSchema = new mongoose.Schema(
  {
    useremail: {
      type: String,
    },
    stripeid: {
      type: String,
    },

    amount: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Subscriptions =
  mongoose.models.subscriptions || mongoose.model("subscriptions", subSchema);
export default Subscriptions;
