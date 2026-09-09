import { useState } from 'react'
import { projects } from '../data/portfolio'
import ProjectCard from './ProjectCard'
import SectionHeading from './SectionHeading'

export default function Projects() {
  const [showAll, setShowAll] = useState(false)
  const visibleProjects = showAll ? projects : projects.filter((p) => p.featured)

  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="Portfolio"
          title="Featured projects"
          description="A selection of things I've built recently. Each one taught me something new."
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {projects.length > visibleProjects.length && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Show More Projects
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
