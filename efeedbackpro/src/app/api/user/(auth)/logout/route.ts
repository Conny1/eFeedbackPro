import { NextRequest, NextResponse } from "next/server";

export function GET() {
  const response = NextResponse.json({ status: 200, message: "Logged Out" });

  response.cookies.set("token", "");

  return response;

  return;
}
