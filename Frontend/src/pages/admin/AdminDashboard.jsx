import { useState, useEffect } from 'react';
import { getAdminStats } from '../../api/adminApi';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Users, Clock, FileCheck2, ArrowUpRight, TrendingUp, ShieldCheck } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminStats()
      .then((res) => setStats(res.data.data || res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Top Banner / Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 p-6 md:p-8 text-white shadow-xl shadow-blue-900/10 border border-blue-700/40">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-semibold mb-3">
            <ShieldCheck size={14} /> System Administrator
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Welcome Back, Admin!
          </h1>
          <p className="mt-2 text-sm text-blue-100/90 leading-relaxed">
            Here is a quick overview of what is happening across the Skill Checker portal today.
          </p>
        </div>
        
        {/* Decorative Watermark Icon */}
        <ShieldCheck size={220} className="absolute -right-8 -bottom-12 text-white/5 pointer-events-none" />
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Users */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Users</span>
              <div className="p-3 rounded-xl bg-blue-50 text-blue-800 group-hover:bg-blue-900 group-hover:text-white transition-colors duration-200">
                <Users size={22} />
              </div>
            </div>
            <p className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
              {stats?.totalUsers || 0}
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1 font-medium text-emerald-600">
              <TrendingUp size={14} /> Active System Users
            </span>
            <ArrowUpRight size={14} className="text-slate-400" />
          </div>
        </div>

        {/* Pending Recruiters */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Pending Approvals</span>
              <div className="p-3 rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-200">
                <Clock size={22} />
              </div>
            </div>
            <p className="text-3xl md:text-4xl font-extrabold text-amber-600 mt-4 tracking-tight">
              {stats?.pendingRecruiters || 0}
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium text-amber-700">Requires Admin Action</span>
            <ArrowUpRight size={14} className="text-slate-400" />
          </div>
        </div>

        {/* Total Assessments */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Assessments</span>
              <div className="p-3 rounded-xl bg-cyan-50 text-cyan-700 group-hover:bg-blue-800 group-hover:text-white transition-colors duration-200">
                <FileCheck2 size={22} />
              </div>
            </div>
            <p className="text-3xl md:text-4xl font-extrabold text-blue-900 mt-4 tracking-tight">
              {stats?.totalAssessments || 0}
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium text-blue-800">Created Exams</span>
            <ArrowUpRight size={14} className="text-slate-400" />
          </div>
        </div>

      </div>
    </div>
  );
}