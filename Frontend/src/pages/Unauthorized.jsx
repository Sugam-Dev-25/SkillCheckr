import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-slate-50/60 p-6 flex items-center justify-center">
      <div className="bg-white border border-slate-200/80 rounded-3xl p-8 max-w-md w-full shadow-md text-center space-y-6">
        
        {/* Warning Icon Badge */}
        <div className="inline-flex p-4 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 shadow-inner">
          <ShieldAlert size={48} />
        </div>

        {/* Error Details */}
        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
            Error 403
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight pt-1">
            Access Denied
          </h1>
          <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-xs mx-auto">
            You do not have the required permissions or role authorization to view this page.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Link 
            to="/" 
            className="w-full py-3 px-6 bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs rounded-xl shadow-sm hover:shadow transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Home size={15} />
            <span>Go to Home</span>
          </Link>
        </div>

      </div>
    </div>
  );
}