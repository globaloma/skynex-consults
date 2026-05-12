"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial="hidden" animate="show" variants={fadeIn}>
      {children}
    </motion.div>
  );
}