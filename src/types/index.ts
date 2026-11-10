export type ProjectType =
  | 'Business Website'
  | 'Web Application'
  | 'E-commerce'
  | 'CRM'
  | 'Inventory Management'
  | 'Booking System'
  | 'Business Automation'
  | 'API Integration'
  | 'Other';

export type InquiryStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'QUALIFIED'
  | 'PROPOSAL_SENT'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CLOSED';

export type TimelineOption =
  | 'ASAP'
  | 'Within 1 month'
  | 'Within 2–3 months'
  | 'Within 6 months'
  | 'Flexible';

export interface ProjectInquiry {
  id?: string;
  created_at?: string;
  updated_at?: string;
  name: string;
  email: string;
  company?: string;
  contact_number?: string;
  project_type: ProjectType | string;
  industry: string;
  budget_range: string;
  timeline: TimelineOption | string;
  existing_website?: string;
  problem: string;
  desired_outcome: string;
  details: string;
  consent: boolean;
  status?: InquiryStatus;
  internal_notes?: string;
}

export type CaseStudyType = 'Concept' | 'Demo' | 'Personal Project' | 'Client Project';

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  category: string;
  type: CaseStudyType;
  businessProblem: string;
  targetUsers: string[];
  objectives: string[];
  solution: string;
  keyFeatures: string[];
  architecture: {
    frontend: string[];
    backend: string[];
    database: string[];
    infra: string[];
  };
  technologies: string[];
  challenges: string[];
  implementationDetails: string[];
  businessValue: string;
  verifiedResults?: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  featured: boolean;
}

export interface ServiceOffering {
  id: string;
  title: string;
  category: string;
  summary: string;
  businessProblem: string;
  proposedSolution: string;
  deliverables: string[];
  businessBenefits: string[];
  indicativeTimeline: string;
  iconName: string;
}

export interface AssistantMessage {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  timestamp: string;
  options?: Array<{ label: string; action: string; payload?: string }>;
}

