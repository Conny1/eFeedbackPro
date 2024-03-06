import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import User from "@/models/UserModel";
import Subscriptions from "@/models/Subscription";
import { plans } from "@/state/types";
import { connectToDb } from "@/dbconfig/dbconfig";

connectToDb();

export async function POST(req: NextRequest) {
  console.log("WEbhook simulated");
  const secret = process.env.PAYSTACK_SECRET as string;
  const rebody = await req.json();

  try {
    //validate event
    const hash = crypto
      .createHmac("sha512", secret)
      .update(JSON.stringify(rebody))
      .digest("hex");
    // console.log(hash);
    // console.log(req.headers.get("x-paystack-signature"));
    if (hash == req.headers.get("x-paystack-signature")) {
      // Retrieve the request's body
      const event = rebody;

      // Do something with event
      if (event && event.event === "subscription.create") {
        console.log("Charge is succeful");
        // update payment and subscription details in database
        const transactionData = event.data;

        try {
          await User.findOneAndUpdate(
            { email: transactionData.customer.email },
            { plan: plans.basic },
            { new: true }
          );

          // add subs to DB
          await Subscriptions.create({
            useremail: transactionData.customer.email,
            subid: transactionData.id,
            customerid: transactionData.customer.id,
            amount: transactionData.plan.amount,
            planid: transactionData.plan.id,
            plancode: transactionData.plan.plan_code,
            authcode: transactionData.authorization.authorization_code,
          });
          // console.log(userData, subs);
        } catch (error) {
          console.log(error);
        }

        return NextResponse.json({
          status: 200,
          message: "Transfer successful",
        });
      }
      // console.log(event.event);

      // cancel subscription webhook
      if (event && event.event === "subscription.not_renew") {
        console.log("subscription disabled");
        // update payment and subscription details in database
        const transactionData = event.data;
        console.log(transactionData);
        try {
          await User.findOneAndUpdate(
            { email: transactionData.customer.email },
            { plan: "" },
            { new: true }
          );

          // add subs to DB
          await Subscriptions.findOneAndDelete({
            useremail: transactionData.customer.email,
          });

          // console.log(userData, subs);
        } catch (error) {
          console.log(error);
        }

        return NextResponse.json({
          status: 200,
          message: "Transfer successful",
        });
      }
    }

    // res.send(200);
    return NextResponse.json({ status: 500, message: "Charge not done" });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "error" });
  }
}
