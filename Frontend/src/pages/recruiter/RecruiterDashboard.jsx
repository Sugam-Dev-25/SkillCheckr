import { useState, useEffect } from 'react';
import { getAssessments, publishAssessment } from '../../api/recruiterApi';
import { useNavigate } from 'react-router-dom';
import InviteModal from '../../components/recruiter/InviteModal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { 
  PlusCircle, 
  Clock, 
  Award, 
  Send, 
  BarChart3, 
  Globe2, 
  FileEdit, 
  Search,
  CheckCircle2,
  FileText
} from 'lucide-react';

export default function RecruiterDashboard() {
  const [assessments, setAssessments] = useState([]);
  const [selectedForInvite, setSelectedForInvite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, published, draft
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await getAssessments();
      setAssessments(res.data.data || res.data);
    } catch (err) {
      console.error('Failed to load assessments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handlePublish = async (id) => {
    try {
      await publishAssessment(id);
      alert('Assessment published successfully!');
      loadData();
    } catch (err) {
      console.error('Failed to publish assessment:', err);
      alert(err.response?.data?.message || 'Failed to publish assessment');
    }
  };

  // Filter & Search Logic
  const filteredAssessments = assessments.filter((a) => {
    const isPublished = a.status === 'published' || a.isPublished === true;
    const matchesSearch = a.title?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'published') return matchesSearch && isPublished;
    if (filter === 'draft') return matchesSearch && !isPublished;
    return matchesSearch;
  });

  const totalPublished = assessments.filter(a => a.status === 'published' || a.isPublished === true).length;
  const totalDrafts = assessments.length - totalPublished;

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-slate-50/60 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Recruiter Dashboard</h1>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Manage your skill assessments, invite candidates, and track performance
            </p>
          </div>
          <button
            onClick={() => navigate('/recruiter/create-assessment')}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-blue-900/10 active:scale-95 transition-all"
          >
            <PlusCircle size={18} className="text-cyan-400" />
            <span>Create Assessment</span>
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-800 rounded-xl">
              <FileText size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Tests</p>
              <h3 className="text-2xl font-black text-slate-800">{assessments.length}</h3>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <Globe2 size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Published</p>
              <h3 className="text-2xl font-black text-slate-800">{totalPublished}</h3>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <FileEdit size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Drafts</p>
              <h3 className="text-2xl font-black text-slate-800">{totalDrafts}</h3>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search assessments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-800 outline-none font-medium text-slate-800 placeholder:text-slate-400"
            />
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {['all', 'published', 'draft'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                  filter === type
                    ? 'bg-blue-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Assessments Card List */}
        {filteredAssessments.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center">
            <FileText size={40} className="mx-auto text-slate-300 mb-3" />
            <h3 className="text-base font-bold text-slate-700">No assessments found</h3>
            <p className="text-xs text-slate-400 mt-1">Try tweaking your search or filter options</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssessments.map((a) => {
              const isPublished = a.status === 'published' || a.isPublished === true;

              return (
                <div 
                  key={a._id} 
                  className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Title & Status Badge */}
                    <div className="flex justify-between items-start gap-3 mb-3">
                      <h3 className="text-base font-bold text-slate-800 line-clamp-2">{a.title}</h3>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shrink-0 flex items-center gap-1 ${
                        isPublished 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' 
                          : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isPublished ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                        {isPublished ? 'Published' : 'Draft'}
                      </span>
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-6 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} className="text-slate-400" />
                        <span>{a.durationMinutes || 0} mins</span>
                      </div>
                      <div className="w-px h-3 bg-slate-200" />
                      <div className="flex items-center gap-1.5">
                        <Award size={14} className="text-slate-400" />
                        <span>Pass: {a.passingMarks || 0} marks</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                    {!isPublished && (
                      <button
                        onClick={() => handlePublish(a._id)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-3 rounded-xl text-xs font-bold transition-all"
                      >
                        <CheckCircle2 size={14} />
                        <span>Publish</span>
                      </button>
                    )}

                    <button
                      onClick={() => setSelectedForInvite(a)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-blue-900 hover:bg-blue-800 text-white py-2 px-3 rounded-xl text-xs font-bold transition-all"
                    >
                      <Send size={14} className="text-cyan-400" />
                      <span>Invite</span>
                    </button>

                    <button
                      onClick={() => navigate(`/recruiter/analytics/${a._id}`)}
                      className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
                      title="View Analytics"
                    >
                      <BarChart3 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Invite Modal */}
        {selectedForInvite && (
          <InviteModal 
            assessment={selectedForInvite} 
            onClose={() => setSelectedForInvite(null)} 
          />
        )}

      </div>
    </div>
  );
}