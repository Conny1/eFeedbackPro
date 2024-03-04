import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

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
      if (event && event.event === "charge.success") {
        console.log("Charge is succeful");
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
