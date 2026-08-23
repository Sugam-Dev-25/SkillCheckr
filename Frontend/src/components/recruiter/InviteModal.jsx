import { useState } from 'react';
import { inviteCandidate } from '../../api/recruiterApi';
import { Mail, X, CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react';

export default function InviteModal({ assessment, onClose }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const testLink = `${window.location.origin}/assessment/start/${assessment._id}`;
      await inviteCandidate(assessment._id, {
        candidateEmail: email,
        assessmentTitle: assessment.title,
        testLink
      });
      setStatus({
        type: 'success',
        message: 'Invitation email sent successfully!'
      });
      setEmail('');
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.response?.data?.message || 'Failed to send invitation.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-md overflow-hidden transform transition-all scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 px-6 py-5 text-white flex justify-between items-start relative">
          <div>
            <div className="flex items-center gap-2">
              <Mail size={20} className="text-cyan-400" />
              <h2 className="text-lg font-bold tracking-wide">Invite Candidate</h2>
            </div>
            <p className="text-xs text-blue-200 mt-1 line-clamp-1">
              Assessment: <span className="font-semibold text-white">{assessment?.title}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-blue-200 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {/* Status Alert */}
          {status.message && (
            <div
              className={`mb-5 p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 ${
                status.type === 'success'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80'
                  : 'bg-rose-50 text-rose-700 border border-rose-200/80'
              }`}
            >
              {status.type === 'success' ? (
                <CheckCircle2 size={18} className="shrink-0 text-emerald-600" />
              ) : (
                <AlertCircle size={18} className="shrink-0 text-rose-600" />
              )}
              <span>{status.message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Candidate Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-3.5 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-800 focus:border-blue-800 outline-none transition-all duration-200 text-slate-800 font-medium placeholder:text-slate-400"
                  placeholder="candidate@example.com"
                />
                <Mail size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-900/20 active:scale-95 disabled:opacity-60 disabled:pointer-events-none transition-all duration-200"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin text-cyan-400" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={14} className="text-cyan-400" />
                    <span>Send Invite</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}