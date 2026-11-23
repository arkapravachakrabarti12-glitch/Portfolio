import { motion } from 'framer-motion'
import { FiBriefcase, FiCode } from 'react-icons/fi'

export default function ProjectCard({ project, index }) {
  const isAcademic = project.type === 'Academic Project'
  const TypeIcon = isAcademic ? FiCode : FiBriefcase

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
    >
      <div
        className={`relative flex aspect-video flex-col items-center justify-center gap-3 overflow-hidden bg-gradient-to-br ${project.gradient}`}
      >
        <FiCode
          size={48}
          className="text-white/25 transition-transform duration-500 group-hover:scale-110"
        />
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          <TypeIcon size={12} />
          {project.type}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{project.title}</h3>
        </div>
        <p className="mt-1 text-xs font-medium text-brand-600 dark:text-brand-400">{project.period}</p>
        <p className="mt-3 flex-1 text-sm text-slate-600 dark:text-slate-400">{project.description}</p>
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
