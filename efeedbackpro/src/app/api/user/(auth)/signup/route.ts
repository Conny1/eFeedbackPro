import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/UserModel";
import { connectToDb } from "@/dbconfig/dbconfig";

// Signup request
connectToDb();
export async function POST(request: NextRequest) {
  try {
    const reqbody = await request.json();
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(reqbody.password, salt);

    const checkEmail = await User.findOne({ email: reqbody.email });
    // console.log(checkEmail);
    if (checkEmail)
      return NextResponse.json({
        status: 400,
        message: "Account with that email exists",
      });

    await User.create({
      name: reqbody.name,
      email: reqbody.email,
      password: hash,
    });

    return NextResponse.json({ status: 200, message: "AccountCreated" });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Server error" });
  }
}
