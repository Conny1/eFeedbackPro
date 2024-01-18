import { NextRequest, NextResponse } from "next/server";
import Business from "@/models/BusinessModel";
import { connectToDb } from "@/dbconfig/dbconfig";

connectToDb();
// @description add a new business
// @route    /api/business/ -post
export async function POST(request: NextRequest) {
  const reqbody = await request.json();

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
  try {
    const reqbody = await request.json();

    const respData = await Business.findByIdAndUpdate(
      reqbody.id,
      {
        name: reqbody.name,
      },
      { new: true }
    );
    if (!respData)
      return NextResponse.json({ message: "Not found", status: 404 });
    return NextResponse.json(respData);
  } catch (error) {
    return NextResponse.json({ message: "Server error", status: 500 });
  }
}

// delete
