import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { inquiryService } from '../services/inquiries/inquiryService';
import type { InquiryFormData } from '../services/inquiries/inquiryService';

function getInitialProjectType(serviceParam: string | null): string {
  if (!serviceParam) return 'Web Application';
  if (serviceParam.includes('Website')) return 'Business Website';
  if (serviceParam.includes('Automation')) return 'Business Automation';
  if (serviceParam.includes('Booking')) return 'Booking System';
  if (serviceParam.includes('E-commerce')) return 'E-commerce';
  return 'Web Application';
}

export const Contact: React.FC = () => {
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState<InquiryFormData>(() => ({
    name: '',
    email: '',
    company: '',
    contact_number: '',
    project_type: getInitialProjectType(searchParams.get('service')),
    industry: '',
    budget_range: '$1,000 - $3,000 (Standard Business System / MVP)',
    timeline: 'Within 1 month',
    existing_website: '',
    problem: '',
    desired_outcome: '',
    details: '',
    consent: true,
  }));

  // Honeypot for spam prevention
  const [honeypot, setHoneypot] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Spam protection check: if honeypot was filled, quietly discard
    if (honeypot) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmittedId('spam-trapped');
      }, 500);
      return;
    }

    // Client-side quick validation
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'A valid email address is required';
    }
    if (!formData.industry.trim()) {
      newErrors.industry = 'Please specify your industry or business field';
    }
    if (formData.problem.trim().length < 10) {
      newErrors.problem = 'Please provide at least 10 characters describing the problem';
    }
    if (formData.desired_outcome.trim().length < 10) {
      newErrors.desired_outcome = 'Please specify what outcome you wish to achieve';
    }
    if (formData.details.trim().length < 20) {
      newErrors.details = 'Please provide at least 20 characters of project details';
    }
    if (!formData.consent) {
      newErrors.consent = 'You must acknowledge client consent to proceed';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await inquiryService.submitInquiry(formData);
      if (result.success && result.id) {
        setSubmittedId(result.id);
      } else {
        setServerError(result.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err: unknown) {
      setServerError((err as Error).message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Project Inquiry & Quotation Workflow</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Let&apos;s Build Your Business Solution
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Fill out the structured inquiry below. Benedict will evaluate your requirements and reach out within 24–48 business hours with technical recommendations.
          </p>
        </div>

        {/* Success Confirmation State */}
        {submittedId ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-md text-center space-y-6 animate-in fade-in-50">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Inquiry Successfully Submitted!
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Thank you, <span className="font-semibold text-slate-900">{formData.name}</span>. Your project inquiry has been logged in Benedict&apos;s secure system with status <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">NEW</span>.
              </p>
              <p className="text-xs font-mono text-slate-400 pt-2">
                Reference ID: {submittedId}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 max-w-md mx-auto text-left space-y-2">
              <span className="font-bold text-slate-900 block font-mono">What happens next?</span>
              <ul className="space-y-1 list-disc list-inside">
                <li>Benedict reviews your problem statement and technical architecture.</li>
                <li>You receive a personalized scope breakdown and quotation to <span className="font-semibold">{formData.email}</span>.</li>
                <li>If required, a brief 20-minute discovery call will be arranged.</li>
              </ul>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/"
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs sm:text-sm font-medium hover:bg-slate-800 transition-colors"
              >
                Return to Homepage
              </Link>
              <button
                type="button"
                onClick={() => {
                  setSubmittedId(null);
                  setFormData({
                    name: '',
                    email: '',
                    company: '',
                    contact_number: '',
                    project_type: 'Web Application',
                    industry: '',
                    budget_range: '$1,000 - $3,000 (Standard Business System / MVP)',
                    timeline: 'Within 1 month',
                    existing_website: '',
                    problem: '',
                    desired_outcome: '',
                    details: '',
                    consent: true,
                  });
                }}
                className="px-5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs sm:text-sm font-medium hover:bg-slate-50 transition-colors"
              >
                Submit Another Project
              </button>
            </div>
          </div>
        ) : (
          /* Multi-Section Form */
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
            noValidate
          >
            {/* Honeypot field (hidden from genuine users) */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website_hp">Leave empty</label>
              <input
                id="website_hp"
                type="text"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {serverError && (
              <div className="m-6 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-700 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{serverError}</span>
              </div>
            )}

            {/* SECTION 1: Personal & Contact Information */}
            <div className="p-6 sm:p-10 border-b border-slate-200 space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-mono text-xs flex items-center justify-center font-bold">
                  1
                </span>
                <h2 className="text-lg font-bold text-slate-900">
                  Client & Contact Information
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      errors.name ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 bg-slate-50/50'
                    }`}
                  />
                  {errors.name && <p className="text-xs text-rose-600 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      errors.email ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 bg-slate-50/50'
                    }`}
                  />
                  {errors.email && <p className="text-xs text-rose-600 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Company Name <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Acme Enterprises Ltd."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Contact Number / WhatsApp <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    name="contact_number"
                    value={formData.contact_number}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 2: Project Scope & Parameters */}
            <div className="p-6 sm:p-10 border-b border-slate-200 space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-mono text-xs flex items-center justify-center font-bold">
                  2
                </span>
                <h2 className="text-lg font-bold text-slate-900">
                  Project Scope & Parameters
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Project Type <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="project_type"
                    value={formData.project_type}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  >
                    {SITE_CONFIG.projectTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Business Industry <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    placeholder="e.g. Healthcare, Retail, Logistics, B2B SaaS"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      errors.industry ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 bg-slate-50/50'
                    }`}
                  />
                  {errors.industry && <p className="text-xs text-rose-600 mt-1">{errors.industry}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Estimated Budget Range <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="budget_range"
                    value={formData.budget_range}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {SITE_CONFIG.budgetRanges.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Indicative range to guide technical scoping.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Preferred Timeline <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {SITE_CONFIG.timelines.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Existing Website or System URL <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="url"
                    name="existing_website"
                    value={formData.existing_website}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 3: Business Problem & Outcomes */}
            <div className="p-6 sm:p-10 border-b border-slate-200 space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-mono text-xs flex items-center justify-center font-bold">
                  3
                </span>
                <h2 className="text-lg font-bold text-slate-900">
                  Business Problem & Desired Outcomes
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    What operational problem are you experiencing? <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    name="problem"
                    value={formData.problem}
                    onChange={handleChange}
                    placeholder="Describe manual tasks, spreadsheet errors, missed customer leads, or bottlenecks currently hurting your operations..."
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      errors.problem ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 bg-slate-50/50'
                    }`}
                  />
                  {errors.problem && <p className="text-xs text-rose-600 mt-1">{errors.problem}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    What would you like to achieve once the solution is live? <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    name="desired_outcome"
                    value={formData.desired_outcome}
                    onChange={handleChange}
                    placeholder="e.g. Save 15 hours a week of manual scheduling, eliminate stockouts, or convert 30% more web visitors into booked clients..."
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      errors.desired_outcome ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 bg-slate-50/50'
                    }`}
                  />
                  {errors.desired_outcome && (
                    <p className="text-xs text-rose-600 mt-1">{errors.desired_outcome}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Detailed Project Requirements & Specifications <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    placeholder="Detail user roles, desired third-party integrations (e.g., Stripe, Google Calendar), specific views or data fields needed..."
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      errors.details ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 bg-slate-50/50'
                    }`}
                  />
                  {errors.details && <p className="text-xs text-rose-600 mt-1">{errors.details}</p>}
                </div>
              </div>
            </div>

            {/* SECTION 4: Consent & Submission */}
            <div className="p-6 sm:p-10 bg-slate-50 space-y-6">
              <div className="space-y-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-xs text-slate-600 leading-relaxed">
                    I consent to having Benedict Castro store and process these submitted details to evaluate project scope, formulate a quotation, and contact me regarding this request. (Never sold or shared).
                  </span>
                </label>
                {errors.consent && <p className="text-xs text-rose-600 pl-7">{errors.consent}</p>}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Protected by Supabase Row-Level Security</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 disabled:opacity-50 transition-all shadow-md shadow-emerald-500/20 text-sm"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Submitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Project Inquiry</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
