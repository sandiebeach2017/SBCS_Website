import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { sendBusinessEmail } from "@/lib/email";

// Required: disable Next.js body parsing so Stripe can verify the raw body.
export const dynamic = "force-dynamic";

function getStripeClient() {
  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) {
    return null;
  }
  return new Stripe(apiKey);
}

export async function POST(req: NextRequest) {
  const stripe = getStripeClient();
  if (!stripe) {
    return NextResponse.json({ error: "Stripe is not configured yet." }, { status: 500 });
  }

  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing Stripe signature." }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is not set.");
    return NextResponse.json({ error: "Webhook secret not configured." }, { status: 500 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const packageName = session.metadata?.packageName ?? "Unknown Package";
    const customerName = session.metadata?.customerName ?? "Not provided";
    const customerEmail = session.customer_email ?? "Not provided";
    const depositPaid = session.amount_total != null
      ? `$${(session.amount_total / 100).toFixed(2)}`
      : "Unknown";
    const fullPrice = session.metadata?.fullPriceCents
      ? `$${(Number(session.metadata.fullPriceCents) / 100).toFixed(2)}`
      : "Unknown";
    const remainingBalance = session.metadata?.fullPriceCents && session.metadata?.depositCents
      ? `$${((Number(session.metadata.fullPriceCents) - Number(session.metadata.depositCents)) / 100).toFixed(2)}`
      : "Unknown";

    try {
      await sendBusinessEmail({
        subject: `New Deposit Received — ${packageName}`,
        replyTo: customerEmail !== "Not provided" ? customerEmail : undefined,
        text: [
          "A 50% deposit has been received via Stripe.",
          "",
          `Package:          ${packageName}`,
          `Customer Name:    ${customerName}`,
          `Customer Email:   ${customerEmail}`,
          `Deposit Paid:     ${depositPaid}`,
          `Full Package Price: ${fullPrice}`,
          `Remaining Balance:  ${remainingBalance} (due before final delivery)`,
          "",
          `Stripe Session ID: ${session.id}`,
          `Payment Intent:    ${session.payment_intent ?? "N/A"}`,
          "",
          "Next steps:",
          "1. Send the client the project contract to sign.",
          "2. Begin work once the contract is signed.",
          "3. Invoice the remaining balance before final delivery.",
        ].join("\n"),
      });
    } catch (emailErr) {
      // Log but don't fail — payment is confirmed regardless.
      console.error("Failed to send deposit notification email:", emailErr);
    }
  }

  return NextResponse.json({ received: true });
}
