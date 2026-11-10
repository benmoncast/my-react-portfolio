import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldAlert,
} from 'lucide-react';
import { GithubIcon } from '../components/ui/BrandIcons';
import { CASE_STUDIES } from '../config/site';

export const ProjectDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = CASE_STUDIES.find((p) => p.slug === slug);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Top Navigation breadcrumb */}
      <div className="border-b border-slate-800 bg-slate-900/60 sticky top-18 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Case Studies</span>
          </Link>
          <span className="text-xs font-mono text-emerald-400">
            Case Study: {project.id}
          </span>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="py-16 sm:py-20 border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono px-3 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
              {project.type} Specification
            </span>
            <span className="text-xs font-mono text-slate-400">
              {project.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-4xl leading-relaxed">
            {project.tagline}
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 font-semibold text-sm hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/10"
            >
              <span>Request a Similar System</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-sm font-mono transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Article Stream */}
          <main className="lg:col-span-8 space-y-12">
            {/* 1. Problem Statement */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 font-mono">
                <span className="text-rose-400">01.</span>
                <span>The Core Business Problem</span>
              </h2>
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-rose-500/20 text-slate-300 leading-relaxed text-sm space-y-3">
                <p>{project.businessProblem}</p>
                <div className="pt-2 border-t border-slate-800">
                  <span className="text-xs font-mono text-slate-400 block uppercase">
                    Primary Target Users:
                  </span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.targetUsers.map((u, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-200 border border-slate-700"
                      >
                        {u}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Objectives & Solution */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 font-mono">
                <span className="text-emerald-400">02.</span>
                <span>Objectives & Proposed Architecture</span>
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.solution}
              </p>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.objectives.map((obj, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-300">{obj}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. Key Functional Features */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 font-mono">
                <span className="text-emerald-400">03.</span>
                <span>Key Features & Functional Modules</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.keyFeatures.map((feat, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-200"
                  >
                    <div className="font-semibold text-white mb-1 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      Feature {i + 1}
                    </div>
                    {feat}
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Engineering Challenges & Solutions */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 font-mono">
                <span className="text-amber-400">04.</span>
                <span>Technical Challenges Encountered & Resolutions</span>
              </h2>
              <div className="space-y-4">
                {project.challenges.map((challenge, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2"
                  >
                    <div className="flex items-center gap-2 text-xs font-mono text-amber-300">
                      <ShieldAlert className="w-4 h-4" />
                      <span>Challenge #{i + 1}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {challenge}
                    </p>
                    {project.implementationDetails[i] && (
                      <div className="pt-2 text-xs text-emerald-300 border-t border-slate-800">
                        <span className="font-semibold font-mono uppercase text-[10px] text-slate-400 block mb-0.5">
                          Architectural Solution:
                        </span>
                        {project.implementationDetails[i]}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* 5. Business Value & Results Verification */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 font-mono">
                <span className="text-emerald-400">05.</span>
                <span>Business Value & Verification Status</span>
              </h2>
              <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-4">
                <div>
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block">
                    Direct Commercial Benefit
                  </span>
                  <p className="text-sm text-slate-200 mt-1 leading-relaxed">
                    {project.businessValue}
                  </p>
                </div>

                {project.verifiedResults && project.verifiedResults.length > 0 && (
                  <div className="pt-3 border-t border-emerald-500/20">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                      Verified Benchmark Metrics
                    </span>
                    <ul className="mt-2 space-y-1 text-xs text-emerald-300">
                      {project.verifiedResults.map((r, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          </main>

          {/* Right Architecture & Technical Specs Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block">
                  Technical Architecture
                </span>
                <h3 className="text-lg font-bold text-white mt-1">System Blueprint</h3>
              </div>

              {/* Stack breakdown */}
              <div className="space-y-4 font-mono text-xs">
                <div>
                  <span className="text-slate-400 block uppercase text-[10px]">Frontend Stack</span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {project.architecture.frontend.map((item, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 block uppercase text-[10px]">Backend Logic</span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {project.architecture.backend.map((item, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 block uppercase text-[10px]">Database & RLS</span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {project.architecture.database.map((item, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 block uppercase text-[10px]">Hosting & Infra</span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {project.architecture.infra.map((item, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Inquiry Action Callout */}
              <div className="pt-6 border-t border-slate-800 space-y-3">
                <h4 className="text-sm font-semibold text-white">Need a similar solution?</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Benedict can tailor this architecture to your business domain and workflows.
                </p>
                <Link
                  to="/contact"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-semibold text-xs hover:bg-emerald-400 transition-colors"
                >
                  <span>Request Project Scope</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
