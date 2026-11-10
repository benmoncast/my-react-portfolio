export interface AssistantPrompt {
  id: string;
  label: string;
  trigger: string;
}

export const SUGGESTED_PROMPTS: AssistantPrompt[] = [
  {
    id: 'p-services',
    label: 'What services do you offer?',
    trigger: 'What services do you offer?',
  },
  {
    id: 'p-custom-mgmt',
    label: 'Can you build a custom business management system?',
    trigger: 'Can you build a custom business management system?',
  },
  {
    id: 'p-pricing',
    label: 'How much does a website or app cost?',
    trigger: 'How much does a website cost?',
  },
  {
    id: 'p-automate',
    label: 'Can you automate my repetitive business operations?',
    trigger: 'Can you automate my business?',
  },
  {
    id: 'p-process',
    label: 'How does your 5-stage development process work?',
    trigger: 'How does your development process work?',
  },
  {
    id: 'p-quote',
    label: 'How can I request a quotation?',
    trigger: 'How can I request a quotation?',
  },
];

export interface AssistantResponse {
  text: string;
  suggestedActions?: Array<{ label: string; action: string; payload?: string }>;
}

export const knowledgeBase = {
  respond(userInput: string): AssistantResponse {
    const input = userInput.toLowerCase();

    // Match service-related queries
    if (input.includes('service') || input.includes('what do you offer') || input.includes('what can you do')) {
      return {
        text: `Benedict specializes in solving business bottlenecks with custom software development:\n\n• **Business Websites & Web Presence**: High-converting, SEO-optimized responsive sites.\n• **Custom Web Applications & Portals**: Internal tools, management systems, and dashboards.\n• **Business Process Automation**: Eliminating manual data entry and integrating third-party tools.\n• **Online Booking & Reservation Systems**: 24/7 calendar scheduling with automated reminders.\n• **E-commerce & Catalogs**: Custom storefronts and inventory ledger systems.\n• **Technical Maintenance & Retainers**: Performance optimization and security updates.`,
        suggestedActions: [
          { label: 'View Services Page', action: 'navigate', payload: '/services' },
          { label: 'Request a Project Quotation', action: 'navigate', payload: '/contact' },
        ],
      };
    }

    // Match custom management systems / CRM / Inventory
    if (
      input.includes('management system') ||
      input.includes('crm') ||
      input.includes('inventory') ||
      input.includes('dashboard') ||
      input.includes('internal tool')
    ) {
      return {
        text: `Yes, custom management systems are one of Benedict's core specializations! Rather than paying expensive monthly per-seat licenses for rigid off-the-shelf software, Benedict designs bespoke platforms tailored to your business rules.\n\nKey capabilities include:\n• Centralized databases with strict role-based permissions.\n• Real-time operational tracking, inventory movements, or sales pipelines.\n• Exportable audit trails (CSV/Excel) and executive dashboards.\n• Seamless integration with your existing tools.\n\nTake a look at the Smart Inventory System and CRM case studies in the portfolio!`,
        suggestedActions: [
          { label: 'Explore Featured Case Studies', action: 'navigate', payload: '/projects' },
          { label: 'Scope a Custom System', action: 'navigate', payload: '/contact' },
        ],
      };
    }

    // Match pricing / cost queries
    if (
      input.includes('cost') ||
      input.includes('price') ||
      input.includes('pricing') ||
      input.includes('how much') ||
      input.includes('budget') ||
      input.includes('rate')
    ) {
      return {
        text: `Every business problem requires an appropriate technical scope, so Benedict uses **transparent quotation-based pricing** rather than arbitrary fixed packages.\n\nIndicative budget ranges:\n• **Under $1,000**: Targeted automations or single-purpose landing pages.\n• **$1,000 – $3,000**: Standard business web systems, scheduling portals, or MVPs.\n• **$3,000 – $7,500**: Custom multi-role web applications, comprehensive CRMs, and inventory suites.\n• **$7,500+**: Enterprise-grade platforms and end-to-end operational software.\n\nYou can submit an inquiry with your desired outcome to receive a tailored project estimate with deliverables.`,
        suggestedActions: [
          { label: 'Open Project Inquiry Form', action: 'navigate', payload: '/contact' },
          { label: 'Review Development Services', action: 'navigate', payload: '/services' },
        ],
      };
    }

    // Match automation queries
    if (
      input.includes('automate') ||
      input.includes('automation') ||
      input.includes('repetitive') ||
      input.includes('manual process') ||
      input.includes('spreadsheet')
    ) {
      return {
        text: `Automating repetitive operations is one of the highest-ROI investments a business can make. Benedict helps eliminate:\n\n1. **Manual data entry**: Automatically syncing records between web forms, CRMs, and billing.\n2. **Missed follow-ups**: Scheduling automated email or notification triggers based on customer status changes.\n3. **Human transcription errors**: Connecting disparate systems via robust background APIs.\n\nTell us which manual task drains the most time each week!`,
        suggestedActions: [
          { label: 'Describe My Automation Need', action: 'navigate', payload: '/contact' },
          { label: 'See Booking Automation Demo', action: 'navigate', payload: '/projects/online-booking-and-automation-system' },
        ],
      };
    }

    // Match development process
    if (
      input.includes('process') ||
      input.includes('methodology') ||
      input.includes('how do you work') ||
      input.includes('stages') ||
      input.includes('timeline')
    ) {
      return {
        text: `Benedict follows a disciplined 5-stage software engineering process:\n\n1. **Discover**: Analyze your business bottlenecks and define tangible success metrics.\n2. **Plan**: Architect the database schema, security rules, and technical milestones.\n3. **Design**: Build clean, user-centric interfaces and responsive prototypes.\n4. **Build**: Write modular, typed code with database integrity, test suites, and strict validations.\n5. **Launch & Support**: Production cloud deployment, staff walkthroughs, and ongoing technical support.`,
        suggestedActions: [
          { label: 'Read Full Process Details', action: 'navigate', payload: '/services' },
          { label: 'Schedule a Project Call', action: 'navigate', payload: '/contact' },
        ],
      };
    }

    // Match quotation / contact / hire
    if (
      input.includes('quote') ||
      input.includes('quotation') ||
      input.includes('contact') ||
      input.includes('hire') ||
      input.includes('touch') ||
      input.includes('call')
    ) {
      return {
        text: `You can request a tailored quotation right here on the website! The **Project Inquiry Form** takes less than 2 minutes and helps outline:\n\n• Your industry & target users\n• The specific operational problem you need solved\n• Your estimated budget range & timeline\n\nOnce submitted, Benedict reviews your requirements and responds promptly with technical feasibility and next steps.`,
        suggestedActions: [
          { label: 'Fill Inquiry Form Now', action: 'navigate', payload: '/contact' },
        ],
      };
    }

    // Match technologies / stack
    if (
      input.includes('stack') ||
      input.includes('technology') ||
      input.includes('tech') ||
      input.includes('react') ||
      input.includes('java') ||
      input.includes('database') ||
      input.includes('typescript')
    ) {
      return {
        text: `Benedict works with proven, enterprise-tested technologies:\n\n• **Frontend**: React.js, TypeScript, Tailwind CSS, modern responsive UI engineering.\n• **Backend**: Java, Spring Boot, Node.js.\n• **Databases**: PostgreSQL, Supabase, MySQL with strict relational modeling and Row-Level Security.\n• **Tools & Infrastructure**: Git, GitHub, RESTful APIs, Cloud deployments (Vercel/Supabase).`,
        suggestedActions: [
          { label: 'View Developer Profile & Skills', action: 'navigate', payload: '/about' },
          { label: 'Explore Technical Projects', action: 'navigate', payload: '/projects' },
        ],
      };
    }

    // Default guided response
    return {
      text: `Hello! I am Benedict's virtual assistant. I am here to help you understand available development services, technical capabilities, and how custom software can resolve your business bottlenecks.\n\nAre you looking to build a customer-facing website, an internal business management system, or automate a manual workflow?`,
      suggestedActions: [
        { label: 'I need a Custom Web Application', action: 'quick_reply', payload: 'Can you build a custom business management system?' },
        { label: 'I want to Automate Operations', action: 'quick_reply', payload: 'Can you automate my business?' },
        { label: 'Request a Project Quotation', action: 'navigate', payload: '/contact' },
      ],
    };
  },
};

