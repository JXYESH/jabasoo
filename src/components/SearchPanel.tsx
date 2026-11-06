import React, { useEffect, useRef, useState } from 'react';
import { X, Search as SearchIcon, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';

export const SearchPanel: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigate } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const POPULAR_SEARCHES = [
    'Cashmere Robe',
    'Silk Trouser',
    'Mongolian Knitwear',
    'Milanese Kimono',
    'Sleep Mask',
    'Linen Wrap'
  ];

  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (isSearchOpen) {
      setMounted(true);
      document.body.style.overflow = 'hidden';
      const raf = requestAnimationFrame(() => {
        setActive(true);
        setTimeout(() => inputRef.current?.focus(), 150);
      });
      return () => cancelAnimationFrame(raf);
    } else {
      setActive(false);
      const timer = setTimeout(() => {
        setMounted(false);
        setSearchTerm('');
        document.body.style.overflow = '';
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isSearchOpen]);

  const handleClose = () => {
    setActive(false);
    setTimeout(() => {
      setIsSearchOpen(false);
    }, 350);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  if (!mounted && !isSearchOpen) return null;

  const filteredProducts = searchTerm.trim() === ''
    ? []
    : PRODUCTS.filter((p) => {
        const query = searchTerm.toLowerCase();
        return (
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.composition.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.subcategory.toLowerCase().includes(query)
        );
      });

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-350 ease-out ${
          active ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        {/* Right-side panel on desktop, full-screen on mobile */}
        <div
          className={`w-screen max-w-md md:max-w-[460px] bg-white flex flex-col shadow-2xl z-10 transform transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            active ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Header & Search Input */}
          <div className="p-6 border-b border-[#E5E5E5] space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#777777]">
                SEARCH CATALOGUE
              </h2>
              <button
                onClick={handleClose}
                className="p-1.5 text-[#111111] hover:text-[#777777] transition-colors"
                aria-label="Close search"
              >
                <X size={19} strokeWidth={1.5} />
              </button>
            </div>

            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search cashmere, silk trousers, robes..."
                className="w-full bg-[#F5F5F5] border border-transparent px-4 py-3.5 pr-10 text-sm text-[#111111] placeholder:text-[#777777] focus:outline-none focus:bg-white focus:border-[#111111] transition-all"
              />
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#777777]">
                <SearchIcon size={16} />
              </div>
            </div>
          </div>

          {/* Results / Suggestions Container */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {searchTerm.trim() === '' ? (
              <div className="space-y-6">
                <div>
                  <p className="text-[11px] tracking-[0.2em] uppercase text-[#777777] font-medium mb-3">
                    POPULAR SEARCHES
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_SEARCHES.map((query) => (
                      <button
                        key={query}
                        onClick={() => setSearchTerm(query)}
                        className="text-xs text-[#111111] bg-[#F5F5F5] hover:bg-[#E5E5E5] px-3.5 py-2 transition-colors border border-[#E5E5E5]"
                      >
                        {query}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[#E5E5E5] pt-6">
                  <p className="text-[11px] tracking-[0.2em] uppercase text-[#777777] font-medium mb-3">
                    CURATED ARCHIVE
                  </p>
                  <div className="space-y-3">
                    {PRODUCTS.slice(0, 3).map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          navigate('product', { id: p.id });
                        }}
                        className="flex items-center gap-3.5 cursor-pointer group p-1.5 -mx-1.5 hover:bg-[#F9F9F9] transition-colors"
                      >
                        <div className="w-12 h-16 bg-[#F5F5F5] overflow-hidden shrink-0">
                          <img
                            src={p.colors[0].images[0]}
                            alt={p.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xs font-medium text-[#111111] group-hover:underline">
                            {p.name}
                          </h4>
                          <span className="text-xs text-[#71717A] tabular-nums">₹{p.price.toLocaleString('en-IN')}</span>
                        </div>
                        <ArrowRight size={14} className="text-[#CCCCCC] group-hover:text-[#111111] transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-sm font-serif text-[#111111] mb-2">
                  No pieces found matching &ldquo;{searchTerm}&rdquo;
                </p>
                <p className="text-xs text-[#777777] max-w-xs mx-auto">
                  Try searching by textile (&ldquo;cashmere&rdquo;, &ldquo;silk&rdquo;, &ldquo;linen&rdquo;) or garment category.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-[11px] tracking-[0.2em] uppercase text-[#777777] font-medium">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'RESULT' : 'RESULTS'} FOUND
                </p>
                <div className="divide-y divide-[#F0F0F0]">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        setIsSearchOpen(false);
                        navigate('product', { id: product.id });
                      }}
                      className="py-4 flex items-center gap-4 cursor-pointer group"
                    >
                      <div className="w-16 h-20 bg-[#F5F5F5] overflow-hidden shrink-0 border border-[#E5E5E5]">
                        <img
                          src={product.colors[0].images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase tracking-[0.16em] text-[#777777] block mb-0.5">
                          {product.category}
                        </span>
                        <h4 className="text-sm font-medium text-[#111111] group-hover:underline truncate">
                          {product.name}
                        </h4>
                        <p className="text-xs text-[#777777] truncate mt-0.5">
                          {product.composition}
                        </p>
                        <span className="text-xs text-[#111111] font-medium tabular-nums mt-1 block">
                          ${product.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
