import Feedback from "@/models/FeedbackModel";
import { NextRequest, NextResponse } from "next/server";

// @route    /api/feedback/:businessid -GET
// @description get feedback based on businessid
export async function GET(
  request: NextRequest,
  { params }: { params: { businessid: string } }
) {
  const id = params.businessid;

  try {
    const data = await Feedback.find({ business: id });

    if (data.length === 0) {
      return NextResponse.json({ message: "Not found", status: 200 });
    }

    return NextResponse.json({ status: 200, data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "server error" });
  }
}
