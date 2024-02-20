import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendMail } from "@/helperfunctions/email";
// @ description Confirm email fro password rest
// @ route /api/user/resetpassword -POST

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email)
      return NextResponse.json({ status: 401, message: "unauthorised" });

    const data = await User.findOne({ email: email });

    if (!data)
      return NextResponse.json({ status: 404, message: "invalid email" });

    // send link to email
    await sendMail(data.email);
    return NextResponse.json({
      status: 200,
      message: " Password reset Link has been sent to your email account",
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "server error" });
  }
}

// @ description Confirm email  and reset password
// @ route /api/user/resetpassword -PUT

export async function PUT(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password)
      return NextResponse.json({ status: 401, message: "unauthorised" });

    const data = await User.findOne({ email: email });

    if (!data)
      return NextResponse.json({ status: 404, message: "invalid email" });

    //  hash new password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    // update hashed password
    await User.findByIdAndUpdate(data._id, { password: hash });

    // send link to email
    return NextResponse.json({
      status: 200,
      message: "Your password was reset",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "server error" });
  }
}
