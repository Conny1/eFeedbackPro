import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/UserModel";
import jwt from "jsonwebtoken";
import { connectToDb } from "@/dbconfig/dbconfig";

connectToDb();

// Signup request
export async function POST(request: NextRequest) {
  try {
    const reqbody = await request.json();

    const user = await User.findOne({ email: reqbody.email });

    if (!user)
      return NextResponse.json({
        status: 404,
        message: "Email With that Accoun does not exist",
      });
    const Ispassword = bcrypt.compareSync(reqbody.password, user.password);
    if (!Ispassword)
      return NextResponse.json({
        status: 401,
        message: "incorrect email or password",
      });

    const secret = process.env.SECRET_KEY as string;

    const authtoken = jwt.sign(
      { id: user._id, isadmin: reqbody.isadmin },
      secret
    );
    const { password, ...others } = user._doc;
    const response = NextResponse.json({ status: 200, others });
    response.cookies.set("token", authtoken, { httpOnly: true });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "Server error" });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { userid, plan } = await request.json();
    // console.log(userid, plan);
    const user = await User.findByIdAndUpdate(
      userid,
      { plan: plan },
      { new: true }
    );

    if (!user)
      return NextResponse.json({
        status: 500,
        message: "server error",
      });

    return NextResponse.json({ status: 200, message: "Subscribed", user });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "Server error" });
  }
}
