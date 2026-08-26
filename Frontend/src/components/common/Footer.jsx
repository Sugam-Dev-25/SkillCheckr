import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/Skill-Checker.png';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Details */}
        <div className="md:col-span-2 space-y-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Skill Checker" className="h-8 w-auto" />
            <span className="text-xl font-extrabold text-white tracking-tight">
              Skill Checker
            </span>
          </Link>
          <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
            An automated skills evaluation platform helping recruiters find top talent and allowing candidates to prove their expertise.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-cyan-400 transition">Home</Link></li>
            <li><Link to="/what-benefits" className="hover:text-cyan-400 transition">What benefits?</Link></li>
            <li><Link to="/about" className="hover:text-cyan-400 transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-cyan-400 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Account Links */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Get Started</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/login" className="hover:text-cyan-400 transition">Login</Link></li>
            <li><Link to="/register" className="hover:text-cyan-400 transition">Register Account</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar with Credits */}
      <div className="max-w-6xl mx-auto pt-8 mt-8 border-t border-slate-800 text-xs flex flex-col sm:flex-row justify-between items-center gap-2 text-slate-500">
        <div>
          © {new Date().getFullYear()} Skill Checker. All rights reserved.
        </div>
        <div>
          Designed & Developed by <span className="text-cyan-400 font-medium">Sugam Karmakar</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;