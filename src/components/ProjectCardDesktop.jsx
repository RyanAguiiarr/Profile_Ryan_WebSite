import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import TechBadge from "./TechBadge";

const ProjectCardDesktop = ({ project, isActive }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    
    // Auto-advance slideshow
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [isActive, project.images.length]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16 w-full max-w-[90vw] 2xl:max-w-7xl mx-auto px-4">
      {/* Content Side - Left */}
      <motion.div 
        className="w-full md:w-auto max-w-xl space-y-4 md:space-y-6 lg:space-y-8 text-left min-w-[300px]"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -50 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center gap-3">
            <span className="px-3 py-1 text-[10px] md:text-xs font-bold tracking-wider text-white bg-white/10 rounded-full backdrop-blur-md uppercase border border-white/10">
                Featured Project
            </span>
        </div>

        <h3 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight">
          {project.title}
        </h3>
        
        <p className="text-base md:text-lg text-gray-300 max-w-md leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 py-4">
          {project.tags.map((tag) => (
            <TechBadge key={tag} name={tag} />
          ))}
        </div>

        <div className="flex gap-4 pt-2">
            <a 
                href={project.demo} 
                className="flex items-center gap-2 px-5 py-2 md:px-6 md:py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors text-sm md:text-base"
                aria-label="View Live Demo"
            >
                View Project <ArrowRight size={18} />
            </a>
            <a 
                href={project.github} 
                className="flex items-center gap-2 px-5 py-2 md:px-6 md:py-3 bg-white/10 text-white rounded-full font-bold hover:bg-white/20 backdrop-blur-md transition-colors border border-white/10 text-sm md:text-base"
                aria-label="View Code on GitHub"
            >
                <Github size={18} /> Code
            </a>
        </div>
      </motion.div>

      {/* Image Side - Right (Magic Door) */}
      <motion.div 
        className="relative [perspective:1000px] flex justify-center items-center flex-1 min-w-0 mt-8 md:mt-0"
        initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
        animate={{ 
            opacity: isActive ? 1 : 0.5, 
            scale: isActive ? 1 : 0.9,
            rotateY: isActive ? 0 : -5
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="relative h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] w-auto max-w-full mx-auto transition-all duration-500 ease-in-out flex justify-center">
            {/* Glow Effect behind */}
            <div 
                className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20 rounded-3xl blur-2xl -z-10 transform scale-110 opacity-50"
                style={{ backgroundColor: project.color }} 
            />
            
            {/* Main Card Container */}
            <div className="h-full w-auto max-w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative bg-black/40 backdrop-blur-sm group inline-flex justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/50 z-10 pointer-events-none" />
                
                {/* Slideshow Images */}
                <AnimatePresence mode="wait">
                    <motion.img 
                        key={currentImageIndex}
                        src={project.images[currentImageIndex]} 
                        alt={`${project.title} - Preview ${currentImageIndex + 1}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="h-full w-auto max-w-full object-contain relative z-0 min-w-[200px]"
                    />
                </AnimatePresence>

                {/* Progress Indicators */}
                <div className="absolute bottom-10 md:bottom-12 left-1/2 -translate-x-1/2 flex gap-1 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.images.map((_, idx) => (
                        <div 
                            key={idx} 
                            className={`h-1 rounded-full transition-all duration-300 ${idx === currentImageIndex ? "w-4 md:w-6 bg-white" : "w-1 bg-white/30"}`} 
                        />
                    ))}
                </div>
                
                {/* Overlay details */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-20">
                     <span className="text-white/80 text-xs font-mono tracking-widest">0{project.id} — EXPLORE</span>
                </div>
            </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectCardDesktop;
