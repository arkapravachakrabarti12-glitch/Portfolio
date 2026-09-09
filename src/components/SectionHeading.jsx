import { motion } from 'framer-motion'

export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const isCenter = align === 'center'
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`mb-12 ${isCenter ? 'text-center' : 'text-left'}`}
    >
      <span className="text-sm font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
        {eyebrow}
      </span>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 max-w-2xl text-slate-600 dark:text-slate-400 ${isCenter ? 'mx-auto' : ''}`}
        >
          {description}
        </p>
      )}
    </motion.div>
  )
}
