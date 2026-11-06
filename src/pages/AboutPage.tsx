import React from 'react';
import { useStore } from '../context/StoreContext';

export const AboutPage: React.FC = () => {
  const { navigate } = useStore();

  return (
    <div className="w-full bg-white text-[#111111] pb-28">
      {/* Header */}
      <div className="border-b border-[#E5E5E5] bg-[#FAF9F7]">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-14 py-16 md:py-20">
          <nav className="text-xs uppercase tracking-[0.16em] text-[#777777] mb-4 flex items-center gap-2">
            <button onClick={() => navigate('home')} className="hover:text-[#111111]">Home</button>
            <span>/</span>
            <span className="text-[#111111]">About</span>
          </nav>
          <div className="max-w-2xl space-y-3">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#777777] font-semibold block">
              ABOUT JABASOO
            </span>
            <h1 className="text-3xl sm:text-4xl font-light text-[#111111] leading-tight">
              Loungewear made from pure natural fibers.
            </h1>
            <p className="text-sm text-[#555555] font-light leading-relaxed">
              We focus on clean design, comfortable silhouettes, and sustainable natural materials like cashmere, silk, and linen.
            </p>
          </div>
        </div>
      </div>

      {/* Chapter 1: Design */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-14 py-20 border-b border-[#E5E5E5]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.2em] text-[#777777] font-semibold">
              01. Design
            </span>
            <h2 className="text-2xl md:text-3xl font-light text-[#111111]">
              Simplicity and relaxed proportions.
            </h2>
            <div className="space-y-4 text-sm text-[#555555] font-light leading-relaxed">
              <p>
                JABASOO was created to offer an alternative to synthetic loungewear. We design pieces with clean, intentional lines that drape comfortably whether you are resting at home or traveling.
              </p>
              <p>
                Every seam, neckline, and cuff is carefully considered to provide comfort and ease of movement throughout the day.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-[4/3] bg-[#F5F5F5] overflow-hidden">
              <img
                src="/src/assets/images/editorial_craft_fabric_1793612596395.jpg"
                alt="Cashmere Textile Craft"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-xs text-[#777777] mt-2">
              Combed Mongolian cashmere fibers.
            </p>
          </div>
        </div>
      </div>

      {/* Chapter 2: Materials */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-14 py-20 border-b border-[#E5E5E5]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="aspect-[3/4] bg-[#F5F5F5] overflow-hidden">
              <img
                src="/src/assets/images/editorial_loungewear_story_1793612598318.jpg"
                alt="Portrait in Cashmere"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6 lg:pl-6">
            <span className="text-xs uppercase tracking-[0.2em] text-[#777777] font-semibold">
              02. Materials
            </span>
            <h2 className="text-2xl md:text-3xl font-light text-[#111111]">
              Natural fibers that breathe.
            </h2>
            <div className="space-y-4 text-sm text-[#555555] font-light leading-relaxed">
              <p>
                We prioritize 100% natural, biodegradable fabrics without synthetic polyester blends. Natural fibers naturally regulate body temperature and soften gently with wear.
              </p>
              <div className="space-y-3 pt-2">
                <div className="border-l-2 border-[#111111] pl-4">
                  <h4 className="text-xs font-semibold text-[#111111] uppercase tracking-wider">Grade-A Mongolian Cashmere</h4>
                  <p className="text-xs text-[#777777] mt-0.5">Combed long-staple fibers that offer warmth without weight.</p>
                </div>
                <div className="border-l-2 border-[#111111] pl-4">
                  <h4 className="text-xs font-semibold text-[#111111] uppercase tracking-wider">22-Momme Mulberry Silk</h4>
                  <p className="text-xs text-[#777777] mt-0.5">Sand-washed for a soft matte touch that glides smoothly against skin.</p>
                </div>
                <div className="border-l-2 border-[#111111] pl-4">
                  <h4 className="text-xs font-semibold text-[#111111] uppercase tracking-wider">Washed Belgian Linen</h4>
                  <p className="text-xs text-[#777777] mt-0.5">Breathable and lightweight for warm weather comfort.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-14 py-20 text-center">
        <h3 className="text-2xl font-light text-[#111111] mb-2">Explore the Collection</h3>
        <p className="text-xs text-[#777777] max-w-md mx-auto mb-6">
          View our robes, sets, and loungewear essentials.
        </p>
        <button
          onClick={() => navigate('collection')}
          className="bg-[#111111] text-white text-xs uppercase tracking-[0.2em] px-8 py-4 hover:bg-[#333333] transition-colors"
        >
          View All Items
        </button>
      </div>
    </div>
  );
};
