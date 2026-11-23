export const profile = {
  name: 'Arkaprava Chakrabarti',
  role: 'Software Test Engineer (QA)',
  tagline:
    'QA Engineer with 1+ year of experience in manual & API testing, defect management, and Production L1 Support — incident triage, root cause analysis, and SLA-driven resolution in banking and payments.',
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
    'QA-focused Software Test Engineer and MCA graduate with 1+ year of experience in manual and API testing, defect management, and Production L1 Support in a banking and payments environment. Proficient in SDLC/STLC, test case design, functional, integration, and regression testing, SQL data validation, and Jira defect tracking.',
    'Skilled in log analysis with AWS CloudWatch and Grafana, incident triage, root cause analysis (RCA), and SLA-driven resolution across AEPS, payment, and third-party integrations, backed by Java and Spring Boot development experience.',
  ],
  highlights: [
    { label: 'Professional Experience', value: '1+ yr' },
    { label: 'QA Engagements', value: '5+' },
    { label: 'Current MCA CGPA', value: '8.9' },
  ],
}

export const skills = [
  {
    category: 'Testing & QA',
    items: [
      'Manual Testing',
      'Functional Testing',
      'Integration Testing',
      'Regression Testing',
      'Smoke & Sanity Testing',
      'E2E Testing',
      'Negative Testing',
      'Boundary Value Analysis',
      'Database Testing',
    ],
  },
  {
    category: 'QA Process',
    items: [
      'SDLC',
      'STLC',
      'Requirement Analysis (BRS)',
      'Test Case Design',
      'Test Data Preparation',
      'Defect Reporting & Retesting',
      'Post-Production Validation',
      'Jira',
    ],
  },
  {
    category: 'API Testing',
    items: ['Postman', 'cURL', 'REST APIs', 'JSON'],
  },
  {
    category: 'Database',
    items: ['SQL', 'MySQL', 'SQLYog', 'phpMyAdmin'],
  },
  {
    category: 'Monitoring & Observability',
    items: ['AWS CloudWatch', 'Grafana', 'Prometheus'],
  },
  {
    category: 'L1 Support & Incident Mgmt',
    items: [
      'Incident Management',
      'Production Monitoring',
      'Root Cause Analysis (RCA)',
      'Issue Triage & Escalation',
      'SLA Adherence',
      'Ticket Tracking',
      'Troubleshooting',
    ],
  },
  {
    category: 'Programming',
    items: ['Java', 'Python', 'C', 'Shell Scripting'],
  },
  {
    category: 'Tools',
    items: ['VS Code', 'STS', 'Git', 'Bitbucket', 'Microsoft Excel'],
  },
  {
    category: 'Currently Learning',
    items: ['Playwright (Java/JavaScript) for UI test automation'],
  },
]

export const projects = [
  {
    title: 'One AEPS — Partner Integration',
    type: 'QA Engagement',
    period: 'July 2026',
    description:
      'Tested a unified AEPS platform end to end, consolidating two partner integrations into one service — Cash Withdrawal, Cash Deposit, Balance Enquiry, Mini Statement, and Wallet-to-Bank transfers. Covered negative scenarios (insufficient balance, invalid Aadhaar, biometric failures, partner downtime) and reconciled transaction IDs, RRNs, and balances between frontend and database.',
    tags: ['Postman', 'SQLYog', 'AWS CloudWatch', 'Jira'],
    gradient: 'from-brand-500 to-fuchsia-500',
    featured: true,
  },
  {
    title: 'E-Commerce Platform with Integrated Wallet',
    type: 'Academic Project',
    period: 'May 2026 — July 2026',
    description:
      'Designed and developed the Payment Service microservice for a team-built e-commerce platform with an integrated digital wallet — credit/debit/pre-debit balance validation via RESTful APIs, a MySQL schema for the transaction ledger and audit logs, and inter-service contracts validated with Postman and cURL.',
    tags: ['Java', 'Spring Boot', 'MySQL', 'REST APIs', 'Postman'],
    gradient: 'from-emerald-500 to-teal-500',
    featured: true,
  },
  {
    title: 'Jio Payments Bank — Account Opening Service',
    type: 'QA Engagement',
    period: 'September 2026 — October 2026',
    description:
      'Analyzed BRS documents and designed positive, negative, and boundary test cases for agent/customer onboarding, KYC, account creation, refund processing, and subscription fees. Cross-checked database records against frontend behavior and completed post-production validation.',
    tags: ['Postman', 'SQLYog', 'AWS CloudWatch', 'Jira'],
    gradient: 'from-orange-400 to-rose-500',
    featured: true,
  },
  {
    title: 'Portal Management — Functional & Database Testing',
    type: 'QA Engagement',
    period: 'June 2026 — Present',
    description:
      'Functional testing across scheme management, service purchases, VLE profile management, and account operations. Validated wallet transactions, income refunds, and commission management; tested OTP verification and role-based access control across Admin, Distributor, and VLE accounts.',
    tags: ['SQLYog', 'AWS CloudWatch', 'Jira', 'Excel'],
    gradient: 'from-sky-400 to-brand-600',
    featured: false,
  },
  {
    title: 'IRCTC Tourism & Airline Booking',
    type: 'QA Engagement',
    period: 'October 2026 — November 2026',
    description:
      'End-to-end testing of tour packages, flight search, booking, and payment workflows, including cancellations, refunds, and negative scenarios like failed payments and duplicate bookings. Tracked defects in Jira through retest and closure.',
    tags: ['SQLYog', 'AWS CloudWatch', 'Jira', 'Excel'],
    gradient: 'from-violet-500 to-indigo-600',
    featured: false,
  },
  {
    title: 'Multi-Partner Services — Functional & Integration Testing',
    type: 'QA Engagement',
    period: 'June 2026 — November 2026',
    description:
      'Functional and integration testing across Medical Insurance, E-Learning, OTT subscription, and demat account services — premium calculations, lead generation workflows, OTT payment flows, and SSO redirection to third-party services.',
    tags: ['SQLYog', 'AWS CloudWatch', 'Jira', 'Excel'],
    gradient: 'from-amber-400 to-orange-600',
    featured: false,
  },
  {
    title: 'College Website with Biometric Attendance',
    type: 'Academic Project',
    period: 'March 2024 — July 2024',
    description:
      'A college portal with role-based logins for teachers, students, admin, and librarians, an SMTP-based notification system, and an Arduino-driven fingerprint attendance system.',
    tags: ['HTML', 'CSS', 'PHP', 'Arduino'],
    gradient: 'from-rose-400 to-pink-600',
    featured: false,
  },
]

export const experience = [
  {
    role: 'I.T. Executive',
    company: 'Sahaj Retail Limited',
    period: 'September 2025 — Present',
    description:
      'Develop and maintain backend microservices in Java and Spring Boot on a distributed production architecture. Provide Production L1 support via AWS CloudWatch log analysis and anomaly flagging, perform root cause analysis of live microservice failures to reduce MTTR, and triage/escalate incidents to meet SLA. Build real-time Grafana dashboards on Prometheus, with SQL (MySQL/SQLYog) queries powering KPI panels and alert thresholds.',
  },
]

export const education = [
  {
    degree: 'Master of Computer Applications (MCA) — CGPA: 8.9 / 10.0',
    school: 'Seacom Engineering College, MAKAUT — Howrah, West Bengal',
    period: '2024 — 2026',
  },
  {
    degree: 'B.Sc. in Computer Science (Honours) — CGPA: 8.2 / 10.0',
    school: 'Seth Anandram Jaipuria College, Calcutta University — Kolkata, West Bengal',
    period: '2021 — 2024',
  },
]

export const certifications = [
  'What is I.O.T., A.I. in Practice — IBM SkillsBuild',
  'Python Essentials — Cisco',
  'Data Analytics Job Simulation — Deloitte',
  'SQL (Basic) and Python (Basic) — HackerRank',
  'Career Edge – Young Professional — TCS',
  '2nd Position, NEO-NEXUS Codathon — Seacom Engineering College, May 2025',
]
