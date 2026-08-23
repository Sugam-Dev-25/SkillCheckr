import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAssessmentAnalytics } from '../../api/recruiterApi';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { 
  Users, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  ArrowLeft, 
  Search, 
  Mail, 
  Award,
  UserCheck
} from 'lucide-react';

export default function AssessmentAnalytics() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getAssessmentAnalytics(id)
      .then((res) => setData(res.data))
      .catch((err) => console.error('Error fetching analytics:', err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner />;

  const { summary, candidatesData } = data || {};

  const filteredCandidates = candidatesData?.filter((item) => 
    item.candidateId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.candidateId?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50/60 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <button 
              onClick={() => navigate('/recruiter/dashboard')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-900 mb-2 transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to Dashboard</span>
            </button>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Assessment Performance Analytics</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Review overall statistics and individual candidate scores
            </p>
          </div>
        </div>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Total Participants */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Participants</p>
              <p className="text-2xl font-black text-slate-900 mt-1">{summary?.totalCandidates || 0}</p>
            </div>
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700">
              <Users size={22} />
            </div>
          </div>

          {/* Passed */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">Passed</p>
              <p className="text-2xl font-black text-emerald-700 mt-1">{summary?.passedCount || 0}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 border border-emerald-100">
              <CheckCircle2 size={22} />
            </div>
          </div>

          {/* Failed */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-rose-500">Failed</p>
              <p className="text-2xl font-black text-rose-600 mt-1">{summary?.failedCount || 0}</p>
            </div>
            <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600 border border-rose-100">
              <XCircle size={22} />
            </div>
          </div>

          {/* Pass Rate */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-900">Pass Rate</p>
              <p className="text-2xl font-black text-blue-950 mt-1">{summary?.passRate || '0%'}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-800 border border-blue-100">
              <TrendingUp size={22} />
            </div>
          </div>

        </div>

        {/* Candidate Results Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          
          {/* Table Header Controls */}
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <UserCheck size={18} className="text-blue-800" />
              <span>Candidate Breakdown</span>
            </h3>

            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search candidate by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-800 outline-none font-medium text-slate-800"
              />
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          {/* Table Body */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-6">Candidate</th>
                  <th className="py-3.5 px-6">Email</th>
                  <th className="py-3.5 px-6 text-center">Score</th>
                  <th className="py-3.5 px-6 text-right">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                {filteredCandidates && filteredCandidates.length > 0 ? (
                  filteredCandidates.map((item) => {
                    const name = item.candidateId?.name || 'Unknown Candidate';
                    const email = item.candidateId?.email || 'N/A';
                    
                    return (
                      <tr key={item._id} className="hover:bg-slate-50/60 transition-colors">
                        
                        {/* Name + Avatar */}
                        <td className="py-4 px-6 font-bold text-slate-900">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-900 font-black text-xs flex items-center justify-center shrink-0">
                              {name.charAt(0).toUpperCase()}
                            </div>
                            <span>{name}</span>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="py-4 px-6 text-slate-500">
                          <div className="flex items-center gap-1.5">
                            <Mail size={14} className="text-slate-400 shrink-0" />
                            <span>{email}</span>
                          </div>
                        </td>

                        {/* Score */}
                        <td className="py-4 px-6 text-center">
                          <span className="inline-flex items-center gap-1 font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200/60">
                            <Award size={13} className="text-slate-500" />
                            {item.score} / {item.totalMarks}
                          </span>
                        </td>

                        {/* Result Badge */}
                        <td className="py-4 px-6 text-right">
                          {item.isPassed ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-lg">
                              <CheckCircle2 size={13} className="text-emerald-600" />
                              PASSED
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-rose-800 bg-rose-50 border border-rose-200/80 px-2.5 py-1 rounded-lg">
                              <XCircle size={13} className="text-rose-600" />
                              FAILED
                            </span>
                          )}
                        </td>

                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-400 font-medium">
                      No candidates found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </div>
  );
}