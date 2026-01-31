import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { 
  Database, 
  Globe, 
  Layout, 
  Server, 
  Smartphone, 
  Code,
  Box,
  Figma,
  GitBranch,
  Terminal,
  Cpu,
  Layers
} from "lucide-react";
import InfiniteMarquee from "./InfiniteMarquee";

// Tech stack data with icons, colors, and sizes
// Size: 'sm' | 'md' | 'lg'
const techStack = [
  // Large items (Inner circle)
  { name: "React", icon: <Code size={40} />, color: "from-blue-500 to-cyan-400", x: -280, y: -120, z: 100, size: "lg" },
  { name: "Next.js", icon: <Globe size={40} />, color: "from-gray-600 to-black", x: 280, y: -120, z: 100, size: "lg" },
  { name: "Node.js", icon: <Server size={40} />, color: "from-green-500 to-emerald-400", x: -250, y: 180, z: 100, size: "lg" },
  { name: "Tailwind", icon: <Layout size={40} />, color: "from-cyan-400 to-blue-500", x: 250, y: 180, z: 100, size: "lg" },
  
  // Medium items (Mid circle)
  { name: "Database", icon: <Database size={32} />, color: "from-orange-500 to-amber-500", x: 0, y: -260, z: 50, size: "md" },
  { name: "Mobile", icon: <Smartphone size={32} />, color: "from-purple-500 to-pink-500", x: 0, y: 260, z: 50, size: "md" },
  { name: "TypeScript", icon: <Code size={32} />, color: "from-blue-600 to-blue-400", x: -380, y: 0, z: 60, size: "md" },
  { name: "Figma", icon: <Figma size={32} />, color: "from-pink-500 to-purple-500", x: 380, y: 0, z: 60, size: "md" },

  // Small items (Outer circle / Background)
  { name: "Git", icon: <GitBranch size={24} />, color: "from-red-500 to-orange-500", x: -200, y: -280, z: 20, size: "sm" },
  { name: "Docker", icon: <Box size={24} />, color: "from-blue-500 to-blue-300", x: 200, y: -280, z: 20, size: "sm" },
  { name: "Terminal", icon: <Terminal size={24} />, color: "from-gray-700 to-gray-500", x: -200, y: 280, z: 20, size: "sm" },
  { name: "API", icon: <Cpu size={24} />, color: "from-yellow-500 to-orange-500", x: 200, y: 280, z: 20, size: "sm" },
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
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden py-24 md:py-32 perspective-1000"
      style={{ perspective: "1000px" }}
    >
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-background" />
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
                 
                 {/* Marquee Row 1 - Left */}
                 <InfiniteMarquee speed={30} items={techStack.slice(0, 6).map((tech, i) => (
                     <div key={i} className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm">
                         {React.cloneElement(tech.icon, { size: 28, className: "text-white" })}
                     </div>
                 ))} />

                 {/* Marquee Row 2 - Right (Reversed effectively by slicing differently or just reuse) */}
                 {/* Note: InfiniteMarquee scrolls left by default. To scroll right we'd need a prop or just use a different order/speed. 
                     For now let's just use different items. If user needs specific scroll direction 'right', I'd need to update component.
                     Let's assume standard left scroll is fine or I'll add 'reverse' prop quickly if needed. 
                     Wait, standard left scroll for both rows is boring. I should check InfiniteMarquee again.
                     It uses animate={{ x: "-50%" }}. I can add a reverse prop.
                 */}
                 <InfiniteMarquee speed={35} reverse items={techStack.slice(6, 12).map((tech, i) => (
                     <div key={i} className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm">
                         {React.cloneElement(tech.icon, { size: 28, className: "text-white" })}
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
        sm: "w-16 h-20",
        md: "w-20 h-28",
        lg: "w-28 h-36"
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
            <div className={`${sizeClasses[tech.size]} rounded-2xl bg-gradient-to-br ${tech.color} px-0.5 pt-0.5 pb-2 shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                <div className="w-full h-full bg-black rounded-[14px] flex items-center justify-center border border-white/10 relative overflow-hidden">
                     {/* Inner Gradient Shine */}
                     <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-50" />
                     <div className={iconSize[tech.size]}>
                        {tech.icon}
                     </div>
                </div>
            </div>
        </motion.div>
    );
};

export default TechStack3D;
