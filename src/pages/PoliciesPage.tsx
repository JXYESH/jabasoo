import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';

export const PoliciesPage: React.FC = () => {
  const { routeParams, navigate } = useStore();

  const [activeTab, setActiveTab] = useState<'shipping' | 'returns' | 'privacy' | 'terms'>(
    (routeParams.tab as any) || 'shipping'
  );

  return (
    <div className="w-full bg-white text-[#111111] pb-28">
      {/* Header */}
      <div className="border-b border-[#E5E5E5] bg-[#FAF9F7]">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-14 py-16 md:py-20">
          <nav className="text-xs uppercase tracking-[0.16em] text-[#777777] mb-3 flex items-center gap-2">
            <button onClick={() => navigate('home')} className="hover:text-[#111111]">Home</button>
            <span>/</span>
            <span className="text-[#111111]">Policies</span>
          </nav>
          <div className="max-w-xl space-y-2">
            <h1 className="text-3xl md:text-4xl font-light text-[#111111]">
              Shipping & Policies
            </h1>
            <p className="text-sm text-[#777777] font-light">
              Information on shipping times, returns, and order handling.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-14 pt-12">
        {/* Policy Tabs */}
        <div className="flex border-b border-[#E5E5E5] gap-8 text-xs uppercase tracking-[0.16em] font-medium overflow-x-auto pb-0.5">
          {[
            { id: 'shipping', label: 'Shipping' },
            { id: 'returns', label: 'Returns & Exchanges' },
            { id: 'privacy', label: 'Privacy Policy' },
            { id: 'terms', label: 'Terms of Service' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-4 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#111111] text-[#111111]'
                  : 'border-transparent text-[#777777] hover:text-[#111111]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="max-w-3xl space-y-8 text-sm text-[#444444] font-light leading-relaxed pt-8">
          {activeTab === 'shipping' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-light text-[#111111]">
                Shipping & Delivery
              </h2>
              <p>
                All orders are prepared and dispatched within 1–2 business days. Orders come packaged in protective cotton dust covers.
              </p>
              <h3 className="text-sm font-semibold text-[#111111] uppercase tracking-wider pt-2">
                Estimated Delivery Times
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-xs text-[#555555]">
                <li><strong>United States & Canada:</strong> 2–4 business days via Express Courier.</li>
                <li><strong>Europe & United Kingdom:</strong> 2–3 business days via DHL Express.</li>
                <li><strong>International:</strong> 3–6 business days with tracked delivery.</li>
              </ul>
              <h3 className="text-sm font-semibold text-[#111111] uppercase tracking-wider pt-2">
                Duties & Taxes
              </h3>
              <p>
                Applicable taxes and customs fees are shown at checkout so there are no unexpected charges upon delivery.
              </p>
            </div>
          )}

          {activeTab === 'returns' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-light text-[#111111]">
                Returns & Exchanges
              </h2>
              <p>
                We accept returns and exchanges within 30 days of receipt. Items must be unworn, unwashed, and in their original condition with all tags attached.
              </p>
              <h3 className="text-sm font-semibold text-[#111111] uppercase tracking-wider pt-2">
                Return Process
              </h3>
              <ol className="list-decimal pl-5 space-y-2 text-xs text-[#555555]">
                <li>Log in to your account and locate the order you wish to return.</li>
                <li>Select the items and generate a prepaid return shipping label.</li>
                <li>Pack the garments in original packaging and drop off at your nearest carrier.</li>
              </ol>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-light text-[#111111]">
                Privacy Policy
              </h2>
              <p>
                Your privacy is important to us. We only collect the information necessary to fulfill your orders, provide customer support, and improve your shopping experience.
              </p>
              <h3 className="text-sm font-semibold text-[#111111] uppercase tracking-wider pt-2">
                Data Security
              </h3>
              <p className="text-xs text-[#555555]">
                We use industry-standard encryption for all transactions and never sell or rent your personal information to third parties.
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-light text-[#111111]">
                Terms of Service
              </h2>
              <p>
                By using our website, you agree to these standard terms and conditions. All product descriptions, pricing, and availability are subject to change without notice.
              </p>
              <p className="text-xs text-[#555555]">
                For questions regarding terms or orders, contact our customer support at care@jabasoo.com.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
