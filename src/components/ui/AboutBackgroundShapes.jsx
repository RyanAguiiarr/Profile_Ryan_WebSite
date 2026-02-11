import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const AboutBackgroundShapes = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax: Subtle movement to keep it "locked" but with depth
  const yTop = useTransform(scrollYProgress, [0, 1], [0, -50]); 
  const yBottom = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      
      {/* Top Horizon Arc */}
      <motion.div
        style={{ y: yTop }}
        className="absolute -top-[100px] left-1/2 -translate-x-1/2 w-[200%] h-[400px] z-0"
      >
        {/* 
            Geometry: w-[200%] + h-[400px] creates a very shallow, wide arc.
            Gradient: Subtle "lighting" from top (lighter) to bottom (darker orange).
            Shadow: Added for that "glowing edge" feel.
        */}
        <div className="w-full h-full rounded-b-[100%] bg-gradient-to-b from-[#ff8c00] to-[#ff4500] shadow-[0_10px_50px_rgba(255,69,0,0.3)]" />
      </motion.div>

      {/* Bottom Horizon Arc */}
      <motion.div
        style={{ y: yBottom }}
        className="absolute -bottom-[100px] left-1/2 -translate-x-1/2 w-[200%] h-[400px] z-0"
      >
         {/* 
            Geometry: Inverted shallow arc.
            Gradient: Lighter at the "top" of the shape (which is the bottom of the screen effectively) 
            to create the volume/lighting effect.
         */}
         <div className="w-full h-full rounded-t-[100%] bg-gradient-to-t from-[#ff8c00] to-[#ff4500] shadow-[0_-10px_50px_rgba(255,69,0,0.3)]" />
         
         {/* Optional: subtle highlight star if strictly needed, but sticking to shapes first */}
      </motion.div>
    </div>
  );
};

export default AboutBackgroundShapes;
