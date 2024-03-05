import { NextRequest, NextResponse } from "next/server";
import User from "@/models/UserModel";

import { connectToDb } from "@/dbconfig/dbconfig";
import Subscriptions from "@/models/Subscription";

connectToDb();

// Signup request
export async function POST(request: NextRequest) {
  try {
    const reqbody = await request.json();
    console.log("cancel");

    const userSub = await Subscriptions.findOne({ useremail: reqbody.email });

    if (!userSub) {
      const resp = NextResponse.json({
        status: 404,
        message: "Subscription already cancelled",
      });
      resp.cookies.set("token", "");
      return resp;
    }
    // get subscription using subid
    const customerdata = await fetch(
      `https://api.paystack.co/customer/${userSub.useremail}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
        },
      }
    );
    const respDta = await customerdata.json();
    if (!respDta.data.subscriptions[0]) {
      const resp = NextResponse.json({
        status: "404",
        message: "Subscription already cancelled",
      });
      resp.cookies.set("token", "");
      return resp;
    }

    const SubCode = respDta.data.subscriptions[0].subscription_code;

    // Send The link to the usersEmail
    const sendcanceMail = await fetch(
      `https://api.paystack.co/subscription/${SubCode}/manage/link`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
        },
      }
    );
    const resplink = await sendcanceMail.json();

    return NextResponse.json({
      status: 200,
      respData: resplink.data.link,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "Server error" });
  }
}
