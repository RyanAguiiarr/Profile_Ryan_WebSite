import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const ProjectCardMobile = ({ project, isActive }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isActive, project.images.length]);

  return (
    <motion.div
      className={`relative w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ease-out border border-white/10 bg-black/50 ${
        isActive ? "grayscale-0 scale-100 opacity-100 z-10" : "grayscale opacity-50 scale-90 z-0 blur-[2px]"
      }`}
      animate={{
        scale: isActive ? 1 : 0.9,
        opacity: isActive ? 1 : 0.5,
        filter: isActive ? "blur(0px)" : "blur(2px)",
      }}
    >
      {/* Blurred Background for fill */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="wait">
             <motion.img
                key={`bg-${currentImageIndex}`}
                src={project.images[currentImageIndex]}
                alt=""
                className="w-full h-full object-cover opacity-50 blur-xl scale-125"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
             />
        </AnimatePresence>
      </div>

      {/* Main Slideshow Image - Fully Visible & Adaptive */}
      <div className="relative w-full h-full p-4 flex items-start justify-center pt-12">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={project.images[currentImageIndex]}
              alt={project.title}
              className="max-w-full max-h-full object-contain relative z-10 shadow-lg rounded-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
      </div>
      
      {/* Overlay Content */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end z-20">
        {isActive && (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-2"
            >
                 <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-white/20 backdrop-blur-md rounded-full text-white uppercase">
                        {project.tags[0]}
                    </span>
                 </div>
                <h3 className="text-xl font-bold text-white leading-tight">{project.title}</h3>
                <p className="text-xs text-gray-300 line-clamp-2">{project.description}</p>
                
                <div className="flex gap-3 mt-3 pt-2">
                     <a 
                        href={project.demo}
                        className="p-2 bg-white text-black rounded-full"
                        aria-label="View Demo"
                     >
                        <ExternalLink size={16} />
                     </a>
                     <a 
                        href={project.github}
                        className="p-2 bg-white/10 text-white rounded-full backdrop-blur-md border border-white/10"
                        aria-label="View Code"
                     >
                        <Github size={16} />
                     </a>
                </div>
            </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCardMobile;
