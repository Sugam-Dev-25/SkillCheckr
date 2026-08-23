import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Users, 
  HelpCircle, 
  FileText, 
  CheckSquare, 
  Award,
  ShieldCheck,
  UserCheck,
  GraduationCap
} from 'lucide-react';

export default function Sidebar() {
  const { user } = useAuth();
  if (!user) return null;

  // মডার্ন এক্টিভ এবং হোভার স্টাইল (Logo Color Matched)
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group ${
      isActive
        ? 'bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-md shadow-blue-900/20 border-l-4 border-cyan-400'
        : 'text-slate-600 hover:bg-blue-50 hover:text-blue-900'
    }`;

  const iconClass = (isActive) =>
    `transition-transform duration-200 group-hover:scale-110 ${
      isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-blue-600'
    }`;

  return (
    <aside className="w-64 bg-slate-50/80 backdrop-blur-md border-r border-slate-200/80 min-h-[calc(100vh-64px)] p-4 flex flex-col justify-between shadow-sm">
      <div className="flex flex-col gap-1.5">
        
        {/* Role Badge Section */}
        <div className="px-3 py-2 mb-2 rounded-lg bg-blue-100/50 border border-blue-200/60 flex items-center gap-2">
          {user.role === 'admin' && <ShieldCheck size={16} className="text-blue-800" />}
          {user.role === 'recruiter' && <UserCheck size={16} className="text-blue-800" />}
          {user.role === 'candidate' && <GraduationCap size={16} className="text-blue-800" />}
          <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
            {user.role} Panel
          </span>
        </div>

        {/* ADMIN NAV LINKS */}
        {user.role === 'admin' && (
          <>
            <NavLink to="/admin/dashboard" className={linkClass}>
              {({ isActive }) => (
                <>
                  <LayoutDashboard size={18} className={iconClass(isActive)} /> Dashboard
                </>
              )}
            </NavLink>
            <NavLink to="/admin/recruiters" className={linkClass}>
              {({ isActive }) => (
                <>
                  <Users size={18} className={iconClass(isActive)} /> Approvals
                </>
              )}
            </NavLink>
            <NavLink to="/admin/categories" className={linkClass}>
              {({ isActive }) => (
                <>
                  <FolderKanban size={18} className={iconClass(isActive)} /> Categories
                </>
              )}
            </NavLink>
          </>
        )}

        {/* RECRUITER NAV LINKS */}
        {user.role === 'recruiter' && (
          <>
            <NavLink to="/recruiter/dashboard" className={linkClass}>
              {({ isActive }) => (
                <>
                  <LayoutDashboard size={18} className={iconClass(isActive)} /> Dashboard
                </>
              )}
            </NavLink>
            <NavLink to="/recruiter/questions" className={linkClass}>
              {({ isActive }) => (
                <>
                  <HelpCircle size={18} className={iconClass(isActive)} /> Question Bank
                </>
              )}
            </NavLink>
            <NavLink to="/recruiter/create-assessment" className={linkClass}>
              {({ isActive }) => (
                <>
                  <FileText size={18} className={iconClass(isActive)} /> New Assessment
                </>
              )}
            </NavLink>
          </>
        )}

        {/* CANDIDATE NAV LINKS */}
        {user.role === 'candidate' && (
          <>
            <NavLink to="/candidate/dashboard" className={linkClass}>
              {({ isActive }) => (
                <>
                  <LayoutDashboard size={18} className={iconClass(isActive)} /> My Dashboard
                </>
              )}
            </NavLink>
            <NavLink to="/candidate/assessments" className={linkClass}>
              {({ isActive }) => (
                <>
                  <CheckSquare size={18} className={iconClass(isActive)} /> Available Exams
                </>
              )}
            </NavLink>
            <NavLink to="/candidate/results" className={linkClass}>
              {({ isActive }) => (
                <>
                  <Award size={18} className={iconClass(isActive)} /> My Certificates
                </>
              )}
            </NavLink>
          </>
        )}
      </div>

      {/* Footer Branding Note */}
      <div className="pt-4 border-t border-slate-200/80 text-center">
        <p className="text-[11px] font-semibold text-slate-400 tracking-wide uppercase">
          Skill Checker Portal
        </p>
      </div>
    </aside>
  );
}