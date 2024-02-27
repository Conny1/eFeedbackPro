import Subscriptions from "@/models/Subscription";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  let stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  const { email } = await req.json();
  // console.log(email);

  try {
    const data = await Subscriptions.find({ useremail: email });
    if (data.length === 0) {
      return NextResponse.json({
        status: 404,
        message: "No was subscription made",
      });
    }
    const subid = data[0].subid;
    // cancel the stripe subscription
    await stripe.subscriptions.cancel(subid);

    // find the subscription data in Subscriptions adn delete
    await Subscriptions.findByIdAndDelete(data[0]._id);

    // update user subscription data
    const resp = await User.findOneAndUpdate(
      { email: email },
      { plan: "" },
      { new: true }
    );

    return NextResponse.json({ status: 200, user: resp });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "server error" });
  }
}
