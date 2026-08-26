import React from 'react';
import { useForm } from 'react-hook-form';
import { Send, CheckCircle2 } from 'lucide-react';

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful }
  } = useForm();

  const onSubmit = async (data) => {
    console.log('Form Submitted Data:', data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reset();
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-lg shadow-slate-100">
      {isSubmitSuccessful && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-700 text-sm">
          <CheckCircle2 size={20} className="shrink-0 text-emerald-600" />
          <span>Thank you! Your message has been sent successfully.</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        
        <div className="grid sm:grid-cols-2 gap-5">
          {/* Name Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Your Name *</label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              placeholder="Sugam Karmakar"
              className={`w-full bg-slate-50 border ${
                errors.name ? 'border-red-500' : 'border-slate-300 focus:border-blue-600 focus:bg-white'
              } rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none transition`}
            />
            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
          </div>

          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Your Email *</label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              placeholder="name@example.com"
              className={`w-full bg-slate-50 border ${
                errors.email ? 'border-red-500' : 'border-slate-300 focus:border-blue-600 focus:bg-white'
              } rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none transition`}
            />
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>
        </div>

        {/* Subject Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Subject *</label>
          <input
            type="text"
            {...register('subject', { required: 'Subject is required' })}
            placeholder="Feedback / Inquiry"
            className={`w-full bg-slate-50 border ${
              errors.subject ? 'border-red-500' : 'border-slate-300 focus:border-blue-600 focus:bg-white'
            } rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none transition`}
          />
          {errors.subject && <p className="text-xs text-red-500">{errors.subject.message}</p>}
        </div>

        {/* Message Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Message *</label>
          <textarea
            rows="4"
            {...register('message', { 
              required: 'Message is required',
              minLength: { value: 10, message: 'Message must be at least 10 characters' }
            })}
            placeholder="Write your message here..."
            className={`w-full bg-slate-50 border ${
              errors.message ? 'border-red-500' : 'border-slate-300 focus:border-blue-600 focus:bg-white'
            } rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none transition resize-none`}
          ></textarea>
          {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50 shadow-md shadow-blue-500/20"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
          <Send size={16} />
        </button>

      </form>
    </div>
  )
}

export default ContactForm