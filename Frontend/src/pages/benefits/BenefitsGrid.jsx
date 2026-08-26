import React from 'react';
import { Target, BarChart3, ShieldCheck, Zap, Laptop, Trophy } from 'lucide-react';

const BenefitsGrid = () => {
    const benefitsData = [
  {
    icon: Target,
    title: "Practical Skill Validation",
    description: "Assess real-world coding and technical expertise through practical challenges designed to mirror live workplace requirements."
  },
  {
    icon: BarChart3,
    title: "Instant Weak-Spot Analysis",
    description: "Get detailed automated analytics to pinpoint exact knowledge gaps, helping you focus effort directly where improvement is needed."
  },
  {
    icon: ShieldCheck,
    title: "Verified Skill Badges",
    description: "Earn authentic assessment proof that validates your hands-on proficiency and builds trust for real-world hiring opportunities."
  },
  {
    icon: Zap,
    title: "Automated Instant Feedback",
    description: "Receive instant evaluations without manual waiting time, enabling faster iterations and continuous self-growth."
  },
  {
    icon: Laptop,
    title: "Real-World Tech Stack",
    description: "Test your competence in modern web technologies including React, Node.js, Tailwind CSS, WordPress, and Shopify."
  },
  {
    icon: Trophy,
    title: "Interview Confidence Booster",
    description: "Prepare effectively for high-stakes technical interviews by mastering practical assessment environments beforehand."
  }
];
  return (
    <section className="py-16 px-6 bg-slate-50 ">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Choose <span className="text-blue-600">Skill Checker?</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Discover how automated skill evaluations help candidates sharpen technical expertise and prove real-world readiness.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {benefitsData.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div 
                key={index} 
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center border border-blue-100">
                    <IconComponent size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  )
}

export default BenefitsGrid