import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Globe,
  LayoutDashboard,
  Cpu,
  CalendarCheck,
  ShoppingBag,
  ShieldCheck,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { SERVICES } from '../config/site';

export const Services: React.FC = () => {
  const iconMap: Record<string, React.ElementType> = {
    Globe,
    LayoutDashboard,
    Cpu,
    CalendarCheck,
    ShoppingBag,
    ShieldCheck,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Banner */}
      <section className="bg-white border-b border-slate-200 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider font-mono">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Engineering & Development Services</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            High-Impact Software Solutions for Modern Businesses
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            Eliminate operational bottlenecks with bespoke web applications, automated workflows, and robust customer portals. Transparent, quotation-based pricing focused strictly on deliverables and ROI.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-600 font-mono">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Quotation-Based Pricing
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              100% Code Ownership
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              No Ongoing Per-User SaaS Fees
            </span>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-16">
          {SERVICES.map((srv, index) => {
            const IconComponent = iconMap[srv.iconName] || Globe;
            const isEven = index % 2 === 1;

            return (
              <article
                key={srv.id}
                className={`bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 lg:grid-cols-12 gap-8 items-start ${
                  isEven ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Left Description Column */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 text-emerald-400 flex items-center justify-center">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-emerald-700 font-semibold uppercase tracking-wider block">
                        {srv.category}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                        {srv.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    {srv.summary}
                  </p>

                  {/* Problem vs Solution Comparison Box */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 space-y-1.5">
                      <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wider block">
                        The Pain Point
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {srv.businessProblem}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-1.5">
                      <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                        The Proposed Solution
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {srv.proposedSolution}
                      </p>
                    </div>
                  </div>

                  {/* Business Benefits */}
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-slate-900 uppercase tracking-wider block">
                      Direct Business Benefits:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {srv.businessBenefits.map((b, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA link */}
                  <div className="pt-2">
                    <Link
                      to={`/contact?service=${encodeURIComponent(srv.title)}`}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 text-white text-xs sm:text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm"
                    >
                      <span>Request a Quotation for {srv.title}</span>
                      <ArrowRight className="w-4 h-4 text-emerald-400" />
                    </Link>
                  </div>
                </div>

                {/* Right Deliverables Column */}
                <div className="lg:col-span-5 bg-slate-900 rounded-2xl p-6 sm:p-7 text-white space-y-5">
                  <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                    <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">
                      Key Deliverables
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      Est. {srv.indicativeTimeline}
                    </span>
                  </div>

                  <ul className="space-y-3 text-xs text-slate-300">
                    {srv.deliverables.map((d, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 font-mono text-[10px] flex-shrink-0 mt-0.5">
                          0{i + 1}
                        </span>
                        <span className="leading-relaxed">{d}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
                      Scope-based quote
                    </span>
                    <Link
                      to="/contact"
                      className="text-emerald-400 hover:text-emerald-300 font-medium"
                    >
                      Submit inquiry &rarr;
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Process Reminder */}
        <div className="mt-20 bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Not sure which service fits your requirements?
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Describe your current operational bottleneck in plain language. Benedict will analyze the problem and propose the most cost-effective technical approach.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors shadow-sm text-sm"
          >
            <span>Describe Your Business Problem</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
