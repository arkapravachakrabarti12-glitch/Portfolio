import { motion } from 'framer-motion'
import { FiAward } from 'react-icons/fi'
import { certifications } from '../data/portfolio'
import SectionHeading from './SectionHeading'

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="Certifications"
          title="Certifications & achievements"
          description="Courses, simulations, and competitions I've completed along the way."
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {certifications.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                <FiAward size={18} />
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
