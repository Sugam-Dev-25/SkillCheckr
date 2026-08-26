import React from 'react';
import { Sparkles } from 'lucide-react';

const ContactHero = () => {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-white  py-16 px-6 text-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-blue-100/60 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-3xl mx-auto space-y-4 relative z-10">
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-600 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider shadow-sm">
          <Sparkles size={14} />
          <span>Get In Touch</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          We’d Love to <span className="text-blue-600">Hear From You</span>
        </h1>
        
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
          Have questions, feedback, or need assistance with Skill Checker? Drop us a line and we'll respond promptly.
        </p>
      </div>
    </section>
  )
}

export default ContactHero