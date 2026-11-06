import React, { useState, useEffect } from 'react';
import { Bookmark, AlertCircle, ChevronDown, Plus, Minus, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, ALL_SIZES } from '../data/products';
import { ProductSize } from '../types';

export const ProductDetailPage: React.FC = () => {
  const { routeParams, navigate, addToBag, isBookmarked, toggleBookmark, openInfoDrawer } = useStore();
  const productId = routeParams.id || PRODUCTS[0].id;
  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedColorIndex(0);
    setSelectedSize(null);
    setSizeError(false);
  }, [productId]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeColor = product.colors[selectedColorIndex] || product.colors[0];
  const isSaved = isBookmarked(product.id);

  const handleSizeSelect = (size: ProductSize) => {
    setSelectedSize(size);
    setSizeError(false);
  };

  const handleAddToBag = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    addToBag(product.id, activeColor.name, selectedSize, quantity);
  };

  const viewLabels = ['Campaign Look', 'Tactile Texture', 'Living Drape', 'Atelier Tailoring'];

  return (
    <div className="w-full bg-white text-[#0A0A0A]">
      {/* Breadcrumb strip */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-14 py-3.5 border-b border-[#E5E7EB]">
        <nav className="text-xs uppercase tracking-[0.16em] text-[#71717A] flex items-center gap-2">
          <button onClick={() => navigate('home')} className="hover:text-[#0A0A0A] transition-colors">Home</button>
          <span>/</span>
          <button onClick={() => navigate('collection')} className="hover:text-[#0A0A0A] transition-colors">Loungewear</button>
          <span>/</span>
          <span className="text-[#0A0A0A] font-medium truncate max-w-[200px] sm:max-w-none">{product.name}</span>
        </nav>
      </div>

      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-14 py-6 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* LEFT: Large vertically scrollable product image gallery */}
          <div className="lg:col-span-7 space-y-6">
            {activeColor.images.map((imgSrc, idx) => (
              <div
                key={`${activeColor.name}-${idx}`}
                className="relative aspect-[3/4] w-full bg-[#F1F3F5] overflow-hidden"
              >
                <img
                  src={imgSrc}
                  alt={`${product.name} - ${viewLabels[idx] || `View ${idx + 1}`}`}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-5 left-5 text-[10px] tracking-[0.2em] uppercase font-medium text-[#0A0A0A] bg-white/90 backdrop-blur-sm px-3 py-1 border border-[#E5E7EB]">
                  {viewLabels[idx] || `View 0${idx + 1}`}
                </span>
              </div>
            ))}
          </div>

          {/* RIGHT: Compact Sticky Purchase Panel (Add to bag visible before scroll) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col items-center text-center py-2 md:py-4 space-y-5 max-w-lg mx-auto w-full">
            
            {/* Header Block: Title, Ratings & Saved, Price */}
            <div className="w-full space-y-3 flex flex-col items-center">
              {/* Product Title */}
              <h1 className="text-2xl sm:text-3xl font-light text-[#0A0A0A] leading-snug tracking-tight text-center max-w-md">
                {product.name}
              </h1>

              {/* Rating & Save/Bookmark directly below the product name */}
              <div className="flex items-center justify-center gap-3.5 text-xs text-[#0A0A0A]">
                <div className="flex items-center gap-1.5">
                  <div className="flex text-[#0A0A0A] text-xs tracking-tight select-none">
                    ★★★★★
                  </div>
                  <span className="font-medium tabular-nums">5.0</span>
                  <span className="text-[#71717A]">(48 reviews)</span>
                </div>

                <span className="text-[#D4D4D8] select-none">•</span>

                {/* Bookmark / Save Button */}
                <button
                  onClick={() => toggleBookmark(product.id)}
                  aria-label={isSaved ? 'Remove from saved' : 'Save item'}
                  className="flex items-center gap-1.5 text-xs text-[#0A0A0A] hover:text-[#71717A] transition-colors cursor-pointer group"
                >
                  <Bookmark
                    size={14}
                    strokeWidth={1.5}
                    className={isSaved ? 'fill-[#0A0A0A] text-[#0A0A0A]' : 'text-[#0A0A0A] group-hover:scale-110 transition-transform'}
                  />
                  <span className="font-medium underline underline-offset-4 decoration-[#E5E7EB] group-hover:decoration-[#0A0A0A]">
                    {isSaved ? 'Saved' : 'Save'}
                  </span>
                </button>
              </div>

              {/* Crisp 3-line product description directly below name/rating (Collapses smoothly on scroll) */}
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden max-w-md ${
                  isScrolled
                    ? 'max-h-0 opacity-0 py-0'
                    : 'max-h-24 opacity-100 py-1'
                }`}
              >
                <p className="text-xs text-[#475569] leading-relaxed font-light text-center line-clamp-3">
                  {product.description}
                </p>
              </div>

              {/* Price in INR */}
              <div className="pt-0.5">
                <span className="text-2xl font-light text-[#0A0A0A] tabular-nums">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Color Swatch Selection */}
            <div className="w-full space-y-2 flex flex-col items-center border-t border-[#E5E7EB] pt-4">
              <div className="text-xs flex items-center justify-center gap-2">
                <span className="uppercase tracking-[0.16em] text-[#71717A]">
                  Color:
                </span>
                <span className="text-[#0A0A0A] font-medium">{activeColor.name}</span>
              </div>

              <div className="flex items-center justify-center gap-3 pt-0.5">
                {product.colors.map((color, idx) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColorIndex(idx)}
                    title={color.name}
                    className={`group relative p-0.5 rounded-full border-2 transition-all cursor-pointer ${
                      selectedColorIndex === idx
                        ? 'border-[#0A0A0A] scale-110'
                        : 'border-transparent hover:border-[#CBD5E1]'
                    }`}
                  >
                    <span
                      className="w-6 h-6 rounded-full block border border-[#E5E7EB]"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="w-full space-y-2.5 flex flex-col items-center border-t border-[#E5E7EB] pt-4">
              <div className="flex items-center justify-between w-full max-w-sm px-1 text-xs">
                <span className="uppercase tracking-[0.16em] text-[#71717A]">
                  Select Size
                </span>
                <button
                  onClick={() => openInfoDrawer('size-guide', product.id)}
                  className="text-xs text-[#0A0A0A] underline underline-offset-4 hover:text-[#71717A] transition-colors"
                >
                  Size Guide
                </button>
              </div>

              {/* Sizes grid: XS to 6XL */}
              <div className="grid grid-cols-5 gap-1.5 w-full max-w-sm">
                {ALL_SIZES.map((size) => {
                  const isAvailable = product.availableSizes.includes(size);
                  const isSelected = selectedSize === size;

                  return (
                    <button
                      key={size}
                      disabled={!isAvailable}
                      onClick={() => handleSizeSelect(size)}
                      className={`h-9 text-xs font-medium border transition-all cursor-pointer ${
                        !isAvailable
                          ? 'border-[#E5E7EB] text-[#9CA3AF] bg-[#F9FAFB] cursor-not-allowed line-through'
                          : isSelected
                          ? 'border-[#0A0A0A] bg-[#0A0A0A] text-white'
                          : 'border-[#E5E7EB] bg-white text-[#0A0A0A] hover:border-[#0A0A0A]'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>

              {sizeError && (
                <div className="flex items-center justify-center gap-2 text-xs text-[#DC2626] pt-0.5">
                  <AlertCircle size={13} />
                  <span>Please select a size to continue.</span>
                </div>
              )}
            </div>

            {/* Quantity Selector & ADD TO BAG (Prominently visible before scroll) */}
            <div className="w-full max-w-sm space-y-3 pt-1">
              <div className="flex items-center gap-3 w-full">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-[#E5E7EB] bg-white h-12 px-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-full flex items-center justify-center text-[#71717A] hover:text-[#0A0A0A] transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="w-7 text-center text-xs font-medium tabular-nums text-[#0A0A0A]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-full flex items-center justify-center text-[#71717A] hover:text-[#0A0A0A] transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus size={13} />
                  </button>
                </div>

                {/* Primary Add to Bag Button */}
                <button
                  onClick={handleAddToBag}
                  className="flex-1 bg-[#0A0A0A] text-white h-12 text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 hover:bg-[#27272A] transition-colors cursor-pointer shadow-sm"
                >
                  <span>Add to Bag</span>
                  <span className="tabular-nums opacity-80">· ₹{(product.price * quantity).toLocaleString('en-IN')}</span>
                </button>
              </div>

              <p className="text-[11px] text-[#71717A] text-center">
                Complimentary express shipping across India &amp; global delivery
              </p>
            </div>



            {/* Product Information Drawers */}
            <div className="w-full max-w-sm border-t border-[#E5E7EB] divide-y divide-[#E5E7EB] pt-1">
              <button
                onClick={() => openInfoDrawer('details', product.id)}
                className="w-full py-3.5 flex items-center justify-between text-xs uppercase tracking-[0.16em] font-medium text-[#0A0A0A] hover:text-[#71717A] transition-colors cursor-pointer"
              >
                <span>Garment Specifications</span>
                <span className="text-base font-light">+</span>
              </button>
              <button
                onClick={() => openInfoDrawer('size-fit', product.id)}
                className="w-full py-3.5 flex items-center justify-between text-xs uppercase tracking-[0.16em] font-medium text-[#0A0A0A] hover:text-[#71717A] transition-colors cursor-pointer"
              >
                <span>Fit &amp; Proportions</span>
                <span className="text-base font-light">+</span>
              </button>
              <button
                onClick={() => openInfoDrawer('certificates', product.id)}
                className="w-full py-3.5 flex items-center justify-between text-xs uppercase tracking-[0.16em] font-medium text-[#0A0A0A] hover:text-[#71717A] transition-colors cursor-pointer"
              >
                <span>Fiber Ethics &amp; Standards</span>
                <span className="text-base font-light">+</span>
              </button>
              <button
                onClick={() => openInfoDrawer('returns', product.id)}
                className="w-full py-3.5 flex items-center justify-between text-xs uppercase tracking-[0.16em] font-medium text-[#0A0A0A] hover:text-[#71717A] transition-colors cursor-pointer"
              >
                <span>Complimentary Delivery &amp; Returns</span>
                <span className="text-base font-light">+</span>
              </button>
            </div>

          </div>
        </div>

        {/* Pairing / Companion Section */}
        <div className="mt-20 pt-14 border-t border-[#E5E7EB]">
          <div className="flex items-baseline justify-between mb-8">
            <div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#71717A] font-medium block mb-1">
                FOUNDATIONS
              </span>
              <h3 className="text-xl sm:text-2xl font-light text-[#0A0A0A]">
                Complementary Pieces
              </h3>
            </div>
            <button
              onClick={() => navigate('collection')}
              className="text-xs uppercase tracking-[0.16em] font-medium text-[#0A0A0A] underline underline-offset-4 hover:text-[#71717A]"
            >
              View Full Collection
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4).map((companion) => (
              <div
                key={companion.id}
                onClick={() => navigate('product', { id: companion.id })}
                className="group cursor-pointer space-y-2.5"
              >
                <div className="aspect-[3/4] bg-[#F1F3F5] overflow-hidden">
                  <img
                    src={companion.colors[0].images[0]}
                    alt={companion.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h4 className="text-xs font-medium text-[#0A0A0A] group-hover:underline truncate">
                  {companion.name}
                </h4>
                <p className="text-xs text-[#71717A] tabular-nums">₹{companion.price.toLocaleString('en-IN')}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
