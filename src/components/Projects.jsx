import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import RevealOnScroll from "./ui/RevealOnScroll";
import ProjectCardDesktop from "./ProjectCardDesktop";
import ProjectCardMobile from "./ProjectCardMobile";

// Design SaaS Imports
import designSaas1 from "../assets/Projects/Design_SaaS/Captura de tela 2026-02-16 151229.png";
import designSaas2 from "../assets/Projects/Design_SaaS/Captura de tela 2026-02-16 151242.png";
import designSaas3 from "../assets/Projects/Design_SaaS/Captura de tela 2026-02-16 151331.png";
import designSaas4 from "../assets/Projects/Design_SaaS/Captura de tela 2026-02-16 151346.png";
import designSaas5 from "../assets/Projects/Design_SaaS/Captura de tela 2026-02-16 151355.png";
import designSaas6 from "../assets/Projects/Design_SaaS/Captura de tela 2026-02-16 151407.png";
import designSaas7 from "../assets/Projects/Design_SaaS/Captura de tela 2026-02-16 151419.png";
import designSaas8 from "../assets/Projects/Design_SaaS/Captura de tela 2026-02-16 151438.png";
import designSaas9 from "../assets/Projects/Design_SaaS/Captura de tela 2026-02-16 151655.png";
import designSaas10 from "../assets/Projects/Design_SaaS/Captura de tela 2026-02-16 151718.png";

// Dieta AI Imports
import dietaAi1 from "../assets/Projects/dieta_AI/Captura de tela 2026-02-16 141046.png";
import dietaAi2 from "../assets/Projects/dieta_AI/Captura de tela 2026-02-16 141059.png";
import dietaAi3 from "../assets/Projects/dieta_AI/Captura de tela 2026-02-16 141136.png";
import dietaAi4 from "../assets/Projects/dieta_AI/Captura de tela 2026-02-16 142911.png";
import dietaAi5 from "../assets/Projects/dieta_AI/Captura de tela 2026-02-16 142924.png";

// SEMAC IFSP Imports
import semac1 from "../assets/Projects/semac_Ifsp/Captura de tela 2026-01-29 165612.png";
import semac2 from "../assets/Projects/semac_Ifsp/Captura de tela 2026-01-29 165625.png";
import semac3 from "../assets/Projects/semac_Ifsp/Captura de tela 2026-01-29 165638.png";
import semac4 from "../assets/Projects/semac_Ifsp/Captura de tela 2026-01-29 165655.png";
import semac5 from "../assets/Projects/semac_Ifsp/Captura de tela 2026-01-29 170456.png";
import semac6 from "../assets/Projects/semac_Ifsp/Captura de tela 2026-01-29 170516.png";

// StartEdu Imports
import startEdu1 from "../assets/Projects/startEdu/Captura de tela 2025-06-19 153928.png";
import startEdu2 from "../assets/Projects/startEdu/Captura de tela 2025-06-19 225401.png";
import startEdu3 from "../assets/Projects/startEdu/Captura de tela 2025-06-19 225520.png";
import startEdu4 from "../assets/Projects/startEdu/Captura de tela 2025-06-20 004905.png";
import startEdu5 from "../assets/Projects/startEdu/Captura de tela 2025-06-25 180646.png";
import startEdu6 from "../assets/Projects/startEdu/Captura de tela 2025-07-15 164041.png";
import startEdu7 from "../assets/Projects/startEdu/Captura de tela 2025-08-02 090952.png";
import startEdu8 from "../assets/Projects/startEdu/Captura de tela 2025-08-02 091002.png";
import startEdu9 from "../assets/Projects/startEdu/Captura de tela 2025-08-02 091014.png";

const projects = [
  {
    id: 1,
    title: "Design & Social Media SaaS",
    description: "Aplicação SaaS voltada para a criação e gestão de design e conteúdo para redes sociais. Arquitetura escalável com Front-End em React Native para mobilidade e Back-End robusto em Java Spring Boot.",
    images: [designSaas1, designSaas2, designSaas3, designSaas4, designSaas5, designSaas6, designSaas7, designSaas8, designSaas9, designSaas10],
    tags: ["React Native", "Spring Boot", "SaaS", "Mobile"],
    color: "#6366F1", // Azul Lavanda
    colors: {
      bg: "#1A1C26",
      highlight1: "#6366F1",
      highlight2: "#252836"
    },
    github: "#",
    demo: "#"
  },
  {
    id: 2,
    title: "Dieta.AI",
    description: "Assistente nutricional inteligente que gera planos alimentares personalizados. Utiliza IA para adaptar cardápios, monitorar calorias e otimizar resultados de hipertrofia ou emagrecimento.",
    images: [dietaAi1, dietaAi2, dietaAi3, dietaAi4, dietaAi5],
    tags: ["React", "Spring Boot", "IA/LLMs", "Saúde"],
    color: "#82C91E", // Verde Limão
    colors: {
        bg: "#01161E",
        highlight1: "#82C91E",
        highlight2: "#00A5E3"
    },
    github: "#",
    demo: "#"
  },
  {
    id: 3,
    title: "XI SEMAC - IFSP",
    description: "Sistema oficial de inscrições e gestão da XI Semana da Computação do IFSP - Campus Catanduva. Aplicação web completa desenvolvida com React e Spring Boot, oferecendo simplicidade e estabilidade para alunos e convidados.",
    images: [semac1, semac2, semac3, semac4, semac5, semac6],
    tags: ["React", "Spring Boot", "TailwindCSS", "PostgreSQL"],
    color: "#FF007A", // Rosa Neon
    colors: {
        bg: "#0D0D0D",
        highlight1: "#FF007A",
        highlight2: "#2E31FF"
    },
    github: "#",
    demo: "#"
  },
  {
    id: 4,
    title: "StartEdu",
    description: "Plataforma Full Stack completa para acomodações estudantis. Desenvolvida com Java Spring Boot no BackEnd e React no Front-End, com assistente de IA via FastAPI, autenticação JWT e upload de imagens.",
    images: [startEdu1, startEdu2, startEdu3, startEdu4, startEdu5, startEdu6, startEdu7, startEdu8, startEdu9],
    tags: ["Java Spring Boot", "React", "FastAPI", "JWT"],
    color: "#FF6D33", // Laranja
    colors: {
        bg: "#120B1E",
        highlight1: "#FF6D33",
        highlight2: "#6C3EE8"
    },
    github: "#",
    demo: "#"
  }
];

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const currentProject = projects[currentIndex];

  return (
    <section id="projects" className="pt-32 pb-8 md:py-24 relative w-screen left-1/2 -ml-[50vw] overflow-hidden transition-colors duration-1000"
      style={{ backgroundColor: currentProject.colors?.bg || '#000' }} 
    >
        {/* Dynamic Background Gradient Blob */}
        <div 
            className="absolute inset-0 blur-[150px] opacity-40 pointer-events-none transition-colors duration-1000"
            style={{ 
                background: `radial-gradient(circle at 60% 40%, ${currentProject.colors?.highlight1 || currentProject.color}, transparent 60%),
                             radial-gradient(circle at 40% 60%, ${currentProject.colors?.highlight2 || currentProject.color}, transparent 60%)`
            }}
        />

        {/* Top Vignette - Restored for "Black Light" effect */}
        <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-black via-black/85 to-transparent z-20 pointer-events-none" />
        {/* Bottom Vignette */}
        <div className="absolute bottom-0 left-0 right-0 h-32 md:h-64 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-30">
        <div className="mb-8 md:mb-32 text-center relative z-30">
            <div>
              <span className="text-white font-bold tracking-widest uppercase text-sm border border-white/30 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md shadow-lg">
                  Projetos
              </span>
              <h2 className="text-5xl md:text-7xl font-black mt-6 text-white drop-shadow-xl tracking-tight">Meus Projetos</h2>
            </div>
        </div>

        {/* DESKTOP VIEW */}
        <div className="hidden md:block relative">
            {/* Prev Button - Absolute Positioned */}
            <button 
                onClick={prevProject}
                className="absolute left-0 md:-left-12 lg:-left-20 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10 backdrop-blur-md z-30 group"
                aria-label="Previous Project"
            >
                <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
            </button>

            {/* Content Area */}
            <div className="w-full h-full flex justify-center items-center">
                 <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full flex justify-center"
                    >
                        <ProjectCardDesktop project={currentProject} isActive={true} />
                    </motion.div>
                 </AnimatePresence>
            </div>

             {/* Next Button - Absolute Positioned */}
             <button 
                onClick={nextProject}
                className="absolute right-0 md:-right-12 lg:-right-20 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10 backdrop-blur-md z-30 group"
                aria-label="Next Project"
            >
                <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
            </button>
             {/* Indicators */}
             <div className="flex justify-center gap-3 mt-12">
                {projects.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            idx === currentIndex ? "w-10 bg-white" : "bg-white/20 hover:bg-white/40"
                        }`}
                        aria-label={`Go to project ${idx + 1}`}
                    />
                ))}
            </div>
        </div>

        {/* MOBILE VIEW (Carousel) */}
        <div className="md:hidden relative h-[680px] flex items-center justify-center overflow-visible">
            {/* 
               We render 3 cards efficiently or just map all but position them absolutely.
               For a true carousel feeling, we'll map all but control their styles.
            */}
             <div className="relative w-full h-[680px] flex items-center justify-center [perspective:1000px]">
                {projects.map((project, index) => {
                    // Logic to determine relative position
                    // We need a circular logic for handling the "infinite" feel locally if we want, 
                    // but for simplicity, let's just handle index deviations.
                    
                    let offset = index - currentIndex;
                    // Handle wrap-around for visual continuity (optional but good for 3 items)
                    if (offset < -1 && currentIndex === projects.length - 1) offset = projects.length - 1 - currentIndex; 
                    
                    // Specific logic for 3 items to always show prev/next
                    if (projects.length === 3) {
                         if (currentIndex === 0 && index === 2) offset = -1;
                         if (currentIndex === 2 && index === 0) offset = 1;
                    }
                    
                    const isActive = index === currentIndex;
                    
                    // Only render if it's current, previous or next (or within reasonable range)
                    if (Math.abs(offset) > 1) return null;

                    return (
                        <motion.div
                            key={project.id}
                            className="absolute w-[90%] max-w-[400px]"
                            initial={false}
                            animate={{
                                x: offset * 105 + "%", // Spacing
                                scale: isActive ? 1 : 0.85,
                                zIndex: isActive ? 10 : 5,
                                opacity: 1,
                                filter: "none", // Always sharp
                                rotateY: 0 // Removed tilt for sharpness
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30
                            }}
                            onClick={() => setCurrentIndex(index)}
                        >
                            <ProjectCardMobile project={project} isActive={isActive} />
                        </motion.div>
                    );
                })}
            </div>

            {/* Mobile Controls */}
            <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-6 z-20">
                <button 
                     onClick={prevProject}
                     className="p-3 bg-white/10 rounded-full text-white backdrop-blur-md"
                >
                    <ChevronLeft size={24} />
                </button>
                 <button 
                     onClick={nextProject}
                     className="p-3 bg-white/10 rounded-full text-white backdrop-blur-md"
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>

      </div>
    </section>
  );
};

export default Projects;
