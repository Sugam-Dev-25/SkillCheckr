import React from 'react';
import { UserCheck, GraduationCap, CheckCircle, Mail, BarChart3, Clock, ShieldCheck, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const WhoIsItFor = () => {
  return (
    <section className="py-20 px-6 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Designed for Both Recruiters & Job Seekers
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Whether you want to hire top talent efficiently or validate your technical skill set, Skill Checker provides all the tools you need.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Recruiter Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-blue-100 hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-900 to-blue-700" />
            
            <div className="space-y-6">
              <div className="inline-flex items-center justify-center p-3.5 bg-blue-100 text-blue-900 rounded-xl">
                <UserCheck size={28} />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-slate-900">For Recruiters & HRs</h3>
                <p className="text-slate-600 text-sm mt-1">Streamline your hiring process with custom skills assessment.</p>
              </div>

              <ul className="space-y-3 text-slate-700 text-sm">
                <li className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Create Custom Tests:</strong> Build screening assessments tailored to specific job roles.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail size={18} className="text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>One-Click Invites:</strong> Send test links directly to candidates' emails.</span>
                </li>
                <li className="flex items-start gap-3">
                  <BarChart3 size={18} className="text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Automated Analytics:</strong> View detailed candidate performance and skill breakdown instantly.</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <Link
                to="/register"
                className="inline-flex items-center justify-center w-full py-3 bg-blue-900 hover:bg-blue-950 text-white font-semibold rounded-xl text-sm transition"
              >
                Start Hiring Efficiently
              </Link>
            </div>
          </div>

          {/* Candidate Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-cyan-100 hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-cyan-600 to-blue-600" />
            
            <div className="space-y-6">
              <div className="inline-flex items-center justify-center p-3.5 bg-cyan-100 text-cyan-900 rounded-xl">
                <GraduationCap size={28} />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900">For Candidates & Students</h3>
                <p className="text-slate-600 text-sm mt-1">Showcase your skills and earn verified assessment scores.</p>
              </div>

              <ul className="space-y-3 text-slate-700 text-sm">
                <li className="flex items-start gap-3">
                  <Clock size={18} className="text-cyan-600 shrink-0 mt-0.5" />
                  <span><strong>Instant Evaluation:</strong> Get automated results right after completing the assessment.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck size={18} className="text-cyan-600 shrink-0 mt-0.5" />
                  <span><strong>Secure Exam Environment:</strong> Dedicated portal designed for fair online testing.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Award size={18} className="text-cyan-600 shrink-0 mt-0.5" />
                  <span><strong>Skill Proof:</strong> Stand out to recruiters with verified skill scores.</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <Link
                to="/register"
                className="inline-flex items-center justify-center w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-xl text-sm transition"
              >
                Take a Test Now
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default WhoIsItFor