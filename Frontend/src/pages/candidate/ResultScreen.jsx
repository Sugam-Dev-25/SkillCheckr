import { useLocation, useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  XCircle, 
  Award, 
  ArrowRight, 
  LayoutDashboard, 
  HelpCircle,
  Sparkles
} from 'lucide-react';

export default function ResultScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  if (!result) {
    return (
      <div className="min-h-screen bg-slate-50/60 p-6 flex items-center justify-center">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-8 max-w-md w-full text-center shadow-sm">
          <HelpCircle size={40} className="mx-auto text-slate-300 mb-3" />
          <h2 className="text-lg font-bold text-slate-800">No Result Data Available</h2>
          <p className="text-xs text-slate-500 font-medium mt-1 mb-6">
            We couldn't find any recent test attempt information.
          </p>
          <button
            onClick={() => navigate('/candidate/dashboard')}
            className="w-full py-2.5 px-4 bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <LayoutDashboard size={15} />
            <span>Go to Dashboard</span>
          </button>
        </div>
      </div>
    );
  }

  const percentage = Math.round((result.score / result.totalMarks) * 100) || 0;

  return (
    <div className="min-h-screen bg-slate-50/60 p-6 flex items-center justify-center">
      <div className="bg-white border border-slate-200/80 rounded-3xl p-8 max-w-md w-full shadow-md text-center space-y-6">
        
        {/* Result Header Badge */}
        <div className="space-y-3">
          <div className="inline-flex p-3 rounded-2xl bg-slate-50 border border-slate-100 shadow-inner">
            {result.isPassed ? (
              <div className="w-16 h-16 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
                <CheckCircle2 size={36} />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center">
                <XCircle size={36} />
              </div>
            )}
          </div>

          <div>
            <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">
              <Sparkles size={12} className="text-amber-500" />
              Assessment Complete
            </span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {result.isPassed ? 'Congratulations!' : 'Better Luck Next Time'}
            </h1>
          </div>
        </div>

        {/* Status Callout */}
        <div className={`p-4 rounded-2xl border text-sm font-extrabold flex items-center justify-center gap-2 ${
          result.isPassed 
            ? 'bg-emerald-50 text-emerald-800 border-emerald-200/80' 
            : 'bg-rose-50 text-rose-800 border-rose-200/80'
        }`}>
          {result.isPassed ? (
            <>
              <CheckCircle2 size={18} className="text-emerald-600" />
              <span>PASSED THE ASSESSMENT</span>
            </>
          ) : (
            <>
              <XCircle size={18} className="text-rose-600" />
              <span>DID NOT PASS</span>
            </>
          )}
        </div>

        {/* Score Display Card */}
        <div className="bg-slate-50/80 p-6 rounded-2xl border border-slate-100 space-y-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Final Score Secured</p>
          
          <div className="flex items-center justify-center gap-2 text-slate-900">
            <Award size={28} className={result.isPassed ? 'text-amber-500' : 'text-slate-400'} />
            <span className="text-4xl font-black">{result.score}</span>
            <span className="text-xl font-bold text-slate-400">/ {result.totalMarks}</span>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5 pt-2">
            <div className="flex justify-between text-[11px] font-bold text-slate-500">
              <span>Overall Score</span>
              <span>{percentage}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${
                  result.isPassed ? 'bg-emerald-500' : 'bg-rose-500'
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Navigation Action */}
        <button
          onClick={() => navigate('/candidate/dashboard')}
          className="w-full py-3 px-6 bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs rounded-xl shadow-sm hover:shadow transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <span>Back to Candidate Dashboard</span>
          <ArrowRight size={15} />
        </button>

      </div>
    </div>
  );
}