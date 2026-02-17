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
        className="w-full md:w-auto max-w-xl space-y-6 md:space-y-8 lg:space-y-10 text-left min-w-[300px]"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -50 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center gap-3">
            <span className="px-4 py-1.5 text-xs md:text-sm font-bold tracking-widest text-white bg-white/5 rounded-lg backdrop-blur-md uppercase border border-white/10 shadow-lg">
                Projeto em Destaque
            </span>
        </div>

        <h3 className="text-5xl md:text-6xl lg:text-8xl font-black text-white leading-[0.9] tracking-tight">
          {project.title}
        </h3>
        
        <p className="text-lg md:text-xl text-gray-200 max-w-lg leading-relaxed font-light">
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
                className="relative group inline-flex items-center justify-center px-6 py-3 overflow-hidden rounded-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_var(--project-color)]"
                style={{ 
                    "--project-color": project.color,
                    boxShadow: "0 0 0 1px var(--project-color)" 
                }}
                aria-label="View Live Demo"
            >
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vw] animate-[spin_4s_linear_infinite] -z-10" 
                      style={{ background: `conic-gradient(from 0deg, transparent 0 75%, var(--project-color) 100%)` }} 
                />
                <span className="absolute inset-[2px] rounded-lg bg-black z-0" />
                <span className="relative z-10 flex items-center gap-2">
                    Ver Projeto <ArrowRight size={18} />
                </span>
            </a>

            <a 
                href={project.github} 
                className="relative group inline-flex items-center justify-center px-6 py-3 overflow-hidden rounded-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_var(--project-color)]"
                 style={{ 
                    "--project-color": project.color,
                    boxShadow: "0 0 0 1px var(--project-color)"
                }}
                aria-label="View Code on GitHub"
            >
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vw] animate-[spin_4s_linear_infinite] -z-10" 
                      style={{ background: `conic-gradient(from 0deg, transparent 0 75%, var(--project-color) 100%)` }} 
                />
                 <span className="absolute inset-[2px] rounded-lg bg-black z-0" />
                <span className="relative z-10 flex items-center gap-2">
                    <Github size={18} /> Código
                </span>
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
                     <span className="text-white/80 text-xs font-mono tracking-widest">0{project.id} — EXPLORAR</span>
                </div>
            </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectCardDesktop;
