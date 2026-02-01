import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Box } from "lucide-react"; // Keep Box for static center icon if needed, or replace it too. keeping for safety or replacing with a logo?
import InfiniteMarquee from "./InfiniteMarquee";

// Tech stack data with official logos
// Size: 'sm' | 'md' | 'lg'
const techStack = [
  // Large items (Center/Inner core)
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", x: -350, y: -150, z: 100, size: "lg" },
  { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", x: 350, y: -150, z: 100, size: "lg" },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", x: -300, y: 220, z: 100, size: "lg" },
  { name: "Tailwind", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", x: 300, y: 220, z: 100, size: "lg" },
  
  // Medium items (Mid circle - Widened)
  { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", x: 0, y: -320, z: 50, size: "md" },
  { name: "Android", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg", x: 0, y: 320, z: 50, size: "md" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", x: -500, y: 0, z: 60, size: "md" },
  { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", x: 500, y: 0, z: 60, size: "md" },
  { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", x: -400, y: -250, z: 40, size: "md" }, // NEW
  { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", x: 400, y: -250, z: 40, size: "md" }, // NEW

  // Small items (Outer circle - Widened)
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", x: -600, y: -180, z: 20, size: "sm" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", x: 600, y: -180, z: 20, size: "sm" },
  { name: "Bash", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg", x: -600, y: 180, z: 20, size: "sm" },
  { name: "Postman", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg", x: 600, y: 180, z: 20, size: "sm" },
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", x: -250, y: -450, z: 10, size: "sm" }, // NEW
  { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", x: 250, y: -450, z: 10, size: "sm" }, // NEW
  { name: "Spring", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg", x: -250, y: 450, z: 10, size: "sm" }, // NEW
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", x: 250, y: 450, z: 10, size: "sm" }, // NEW
];

const TechStack3D = () => {
  const containerRef = useRef(null);
  
  // Mouse tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for the rotation
  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  // Map mouse position to rotation degrees
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate normalized mouse position (-0.5 to 0.5)
    const normalizedX = (e.clientX - rect.left) / width - 0.5;
    const normalizedY = (e.clientY - rect.top) / height - 0.5;
    
    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[150vh] flex items-center justify-center overflow-hidden py-24 md:py-32 perspective-1000"
      style={{ perspective: "1000px" }}
    >
        {/* Background Gradients */}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />

        {/* =========================================
            MOBILE LAYOUT (Visible < lg)
           ========================================= */}
        <div className="relative z-10 w-full flex flex-col items-center justify-center lg:hidden">
             
             {/* Badge */}
             <div className="px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
                 Powerful Integrations
             </div>

             {/* Title */}
             <h2 className="text-4xl sm:text-5xl font-bold text-center text-white leading-[1.1] mb-12 max-w-lg px-4">
                 Seamlessly Integrate <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                     Every App
                 </span>
             </h2>

             {/* Visual Center - Glowing Orb & Marquees */}
             <div className="relative w-full py-12 flex flex-col gap-8 overflow-hidden">
                 
                 {/* Central Glowing Orb */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-radial from-blue-500/20 via-primary/10 to-transparent blur-3xl opacity-60 pointer-events-none rounded-full" />
                 
                 {/* Marquee Content - Updated for more items */}
                 {/* Marquee Row 1 - Left */}
                 <InfiniteMarquee speed={30} items={techStack.slice(0, 9).map((tech, i) => (
                     <div key={i} className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm p-3">
                         <img src={tech.logo} alt={tech.name} className="w-full h-full object-contain" style={tech.name === "Next.js" ? { filter: "invert(1)" } : {}} />
                     </div>
                 ))} />

                 {/* Marquee Row 2 - Right */}
                 <InfiniteMarquee speed={35} reverse items={techStack.slice(9, 18).map((tech, i) => (
                     <div key={i} className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm p-3">
                         <img src={tech.logo} alt={tech.name} className="w-full h-full object-contain" style={tech.name === "Next.js" ? { filter: "invert(1)" } : {}} />
                     </div>
                 ))} />

             </div>

             {/* Footer CTA */}
             <div className="mt-12">
                 <button className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all">
                     Explore All
                 </button>
             </div>

        </div>


        {/* =========================================
            DESKTOP LAYOUT (Visible >= lg)
           ========================================= */}
        <div className="hidden lg:flex flex-col items-center justify-center relative w-full h-full"> 
            {/* STATIC CENTER CONTENT */}
            <div className="relative z-10 text-center pointer-events-none p-12">
                <div className="inline-block p-4 rounded-full bg-white/5 mb-6 border border-white/10">
                    <Box size={32} className="text-primary" />
                </div>
                <h2 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter text-white">
                    My Tech <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
                        Arsenal
                    </span>
                </h2>
                <p className="text-gray-400 text-lg max-w-md mx-auto">
                    The tools creating the digital future.
                </p>
            </div>

            {/* 3D ROTATING CONTAINER (ABSOLUTE OVERLAY) */}
            <motion.div
                style={{ 
                    rotateX, 
                    rotateY, 
                    transformStyle: "preserve-3d" 
                }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
                {/* Floating Tech Cards */}
                {techStack.map((tech, index) => (
                    <FloatingCard 
                        key={index} 
                        tech={tech} 
                    />
                ))}
            </motion.div>
        </div>
    </section>
  );
};

const FloatingCard = ({ tech }) => {
    // Determine size classes
    const sizeClasses = {
        sm: "w-20 h-24",
        md: "w-24 h-32",
        lg: "w-32 h-44"
    };

    const iconSize = {
        sm: "scale-75",
        md: "scale-90",
        lg: "scale-100"
    };

    return (
        <motion.div
            style={{ 
                x: tech.x, 
                y: tech.y, 
                z: tech.z,
                transform: `rotateX(0deg) rotateY(0deg) translateZ(${tech.z}px)` // Keep cards facing forward
            }}
            className="absolute hidden md:flex flex-col items-center gap-2 group pointer-events-auto"
            animate={{
                y: [tech.y - 15, tech.y + 15, tech.y - 15],
            }}
            transition={{
                duration: 4 + Math.random() * 2, // Random float duration
                repeat: Infinity,
                ease: "easeInOut"
            }}
        >
            <div className={`${sizeClasses[tech.size]} rounded-2xl bg-white/5 backdrop-blur-md px-0.5 pt-0.5 pb-2 shadow-2xl group-hover:scale-110 transition-transform duration-300 border border-white/10`}>
                <div className="w-full h-full bg-black/40 rounded-[14px] flex items-center justify-center border border-white/5 relative overflow-hidden p-3">
                     {/* Inner Gradient Shine */}
                     <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-50" />
                     <div className={`${iconSize[tech.size]} w-full h-full flex items-center justify-center`}>
                        <img 
                            src={tech.logo} 
                            alt={tech.name} 
                            className="w-full h-full object-contain filter drop-shadow-md" 
                            style={tech.name === "Next.js" ? { filter: "invert(1)" } : {}}
                        />
                     </div>
                </div>
            </div>
        </motion.div>
    );
};

export default TechStack3D;
