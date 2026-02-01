import React from "react";
import ProjectCard from "./ProjectCard";
import RevealOnScroll from "./ui/RevealOnScroll";

const projects = [
  {
    title: "E-Commerce Dashboard",
    description: "A comprehensive dashboard for managing online stores, featuring real-time analytics, order management, and inventory tracking.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?fit=crop&w=800&q=80",
    tags: ["Next.js", "TypeScript", "Tailwind", "Prisma"],
    github: "#",
    demo: "#"
  },
  {
    title: "AI Chat Application",
    description: "Real-time chat application incorporating AI assistants, voice notes, and file sharing capabilities.",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?fit=crop&w=800&q=80",
    tags: ["React", "Firebase", "OpenAI API", "Framer Motion"],
    github: "#",
    demo: "#"
  },
  {
    title: "Finance Tracker",
    description: "Personal finance management tool with data visualization, budget planning, and expense categorization.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?fit=crop&w=800&q=80",
    tags: ["Vue.js", "D3.js", "Node.js", "Express"],
    github: "#",
    demo: "#"
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <RevealOnScroll>
            <span className="text-primary font-medium tracking-wider uppercase text-sm">Portfolio</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 text-white">Selected Works</h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              A collection of projects that showcase my passion for building clean, performant, and user-friendly web applications.
            </p>
          </RevealOnScroll>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
