import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import TechBadge from "./TechBadge";
import Button from "./ui/Button";

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-primary/50 transition-colors"
    >
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
        <div className="flex justify-between items-end mb-3">
          <div>
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-gray-400 line-clamp-2">{project.description}</p>
          </div>


          <div className="flex gap-3">
            {project.github && (
              <Button
                href={project.github}
                className="p-3 w-12 h-12 flex items-center justify-center"
                title="View Code"
                aria-label="View Code on GitHub"
              >
                <Github size={20} />
              </Button>
            )}
            {project.demo && (
              <Button
                href={project.demo}
                className="p-3 w-12 h-12 flex items-center justify-center"
                title="Live Demo"
                aria-label="View Live Demo"
              >
                <ExternalLink size={20} />
              </Button>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags.map((tag) => (
            <TechBadge key={tag} name={tag} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
