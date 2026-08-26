import React from 'react';
import { FilePlus, MailCheck, Award, CheckCircle2 } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      step: '01',
      title: 'Create Assessment',
      description: 'Recruiters choose categories or custom questions to publish a skill test in minutes.',
      icon: <FilePlus size={28} className="text-blue-700" />,
      badge: 'For Recruiters'
    },
    {
      step: '02',
      title: 'Invite Candidates',
      description: 'Send direct, one-click invitation links straight to candidate emails from the dashboard.',
      icon: <MailCheck size={28} className="text-blue-700" />,
      badge: 'Automated Mail'
    },
    {
      step: '03',
      title: 'Instant Evaluation',
      description: 'Candidates take the secure exam, and automated results are immediately generated.',
      icon: <CheckCircle2 size={28} className="text-cyan-600" />,
      badge: 'Auto Score'
    }
  ];

  return (
    <section className="py-20 px-6 bg-white border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Section Title */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-block bg-blue-100 text-blue-900 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            Simple Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How Skill Checker Works
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            A seamless workflow designed to evaluate technical skills accurately with minimal effort.
          </p>
        </div>

        {/* 3-Step Grid */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          
          {steps.map((item, index) => (
            <div 
              key={index} 
              className="bg-slate-50 rounded-2xl p-8 border border-slate-200/80 relative flex flex-col justify-between hover:shadow-md transition-all duration-200"
            >
              <div className="space-y-6">
                
                {/* Header Row: Icon & Step Number */}
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-200">
                    {item.icon}
                  </div>
                  <span className="text-4xl font-black text-slate-200 tracking-wider">
                    {item.step}
                  </span> 
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-blue-800 uppercase tracking-wide">
                    {item.badge}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  )
}

export default HowItWorks