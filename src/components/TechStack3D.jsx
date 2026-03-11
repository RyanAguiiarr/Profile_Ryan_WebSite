import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { isIOS } from "../utils/ios-utils";
import { Box } from "lucide-react"; // Keep Box for static center icon if needed, or replace it too. keeping for safety or replacing with a logo?
import InfiniteMarquee from "./InfiniteMarquee";

import AboutBackgroundShapes from "./ui/AboutBackgroundShapes";

import javaIcon from "../assets/tech/java-original.svg";
import springIcon from "../assets/tech/spring-original.svg";
import reactIcon from "../assets/tech/react-original.svg";
import awsIcon from "../assets/tech/amazonwebservices-original-wordmark.svg";
import typescriptIcon from "../assets/tech/typescript-original.svg";
import dockerIcon from "../assets/tech/docker-original.svg";
import postgresqlIcon from "../assets/tech/postgresql-original.svg";
import nodejsIcon from "../assets/tech/nodejs-original.svg";
import kubernetesIcon from "../assets/tech/kubernetes-plain.svg";
import mongodbIcon from "../assets/tech/mongodb-original.svg";
import pythonIcon from "../assets/tech/python-original.svg";
import csharpIcon from "../assets/tech/csharp-original.svg";
import fastapiIcon from "../assets/tech/fastapi-original.svg";
import kafkaIcon from "../assets/tech/apachekafka-original.svg";
import tailwindIcon from "../assets/tech/tailwindcss-original.svg";
import gitIcon from "../assets/tech/git-original.svg";
import cIcon from "../assets/tech/c-original.svg";
import openaiIcon from "../assets/tech/OpenAI_Logo.svg";

// Tech stack data with official logos
// Size: 'sm' | 'md' | 'lg'
const techStack = [
  // Large items (Center/Inner core) - Main Skills
  { name: "Java", logo: javaIcon, x: -350, y: -150, z: 100, size: "lg" },
  { name: "Spring Boot", logo: springIcon, x: 350, y: -150, z: 100, size: "lg" },
  { name: "React", logo: reactIcon, x: -300, y: 220, z: 100, size: "lg" },
  { name: "AWS", logo: awsIcon, x: 300, y: 220, z: 100, size: "lg" }, // Use wordmark for recognition or plain if too wide
  
  // Medium items (Mid circle - Widened) - Important Skills
  { name: "TypeScript", logo: typescriptIcon, x: 0, y: -320, z: 50, size: "md" },
  { name: "Docker", logo: dockerIcon, x: 0, y: 320, z: 50, size: "md" },
  { name: "PostgreSQL", logo: postgresqlIcon, x: -500, y: 0, z: 60, size: "md" },
  { name: "Node.js", logo: nodejsIcon, x: 500, y: 0, z: 60, size: "md" },
  { name: "Kubernetes", logo: kubernetesIcon, x: -400, y: -250, z: 40, size: "md" },
  { name: "MongoDB", logo: mongodbIcon, x: 400, y: -250, z: 40, size: "md" },

  // Small items (Outer circle - Widened) - Supporting Skills
  { name: "Python", logo: pythonIcon, x: -600, y: -180, z: 20, size: "sm" }, // For AI/FastAPI context
  { name: "C#", logo: csharpIcon, x: 600, y: -180, z: 20, size: "sm" },
  { name: "FastAPI", logo: fastapiIcon, x: -600, y: 180, z: 20, size: "sm" },
  { name: "Kafka", logo: kafkaIcon, x: 600, y: 180, z: 20, size: "sm" },
  { name: "Tailwind", logo: tailwindIcon, x: -250, y: -450, z: 10, size: "sm" },
  { name: "Git", logo: gitIcon, x: 250, y: -450, z: 10, size: "sm" },
  { name: "C", logo: cIcon, x: -250, y: 450, z: 10, size: "sm" },
  { name: "OpenAI", logo: openaiIcon, x: 250, y: 450, z: 10, size: "sm" }, // Using Wikimedia for OpenAI logo as devicon might not have it or it might be new
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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [0, 200]); // Background moves
  const yContent = useTransform(scrollYProgress, [0, 1], [150, 50]); // Content moves slightly

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
      className="relative min-h-[100vh] md:min-h-[150vh] -mt-12 md:mt-0 flex items-center justify-center overflow-hidden py-0 md:py-32 perspective-1000 bg-black w-screen left-1/2 -ml-[50vw]"
      style={{ perspective: "1000px" }}
    >
        {/* Background Shapes */}
        <AboutBackgroundShapes />

        {/* =========================================
            MOBILE LAYOUT (Visible < lg)
           ========================================= */}
        <div className="relative z-10 w-full flex flex-col items-center justify-center lg:hidden overflow-visible">
             
             {/* Badge & Title - Compacted */}
             <motion.div style={{ y: yContent }} className="mb-2 relative z-20">
                <div className="px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/20 text-orange-400 text-[10px] font-bold tracking-widest uppercase inline-block">
                    Arsenal Full Stack
                </div>
             </motion.div>

             <motion.div style={{ y: yContent }} className="mb-32 relative z-20">
                <h2 className="text-3xl font-bold text-center text-white leading-[1.1] px-4">
                    Integração <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                        Total
                    </span>
                </h2>
             </motion.div>

             {/* 3D Tilted/Curved Rows Container - Optimized for Mobile Performance */}
             {/* 3D Tilted/Curved Rows Container - Optimized for Mobile Performance */}
             <div 
                className="relative w-[200%] left-[-50%] h-[500px] flex flex-col justify-center gap-6 perspective-[1000px] overflow-visible"
            >
                 {/* The Wall - Rotated and Tilted */}
                 <div className="flex flex-col gap-5 transform rotate-[-5deg] rotate-x-[10deg] scale-110 origin-center will-change-transform w-full">
                     
                     {/* Row 1 */}
                     <div className="w-full opacity-90">
                         <InfiniteMarquee speed={25} showGradient={false} items={techStack.slice(0, 8).map((tech, i) => (
                             <div key={i} className="w-32 h-24 rounded-2xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center p-4 group">
                                 <img src={tech.logo} alt={tech.name} loading="lazy" className="w-full h-full object-contain group-hover:scale-110 transition-transform" style={tech.name === "Next.js" ? { filter: "invert(1)" } : {}} />
                             </div>
                         ))} />
                     </div>

                     {/* Row 2 - Reverse */}
                     <div className="w-full scale-105 z-10 my-[-10px]">
                         <InfiniteMarquee speed={30} reverse showGradient={false} items={techStack.slice(8, 16).map((tech, i) => (
                             <div key={i} className="w-36 h-28 rounded-2xl bg-[#0a0a0a] border border-orange-500/30 flex items-center justify-center p-5 group">
                                 <img src={tech.logo} alt={tech.name} loading="lazy" className="w-full h-full object-contain group-hover:scale-110 transition-transform" style={tech.name === "Next.js" ? { filter: "invert(1)" } : {}} />
                             </div>
                         ))} />
                     </div>

                     {/* Row 3 */}
                     <div className="w-full opacity-90">
                         <InfiniteMarquee speed={25} showGradient={false} items={[...techStack.slice(16), ...techStack.slice(0, 6)].map((tech, i) => ( // Expanded wrap for fullness
                             <div key={i} className="w-32 h-24 rounded-2xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center p-4 group">
                                 <img src={tech.logo} alt={tech.name} loading="lazy" className="w-full h-full object-contain group-hover:scale-110 transition-transform" style={tech.name === "Next.js" ? { filter: "invert(1)" } : {}} />
                             </div>
                         ))} />
                     </div>
                 </div>
             </div>


        </div>


        {/* =========================================
            DESKTOP LAYOUT (Visible >= lg)
           ========================================= */}
        <div className="hidden lg:flex flex-col items-center justify-center relative w-full h-full"> 
            {/* STATIC CENTER CONTENT */}
            <motion.div style={{ y: yContent }} className="relative z-10 text-center pointer-events-none p-12">
        
                <h2 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter text-white">
                    Meus Domínios <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
                        Tecnológicos
                    </span>
                </h2>
            
            </motion.div>

            {/* 3D ROTATING CONTAINER (ABSOLUTE OVERLAY) */}
            <motion.div
                style={{ 
                    rotateX, 
                    rotateY,
                    y: yBg, // Apply parallax global y to the container
                    transformStyle: "preserve-3d" 
                }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform"
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

        {/* Enhanced Bottom Vignette to match top intensity */}
        <div className="absolute bottom-0 left-0 w-full h-[400px] bg-gradient-to-t from-black via-black/10 to-transparent z-10 pointer-events-none" />

        {/* Mobile Top Vignette - Restored for "Black Light" effect */}
        <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-black via-black/85 to-transparent z-1 pointer-events-none" />
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
            className="absolute hidden md:flex flex-col items-center gap-2 group pointer-events-auto will-change-transform"
            animate={{
                y: [tech.y - 15, tech.y + 15, tech.y - 15],
            }}
            transition={{
                duration: 4 + Math.random() * 2, // Random float duration
                repeat: Infinity,
                ease: "easeInOut"
            }}
        >
            <div className={`${sizeClasses[tech.size]} relative rounded-2xl bg-[#0a0a0a]/95 border border-white/15 shadow-2xl overflow-hidden group-hover:scale-110 transition-transform duration-300`}>
                
                {/* Top Orange Glow Effect */}
                <div className="absolute top-[-25%] left-[-20%] right-[-20%] h-[60%] bg-orange-500/40 blur-[30px] rounded-full pointer-events-none mix-blend-screen" />
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-80" />

                {/* Hover Sheen Effect */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-20 rounded-2xl">
                    <div className="absolute top-0 left-[-150%] h-full w-[80%] skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-[150%] transition-[left] duration-1000 ease-in-out" />
                </div>

                <div className="w-full h-full relative z-10 p-3 flex items-center justify-center">
                     <div className={`${iconSize[tech.size]} w-full h-full flex items-center justify-center`}>
                        <img 
                            src={tech.logo} 
                            alt={tech.name} 
                            loading="lazy"
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
