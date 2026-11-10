import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Code2,
  Database,
  Cpu,
  Wrench,
  Download,
  Mail,
  GraduationCap,
  Award,
  Terminal,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/ui/BrandIcons';
import { SITE_CONFIG } from '../config/site';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="bg-slate-50 border-b border-slate-200 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Bio Info */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-medium">
                <Terminal className="w-3.5 h-3.5" />
                <span>Developer Profile & Engineering Philosophy</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                {SITE_CONFIG.developer.name}
              </h1>
              <p className="text-lg text-emerald-700 font-mono font-medium">
                {SITE_CONFIG.developer.title}
              </p>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
                {SITE_CONFIG.developer.supportingStatement}
              </p>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm"
                >
                  <span>Discuss an Opportunity</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={SITE_CONFIG.developer.resumeUrl}
                  download
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-xs"
                >
                  <Download className="w-4 h-4 text-emerald-600" />
                  <span>Download Résumé (PDF)</span>
                </a>

                <div className="flex items-center gap-2 text-slate-500 pl-2">
                  <a
                    href={SITE_CONFIG.developer.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg hover:bg-slate-200 hover:text-slate-900 transition-colors"
                    aria-label="GitHub"
                  >
                    <GithubIcon className="w-5 h-5" />
                  </a>
                  <a
                    href={SITE_CONFIG.developer.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg hover:bg-slate-200 hover:text-slate-900 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon className="w-5 h-5" />
                  </a>
                  <a
                    href={`mailto:${SITE_CONFIG.developer.email}`}
                    className="p-2 rounded-lg hover:bg-slate-200 hover:text-slate-900 transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Card: Quick facts */}
            <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 font-mono text-xs text-slate-600">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-slate-900 font-bold">
                <span>PROFILE HIGHLIGHTS</span>
                <span className="text-emerald-600">VERIFIED</span>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Location</span>
                  <span className="text-slate-800 font-medium">{SITE_CONFIG.developer.location}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Primary Focus</span>
                  <span className="text-slate-800 font-medium">B2B Web Apps, CRMs, Automations</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Engagement Model</span>
                  <span className="text-slate-800 font-medium">Freelance Contracts & Full-Time Roles</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Code Reliability</span>
                  <span className="text-emerald-700 font-medium">Type-Safe & RLS Guarded</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Profile Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* 1. Developer Background & Philosophy */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-mono text-emerald-700 font-semibold uppercase tracking-wider block">
              Background & Overview
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Pragmatic Engineering, Zero Technical Bloat
            </h2>
            <div className="text-slate-600 text-sm leading-relaxed space-y-3">
              <p>
                As a software engineer, my primary role is not merely writing code, but solving real business problems with measurable value. I focus on building lean, highly reliable web applications that automate time-consuming operational tasks and give business owners full control over their workflows.
              </p>
              <p>
                From architecting relational database schemas with strict row-level security to crafting responsive, accessible user interfaces in React and TypeScript, I deliver production systems designed for longevity and low maintenance overhead.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-mono text-emerald-700 font-semibold uppercase tracking-wider block">
              Development Philosophy
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block font-mono">1. Business Value First</span>
                <p className="text-slate-600">Every feature must solve an actual business need or reduce friction for users.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block font-mono">2. Type Safety & Integrity</span>
                <p className="text-slate-600">Strict TypeScript and PostgreSQL constraints to eliminate runtime bugs early.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block font-mono">3. Responsive & Accessible</span>
                <p className="text-slate-600">Clean layouts that perform seamlessly across desktop, tablets, and phones.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block font-mono">4. Security by Default</span>
                <p className="text-slate-600">Server-side RLS authorization and defensive input validation at all boundaries.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Technical Skills Matrix */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-mono text-emerald-700 font-semibold uppercase tracking-wider block">
                Technical Capabilities
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Skills & Technologies Matrix
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500">
              Only authentic technologies Benedict actively develops with
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Frontend */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 text-slate-900 font-bold text-sm">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Code2 className="w-4 h-4" />
                </div>
                <span>Frontend Engineering</span>
              </div>
              <ul className="space-y-2 text-xs">
                {SITE_CONFIG.skills.frontend.map((s, i) => (
                  <li key={i} className="flex items-center justify-between py-1 border-b border-slate-100 last:border-none">
                    <span className="text-slate-800 font-medium">{s.name}</span>
                    <span className="text-emerald-700 font-mono text-[10px] bg-emerald-50 px-2 py-0.5 rounded">
                      {s.level}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Backend */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 text-slate-900 font-bold text-sm">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Cpu className="w-4 h-4" />
                </div>
                <span>Backend Engineering</span>
              </div>
              <ul className="space-y-2 text-xs">
                {SITE_CONFIG.skills.backend.map((s, i) => (
                  <li key={i} className="flex items-center justify-between py-1 border-b border-slate-100 last:border-none">
                    <span className="text-slate-800 font-medium">{s.name}</span>
                    <span className="text-emerald-700 font-mono text-[10px] bg-emerald-50 px-2 py-0.5 rounded">
                      {s.level}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Database */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 text-slate-900 font-bold text-sm">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Database className="w-4 h-4" />
                </div>
                <span>Databases & Security</span>
              </div>
              <ul className="space-y-2 text-xs">
                {SITE_CONFIG.skills.database.map((s, i) => (
                  <li key={i} className="flex items-center justify-between py-1 border-b border-slate-100 last:border-none">
                    <span className="text-slate-800 font-medium">{s.name}</span>
                    <span className="text-emerald-700 font-mono text-[10px] bg-emerald-50 px-2 py-0.5 rounded">
                      {s.level}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 text-slate-900 font-bold text-sm">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Wrench className="w-4 h-4" />
                </div>
                <span>Developer Tooling</span>
              </div>
              <ul className="space-y-2 text-xs">
                {SITE_CONFIG.skills.tools.map((s, i) => (
                  <li key={i} className="flex items-center justify-between py-1 border-b border-slate-100 last:border-none">
                    <span className="text-slate-800 font-medium">{s.name}</span>
                    <span className="text-emerald-700 font-mono text-[10px] bg-emerald-50 px-2 py-0.5 rounded">
                      {s.level}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 3. Education, Certifications & Background Placeholders */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <GraduationCap className="w-5 h-5 text-emerald-600" />
              <span>Education & Academic Background</span>
            </div>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="font-semibold text-slate-900 block text-sm">
                  Bachelor of Science in Information Technology (BSIT)
                </span>
                <span className="text-slate-500 font-mono text-[11px] block mt-0.5">
                  University of Cebu - Lapu-Lapu and Mandaue (UCLM) • [Configurable Placeholder]
                </span>
                <p className="mt-1 text-slate-600">
                  Focused on Software Engineering, Database Systems, Web Application Architectures, and Network Security.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Award className="w-5 h-5 text-emerald-600" />
              <span>Certifications & Verified Competencies</span>
            </div>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="font-semibold text-slate-900 block text-sm">
                  Full Stack Web Engineering & Architecture
                </span>
                <span className="text-slate-500 font-mono text-[11px] block mt-0.5">
                  Verified Technical Portfolio • Configurable Credentials Placeholder
                </span>
                <p className="mt-1 text-slate-600">
                  Comprehensive mastery in React, TypeScript, Java/Spring Boot, PostgreSQL RLS, and secure RESTful APIs.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
