import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import RevealOnScroll from './ui/RevealOnScroll';
import ParallaxElement from './ui/ParallaxElement';

const projects = [
  {
    title: "Summer Vibes Festival Campaign",
    category: "Graphic Design",
    description: "Created promotional materials for the \"Summer Vibes Festival,\" including posters, flyers, and social media graphics.",
    image: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=2070&auto=format&fit=crop", 
    color: "#2a2a2a" // fallback color
  },
  {
    title: "Coral Spiral Abstract",
    category: "Branding",
    description: "A visually striking 3D abstract artwork featuring a coral-colored spiral form with smooth, flowing curves and a soft pink gradient background, emphasizing modern digital aesthetics and organic geometry.",
    image: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=2080&auto=format&fit=crop",
    color: "#1a1a1a"
  },
  {
    title: "Neon Cityscapes",
    category: "UI / UX Design",
    description: "An immersive digital experience exploring future city layouts with neon aesthetics and interactive 3D elements.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop",
    color: "#0f0f0f"
  },
   {
    title: "Eco-Friendly Packaging",
    category: "Product Design",
    description: "Sustainable packaging solutions for a new line of organic skincare products, focusing on minimalism and recyclability.",
    image: "https://images.unsplash.com/photo-1628198755013-146399c6802e?q=80&w=2070&auto=format&fit=crop",
    color: "#1f1f1f"
  }
];

const Card = ({ i, title, description, src, category, progress, range, targetScale }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0 px-4">
      <motion.div 
        style={{ scale, top: `calc(-5vh + ${i * 25}px)` }} 
        className="relative -top-[25%] h-[60vh] md:h-[600px] w-full max-w-[1100px] rounded-3xl origin-top bg-[#1d1d1d] border border-white/10 shadow-2xl overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full z-0">
             <motion.div className="w-full h-full" style={{ scale: imageScale }}>
                <img 
                    src={src} 
                    alt={title} 
                    className="w-full h-full object-cover"
                />
            </motion.div>
             {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60 z-10" />
        </div>

        {/* Content - Centered */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center p-6 md:p-12 gap-4 md:gap-6">
             <span className="bg-[#ea580c] text-white text-xs md:text-sm font-bold px-4 py-2 rounded-full uppercase tracking-wider inline-block">
                {category}
            </span>
            
            <h2 className="text-3xl md:text-5xl font-extrabold font-sans text-white uppercase tracking-tight leading-none drop-shadow-lg">
                {title}
            </h2>
            
            <p className="text-gray-200 text-sm md:text-lg leading-relaxed max-w-2xl drop-shadow-md">
                {description}
            </p>

             <div className="flex items-center gap-4 mt-2">
                <span className="text-sm font-medium text-white underline underline-offset-4 cursor-pointer hover:text-[#ea580c] transition-colors">See Case Study</span>
             </div>
        </div>
      </motion.div>
    </div>
  );
};

const FutureProjects = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <section ref={container} id="future-projects" className="relative pt-20">
      <div className="container mx-auto px-6 mb-24 text-center">
            <ParallaxElement offset={-20}>
                <RevealOnScroll>
                    <span className="text-primary font-medium tracking-wider uppercase text-sm">Coming Soon</span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-2 text-white">Future Projects</h2>
                </RevealOnScroll>
            </ParallaxElement>
             <ParallaxElement offset={0}>
                <RevealOnScroll delay={0.2}>
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                        A glimpse into upcoming works and experimental concepts currently in development.
                    </p>
                </RevealOnScroll>
             </ParallaxElement>
      </div>

      <div className="pb-[20vh]"> {/* Add padding bottom to allow last card to be fully viewed before next section */}
        {projects.map((project, i) => {
            const targetScale = 1 - ( (projects.length - i) * 0.05);
            return (
            <Card 
                key={i} 
                i={i} 
                {...project} 
                src={project.image}
                progress={scrollYProgress}
                range={[i * .25, 1]}
                targetScale={targetScale}
            />
            );
        })}
      </div>
    </section>
  );
};

export default FutureProjects;
