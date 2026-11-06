import React, { useEffect, useState } from 'react';
import { X, ShieldCheck, Ruler, Truck, Sparkles, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';

export const ProductInfoDrawer: React.FC = () => {
  const { infoDrawer, closeInfoDrawer } = useStore();
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');

  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (infoDrawer.open) {
      setMounted(true);
      document.body.style.overflow = 'hidden';
      const raf = requestAnimationFrame(() => setActive(true));
      return () => cancelAnimationFrame(raf);
    } else {
      setActive(false);
      const timer = setTimeout(() => {
        setMounted(false);
        document.body.style.overflow = '';
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [infoDrawer.open]);

  const handleClose = () => {
    setActive(false);
    setTimeout(() => {
      closeInfoDrawer();
    }, 350);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && infoDrawer.open) {
        handleClose();
      }
    };
    if (infoDrawer.open) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [infoDrawer.open]);

  if (!mounted && !infoDrawer.open) return null;

  const currentProduct = PRODUCTS.find((p) => p.id === infoDrawer.productId) || PRODUCTS[0];

  const SIZE_CHART = [
    { size: 'XS', bustCm: '82-86', bustIn: '32-34', waistCm: '64-68', waistIn: '25-27', hipCm: '90-94', hipIn: '35-37' },
    { size: 'S', bustCm: '86-90', bustIn: '34-35.5', waistCm: '68-72', waistIn: '27-28.5', hipCm: '94-98', hipIn: '37-38.5' },
    { size: 'M', bustCm: '90-94', bustIn: '35.5-37', waistCm: '72-76', waistIn: '28.5-30', hipCm: '98-102', hipIn: '38.5-40' },
    { size: 'L', bustCm: '94-100', bustIn: '37-39.5', waistCm: '76-82', waistIn: '30-32', hipCm: '102-108', hipIn: '40-42.5' },
    { size: 'XL', bustCm: '100-106', bustIn: '39.5-42', waistCm: '82-88', waistIn: '32-34.5', hipCm: '108-114', hipIn: '42.5-45' },
    { size: 'XXL', bustCm: '106-114', bustIn: '42-45', waistCm: '88-96', waistIn: '34.5-38', hipCm: '114-122', hipIn: '45-48' },
    { size: '3XL', bustCm: '114-122', bustIn: '45-48', waistCm: '96-104', waistIn: '38-41', hipCm: '122-130', hipIn: '48-51' },
    { size: '4XL', bustCm: '122-130', bustIn: '48-51', waistCm: '104-112', waistIn: '41-44', hipCm: '130-138', hipIn: '51-54.5' },
    { size: '5XL', bustCm: '130-138', bustIn: '51-54.5', waistCm: '112-120', waistIn: '44-47', hipCm: '138-146', hipIn: '54.5-57.5' },
    { size: '6XL', bustCm: '138-146', bustIn: '54.5-57.5', waistCm: '120-128', waistIn: '47-50', hipCm: '146-154', hipIn: '57.5-60.5' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Semi-transparent backdrop allowing underlying page visibility */}
      <div
        onClick={handleClose}
        className={`absolute inset-0 bg-black/35 backdrop-blur-[1px] transition-opacity duration-350 ease-out ${
          active ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div
          className={`w-screen max-w-lg bg-white flex flex-col shadow-2xl z-10 border-l border-[#E5E5E5] transform transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            active ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Header */}
          <div className="px-8 py-6 border-b border-[#E5E5E5] flex items-center justify-between">
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#777777] font-medium">
                PRODUCT INFORMATION
              </p>
              <h2 className="text-xl font-serif text-[#111111]">
                {infoDrawer.type === 'details' && 'Garment Details & Construction'}
                {infoDrawer.type === 'size-fit' && 'Size & Fit Analysis'}
                {infoDrawer.type === 'certificates' && 'Certificates & Traceability'}
                {infoDrawer.type === 'returns' && 'Returns & Exchanges'}
                {infoDrawer.type === 'size-guide' && 'Sizing Guide & Measurements'}
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="p-2 -mr-2 text-[#111111] hover:text-[#777777] transition-colors"
              aria-label="Close information drawer"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto px-8 py-8 space-y-6">
            {/* TYPE: DETAILS */}
            {infoDrawer.type === 'details' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs uppercase tracking-[0.16em] text-[#777777] mb-2 font-medium">
                    Composition
                  </h3>
                  <p className="text-sm font-medium text-[#111111]">
                    {currentProduct.composition}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs uppercase tracking-[0.16em] text-[#777777] mb-3 font-medium">
                    Key Features
                  </h3>
                  <ul className="space-y-2.5">
                    {currentProduct.details.map((detail, idx) => (
                      <li key={idx} className="text-sm text-[#333333] flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111111] mt-2 shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-[#E5E5E5] pt-6">
                  <h3 className="text-xs uppercase tracking-[0.16em] text-[#777777] mb-3 font-medium">
                    Care Guidelines
                  </h3>
                  <ul className="space-y-2">
                    {currentProduct.care.map((c, idx) => (
                      <li key={idx} className="text-sm text-[#555555] flex items-center gap-2">
                        <Check size={14} className="text-[#111111]" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* TYPE: SIZE & FIT */}
            {infoDrawer.type === 'size-fit' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs uppercase tracking-[0.16em] text-[#777777] mb-2 font-medium">
                    Silhouette Overview
                  </h3>
                  <p className="text-sm text-[#111111] leading-relaxed">
                    {currentProduct.fitInfo}
                  </p>
                </div>

                <div className="p-4 bg-[#F5F5F5] border border-[#E5E5E5] space-y-2">
                  <p className="text-xs uppercase tracking-[0.16em] text-[#111111] font-medium">
                    Designer Fit Recommendation
                  </p>
                  <p className="text-xs text-[#555555] leading-relaxed">
                    Our loungewear is engineered with ease. If you prefer a tailored silhouette around the waist, we recommend ordering your true size. For a more relaxed, draped pool at the hems, consider sizing up.
                  </p>
                </div>

                <div className="border-t border-[#E5E5E5] pt-6">
                  <h3 className="text-xs uppercase tracking-[0.16em] text-[#777777] mb-3 font-medium">
                    Model Specifications
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="p-3 border border-[#E5E5E5]">
                      <span className="text-[#777777] block mb-1">Height</span>
                      <span className="text-[#111111] font-medium">178 cm / 5&apos;10&quot;</span>
                    </div>
                    <div className="p-3 border border-[#E5E5E5]">
                      <span className="text-[#777777] block mb-1">Size Worn</span>
                      <span className="text-[#111111] font-medium">Size S / 36 EU</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TYPE: CERTIFICATES & TRACEABILITY */}
            {infoDrawer.type === 'certificates' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs uppercase tracking-[0.16em] text-[#777777] mb-3 font-medium">
                    Verified Accreditations
                  </h3>
                  <div className="space-y-3">
                    {currentProduct.certificates.map((cert, idx) => (
                      <div key={idx} className="p-4 border border-[#E5E5E5] flex items-start gap-3 bg-[#FAF8F5]">
                        <ShieldCheck size={18} className="text-[#111111] mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-[#111111]">{cert}</p>
                          <p className="text-xs text-[#777777] mt-0.5">
                            Third-party verified through European and Asian textile auditing bodies.
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[#E5E5E5] pt-6">
                  <h3 className="text-xs uppercase tracking-[0.16em] text-[#777777] mb-2 font-medium">
                    Supply Chain Transparency
                  </h3>
                  <p className="text-xs text-[#555555] leading-relaxed">
                    Every batch of cashmere is traceable to nomadic co-operatives in the Alashan region of Inner Mongolia. Spun on solar-powered precision machinery in Biella, Italy and tailored in specialized artisan workshops.
                  </p>
                </div>
              </div>
            )}

            {/* TYPE: RETURNS & EXCHANGES */}
            {infoDrawer.type === 'returns' && (
              <div className="space-y-6">
                <div className="flex items-start gap-3.5 p-4 bg-[#F5F5F5] border border-[#E5E5E5]">
                  <Truck size={20} className="text-[#111111] mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-[#111111]">
                      30-Day Complimentary Returns
                    </h4>
                    <p className="text-xs text-[#555555] mt-1 leading-relaxed">
                      We offer complimentary courier pick-up for returns and size exchanges within 30 days of receipt.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs uppercase tracking-[0.16em] text-[#777777] font-medium">
                    Return Requirements
                  </h3>
                  <ul className="space-y-2 text-xs text-[#555555]">
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#111111] mt-1.5" />
                      <span>Items must be unwashed, unworn, and unaltered in original condition.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#111111] mt-1.5" />
                      <span>Original security tag and textile pouches must be intact.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#111111] mt-1.5" />
                      <span>Exchanges for alternative sizes ship free of charge.</span>
                    </li>
                  </ul>
                </div>

                <div className="border-t border-[#E5E5E5] pt-4 text-xs text-[#777777]">
                  <p>Questions? Contact our private concierge at concierge@jabasoo.in or +91 98450 12890.</p>
                </div>
              </div>
            )}

            {/* TYPE: SIZE GUIDE */}
            {infoDrawer.type === 'size-guide' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-[#777777]">
                    Sample Measurements for Client Presentation Demo
                  </p>
                  {/* Unit toggle */}
                  <div className="flex border border-[#E5E5E5]">
                    <button
                      onClick={() => setUnit('cm')}
                      className={`px-3 py-1 text-xs font-medium transition-colors ${
                        unit === 'cm' ? 'bg-[#111111] text-white' : 'text-[#777777] hover:text-[#111111]'
                      }`}
                    >
                      CM
                    </button>
                    <button
                      onClick={() => setUnit('in')}
                      className={`px-3 py-1 text-xs font-medium transition-colors ${
                        unit === 'in' ? 'bg-[#111111] text-white' : 'text-[#777777] hover:text-[#111111]'
                      }`}
                    >
                      INCHES
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="border border-[#E5E5E5] overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#F5F5F5] border-b border-[#E5E5E5] text-[#777777] uppercase tracking-[0.1em]">
                        <th className="p-3 font-medium">Size</th>
                        <th className="p-3 font-medium">Bust ({unit})</th>
                        <th className="p-3 font-medium">Waist ({unit})</th>
                        <th className="p-3 font-medium">Hip ({unit})</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E5E5] tabular-nums">
                      {SIZE_CHART.map((row) => (
                        <tr key={row.size} className="hover:bg-[#FAF8F5] transition-colors">
                          <td className="p-3 font-semibold text-[#111111]">{row.size}</td>
                          <td className="p-3 text-[#555555]">{unit === 'cm' ? row.bustCm : row.bustIn}</td>
                          <td className="p-3 text-[#555555]">{unit === 'cm' ? row.waistCm : row.waistIn}</td>
                          <td className="p-3 text-[#555555]">{unit === 'cm' ? row.hipCm : row.hipIn}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* How to measure */}
                <div className="border-t border-[#E5E5E5] pt-6 space-y-3">
                  <h3 className="text-xs uppercase tracking-[0.16em] text-[#777777] font-medium flex items-center gap-1.5">
                    <Ruler size={14} />
                    <span>How to Measure</span>
                  </h3>
                  <div className="space-y-2 text-xs text-[#555555] leading-relaxed">
                    <p>
                      <strong>Bust:</strong> Measure around the fullest part of your chest, keeping tape comfortably horizontal.
                    </p>
                    <p>
                      <strong>Waist:</strong> Measure around your natural waistline, where your trousers naturally rest.
                    </p>
                    <p>
                      <strong>Hip:</strong> Stand with feet together and measure around the fullest point of your hips.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
