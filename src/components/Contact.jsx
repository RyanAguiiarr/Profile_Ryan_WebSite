import React from "react";
import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import Button from "./ui/Button";

const Contact = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-8"
          >
            Tem um projeto em mente? <br />
            <span className="text-gray-500">Vamos construí-lo juntos.</span>
          </motion.h2>

          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="flex flex-col items-center gap-6"
          >
            <a 
              href="mailto:ryan.c.aguiiarr@gmail.com"
              className="group flex items-center gap-3 text-2xl md:text-3xl font-medium hover:text-primary transition-colors"
            >
              <Mail className="hidden md:block" />
              ryan.c.aguiiarr@gmail.com
              <ArrowUpRight className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </a>

            <div className="flex gap-4 mt-8">
               <SocialLink href="#" label="LinkedIn" />
               <SocialLink href="#" label="GitHub" />
               <SocialLink href="#" label="Twitter" />
            </div>
          </motion.div>
        </div>
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
