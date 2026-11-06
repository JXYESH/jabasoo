import React, { useState } from 'react';
import { Bookmark } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigate, isBookmarked, toggleBookmark } = useStore();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const activeColor = product.colors[selectedColorIndex] || product.colors[0];
  const primaryImg = activeColor.images[0] || '/src/assets/images/hero_loungewear_campaign_1793612595821.jpg';
  const secondaryImg = activeColor.images[1] || primaryImg;

  const saved = isBookmarked(product.id);

  const handleCardClick = () => {
    navigate('product', { id: product.id });
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBookmark(product.id);
  };

  const handleColorClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setSelectedColorIndex(index);
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer flex flex-col relative transition-all duration-500 hover:-translate-y-1.5"
    >
      {/* Image Container with Consistent Aspect Ratio (3:4 luxury editorial portrait) */}
      <div className="relative aspect-[3/4] w-full bg-[#F1F3F5] overflow-hidden mb-4">
        {/* Primary Image */}
        <img
          src={isHovered && secondaryImg ? secondaryImg : primaryImg}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-[1.02]"
          referrerPolicy="no-referrer"
        />

        {/* Bookmark Button (Bookmark icon, strictly not a heart icon) */}
        <button
          onClick={handleBookmarkClick}
          aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
          className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#0A0A0A] hover:bg-white transition-all shadow-sm z-10 border border-[#E5E7EB]"
        >
          <Bookmark
            size={16}
            strokeWidth={1.5}
            className={`transition-colors ${
              saved ? 'fill-[#0A0A0A] text-[#0A0A0A]' : 'text-[#0A0A0A] group-hover:text-black'
            }`}
          />
        </button>

        {/* New Badge (minimal text, zero pills) */}
        {product.isNew && (
          <div className="absolute top-3.5 left-3.5 text-[10px] uppercase tracking-[0.18em] font-medium text-[#0A0A0A] bg-white/90 backdrop-blur-sm px-2.5 py-0.5 border border-[#E5E7EB]">
            New
          </div>
        )}
      </div>

      {/* Product Meta */}
      <div className="flex flex-col gap-1.5 px-0.5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-sm md:text-[15px] font-medium text-[#0A0A0A] leading-snug group-hover:underline underline-offset-4 line-clamp-1">
            {product.name}
          </h3>
          <span className="text-sm font-normal text-[#0A0A0A] tabular-nums whitespace-nowrap shrink-0">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
        </div>

        <p className="text-xs text-[#71717A] line-clamp-1">
          {product.composition}
        </p>

        {/* Color Swatches */}
        <div className="flex items-center gap-2 pt-1.5">
          {product.colors.map((color, idx) => (
            <button
              key={color.name}
              onClick={(e) => handleColorClick(e, idx)}
              title={color.name}
              className={`w-3.5 h-3.5 rounded-full border transition-all ${
                selectedColorIndex === idx
                  ? 'ring-1 ring-[#0A0A0A] ring-offset-2 border-[#0A0A0A]'
                  : 'border-[#D1D5DB] hover:border-[#6B7280]'
              }`}
              style={{ backgroundColor: color.hex }}
              aria-label={`Select color ${color.name}`}
            />
          ))}
          <span className="text-[11px] text-[#71717A] ml-1">
            {product.colors.length} {product.colors.length === 1 ? 'shade' : 'shades'}
          </span>
        </div>
      </div>
    </div>
  );
};
