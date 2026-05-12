"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CTA_LABELS, SITE_CONFIG } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-brand-600 text-white">
      <div className="absolute inset-0 bg-hero-grid bg-grid opacity-20" />
      <div className="container-max relative py-20 md:py-28 lg:py-32">
        <motion.div
          className="grid items-center gap-12 lg:grid-cols-2"
          initial="hidden"
          animate="show"
          variants={staggerContainer}
        >
          <motion.div className="max-w-2xl" variants={fadeUp}>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-brand-100">
              {SITE_CONFIG.tagline}
            </p>
            <h1 className="font-heading text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-6xl">
              Strategic consulting for businesses ready to grow with confidence.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/85">
              Skynex Consults supports startups, SMEs, and business owners with
              strategy, planning, branding, digital presence, and growth advisory
              designed to drive better decisions.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/booking">
                <Button className="bg-white text-brand-700 hover:bg-brand-50">
                  {CTA_LABELS.primary}
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  variant="secondary"
                  className="border-white text-white hover:bg-white/10"
                >
                  {CTA_LABELS.secondary}
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur"
            variants={fadeUp}
          >
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                "Business Strategy",
                "Growth Planning",
                "Brand Positioning",
                "Digital Presence",
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-white/10 p-5">
                  <h3 className="font-heading text-lg font-semibold text-white">
                    {item}
                  </h3>
                  <p className="mt-2 text-sm text-white/80">
                    Practical, tailored support that helps businesses move with direction.
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-brand-100">
              <span>
                Trusted support for founders, SMEs, and growth-focused businesses
              </span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}