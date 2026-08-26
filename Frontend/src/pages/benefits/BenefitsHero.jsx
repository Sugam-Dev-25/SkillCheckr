import React from 'react';
import { Award } from 'lucide-react';

const BenefitsHero = () => {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-white  py-16 px-6 text-center relative overflow-hidden">
      {/* Subtle Glow Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-blue-100/60 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto space-y-4 relative z-10">
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-600 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider shadow-sm">
          <Award size={14} />
          <span>Platform Advantages</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Unlock Your Full Potential with <span className="text-blue-600">Skill Checker</span>
        </h1>

        <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          Explore how automated evaluations, real-world testing environments, and instant feedback transform your skill assessment experience.
        </p>
      </div>
    </section>
  )
}

export default BenefitsHero