import { z } from 'zod';
import { supabase, isSupabaseConfigured } from '../supabase/client';
import type { InquiryStatus, ProjectInquiry } from '../../types';

// Validation Schema for Project Inquiries
export const inquirySchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(120, 'Name is too long'),
  email: z.string().trim().email('Please enter a valid email address'),
  company: z.string().trim().optional(),
  contact_number: z.string().trim().optional(),
  project_type: z.string().min(1, 'Please select a project type'),
  industry: z.string().trim().min(2, 'Please specify your industry or business domain'),
  budget_range: z.string().min(1, 'Please select an estimated budget range'),
  timeline: z.string().min(1, 'Please select a preferred timeline'),
  existing_website: z.string().trim().optional(),
  problem: z.string().trim().min(10, 'Please describe the core business problem you are facing'),
  desired_outcome: z.string().trim().min(10, 'Please state what business outcome or improvement you want to achieve'),
  details: z.string().trim().min(20, 'Please provide adequate project details to help scope the requirements'),
  consent: z.literal(true, {
    message: 'You must acknowledge client consent to submit this project inquiry.',
  }),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;

const LOCAL_STORAGE_KEY = 'benedict_portfolio_inquiries_v1';

// Seed demo inquiries if local store is empty for testing
function getStoredInquiries(): ProjectInquiry[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      const initialSeed: ProjectInquiry[] = [
        {
          id: 'demo-inquiry-1',
          created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
          updated_at: new Date(Date.now() - 86400000 * 2).toISOString(),
          name: 'Sarah Jenkins',
          email: 'sarah.j@apexretail.io',
          company: 'Apex Retail Distribution',
          contact_number: '+1 (555) 349-2041',
          project_type: 'Inventory Management',
          industry: 'Wholesale & Retail Goods',
          budget_range: '$3,000 - $7,500 (Custom Web Application / CRM)',
          timeline: 'Within 1 month',
          existing_website: 'https://apexretail.example.com',
          problem:
            'We run 3 warehouse depots and currently track stock using shared spreadsheets. Staff regularly overwrite each other, resulting in stockouts and delayed customer dispatches.',
          desired_outcome:
            'Centralize stock movement with real-time audit trails and automated alerts when quantities drop below safety levels.',
          details:
            'Need a responsive web app with barcode-ready scanning inputs, multi-depot visibility, and role-based permissions for depot managers vs executive viewers.',
          consent: true,
          status: 'NEW',
          internal_notes: 'Initial inquiry looks high intent. Need to schedule discovery call.',
        },
        {
          id: 'demo-inquiry-2',
          created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
          updated_at: new Date(Date.now() - 86400000 * 4).toISOString(),
          name: 'Marcus Vance',
          email: 'marcus@vancegrowth.com',
          company: 'Vance Growth Partners',
          contact_number: '+1 (555) 892-1134',
          project_type: 'CRM',
          industry: 'B2B Marketing & Consultancy',
          budget_range: '$3,000 - $7,500 (Custom Web Application / CRM)',
          timeline: 'Within 2–3 months',
          existing_website: 'https://vancegrowth.example.com',
          problem:
            'Sales team loses warm opportunities because notes are scattered across personal inboxes and Slack threads.',
          desired_outcome:
            'A unified sales pipeline with activity timelines, automated reminders, and deal valuation forecasts.',
          details:
            'Prefer a clean, minimalist UI with Supabase backend and exportable client profiles. Up to 10 team seats required.',
          consent: true,
          status: 'QUALIFIED',
          internal_notes: 'Discovery call held on Nov 6. Budget confirmed. Drafting technical proposal.',
        },
      ];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialSeed));
      return initialSeed;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveStoredInquiries(data: ProjectInquiry[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
}

export const inquiryService = {
  /**
   * Submit a new project inquiry from the client-facing inquiry form
   */
  async submitInquiry(formData: InquiryFormData): Promise<{ success: boolean; id?: string; error?: string }> {
    const validated = inquirySchema.parse(formData);

    const payload: Omit<ProjectInquiry, 'id'> = {
      ...validated,
      company: validated.company || '',
      contact_number: validated.contact_number || '',
      existing_website: validated.existing_website || '',
      status: 'NEW',
      internal_notes: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('inquiries')
          .insert([payload])
          .select('id')
          .single();

        if (error) {
          console.warn('Supabase insert failed, storing locally as fallback:', error.message);
          return this.fallbackLocalSubmit(payload);
        }
        return { success: true, id: data.id };
      } catch (err: unknown) {
        console.warn('Network error reaching Supabase, utilizing persistent local buffer:', err);
        return this.fallbackLocalSubmit(payload);
      }
    }

    return this.fallbackLocalSubmit(payload);
  },

  fallbackLocalSubmit(payload: Omit<ProjectInquiry, 'id'>): { success: boolean; id: string } {
    const id = `inq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newRecord: ProjectInquiry = {
      ...payload,
      id,
    };
    const list = getStoredInquiries();
    list.unshift(newRecord);
    saveStoredInquiries(list);
    return { success: true, id };
  },

  /**
   * Fetch inquiries for the authenticated Admin Dashboard
   */
  async getInquiries(params?: {
    search?: string;
    status?: string;
    projectType?: string;
  }): Promise<ProjectInquiry[]> {
    if (isSupabaseConfigured) {
      try {
        let query = supabase
          .from('inquiries')
          .select('*')
          .order('created_at', { ascending: false });

        if (params?.status && params.status !== 'ALL') {
          query = query.eq('status', params.status);
        }
        if (params?.projectType && params.projectType !== 'ALL') {
          query = query.eq('project_type', params.projectType);
        }
        if (params?.search) {
          const s = `%${params.search.trim()}%`;
          query = query.or(`name.ilike.${s},email.ilike.${s},company.ilike.${s}`);
        }

        const { data, error } = await query;
        if (!error && data) {
          return data as ProjectInquiry[];
        }
        console.warn('Supabase query error, falling back to local records:', error?.message);
      } catch (e) {
        console.warn('Error fetching inquiries from Supabase:', e);
      }
    }

    // Local fallback
    let items = getStoredInquiries();
    if (params?.status && params.status !== 'ALL') {
      items = items.filter((i) => i.status === params.status);
    }
    if (params?.projectType && params.projectType !== 'ALL') {
      items = items.filter((i) => i.project_type === params.projectType);
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      items = items.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.email.toLowerCase().includes(q) ||
          (i.company && i.company.toLowerCase().includes(q))
      );
    }
    return items;
  },

  /**
   * Fetch a single inquiry by ID
   */
  async getInquiryById(id: string): Promise<ProjectInquiry | null> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('inquiries')
          .select('*')
          .eq('id', id)
          .single();
        if (!error && data) return data as ProjectInquiry;
      } catch (e) {
        console.warn('Error fetching single inquiry from Supabase:', e);
      }
    }

    const items = getStoredInquiries();
    return items.find((i) => i.id === id) || null;
  },

  /**
   * Update the status of an inquiry
   */
  async updateStatus(id: string, status: InquiryStatus): Promise<boolean> {
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase
          .from('inquiries')
          .update({ status, updated_at: new Date().toISOString() })
          .eq('id', id);

        if (!error) return true;
        console.warn('Supabase update status failed, updating locally:', error.message);
      } catch (e) {
        console.warn('Error updating status in Supabase:', e);
      }
    }

    const items = getStoredInquiries();
    const idx = items.findIndex((i) => i.id === id);
    if (idx !== -1) {
      items[idx].status = status;
      items[idx].updated_at = new Date().toISOString();
      saveStoredInquiries(items);
      return true;
    }
    return false;
  },

  /**
   * Update internal administrator notes on an inquiry
   */
  async updateInternalNotes(id: string, notes: string): Promise<boolean> {
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase
          .from('inquiries')
          .update({ internal_notes: notes, updated_at: new Date().toISOString() })
          .eq('id', id);

        if (!error) return true;
        console.warn('Supabase update notes failed, updating locally:', error.message);
      } catch (e) {
        console.warn('Error updating notes in Supabase:', e);
      }
    }

    const items = getStoredInquiries();
    const idx = items.findIndex((i) => i.id === id);
    if (idx !== -1) {
      items[idx].internal_notes = notes;
      items[idx].updated_at = new Date().toISOString();
      saveStoredInquiries(items);
      return true;
    }
    return false;
  },

  /**
   * Export inquiry records into a standard CSV format
   */
  exportToCSV(inquiries: ProjectInquiry[]) {
    const headers = [
      'ID',
      'Submission Date',
      'Client Name',
      'Email',
      'Company',
      'Contact Number',
      'Project Type',
      'Industry',
      'Budget Range',
      'Timeline',
      'Status',
      'Problem Statement',
      'Desired Outcome',
      'Internal Notes',
    ];

    const rows = inquiries.map((item) => [
      item.id || '',
      item.created_at || '',
      `"${(item.name || '').replace(/"/g, '""')}"`,
      `"${(item.email || '').replace(/"/g, '""')}"`,
      `"${(item.company || '').replace(/"/g, '""')}"`,
      `"${(item.contact_number || '').replace(/"/g, '""')}"`,
      `"${(item.project_type || '').replace(/"/g, '""')}"`,
      `"${(item.industry || '').replace(/"/g, '""')}"`,
      `"${(item.budget_range || '').replace(/"/g, '""')}"`,
      `"${(item.timeline || '').replace(/"/g, '""')}"`,
      item.status || 'NEW',
      `"${(item.problem || '').replace(/"/g, '""')}"`,
      `"${(item.desired_outcome || '').replace(/"/g, '""')}"`,
      `"${(item.internal_notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `benedict_inquiries_export_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
};
