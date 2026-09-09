import { FiCode, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { profile } from '../data/portfolio'

const iconMap = {
  github: FiGithub,
  linkedin: FiLinkedin,
  hackerrank: FiCode,
  mail: FiMail,
}

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 py-8 dark:border-slate-800">
      <div className="section-container flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          {profile.socials.map((social) => {
            const Icon = iconMap[social.icon]
            return (
              <a
                key={social.label}
                href={social.href}
                target={social.icon === 'mail' ? undefined : '_blank'}
                rel="noreferrer"
                aria-label={social.label}
                className="text-slate-400 transition-colors hover:text-brand-600 dark:hover:text-brand-400"
              >
                <Icon size={18} />
              </a>
            )
          })}
        </div>
      </div>
    </footer>
  )
}
