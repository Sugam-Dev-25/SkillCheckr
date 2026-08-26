import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

const HeroBanner = () => {
  return (
   <section className="relative overflow-hidden bg-gradient-to-br from-blue-100 via-sky-50 to-blue-200/60 py-20 lg:py-28 px-6 border-b border-blue-200/50">
      
      {/* Background Glows for Vibrant Light-Blue Look */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-300/30 blur-3xl rounded-full pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-80 h-80 bg-cyan-200/40 blur-2xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto text-center space-y-8">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-300/70 text-blue-900 px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold tracking-wide shadow-sm">
          <Zap size={16} className="text-blue-600" />
          <span>Smart Online Skills Assessment & Hiring Platform</span>
        </div>

        {/* SEO Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
          Evaluate Candidate Skills with <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-blue-950 via-blue-800 to-cyan-700 bg-clip-text text-transparent">
            Automated & Smart Testing
          </span>
        </h1>

        {/* Sub Heading */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed font-normal">
          <strong className="text-slate-900">Skill Checker</strong> simplifies hiring and self-assessment. 
          Recruiters can create custom skill tests and invite candidates via secure email links, 
          while candidates can prove their expertise through instant, automated evaluation.
        </p>

        {/* Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-slate-800 font-semibold text-xs sm:text-sm pt-2">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={16} className="text-blue-700" /> Automated Evaluation
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={16} className="text-blue-700" /> One-Click Email Invites
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={16} className="text-blue-700" /> Role-Based Dashboard
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to="/register"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-950 text-white font-semibold text-base px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 border border-blue-800"
          >
            Get Started Free <ArrowRight size={18} />
          </Link>
          <Link
            to="/what-benefits"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/90 hover:bg-white text-blue-950 border border-blue-300/80 font-semibold text-base px-7 py-3.5 rounded-xl shadow-sm transition-all duration-200"
          >
            Explore Benefits
          </Link>
        </div>

      </div>
    </section>
  )
}

export default HeroBanner