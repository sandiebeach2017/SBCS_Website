export type AddOn = {
  id: string;
  label: string;
  price: string;
};

export type Package = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  priceNote: string;
  color: string;
  badge?: string;
  includes: string[];
  addOns?: AddOn[];
};

export const PACKAGES: Package[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Perfect for getting online for the first time",
    price: "$499",
    priceNote: "one-time",
    color: "border-[var(--brand-border)]",
    includes: [
      "3-page website (Home, About, Contact)",
      "Mobile-friendly design",
      "Domain purchase assistance (any vendor)",
      "Business email setup (1 address)",
      "1 round of revisions",
      "Basic SEO setup",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "For businesses ready to attract more clients",
    price: "$999",
    priceNote: "one-time",
    color: "border-[var(--brand-border)]",
    includes: [
      "Up to 6-page website",
      "Mobile-friendly design",
      "Domain purchase assistance (any vendor)",
      "Business email setup (up to 3 addresses)",
      "LinkedIn profile optimization (1 person)",
      "On-page SEO for all pages",
      "2 rounds of revisions",
      "Contact / inquiry form",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    tagline: "A complete digital presence for growing brands",
    price: "$1,899",
    priceNote: "one-time",
    color: "border-[var(--brand-blue)]",
    badge: "Most Popular",
    includes: [
      "Up to 10-page website",
      "Custom brand-aligned design",
      "Domain purchase assistance (any vendor)",
      "Business email setup (up to 5 addresses)",
      "LinkedIn profile optimization (up to 2 people)",
      "Full SEO strategy + keyword research",
      "3 blog posts / content pieces",
      "3 rounds of revisions",
      "Google Analytics setup",
      "Change management included",
    ],
  },
  {
    id: "elite",
    name: "Elite",
    tagline: "For brands that want to dominate their niche",
    price: "$3,499",
    priceNote: "one-time",
    color: "border-[var(--brand-gold)]",
    badge: "Best Value",
    includes: [
      "Up to 20-page website",
      "Premium custom design + animations",
      "Domain purchase assistance (any vendor)",
      "Business email setup (up to 10 addresses)",
      "LinkedIn profile optimization (up to 5 people or company page)",
      "Full SEO strategy + monthly content plan",
      "8 blog posts / content pieces",
      "Unlimited revisions (within scope)",
      "Google Analytics + Search Console setup",
      "Change management + priority support",
      "30-day post-launch support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "Fully custom — built around your unique goals",
    price: "Custom",
    priceNote: "contact us for a quote",
    color: "border-[var(--brand-border)]",
    includes: [
      "Everything in Elite",
      "Custom feature development",
      "E-commerce / booking / client portal",
      "Ongoing retainer options",
      "Dedicated account manager",
      "SLA-backed support",
    ],
  },
];

export const A_LA_CARTE: AddOn[] = [
  { id: "extra-page", label: "Additional website page", price: "+$75/page" },
  { id: "extra-blog", label: "Additional blog post / article", price: "+$60/post" },
  { id: "extra-linkedin", label: "Additional LinkedIn profile optimization", price: "+$149/profile" },
  { id: "linkedin-company", label: "LinkedIn company page setup", price: "+$199" },
  { id: "logo-design", label: "Logo design", price: "+$299" },
  { id: "brand-kit", label: "Full brand kit (colors, fonts, logo, guidelines)", price: "+$499" },
  { id: "monthly-seo", label: "Monthly SEO maintenance (per month)", price: "+$199/mo" },
  { id: "monthly-content", label: "Monthly content writing (2 posts/mo)", price: "+$149/mo" },
  { id: "google-ads", label: "Google Ads setup + 1-month management", price: "+$299" },
  { id: "social-setup", label: "Social media profile setup (up to 3 platforms)", price: "+$199" },
  { id: "domain-purchase", label: "Domain purchase (via partner vendor)", price: "+$20–$50/yr" },
  { id: "extra-email", label: "Additional business email addresses (5-pack)", price: "+$49" },
];
