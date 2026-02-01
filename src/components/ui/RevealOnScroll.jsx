import React from "react";
import { motion } from "framer-motion";

const RevealOnScroll = ({ children, delay = 0, duration = 0.5, className = "" }) => {
  return (
    <div className={`overflow-hidden ${className}`}>
        <motion.div
          initial={{ y: "100%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: false, margin: "-10%" }} // trigger every time
          transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }} // Custom cubic-bezier for "cinematic" smooth stop
        >
          {children}
        </motion.div>
    </div>
  );
};

export default RevealOnScroll;
