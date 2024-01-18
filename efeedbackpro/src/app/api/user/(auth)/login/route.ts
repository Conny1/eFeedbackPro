import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/UserModel";
import jwt from "jsonwebtoken";

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

    const authtoken = jwt.sign(
      { id: user._id, isadmin: reqbody.isadmin },
      "key"
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
