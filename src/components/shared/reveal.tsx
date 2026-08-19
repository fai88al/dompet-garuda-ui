"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

/**
 * Standard scroll-triggered section reveal — CLAUDE.md §9. Every major
 * section uses this exact animation so entrances stay consistent.
 */
export function Reveal({ children, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
