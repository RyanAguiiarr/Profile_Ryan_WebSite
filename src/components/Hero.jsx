import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import InfiniteMarquee from "./InfiniteMarquee";
import ProfileCard from "./ProfileCard";
import RevealOnScroll from "./ui/RevealOnScroll";
import Button from "./ui/Button";

const skills = [
  "JAVA", "SPRING BOOT", "REACT", "NEXT.JS", "TYPESCRIPT", "DOCKER", "POSTGRESQL", "MANGODB", "TAILWIND", "GIT"
];

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section id="home" className="relative min-h-[90vh] flex flex-col justify-center pt-32 pb-20 overflow-hidden">
      
      {/* Background Ambience / Glows */}
      {/* Top Right Glow */}
      <motion.div style={{ y: y1 }} className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />
      {/* Bottom Left Glow */}
      <motion.div style={{ y: y2 }} className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/3" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />


      {/* Desktop Layout */}
      <div className="hidden lg:grid container mx-auto px-6 relative z-10 grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div className="flex flex-col items-start text-left">
            {/* Badge */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 mb-8"
            >
                <span className="bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wide">Novo</span>
                <span className="text-sm text-gray-300 font-medium">Disponível para projetos</span>
            </motion.div>

            {/* Headline */}
            <RevealOnScroll delay={0.2}>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[1.1] mb-6">
                    Desenvolvedor <br />
                    <span className="text-gray-400">Full Stack.</span>
                </h1>
            </RevealOnScroll>

            {/* Subtext */}
            <RevealOnScroll delay={0.4}>
                <p className="text-lg text-gray-400 max-w-lg leading-relaxed mb-10">
                    Especialista em construir aplicações escaláveis e de alta performance. Mesclando a robustez do Java/Spring com a agilidade do React.
                </p>
            </RevealOnScroll>
            


            {/* Buttons */}
            <RevealOnScroll delay={0.6}>
                <div className="flex flex-wrap gap-4">
                    <Button
                        href="#contact"
                    >
                        Entre em Contato
                    </Button>
                    <Button
                        href="#about"
                    >
                        Ver Portfólio
                    </Button>
                </div>
            </RevealOnScroll>
        </div>

        {/* Right Content - Visual Placeholder (Video/Geometric) */}
        {/* Right Content - Visual Placeholder (Video/Geometric) */}
        {/* Replaced with a marker ID for the Floating Card to track */}
        <div className="relative hidden lg:block h-full min-h-[400px] flex items-center justify-center pointer-events-none">
             <div id="hero-card-pos" className="w-[350px] h-[500px] rounded-2xl border border-white/5 opacity-0" />
        </div>

      </div>

      {/* Mobile Layout - Reference Design */}
      <div className="lg:hidden container mx-auto px-6 relative z-10 flex flex-col items-center justify-center pt-4 pb-12">
          <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white/60 font-medium tracking-widest uppercase text-xs mb-2"
          >
              RYAN CANTARELI
          </motion.p>
          
          <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl font-black text-white tracking-tighter uppercase leading-none mb-4 z-0"
          >
              FULL STACK
          </motion.h1>

          <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative w-full max-w-[280px] aspect-[3/4] my-2 z-10"
          >
              <ProfileCard className="w-full h-full" />
              
              {/* Hi Badge */}
              <div className="absolute -left-4 top-[65%] w-16 h-16 bg-[#bef264] text-black font-bold text-xl rounded-full flex items-center justify-center shadow-lg transform -rotate-12 z-20">
                  Olá
              </div>
          </motion.div>

          <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-6xl font-black text-white tracking-tighter uppercase leading-none mt-4 z-0"
          >
              DEVELOPER
          </motion.h1>

          <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center text-gray-400 mt-6 max-w-xs text-sm leading-relaxed"
          >
               Desenvolvedor Full Stack e analista de sistemas focado em Java, Spring e React.
          </motion.p>
      </div>

      {/* Infinite Marquee at Bottom */}
      {/* Infinite Marquee Section - Brand Style */}
      <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 1, duration: 1 }}
         className="absolute bottom-0 left-0 w-full border-t border-white/10 bg-black/80 backdrop-blur-md"
      >
          {/* Grid Container */}
          <div className="container mx-auto px-6 relative">
              {/* Vertical Border Lines (Visual Flair) */}
              <div className="absolute top-0 bottom-0 left-6 w-px bg-white/5 hidden lg:block" />
              <div className="absolute top-0 bottom-0 right-6 w-px bg-white/5 hidden lg:block" />

              <div className="py-8 grid gap-8 relative z-10">
                  {/* Header Text */}

                  {/* Marquee Content */}
                  <InfiniteMarquee items={skills} speed={30} />
              </div>
          </div>
      </motion.div>
    </section>
  );
};

export default Hero;
