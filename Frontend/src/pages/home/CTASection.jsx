import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
 
const CTASection = () => {
  return (
    <section className="py-16 px-6 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 text-white border-b border-blue-800">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        
        <div className="inline-flex items-center gap-2 bg-blue-800/60 border border-blue-700/60 text-cyan-300 px-4 py-1.5 rounded-full text-xs md:text-sm font-medium">
          <Sparkles size={16} />
          <span>Ready to Transform Your Assessment Process?</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
          Start Evaluating Technical Skills Today
        </h2>

        <p className="text-blue-200 text-base sm:text-lg max-w-2xl mx-auto">
          Join Skill Checker to experience automated testing, seamless email invitations, and real-time candidate evaluation.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            to="/register"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-blue-950 font-bold px-8 py-3.5 rounded-xl shadow-lg transition active:scale-95"
          >
            Create Free Account <ArrowRight size={18} />
          </Link>
          <Link
            to="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-blue-900/80 hover:bg-blue-800 text-white border border-blue-700 font-semibold px-7 py-3.5 rounded-xl transition"
          >
            Login to Dashboard
          </Link>
        </div>

      </div>
    </section>
  )
}

export default CTASection