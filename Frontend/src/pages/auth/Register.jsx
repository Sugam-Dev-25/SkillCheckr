import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Phone, Building2, Lock, Eye, EyeOff, Loader2, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import logo from '../../assets/Skill-Checker.png'; // আপনার লোগোর পাথ অনুযায়ী প্রয়োজন হলে আপডেট করুন

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    password: '',
    role: 'candidate'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await register(formData);
      
      if (formData.role === 'recruiter') {
        alert('Registration successful! Please wait for Admin approval before logging in.');
      } else {
        alert('Registration successful!');
      }

      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-slate-50 to-slate-100 p-4 py-12 relative overflow-hidden">
      
      {/* Background Decorative Blur Elements (Light Theme) */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-cyan-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-200/80 w-full max-w-lg overflow-hidden relative z-10 animate-in fade-in duration-300">
        
        {/* Header Branding */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 p-8 text-center text-white relative">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 mb-3 shadow-inner">
            <img src={logo} alt="Skill Checker Logo" className="h-12 w-auto object-contain drop-shadow" />
          </div>
          <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
            Create an Account
          </h1>
          <p className="text-xs text-blue-200 mt-1 font-medium">
            Join Skill Checker to evaluate skills or streamline hiring
          </p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3.5 rounded-xl text-xs font-semibold mb-6 flex items-center gap-2">
              <ShieldCheck size={16} className="text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-800 focus:border-blue-800 outline-none transition-all duration-200 font-medium text-slate-800 placeholder:text-slate-400"
                />
                <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Email & Phone Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-800 focus:border-blue-800 outline-none transition-all duration-200 font-medium text-slate-800 placeholder:text-slate-400"
                  />
                  <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Phone
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-800 focus:border-blue-800 outline-none transition-all duration-200 font-medium text-slate-800 placeholder:text-slate-400"
                  />
                  <Phone size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Register As
              </label>
              <div className="relative">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-800 focus:border-blue-800 outline-none transition-all duration-200 font-medium text-slate-800 appearance-none cursor-pointer"
                >
                  <option value="candidate">Candidate</option>
                  <option value="recruiter">Recruiter</option>
                </select>
                <UserCheck size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Recruiter Conditional Field */}
            {formData.role === 'recruiter' && (
              <div className="p-3.5 bg-blue-50/80 rounded-xl border border-blue-100 space-y-2 animate-in fade-in duration-200">
                <label className="block text-xs font-bold uppercase tracking-wider text-blue-900">
                  Company Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="companyName"
                    required
                    placeholder="TechCorp Ltd."
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-800 outline-none font-medium text-slate-800"
                  />
                  <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-700 pointer-events-none" />
                </div>
                <p className="text-[11px] text-amber-700 font-medium flex items-center gap-1">
                  * Recruiter accounts require Admin approval before dashboard access.
                </p>
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-800 focus:border-blue-800 outline-none transition-all duration-200 font-medium text-slate-800 placeholder:text-slate-400"
                />
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-900/20 active:scale-[0.98] disabled:opacity-60 transition-all duration-200 !mt-6"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin text-cyan-400" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Register</span>
                  <ArrowRight size={16} className="text-cyan-400" />
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500 font-medium">
              Already registered?{' '}
              <Link to="/login" className="text-blue-800 font-bold hover:text-blue-900 hover:underline transition-all">
                Login here
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}