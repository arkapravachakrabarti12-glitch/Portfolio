import { motion } from 'framer-motion'
import { FiArrowDown, FiCode, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { profile } from '../data/portfolio'

const iconMap = {
  github: FiGithub,
  linkedin: FiLinkedin,
  hackerrank: FiCode,
  mail: FiMail,
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-16"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-96 w-96 animate-blob rounded-full bg-brand-300/40 blur-3xl dark:bg-brand-700/20" />
        <div className="absolute top-1/3 -right-24 h-96 w-96 animate-blob rounded-full bg-fuchsia-300/30 blur-3xl [animation-delay:4s] dark:bg-fuchsia-700/20" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 animate-blob rounded-full bg-orange-200/30 blur-3xl [animation-delay:8s] dark:bg-orange-700/10" />
      </div>

      <div className="section-container">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/60 px-4 py-1.5 text-sm font-medium text-slate-600 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Available for new opportunities
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl dark:text-white"
        >
          Hi, I'm {profile.name.split(' ')[0]} —{' '}
          <span className="gradient-text">{profile.role}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-xl text-lg text-slate-600 dark:text-slate-400"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-transform hover:-translate-y-0.5 hover:bg-brand-700"
          >
            View My Work
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-transform hover:-translate-y-0.5 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Get In Touch
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex items-center gap-4"
        >
          {profile.socials.map((social) => {
            const Icon = iconMap[social.icon]
            return (
              <a
                key={social.label}
                href={social.href}
                target={social.icon === 'mail' ? undefined : '_blank'}
                rel="noreferrer"
                aria-label={social.label}
                className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-brand-400 hover:text-brand-600 dark:border-slate-800 dark:text-slate-400 dark:hover:border-brand-500 dark:hover:text-brand-400"
              >
                <Icon size={18} />
              </a>
            )
          })}
        </motion.div>
      </div>

      <motion.a
        href="#about"
        onClick={(e) => {
          e.preventDefault()
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
        }}
        aria-label="Scroll to about section"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 hover:text-brand-500 dark:text-slate-600"
      >
        <FiArrowDown size={22} />
      </motion.a>
    </section>
  )
}
