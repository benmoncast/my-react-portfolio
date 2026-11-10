import React, { useState } from 'react';
import {
  X,
  Mail,
  Phone,
  DollarSign,
  Clock,
  Save,
  CheckCircle2,
  Send,
} from 'lucide-react';
import type { ProjectInquiry, InquiryStatus } from '../../types';
import { inquiryService } from '../../services/inquiries/inquiryService';

interface InquiryDetailModalProps {
  inquiry: ProjectInquiry;
  onClose: () => void;
  onUpdated: () => void;
}

const ALL_STATUSES: InquiryStatus[] = [
  'NEW',
  'CONTACTED',
  'QUALIFIED',
  'PROPOSAL_SENT',
  'IN_PROGRESS',
  'COMPLETED',
  'CLOSED',
];

export const InquiryDetailModal: React.FC<InquiryDetailModalProps> = ({
  inquiry,
  onClose,
  onUpdated,
}) => {
  const [currentStatus, setCurrentStatus] = useState<InquiryStatus>(
    (inquiry.status as InquiryStatus) || 'NEW'
  );
  const [internalNotes, setInternalNotes] = useState(inquiry.internal_notes || '');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleStatusChange = async (newStatus: InquiryStatus) => {
    setCurrentStatus(newStatus);
    if (!inquiry.id) return;
    setIsSaving(true);
    await inquiryService.updateStatus(inquiry.id, newStatus);
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
    onUpdated();
  };

  const handleSaveNotes = async () => {
    if (!inquiry.id) return;
    setIsSaving(true);
    await inquiryService.updateInternalNotes(inquiry.id, internalNotes);
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
    onUpdated();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in-50">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl text-slate-100">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-emerald-400 font-bold">
                REF: {inquiry.id}
              </span>
              <span className="text-xs font-mono text-slate-500">•</span>
              <span className="text-xs font-mono text-slate-400">
                Submitted {new Date(inquiry.created_at || '').toLocaleString()}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">
              {inquiry.name} {inquiry.company ? `(${inquiry.company})` : ''}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {saveSuccess && (
              <span className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Saved to Supabase
              </span>
            )}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-8 flex-1">
          {/* Quick status bar */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Lifecycle Status
              </span>
              <div className="flex flex-wrap gap-1.5">
                {ALL_STATUSES.map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => handleStatusChange(status)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-colors ${
                      currentStatus === status
                        ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                        : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Client Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
              <span className="text-slate-400 flex items-center gap-1 mb-1">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                Email Address
              </span>
              <a
                href={`mailto:${inquiry.email}`}
                className="text-slate-200 hover:text-emerald-400 break-all"
              >
                {inquiry.email}
              </a>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
              <span className="text-slate-400 flex items-center gap-1 mb-1">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                Phone Number
              </span>
              <span className="text-slate-200">{inquiry.contact_number || 'None provided'}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
              <span className="text-slate-400 flex items-center gap-1 mb-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                Budget Scope
              </span>
              <span className="text-slate-200">{inquiry.budget_range}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
              <span className="text-slate-400 flex items-center gap-1 mb-1">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                Timeline
              </span>
              <span className="text-slate-200">{inquiry.timeline}</span>
            </div>
          </div>

          {/* Project Details Overview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Business Requirements Specification
              </h3>
              <span className="text-xs font-mono text-emerald-400">
                Type: {inquiry.project_type} • Industry: {inquiry.industry}
              </span>
            </div>

            {/* Problem Statement */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[11px] font-mono text-rose-400 uppercase font-semibold">
                Operational Problem Statement
              </span>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {inquiry.problem}
              </p>
            </div>

            {/* Desired Outcome */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[11px] font-mono text-emerald-400 uppercase font-semibold">
                Target Business Outcome
              </span>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {inquiry.desired_outcome}
              </p>
            </div>

            {/* Details */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold">
                Technical Specifications & Scope Details
              </span>
              <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line font-sans">
                {inquiry.details}
              </p>
            </div>

            {inquiry.existing_website && (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
                <span className="text-slate-400">Existing Platform: </span>
                <a
                  href={inquiry.existing_website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:underline"
                >
                  {inquiry.existing_website}
                </a>
              </div>
            )}
          </div>

          {/* Internal Notes Management */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Internal Administrator Notes
              </label>
              <button
                type="button"
                onClick={handleSaveNotes}
                disabled={isSaving}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 text-xs font-bold font-mono hover:bg-emerald-400 transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Notes</span>
              </button>
            </div>
            <textarea
              rows={4}
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
              placeholder="Record discovery call dates, quotation values, technical stack recommendations, client follow-ups..."
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono leading-relaxed"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <a
            href={`mailto:${inquiry.email}?subject=Project%20Inquiry%20Discussion%20-%20Benedict%20Castro&body=Hi%20${encodeURIComponent(
              inquiry.name
            )},%0D%0A%0D%0AThank%20you%20for%20submitting%20your%20project%20inquiry%20regarding%20${encodeURIComponent(
              inquiry.project_type
            )}.`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
          >
            <Send className="w-3.5 h-3.5 text-emerald-400" />
            <span>Draft Email Response</span>
          </a>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
