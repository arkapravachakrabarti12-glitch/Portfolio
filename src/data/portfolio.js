export const profile = {
  name: 'Arkaprava Chakrabarti',
  role: 'Full-Stack Developer',
  tagline: 'I build fast, accessible web apps with clean UI and solid engineering underneath.',
  location: 'India',
  email: 'chakrabartiarkaprava@gmail.com',
  resumeUrl: '#',
  socials: [
    { label: 'GitHub', href: 'https://github.com/', icon: 'github' },
    { label: 'LinkedIn', href: 'https://linkedin.com/', icon: 'linkedin' },
    { label: 'Twitter', href: 'https://twitter.com/', icon: 'twitter' },
    { label: 'Email', href: 'mailto:chakrabartiarkaprava@gmail.com', icon: 'mail' },
  ],
}

export const about = {
  summary: [
    "I'm a developer who enjoys turning ideas into polished, working products — from the first wireframe to a production deployment.",
    'My focus is on writing maintainable code, thoughtful UI, and performance that holds up under real usage. I like working across the stack, but I care most about the experience on the other side of the screen.',
  ],
  highlights: [
    { label: 'Years building software', value: '3+' },
    { label: 'Projects shipped', value: '20+' },
    { label: 'Technologies', value: '15+' },
  ],
}

export const skills = [
  {
    category: 'Frontend',
    items: ['React', 'JavaScript (ES6+)', 'TypeScript', 'Tailwind CSS', 'HTML5 & CSS3', 'Redux'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'REST APIs', 'GraphQL', 'Python'],
  },
  {
    category: 'Database & DevOps',
    items: ['MongoDB', 'PostgreSQL', 'Docker', 'Git & GitHub', 'CI/CD', 'AWS'],
  },
  {
    category: 'Tools & Design',
    items: ['Figma', 'VS Code', 'Postman', 'Jest', 'Framer Motion'],
  },
]

export const projects = [
  {
    title: 'E-Commerce Platform',
    description:
      'A full-featured storefront with product search, cart, checkout, and an admin dashboard for inventory and orders.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    gradient: 'from-brand-500 to-fuchsia-500',
    liveUrl: '#',
    codeUrl: '#',
    featured: true,
  },
  {
    title: 'Real-Time Chat App',
    description:
      'A WebSocket-based messaging app with rooms, typing indicators, and message persistence.',
    tags: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
    gradient: 'from-emerald-500 to-teal-500',
    liveUrl: '#',
    codeUrl: '#',
    featured: true,
  },
  {
    title: 'Task Management Board',
    description:
      'A drag-and-drop Kanban board with team workspaces, due dates, and activity history.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Firebase'],
    gradient: 'from-orange-400 to-rose-500',
    liveUrl: '#',
    codeUrl: '#',
    featured: true,
  },
  {
    title: 'Weather Dashboard',
    description: 'A location-aware weather app with animated forecasts and saved locations.',
    tags: ['React', 'API Integration', 'Chart.js'],
    gradient: 'from-sky-400 to-brand-600',
    liveUrl: '#',
    codeUrl: '#',
    featured: false,
  },
  {
    title: 'Markdown Blog Engine',
    description: 'A statically generated blog with MDX support, tags, and full-text search.',
    tags: ['Next.js', 'MDX', 'Tailwind'],
    gradient: 'from-violet-500 to-indigo-600',
    liveUrl: '#',
    codeUrl: '#',
    featured: false,
  },
  {
    title: 'Personal Finance Tracker',
    description: 'Budget tracking with charts, category breakdowns, and CSV import/export.',
    tags: ['React', 'Redux', 'Recharts'],
    gradient: 'from-amber-400 to-orange-600',
    liveUrl: '#',
    codeUrl: '#',
    featured: false,
  },
]

export const experience = [
  {
    role: 'Frontend Developer',
    company: 'Tech Solutions Inc.',
    period: '2024 — Present',
    description:
      'Building and maintaining customer-facing React applications, improving load times and accessibility across the product.',
  },
  {
    role: 'Software Engineering Intern',
    company: 'StartUp Labs',
    period: '2023 — 2024',
    description:
      'Worked across the stack on a SaaS product, shipping features from database schema to UI, in a small fast-moving team.',
  },
  {
    role: 'Freelance Web Developer',
    company: 'Self-employed',
    period: '2022 — 2023',
    description:
      'Designed and built websites for small businesses, handling everything from client requirements to deployment.',
  },
]

export const education = [
  {
    degree: 'B.Tech in Computer Science',
    school: 'University Institute of Technology',
    period: '2021 — 2025',
  },
]
