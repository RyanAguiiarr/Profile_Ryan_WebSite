import React from "react";
import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import Button from "./ui/Button";
import ParallaxElement from "./ui/ParallaxElement";

import AboutBackgroundShapes from "./ui/AboutBackgroundShapes";
import { useIsMobile } from "../hooks/useIsMobile";

const Contact = () => {
  const isMobile = useIsMobile();
  return (
    <section id="contact" className="py-[250px] relative overflow-hidden bg-black w-screen left-1/2 -ml-[50vw]">
      {/* Background accents */}
      <AboutBackgroundShapes />
      
      <div className="container mx-auto px-6 relative z-10">
        <ParallaxElement offset={-20}>
            <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
                initial={isMobile ? false : { opacity: 0, y: 20 }}
                whileInView={isMobile ? false : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-bold mb-8"
            >
                Tem um projeto em mente? <br />
                <span className="text-gray-500">Vamos construí-lo juntos.</span>
            </motion.h2>

            <motion.div
                initial={isMobile ? false : { opacity: 0, y: 20 }}
                whileInView={isMobile ? false : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={isMobile ? { duration: 0 } : { delay: 0.2 }}
                className="flex flex-col items-center gap-6"
            >
                <a 
                href="mailto:ryan.c.aguiiarr@gmail.com"
                className="group flex items-center gap-3 text-2xl md:text-3xl font-medium md:hover:text-primary md:transition-colors"
                aria-label="Send email to ryan.c.aguiiarr@gmail.com"
                >
                <Mail className="hidden md:block" />
                ryan.c.aguiiarr@gmail.com
                <ArrowUpRight className="md:group-hover:-translate-y-1 md:group-hover:translate-x-1 md:transition-transform" />
                </a>

                <div className="flex gap-4 mt-8">
                <SocialLink href="https://www.linkedin.com/in/ryanaguiar2006/" label="LinkedIn" />
                <SocialLink href="https://github.com/RyanAguiiarr" label="GitHub" />
                <SocialLink href="https://www.instagram.com/ryan_aguiar006/" label="Instagram" />
                </div>
            </motion.div>
            </div>
        </ParallaxElement>
      </div>
    </section>
  );
};



const SocialLink = ({ href, label }) => (
  <Button 
    href={href}
    className="px-6 py-3"
  >
    {label}
  </Button>
);

export default Contact;
