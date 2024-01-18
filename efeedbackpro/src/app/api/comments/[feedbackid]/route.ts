import Comment from "@/models/CommentModel";
import { NextResponse } from "next/server";

// @descrition GET all a comments by feedback
// @route   /api/comment -GET
export async function GET(
  request: NextResponse,
  { params }: { params: { feedbackid: string } }
) {
  try {
    const id = params.feedbackid;

    const commentresp = await Comment.find({ feedback: id });
    if (commentresp.length === 0)
      return NextResponse.json({ message: "Not found", status: 404 });

    return NextResponse.json({ status: 200, commentresp });
  } catch (error) {
    NextResponse.json({ message: "Server error", status: 500 });
  }
}
