import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Target, Sparkles, ArrowRight } from 'lucide-react';

const AboutHero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-100 via-sky-50 to-blue-200/60 py-20 lg:py-24 px-6 ">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-300/30 blur-3xl rounded-full pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-cyan-200/40 blur-2xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto text-center space-y-6">
        
        {/* Top SEO Badge */}
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-300/70 text-blue-900 px-4 py-1 rounded-full text-xs md:text-sm font-semibold tracking-wide shadow-sm">
          <Sparkles size={16} className="text-blue-600" />
          <span>About Skill Checker Assessment Platform</span>
        </div>

        {/* SEO Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
          Empowering Fair & Automated <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-blue-950 via-blue-800 to-cyan-700 bg-clip-text text-transparent">
            Technical Skill Assessment
          </span>
        </h1>

        {/* SEO Subheading */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed font-normal">
          <strong className="text-slate-900">Skill Checker</strong> bridges the gap between hiring managers and talented developers. We streamline recruitment through instant, objective, and automated online examination tools.
        </p>

        {/* SEO Feature Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-slate-800 font-semibold text-xs sm:text-sm pt-2">
          <div className="flex items-center gap-1.5">
            <Target size={16} className="text-blue-700" /> Objective Screening
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={16} className="text-blue-700" /> Secure Evaluation
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
            to="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/90 hover:bg-white text-blue-950 border border-blue-300/80 font-semibold text-base px-7 py-3.5 rounded-xl shadow-sm transition-all duration-200"
          >
            Contact Team
          </Link>
        </div>

      </div>
    </section>
  )
}

export default AboutHero