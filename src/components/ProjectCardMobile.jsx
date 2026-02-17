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
      className={`relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ease-out border border-white/10 bg-gray-900/90 ${
        isActive ? "grayscale-0 scale-100 opacity-100 z-10" : "grayscale opacity-50 scale-90 z-0 blur-[1px]"
      }`}
      animate={{
        scale: isActive ? 1 : 0.9,
        opacity: isActive ? 1 : 0.5,
        // Remove blur on active to keep it sharp
        filter: isActive ? "blur(0px)" : "blur(1px)",
      }}
    >
      {/* Blurred Background for fill (Atmosphere) */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="wait">
             <motion.img
                key={`bg-${currentImageIndex}`}
                src={project.images[currentImageIndex]}
                alt=""
                className="w-full h-full object-cover opacity-40 blur-2xl scale-110"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
             />
        </AnimatePresence>
      </div>

      {/* Main Slideshow Image - MAXIMIZED VIEW */}
      {/* Removed padding to ensure landscape images are as wide as possible */}
      <div className="relative w-full h-[65%] flex items-center justify-center bg-black/20">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={project.images[currentImageIndex]}
              alt={project.title}
              // object-contain ensures the whole UI is visible.
              // w-full ensures it stretches to the edges.
              className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
            />
          </AnimatePresence>
      </div>
      
      {/* Content Section - Bottom Part */}
      <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black via-black/90 to-transparent p-6 flex flex-col justify-end z-20">
        {isActive && (
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-3"
            >
                <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-white/5 backdrop-blur-md rounded-lg text-white uppercase tracking-wider border border-white/10 shadow-lg">
                        {project.tags[0]}
                    </span>
                 </div>
                <h3 className="text-2xl font-bold text-white leading-tight">{project.title}</h3>
                <p className="text-sm text-gray-300 line-clamp-2 leading-relaxed">{project.description}</p>
                
                <div className="flex gap-3 mt-6">
                     <a 
                        href={project.demo}
                        className="flex-1 relative group inline-flex items-center justify-center px-4 py-2 overflow-hidden rounded-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_var(--project-color)]"
                        style={{ 
                            "--project-color": project.color,
                            boxShadow: "0 0 0 1px var(--project-color)"
                         }}
                        aria-label="Ver Projeto"
                     >
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vw] animate-[spin_4s_linear_infinite] -z-10" 
                              style={{ background: `conic-gradient(from 0deg, transparent 0 75%, var(--project-color) 100%)` }} 
                        />
                        <span className="absolute inset-[2px] rounded-lg bg-black z-0" />
                        <span className="relative z-10 flex items-center gap-2 text-xs">
                            Ver Projeto <ExternalLink size={14} />
                        </span>
                     </a>

                     <a 
                        href={project.github}
                        className="flex-1 relative group inline-flex items-center justify-center px-4 py-2 overflow-hidden rounded-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_var(--project-color)]"
                        style={{ 
                            "--project-color": project.color,
                            boxShadow: "0 0 0 1px var(--project-color)" 
                        }}
                        aria-label="Ver Código"
                     >
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vw] animate-[spin_4s_linear_infinite] -z-10" 
                              style={{ background: `conic-gradient(from 0deg, transparent 0 75%, var(--project-color) 100%)` }} 
                        />
                        <span className="absolute inset-[2px] rounded-lg bg-black z-0" />
                         <span className="relative z-10 flex items-center gap-2 text-xs">
                            Código <Github size={14} />
                        </span>
                     </a>
                </div>
            </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCardMobile;
