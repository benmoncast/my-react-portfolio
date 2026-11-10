import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  LogOut,
  Download,
  Search,
  Eye,
  RefreshCw,
  Inbox,
  CheckCircle2,
  XCircle,
  TrendingUp,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../../context/useAuth';
import { inquiryService } from '../../services/inquiries/inquiryService';
import type { ProjectInquiry } from '../../types';
import { InquiryDetailModal } from './InquiryDetailModal';
import { SITE_CONFIG } from '../../config/site';

export const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [inquiries, setInquiries] = useState<ProjectInquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<ProjectInquiry | null>(null);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [projectTypeFilter, setProjectTypeFilter] = useState('ALL');
  const [reloadTrigger, setReloadTrigger] = useState(0);

  useEffect(() => {
    let isSubscribed = true;

    inquiryService
      .getInquiries({
        search: searchTerm,
        status: statusFilter,
        projectType: projectTypeFilter,
      })
      .then((data) => {
        if (isSubscribed) {
          setInquiries(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch inquiries:', err);
        if (isSubscribed) setIsLoading(false);
      });

    return () => {
      isSubscribed = false;
    };
  }, [searchTerm, statusFilter, projectTypeFilter, reloadTrigger]);

  const fetchInquiries = useCallback(() => {
    setIsLoading(true);
    setReloadTrigger((v) => v + 1);
  }, []);

  // Metric aggregates
  const totalCount = inquiries.length;
  const newCount = inquiries.filter((i) => i.status === 'NEW').length;
  const inProgressCount = inquiries.filter(
    (i) => i.status === 'IN_PROGRESS' || i.status === 'PROPOSAL_SENT' || i.status === 'QUALIFIED'
  ).length;
  const completedCount = inquiries.filter((i) => i.status === 'COMPLETED').length;
  const closedCount = inquiries.filter((i) => i.status === 'CLOSED').length;

  const handleExportCSV = () => {
    inquiryService.exportToCSV(inquiries);
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'NEW':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'CONTACTED':
        return 'bg-sky-500/10 text-sky-400 border-sky-500/30';
      case 'QUALIFIED':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'PROPOSAL_SENT':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'IN_PROGRESS':
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
      case 'COMPLETED':
        return 'bg-teal-500/10 text-teal-300 border-teal-500/30';
      case 'CLOSED':
        return 'bg-slate-800 text-slate-400 border-slate-700';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Admin Bar */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-2">
              Benedict Castro
              <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-mono">
                Admin Panel
              </span>
            </h1>
            <p className="text-[11px] text-slate-400 font-mono">
              Signed in as: {user?.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors font-mono"
          >
            <span>Live Portfolio</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => logout()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-lg transition-colors font-mono"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* KPI Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span>Total Inquiries</span>
              <Inbox className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-extrabold text-white font-mono">{totalCount}</div>
            <div className="text-[10px] text-slate-500">All recorded opportunities</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span>New / Unhandled</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <div className="text-2xl font-extrabold text-emerald-400 font-mono">{newCount}</div>
            <div className="text-[10px] text-emerald-500/80">Awaiting qualification</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span>Active Pipeline</span>
              <TrendingUp className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-2xl font-extrabold text-sky-400 font-mono">{inProgressCount}</div>
            <div className="text-[10px] text-slate-500">In discovery / proposals</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span>Completed</span>
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-2xl font-extrabold text-teal-400 font-mono">{completedCount}</div>
            <div className="text-[10px] text-slate-500">Delivered projects</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1 col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span>Closed / Archived</span>
              <XCircle className="w-4 h-4 text-slate-500" />
            </div>
            <div className="text-2xl font-extrabold text-slate-400 font-mono">{closedCount}</div>
            <div className="text-[10px] text-slate-500">Not pursuing</div>
          </div>
        </div>

        {/* Action Controls & Filtering Bar */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by client name, email, or company..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Filter Dropdowns & Export */}
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="ALL">All Statuses</option>
                <option value="NEW">NEW</option>
                <option value="CONTACTED">CONTACTED</option>
                <option value="QUALIFIED">QUALIFIED</option>
                <option value="PROPOSAL_SENT">PROPOSAL_SENT</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="CLOSED">CLOSED</option>
              </select>

              <select
                value={projectTypeFilter}
                onChange={(e) => setProjectTypeFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="ALL">All Project Types</option>
                {SITE_CONFIG.projectTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>

              <button
                onClick={fetchInquiries}
                className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 transition-colors"
                title="Refresh Table"
                aria-label="Refresh inquiry list"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </button>

              <button
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold font-mono hover:bg-emerald-400 transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>
        </div>

        {/* Table of Inquiries */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="px-5 py-3.5">Ref ID</th>
                  <th className="px-5 py-3.5">Client & Company</th>
                  <th className="px-5 py-3.5">Project Type</th>
                  <th className="px-5 py-3.5">Budget</th>
                  <th className="px-5 py-3.5">Timeline</th>
                  <th className="px-5 py-3.5">Submitted</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {isLoading ? (
                  <tr>
                    <td colSpan={8} className="px-5 py-12 text-center text-slate-500">
                      <div className="w-6 h-6 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                      <span>Loading incoming inquiries...</span>
                    </td>
                  </tr>
                ) : inquiries.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-5 py-12 text-center text-slate-500">
                      No inquiries match the current filter parameters.
                    </td>
                  </tr>
                ) : (
                  inquiries.map((inq) => (
                    <tr
                      key={inq.id}
                      className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                      onClick={() => setSelectedInquiry(inq)}
                    >
                      <td className="px-5 py-4 font-bold text-slate-400">
                        {inq.id?.slice(0, 10)}...
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-sans font-bold text-white text-xs">
                          {inq.name}
                        </div>
                        <div className="text-[11px] text-slate-400">{inq.email}</div>
                        {inq.company && (
                          <div className="text-[10px] text-slate-500">{inq.company}</div>
                        )}
                      </td>
                      <td className="px-5 py-4 text-slate-300">
                        {inq.project_type}
                      </td>
                      <td className="px-5 py-4 text-slate-400 text-[11px]">
                        {inq.budget_range?.split(' ')[0]}...
                      </td>
                      <td className="px-5 py-4 text-slate-400">
                        {inq.timeline}
                      </td>
                      <td className="px-5 py-4 text-slate-500 text-[11px]">
                        {inq.created_at
                          ? new Date(inq.created_at).toLocaleDateString([], {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })
                          : '—'}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusBadge(
                            inq.status
                          )}`}
                        >
                          {inq.status || 'NEW'}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedInquiry(inq);
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Review</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Detail Modal */}
      {selectedInquiry && (
        <InquiryDetailModal
          inquiry={selectedInquiry}
          onClose={() => setSelectedInquiry(null)}
          onUpdated={() => {
            fetchInquiries();
            // Refresh modal instance with latest stored state
            inquiryService.getInquiryById(selectedInquiry.id || '').then((latest) => {
              if (latest) setSelectedInquiry(latest);
            });
          }}
        />
      )}
    </div>
  );
};
