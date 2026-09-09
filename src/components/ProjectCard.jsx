import { motion } from 'framer-motion'
import { FiCode, FiExternalLink, FiGithub } from 'react-icons/fi'

export default function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
    >
      <div
        className={`relative flex aspect-video items-center justify-center overflow-hidden bg-gradient-to-br ${project.gradient}`}
      >
        <FiCode
          size={56}
          className="text-white/30 transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-slate-950/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`View live demo of ${project.title}`}
            className="grid h-11 w-11 place-items-center rounded-full bg-white text-slate-900 transition-transform hover:scale-110"
          >
            <FiExternalLink size={18} />
          </a>
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`View source code of ${project.title}`}
            className="grid h-11 w-11 place-items-center rounded-full bg-white text-slate-900 transition-transform hover:scale-110"
          >
            <FiGithub size={18} />
          </a>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm text-slate-600 dark:text-slate-400">{project.description}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
