import { NextRequest, NextResponse } from "next/server";
import { isEmailConfigured, sendBusinessEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    if (!isEmailConfigured()) {
      return NextResponse.json({ error: "Email delivery is not configured yet." }, { status: 500 });
    }

    await sendBusinessEmail({
      subject: `New Contact Form Message from ${name}`,
      replyTo: email,
      text: [
        "A new contact form message was submitted.",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject || "Not provided"}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form send failed:", error);
    return NextResponse.json(
      {
        error:
          "We could not send your message email right now. Please try again in a few minutes.",
      },
      { status: 500 }
    );
  }
}
