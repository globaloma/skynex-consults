import { createClient } from "@supabase/supabase-js";

async function main() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const services = [
    {
      slug: "business-strategy-planning",
      title: "Business Strategy & Planning",
      headline: "Build a stronger business foundation with clear strategic direction.",
      short_description:
        "We help startups and growing businesses define structure, direction, and practical plans for sustainable growth.",
      description:
        "Our business strategy and planning service supports founders and business owners in making more confident decisions. From business model design to financial planning and risk analysis, we help translate ideas into structured, investor-aware, and execution-ready strategies.",
      who_its_for:
        "Startups, SMEs, founders preparing to launch, and businesses seeking strategic clarity, funding readiness, or expansion planning.",
      outcomes: [
        "Business model development",
        "Market entry and feasibility analysis",
        "Investor-ready and grant-ready business plans",
        "Financial projections and budgeting",
        "Risk assessment and mitigation planning"
      ],
      published: true
    },
    {
      slug: "marketing-growth-consulting",
      title: "Marketing & Growth Consulting",
      headline: "Position your business to attract, convert, and grow more effectively.",
      short_description:
        "We develop strategic go-to-market plans, customer acquisition frameworks, and positioning systems that support business growth.",
      description:
        "Growth requires more than promotion. We help businesses define their market position, refine their offer, identify the right acquisition channels, and create structured go-to-market approaches that improve traction and visibility.",
      who_its_for:
        "Businesses entering new markets, refining their offer, improving traction, or strengthening customer acquisition efforts.",
      outcomes: [
        "Go-to-market strategy",
        "Customer acquisition planning",
        "Brand and market positioning",
        "Growth roadmap alignment",
        "Clearer channel and message direction"
      ],
      published: true
    },
    {
      slug: "web-development-digital-presence",
      title: "Web Development & Digital Presence",
      headline: "Create a digital presence that reflects your credibility and supports conversion.",
      short_description:
        "We design and develop business websites and advise on digital presence strategy to help brands appear credible and accessible online.",
      description:
        "A business website should do more than exist. It should communicate trust, position your business clearly, and support inquiries or conversions. We build professional websites and support businesses in aligning their digital presence with their growth goals.",
      who_its_for:
        "Businesses that need a professional website, a stronger online presence, or a more strategic digital brand experience.",
      outcomes: [
        "Business website design and development",
        "Improved digital brand credibility",
        "Clear service presentation",
        "Conversion-focused user journeys",
        "Digital presence strategy recommendations"
      ],
      published: true
    },
    {
      slug: "branding-business-identity",
      title: "Branding & Business Identity Development",
      headline: "Develop a business identity that is consistent, professional, and memorable.",
      short_description:
        "We help businesses shape visual identity and messaging systems that communicate who they are and how they should be perceived.",
      description:
        "Strong businesses are recognised not only by what they offer, but by how clearly they present it. We support clients with logo direction, brand colors, typography guidance, and messaging alignment that improve consistency and perception across touchpoints.",
      who_its_for:
        "Startups, growing businesses, and founders looking to strengthen how their business is seen and understood.",
      outcomes: [
        "Visual identity direction",
        "Logo and brand system support",
        "Brand colour and typography guidance",
        "Messaging and positioning clarity",
        "More consistent business presentation"
      ],
      published: true
    }
  ];

  const testimonials = [
    {
      name: "Founder, Early-Stage Startup",
      role: "Startup Founder",
      quote:
        "Skynex Consults helped us structure our thinking, refine our model, and present our business with more clarity and confidence.",
      published: true
    },
    {
      name: "SME Business Owner",
      role: "Business Owner",
      quote:
        "Their approach was practical, strategic, and easy to follow. We came away with clear next steps and a stronger growth plan.",
      published: true
    }
  ];

  const posts = [
    {
      slug: "why-clarity-matters-in-business-growth",
      title: "Why Clarity Matters in Business Growth",
      description:
        "Growth becomes more effective when business decisions are built on clarity, structure, and strategic intent.",
      category: "Strategy",
      author: "Skynex Consults",
      content:
        "<p>Growth is often discussed as speed, scale, or visibility. But in practice, sustainable growth depends on clarity.</p><p>Businesses grow more effectively when they understand what they are building, who they are serving, and how they are positioned.</p>",
      published: true
    }
  ];

  const { error: servicesError } = await supabase.from("managed_services").upsert(services, {
    onConflict: "slug",
  });

  if (servicesError) {
    console.error("Failed to seed services:", servicesError.message);
    process.exit(1);
  }

  const { error: testimonialsError } = await supabase.from("testimonials").insert(testimonials);

  if (testimonialsError) {
    console.warn("Testimonials seed warning:", testimonialsError.message);
  }

  const { error: postsError } = await supabase.from("blog_posts").upsert(posts, {
    onConflict: "slug",
  });

  if (postsError) {
    console.warn("Posts seed warning:", postsError.message);
  }

  console.log("Seed content completed.");
}

main();