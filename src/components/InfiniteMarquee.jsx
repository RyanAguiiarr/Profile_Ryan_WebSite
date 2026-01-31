import React from "react";
import { motion } from "framer-motion";

const InfiniteMarquee = ({ items, speed = 20, reverse = false }) => {
  return (
    <div className="relative flex overflow-hidden user-select-none gap-10 opacity-80 mix-blend-screen">
      {/* Gradient Masks for fade effect */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

      <motion.div
        initial={{ x: reverse ? "-50%" : 0 }}
        animate={{ x: reverse ? 0 : "-50%" }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex flex-shrink-0 gap-10 min-w-full"
      >
        {[...items, ...items].map((item, index) => (
          <div key={index} className="flex items-center justify-center">
            {/* If it's a string, render text, else render component */}
            {typeof item === 'string' ? (
                 <span className="text-2xl md:text-3xl font-black text-gray-400/50 uppercase tracking-tighter whitespace-nowrap hover:text-white transition-colors cursor-default">{item}</span>
            ) : (
                item
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteMarquee;
