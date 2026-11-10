import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, ShieldCheck, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons';
import { SITE_CONFIG } from '../../config/site';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                {SITE_CONFIG.developer.name}
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              &ldquo;{SITE_CONFIG.developer.coreMessage}&rdquo;
            </p>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              {SITE_CONFIG.developer.supportingStatement}
            </p>

            <div className="pt-2 flex items-center gap-4 text-slate-400">
              <a
                href={SITE_CONFIG.developer.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-400 transition-colors p-2 rounded-md hover:bg-slate-900"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <a
                href={SITE_CONFIG.developer.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-400 transition-colors p-2 rounded-md hover:bg-slate-900"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${SITE_CONFIG.developer.email}`}
                className="hover:text-emerald-400 transition-colors p-2 rounded-md hover:bg-slate-900"
                aria-label="Send direct email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Solutions & Pages */}
          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-wider text-slate-200 uppercase font-mono">
              Solutions & Services
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/services" className="hover:text-emerald-400 transition-colors">
                  Web Applications & CRMs
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-emerald-400 transition-colors">
                  Business Process Automation
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-emerald-400 transition-colors">
                  Inventory Management Systems
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-emerald-400 transition-colors">
                  Online Booking Engines
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-emerald-400 transition-colors">
                  Maintenance & Retainers
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Access & Direct Inquiries */}
          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-wider text-slate-200 uppercase font-mono">
              Navigation
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/projects" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <span>Case Studies</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-emerald-400 transition-colors">
                  Developer Profile & Skills
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-400 transition-colors font-medium text-emerald-400">
                  Request a Quotation &rarr;
                </Link>
              </li>
              <li className="pt-2 border-t border-slate-900">
                <Link
                  to="/admin/login"
                  className="text-xs text-slate-400 hover:text-slate-300 flex items-center gap-1.5 transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>
            &copy; {new Date().getFullYear()} {SITE_CONFIG.developer.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-2">
            <span>Built with React, TypeScript & Supabase</span>
            <span>•</span>
            <span className="text-slate-400">Concept & demonstration projects are labeled accordingly.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
