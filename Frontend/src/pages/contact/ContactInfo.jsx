import React from 'react';
import { Mail, MessageSquare, MapPin } from 'lucide-react';

const ContactInfo = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-wide mb-2">Let’s Connect</h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          Whether you are testing your skills or looking for enterprise support, reach out directly anytime.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg border border-blue-200">
            <Mail size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Email Support</h4>
            <p className="text-xs text-slate-600 mt-0.5">support@skillchecker.com</p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition">
          <div className="p-3 bg-cyan-100 text-cyan-700 rounded-lg border border-cyan-200">
            <MessageSquare size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Direct Assistance</h4>
            <p className="text-xs text-slate-600 mt-0.5">Quick guidance on platform evaluations</p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg border border-blue-200">
            <MapPin size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Office Location</h4>
            <p className="text-xs text-slate-600 mt-0.5">West Bengal, India</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactInfo