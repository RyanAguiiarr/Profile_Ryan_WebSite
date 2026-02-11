import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import InfiniteMarquee from "./InfiniteMarquee";
// ... (keep middle content same, so I should probably use multi_replace or specific chunks)

import RevealOnScroll from "./ui/RevealOnScroll";
import Button from "./ui/Button";

const skills = [
  { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Spring Boot", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" }, // Note: Standard is black, might need white filter or separate asset if invisible
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Tailwind", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" }
];

// Import parallax component
import ParallaxHeroBackground from "./ui/ParallaxHeroBackground";

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]); // Background moves down (slower scroll)
  const y2 = useTransform(scrollY, [0, 500], [10, 200]); // Content moves up slightly (faster separation)

  return (
    <section id="home" className="relative min-h-[140vh] max-[800px]:min-h-[100vh] flex flex-col justify-start pt-16 md:pt-48 pb-10 lg:pb-64">
      {/* Video Background - Full Screen Breakout */}
      {/* Parallax Background */}
      {/* Parallax Background - Full Screen Breakout */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-full z-0 overflow-hidden">
        <ParallaxHeroBackground>
             {/* Desktop Layout - Injected as Children */}
              <div className="hidden lg:grid container mx-auto px-6 relative h-full lg:pt-[390px] xl:pt-[360px] min-[1535px]:pt-[350px] grid-cols-2 gap-20 items-start">
                
                {/* Left Content - Full Stack */}
                <div className="flex flex-col items-start text-left">
                    {/* Headline Left */}
                    <motion.div style={{ y: y1 }} className="relative z-10 w-full">
                        <RevealOnScroll delay={0.2}>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-none mb-2 flex flex-col items-start py-0">
                                <span className="font-script text-4xl md:text-5xl lg:text-6xl xl:text-5xl text-orange-500 ml-2 mb-20 lg:mb-10 xl:mb-20 z-20 relative lowercase">desenvolvedor</span>
                                <span className="font-bebas text-[5.5rem] md:text-[7rem] lg:text-[7rem] xl:text-[10rem] min-[1535px]:text-[13rem] tracking-tight text-white leading-none z-10 relative scale-y-150 origin-bottom pb-0">
                                    FULL STACK
                                </span>
                            </h1>
                        </RevealOnScroll>
                    </motion.div>

                    {/* Subtext & Buttons */}
                    <motion.div style={{ y: y1 }} className="max-w-md ml-0 mt-[-40px]">
                         <RevealOnScroll delay={0.4}>
                            <p className="text-lg text-gray-400 leading-relaxed mb-8 font-light">
                                Especialista em construir aplicações escaláveis e de alta performance. 
                            </p>
                            <div className="flex justify-start gap-4">
                                <Button href="#contact" variant="primary">Entre em Contato</Button>
                            </div>
                        </RevealOnScroll>
                    </motion.div>
                </div>

                {/* Right Content - Software Engineer */}
                <div className="flex flex-col items-end text-right"> 
                     {/* Headline Right */}
                    <motion.div style={{ y: y1 }} className="relative z-10 w-full">
                        <RevealOnScroll delay={0.3}>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-none mb-2 flex flex-col items-end py-0">
                                <span className="font-script text-4xl md:text-5xl lg:text-6xl xl:text-5xl text-orange-500 mr-4 mb-20 lg:mb-10 xl:mb-20 z-20 relative lowercase">engenheiro de</span>
                                <span className="font-bebas text-[5.5rem] md:text-[7rem] lg:text-[7rem] xl:text-[10rem] min-[1535px]:text-[13rem] tracking-tight text-white leading-none z-10 relative scale-y-150 origin-bottom pb-0">
                                    SOFTWARE
                                </span>
                            </h1>
                        </RevealOnScroll>
                    </motion.div>

                     <motion.div style={{ y: y1 }} className="max-w-md mr-0 mt-[-40px]">
                         <RevealOnScroll delay={0.5}>
                            <p className="text-lg text-gray-400 leading-relaxed mb-8 font-light">
                                Mesclando a robustez do Java/Spring com a agilidade do React.
                            </p>
                            <div className="flex justify-end gap-4">
                                 <Button href="#about" variant="secondary">Ver Portfólio</Button>
                            </div>
                        </RevealOnScroll>
                    </motion.div>
                </div>

              </div>
              
              {/* Mobile Layout - Moved Inside for Z-Index */}
              <div className="lg:hidden container mx-auto px-4 relative z-10 flex flex-col justify-end h-full pb-[390px] sm:pb-[380px] md:pb-[500px]">
                  <div className="grid grid-cols-2 gap-2 w-full">
                      {/* Left Side */}
                      <motion.div 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                          className="flex flex-col items-start text-left"
                      >
                          <span className="font-script text-2xl sm:text-3xl text-orange-500 mb-2 lowercase ml-1">desenvolvedor</span>
                          <h1 className="font-bebas text-[5.5rem] sm:text-[8rem] tracking-tighter text-white leading-[0.8] flex flex-col mb-20 scale-y-125 origin-top">
                              <span>FULL</span>
                              <span>STACK</span>
                          </h1>
                          <Button href="#contact" variant="primary" className="text-sm px-6 max-[800px]:hidden">Entre em Contato</Button>
                      </motion.div>

                      {/* Right Side */}
                      <motion.div 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                          className="flex flex-col items-end text-right"
                      >
                          <span className="font-script text-2xl sm:text-3xl text-orange-500 mb-2 lowercase mr-1">engenheiro de</span>
                          <h1 className="font-bebas text-[5.5rem] sm:text-[8rem] tracking-tighter text-white leading-[0.8] flex flex-col mb-20 scale-y-125 origin-top">
                              <span>SOFT</span>
                              <span>WARE</span>
                          </h1>
                          <Button href="#about" variant="secondary" className="text-sm px-6 max-[800px]:hidden">Ver Portfólio</Button>
                      </motion.div>
                  </div>
              </div>
        </ParallaxHeroBackground>
        
        {/* Overlays for readability and atmosphere - Keeping original overlays as top-level if needed, but Parallax has its own now. 
            Let's keep these if they provide extra darkness. */}
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/80 pointer-events-none" />
      </div>

      {/* Mobile Layout - Reference Design */}


      {/* Infinite Marquee at Bottom */}
      {/* Infinite Marquee Section - Brand Style */}
      <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 1, duration: 1 }}
         className="absolute bottom-0 left-[50%] -translate-x-1/2 w-screen pointer-events-none"
      >
          {/* Grid Container */}
          <div className="w-full relative pointer-events-auto">

              <div className="py-8 grid gap-8 relative z-10">
                  {/* Header Text */}

                  {/* Marquee Content */}
                  <InfiniteMarquee 
                    items={skills.map(skill => (
                        <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer group">
                             <img 
                                src={skill.logo} 
                                alt={skill.name} 
                                loading="lazy"
                                decoding="async"
                                className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg" 
                                // Invert filter for Next.js if needed (it's black on transparent usually)
                                style={skill.name === "Next.js" ? { filter: "invert(1)" } : {}}
                             />
                             <span className="text-lg font-bold text-gray-300 group-hover:text-white uppercase tracking-wider">{skill.name}</span>
                        </div>
                    ))} 
                    speed={25} 
                  />
              </div>
          </div>
      </motion.div>
    </section>
  );
};

export default Hero;
