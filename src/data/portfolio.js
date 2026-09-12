export const profile = {
  name: 'Arkaprava Chakrabarti',
  role: 'QA Engineer & Backend Developer',
  tagline:
    'MCA student and IT Intern building reliable software through test automation, Java/Spring Boot backends, and real-time monitoring dashboards.',
  location: 'Kolkata, West Bengal, India',
  phone: '+91 7003955378',
  email: 'chakrabartiarkaprava@gmail.com',
  resumeUrl: '#',
  socials: [
    { label: 'GitHub', href: 'https://github.com/ARKA7781', icon: 'github' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/arkaprava-chakrabarti1', icon: 'linkedin' },
    { label: 'HackerRank', href: 'https://hackerrank.com/profile/chakrabartiarka1', icon: 'hackerrank' },
    { label: 'Email', href: 'mailto:chakrabartiarkaprava@gmail.com', icon: 'mail' },
  ],
}

export const about = {
  summary: [
    'MCA student and IT Intern with hands-on experience in manual and automated software testing (Selenium, Java), backend development using Java and Spring Boot, and building real-time monitoring dashboards with Grafana, Prometheus, and Amazon AWS CloudWatch.',
    'Skilled in SQL-based data validation, RESTful API development, microservices architecture, and Agile collaboration, with proven project experience in fintech testing, payment gateway integration, and full-stack application development.',
  ],
  highlights: [
    { label: 'Current CGPA', value: '8.2' },
    { label: 'Projects Built', value: '5+' },
    { label: 'Certifications', value: '6+' },
  ],
}

export const skills = [
  {
    category: 'Testing & Automation',
    items: ['Manual Testing', 'Selenium WebDriver (Java)', 'Test Case Design', 'Regression Testing', 'UAT'],
  },
  {
    category: 'Monitoring & Dashboards',
    items: ['Grafana', 'Prometheus', 'Amazon AWS CloudWatch'],
  },
  {
    category: 'Programming Languages',
    items: ['Java', 'Python', 'C', 'Shell Scripting'],
  },
  {
    category: 'Database & Tools',
    items: ['SQL', 'SQLyog', 'Oracle'],
  },
  {
    category: 'Backend & Web',
    items: ['Spring Boot', 'Java 21', 'REST APIs', 'Microservices', 'API Gateway', 'PHP', 'HTML', 'CSS'],
  },
  {
    category: 'Developer Tools',
    items: ['VS Code', 'Jira', 'Spring Tool Suite'],
  },
]

export const projects = [
  {
    title: 'ScanFlow — Android Document Scanner',
    description:
      'A native Android app for capturing, organizing, and sharing scanned documents: ML Kit-powered auto edge detection and multi-page capture, on-device OCR for full-text search, PDF export/print/share, and a Jetpack Compose + Room + Hilt architecture.',
    tags: ['Kotlin', 'Jetpack Compose', 'ML Kit', 'Room', 'Hilt', 'CameraX'],
    gradient: 'from-brand-500 to-cyan-500',
    liveUrl: '#',
    codeUrl: 'https://github.com/arkapravachakrabarti12-glitch/ScanFlow',
    featured: true,
  },
  {
    title: 'ECOMVERSE — Microservices E-Commerce Platform',
    description:
      'Architected a microservices-based e-commerce platform in Spring Boot & Java 21 with independent services for products, orders, payments, and wallets, plus an API Gateway for routing and auth, Razorpay payment integration, and Payment/Order MIS modules.',
    tags: ['Spring Boot', 'Java 21', 'REST APIs', 'Razorpay', 'Microservices'],
    gradient: 'from-brand-500 to-fuchsia-500',
    liveUrl: '#',
    codeUrl: '#',
    featured: true,
  },
  {
    title: 'VERIFACT — AI-Based Fake News Detection',
    description:
      'A fake-news detection system using BERT for semantic analysis and claim extraction, Tesseract OCR for text-in-image extraction, and FFmpeg/MoviePy for video frame processing, served through a Flask backend.',
    tags: ['Python', 'BERT', 'OpenCV', 'FastAPI', 'FFmpeg'],
    gradient: 'from-emerald-500 to-teal-500',
    liveUrl: '#',
    codeUrl: '#',
    featured: true,
  },
  {
    title: 'College Website with Biometric Attendance',
    description:
      'A college portal with role-based logins for teachers, students, admin, and librarians, an SMTP-based notification system, and an Arduino-driven fingerprint attendance system with real-time results.',
    tags: ['HTML', 'CSS', 'PHP', 'Arduino'],
    gradient: 'from-orange-400 to-rose-500',
    liveUrl: '#',
    codeUrl: '#',
    featured: true,
  },
  {
    title: 'Volume Control Using Hand Gesture',
    description: 'Real-time computer vision app that lets users control system volume using finger gestures.',
    tags: ['Python', 'OpenCV'],
    gradient: 'from-sky-400 to-brand-600',
    liveUrl: '#',
    codeUrl: '#',
    featured: false,
  },
  {
    title: 'Password Manager',
    description: 'A Java desktop application for securely storing and retrieving login credentials via JDBC and SQL.',
    tags: ['Java', 'JDBC', 'AWT', 'SQL'],
    gradient: 'from-violet-500 to-indigo-600',
    liveUrl: '#',
    codeUrl: '#',
    featured: false,
  },
]

export const experience = [
  {
    role: 'IT Intern — Quality Assurance & Testing',
    company: 'Sahaj Retail Limited (Fintech)',
    period: 'September 2025 — Present',
    description:
      'Perform end-to-end manual and automated testing (Selenium/Java) across a fintech web portal and mobile app, covering functional, regression, and UAT cycles. Build real-time Grafana dashboards on Prometheus and AWS CloudWatch metrics, validate backend data with SQL in SQLyog, and manage defects through Jira within an Agile team.',
  },
]

export const education = [
  {
    degree: 'Master of Computer Application (MCA)',
    school: 'Seacom Engineering College, MAKAUT — Howrah, West Bengal',
    period: '2024 — Pursuing',
  },
  {
    degree: 'B.Sc. in Computer Science (Honours) — CGPA: 8.2',
    school: 'Seth Anandram Jaipuria College, Calcutta University — Kolkata, West Bengal',
    period: '2021 — 2024',
  },
]

export const certifications = [
  'IBM SkillsBuild — What is IoT, AI in Practice',
  '2nd Position, NEO-NEXUS Codathon — Seacom Engineering College, May 2025',
  'Python Essentials — Cisco',
  'Data Analytics Job Simulation — Deloitte',
  'SQL Basic and Python Basic — HackerRank',
  'Career Edge – Young Professional — TCS',
]
