"use client";

import Link from "next/link";
import Image from "next/image";
import { CTA_LABELS, SITE_CONFIG } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

export function HomeHero() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden">
      {/* Full bleed background image */}
      <Image
        src="https://images.unsplash.com/photo-1573164574572-cb89e39749b4?q=80&w=2070&auto=format&fit=crop"
        alt="Strategic planning environment"
        fill
        className="object-cover"
        priority
      />

      {/* Dark gradient overlay - ensures text remains readable */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-900/95 via-brand-800/90 to-black/85" />

      {/* Content Layer */}
      <div className="container-max relative z-10 flex min-h-[85vh] items-center justify-center">
        <motion.div
          className="mx-auto max-w-3xl px-4 text-center"
          initial="hidden"
          animate="show"
          variants={staggerContainer}
        >
          {/* Eyebrow text */}
          <motion.p
            className="mb-5 text-sm font-medium uppercase tracking-[0.25em] text-brand-200"
            variants={fadeUp}
          >
            {SITE_CONFIG.tagline}
          </motion.p>

          {/* Main headline */}
          <motion.h1
            className="font-heading text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl"
            variants={fadeUp}
          >
            Strategic consulting for businesses ready to grow with confidence.
          </motion.h1>

          {/* Subtext description */}
          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300 md:text-xl"
            variants={fadeUp}
          >
            Skynex Consults supports startups, SMEs, and business owners with
            strategy, planning, branding, digital presence, and growth advisory
            designed to drive better decisions.
          </motion.p>

          {/* CTAs - stacked center */}
          <motion.div
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            variants={fadeUp}
          >
            <Link href="/booking">
              <Button size="lg" className="bg-white px-8 text-brand-800 hover:bg-gray-100 shadow-lg transition-all hover:shadow-xl">
                {CTA_LABELS.primary}
              </Button>
            </Link>

            <Link href="/services">
              <Button
                variant="secondary"
                size="lg"
                className="border-white/30 bg-transparent px-8 text-white backdrop-blur-sm hover:bg-white/10"
              >
                {CTA_LABELS.secondary}
              </Button>
            </Link>
          </motion.div>

          {/* Trust indicator - subtle and grounded */}
          <motion.p
            className="mt-12 hidden text-sm font-light italic tracking-wide text-white/40 md:block"
            variants={fadeUp}
          >
            Trusted by founders, SMEs, and growth-focused businesses across Nigeria
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}