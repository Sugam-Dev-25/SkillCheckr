import { useState, useEffect } from 'react';
import { getQuestions, createAssessment } from '../../api/recruiterApi';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { 
  FileCheck2, 
  Clock, 
  Award, 
  CheckSquare, 
  Square, 
  PlusCircle, 
  HelpCircle,
  ArrowLeft,
  Search
} from 'lucide-react';

export default function CreateAssessment() {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [form, setForm] = useState({ title: '', durationMinutes: 30, passingMarks: 10 });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getQuestions()
      .then((res) => setQuestions(res.data.data || res.data))
      .catch((err) => console.error('Error fetching questions:', err))
      .finally(() => setLoading(false));
  }, []);

  const toggleSelect = (id) => {
    if (selectedQuestions.includes(id)) {
      setSelectedQuestions(selectedQuestions.filter((qId) => qId !== id));
    } else {
      setSelectedQuestions([...selectedQuestions, id]);
    }
  };

  const selectAllQuestions = () => {
    if (selectedQuestions.length === filteredQuestions.length) {
      setSelectedQuestions([]);
    } else {
      setSelectedQuestions(filteredQuestions.map(q => q._id));
    }
  };

  // সিলেক্ট করা প্রশ্নগুলোর মোট মার্কস হিসাব
  const calculatedTotalMarks = questions
    .filter((q) => selectedQuestions.includes(q._id))
    .reduce((sum, q) => sum + Number(q.marks || 1), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedQuestions.length === 0) return alert('Select at least one question!');

    try {
      const payload = {
        title: form.title,
        durationMinutes: Number(form.durationMinutes),
        passingMarks: Number(form.passingMarks),
        totalMarks: calculatedTotalMarks, // Required field
        questions: selectedQuestions
      };

      await createAssessment(payload);
      alert('Assessment Created Successfully!');
      navigate('/recruiter/dashboard');
    } catch (err) {
      console.error('Failed to create assessment:', err);
      alert(err.response?.data?.message || 'Failed to create assessment');
    }
  };

  const filteredQuestions = questions.filter(q => 
    q.question?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-slate-50/60 p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <button 
              onClick={() => navigate('/recruiter/dashboard')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-900 mb-2 transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to Dashboard</span>
            </button>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Create New Assessment</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Configure assessment details and assign questions from your question bank
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Main Config Form */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 lg:p-8 shadow-sm space-y-6">
            
            {/* Assessment Title */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Assessment Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full pl-4 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-800 outline-none transition-all duration-200 font-medium text-slate-800 placeholder:text-slate-400"
                placeholder="e.g. Senior Frontend Developer Assessment"
              />
            </div>

            {/* Time & Marks Configuration */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Duration (Minutes) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    required
                    value={form.durationMinutes}
                    onChange={(e) => setForm({ ...form, durationMinutes: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-800 outline-none transition-all duration-200 font-medium text-slate-800"
                  />
                  <Clock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Passing Marks <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    required
                    value={form.passingMarks}
                    onChange={(e) => setForm({ ...form, passingMarks: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-800 outline-none transition-all duration-200 font-medium text-slate-800"
                  />
                  <Award size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Calculated Total Marks
                </label>
                <div className="relative">
                  <input
                    type="number"
                    disabled
                    value={calculatedTotalMarks}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-blue-50/60 border border-blue-100 rounded-xl font-bold text-blue-900 cursor-not-allowed"
                  />
                  <FileCheck2 size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-700 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Question Selection Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            
            {/* Header / Search Controls */}
            <div className="p-5 bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <HelpCircle size={18} className="text-cyan-400" />
                <h3 className="text-sm font-bold tracking-wide uppercase">Select Questions</h3>
                <span className="text-[11px] font-extrabold bg-slate-800 text-cyan-300 px-2.5 py-0.5 rounded-full border border-slate-700">
                  {selectedQuestions.length} Selected
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-60">
                  <input
                    type="text"
                    placeholder="Search question..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-400"
                  />
                  <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>

                {filteredQuestions.length > 0 && (
                  <button
                    type="button"
                    onClick={selectAllQuestions}
                    className="text-xs font-bold text-cyan-400 hover:underline shrink-0"
                  >
                    {selectedQuestions.length === filteredQuestions.length ? 'Deselect All' : 'Select All'}
                  </button>
                )}
              </div>
            </div>

            {/* Questions Checkbox List */}
            <div className="p-4 max-h-80 overflow-y-auto divide-y divide-slate-100">
              {questions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-xs text-slate-500 font-medium">
                    No questions available. Please add questions to the Question Bank first.
                  </p>
                </div>
              ) : filteredQuestions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-xs text-slate-400 font-medium">
                    No matching questions found for "{searchTerm}".
                  </p>
                </div>
              ) : (
                filteredQuestions.map((q) => {
                  const isSelected = selectedQuestions.includes(q._id);
                  return (
                    <label
                      key={q._id}
                      onClick={() => toggleSelect(q._id)}
                      className={`flex items-center justify-between gap-4 p-3.5 rounded-xl cursor-pointer transition-colors ${
                        isSelected 
                          ? 'bg-blue-50/50 border border-blue-200/60 my-1' 
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {isSelected ? (
                          <CheckSquare size={18} className="text-blue-800 shrink-0" />
                        ) : (
                          <Square size={18} className="text-slate-300 shrink-0" />
                        )}
                        <span className={`text-xs font-semibold ${isSelected ? 'text-blue-950 font-bold' : 'text-slate-700'}`}>
                          {q.question}
                        </span>
                      </div>
                      
                      <span className="shrink-0 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                        {q.marks || 1} {q.marks > 1 ? 'Marks' : 'Mark'}
                      </span>
                    </label>
                  );
                })
              )}
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-blue-900/15 active:scale-[0.98] transition-all"
            >
              <PlusCircle size={16} className="text-cyan-400" />
              <span>Save Assessment</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}