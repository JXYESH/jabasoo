import React, { useState, useMemo } from 'react';
import { X, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, ALL_SIZES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ProductSize } from '../types';

export const CollectionPage: React.FC = () => {
  const { navigate, routeParams } = useStore();

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState<string>(routeParams.category || 'all');
  const [selectedSizes, setSelectedSizes] = useState<ProductSize[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<'all' | 'under-25k' | '25k-35k' | '35k-plus'>('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'popularity'>('newest');

  // Filter drawer toggle on mobile
  const [showFilters, setShowFilters] = useState(false);

  // Available unique colors across products
  const availableColors = useMemo(() => {
    const set = new Set<string>();
    PRODUCTS.forEach((p) => p.colors.forEach((c) => set.add(c.name)));
    return Array.from(set);
  }, []);

  // Filter & Sort logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'accessories') {
          if (product.category !== 'accessories') return false;
        } else if (selectedCategory === 'robes') {
          if (product.subcategory !== 'robes') return false;
        } else if (selectedCategory === 'trousers') {
          if (product.subcategory !== 'trousers') return false;
        } else if (selectedCategory === 'knitwear') {
          if (product.subcategory !== 'knitwear') return false;
        } else if (selectedCategory === 'sleepwear') {
          if (product.subcategory !== 'sleepwear') return false;
        } else if (selectedCategory === 'sets') {
          if (product.subcategory !== 'sets') return false;
        }
      }

      // Size filter
      if (selectedSizes.length > 0) {
        const hasSize = selectedSizes.some((s) => product.availableSizes.includes(s));
        if (!hasSize) return false;
      }

      // Color filter
      if (selectedColors.length > 0) {
        const hasColor = selectedColors.some((c) => product.colors.some((col) => col.name === c));
        if (!hasColor) return false;
      }

      // Price filter in INR
      if (priceRange === 'under-25k' && product.price >= 25000) return false;
      if (priceRange === '25k-35k' && (product.price < 25000 || product.price > 35000)) return false;
      if (priceRange === '35k-plus' && product.price < 35000) return false;

      // In stock
      if (inStockOnly && !product.inStock) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'popularity') return b.popularity - a.popularity;
      // Newest
      return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    });
  }, [selectedCategory, selectedSizes, selectedColors, priceRange, inStockOnly, sortBy]);

  const toggleSize = (size: ProductSize) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const clearAllFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange('all');
    setInStockOnly(false);
  };

  const hasActiveFilters =
    selectedSizes.length > 0 ||
    selectedColors.length > 0 ||
    priceRange !== 'all' ||
    inStockOnly;

  return (
    <div className="w-full bg-white text-[#0A0A0A] pb-28">
      {/* Editorial Banner */}
      <div className="relative w-full h-[280px] md:h-[380px] bg-[#F1F3F5] overflow-hidden">
        <img
          src="/src/assets/images/loungewear_silk_robe_living_1793620652768.jpg"
          alt="Collection Lookbook"
          className="w-full h-full object-cover object-[center_35%]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 flex flex-col justify-end w-full px-4 sm:px-6 md:px-10 lg:px-14 pb-10 text-white">
          {/* Breadcrumbs */}
          <nav className="text-xs uppercase tracking-[0.16em] text-white/80 mb-3 flex items-center gap-2">
            <button onClick={() => navigate('home')} className="hover:underline">Home</button>
            <span>/</span>
            <span className="text-white font-medium">Loungewear Collection</span>
          </nav>

          <h1 className="text-3xl md:text-5xl font-light text-white">
            Loungewear Collection
          </h1>
          <p className="text-sm text-white/85 max-w-xl mt-2 font-light">
            Breathable knitwear, washed silk sleep sets, and cocoon robes for relaxed living.
          </p>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-14 pt-8">
        {/* Category Segmented Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-[#E5E7EB] scrollbar-none text-xs uppercase tracking-[0.14em]">
          {[
            { id: 'all', label: 'All Pieces' },
            { id: 'robes', label: 'Robes & Kimonos' },
            { id: 'sets', label: 'Waffle Sets' },
            { id: 'trousers', label: 'Trousers' },
            { id: 'knitwear', label: 'Knitwear' },
            { id: 'sleepwear', label: 'Silk Sleepwear' },
            { id: 'accessories', label: 'Accessories' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 border whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'border-[#111111] bg-[#111111] text-white'
                  : 'border-[#E5E5E5] text-[#555555] hover:border-[#111111] hover:text-[#111111]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Filters & Sorting Bar */}
        <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E5E5E5]">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-medium text-[#111111] border border-[#111111] px-4 py-2.5 hover:bg-[#111111] hover:text-white transition-colors"
            >
              <SlidersHorizontal size={14} />
              <span>{showFilters ? 'Hide Filters' : 'Refine & Filter'}</span>
            </button>

            <span className="text-xs text-[#777777] tabular-nums">
              Showing {filteredProducts.length} of {PRODUCTS.length} items
            </span>
          </div>

          {/* Sorting */}
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-[0.16em] text-[#777777] font-medium hidden sm:inline">
              Sort By:
            </span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-white border border-[#E5E5E5] px-4 py-2.5 pr-8 text-xs uppercase tracking-[0.12em] text-[#111111] font-medium focus:outline-none focus:border-[#111111] cursor-pointer"
              >
                <option value="newest">Newest Arrivals</option>
                <option value="popularity">Most Coveted</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#777777]" />
            </div>
          </div>
        </div>

        {/* Collapsible Refine Filter Tray */}
        {showFilters && (
          <div className="py-6 border-b border-[#E5E5E5] bg-[#FAF9F7] p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Size filter */}
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#777777] font-semibold mb-3">
                  Garment Size
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {ALL_SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`w-9 h-9 text-xs font-medium border transition-colors ${
                        selectedSizes.includes(size)
                          ? 'border-[#111111] bg-[#111111] text-white'
                          : 'border-[#D1D1D1] bg-white text-[#111111] hover:border-[#111111]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color filter */}
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#777777] font-semibold mb-3">
                  Color Shade
                </p>
                <div className="space-y-2">
                  {availableColors.map((color) => (
                    <label
                      key={color}
                      className="flex items-center gap-2.5 text-xs text-[#333333] cursor-pointer hover:text-[#111111]"
                    >
                      <input
                        type="checkbox"
                        checked={selectedColors.includes(color)}
                        onChange={() => toggleColor(color)}
                        className="rounded-none border-[#CCCCCC] text-[#111111] focus:ring-0"
                      />
                      <span>{color}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price range */}
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#777777] font-semibold mb-3">
                  Price Bracket
                </p>
                <div className="space-y-2 text-xs">
                  {[
                    { id: 'all', label: 'All Prices' },
                    { id: 'under-25k', label: 'Under ₹25,000' },
                    { id: '25k-35k', label: '₹25,000 – ₹35,000' },
                    { id: '35k-plus', label: '₹35,000 and above' },
                  ].map((p) => (
                    <label key={p.id} className="flex items-center gap-2.5 cursor-pointer text-[#333333] hover:text-[#111111]">
                      <input
                        type="radio"
                        name="price"
                        checked={priceRange === p.id}
                        onChange={() => setPriceRange(p.id as any)}
                        className="text-[#111111] focus:ring-0"
                      />
                      <span>{p.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#777777] font-semibold mb-3">
                  Availability
                </p>
                <label className="flex items-center gap-2.5 text-xs text-[#333333] cursor-pointer hover:text-[#111111]">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded-none border-[#CCCCCC] text-[#111111] focus:ring-0"
                  />
                  <span>Ready to Ship Immediately</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Active Filter Removable Chips */}
        {hasActiveFilters && (
          <div className="py-4 flex flex-wrap items-center gap-2 border-b border-[#E5E5E5]">
            <span className="text-[11px] uppercase tracking-[0.16em] text-[#777777]">
              Active Filters:
            </span>

            {selectedSizes.map((s) => (
              <button
                key={s}
                onClick={() => toggleSize(s)}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F5F5F5] border border-[#E5E5E5] text-xs text-[#111111] hover:border-[#111111]"
              >
                <span>Size {s}</span>
                <X size={12} />
              </button>
            ))}

            {selectedColors.map((c) => (
              <button
                key={c}
                onClick={() => toggleColor(c)}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F5F5F5] border border-[#E5E5E5] text-xs text-[#111111] hover:border-[#111111]"
              >
                <span>Color: {c}</span>
                <X size={12} />
              </button>
            ))}

            {priceRange !== 'all' && (
              <button
                onClick={() => setPriceRange('all')}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F5F5F5] border border-[#E5E5E5] text-xs text-[#111111] hover:border-[#111111]"
              >
                <span>Price: {priceRange}</span>
                <X size={12} />
              </button>
            )}

            {inStockOnly && (
              <button
                onClick={() => setInStockOnly(false)}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F5F5F5] border border-[#E5E5E5] text-xs text-[#111111] hover:border-[#111111]"
              >
                <span>In Stock Only</span>
                <X size={12} />
              </button>
            )}

            <button
              onClick={clearAllFilters}
              className="text-xs text-[#777777] underline underline-offset-4 hover:text-[#111111] ml-2"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Product Grid: 3 columns desktop, 2 columns mobile as instructed */}
        <div className="pt-10">
          {filteredProducts.length === 0 ? (
            <div className="py-24 text-center">
              <h3 className="text-xl font-serif text-[#111111] mb-2">
                No pieces match your selected refinement
              </h3>
              <p className="text-xs text-[#777777] max-w-sm mx-auto mb-6">
                Please try resetting your size or color criteria to view all available designs.
              </p>
              <button
                onClick={clearAllFilters}
                className="bg-[#111111] text-white text-xs uppercase tracking-[0.16em] font-medium px-6 py-3 hover:bg-[#333333] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12 md:gap-x-10 md:gap-y-16">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
