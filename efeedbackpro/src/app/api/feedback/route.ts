import { NextRequest, NextResponse } from "next/server";
import Business from "@/models/BusinessModel";
import { connectToDb } from "@/dbconfig/dbconfig";
import Client from "@/models/ClientModel";
import Feedback from "@/models/FeedbackModel";
import Comment from "@/models/CommentModel";

connectToDb();
// @description give a feedback
// @route    /api/feedback/ -post
export async function POST(request: NextRequest) {
  const reqbody = await request.json();

  try {
    //   request to add client to db
    const clientDetails = await Client.create({ email: reqbody.email });
    if (!clientDetails)
      return NextResponse.json({
        status: 401,
        message: "Client details not captured",
      });

    // take userid from business
    const businessData = await Business.findById(reqbody.businessid);
    if (!businessData)
      return NextResponse.json({
        status: 404,
        message: "Not found",
      });

    //   add the business to db
    const feedbackresp = await Feedback.create({
      title: reqbody.title,
      description: reqbody.description,
      user: businessData.userid,
      business: reqbody.businessid,
      client: clientDetails._id,
    });

    // update feedback details to clients model
    await Client.findByIdAndUpdate(clientDetails._id, {
      feedback: feedbackresp._id,
      business: feedbackresp.business,
    });

    return NextResponse.json({ status: 200, feedbackresp });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "server error" });
  }
}

// @descrition upvote a feedback
// @route   /api/feedback -PUT
export async function PUT(request: NextResponse) {
  try {
    const reqBody = await request.json();

    const rsp = await Feedback.findByIdAndUpdate(
      reqBody.feedbackid,
      {
        $inc: { votes: 1 },
      },
      { new: true }
    );

    return NextResponse.json({
      status: 200,
      message: "voted",
      data: rsp.votes,
    });
  } catch (error) {
    NextResponse.json({ message: "Server error", status: 500 });
  }
}

// @descrition Delete a feedback
// @route   /api/feedback -DELETE
export async function DELETE(request: NextResponse) {
  try {
    const { feedbackid, comments, businessid } = await request.json();

    // delete feedback first
    await Feedback.findByIdAndDelete(feedbackid);

    // delete [comments] related to the fedback
    if (comments) {
      if (comments.length > 0) {
        await Promise.all(
          comments.map(async (id: string) => {
            return await Comment.findByIdAndDelete(id);
          })
        );
      }
    }

    return NextResponse.json({
      status: 200,
      message: "Deleted",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error", status: 500 });
  }
}
