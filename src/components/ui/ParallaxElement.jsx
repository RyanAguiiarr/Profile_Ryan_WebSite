import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ParallaxElement = ({ 
  children, 
  offset = 50, // How many pixels to move. Positive = up (faster), Negative = down (slower)
  className = "" 
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -offset]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

export default ParallaxElement;
