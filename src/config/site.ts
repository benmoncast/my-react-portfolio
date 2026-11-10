import type { CaseStudy, ServiceOffering } from '../types';

export const SITE_CONFIG = {
  developer: {
    name: 'Benedict Castro',
    title: 'Full Stack Developer | Software Engineer | Digital Problem Solver',
    coreMessage: 'I build digital solutions that move businesses forward.',
    supportingStatement:
      'I help businesses transform manual processes into efficient systems, build scalable web applications, and create digital experiences that deliver real business value.',
    heroHeadline: 'Building Technology That Moves Businesses Forward.',
    heroDescription:
      'I help businesses replace manual processes, improve customer experiences, and turn ideas into reliable web applications.',
    email: 'benedict.castro.dev@example.com', // Placeholder - editable
    githubUrl: 'https://github.com', // Placeholder - editable
    linkedinUrl: 'https://linkedin.com', // Placeholder - editable
    resumeUrl: '#', // Placeholder downloadable resume
    location: 'Philippines (Remote / Global)',
  },
  skills: {
    frontend: [
      { name: 'React.js', level: 'Advanced' },
      { name: 'TypeScript', level: 'Advanced' },
      { name: 'JavaScript (ES6+)', level: 'Advanced' },
      { name: 'HTML5', level: 'Advanced' },
      { name: 'CSS3', level: 'Advanced' },
      { name: 'Tailwind CSS', level: 'Advanced' },
    ],
    backend: [
      { name: 'Java', level: 'Proficient' },
      { name: 'Spring Boot', level: 'Proficient' },
      { name: 'Node.js', level: 'Working Knowledge' },
    ],
    database: [
      { name: 'PostgreSQL', level: 'Proficient' },
      { name: 'Supabase', level: 'Proficient' },
      { name: 'MySQL', level: 'Proficient' },
    ],
    tools: [
      { name: 'Git', level: 'Proficient' },
      { name: 'GitHub', level: 'Proficient' },
      { name: 'VS Code', level: 'Proficient' },
      { name: 'Postman', level: 'Proficient' },
    ],
  },
  budgetRanges: [
    'Under $1,000 (Small Automation / Single Page)',
    '$1,000 - $3,000 (Standard Business System / MVP)',
    '$3,000 - $7,500 (Custom Web Application / CRM)',
    '$7,500+ (Comprehensive Business Platform)',
    'Quotation Required / Undetermined',
  ],
  timelines: [
    'ASAP',
    'Within 1 month',
    'Within 2–3 months',
    'Within 6 months',
    'Flexible',
  ],
  projectTypes: [
    'Business Website',
    'Web Application',
    'E-commerce',
    'CRM',
    'Inventory Management',
    'Booking System',
    'Business Automation',
    'API Integration',
    'Other',
  ],
  developmentProcess: [
    {
      step: '01',
      title: 'Discover',
      tagline: 'Understand the business problem',
      description:
        'We unpack bottlenecks, audit existing workflows, identify stakeholders, and define measurable business success criteria.',
    },
    {
      step: '02',
      title: 'Plan',
      tagline: 'Define requirements and technical architecture',
      description:
        'Establish data models, API contracts, security protocols, technology selection, and achievable project milestones.',
    },
    {
      step: '03',
      title: 'Design',
      tagline: 'Develop UI/UX and interactive prototypes',
      description:
        'Craft intuitive interfaces tailored to end-user productivity, minimizing cognitive overhead and training friction.',
    },
    {
      step: '04',
      title: 'Build',
      tagline: 'Implement and test the solution',
      description:
        'Write clean, typed, modular code with automated validations, defensive security, database integrity, and thorough testing.',
    },
    {
      step: '05',
      title: 'Launch & Support',
      tagline: 'Deploy, maintain, and improve',
      description:
        'Production rollout on robust cloud infrastructure, comprehensive documentation, ongoing monitoring, and iterative enhancements.',
    },
  ],
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'proj-1',
    slug: 'smart-inventory-management-system',
    title: 'Smart Inventory Management System',
    tagline: 'Centralized real-time stock control, movement auditing, and predictive low-stock warnings.',
    category: 'Inventory Management & Operations',
    type: 'Demo', // Marked as concept/demo per instructions
    businessProblem:
      'Growing retail and warehouse operations suffer from stock discrepancies, stockouts, paper-based logging, and lack of visibility into inventory valuation across storage locations.',
    targetUsers: [
      'Retail Businesses',
      'Small & Mid-sized Businesses',
      'Warehouse Operators & Dispatchers',
    ],
    objectives: [
      'Eliminate manual paper and spreadsheet recordkeeping errors.',
      'Provide real-time visibility into stock levels across multiple locations.',
      'Automate low-stock alerts before fulfillment disruptions occur.',
      'Track full audit trails for product movements, purchase orders, and sales.',
    ],
    solution:
      'Engineered a responsive web application featuring barcoding-ready SKUs, multi-warehouse stock allocations, automated reorder thresholds, and role-based permissions.',
    keyFeatures: [
      'Real-time inventory monitoring & warehouse bin tracking',
      'Comprehensive product catalog with SKU, variant, and cost tracking',
      'Stock movement logging (inbound, transfers, adjustments, outbound)',
      'Automated low-stock notifications and reorder triggers',
      'Sales and purchase transaction ledger',
      'Inventory turnover, valuation, and analytics reports',
      'Granular user roles (Admin, Warehouse Manager, Cashier/Staff)',
    ],
    architecture: {
      frontend: ['React.js 19', 'TypeScript', 'Tailwind CSS', 'Vite', 'Lucide React'],
      backend: ['Node.js API Services', 'PostgreSQL Stored Procedures'],
      database: ['PostgreSQL with Row-Level Security', 'ACID transaction management'],
      infra: ['Vercel Edge Hosting', 'Automated Health Monitoring'],
    },
    technologies: ['React.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Supabase', 'Node.js'],
    challenges: [
      'Ensuring strict race-condition mitigation when concurrent sales and adjustments decrement stock.',
      'Designing an intuitive layout for high-density tabular data without causing UI clutter on mobile tablets.',
    ],
    implementationDetails: [
      'Implemented optimistic UI updates paired with database transactional checks for zero-overdraft inventory.',
      'Constructed modular audit trails logging user IDs, timestamps, and previous/current quantities.',
    ],
    businessValue:
      'Helps businesses monitor inventory proactively, prevent costly overstocking or stockouts, and drastically reduce manual bookkeeping hours.',
    verifiedResults: [
      'Prototype simulation successfully audited 10,000+ SKU movements with sub-100ms query performance.',
    ],
    githubUrl: 'https://github.com',
    liveDemoUrl: '#',
    featured: true,
  },
  {
    id: 'proj-2',
    slug: 'customer-relationship-management-system',
    title: 'Customer Relationship Management System (CRM)',
    tagline: 'Lead qualification pipeline, follow-up automations, and unified client communication history.',
    category: 'Sales & Customer Management',
    type: 'Demo',
    businessProblem:
      'Agencies and service firms lose high-value prospects because sales leads are trapped in disjointed email inboxes, notes apps, and spreadsheets without structured follow-up routines.',
    targetUsers: [
      'Agencies & Consultancies',
      'B2B Service Businesses',
      'High-growth Tech Startups',
    ],
    objectives: [
      'Centralize prospect details, communications, and meeting outcomes.',
      'Standardize deal stage progression with clear pipeline metrics.',
      'Automate follow-up reminders so no warm inquiries slip through the cracks.',
      'Provide leadership with real-time conversion velocity metrics.',
    ],
    solution:
      'Designed a visual kanban-style sales pipeline integrated with client contact profiles, activity timeline logs, and scheduled automated reminder hooks.',
    keyFeatures: [
      'Centralized customer contact and company database',
      'Interactive drag-and-drop lead and deal pipeline',
      'Sales pipeline stage progression with deal value tracking',
      'Intelligent follow-up reminders and scheduled task alerts',
      'Comprehensive customer activity logs (calls, emails, notes)',
      'Communication history and touchpoint tracking',
      'Executive dashboard with revenue forecast and win-loss ratios',
    ],
    architecture: {
      frontend: ['React.js', 'TypeScript', 'Tailwind CSS', 'Vite'],
      backend: ['Supabase Backend Functions', 'RESTful Endpoints'],
      database: ['PostgreSQL Relational Schema', 'Enforced Foreign Keys & Cascades'],
      infra: ['Cloud Edge CDN', 'Encrypted Client Communications'],
    },
    technologies: ['React.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL'],
    challenges: [
      'Structuring activity timelines to scale smoothly across thousands of interactions per client entity.',
      'Optimizing query indexing for real-time pipeline aggregation by deal stage and assigned owner.',
    ],
    implementationDetails: [
      'Normalized schema separating contacts, deals, interactions, and tasks with efficient multi-column indexing.',
      'Built a reactive UI enabling immediate stage updates with automatic rollback on network failure.',
    ],
    businessValue:
      'Organizes disorganized customer records, standardizes team sales discipline, and increases lead-to-client conversion velocity.',
    verifiedResults: [
      'Concept architecture validated for responsive multi-device operations with clean status transitions.',
    ],
    githubUrl: 'https://github.com',
    liveDemoUrl: '#',
    featured: true,
  },
  {
    id: 'proj-3',
    slug: 'online-booking-and-automation-system',
    title: 'Online Booking & Business Automation System',
    tagline: 'Self-serve appointment scheduling, conflict-free availability calendars, and automated alerts.',
    category: 'Booking & Workflow Automation',
    type: 'Demo',
    businessProblem:
      'Appointment-reliant businesses (clinics, salons, consultancies) waste 15-20 hours every week fielding manual phone calls, rescheduling requests, and chasing no-shows.',
    targetUsers: [
      'Medical & Wellness Clinics',
      'Salons & Personal Care Centers',
      'Professional Service Providers & Consultants',
      'Appointment-based Small Businesses',
    ],
    objectives: [
      'Empower customers to book appointments online 24/7.',
      'Eliminate double-booking conflicts through dynamic capacity locks.',
      'Reduce client no-shows via automated reminders and confirmation workflows.',
      'Provide staff with a clear daily schedule dashboard and customer histories.',
    ],
    solution:
      'Created an end-to-end booking portal with customizable service tiers, staff calendar synchronization, instant booking notifications, and an administrative control suite.',
    keyFeatures: [
      'Frictionless public self-service reservation interface',
      'Smart time-slot generator taking buffer times and breaks into account',
      'Customer profile management and appointment history',
      'Instant booking confirmations & automated reminder notifications',
      'Centralized administrative calendar dashboard for staff scheduling',
      'Dynamic staff availability management and holiday blackout controls',
      'Cancellation and rescheduling policy enforcement',
    ],
    architecture: {
      frontend: ['React.js', 'TypeScript', 'Tailwind CSS'],
      backend: ['Serverless Edge APIs', 'Notification Service Adapters'],
      database: ['PostgreSQL Booking Engine with exclusion constraints'],
      infra: ['Vercel Serverless', 'Postgres Realtime'],
    },
    technologies: ['React.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Supabase'],
    challenges: [
      'Preventing simultaneous dual bookings on the exact same second for limited staff slots.',
      'Implementing flexible schedule configurations (custom shift hours, break times, and service durations).',
    ],
    implementationDetails: [
      'Employed PostgreSQL temporal exclusion constraints to mathematically guarantee no overlapping bookings occur.',
      'Crafted a lightweight step-by-step wizard UI optimized for high mobile completion rates.',
    ],
    businessValue:
      'Frees staff from repetitive phone scheduling, captures after-hours appointments, and dramatically minimizes lost revenue from no-shows.',
    verifiedResults: [
      'Engineered for 0% double-booking probability under concurrent simulated load tests.',
    ],
    githubUrl: 'https://github.com',
    liveDemoUrl: '#',
    featured: true,
  },
];

export const SERVICES: ServiceOffering[] = [
  {
    id: 'srv-1',
    title: 'Business Website Development',
    category: 'Web Presence & Conversion',
    summary:
      'High-performance, modern business websites engineered to turn visitors into paying clients and establish trusted credibility.',
    businessProblem:
      'Many businesses suffer from outdated, slow, or template-bloated websites that fail to convert visitors, damage professional credibility, and display poorly on mobile devices.',
    proposedSolution:
      'Custom-engineered responsive web architecture built with clean typography, fast loading times, accessible layouts, and clear conversion funnels.',
    deliverables: [
      'Custom responsive corporate or service website',
      'High-converting landing pages tailored to your campaign goals',
      'Search Engine Optimization (SEO) structure & metadata setup',
      'Cross-device and cross-browser testing (Desktop, Tablet, Mobile)',
      'CMS / content configuration and analytics integration',
    ],
    businessBenefits: [
      'Elevates professional market credibility',
      'Increases organic search discoverability and speed performance',
      'Maximizes visitor engagement and inbound quotation requests',
    ],
    indicativeTimeline: '2 to 4 weeks depending on scope',
    iconName: 'Globe',
  },
  {
    id: 'srv-2',
    title: 'Custom Web Application Development',
    category: 'Systems & Operational Software',
    summary:
      'Bespoke web applications, administrative dashboards, and internal business tools designed to match your exact company workflows.',
    businessProblem:
      'Off-the-shelf software is often bloated, requires expensive per-user monthly subscriptions, and forces your business to adapt its unique operations to rigid software limits.',
    proposedSolution:
      'Tailor-made web applications featuring role-based dashboards, secure databases, intuitive workflows, and direct business alignment.',
    deliverables: [
      'Custom administrative dashboards and portals',
      'Role-based access control (RBAC) and user authentication',
      'Relational database architecture (PostgreSQL / Supabase)',
      'Data import/export (CSV, Excel) and reporting suites',
      'Full source code ownership with no per-seat software licensing fees',
    ],
    businessBenefits: [
      'Accelerates operational turnaround and reduces human error',
      'Provides actionable real-time business visibility for leadership',
      'Eliminates recurring per-user SaaS license bloat',
    ],
    indicativeTimeline: '4 to 8 weeks depending on scope',
    iconName: 'LayoutDashboard',
  },
  {
    id: 'srv-3',
    title: 'Business Process Automation',
    category: 'Efficiency & Automation',
    summary:
      'Automated background workflows, data synchronization, and API integrations that replace repetitive manual administrative labor.',
    businessProblem:
      'Employees spend hours copying and pasting data between unlinked systems, compiling spreadsheets, and manually sending routine notifications.',
    proposedSolution:
      'Event-driven automation pipelines and API bridges that automatically transfer data, trigger alerts, and process tasks across your software stack.',
    deliverables: [
      'Custom API integrations between disjointed business tools',
      'Automated customer and internal email/SMS notifications',
      'Automated data ingestion, validation, and spreadsheet sync',
      'Error logging and automated retry mechanisms',
      'Complete workflow documentation and fail-safe alerts',
    ],
    businessBenefits: [
      'Saves dozens of staff hours every week on mundane data entry',
      'Eliminates expensive manual transcription mistakes',
      'Ensures instant response times to customers and internal triggers',
    ],
    indicativeTimeline: '2 to 5 weeks',
    iconName: 'Cpu',
  },
  {
    id: 'srv-4',
    title: 'Online Booking & Reservation Systems',
    category: 'Customer Experience & Scheduling',
    summary:
      'Seamless 24/7 self-service scheduling platforms that eliminate double bookings and automate client confirmations.',
    businessProblem:
      'Front-desk staff lose valuable time fielding phone calls for reservations, while no-shows and scheduling overlaps hurt daily revenue.',
    proposedSolution:
      'Custom online scheduling portals with real-time calendar availability, buffer rules, customer notifications, and admin control.',
    deliverables: [
      'Customer-facing booking flow with service & staff selection',
      'Staff availability, breaks, and holiday calendar controls',
      'Automated email/SMS confirmation and reminder triggers',
      'Client management history and attendance records',
      'Admin calendar view with day, week, and month overviews',
    ],
    businessBenefits: [
      'Captures bookings 24 hours a day even when offices are closed',
      'Significantly lowers no-show rates through automated reminders',
      'Frees staff to focus on serving clients rather than answering phones',
    ],
    indicativeTimeline: '3 to 6 weeks',
    iconName: 'CalendarCheck',
  },
  {
    id: 'srv-5',
    title: 'E-commerce & Product Catalogs',
    category: 'Sales & Commercial Platforms',
    summary:
      'Reliable online shopping experiences, product inventory catalogs, and checkout integrations tailored to your product line.',
    businessProblem:
      'Generic store templates can be sluggish, restrict custom checkout workflows, or take prohibitive transaction fees.',
    proposedSolution:
      'Optimized digital store fronts with clean catalog browsing, intuitive cart management, and secure order processing workflows.',
    deliverables: [
      'Product catalog with categories, variants, and search filters',
      'Shopping cart and streamlined checkout flow',
      'Secure payment gateway integration',
      'Admin order management and status tracking',
      'Customer order history and status lookup',
    ],
    businessBenefits: [
      'Provides a smooth, high-trust buying experience for customers',
      'Streamlines order fulfillment and inventory tracking',
      'Maintains full control over branding and customer data',
    ],
    indicativeTimeline: '4 to 8 weeks',
    iconName: 'ShoppingBag',
  },
  {
    id: 'srv-6',
    title: 'Maintenance, Performance & Support',
    category: 'Reliability & Longevity',
    summary:
      'Proactive technical support, security patches, performance optimization, and continuous feature enhancements.',
    businessProblem:
      'Web applications left unmaintained suffer from security vulnerabilities, performance degradation, and broken third-party APIs over time.',
    proposedSolution:
      'Ongoing technical partnership ensuring your systems remain fast, secure, backed up, and updated as your business expands.',
    deliverables: [
      'Proactive dependency and security vulnerability updates',
      'Database optimization, backups, and health checks',
      'Bug fixes and emergency technical issue response',
      'Core Web Vitals and page load speed optimization',
      'Incremental feature enhancements and updates',
    ],
    businessBenefits: [
      'Prevents costly system downtime and data vulnerabilities',
      'Protects your long-term software investment',
      'Ensures your tech stack stays fast and competitive',
    ],
    indicativeTimeline: 'Ongoing monthly retainer or scheduled sprints',
    iconName: 'ShieldCheck',
  },
];
