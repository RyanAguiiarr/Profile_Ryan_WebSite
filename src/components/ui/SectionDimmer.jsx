import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const SectionDimmer = ({ children, className = "" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Calculate opacity: 1 when in center/view, lower when scroll away
  // 0 -> 0.3 (entrance) -> 1 (center) -> 0.3 (exit) -> 0
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0.3, 1, 1, 1, 0.3] 
  );
  
  // Also add a slight scale effect for depth
  const scale = useTransform(
      scrollYProgress,
       [0, 0.5, 1],
       [0.95, 1, 0.95]
  );

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default SectionDimmer;
