import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight } from 'lucide-react';

interface MegaMenuProps {
  activeCategory: 'loungewear' | 'accessories' | null;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ activeCategory, onClose }) => {
  const { navigate } = useStore();
  const menuRef = useRef<HTMLDivElement>(null);
  const [mountedCategory, setMountedCategory] = useState<'loungewear' | 'accessories' | null>(activeCategory);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (activeCategory) {
      setMountedCategory(activeCategory);
      const raf = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(raf);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setMountedCategory(null);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [activeCategory]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (activeCategory) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeCategory, onClose]);

  if (!mountedCategory) return null;

  const isLoungewear = mountedCategory === 'loungewear';

  const categories = isLoungewear
    ? [
        { label: 'All Loungewear', cat: 'all' },
        { label: 'Cashmere Robes & Kimonos', cat: 'robes' },
        { label: 'Ribbed Wide-Leg Trousers', cat: 'trousers' },
        { label: 'Fine-Gauge Knit Tops', cat: 'knitwear' },
        { label: 'Sand-Washed Silk Sets', cat: 'sleepwear' },
        { label: 'Organic Waffle Sets', cat: 'sets' },
      ]
    : [
        { label: 'All Accessories', cat: 'accessories' },
        { label: 'Belgian Linen Lounge Wraps', cat: 'accessories' },
        { label: 'Silk Sleep Masks & Slippers', cat: 'accessories' },
      ];

  const previewImages = isLoungewear
    ? [
        {
          title: 'Cashmere Cocoon',
          img: '/src/assets/images/loungewear_hero_morning_1793620652458.jpg',
          category: 'robes'
        },
        {
          title: 'Washed Mulberry Silk',
          img: '/src/assets/images/loungewear_silk_robe_living_1793620652768.jpg',
          category: 'sleepwear'
        }
      ]
    : [
        {
          title: 'Natural Belgian Linen',
          img: '/src/assets/images/loungewear_cotton_terry_lounge_1793620651698.jpg',
          category: 'accessories'
        },
        {
          title: 'Single-Origin Fibers',
          img: '/src/assets/images/loungewear_cashmere_macro_1793620651967.jpg',
          category: 'accessories'
        }
      ];

  return (
    <div
      ref={menuRef}
      className={`absolute top-full left-0 w-full bg-white border-b border-[#E5E7EB] shadow-[0_16px_36px_rgba(0,0,0,0.06)] z-40 transform transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8 md:px-14 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          
          {/* Minimal Clean Categories List (No subtitles like Loungewear Silhouettes, no shop by ritual) */}
          <div className="md:col-span-6 space-y-3">
            {categories.map((item, idx) => (
              <div key={idx}>
                <button
                  onClick={() => {
                    navigate('collection', { category: item.cat });
                    onClose();
                  }}
                  className="text-sm tracking-wide text-[#0A0A0A] hover:text-[#71717A] transition-colors py-1 block text-left"
                >
                  {item.label}
                </button>
              </div>
            ))}
          </div>

          {/* Two Small Minimal Images in Dropdown */}
          <div className="md:col-span-6 grid grid-cols-2 gap-5">
            {previewImages.map((card, idx) => (
              <button
                key={idx}
                onClick={() => {
                  navigate('collection', { category: card.category });
                  onClose();
                }}
                className="group text-left block cursor-pointer"
              >
                <div className="aspect-[4/3] bg-[#F1F3F5] overflow-hidden mb-2">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-[#0A0A0A]">
                  <span className="font-light">{card.title}</span>
                  <ArrowRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};
