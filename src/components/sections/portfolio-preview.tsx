"use client";
import React, { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import useIsMobile from "@/hooks/useIsMobile";
import { PROJECTS, TiltCard, ProjectPreview } from "@/components/portfolio/projects-grid";
import Link from "next/link";

export default function PortfolioPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  /* Exit transition (Blur + Dim) — disabled on mobile */
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const contentOpacity = useTransform(scrollYProgress, [0.8, 1], isMobile ? [1, 1] : [1, 0.4]);
  const contentBlur = useTransform(scrollYProgress, [0.8, 1], isMobile ? ["blur(0px)", "blur(0px)"] : ["blur(0px)", "blur(10px)"]);

  const topProjects = PROJECTS.slice(0, 3);

  return (
    <section ref={ref} className="bg-white py-16 md:py-36 overflow-hidden border-t border-black/[0.06] h-full flex flex-col justify-center">
      <motion.div
        className="max-w-7xl mx-auto px-6 md:px-10 w-full"
        style={{ opacity: contentOpacity, filter: contentBlur }}
      >
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-16">
          <motion.h2
            className="font-display text-[clamp(2rem,5vw,4rem)] uppercase leading-[0.9] tracking-tight text-[#1a1a1a]"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            Our Portfolio
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="self-end md:self-auto"
          >
            <Link
              href="/portfolio"
              className="font-sans text-[11px] tracking-[0.35em] uppercase border-b border-black text-[#1a1a1a] pb-1 hover:opacity-50 transition-opacity"
            >
              View all stories
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {topProjects.map((project, i) => (
            <TiltCard
              key={project.id}
              project={project}
              index={i}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </motion.div>

      {/* Project Preview Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectPreview
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
