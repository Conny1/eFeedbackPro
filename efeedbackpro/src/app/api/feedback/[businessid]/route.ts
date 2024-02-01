import { connectToDb } from "@/dbconfig/dbconfig";
import { verifyToken } from "@/helperfunctions/helperfunctions";
import Business from "@/models/BusinessModel";
import Feedback from "@/models/FeedbackModel";
import { NextRequest, NextResponse } from "next/server";

connectToDb();

// @route    /api/feedback/:businessid -GET
// @description get feedback based on businessid
export async function GET(
  request: NextRequest,
  { params }: { params: { businessid: string } }
) {
  const id = params.businessid;
  if (id.length < 24 || id.length > 24)
    return NextResponse.json({ message: "Not found", status: 404 });
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");

  if (query) {
    try {
      const business = await Business.findById(id);
      if (!business) {
        return NextResponse.json({ message: "Not found", status: 404 });
      }

      const data = await Feedback.find({
        business: id,
        isPublic: query,
      });

      if (data.length === 0) {
        return NextResponse.json({
          message: "Not found",
          status: 404,
          business,
        });
      }

      return NextResponse.json({ status: 200, data, business });
    } catch (error) {
      console.log(error);

      return NextResponse.json({ status: 500, message: "server error" });
    }
  } else {
    const token = request.cookies.get("token")?.value;
    const isAuthenticated = verifyToken(token);
    if (!isAuthenticated)
      return NextResponse.json({ status: 401, message: "unauthorised" });
    try {
      const data = await Feedback.find({
        business: id,
      });

      if (data.length === 0) {
        return NextResponse.json({ message: "Not found", status: 404 });
      }

      return NextResponse.json({ status: 200, data });
    } catch (error) {
      console.log(error);

      return NextResponse.json({ status: 500, message: "server error" });
    }
  }
}

// @descrition make feedback public or private
// @route   /api/feedback/:feedback -PUT
export async function PUT(
  request: NextResponse,
  { params }: { params: { businessid: string } }
) {
  const token = request.cookies.get("token")?.value;
  const isAuthenticated = verifyToken(token);
  if (!isAuthenticated)
    return NextResponse.json({ status: 401, message: "unauthorised" });
  const feedbackid = params.businessid;
  try {
    const { isPublic } = await request.json();

    const rsp = await Feedback.findByIdAndUpdate(
      feedbackid,
      {
        isPublic: !isPublic,
      },
      { new: true }
    );

    return NextResponse.json({
      status: 200,
      message: "voted",
      data: rsp,
    });
  } catch (error) {
    NextResponse.json({ message: "Server error", status: 500 });
  }
}
