import { useState, useEffect } from 'react';
import { getMyResults, downloadCertificate } from '../../api/candidateApi';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  Download, 
  FileCheck, 
  Search,
  BookOpen,
  Calendar
} from 'lucide-react';

export default function CandidateDashboard() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getMyResults()
      .then((res) => setResults(res.data.data || res.data))
      .catch((err) => console.error('Error fetching results:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleDownload = async (attemptId) => {
    try {
      setDownloadingId(attemptId);
      const res = await downloadCertificate(attemptId);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Certificate_${attemptId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Failed to download certificate:', err);
      alert('Failed to download certificate. Please try again.');
    } finally {
      setDownloadingId(null);
    }
  };

  if (loading) return <LoadingSpinner />;

  // Overview Quick Stats
  const totalAttempts = results.length;
  const passedAttempts = results.filter((r) => r.isPassed).length;
  const failedAttempts = totalAttempts - passedAttempts;

  const filteredResults = results.filter((r) => 
    r.assessmentId?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50/60 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Title */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Candidate Dashboard</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              View your completed assessments, scores, and download certificates
            </p>
          </div>
        </div>

        {/* Overview Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Exams Taken</p>
              <p className="text-2xl font-black text-slate-900 mt-1">{totalAttempts}</p>
            </div>
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700">
              <BookOpen size={22} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">Passed</p>
              <p className="text-2xl font-black text-emerald-700 mt-1">{passedAttempts}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 border border-emerald-100">
              <CheckCircle2 size={22} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-rose-500">Failed</p>
              <p className="text-2xl font-black text-rose-600 mt-1">{failedAttempts}</p>
            </div>
            <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600 border border-rose-100">
              <XCircle size={22} />
            </div>
          </div>
        </div>

        {/* Results Table Section */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          
          {/* Header Controls */}
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileCheck size={18} className="text-blue-800" />
              <span>Assessment Results</span>
            </h3>

            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search assessment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-800 outline-none font-medium text-slate-800"
              />
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-6">Assessment</th>
                  <th className="py-3.5 px-6 text-center">Score</th>
                  <th className="py-3.5 px-6 text-center">Status</th>
                  <th className="py-3.5 px-6 text-right">Certificate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                {filteredResults && filteredResults.length > 0 ? (
                  filteredResults.map((r) => {
                    const title = r.assessmentId?.title || 'Assessment';
                    
                    return (
                      <tr key={r._id} className="hover:bg-slate-50/60 transition-colors">
                        
                        {/* Title */}
                        <td className="py-4 px-6 font-bold text-slate-900">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center shrink-0 border border-blue-100">
                              <BookOpen size={15} />
                            </div>
                            <span>{title}</span>
                          </div>
                        </td>

                        {/* Score */}
                        <td className="py-4 px-6 text-center">
                          <span className="inline-flex items-center gap-1 font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200/60">
                            <Award size={13} className="text-slate-500" />
                            {r.score} / {r.totalMarks}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="py-4 px-6 text-center">
                          {r.isPassed ? (
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

                        {/* Certificate Action */}
                        <td className="py-4 px-6 text-right">
                          {r.isPassed ? (
                            <button
                              onClick={() => handleDownload(r._id)}
                              disabled={downloadingId === r._id}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200/80 rounded-xl font-bold text-xs transition-all active:scale-95 disabled:opacity-50"
                            >
                              <Download size={13} className="text-blue-800" />
                              <span>{downloadingId === r._id ? 'Downloading...' : 'Download PDF'}</span>
                            </button>
                          ) : (
                            <span className="text-xs font-semibold text-slate-400 italic">Not Eligible</span>
                          )}
                        </td>

                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-400 font-medium">
                      No assessment records found.
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