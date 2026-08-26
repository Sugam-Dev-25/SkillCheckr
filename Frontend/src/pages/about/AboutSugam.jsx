import React from "react";
import { Code2, Sparkles, ShieldCheck, Heart } from "lucide-react";
import devImage from "../../assets/Sugam.png";

const AboutSugam = () => {
  return (
    <section className="py-20 px-6 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          {/* Left Column: Clean Developer Card Frame */}
          <div className="md:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden bg-slate-800 border border-slate-700/80 shadow-2xl group">
              {/* Image Container with Top-Focus Aspect Ratio */}
              <div className="w-full h-[480px] sm:h-[420px] bg-slate-800 overflow-hidden relative">
                <img
                  src={devImage}
                  alt="Sugam Karmakar"
                  className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              </div>

              {/* Card Footer overlay */}
              <div className="absolute bottom-0 inset-x-0 p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white tracking-wide">
                      Sugam Karmakar
                    </h3>
                    <p className="text-sm font-medium text-cyan-400 flex items-center gap-1.5 pt-0.5">
                      Full-Stack Developer
                    </p>
                  </div>
                  <span className="bg-blue-600/20 border border-blue-500/40 text-blue-300 text-xs px-3 py-1 rounded-full font-semibold">
                    5+ Yrs Exp
                  </span>
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[
                    "React.js",
                    "Node.js",
                    "Tailwind",
                    "WordPress",
                    "Shopify",
                    "MySQL",
                    "MongoDB",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="text-xs bg-slate-900/80 text-slate-300 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-700/60"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="md:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 text-cyan-400 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Code2 size={16} />
              <span>Meet The Developer</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Driven by Passion, Built for <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Practical Skill Growth
              </span>
            </h2>

            <p className="text-slate-300 text-base leading-relaxed">
              Hello! I’m <strong>Sugam Karmakar</strong>. Over the past{" "}
              <strong>5+ years</strong>, I’ve been crafting web software,
              enterprise applications, and modern user experiences.
            </p>

            <p className="text-slate-300 text-base leading-relaxed">
              I built <strong>Skill Checker</strong> to give learners a
              real-world testing arena—allowing candidates to evaluate their
              skills effectively while letting me continuously refine scalable
              full-stack applications.
            </p>

            <p className="text-slate-300 text-base leading-relaxed">
            
                The tests hosted here are crafted for genuine skill validation
                and self-growth. While certificates earned may not replace
                traditional credentials, their real power lies in <strong>identifying
                weak spots, tracking actual progress, and building confidence</strong>
                for real-world interviews.
            
            </p>

            {/* Certificate Clarification Box */}
            {/* <div className="bg-slate-800/80 border border-amber-500/30 rounded-2xl p-5 space-y-2 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500" />
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <ShieldCheck size={18} />
                <span>An Honest Note on Assessment Value</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-0.5">
                The tests hosted here are crafted for genuine skill validation and self-growth. While certificates earned may not replace traditional credentials, their real power lies in <strong>identifying weak spots, tracking actual progress, and building confidence</strong> for real-world interviews.
              </p>
            </div> */}

            {/* Bottom Highlights */}
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 bg-slate-800/40 p-3.5 rounded-xl border border-slate-800">
                <Sparkles size={20} className="text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">For Learners</h4>
                  <p className="text-xs text-slate-400">
                    Practical test environments to measure readiness.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-slate-800/40 p-3.5 rounded-xl border border-slate-800">
                <Heart size={20} className="text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Mutual Growth
                  </h4>
                  <p className="text-xs text-slate-400">
                    Growing together through real hands-on projects.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSugam;
