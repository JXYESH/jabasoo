import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ShieldCheck, Feather, HeartHandshake, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const HomePage: React.FC = () => {
  const { navigate, atelierAtmosphere, setAtelierAtmosphere } = useStore();
  const [scrollY, setScrollY] = useState(0);
  const [activeFabric, setActiveFabric] = useState<'cashmere' | 'silk' | 'waffle'>('cashmere');
  
  // Ref for the Day-to-Night vertical timeline section
  const timelineSectionRef = useRef<HTMLElement>(null);
  const [timelineProgress, setTimelineProgress] = useState(0); // 0 to 1

  // Ref for Section 4 entering to trigger smooth scale/stack of Section 3 ONLY when Section 4 arrives
  const section4Ref = useRef<HTMLElement>(null);
  const { scrollYProgress: section4EnterProgress } = useScroll({
    target: section4Ref,
    offset: ["start end", "start start"]
  });

  // Smooth transforms for Section 3 as Section 4 slides UP OVER it at the end
  const section3Scale = useTransform(section4EnterProgress, [0, 1], [1, 0.93]);
  const section3Opacity = useTransform(section4EnterProgress, [0, 0.85], [1, 0.5]);
  const section3Radius = useTransform(section4EnterProgress, [0, 1], [0, 32]);

  // Track scroll position smoothly for hero image zoom and timeline progress
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setScrollY(currentScrollY);

          // Calculate timeline scroll progress
          if (timelineSectionRef.current) {
            const rect = timelineSectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            const sectionTop = rect.top;
            const sectionHeight = rect.height;
            
            if (sectionTop <= windowHeight * 0.75 && rect.bottom >= windowHeight * 0.25) {
              const scrolledAmount = (windowHeight * 0.75 - sectionTop) / (sectionHeight + windowHeight * 0.5);
              const clamped = Math.max(0, Math.min(1, scrolledAmount));
              setTimelineProgress(clamped);

              // Shift theme dynamically along scroll using cool neutral palette:
              // 0.00 - 0.33 -> Morning (clean crisp gallery white)
              // 0.33 - 0.66 -> Evening (cool slate graphite twilight)
              // 0.66 - 1.00 -> Night (deep obsidian midnight)
              if (clamped < 0.33) {
                if (atelierAtmosphere !== 'dawn') setAtelierAtmosphere('dawn');
              } else if (clamped < 0.66) {
                if (atelierAtmosphere !== 'twilight') setAtelierAtmosphere('twilight');
              } else {
                if (atelierAtmosphere !== 'midnight') setAtelierAtmosphere('midnight');
              }
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [atelierAtmosphere, setAtelierAtmosphere]);

  // Subtle hero zoom
  const imageScale = 1 + Math.min(Math.max(scrollY * 0.0005, 0), 0.25);

  // Curate 4 core foundation pieces for "The Essentials"
  const essentialProducts = PRODUCTS.slice(0, 4);

  // Cool neutral atmosphere palette mapping
  const getAtmosphereStyles = () => {
    switch (atelierAtmosphere) {
      case 'twilight':
        return {
          bg: 'bg-[#F1F3F7]',
          text: 'text-[#0F172A]',
          surface: 'bg-[#E2E6EE]',
          border: 'border-[#CBD5E1]',
          muted: 'text-[#475569]'
        };
      case 'midnight':
        return {
          bg: 'bg-[#0A0A0A]',
          text: 'text-[#F8FAFC]',
          surface: 'bg-[#141414]',
          border: 'border-[#27272A]',
          muted: 'text-[#94A3B8]'
        };
      case 'dawn':
      case 'solar':
      default:
        return {
          bg: 'bg-[#FFFFFF]',
          text: 'text-[#0A0A0A]',
          surface: 'bg-[#F8F9FA]',
          border: 'border-[#E5E7EB]',
          muted: 'text-[#64748B]'
        };
    }
  };

  const atmos = getAtmosphereStyles();

  // Natural fibers data with price justification
  const fabrics = {
    cashmere: {
      name: '100% Grade-A Mongolian Cashmere',
      spec: '15.2 Micron Fineness · 12-Gauge Knit',
      origin: 'Inner Mongolia Highlands',
      whyPriced: 'Combed strictly by hand from free-roaming nomadic herds during spring moult. Only the finest 15.2-micron underfleece fibers (>36mm length) are spun, preventing pilling and ensuring thermal resilience for decades.',
      image: '/src/assets/images/loungewear_cashmere_macro_1793620651967.jpg',
    },
    silk: {
      name: '22-Momme Sand-Washed Mulberry Silk',
      spec: 'Grade 6A Raw Silk · Enzymatic Pumice Wash',
      origin: 'Hangzhou River Basin',
      whyPriced: 'Heavy 22-momme density provides a fluid, liquid drape that never clings or builds static. Sand-washing breaks down surface tension into a matte suede touch that stays cool to the touch all night.',
      image: '/src/assets/images/loungewear_silk_robe_living_1793620652768.jpg',
    },
    waffle: {
      name: '380 GSM Organic Aegean Waffle',
      spec: 'Long-Staple Combed Cotton · Deep Micro-Thermal Grid',
      origin: 'Aegean Coastal Valley',
      whyPriced: 'Architectural honeycomb knit structure creates insulating micro-air chambers for effortless breathability. Never loses shape or softness through daily wash cycles.',
      image: '/src/assets/images/loungewear_cotton_terry_lounge_1793620651698.jpg',
    }
  };

  const currentFabricData = fabrics[activeFabric];

  // Minimal timeline phases
  const timelinePhases = [
    {
      id: 'morning',
      title: 'Morning',
      theme: 'dawn',
      desc: 'Crisp daylight loungewear in breathable organic waffle and fine-gauge cashmere robes.',
      image: '/src/assets/images/loungewear_hero_morning_1793620652458.jpg',
      pieces: PRODUCTS.filter(p => p.ritual === 'morning' || p.subcategory === 'robes').slice(0, 2)
    },
    {
      id: 'evening',
      title: 'Evening',
      theme: 'twilight',
      desc: 'Relaxed fluid drape in sand-washed silk and wide-leg ribbed modal trousers.',
      image: '/src/assets/images/loungewear_cotton_terry_lounge_1793620651698.jpg',
      pieces: PRODUCTS.filter(p => p.ritual === 'leisure' || p.subcategory === 'trousers' || p.subcategory === 'knitwear').slice(0, 2)
    },
    {
      id: 'night',
      title: 'Night',
      theme: 'midnight',
      desc: 'Zero-friction rest in pure 22-momme mulberry silk sleepwear and wraps.',
      image: '/src/assets/images/loungewear_silk_robe_living_1793620652768.jpg',
      pieces: PRODUCTS.filter(p => p.ritual === 'evening' || p.subcategory === 'sleepwear').slice(0, 2)
    }
  ];

  const activePhaseIndex = timelineProgress < 0.33 ? 0 : timelineProgress < 0.66 ? 1 : 2;

  // Atelier promises
  const promises = [
    {
      title: 'Zero Synthetic Blends',
      detail: 'Pure natural fibers only. Never diluted with polyester, nylon, or microplastics.'
    },
    {
      title: 'Direct Atelier Value',
      detail: 'Small-batch craft without the traditional 8x luxury retail wholesale markups.'
    },
    {
      title: 'Ethical Highland Sourcing',
      detail: 'Certified humane spring combing and fair, direct wages for nomadic herder families.'
    },
    {
      title: 'Complimentary Lifetime Care',
      detail: 'Free atelier mending and dedicated care guidance so your garments endure for decades.'
    }
  ];

  return (
    <div className={`w-full ${atmos.bg} ${atmos.text} transition-colors duration-700`}>
      {/* ========================================================= */}
      {/* 1. HERO SECTION: 1 image, 1 headline, 1 button */}
      {/* ========================================================= */}
      <section className="relative w-full h-[88vh] md:h-[92vh] flex items-end overflow-hidden bg-[#F1F3F5]">
        <img
          src="/src/assets/images/loungewear_hero_morning_1793620652458.jpg"
          alt="Jabasoo Cashmere and Silk Loungewear"
          className="absolute inset-0 w-full h-full object-cover object-[center_32%] transition-transform duration-150 ease-out select-none"
          style={{
            transform: `scale(${imageScale})`,
            transformOrigin: 'center center',
            willChange: 'transform',
          }}
          referrerPolicy="no-referrer"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-8 md:px-14 pb-14 md:pb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 text-white">
          <div className="max-w-2xl space-y-4">
            <span className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-light text-white/80 block">
              Pure Cashmere &bull; Washed Silk
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-white leading-[1.08] text-balance">
              Silhouettes For Quiet Living.
            </h1>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => navigate('collection')}
              className="inline-flex items-center gap-3 bg-white text-[#0A0A0A] hover:bg-white/90 text-xs uppercase tracking-[0.22em] font-medium px-8 py-4 transition-all shadow-md cursor-pointer"
            >
              <span>Explore Collection</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. THE ESSENTIALS (4 cards + view all) */}
      {/* ========================================================= */}
      <section className="w-full px-4 sm:px-8 md:px-14 py-20 md:py-28 bg-white text-[#0A0A0A] border-b border-[#E5E7EB]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-baseline justify-between mb-12 pb-4 border-b border-[#E5E7EB]">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#71717A] block mb-1">
                CURATED WARDROBE
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-[#0A0A0A]">
                The Essentials
              </h2>
            </div>
            <button
              onClick={() => navigate('collection')}
              className="text-xs uppercase tracking-[0.2em] font-medium text-[#71717A] hover:text-[#0A0A0A] hover:underline underline-offset-4 transition-colors cursor-pointer"
            >
              View All ({PRODUCTS.length})
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {essentialProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. WEAR THROUGH THE HOURS (Full natural scroll so Morning/Evening/Night play completely) */}
      {/* ========================================================= */}
      <motion.section 
        ref={timelineSectionRef}
        style={{
          scale: section3Scale,
          opacity: section3Opacity,
          borderRadius: section3Radius,
        }}
        className={`w-full px-4 sm:px-8 md:px-14 py-24 md:py-32 transition-colors duration-700 ${atmos.surface} relative origin-center border-b border-[#E5E7EB]`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="max-w-xl mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-tight">
              Wear Through The Hours
            </h2>
            <p className="text-xs sm:text-sm opacity-75 font-light mt-2 leading-relaxed">
              Loungewear calibrated to the natural rhythm of day and night.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Left Timeline Spine */}
            <div className="lg:col-span-3 relative">
              <div className="sticky top-28 pl-2">
                <div className="relative pl-6">
                  <div className="absolute left-0 top-3 bottom-3 w-[1px] bg-current opacity-20" />
                  <div 
                    className="absolute left-[-2px] w-[5px] h-9 bg-current transition-all duration-300 ease-out rounded-full opacity-90"
                    style={{ 
                      top: `${Math.min(Math.max(timelineProgress * 80, 0), 80)}%` 
                    }}
                  />

                  <div className="space-y-10 py-1">
                    {timelinePhases.map((phase, idx) => {
                      const isActive = activePhaseIndex === idx;
                      return (
                        <button
                          key={phase.id}
                          onClick={() => {
                            setAtelierAtmosphere(phase.theme as any);
                            const el = document.getElementById(`phase-${phase.id}`);
                            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          }}
                          className={`w-full text-left transition-all duration-300 block cursor-pointer ${
                            isActive ? 'opacity-100 translate-x-1.5' : 'opacity-40 hover:opacity-75'
                          }`}
                        >
                          <span className="text-base sm:text-lg font-light tracking-tight block">
                            {phase.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Phases */}
            <div className="lg:col-span-9 space-y-24">
              {timelinePhases.map((phase) => {
                return (
                  <div
                    key={phase.id}
                    id={`phase-${phase.id}`}
                    className="space-y-6"
                  >
                    <div className="pb-3 border-b border-current opacity-20 flex items-baseline justify-between">
                      <h3 className="text-2xl sm:text-3xl font-light tracking-tight">
                        {phase.title}
                      </h3>
                      <button
                        onClick={() => navigate('collection', { ritual: phase.id })}
                        className="text-[11px] uppercase tracking-[0.2em] font-medium opacity-80 hover:opacity-100 hover:underline underline-offset-4 cursor-pointer"
                      >
                        Explore &rarr;
                      </button>
                    </div>

                    <p className="text-xs sm:text-sm leading-relaxed opacity-80 font-light max-w-xl">
                      {phase.desc}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start pt-2">
                      <div className="sm:col-span-4 aspect-[3/4] overflow-hidden bg-current/5">
                        <img 
                          src={phase.image}
                          alt={phase.title}
                          className="w-full h-full object-cover object-center select-none"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      
                      <div className="sm:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {phase.pieces.map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </motion.section>

      {/* ========================================================= */}
      {/* 4. FIBERS THAT BREATHE: Stacked Card page that slides UP OVER Section 3 when user reaches bottom of Section 3 */}
      {/* ========================================================= */}
      <section 
        ref={section4Ref}
        className="sticky top-0 z-20 w-full min-h-screen bg-white text-[#0A0A0A] shadow-[0_-40px_100px_rgba(0,0,0,0.25)] border-t border-[#E5E7EB] rounded-t-[32px] sm:rounded-t-[48px] overflow-hidden py-24 md:py-32 px-4 sm:px-8 md:px-14"
      >
        <div className="max-w-6xl mx-auto space-y-20">
          
          {/* Main Editorial Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Left Macro Image */}
            <div className="lg:col-span-5">
              <div className="aspect-[4/5] bg-[#F1F3F5] overflow-hidden rounded-xl">
                <img
                  src={currentFabricData.image}
                  alt={currentFabricData.name}
                  className="w-full h-full object-cover object-center select-none"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Right Fabric Switcher */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#71717A] block mb-2 font-medium">
                  CRAFT &bull; UNCOMPROMISED ORIGIN
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#0A0A0A] leading-tight">
                  Fibers That Breathe
                </h2>
              </div>

              <div className="flex gap-2 border-b border-[#E5E7EB] pb-3">
                {[
                  { id: 'cashmere', label: 'Cashmere' },
                  { id: 'silk', label: 'Mulberry Silk' },
                  { id: 'waffle', label: 'Organic Waffle' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveFabric(tab.id as any)}
                    className={`text-xs uppercase tracking-[0.18em] px-3 py-1.5 transition-colors cursor-pointer ${
                      activeFabric === tab.id
                        ? 'border-b-2 border-[#0A0A0A] font-semibold text-[#0A0A0A]'
                        : 'text-[#71717A] hover:text-[#0A0A0A]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h3 className="text-base sm:text-lg font-medium text-[#0A0A0A]">
                    {currentFabricData.name}
                  </h3>
                  <span className="text-[11px] uppercase tracking-wider text-[#71717A]">
                    {currentFabricData.spec}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-light">
                  {currentFabricData.whyPriced}
                </p>

                <div className="text-[11px] tracking-wide text-[#71717A] pt-1">
                  Origin: {currentFabricData.origin}
                </div>
              </div>
            </div>
          </div>

          {/* Promises Grid */}
          <div className="pt-16 border-t border-[#E5E7EB]">
            <div className="mb-8">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#71717A] block mb-1">
                STANDARDS
              </span>
              <h3 className="text-xl sm:text-2xl font-light tracking-tight text-[#0A0A0A]">
                Our Promises
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {promises.map((promise, idx) => (
                <div key={idx} className="space-y-2">
                  <span className="text-[11px] font-mono text-[#94A3B8] block">
                    0{idx + 1}
                  </span>
                  <h4 className="text-sm font-medium text-[#0A0A0A] tracking-tight">
                    {promise.title}
                  </h4>
                  <p className="text-xs text-[#64748B] leading-relaxed font-light">
                    {promise.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
