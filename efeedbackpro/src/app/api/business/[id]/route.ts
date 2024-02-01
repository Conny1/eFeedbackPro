import { NextRequest, NextResponse } from "next/server";
import Business from "@/models/BusinessModel";
import { connectToDb } from "@/dbconfig/dbconfig";
import { verifyToken } from "@/helperfunctions/helperfunctions";

connectToDb();

// @description Get business based on Userid
// @route    /api/business/:id - GET

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = request.cookies.get("token")?.value;
  const isAuthenticated = verifyToken(token);
  if (!isAuthenticated)
    return NextResponse.json({ status: 401, message: "unauthorised" });
  try {
    const id = params.id;

    const respData = await Business.find({ userid: id });
    if (respData.length === 0)
      return NextResponse.json({ message: "Not found", status: 404 });
    return NextResponse.json({ status: 200, respData });
  } catch (error) {
    // console.log(error);
    return NextResponse.json({ message: "Server error", status: 500 });
  }
}
