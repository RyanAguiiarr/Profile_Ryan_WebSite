import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Button from "./ui/Button";
import profileImg from "../assets/profile.png";

const StandardNav = ({ navLinks, isMobileMenuOpen, setIsMobileMenuOpen }) => (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-transparent py-6 max-w-[1600px] mx-auto"
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold tracking-tighter hover:text-primary transition-colors">
          RYAN<span className="text-primary">.DEV</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-white hover:text-primary transition-colors text-sm font-medium tracking-wide"
            >
              {link.name}
            </a>
          ))}
          <Button href="#contact" className="px-6">
            Vamos Conversar
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
                  onClick={() => setIsMobileMenuOpen(false)}
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
);

const FloatingNav = ({ navLinks }) => (
    <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="fixed top-6 left-0 right-0 mx-auto w-fit z-50 flex items-center gap-4 px-2 py-2 bg-black/80 backdrop-blur-md border border-white/10 rounded-full shadow-2xl"
    >
        {/* Profile / Home Icon */}
        <a href="#home" className="block w-10 h-10 rounded-full overflow-hidden border border-white/10 hover:border-white transition-colors">
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
                  className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
        </div>

        {/* CTA */}
        <Button href="#contact" className="px-5 py-2 text-xs">
            Contato
        </Button>
    </motion.div>
);

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
