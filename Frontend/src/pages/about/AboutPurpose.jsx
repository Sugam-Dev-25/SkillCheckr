import React from 'react';
import { Target, Zap, ShieldCheck, Users, Award } from 'lucide-react';

const AboutPurpose = () => {
  return (
    <section className="py-20 px-6 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Story */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 text-blue-900 font-bold">
            <Target size={24} className="text-cyan-600" />
            <span className="text-xl">Our Purpose</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Making Technical Screening Smarter & Faster
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Traditional hiring often involves endless resume screening and manual testing. <strong>Skill Checker</strong> was built to automate this entire process.
          </p>
          <p className="text-slate-600 leading-relaxed">
            We provide recruiters with a streamlined way to create, distribute, and grade technical assessments—while offering candidates a fair platform to demonstrate their true capabilities.
          </p>
        </div>

        {/* Right Side: 2x2 Feature Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <Zap size={28} className="text-blue-700" />
            <h3 className="font-bold text-slate-900">Instant Results</h3>
            <p className="text-xs text-slate-500">Automated grading right after test submission.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <ShieldCheck size={28} className="text-cyan-600" />
            <h3 className="font-bold text-slate-900">Secure Testing</h3>
            <p className="text-xs text-slate-500">Dedicated environment for integrity.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <Users size={28} className="text-cyan-600" />
            <h3 className="font-bold text-slate-900">Role Access</h3>
            <p className="text-xs text-slate-500">Tailored portals for HR & Candidates.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <Award size={28} className="text-blue-700" />
            <h3 className="font-bold text-slate-900">Verified Scores</h3>
            <p className="text-xs text-slate-500">Accurate skill evaluation metrics.</p>
          </div>
        </div>

      </div>
    </section>
  )
}

export default AboutPurpose