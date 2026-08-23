import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import { LogOut, User as UserIcon } from 'lucide-react';
import logo from '../../assets/Skill-Checker.png';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // এক্টিভ মেনু লিংক হাইলাইট করার জন্য স্টাইল
  const navLinkStyle = ({ isActive }) =>
    `text-sm font-medium transition-colors hover:text-cyan-300 ${
      isActive ? 'text-cyan-300 font-semibold border-b-2 border-cyan-300 pb-1' : 'text-blue-100'
    }`;

  return (
    <nav className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white px-6 py-3 flex justify-between items-center shadow-lg border-b border-blue-700/50">
      
      {/* 1. Logo & Brand Name */}
      <Link to="/" className="flex items-center gap-3 group">
        <img 
          src={logo} 
          alt="Skill Checker Logo" 
          className="h-10 w-auto object-contain drop-shadow-md transition-transform duration-200 group-hover:scale-105" 
        />
        <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
          Skill Checker
        </span>
      </Link>

      {/* 2. Middle Navigation Menus */}
      <div className="hidden md:flex items-center gap-8">
        <NavLink to="/" className={navLinkStyle}>
          Home
        </NavLink>
        <NavLink to="/assessments" className={navLinkStyle}>
          Assessments
        </NavLink>
        <NavLink to="/about" className={navLinkStyle}>
          About
        </NavLink>
        <NavLink to="/contact" className={navLinkStyle}>
          Contact
        </NavLink>
      </div>

      {/* 3. User Info & Logout */}
      {user ? (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm bg-blue-950/60 border border-blue-700/60 px-3.5 py-1.5 rounded-full shadow-inner">
            <UserIcon size={16} className="text-cyan-400" />
            <span className="font-semibold text-blue-50">{user.name || user.email}</span>
            <span className="text-[10px] uppercase font-bold tracking-wider bg-cyan-500 text-blue-950 px-2 py-0.5 rounded-full">
              {user.role}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm bg-rose-600 hover:bg-rose-700 text-white font-medium px-3.5 py-1.5 rounded-lg shadow transition-all duration-200 active:scale-95"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-semibold text-blue-100 hover:text-white px-3 py-1.5"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-sm font-semibold bg-cyan-500 hover:bg-cyan-400 text-blue-950 px-4 py-1.5 rounded-lg transition shadow"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}