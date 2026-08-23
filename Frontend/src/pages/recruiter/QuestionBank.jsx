import { useState, useEffect } from 'react';
import { getQuestions, createQuestion, getRecruiterCategories } from '../../api/recruiterApi';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { 
  HelpCircle, 
  PlusCircle, 
  FolderCheck, 
  Award, 
  CheckCircle2, 
  ListOrdered,
  FileQuestion,
  Search
} from 'lucide-react';

export default function QuestionBank() {
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const [form, setForm] = useState({
    question: '',
    type: 'mcq',
    options: ['', '', '', ''],
    correctAnswer: '',
    category: '',
    marks: 1
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const qRes = await getQuestions();
      setQuestions(qRes.data.data || qRes.data);
    } catch (err) {
      console.error('Failed to load questions:', err);
    }

    try {
      // adminApi-এর বদলে recruiterApi-এর getRecruiterCategories কল করা হলো
      const cRes = await getRecruiterCategories();
      setCategories(cRes.data.data || cRes.data);
    } catch (err) {
      console.error('Failed to load categories:', err);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOptionChange = (idx, val) => {
    const opts = [...form.options];
    opts[idx] = val;
    setForm({ ...form, options: opts });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      question: form.question,
      type: form.type || 'mcq',
      options: form.options,
      correctAnswer: form.correctAnswer,
      marks: Number(form.marks)
    };

    if (form.category && form.category.trim() !== '') {
      payload.categoryId = form.category;
    }

    try {
      await createQuestion(payload);
      alert('Question Saved Successfully!');
      setForm({
        question: '',
        type: 'mcq',
        options: ['', '', '', ''],
        correctAnswer: '',
        category: '',
        marks: 1
      });
      loadData();
    } catch (err) {
      console.error('Failed to create question:', err.response?.data || err);
      alert(err.response?.data?.message || 'Failed to save question');
    }
  };

  const filteredQuestions = questions.filter(q => 
    q.question?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-slate-50/60 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Question Bank</h1>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Create and manage multiple-choice questions for your assessment tests
            </p>
          </div>
          <div className="flex items-center gap-2 bg-blue-50 text-blue-900 px-4 py-2 rounded-xl border border-blue-100">
            <HelpCircle size={18} className="text-blue-700" />
            <span className="text-xs font-bold">{questions.length} Total Questions</span>
          </div>
        </div>

        {/* Add Question Form Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="bg-slate-900 text-white p-5 px-6 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <PlusCircle size={20} className="text-cyan-400" />
              <h2 className="text-sm font-bold tracking-wide uppercase">Add New MCQ</h2>
            </div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest bg-slate-800 text-cyan-400 px-3 py-1 rounded-full border border-slate-700">
              Multiple Choice
            </span>
          </div>

          <form onSubmit={handleSubmit} className="p-6 lg:p-8 space-y-6">
            
            {/* Question Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Question Title
              </label>
              <input
                type="text"
                required
                value={form.question}
                onChange={(e) => setForm({ ...form, question: e.target.value })}
                className="w-full pl-4 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-800 focus:border-blue-800 outline-none transition-all duration-200 font-medium text-slate-800 placeholder:text-slate-400"
                placeholder="Enter your question title here..."
              />
            </div>

            {/* Options Grid */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Options
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {form.options.map((opt, i) => (
                  <div key={i} className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400 w-5">
                      #{i + 1}
                    </span>
                    <input
                      type="text"
                      required
                      value={opt}
                      onChange={(e) => handleOptionChange(i, e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-800 focus:border-blue-800 outline-none transition-all duration-200 font-medium text-slate-800 placeholder:text-slate-400"
                      placeholder={`Option ${i + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Config Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Correct Answer
                </label>
                <div className="relative">
                  <select
                    required
                    value={form.correctAnswer}
                    onChange={(e) => setForm({ ...form, correctAnswer: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-800 focus:border-blue-800 outline-none transition-all duration-200 font-medium text-slate-800 appearance-none"
                  >
                    <option value="">Select Option</option>
                    {form.options.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt || `Option ${i + 1}`}
                      </option>
                    ))}
                  </select>
                  <CheckCircle2 size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Category
                </label>
                <div className="relative">
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-800 focus:border-blue-800 outline-none transition-all duration-200 font-medium text-slate-800 appearance-none"
                  >
                    <option value="">Select Category (Optional)</option>
                    {categories.map((c) => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                  <FolderCheck size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Marks
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    value={form.marks}
                    onChange={(e) => setForm({ ...form, marks: Number(e.target.value) })}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-800 focus:border-blue-800 outline-none transition-all duration-200 font-medium text-slate-800"
                  />
                  <Award size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-blue-900/15 active:scale-[0.98] transition-all"
              >
                <PlusCircle size={16} className="text-cyan-400" />
                <span>Save Question</span>
              </button>
            </div>
          </form>
        </div>

        {/* Existing Questions List */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ListOrdered size={20} className="text-blue-800" />
              <span>Questions List</span>
            </h3>
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-800 outline-none font-medium text-slate-800"
              />
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          {filteredQuestions.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center">
              <FileQuestion size={40} className="mx-auto text-slate-300 mb-3" />
              <h3 className="text-base font-bold text-slate-700">No questions available</h3>
              <p className="text-xs text-slate-400 mt-1">Start by adding a new question using the form above</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredQuestions.map((q) => (
                <div 
                  key={q._id} 
                  className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="text-sm font-bold text-slate-800 leading-snug">
                      {q.question}
                    </h4>
                    <span className="shrink-0 inline-flex items-center gap-1 text-[11px] font-extrabold text-blue-900 bg-blue-50 border border-blue-200/60 px-2.5 py-1 rounded-lg">
                      <Award size={13} className="text-blue-700" />
                      {q.marks} Marks
                    </span>
                  </div>

                  {/* Correct Answer Display */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-emerald-700 font-bold flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                      <CheckCircle2 size={15} className="text-emerald-600" />
                      Correct Answer: {q.correctAnswer}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}