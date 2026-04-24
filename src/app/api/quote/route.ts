import { NextRequest, NextResponse } from "next/server";
import { isEmailConfigured, sendBusinessEmail } from "@/lib/email";

function formatAnswer(value: unknown) {
  if (Array.isArray(value)) {
    return value.length > 0 ? value.join(", ") : "Not provided";
  }

  if (typeof value === "string") {
    return value.trim() || "Not provided";
  }

  return "Not provided";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate basic required fields
    const { answers } = body;
    if (!answers?.name || !answers?.email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    if (!isEmailConfigured()) {
      return NextResponse.json(
        { error: "Email delivery is not configured yet." },
        { status: 500 }
      );
    }

    const answerLines = Object.entries(answers)
      .map(([key, value]) => `${key}: ${formatAnswer(value)}`)
      .join("\n");

    const packageName = typeof body.package === "string" && body.package
      ? body.package
      : "Not selected";
    const addOns = Array.isArray(body.addOns) && body.addOns.length > 0
      ? body.addOns.join(", ")
      : "None";

    await sendBusinessEmail({
      subject: `New Quote Request from ${answers.name}`,
      replyTo: answers.email,
      text: [
        "A new quote request was submitted.",
        "",
        `Name: ${formatAnswer(answers.name)}`,
        `Email: ${formatAnswer(answers.email)}`,
        `Package: ${packageName}`,
        `Add-ons: ${addOns}`,
        `Submitted: ${formatAnswer(body.submittedAt)}`,
        "",
        "Answers:",
        answerLines,
      ].join("\n"),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
