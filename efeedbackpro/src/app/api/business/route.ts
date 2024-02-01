import { NextRequest, NextResponse } from "next/server";
import Business from "@/models/BusinessModel";
import { connectToDb } from "@/dbconfig/dbconfig";
import { verifyToken } from "@/helperfunctions/helperfunctions";
import Feedback from "@/models/FeedbackModel";
import Comment from "@/models/CommentModel";

connectToDb();
// @description add a new business
// @route    /api/business/ -post
export async function POST(request: NextRequest) {
  const reqbody = await request.json();

  const token = request.cookies.get("token")?.value;
  const isAuthenticated = verifyToken(token);
  if (!isAuthenticated)
    return NextResponse.json({ status: 401, message: "unauthorised" });

  try {
    const busnessresp = await Business.create({
      name: reqbody.name,
      userid: reqbody.userid,
    });

    return NextResponse.json({ status: 200, busnessresp });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "server error" });
  }
}

// @description Edit business name
// @route    /api/business/ - PUT
export async function PUT(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const isAuthenticated = verifyToken(token);
  if (!isAuthenticated)
    return NextResponse.json({ status: 401, message: "unauthorised" });
  try {
    const reqbody = await request.json();

    const respData = await Business.findByIdAndUpdate(
      reqbody.id,
      { name: reqbody.name },
      { new: true }
    );
    console.log(respData);
    if (!respData)
      return NextResponse.json({ message: "Not found", status: 404 });

    return NextResponse.json({ status: 200, respData });
  } catch (error) {
    return NextResponse.json({ message: "Server error", status: 500 });
  }
}

// @description Delete business name
// @route    /api/business/ - PUT
export async function DELETE(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const isAuthenticated = verifyToken(token);
  if (!isAuthenticated)
    return NextResponse.json({ status: 401, message: "unauthorised" });

  try {
    const { businessid } = await request.json();
    // find feedback related to that business get comments and delete them;
    const feedback = await Feedback.find({ business: businessid });
    if (feedback.length > 0) {
      await Promise.all(
        feedback.map(async (item) => {
          return await Comment.findOneAndDelete({ feedback: item._id });
        })
      );
    }

    // delete feedbacks related to the business
    await Feedback.deleteMany({ business: businessid });

    // delete the business
    const resp = await Business.findByIdAndDelete(businessid);
    if (resp) {
      return NextResponse.json({ status: 200, message: "Deleted" });
    }
  } catch (error) {
    console.log(error);
  }
}
