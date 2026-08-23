import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { startExam, submitExam } from '../../api/candidateApi';
import confetti from 'canvas-confetti';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { 
  Clock, 
  Send, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle,
  ShieldCheck 
} from 'lucide-react';

export default function ExamScreen() {
  const { assessmentId } = useParams();
  const navigate = useNavigate();

  const [assessment, setAssessment] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    startExam(assessmentId)
      .then((res) => {
        const data = res.data.data || res.data;
        setAssessment(data);
        setTimeLeft(data.durationMinutes * 60);
      })
      .catch((err) => {
        alert(err.response?.data?.message || 'Failed to start exam');
        navigate('/candidate/dashboard');
      })
      .finally(() => setLoading(false));
  }, [assessmentId, navigate]);

  const handleSubmit = useCallback(async () => {
    if (submitting) return;
    setSubmitting(true);

    const formattedAnswers = Object.keys(answers).map((qId) => ({
      questionId: qId,
      selectedAnswer: answers[qId]
    }));

    try {
      const res = await submitExam(assessmentId, { userAnswers: formattedAnswers });
      const result = res.data.result || res.data;

      if (result.isPassed) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }

      navigate('/candidate/results', { state: { result } });
    } catch (err) {
      alert(err.response?.data?.message || 'Error submitting exam');
      setSubmitting(false);
    }
  }, [assessmentId, answers, submitting, navigate]);

  useEffect(() => {
    if (timeLeft <= 0 || submitting) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitting, handleSubmit]);

  if (loading) return <LoadingSpinner />;

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const isTimeCritical = mins < 5;

  const totalQuestions = assessment?.questions?.length || 0;
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="min-h-screen bg-slate-50/70 pb-16">
      
      {/* Sticky Exam Top Bar */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm z-20 px-6 py-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Exam Title & Progress */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 border border-blue-100 flex items-center justify-center shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-slate-900 line-clamp-1">{assessment.title}</h1>
              <p className="text-xs text-slate-500 font-medium">
                Answered <span className="font-bold text-slate-900">{answeredCount}</span> of <span className="font-bold text-slate-900">{totalQuestions}</span> questions
              </p>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-bold font-mono transition-colors ${
            isTimeCritical 
              ? 'bg-rose-50 text-rose-600 border-rose-200 animate-pulse' 
              : 'bg-slate-100 text-slate-800 border-slate-200/80'
          }`}>
            <Clock size={16} className={isTimeCritical ? 'text-rose-600' : 'text-slate-500'} />
            <span>{String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}</span>
          </div>

        </div>
      </div>

      {/* Main Questions Container */}
      <div className="max-w-4xl mx-auto px-6 pt-8 space-y-6">
        
        {assessment.questions.map((q, idx) => {
          const isAnswered = Boolean(answers[q._id]);

          return (
            <div 
              key={q._id} 
              className={`bg-white border rounded-2xl p-6 shadow-sm transition-all ${
                isAnswered ? 'border-blue-200/80 ring-1 ring-blue-100' : 'border-slate-200/80'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start gap-3 mb-5">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <h3 className="font-bold text-slate-900 text-base leading-snug">
                  {q.question}
                </h3>
              </div>

              {/* Options Grid */}
              <div className="space-y-2.5 pl-10">
                {q.options.map((opt, oIdx) => {
                  const isSelected = answers[q._id] === opt;

                  return (
                    <label 
                      key={oIdx} 
                      className={`flex items-center gap-3.5 p-3.5 border rounded-xl cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-blue-50/70 border-blue-900 text-blue-950 font-semibold shadow-sm' 
                          : 'border-slate-200/80 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name={q._id}
                        value={opt}
                        checked={isSelected}
                        onChange={() => setAnswers({ ...answers, [q._id]: opt })}
                        className="w-4 h-4 text-blue-900 border-slate-300 focus:ring-blue-800"
                      />
                      <span className="text-xs leading-relaxed">{opt}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Footer Action Area */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <AlertCircle size={15} className="text-slate-400 shrink-0" />
            <span>Make sure you have answered all questions before submitting.</span>
          </div>

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full sm:w-auto py-3 px-8 bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs rounded-xl shadow-sm hover:shadow transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <span>{submitting ? 'Submitting Test...' : 'Submit Assessment'}</span>
            <Send size={14} />
          </button>
        </div>

      </div>
    </div>
  );
}