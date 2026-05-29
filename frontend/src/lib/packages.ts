export type Package = {
  id: string;
  name: string;
  subtitle: string;
  priceRange: string;
  amount: number; // base amount in kobo
  description: string;
  features: string[];
  deliverables: string[];
  popular?: boolean;
};

export const PACKAGES: Package[] = [
  {
    id: "starter-consult",
    name: "Starter Consult",
    subtitle: "Idea-to-Business Package",
    priceRange: "₦75k – ₦120k",
    amount: 75000 * 100,
    description:
      "For students, NYSC entrepreneurs, side hustlers & first-time founders ready to transform an idea into a real business.",
    features: [
      "1-on-1 strategy consultation",
      "Business idea refinement & lean model canvas",
      "Mini business plan & market research",
      "Startup naming guidance",
      "Basic logo design & brand color selection",
      "WhatsApp business setup guidance",
    ],
    deliverables: ["Startup Roadmap PDF", "Mini Business Plan", "Brand Starter Assets"],
  },
  {
    id: "business-growth",
    name: "Business Growth",
    subtitle: "SME Structuring Package",
    priceRange: "₦180k – ₦300k",
    amount: 180000 * 100,
    description:
      "For existing SMEs, business owners scaling or restructuring, and entrepreneurs needing structured growth.",
    features: [
      "Investor-ready business plan",
      "Competitive analysis & positioning strategy",
      "Professional logo suite",
      "Social media branding kit",
      "Company profile design",
      "Pitch deck overview & growth roadmap",
    ],
    deliverables: [
      "Full Business Plan",
      "Company Profile",
      "Financial Forecast",
      "Brand Assets",
    ],
  },
  {
    id: "startup-accelerator",
    name: "Startup Accelerator",
    subtitle: "Launch & Scale Package",
    priceRange: "₦350k – ₦650k",
    amount: 350000 * 100,
    description:
      "For serious startups and founders building investor-ready businesses.",
    features: [
      "Feasibility study & investor-grade business plan",
      "Financial modeling & pitch deck design",
      "Go-to-market strategy",
      "Full branding & identity system",
      "Website content & launch strategy",
      "30-day post-launch advisory",
    ],
    deliverables: [
      "Investor Package",
      "Brand Identity System",
      "Launch Strategy",
      "Pitch Deck",
    ],
    popular: true,
  },
  {
    id: "visionary-elite",
    name: "Visionary Elite",
    subtitle: "Executive Consulting Retainer",
    priceRange: "₦800k – ₦2.5M+",
    amount: 800000 * 100,
    description:
      "For established brands and founders scaling aggressively.",
    features: [
      "Executive consulting & expansion strategy",
      "Operational structuring & corporate branding",
      "Investor & funding preparation",
      "Market penetration strategy",
      "Monthly strategy meetings",
    ],
    deliverables: [
      "Expansion Strategy",
      "Corporate Brand System",
      "Investor Deck",
      "Ops Playbook",
    ],
  },
];