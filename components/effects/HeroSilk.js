"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const Silk = dynamic(() => import("./Silk"), { ssr: false });
export default function HeroSilk() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const query = matchMedia(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
    );
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return (
    <div className="hero-silk" aria-hidden="true">
      {enabled && (
        <Silk
          speed={0.65}
          color="#C88A24"
          sheenColor="#F6F1E7"
          noiseIntensity={0.2}
          sheen={0.25}
          mouseInteraction={false}
          clickRipple={false}
          intro={false}
          dpr={1}
        />
      )}
    </div>
  );
}
