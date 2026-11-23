import { motion } from 'framer-motion'
import { skills } from '../data/portfolio'
import SectionHeading from './SectionHeading'

export default function Skills() {
  return (
    <section id="skills" className="bg-slate-50 py-24 sm:py-32 dark:bg-slate-900/40">
      <div className="section-container">
        <SectionHeading
          eyebrow="Skills"
          title="Tools & technologies I work with"
          description="A snapshot of the testing practices, monitoring tools, and technologies I use day to day."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <h3 className="mb-4 font-semibold text-slate-900 dark:text-white">{group.category}</h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 dark:bg-brand-500/10 dark:text-brand-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
