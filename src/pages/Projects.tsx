import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Filter,
  CheckCircle2,
  Terminal,
  Layers,
  Sparkles,
} from 'lucide-react';
import { GithubIcon } from '../components/ui/BrandIcons';
import { CASE_STUDIES } from '../config/site';

export const Projects: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('ALL');

  const filteredProjects =
    filterType === 'ALL'
      ? CASE_STUDIES
      : CASE_STUDIES.filter((p) => p.category.toLowerCase().includes(filterType.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Page Header */}
      <div className="bg-slate-950 border-b border-slate-800 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400">
            <Terminal className="w-3.5 h-3.5" />
            <span>Architecture & Case Studies</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineered Projects & Systems
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-3xl leading-relaxed">
            Detailed engineering breakdowns of real problem-solving architectures. Each showcase includes business rationale, data models, technical challenges, and implementation specs.
          </p>

          <div className="pt-2 flex items-center gap-2 text-xs font-mono text-amber-300 bg-amber-500/10 border border-amber-500/20 px-3 py-2 rounded-lg max-w-xl">
            <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>
              Integrity Notice: All projects are categorized as Concept or Demonstration builds until verified client results are achieved.
            </span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <Filter className="w-3.5 h-3.5 text-emerald-400" />
            <span>Filter by Domain:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'ALL', label: 'All Architectures' },
              { id: 'Inventory', label: 'Inventory' },
              { id: 'Sales', label: 'CRM & Sales' },
              { id: 'Booking', label: 'Booking & Scheduling' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setFilterType(btn.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono transition-colors ${
                  filterType === btn.id
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards List */}
        <div className="mt-12 space-y-12">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-8 hover:border-slate-700 transition-all shadow-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Overview */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                      {project.type} Project
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {project.category}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {project.title}
                  </h2>

                  <p className="text-sm text-slate-300 leading-relaxed font-sans">
                    {project.tagline}
                  </p>

                  {/* Business Problem */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800/80 space-y-1">
                    <span className="text-[11px] font-mono text-rose-400 font-semibold uppercase tracking-wider block">
                      The Business Bottleneck
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {project.businessProblem}
                    </p>
                  </div>

                  {/* Key Features Preview */}
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                      Core Functional Highlights
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                      {project.keyFeatures.slice(0, 4).map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack tags */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono px-2.5 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="pt-4 flex flex-wrap items-center gap-4 border-t border-slate-800">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-semibold text-xs sm:text-sm hover:bg-emerald-400 transition-colors"
                    >
                      <span>Read Deep-Dive Case Study</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors"
                      >
                        <GithubIcon className="w-4 h-4" />
                        <span>Source Architecture</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Interactive Architecture Spec Box */}
                <div className="lg:col-span-5 bg-slate-900 rounded-xl p-5 border border-slate-800 font-mono text-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-slate-400">
                    <span className="text-emerald-400 flex items-center gap-1.5 font-bold">
                      <Layers className="w-3.5 h-3.5" />
                      SYSTEM ARCHITECTURE
                    </span>
                    <span className="text-[10px] text-slate-500">ID: {project.id}</span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase">Frontend Layer</span>
                      <p className="text-slate-200 mt-0.5">{project.architecture.frontend.join(' • ')}</p>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase">Backend & Logic</span>
                      <p className="text-slate-200 mt-0.5">{project.architecture.backend.join(' • ')}</p>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase">Database & Security</span>
                      <p className="text-slate-200 mt-0.5">{project.architecture.database.join(' • ')}</p>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase">Target Beneficiaries</span>
                      <p className="text-slate-300 mt-0.5 text-[11px]">
                        {project.targetUsers.join(', ')}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded bg-slate-950 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                    <span className="text-emerald-400 font-semibold block mb-1">Business Impact:</span>
                    {project.businessValue}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
