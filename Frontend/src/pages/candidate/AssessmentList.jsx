import { useState, useEffect } from 'react';
import { getPublicAssessments } from '../../api/candidateApi';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { 
  Clock, 
  ArrowRight, 
  Search, 
  BookOpenCheck, 
  HelpCircle,
  Award
} from 'lucide-react';

export default function AssessmentList() {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getPublicAssessments()
      .then((res) => setAssessments(res.data.data || res.data))
      .catch((err) => console.error('Error fetching assessments:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  const filteredAssessments = assessments.filter((a) =>
    a.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50/60 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header & Search Bar */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Available Assessments</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Select an assessment below to test your skills and earn certificates
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search available assessments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-800 outline-none font-medium text-slate-800 transition-all"
            />
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        {/* Assessment Cards Grid */}
        {filteredAssessments && filteredAssessments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssessments.map((a) => (
              <div 
                key={a._id} 
                className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  
                  {/* Category / Icon Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 border border-blue-100 flex items-center justify-center font-bold">
                      <BookOpenCheck size={20} />
                    </div>
                    {a.passingPercentage && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200/60">
                        <Award size={13} className="text-blue-800" />
                        {a.passingPercentage}% Pass Rate
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors line-clamp-1">
                      {a.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-1 line-clamp-2 leading-relaxed">
                      {a.description || 'Test your knowledge and earn a verified certificate upon passing.'}
                    </p>
                  </div>

                  {/* Meta Tags */}
                  <div className="flex items-center gap-4 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                      <Clock size={14} className="text-slate-400" />
                      <span>{a.durationMinutes} mins</span>
                    </div>

                    {a.questions?.length > 0 && (
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                        <HelpCircle size={14} className="text-slate-400" />
                        <span>{a.questions.length} Questions</span>
                      </div>
                    )}
                  </div>

                </div>

                {/* Start Button */}
                <button
                  onClick={() => navigate(`/assessment/start/${a._id}`)}
                  className="mt-6 w-full py-2.5 px-4 bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs rounded-xl shadow-sm hover:shadow transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <span>Start Test</span>
                  <ArrowRight size={15} />
                </button>

              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center">
            <BookOpenCheck size={40} className="mx-auto text-slate-300 mb-3" />
            <h3 className="text-base font-bold text-slate-700">No assessments found</h3>
            <p className="text-xs text-slate-400 font-medium mt-1">
              Try adjusting your search query or check back later for new tests.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}