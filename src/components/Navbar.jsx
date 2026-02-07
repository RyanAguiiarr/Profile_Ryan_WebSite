import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Button from "./ui/Button";
import profileImg from "../assets/profile.png";
import logoVideo from "../assets/logoDemo.webp";
import logoVideoMobile from "../assets/logoDemo-mobile.webp";
import { LenisContext } from "./ui/SmoothScroll";

const useSmoothScroll = () => {
    const lenis = useContext(LenisContext);
    
    const scrollTo = (e, href) => {
        e.preventDefault();
        if (lenis) {
            lenis.scrollTo(href, { duration: 1.5 });
        } else {
             const element = document.querySelector(href);
             if(element) element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return scrollTo;
};


const StandardNav = ({ navLinks, isMobileMenuOpen, setIsMobileMenuOpen }) => {
    const scrollTo = useSmoothScroll();

    return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-transparent py-6 max-w-[1600px] mx-auto"
    >
      <div className="container mx-auto px-6 flex justify-center md:justify-between items-center relative">
        <a href="#home" onClick={(e) => scrollTo(e, "#home")} className="block w-48 md:w-72 hover:opacity-80 transition-opacity">
          <img 
            src={logoVideo}
            srcSet={`${logoVideoMobile} 200w, ${logoVideo} 800w`}
            sizes="(max-width: 768px) 200px, 184px"
            alt="Ryan Logo" 
            width="184"
            height="102"
            fetchPriority="high"
            className="w-full h-auto" 
          />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              className="text-gray-300 hover:text-white hover:text-primary transition-colors text-sm font-medium tracking-wide"
            >
              {link.name}
            </a>
          ))}
          <Button href="#contact" onClick={(e) => scrollTo(e, "#contact")} className="px-6">
            Vamos Conversar
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="absolute right-6 md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

       {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 overflow-hidden absolute top-full left-0 right-0"
          >
            <div className="flex flex-col p-6 space-y-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                      scrollTo(e, link.href);
                      setIsMobileMenuOpen(false);
                  }}
                  className="text-lg font-medium text-gray-300 hover:text-primary"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
)};

const FloatingNav = ({ navLinks }) => {
    const scrollTo = useSmoothScroll();

    return (
    <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="fixed top-6 left-0 right-0 mx-auto w-fit z-50 flex items-center gap-4 px-2 py-2 bg-black/90 backdrop-blur-md border border-white/10 rounded-full shadow-2xl"
    >
        {/* Profile / Home Icon */}
        <a href="#home" onClick={(e) => scrollTo(e, "#home")} className="block w-14 h-14 rounded-full overflow-hidden border border-white/10 hover:border-white transition-colors">
             <img 
                src={profileImg} 
                alt="Home" 
                className="w-full h-full object-cover"
            />
        </a>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6 px-4">
             {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
        </div>

        {/* CTA */}
        <Button href="#contact" onClick={(e) => scrollTo(e, "#contact")} className="px-5 py-2 text-xs">
            Contato
        </Button>
    </motion.div>
)};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Início", href: "#home" },
    { name: "Projetos", href: "#projects" },
    { name: "Sobre", href: "#about" },
  ];

  return (
    <AnimatePresence mode="wait">
        {!isScrolled ? (
            <StandardNav 
                key="standard" 
                navLinks={[...navLinks, { name: "Contato", href: "#contact" }]} 
                isMobileMenuOpen={isMobileMenuOpen} 
                setIsMobileMenuOpen={setIsMobileMenuOpen} 
            />
        ) : (
            <FloatingNav 
                key="floating" 
                navLinks={navLinks} 
            />
        )}
    </AnimatePresence>
  );
};

export default Navbar;
