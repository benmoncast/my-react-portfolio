import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Database,
  Layers,
  Sparkles,
  Cpu,
  BarChart3,
  CalendarCheck,
  Globe,
  LayoutDashboard,
  Code2,
  Terminal,
  ExternalLink,
} from 'lucide-react';
import { SITE_CONFIG, CASE_STUDIES, SERVICES } from '../config/site';

export const Home: React.FC = () => {
  const problemsAndSolutions = [
    {
      problem: 'Manual & Repetitive Operations',
      solution: 'Business Process Automation',
      desc: 'Replaces spreadsheet chaos and manual paperwork with background automated jobs and automated alerts.',
      icon: Cpu,
      badge: 'Operational Efficiency',
    },
    {
      problem: 'Disorganized Customer Records',
      solution: 'Centralized CRM & Lead Tracker',
      desc: 'Brings scattered sales inboxes, notes, and communications into one actionable deal pipeline.',
      icon: LayoutDashboard,
      badge: 'Revenue Velocity',
    },
    {
      problem: 'Poor Online Presence & Trust',
      solution: 'High-Converting Business Websites',
      desc: 'Transforms slow, template-bloated sites into fast, SEO-optimized digital storefronts that convert visitors.',
      icon: Globe,
      badge: 'Brand Credibility',
    },
    {
      problem: 'Inefficient Inventory & Stockouts',
      solution: 'Inventory Management Systems',
      desc: 'Monitors multi-location stock levels in real time with automated low-stock warnings and movement audit trails.',
      icon: BarChart3,
      badge: 'Cost Prevention',
    },
    {
      problem: 'Manual Booking & Phone Rescheduling',
      solution: 'Online Reservation Platforms',
      desc: 'Enables 24/7 self-service scheduling with buffer management and automatic reminder notifications to eliminate no-shows.',
      icon: CalendarCheck,
      badge: 'Staff Time Savings',
    },
    {
      problem: 'Disconnected Business Tools',
      solution: 'Custom API Integrations',
      desc: 'Bridges fragmented third-party apps, payment processors, and billing systems with robust data sync.',
      icon: Layers,
      badge: 'Data Integrity',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200/80 pt-16 pb-20 lg:pt-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Status pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{SITE_CONFIG.developer.title}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                {SITE_CONFIG.developer.heroHeadline}
              </h1>

              {/* Value Proposition Description */}
              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl font-normal">
                {SITE_CONFIG.developer.heroDescription}
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-all shadow-md shadow-emerald-500/20 text-sm sm:text-base"
                >
                  <span>Discuss a Project</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/projects"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-100 text-slate-800 font-medium hover:bg-slate-200 transition-all text-sm sm:text-base border border-slate-200"
                >
                  <span>Explore My Work</span>
                </Link>

                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-slate-600 hover:text-slate-900 font-medium transition-all text-xs sm:text-sm hover:underline"
                >
                  <span>View Developer Profile &rarr;</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-slate-100 grid grid-cols-3 gap-4 text-left">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 font-mono">100%</div>
                  <div className="text-xs text-slate-500">Business-Aligned Code</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 font-mono">Type-Safe</div>
                  <div className="text-xs text-slate-500">React & TypeScript</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 font-mono">Zero Bloat</div>
                  <div className="text-xs text-slate-500">Maintainable Architecture</div>
                </div>
              </div>
            </div>

            {/* Right Visual: Product Interface / Architecture Simulation */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Glowing backdrop */}
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

                <div className="relative rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 p-6 shadow-2xl space-y-5">
                  {/* Window frame top */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      solution-architecture.tsx
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Production Ready
                    </span>
                  </div>

                  {/* Operational Metrics Mock */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>Automation Rate</span>
                        <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <div className="text-xl font-bold text-white font-mono mt-1">94.2%</div>
                      <div className="text-[10px] text-emerald-400 mt-0.5">Eliminates manual input</div>
                    </div>
                    <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>Database Query</span>
                        <Database className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <div className="text-xl font-bold text-white font-mono mt-1">&lt; 18ms</div>
                      <div className="text-[10px] text-emerald-400 mt-0.5">PostgreSQL RLS Indexed</div>
                    </div>
                  </div>

                  {/* Architecture Diagram Snippet */}
                  <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs space-y-2 text-slate-300">
                    <div className="text-slate-500">// Benedict Castro Engineering Stack</div>
                    <div className="text-emerald-400 flex items-center gap-2">
                      <span className="text-slate-500">const</span> stack = {'{'}
                    </div>
                    <div className="pl-4 text-slate-300">
                      frontend: <span className="text-amber-300">['React 19', 'TypeScript', 'Tailwind']</span>,
                    </div>
                    <div className="pl-4 text-slate-300">
                      database: <span className="text-emerald-300">['PostgreSQL', 'Supabase RLS']</span>,
                    </div>
                    <div className="pl-4 text-slate-300">
                      backend: <span className="text-sky-300">['Java Spring Boot', 'Node.js']</span>,
                    </div>
                    <div className="pl-4 text-slate-300">
                      security: <span className="text-rose-300">['Role-Based Auth', 'Zod Guard']</span>,
                    </div>
                    <div className="text-emerald-400">{'}'};</div>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-xs text-slate-400 border-t border-slate-800/60">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                      Clean Code & Type Safety
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400">Available Q1 2026</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BUSINESS VALUE SECTION */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
              Business Transformation
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Your Business Has Problems. I Build the Solutions.
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Technology should produce measurable business outcomes: saving human hours, eliminating costly administrative errors, and accelerating deal conversions.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problemsAndSolutions.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 space-y-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800">
                        <Icon className="w-5 h-5 text-emerald-600" />
                      </div>
                      <span className="text-[11px] font-medium font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {item.badge}
                      </span>
                    </div>

                    <div className="mt-4">
                      <span className="text-xs font-semibold text-rose-600 uppercase tracking-wider block">
                        Problem
                      </span>
                      <h3 className="text-base font-semibold text-slate-900 mt-0.5">
                        {item.problem}
                      </h3>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-100">
                      <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block">
                        Engineered Solution
                      </span>
                      <p className="text-sm font-medium text-slate-800 mt-0.5">
                        {item.solution}
                      </p>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <Link
                    to="/contact"
                    className="pt-3 text-xs font-medium text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group"
                  >
                    <span>Request solution quotation</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROJECTS (DARK HIGH-CONTRAST SHOWCASE) */}
      <section className="py-24 bg-slate-950 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase">
                <Terminal className="w-3.5 h-3.5" />
                Featured Engineering Case Studies
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Technical Capabilities in Action
              </h2>
              <p className="text-slate-400 text-sm sm:text-base">
                Real architectures addressing concrete operational needs. All initial projects are transparently marked as demonstration concepts until verified.
              </p>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-medium self-start md:self-auto transition-colors"
            >
              <span>View All Case Studies</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {CASE_STUDIES.map((project) => (
              <div
                key={project.id}
                className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all group"
              >
                {/* Project Header Banner */}
                <div className="p-6 border-b border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                      {project.type} Case Study
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {project.tagline}
                  </p>
                </div>

                {/* Body Details */}
                <div className="p-6 space-y-4 flex-1">
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                      Business Value
                    </span>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {project.businessValue}
                    </p>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                      Core Technologies
                    </span>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer action */}
                <div className="p-6 pt-0 border-t border-slate-800/60 mt-4 flex items-center justify-between">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-white transition-colors"
                      title="GitHub Repository"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SERVICES PREVIEW */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 font-mono">
              Development Capabilities
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Software Development Services
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              From high-performance corporate web platforms to full-scale internal administrative software and automation pipelines.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.slice(0, 6).map((service) => (
              <div
                key={service.id}
                className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="text-xs font-mono text-emerald-700 font-medium">
                    {service.category}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {service.summary}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-200">
                  <span className="text-[11px] font-semibold text-slate-700 block uppercase tracking-wider">
                    Expected Business Benefit:
                  </span>
                  <p className="text-xs text-slate-600">
                    {service.businessBenefits[0]}
                  </p>
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 hover:text-emerald-800 pt-2"
                  >
                    <span>View deliverables & timeline</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs sm:text-sm font-medium hover:bg-slate-800 transition-colors"
            >
              <span>Explore All Development Services</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. DEVELOPMENT PROCESS (5 STAGES) */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 font-mono">
              Engineering Methodology
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              A Structured Five-Stage Development Process
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Predictable, milestone-driven software execution that minimizes scope creep and ensures your business goals are met.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-5 gap-4">
            {SITE_CONFIG.developmentProcess.map((step, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm relative flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="text-3xl font-black font-mono text-slate-200 group-hover:text-emerald-500 transition-colors">
                    {step.step}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-2">
                    {step.title}
                  </h3>
                  <div className="text-xs font-medium text-emerald-700 mt-0.5">
                    {step.tagline}
                  </div>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500"
                    style={{ width: `${(idx + 1) * 20}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FINAL CONVERSION CTA */}
      <section className="py-20 bg-emerald-700 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            Let&apos;s Build Together
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Have a business idea or problem that needs a digital solution?
          </h2>
          <p className="text-emerald-100 text-base sm:text-lg max-w-2xl mx-auto">
            Whether you need to automate a manual bottleneck, build a client management portal, or launch a modern web application, let&apos;s evaluate the requirements together.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-950 transition-all shadow-xl text-base"
            >
              <span>Let&apos;s Discuss Your Project</span>
              <ArrowRight className="w-5 h-5 text-emerald-400" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
