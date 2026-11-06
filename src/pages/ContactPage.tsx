import React, { useState } from 'react';
import { Mail, Phone, MapPin, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactPage: React.FC = () => {
  const { navigate } = useStore();

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-white text-[#111111] pb-28">
      {/* Header */}
      <div className="border-b border-[#E5E5E5] bg-[#FAF9F7]">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-14 py-16 md:py-20">
          <nav className="text-xs uppercase tracking-[0.16em] text-[#777777] mb-3 flex items-center gap-2">
            <button onClick={() => navigate('home')} className="hover:text-[#111111]">Home</button>
            <span>/</span>
            <span className="text-[#111111]">Contact</span>
          </nav>
          <div className="max-w-xl space-y-2">
            <h1 className="text-3xl md:text-4xl font-light text-[#111111]">
              Contact
            </h1>
            <p className="text-sm text-[#777777] font-light">
              Get in touch for questions about orders, sizing, or fabrics.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-14 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left: Contact Information */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6 divide-y divide-[#E5E5E5] text-xs">
              <div className="pt-2 flex items-start gap-3">
                <MapPin size={16} className="text-[#111111] mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-[#111111] uppercase tracking-wider mb-1">
                    Studio
                  </h4>
                  <p className="text-[#777777] leading-relaxed">
                    42 Mercer Street, Soho<br />
                    New York, NY 10013
                  </p>
                </div>
              </div>

              <div className="pt-6 flex items-start gap-3">
                <Mail size={16} className="text-[#111111] mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-[#111111] uppercase tracking-wider mb-1">
                    Email
                  </h4>
                  <p className="text-[#777777]">care@jabasoo.com</p>
                  <p className="text-[#777777]">press@jabasoo.com</p>
                </div>
              </div>

              <div className="pt-6 flex items-start gap-3">
                <Phone size={16} className="text-[#111111] mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-[#111111] uppercase tracking-wider mb-1">
                    Phone
                  </h4>
                  <p className="text-[#777777]">+1 (800) 555-0199</p>
                  <p className="text-[#777777]">Monday – Friday, 9am – 6pm EST</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Clean Contact Form */}
          <div className="lg:col-span-7">
            <h2 className="text-xl font-light text-[#111111] mb-2">
              Send a Message
            </h2>
            <p className="text-xs text-[#777777] mb-8">
              We usually reply within one business day.
            </p>

            {submitted ? (
              <div className="py-12 space-y-3">
                <div className="flex items-center gap-2 text-sm text-[#111111]">
                  <Check size={18} />
                  <span>Thank you. Your message has been sent.</span>
                </div>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', email: '', subject: 'General Inquiry', message: '' });
                  }}
                  className="text-xs uppercase tracking-[0.16em] text-[#111111] underline hover:text-[#777777] pt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-[0.14em] text-[#777777] mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full border-b border-[#E5E5E5] py-2 text-sm focus:outline-none focus:border-[#111111]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-[0.14em] text-[#777777] mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="Your email address"
                      className="w-full border-b border-[#E5E5E5] py-2 text-sm focus:outline-none focus:border-[#111111]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.14em] text-[#777777] mb-1.5">
                    Subject
                  </label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full border-b border-[#E5E5E5] py-2 text-sm bg-white focus:outline-none focus:border-[#111111]"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Sizing & Fit">Sizing & Fit</option>
                    <option value="Order Status">Order Status</option>
                    <option value="Returns & Exchanges">Returns & Exchanges</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.14em] text-[#777777] mb-1.5">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="How can we help?"
                    className="w-full border-b border-[#E5E5E5] py-2 text-sm focus:outline-none focus:border-[#111111] resize-none"
                  />
                </div>

                {error && (
                  <p className="text-xs text-red-600">{error}</p>
                )}

                <button
                  type="submit"
                  className="bg-[#111111] text-white text-xs uppercase tracking-[0.18em] font-medium px-8 py-3.5 hover:bg-[#333333] transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
