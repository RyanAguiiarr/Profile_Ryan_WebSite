import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const AboutBackgroundShapes = ({ showShapes = true }) => {
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
      
      {showShapes && (
        <>
          {/* Top Shape - Quarter-Ellipse Filling Top-Left Corner */}
          <motion.div
            style={{ y: yTop }}
            className="absolute top-0 left-0 w-[55%] h-[350px] z-0 rounded-br-[100%] bg-gradient-to-b from-[#ff8c00] to-[#ff4500] shadow-[10px_10px_50px_rgba(255,69,0,0.3)] origin-top-left"
          >
            {/* No inner div needed if background is direct, but keeping structure for consistency if needed later */}
          </motion.div>

          {/* Bottom Shape - Quarter-Ellipse Filling Bottom-Right Corner */}
          <motion.div
            style={{ y: yBottom }}
            className="absolute bottom-0 right-0 w-[45%] h-[250px] z-0 rounded-tl-[100%] bg-gradient-to-t from-[#ff8c00] to-[#ff4500] shadow-[-10px_-10px_50px_rgba(255,69,0,0.3)] origin-bottom-right"
          >
          </motion.div>
        </>
      )}

      {/* Vignette - Bottom Up Black Light */}
      <div className="absolute bottom-0 w-full h-[300px] bg-gradient-to-t from-black via-black/50 to-transparent z-10 pointer-events-none" />

      {/* Vignette - Top Down Black Light */}
      <div className="absolute top-0 w-full h-[300px] bg-gradient-to-b from-black via-black/50 to-transparent z-10 pointer-events-none" />
    </div>
  );
};

export default AboutBackgroundShapes;
