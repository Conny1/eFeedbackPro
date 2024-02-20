import { replyToFeedback } from "@/helperfunctions/email";
import Client from "@/models/ClientModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { clientid, message, sender } = await request.json();
  try {
    const clientData = await Client.findById(clientid);
    if (!clientData) {
      return NextResponse.json({ status: 404, message: "Client not found" });
    }
    // send mail
    const clientemail = clientData.email as string;

    await replyToFeedback({ message, sender, email: clientemail });
    return NextResponse.json({ status: 200, message: "Message sent" });
  } catch (error) {}
}
