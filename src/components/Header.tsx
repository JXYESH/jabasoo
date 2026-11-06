import React, { useState, useEffect, useRef } from 'react';
import { Bookmark, ShoppingBag, Menu, X, Search } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { MegaMenu } from './MegaMenu';
import { ShivaLingamLogo } from './ShivaLingamLogo';

export const Header: React.FC = () => {
  const {
    navigate,
    currentRoute,
    itemCount,
    wishlist,
    setIsBagOpen,
    setIsSearchOpen,
  } = useStore();

  const [activeMegaMenu, setActiveMegaMenu] = useState<'loungewear' | 'accessories' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // When scrolling down past 35px, collapse to logo; when scrolling up to top, expand to text
      if (currentScrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (category: 'loungewear' | 'accessories') => {
    setActiveMegaMenu(activeMegaMenu === category ? null : category);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 border-b border-[#E5E7EB] backdrop-blur-md transition-all">
      {/* Top Bar Announcement / Trust Strip (quiet hairline) */}
      <div className="bg-[#0A0A0A] text-white text-[10px] md:text-[11px] tracking-[0.2em] uppercase py-1.5 px-4 text-center font-medium">
        Complimentary Global Express Delivery on All Orders
      </div>

      <div className="relative w-full px-4 sm:px-6 md:px-10 lg:px-14 h-16 md:h-20 flex items-center justify-between">
        {/* Mobile Left: Menu Toggle & Search */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 -ml-2 text-[#0A0A0A] hover:text-[#71717A] focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-[#0A0A0A] hover:text-[#71717A] focus:outline-none"
            aria-label="Open search"
          >
            <Search size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Desktop Left Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-[12px] tracking-[0.16em] uppercase font-medium">
          <button
            onClick={() => handleNavClick('loungewear')}
            onMouseEnter={() => setActiveMegaMenu('loungewear')}
            className={`transition-colors py-2 relative hover:text-[#71717A] ${
              activeMegaMenu === 'loungewear' || (currentRoute === 'collection' && !activeMegaMenu)
                ? 'text-[#0A0A0A]'
                : 'text-[#0A0A0A]'
            }`}
          >
            LOUNGEWEAR
            {activeMegaMenu === 'loungewear' && (
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#0A0A0A]" />
            )}
          </button>

          <button
            onClick={() => {
              setActiveMegaMenu(null);
              setIsSearchOpen(true);
            }}
            className="transition-colors py-2 hover:text-[#71717A] text-[#0A0A0A]"
          >
            SEARCH
          </button>

          <button
            onClick={() => {
              setActiveMegaMenu(null);
              navigate('about');
            }}
            onMouseEnter={() => setActiveMegaMenu(null)}
            className={`transition-colors py-2 hover:text-[#71717A] ${
              currentRoute === 'about' ? 'text-[#0A0A0A] font-semibold' : 'text-[#0A0A0A]'
            }`}
          >
            ABOUT
          </button>
        </nav>

        {/* Center: Brand Wordmark that morphs/collapses in-place into Shiva Lingam logo on scroll */}
        <div className="flex-1 flex items-center justify-center md:absolute md:left-1/2 md:-translate-x-1/2 pointer-events-auto">
          <button
            onClick={() => {
              setActiveMegaMenu(null);
              navigate('home');
            }}
            aria-label="JABASOO Home"
            className="relative w-36 sm:w-56 h-10 sm:h-12 flex items-center justify-center cursor-pointer"
          >
            {/* Expanded Brand Name "Jabasoo" in natural cursive */}
            <span
              className={`absolute inset-0 flex items-center justify-center text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-brand text-[#0A0A0A] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
                isScrolled
                  ? 'opacity-0 scale-50 pointer-events-none'
                  : 'opacity-100 scale-100'
              }`}
            >
              Jabasoo
            </span>

            {/* Collapsed Minimal Shiva Lingam Logo */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
                isScrolled
                  ? 'opacity-100 scale-100 pointer-events-auto'
                  : 'opacity-0 scale-50 pointer-events-none'
              }`}
            >
              <ShivaLingamLogo size={26} className="text-[#111111]" />
            </div>
          </button>
        </div>

        {/* Right Navigation */}
        <div className="flex items-center gap-3 sm:gap-6 text-[12px] tracking-[0.16em] uppercase font-medium">
          {/* Account Button (Text Only, No Icon) */}
          <button
            onClick={() => {
              setActiveMegaMenu(null);
              navigate('account');
            }}
            className="hidden md:inline-block text-[#111111] hover:text-[#777777] transition-colors py-2"
            title="Customer Account"
          >
            ACCOUNT
          </button>

          {/* Bookmark / Wishlist (Icon Only, No Text) */}
          <button
            onClick={() => {
              setActiveMegaMenu(null);
              navigate('wishlist');
            }}
            className="relative flex items-center justify-center p-2 text-[#111111] hover:text-[#777777] transition-colors"
            title="Saved Wishlist"
            aria-label="Wishlist"
          >
            <Bookmark size={19} strokeWidth={1.5} />
            {wishlist.length > 0 && (
              <span className="text-[11px] tabular-nums font-semibold ml-1">
                ({wishlist.length})
              </span>
            )}
          </button>

          {/* Bag Button (Icon Only, No Text) */}
          <button
            onClick={() => {
              setActiveMegaMenu(null);
              setIsBagOpen(true);
            }}
            className="relative flex items-center justify-center p-2 text-[#111111] hover:text-[#777777] transition-colors"
            title="Shopping Bag"
            aria-label="Shopping Bag"
          >
            <ShoppingBag size={19} strokeWidth={1.5} />
            <span className="text-[11px] tabular-nums font-semibold ml-1">
              ({itemCount})
            </span>
          </button>
        </div>
      </div>

      {/* Desktop Mega Menu Dropdown */}
      <MegaMenu
        activeCategory={activeMegaMenu}
        onClose={() => setActiveMegaMenu(null)}
      />

      {/* Full-Screen Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[88px] z-50 bg-white p-6 flex flex-col justify-between overflow-y-auto md:hidden">
          <div className="space-y-6 pt-4">
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#777777] mb-3">
                COLLECTIONS
              </p>
              <div className="space-y-4">
                <button
                  onClick={() => {
                    navigate('collection', { category: 'all' });
                    setMobileMenuOpen(false);
                  }}
                  className="block text-xl font-light text-[#111111] text-left w-full hover:underline"
                >
                  All Loungewear
                </button>
                <button
                  onClick={() => {
                    navigate('collection', { category: 'robes' });
                    setMobileMenuOpen(false);
                  }}
                  className="block text-xl font-light text-[#111111] text-left w-full hover:underline"
                >
                  Cashmere Robes & Kimonos
                </button>
                <button
                  onClick={() => {
                    navigate('collection', { category: 'trousers' });
                    setMobileMenuOpen(false);
                  }}
                  className="block text-xl font-light text-[#111111] text-left w-full hover:underline"
                >
                  Wide-Leg Ribbed Trousers
                </button>
                <button
                  onClick={() => {
                    navigate('collection', { category: 'knitwear' });
                    setMobileMenuOpen(false);
                  }}
                  className="block text-xl font-light text-[#111111] text-left w-full hover:underline"
                >
                  Fine-Gauge Knitwear
                </button>
                <button
                  onClick={() => {
                    navigate('collection', { category: 'sleepwear' });
                    setMobileMenuOpen(false);
                  }}
                  className="block text-xl font-light text-[#111111] text-left w-full hover:underline"
                >
                  Sand-Washed Silk Pajamas
                </button>
                <button
                  onClick={() => {
                    navigate('collection', { category: 'accessories' });
                    setMobileMenuOpen(false);
                  }}
                  className="block text-xl font-light text-[#111111] text-left w-full hover:underline"
                >
                  Linen Wraps & Sleep Sets
                </button>
              </div>
            </div>

            <div className="border-t border-[#E5E5E5] pt-6 space-y-3">
              <button
                onClick={() => {
                  navigate('about');
                  setMobileMenuOpen(false);
                }}
                className="block text-sm tracking-[0.1em] uppercase text-[#111111] text-left w-full font-medium"
              >
                About JABASOO
              </button>
              <button
                onClick={() => {
                  navigate('account');
                  setMobileMenuOpen(false);
                }}
                className="block text-sm tracking-[0.1em] uppercase text-[#111111] text-left w-full font-medium"
              >
                My Account
              </button>
              <button
                onClick={() => {
                  navigate('contact');
                  setMobileMenuOpen(false);
                }}
                className="block text-sm tracking-[0.1em] uppercase text-[#111111] text-left w-full font-medium"
              >
                Contact
              </button>
              <button
                onClick={() => {
                  navigate('policies');
                  setMobileMenuOpen(false);
                }}
                className="block text-sm tracking-[0.1em] uppercase text-[#777777] text-left w-full font-normal"
              >
                Shipping & Returns
              </button>
            </div>
          </div>

          <div className="pt-8 pb-4 border-t border-[#E5E5E5] text-xs text-[#777777] flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ShivaLingamLogo size={18} className="text-[#0A0A0A]" />
              <span className="font-brand text-xl text-[#0A0A0A]">Jabasoo</span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#71717A]">ATELIER</span>
            </div>
            <span className="text-[11px] tracking-wider text-[#71717A]">NEW YORK &bull; MILAN</span>
          </div>
        </div>
      )}
    </header>
  );
};
