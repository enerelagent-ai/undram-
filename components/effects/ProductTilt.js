"use client";
// Adapted from David Haz's React Bits TiltedCard. See LICENSE.react-bits.md.
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
export default function ProductTilt({ children }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const rx = useSpring(useMotionValue(0), {
    damping: 30,
    stiffness: 100,
    mass: 2,
  });
  const ry = useSpring(useMotionValue(0), {
    damping: 30,
    stiffness: 100,
    mass: 2,
  });
  return (
    <div
      ref={ref}
      className="tilt"
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = ref.current.getBoundingClientRect();
        rx.set(((e.clientY - r.top) / r.height - 0.5) * -5);
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 5);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      <motion.div className="tilt-image" style={{ rotateX: rx, rotateY: ry }}>
        {children}
      </motion.div>
    </div>
  );
}
