import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, ArrowLeft, AlertCircle } from 'lucide-react';

export default function ExamReview() {
  const location = useLocation();
  const navigate = useNavigate();

  const resultData = location.state?.result;
  const questions = resultData?.questions || [];
  const userAnswers = resultData?.userAnswers || {};

  if (!resultData || questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm border space-y-4 max-w-md w-full">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
          <h2 className="text-xl font-bold text-slate-800">No review data found!</h2>
          <p className="text-xs text-slate-500">Please complete an assessment first.</p>
          <button
            onClick={() => navigate('/candidate/dashboard')}
            className="w-full py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header Summary */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-1 text-xs font-semibold text-slate-500 hover:text-indigo-600 mb-2 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <h1 className="text-xl font-bold text-slate-800">Exam Performance Review</h1>
            <p className="text-xs text-slate-500">Check correct answers and analyze your choices</p>
          </div>

          <div className="flex items-center space-x-6 bg-slate-50 px-6 py-3 rounded-xl border border-slate-200">
            <div className="text-center">
              <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Your Score</span>
              <span className="text-xl font-extrabold text-indigo-600">
                {resultData.score} / {resultData.totalMarks}
              </span>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div className="text-center">
              <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Status</span>
              <span className={`text-sm font-bold ${resultData.isPassed ? 'text-emerald-600' : 'text-rose-600'}`}>
                {resultData.isPassed ? 'Passed' : 'Failed'}
              </span>
            </div>
          </div>
        </div>

        {/* Question Set */}
        <div className="space-y-6">
          {questions.map((q, qIdx) => {
            const userChoice = userAnswers[q._id];
            const correctChoice = q.correctAnswer;

            // Strict String/Index Match
            const isCorrect = String(userChoice).trim().toLowerCase() === String(correctChoice).trim().toLowerCase();

            return (
              <div
                key={q._id || qIdx}
                className={`bg-white p-6 rounded-2xl border transition shadow-sm space-y-4 ${
                  isCorrect ? 'border-emerald-300' : 'border-rose-300'
                }`}
              >
                {/* Question Header */}
                <div className="flex items-start justify-between gap-4 pb-2 border-b border-slate-100">
                  <h3 className="font-bold text-slate-800 text-base flex-1">
                    <span className="text-indigo-600 mr-2">Q{qIdx + 1}.</span> {q.questionText || q.question}
                  </h3>
                  {isCorrect ? (
                    <span className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex-shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Correct</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center space-x-1 text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200 flex-shrink-0">
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Incorrect</span>
                    </span>
                  )}
                </div>

                {/* MCQ Options List */}
                <div className="grid grid-cols-1 gap-3">
                  {q.options?.map((opt, optIdx) => {
                    // Check logic based on Index (0, 1, 2) or Option Text String
                    const isUserSelected = String(userChoice) === String(optIdx) || String(userChoice).trim().toLowerCase() === String(opt).trim().toLowerCase();
                    const isThisCorrect = String(correctChoice) === String(optIdx) || String(correctChoice).trim().toLowerCase() === String(opt).trim().toLowerCase();

                    let cardStyle = 'bg-slate-50/60 border-slate-200 text-slate-600';
                    let badgeStyle = 'bg-slate-200 text-slate-600';

                    // Correct Answer Badge & Outline (Always Green)
                    if (isThisCorrect) {
                      cardStyle = 'bg-emerald-50 border-2 border-emerald-500 text-emerald-950 font-semibold shadow-sm';
                      badgeStyle = 'bg-emerald-600 text-white';
                    }

                    // User Wrong Selection Badge & Outline (Red)
                    if (isUserSelected && !isThisCorrect) {
                      cardStyle = 'bg-rose-50 border-2 border-rose-500 text-rose-950 font-semibold shadow-sm';
                      badgeStyle = 'bg-rose-600 text-white';
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-4 rounded-xl border flex items-center justify-between text-sm transition ${cardStyle}`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center border ${badgeStyle}`}>
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="font-medium">{opt}</span>
                        </div>

                        <div className="flex items-center space-x-2 flex-shrink-0">
                          {/* Label if user selected this option */}
                          {isUserSelected && (
                            <span className={`text-[10px] uppercase font-black px-2.5 py-1 rounded-md tracking-wider ${
                              isThisCorrect ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'
                            }`}>
                              Your Choice
                            </span>
                          )}

                          {/* Green Correct Answer Mention */}
                          {isThisCorrect && (
                            <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>Correct Answer</span>
                            </span>
                          )}

                          {/* Red Wrong Answer Icon */}
                          {isUserSelected && !isThisCorrect && (
                            <XCircle className="w-5 h-5 text-rose-600" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}