"use client";
import Navbar from "@/components/Navbar";
import { MotionConfig } from "framer-motion";
export default function StorefrontWrapper() {
  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
    </MotionConfig>
  );
}
