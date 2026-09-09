import { motion } from 'framer-motion'
import { education, experience } from '../data/portfolio'
import SectionHeading from './SectionHeading'

export default function Experience() {
  return (
    <section id="experience" className="bg-slate-50 py-24 sm:py-32 dark:bg-slate-900/40">
      <div className="section-container">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked"
          description="My professional journey so far."
        />

        <div className="relative ml-3 border-l border-slate-200 dark:border-slate-800">
          {experience.map((item, i) => (
            <motion.div
              key={item.role + item.company}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative pb-12 pl-8 last:pb-0"
            >
              <span className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-brand-500 bg-white dark:bg-slate-950" />
              <p className="text-sm font-medium text-brand-600 dark:text-brand-400">{item.period}</p>
              <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
                {item.role} · <span className="text-slate-600 dark:text-slate-400">{item.company}</span>
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">Education</h3>
          <div className="space-y-4">
            {education.map((item) => (
              <div
                key={item.degree}
                className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
              >
                <p className="text-sm font-medium text-brand-600 dark:text-brand-400">{item.period}</p>
                <h4 className="mt-1 font-semibold text-slate-900 dark:text-white">{item.degree}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">{item.school}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
