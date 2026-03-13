import React from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "../../hooks/useIsMobile";

const RevealOnScroll = ({ children, delay = 0, duration = 0.5, className = "" }) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`overflow-hidden ${className}`}>
        <motion.div
          initial={{ y: "100%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: false, margin: "-10%" }} // trigger every time
          transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }} // Custom cubic-bezier for "cinematic" smooth stop
          className="will-change-transform"
          style={{ transform: "translateZ(0)" }}
        >
          {children}
        </motion.div>
    </div>
  );
};

export default RevealOnScroll;
