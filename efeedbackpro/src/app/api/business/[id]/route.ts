import { NextRequest, NextResponse } from "next/server";
import Business from "@/models/BusinessModel";
import { connectToDb } from "@/dbconfig/dbconfig";

connectToDb();

// @description Get business based on Userid
// @route    /api/business/:id - GET

export async function GET(
  _: undefined,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const respData = await Business.find({ userid: id });
    if (respData.length === 0)
      return NextResponse.json({ message: "Not found", status: 404 });
    return NextResponse.json(respData);
  } catch (error) {
    // console.log(error);
    return NextResponse.json({ message: "Server error", status: 500 });
  }
}
