/**
 * Server-side price data. Never import this on the client.
 * All amounts are in cents (USD). Deposits are exactly 50% of the full price.
 */

export type PriceEntry = {
  id: string;
  name: string;
  fullPriceCents: number;
  depositCents: number; // 50% upfront
};

export const STRIPE_PRICES: Record<string, PriceEntry> = {
  starter: {
    id: "starter",
    name: "Starter Package",
    fullPriceCents: 49900,   // $499.00
    depositCents: 24950,     // $249.50
  },
  growth: {
    id: "growth",
    name: "Growth Package",
    fullPriceCents: 99900,   // $999.00
    depositCents: 49950,     // $499.50
  },
  professional: {
    id: "professional",
    name: "Professional Package",
    fullPriceCents: 189900,  // $1,899.00
    depositCents: 94950,     // $949.50
  },
  elite: {
    id: "elite",
    name: "Elite Package",
    fullPriceCents: 349900,  // $3,499.00
    depositCents: 174950,    // $1,749.50
  },
  // enterprise is custom-quoted — no fixed Stripe price
};

export function getPriceEntry(packageId: string): PriceEntry | null {
  return STRIPE_PRICES[packageId] ?? null;
}
