import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { getPriceEntry } from "@/lib/stripe-prices";

function getStripeClient() {
  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) {
    return null;
  }
  return new Stripe(apiKey);
}

export async function POST(req: NextRequest) {
  try {
    const stripe = getStripeClient();
    if (!stripe) {
      return NextResponse.json(
        { error: "Stripe is not configured yet." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { packageId, customerEmail, customerName } = body as {
      packageId: string;
      customerEmail?: string;
      customerName?: string;
    };

    if (!packageId || typeof packageId !== "string") {
      return NextResponse.json({ error: "packageId is required." }, { status: 400 });
    }

    const entry = getPriceEntry(packageId);
    if (!entry) {
      return NextResponse.json(
        { error: "That package is not available for direct checkout. Please contact us for a custom quote." },
        { status: 400 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: customerEmail || undefined,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${entry.name} — 50% Deposit`,
              description:
                "50% deposit to reserve your project slot. The remaining 50% is due before final delivery.",
            },
            unit_amount: entry.depositCents,
          },
          quantity: 1,
        },
      ],
      metadata: {
        packageId: entry.id,
        packageName: entry.name,
        customerName: customerName ?? "",
        fullPriceCents: String(entry.fullPriceCents),
        depositCents: String(entry.depositCents),
      },
      success_url: `${siteUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/payment/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout creation failed:", error);
    return NextResponse.json(
      { error: "Unable to start checkout. Please try again or contact us directly." },
      { status: 500 }
    );
  }
}
