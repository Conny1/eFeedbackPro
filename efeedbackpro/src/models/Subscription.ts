import mongoose from "mongoose";

const subSchema = new mongoose.Schema(
  {
    useremail: {
      type: String,
    },
    planid: {
      type: String,
      required: true,
    },
    subid: {
      type: String,
    },
    customerid: {
      type: String,
    },
    amount: {
      type: Number,
    },
    plancode: { type: String },
    authcode: { type: String },
  },
  { timestamps: true }
);

const Subscriptions =
  mongoose.models.subscriptions || mongoose.model("subscriptions", subSchema);
export default Subscriptions;
