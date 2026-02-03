import React, { useEffect, useState, useRef } from "react";
import { motion, useInView, useSpring, useMotionValue } from "framer-motion";
import { Facebook, Instagram, Twitter, Dribbble, Globe } from "lucide-react";
import RevealOnScroll from "./ui/RevealOnScroll";
import Button from "./ui/Button";

const AnimatedCounter = ({ value, duration = 2 }) => {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000 });
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest); // Display integer
      }
    });
  }, [springValue]);

  return <span ref={ref}>0</span>;
};

const About = () => {
  return (
    <section id="about" className="py-24 relative min-h-screen flex items-center">
      <div className="container mx-auto px-6 max-w-6xl">
         
         <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-24 items-center">
            
            {/* Left Column - Target for Floating Card */}
            <div className="hidden lg:flex justify-center items-center h-full min-h-[500px] relative">
                 {/* This div tracks where the floating card should land */}
                 <div id="about-card-pos" className="w-[350px] h-[500px] bg-transparent translate-y-12" />
            </div>

            {/* Right Column - Content */}
            <div className="flex flex-col items-start px-4">
                 {/* Title */}
                 <RevealOnScroll>
                    <h2 className="text-6xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tighter">
                        Sobre Mim
                    </h2>
                 </RevealOnScroll>

                 {/* Description */}
                 <RevealOnScroll delay={0.2}>
                    <p className="text-gray-400 text-lg leading-relaxed mb-12 max-w-xl">
                        Sou Desenvolvedor Full Stack em formação, com mais de dois anos de experiência prática em desenvolvimento de software e suporte em TI. Tenho domínio do ecossistema Spring (Boot, Security, Cloud) e React, aplicando boas práticas de código, design patterns e foco em performance e escalabilidade.
                    </p>
                 </RevealOnScroll>

                 {/* Counters */}
                 <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-3 gap-8 mb-12 w-full"
                 >
                     <div className="flex flex-col gap-1">
                        <span className="text-5xl md:text-6xl font-bold text-lime-400">
                           <AnimatedCounter value={2} />+
                        </span>
                        <span className="text-white font-medium text-sm">Anos de Experiência</span>
                     </div>
                     <div className="flex flex-col gap-1">
                        <span className="text-5xl md:text-6xl font-bold text-lime-400">
                           <AnimatedCounter value={20} />+
                        </span>
                        <span className="text-white font-medium text-sm">Projetos Acadêmicos</span>
                     </div>
                     <div className="flex flex-col gap-1">
                        <span className="text-5xl md:text-6xl font-bold text-lime-400">
                            <AnimatedCounter value={8} />+
                        </span>
                        <span className="text-white font-medium text-sm">Certificações</span>
                     </div>
                 </motion.div>

                 {/* Contact Row */}
                 <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap gap-12 mb-12"
                 >
                     <div>
                         <h4 className="text-white font-bold mb-1">Telefone :</h4>
                         <p className="text-gray-400">+55 (17) 99626-8399</p>
                     </div>
                     <div>
                         <h4 className="text-white font-bold mb-1">Email :</h4>
                         <p className="text-gray-400">ryan.c.aguiiarr@gmail.com</p>
                     </div>
                 </motion.div>

                 {/* Bottom Actions */}
                 <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col md:flex-row items-center gap-8 w-full"
                 >
                     {/* Social Icons */}
                     <div className="flex items-center gap-6">
                         <a href="https://www.linkedin.com/in/ryanaguiar2006/" className="text-white hover:text-lime-400 transition-colors"><Globe size={24} /></a>
                     </div>

                     {/* CTA Button */}
                     <Button className="px-8 py-3 uppercase tracking-wider">
                         Minha História
                     </Button>
                 </motion.div>
            </div>

         </div>
      </div>
    </section>
  );
};

export default About;
