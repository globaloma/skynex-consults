import { BriefcaseBusiness, Globe, LineChart, Palette, Target, TrendingUp } from "lucide-react";

export const SITE_CONFIG = {
  name: "Skynex Consults",
  shortName: "Skynex Consults",
  tagline: "Clarity in Every Decision",
  description:
    "Strategy-led consulting for startups, SMEs, and business owners seeking growth, clarity, and execution support.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/og-image.jpg",
};

export const COMPANY_INFO = {
  email: "info@skynexconsults.com",
  phone: "+2348139703852",
  whatsapp: "+2348139703852",
  address: "Lagos, Nigeria",
  officeHours: "Mon - Fri, 9:00 AM - 5:00 PM",
};

export const SOCIAL_LINKS = {
  linkedin: "https://linkedin.com/company/skynexconsults",
  instagram: "https://instagram.com/skynexconsults",
  x: "https://x.com/skynexconsults",
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Booking", href: "/booking" },
  { label: "Packages", href: "/packages" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_LINKS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Book a Consultation", href: "/booking" },
  { label: "Packages", href: "/packages" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

export const CTA_LABELS = {
  primary: "Book a Consultation",
  secondary: "Explore Our Services",
  talk: "Talk to a Consultant",
  getStarted: "Get Started",
  schedule: "Schedule a Session",
  workWithUs: "Work With Us",
};

export const WHY_POINTS = [
  {
    title: "Strategy-led guidance",
    description:
      "We help businesses make grounded decisions through structured planning, insight, and practical direction.",
  },
  {
    title: "Tailored engagement",
    description:
      "Every business is different. Our recommendations are shaped by your goals, market realities, and stage of growth.",
  },
  {
    title: "Outcome-focused support",
    description:
      "We go beyond ideas to define clear deliverables, priorities, and next steps that move your business forward.",
  },
  {
    title: "Professional credibility",
    description:
      "Our approach is designed to communicate seriousness, trust, and readiness to clients, partners, and investors.",
  },
];

export const CORE_VALUES = [
  {
    title: "Clarity",
    description: "We simplify complexity and help clients make decisions with confidence.",
  },
  {
    title: "Integrity",
    description: "We build trust through honesty, professionalism, and responsible guidance.",
  },
  {
    title: "Excellence",
    description: "We hold our work to a high standard and deliver with care and precision.",
  },
  {
    title: "Growth",
    description: "We are committed to sustainable progress for the businesses we serve.",
  },
  {
    title: "Partnership",
    description: "We work collaboratively and stay aligned with each client’s business goals.",
  },
];

export const SERVICES = [
  {
    slug: "business-strategy-planning",
    title: "Business Strategy & Planning",
    headline: "Build a stronger business foundation with clear strategic direction.",
    shortDescription:
      "We help startups and growing businesses define structure, direction, and practical plans for sustainable growth.",
    description:
      "Our business strategy and planning service supports founders and business owners in making more confident decisions. From business model design to financial planning and risk analysis, we help you translate ideas into structured, investor-aware, and execution-ready strategies.",
    whoItsFor:
      "Startups, SMEs, founders preparing to launch, and businesses seeking strategic clarity, funding readiness, or expansion planning.",
    outcomes: [
      "Business model development",
      "Market entry and feasibility analysis",
      "Investor-ready and grant-ready business plans",
      "Financial projections and budgeting",
      "Risk assessment and mitigation planning",
    ],
    icon: BriefcaseBusiness,
  },
  {
    slug: "marketing-growth-consulting",
    title: "Marketing & Growth Consulting",
    headline: "Position your business to attract, convert, and grow more effectively.",
    shortDescription:
      "We develop strategic go-to-market plans, customer acquisition frameworks, and positioning systems that support business growth.",
    description:
      "Growth requires more than promotion. We help businesses define their market position, refine their offer, identify the right acquisition channels, and create structured go-to-market approaches that improve traction and visibility.",
    whoItsFor:
      "Businesses entering new markets, refining their offer, improving traction, or strengthening customer acquisition efforts.",
    outcomes: [
      "Go-to-market strategy",
      "Customer acquisition planning",
      "Brand and market positioning",
      "Growth roadmap alignment",
      "Clearer channel and message direction",
    ],
    icon: TrendingUp,
  },
  {
    slug: "web-development-digital-presence",
    title: "Web Development & Digital Presence",
    headline: "Create a digital presence that reflects your credibility and supports conversion.",
    shortDescription:
      "We design and develop business websites and advise on digital presence strategy to help brands appear credible and accessible online.",
    description:
      "A business website should do more than exist. It should communicate trust, position your business clearly, and support inquiries or conversions. We build professional websites and support businesses in aligning their digital presence with their growth goals.",
    whoItsFor:
      "Businesses that need a professional website, a stronger online presence, or a more strategic digital brand experience.",
    outcomes: [
      "Business website design and development",
      "Improved digital brand credibility",
      "Clear service presentation",
      "Conversion-focused user journeys",
      "Digital presence strategy recommendations",
    ],
    icon: Globe,
  },
  {
    slug: "branding-business-identity",
    title: "Branding & Business Identity Development",
    headline: "Develop a business identity that is consistent, professional, and memorable.",
    shortDescription:
      "We help businesses shape visual identity and messaging systems that communicate who they are and how they should be perceived.",
    description:
      "Strong businesses are recognised not only by what they offer, but by how clearly they present it. We support clients with logo direction, brand colors, typography guidance, and messaging alignment that improve consistency and perception across touchpoints.",
    whoItsFor:
      "Startups, growing businesses, and founders looking to strengthen how their business is seen and understood.",
    outcomes: [
      "Visual identity direction",
      "Logo and brand system support",
      "Brand colour and typography guidance",
      "Messaging and positioning clarity",
      "More consistent business presentation",
    ],
    icon: Palette,
  },
  {
    slug: "market-positioning-advisory",
    title: "Market Positioning Advisory",
    headline: "Clarify your value in the market and stand out with purpose.",
    shortDescription:
      "We help businesses define the position they want to occupy in the minds of their audience and stakeholders.",
    description:
      "Positioning shapes how a business is understood, compared, and trusted. Our advisory process helps refine your value proposition, audience alignment, differentiation, and strategic message so that your brand can compete more effectively.",
    whoItsFor:
      "Businesses facing unclear differentiation, message inconsistency, or difficulty standing out in a competitive market.",
    outcomes: [
      "Value proposition refinement",
      "Audience-fit clarity",
      "Competitive differentiation",
      "Positioning framework",
      "Improved strategic messaging",
    ],
    icon: Target,
  },
  {
    slug: "business-growth-advisory",
    title: "Business Growth Advisory",
    headline: "Make better growth decisions with structured advisory support.",
    shortDescription:
      "We provide consulting support for businesses navigating growth, expansion, restructuring, or strategic decision-making.",
    description:
      "As businesses grow, decisions become more complex. We help business owners and leadership teams think through expansion options, operational priorities, strategic pivots, and growth risks with a disciplined, practical lens.",
    whoItsFor:
      "Business owners, leadership teams, and SMEs planning growth, expansion, or organisational improvements.",
    outcomes: [
      "Growth planning support",
      "Strategic decision frameworks",
      "Expansion and readiness guidance",
      "Priority alignment",
      "Execution-oriented advisory",
    ],
    icon: LineChart,
  },
];

export const SERVICE_OPTIONS = SERVICES.map((service) => ({
  label: service.title,
  value: service.title,
}));

export const CONSULTATION_TYPES = [
  { label: "Online Consultation", value: "Online" },
  { label: "Physical Consultation", value: "Physical" },
];

export const TESTIMONIALS = [
  {
    name: "Founder, Early-Stage Startup",
    quote:
      "Skynex Consults helped us structure our thinking, refine our model, and present our business with more clarity and confidence.",
  },
  {
    name: "SME Business Owner",
    quote:
      "Their approach was practical, strategic, and easy to follow. We came away with clear next steps and a stronger growth plan.",
  },
  {
    name: "Operations Lead, Growth Business",
    quote:
      "We needed direction, not just ideas. Skynex Consults delivered a clear framework that helped us make better decisions quickly.",
  },
];

export const BLOG_CATEGORIES = ["Strategy", "Finance", "Marketing", "Startups", "Branding"];