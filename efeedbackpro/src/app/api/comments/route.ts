import { connectToDb } from "@/dbconfig/dbconfig";
import Comment from "@/models/CommentModel";
import Feedback from "@/models/FeedbackModel";
import { NextResponse } from "next/server";

connectToDb();

// @descrition Give a comment
// @route   /api/comment -POST
export async function POST(request: NextResponse) {
  try {
    const reqBody = await request.json();
    // addcoments
    const commentresp = await Comment.create({
      comment: reqBody.comment,
      feedback: reqBody.feedbackid,
    });

    // update commentids on feedback
    await Feedback.findByIdAndUpdate(commentresp.feedback, {
      $addToSet: { comments: commentresp._id },
    });

    return NextResponse.json({ status: 200, commentresp });
  } catch (error) {
    NextResponse.json({ message: "Server error", status: 500 });
  }
}

// @descrition Like a comment
// @route   /api/comment -PUT
export async function PUT(request: NextResponse) {
  try {
    const reqBody = await request.json();

    const data = await Comment.findByIdAndUpdate(reqBody.commentid, {
      $inc: { likes: 1 },
    });

    return NextResponse.json({ status: 200, message: "liked" });
  } catch (error) {
    NextResponse.json({ message: "Server error", status: 500 });
  }
}
