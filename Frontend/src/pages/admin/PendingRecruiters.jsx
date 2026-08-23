import { useState, useEffect } from 'react';
import { getPendingRecruiters, updateRecruiterStatus } from '../../api/adminApi';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { UserCheck, Check, X, Mail, ShieldAlert, User, Clock } from 'lucide-react';

export default function PendingRecruiters() {
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  const fetchRecruiters = () => {
    getPendingRecruiters()
      .then((res) => setRecruiters(res.data.data || res.data))
      .catch((err) => console.error('Error fetching pending recruiters:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchRecruiters();
  }, []);

  const handleAction = async (id, status) => {
    setProcessingId(id);
    try {
      await updateRecruiterStatus(id, status);
      fetchRecruiters();
    } catch (error) {
      alert(error.response?.data?.message || `Failed to ${status} recruiter`);
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <UserCheck className="text-blue-800" size={28} />
            Pending Recruiter Approvals
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Review and approve recruiter accounts requesting access to the platform.
          </p>
        </div>
      </div>

      {/* Recruiter List / Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-amber-600" />
            <h2 className="font-bold text-slate-800">Pending Requests</h2>
          </div>
          <span className="text-xs font-bold bg-amber-50 text-amber-700 px-3 py-1 rounded-full border border-amber-200/80">
            {recruiters.length} Pending
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100 text-xs uppercase tracking-wider font-bold text-slate-500">
                <th className="p-4 pl-6">Recruiter Info</th>
                <th className="p-4">Email Address</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {recruiters.length === 0 ? (
                <tr>
                  <td colSpan="3" className="p-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <ShieldAlert size={36} className="text-slate-300" />
                      <p className="font-semibold text-slate-600">No pending approvals found</p>
                      <p className="text-xs text-slate-400">All recruiter requests have been reviewed.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                recruiters.map((rec) => (
                  <tr key={rec._id} className="hover:bg-slate-50/60 transition-colors duration-150">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-900 font-bold flex items-center justify-center text-sm border border-blue-200">
                          {rec.name ? rec.name.charAt(0).toUpperCase() : <User size={16} />}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">{rec.name}</p>
                          <p className="text-xs text-slate-400 uppercase font-semibold">Recruiter Account</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-slate-600 font-medium">
                      <div className="flex items-center gap-2">
                        <Mail size={15} className="text-slate-400" />
                        <span>{rec.email}</span>
                      </div>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => handleAction(rec._id, 'approved')}
                          disabled={processingId === rec._id}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm shadow-emerald-600/20 active:scale-95 disabled:opacity-50 transition-all duration-200"
                        >
                          <Check size={14} /> Approve
                        </button>
                        <button
                          onClick={() => handleAction(rec._id, 'rejected')}
                          disabled={processingId === rec._id}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 text-xs font-bold active:scale-95 disabled:opacity-50 transition-all duration-200"
                        >
                          <X size={14} /> Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}