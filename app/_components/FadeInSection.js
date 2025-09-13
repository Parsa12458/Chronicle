"use client";
import { motion } from "framer-motion";

export default function FadeInSection({ children }) {
  const MotionDiv = motion.create("div");
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </MotionDiv>
  );
}
