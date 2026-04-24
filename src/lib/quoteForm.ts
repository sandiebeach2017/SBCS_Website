export type FieldType = "text" | "email" | "tel" | "textarea" | "select" | "radio" | "checkbox" | "url";

export type FormField = {
  id: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  helpText?: string;
};

export type FormSection = {
  title: string;
  description?: string;
  fields: FormField[];
};

// Universal fields shown for every package
export const UNIVERSAL_FIELDS: FormSection = {
  title: "About You",
  fields: [
    { id: "name", label: "Your Full Name", type: "text", placeholder: "Jane Smith", required: true },
    { id: "email", label: "Email Address", type: "email", placeholder: "jane@example.com", required: true },
    { id: "phone", label: "Phone Number (optional)", type: "tel", placeholder: "(555) 000-0000" },
    { id: "business_name", label: "Business or Brand Name", type: "text", placeholder: "My Awesome Business", required: true },
    { id: "industry", label: "What industry are you in?", type: "text", placeholder: "e.g. Real Estate, Coaching, Retail", required: true },
    { id: "timeline", label: "When do you need this completed?", type: "select", required: true,
      options: ["As soon as possible", "Within 2 weeks", "Within a month", "Within 2–3 months", "No rush — I'm planning ahead"] },
    { id: "budget_flexible", label: "Is your budget flexible?", type: "radio", options: ["Yes", "No", "I'd like to discuss"] },
    { id: "extra_notes", label: "Anything else we should know upfront?", type: "textarea", placeholder: "Goals, concerns, inspiration sites, etc." },
  ],
};

// Per-feature question sets
export const FEATURE_QUESTIONS: Record<string, FormSection> = {
  website: {
    title: "Website Details",
    description: "Help us understand what kind of website you need.",
    fields: [
      { id: "website_type", label: "What type of website do you need?", type: "radio", required: true,
        options: ["Business / Service site", "Portfolio", "Blog", "E-commerce", "Landing page", "Not sure yet"] },
      { id: "website_pages", label: "How many pages do you need?", type: "select", required: true,
        options: ["1–3 pages", "4–6 pages", "7–10 pages", "10–20 pages", "20+ pages", "Not sure"] },
      { id: "website_existing", label: "Do you already have a website?", type: "radio", required: true,
        options: ["Yes — redesign it", "No — starting fresh"] },
      { id: "website_existing_url", label: "If yes, what's the URL?", type: "url", placeholder: "https://mysite.com" },
      { id: "website_style", label: "How would you describe your ideal style?", type: "radio",
        options: ["Clean & minimal", "Bold & colorful", "Corporate & professional", "Fun & playful", "Luxury & premium", "Not sure — I trust your judgment"] },
      { id: "website_features", label: "What features do you need? (check all that apply)", type: "checkbox",
        options: ["Contact form", "Online booking/scheduling", "Blog", "Photo gallery", "Video embedding", "E-commerce/shop", "Client login area", "Live chat", "FAQ section", "Testimonials section"] },
      { id: "website_content", label: "Do you have content (text, images, logo) ready?", type: "radio",
        options: ["Yes, fully ready", "Partially ready", "No — I need help with content too"] },
      { id: "website_inspiration", label: "Share any websites you love (optional)", type: "textarea", placeholder: "e.g. apple.com, nike.com — and what you like about them" },
    ],
  },

  domain: {
    title: "Domain & Hosting",
    description: "We handle this for you — we just need a few details.",
    fields: [
      { id: "domain_have", label: "Do you already own a domain name?", type: "radio", required: true,
        options: ["Yes — I own one", "No — I need one purchased", "Not sure what a domain is"] },
      { id: "domain_name", label: "If you own one, what is it?", type: "text", placeholder: "e.g. mybusiness.com" },
      { id: "domain_vendor", label: "Who is your domain registered with?", type: "text", placeholder: "e.g. GoDaddy, Namecheap, Google Domains" },
      { id: "domain_preference", label: "If we're buying one, do you have a name in mind?", type: "text", placeholder: "e.g. mybrandname.com" },
      { id: "domain_vendor_pref", label: "Do you have a preferred domain/hosting vendor?", type: "radio",
        options: ["Use your partner vendor", "I want to choose my own vendor", "No preference — recommend one"] },
    ],
  },

  email: {
    title: "Business Email Setup",
    fields: [
      { id: "email_count", label: "How many email addresses do you need?", type: "select", required: true,
        options: ["1", "2", "3", "4", "5", "6–10", "10+"] },
      { id: "email_examples", label: "What email addresses do you want? (e.g. info@, jane@)", type: "textarea",
        placeholder: "info@mybusiness.com, support@mybusiness.com" },
      { id: "email_provider", label: "Do you have a preferred email provider?", type: "radio",
        options: ["Google Workspace (Gmail)", "Microsoft 365 (Outlook)", "No preference — recommend one", "Already have a provider"] },
    ],
  },

  linkedin_individual: {
    title: "LinkedIn Profile — Individual",
    fields: [
      { id: "li_ind_url", label: "Your current LinkedIn profile URL", type: "url", placeholder: "https://linkedin.com/in/yourname" },
      { id: "li_ind_goal", label: "What's the main goal of your LinkedIn profile?", type: "radio", required: true,
        options: ["Find new clients", "Get job offers", "Build thought leadership", "Network in my industry", "All of the above"] },
      { id: "li_ind_count", label: "How many profiles need optimization?", type: "select",
        options: ["1", "2", "3", "4", "5"] },
      { id: "li_ind_headline", label: "What do you do / what's your current title?", type: "text", placeholder: "e.g. Real Estate Agent | Helping First-Time Buyers in Atlanta" },
      { id: "li_ind_content", label: "Do you have a resume or bio we can use as a starting point?", type: "radio",
        options: ["Yes — I'll share it", "Partially", "No — please write from scratch"] },
      { id: "li_ind_keywords", label: "What keywords should clients find you by?", type: "text", placeholder: "e.g. business coach, marketing consultant, real estate Atlanta" },
    ],
  },

  linkedin_business: {
    title: "LinkedIn Company Page",
    fields: [
      { id: "li_biz_url", label: "Current company page URL (if it exists)", type: "url", placeholder: "https://linkedin.com/company/yourcompany" },
      { id: "li_biz_goal", label: "What do you want your company page to do?", type: "radio", required: true,
        options: ["Attract B2B clients", "Recruit talent", "Build brand awareness", "All of the above"] },
      { id: "li_biz_description", label: "Briefly describe your company and what makes it unique", type: "textarea", placeholder: "We help small businesses with...", required: true },
      { id: "li_biz_assets", label: "Do you have a logo and brand colors?", type: "radio",
        options: ["Yes", "No — I need a logo too", "Partially"] },
    ],
  },

  seo: {
    title: "SEO — Search Engine Optimization",
    description: "Help us understand your visibility goals.",
    fields: [
      { id: "seo_current", label: "Do you currently show up on Google?", type: "radio", required: true,
        options: ["Yes, but I want to rank higher", "No, I'm invisible", "I have no idea — please check"] },
      { id: "seo_location", label: "Is your business local, national, or global?", type: "radio",
        options: ["Local — specific city/region", "National", "Global/International"] },
      { id: "seo_location_detail", label: "If local, what city/area?", type: "text", placeholder: "e.g. Atlanta, GA" },
      { id: "seo_keywords", label: "What would your ideal client Google to find you?", type: "textarea",
        placeholder: "e.g. 'web designer Atlanta', 'affordable SEO for small business'" },
      { id: "seo_competitors", label: "Who are your top competitors? (optional)", type: "textarea",
        placeholder: "Their website URLs or business names" },
      { id: "seo_google_analytics", label: "Do you have Google Analytics set up?", type: "radio",
        options: ["Yes", "No", "Not sure"] },
    ],
  },

  content: {
    title: "Content Writing",
    fields: [
      { id: "content_type", label: "What content do you need written?", type: "checkbox", required: true,
        options: ["Website copy (homepage, about, services)", "Blog posts / articles", "LinkedIn posts", "Email newsletter", "Product/service descriptions", "Social media captions"] },
      { id: "content_count", label: "How many pieces of content do you need?", type: "select",
        options: ["1–2", "3–5", "6–10", "10+", "Ongoing monthly"] },
      { id: "content_tone", label: "How should your content sound?", type: "radio",
        options: ["Professional & authoritative", "Friendly & conversational", "Bold & direct", "Inspiring & motivational", "Educational & informative"] },
      { id: "content_audience", label: "Who is your target audience?", type: "textarea",
        placeholder: "e.g. small business owners aged 30–50 in the South who need affordable marketing help" },
      { id: "content_examples", label: "Share any content you love or want to sound like (optional)", type: "textarea",
        placeholder: "Website URLs or paste an example" },
    ],
  },

  brand: {
    title: "Brand Positioning",
    fields: [
      { id: "brand_have", label: "Do you have existing brand assets?", type: "checkbox",
        options: ["Logo", "Color palette", "Fonts/typography", "Brand guidelines", "Tagline/slogan", "None of the above"] },
      { id: "brand_feeling", label: "How do you want people to feel when they encounter your brand?", type: "textarea",
        placeholder: "e.g. confident, excited, reassured, premium..." },
      { id: "brand_differentiator", label: "What makes you different from competitors?", type: "textarea",
        placeholder: "Your unique value proposition", required: true },
      { id: "brand_services", label: "What brand items do you need help with?", type: "checkbox",
        options: ["Logo design", "Color palette selection", "Font pairing", "Brand voice/messaging", "Tagline creation", "Full brand guidelines document"] },
    ],
  },
};

// Map each package to which feature sections to show
export const PACKAGE_FEATURES: Record<string, string[]> = {
  starter: ["website", "domain", "email"],
  growth: ["website", "domain", "email", "linkedin_individual", "seo"],
  professional: ["website", "domain", "email", "linkedin_individual", "seo", "content"],
  elite: ["website", "domain", "email", "linkedin_individual", "linkedin_business", "seo", "content", "brand"],
  enterprise: ["website", "domain", "email", "linkedin_individual", "linkedin_business", "seo", "content", "brand"],
};
