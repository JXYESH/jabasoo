import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShivaLingamLogo } from './ShivaLingamLogo';
import { ArrowRight, MapPin, Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-white text-[#0A0A0A] border-t border-[#E5E7EB]">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 md:px-14 py-16 md:py-20">
        
        {/* Top Grid: Brand & Dispatch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-[#E5E7EB]">
          
          {/* Brand & Indian Atelier Information */}
          <div className="lg:col-span-7 space-y-6">
            <button
              onClick={() => navigate('home')}
              className="flex items-center gap-3 text-left group cursor-pointer"
              aria-label="Jabasoo Home"
            >
              <ShivaLingamLogo size={22} className="text-[#0A0A0A]" />
              <span className="font-brand text-3xl md:text-4xl text-[#0A0A0A] leading-none">
                Jabasoo
              </span>
            </button>

            <p className="text-xs text-[#71717A] max-w-md leading-relaxed font-light">
              Fine loungewear cut from single-origin Mongolian cashmere and pure mulberry silk. Handcrafted in limited editions.
            </p>

            {/* Indian Atelier Details */}
            <div className="space-y-2 pt-2 text-xs text-[#475569] font-light">
              <div className="flex items-start gap-2.5">
                <MapPin size={14} className="text-[#0A0A0A] shrink-0 mt-0.5" />
                <span>14 The Courtyard, 12th Main Road, Indiranagar, Bengaluru, Karnataka 560038, India</span>
              </div>
              <div className="flex items-center gap-6 pt-1">
                <div className="flex items-center gap-2">
                  <Phone size={13} className="text-[#0A0A0A] shrink-0" />
                  <a href="tel:+919845012890" className="hover:text-[#0A0A0A] transition-colors">+91 98450 12890</a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={13} className="text-[#0A0A0A] shrink-0" />
                  <a href="mailto:concierge@jabasoo.in" className="hover:text-[#0A0A0A] transition-colors">concierge@jabasoo.in</a>
                </div>
              </div>
            </div>
          </div>

          {/* Minimal Single-line Dispatch */}
          <div className="lg:col-span-5 flex flex-col justify-end space-y-3">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#71717A] font-medium block">
              ATELIER DISPATCH
            </span>
            <p className="text-xs text-[#71717A] font-light">
              Invitations to private fabric releases and seasonal editions.
            </p>
            {subscribed ? (
              <p className="text-xs tracking-wider uppercase text-[#0A0A0A] font-medium pt-2">
                Thank you. You will receive private collection previews.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center border-b border-[#0A0A0A] pb-2 pt-1">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-xs text-[#0A0A0A] placeholder:text-[#9CA3AF] focus:outline-none"
                />
                <button
                  type="submit"
                  className="text-xs uppercase tracking-[0.2em] font-medium text-[#0A0A0A] hover:text-[#71717A] transition-colors ml-4 shrink-0 flex items-center gap-1.5"
                >
                  <span>Join</span>
                  <ArrowRight size={12} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Strip: Non-repetitive Policy Links, Designer Credit & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row md:items-center justify-between gap-6 text-xs text-[#71717A]">
          {/* Specific Policy Links (Loungewear, About, Account removed as requested) */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 uppercase tracking-[0.16em] text-[11px] font-medium text-[#0A0A0A]">
            <button
              onClick={() => navigate('contact')}
              className="hover:text-[#71717A] transition-colors"
            >
              Contact
            </button>
            <button
              onClick={() => navigate('policies', { tab: 'shipping' })}
              className="hover:text-[#71717A] transition-colors"
            >
              Shipping &amp; Returns
            </button>
            <button
              onClick={() => navigate('policies', { tab: 'privacy' })}
              className="hover:text-[#71717A] transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => navigate('policies', { tab: 'terms' })}
              className="hover:text-[#71717A] transition-colors"
            >
              Terms of Service
            </button>
          </nav>

          {/* Designer Credit KRESQ & Copyright */}
          <div className="flex flex-wrap items-center gap-4 text-[11px] tracking-wider">
            <span className="text-[#0A0A0A] font-medium">
              Designed by <span className="font-semibold text-black tracking-[0.14em]">KRESQ</span>
            </span>
            <span>&bull;</span>
            <span>&copy; {new Date().getFullYear()} JABASOO INDIA</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
