import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const AboutValues = () => {
  return (
    <section className="bg-white py-20 px-6 border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-extrabold text-slate-900">Why Choose Skill Checker?</h2>
          <p className="text-slate-600">Built with modern web technologies for reliability and speed.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-3 p-6 bg-slate-50 rounded-2xl border border-slate-200/80">
            <CheckCircle2 size={24} className="text-blue-700" />
            <h3 className="text-lg font-bold text-slate-900">One-Click Invitation</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Send direct email assessments to candidates instantly with custom, auto-generated examination links.
            </p>
          </div>
          <div className="space-y-3 p-6 bg-slate-50 rounded-2xl border border-slate-200/80">
            <CheckCircle2 size={24} className="text-blue-700" />
            <h3 className="text-lg font-bold text-slate-900">Centralized Analytics</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Recruiters get a bird's-eye view of all test scores, detailed analytics, and candidate performance.
            </p>
          </div>
          <div className="space-y-3 p-6 bg-slate-50 rounded-2xl border border-slate-200/80">
            <CheckCircle2 size={24} className="text-blue-700" />
            <h3 className="text-lg font-bold text-slate-900">Seamless Candidate Flow</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Candidates experience a clean, distraction-free environment to attempt their exams smoothly.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutValues