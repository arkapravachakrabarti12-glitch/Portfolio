import { motion } from 'framer-motion'
import { about, profile } from '../data/portfolio'
import SectionHeading from './SectionHeading'

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="About Me"
          title="A little about who I am"
          description="Here's a quick overview of my background and what drives me."
        />

        <div className="grid gap-12 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500 via-fuchsia-500 to-orange-400 p-1 shadow-xl">
              <div className="flex h-full w-full items-center justify-center rounded-[calc(1.5rem-4px)] bg-white dark:bg-slate-950">
                <span className="text-7xl font-black text-transparent bg-gradient-to-br from-brand-500 via-fuchsia-500 to-orange-400 bg-clip-text">
                  {profile.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            {about.summary.map((paragraph) => (
              <p key={paragraph} className="mb-4 text-slate-600 dark:text-slate-400">
                {paragraph}
              </p>
            ))}

            <div className="mt-8 grid grid-cols-3 gap-4">
              {about.highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center dark:border-slate-800 dark:bg-slate-900"
                >
                  <p className="text-2xl font-bold text-brand-600 dark:text-brand-400">{item.value}</p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
