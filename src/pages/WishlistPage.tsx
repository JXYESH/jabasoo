import React from 'react';
import { Bookmark, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const WishlistPage: React.FC = () => {
  const { wishlist, navigate, addToBag } = useStore();

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="w-full bg-white text-[#111111] pb-28">
      {/* Page Header */}
      <div className="border-b border-[#E5E5E5] bg-[#FAF9F7]">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-14 py-12 md:py-16">
          <nav className="text-xs uppercase tracking-[0.16em] text-[#777777] mb-3 flex items-center gap-2">
            <button onClick={() => navigate('home')} className="hover:text-[#111111]">Home</button>
            <span>/</span>
            <span className="text-[#111111] font-medium">Saved Items</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-light text-[#111111]">
                Wishlist
              </h1>
              <p className="text-xs text-[#777777] mt-1">
                Your saved pieces.
              </p>
            </div>
            <span className="text-xs uppercase tracking-[0.16em] text-[#777777] tabular-nums font-medium">
              {savedProducts.length} {savedProducts.length === 1 ? 'Item' : 'Items'}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-14 pt-12">
        {savedProducts.length === 0 ? (
          <div className="py-24 text-center max-w-md mx-auto">
            <div className="w-14 h-14 rounded-full border border-[#E5E5E5] flex items-center justify-center mx-auto mb-4 text-[#777777]">
              <Bookmark size={22} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-light text-[#111111] mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-xs text-[#777777] leading-relaxed mb-6">
              Save items you like to revisit them later.
            </p>
            <button
              onClick={() => navigate('collection')}
              className="bg-[#111111] text-white text-xs uppercase tracking-[0.2em] font-medium px-8 py-4 hover:bg-[#333333] transition-colors"
            >
              Explore Loungewear
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12 md:gap-x-10 md:gap-y-16">
              {savedProducts.map((product) => (
                <div key={product.id} className="flex flex-col">
                  <ProductCard product={product} />

                  {/* Quick Action under card */}
                  <div className="pt-3">
                    <button
                      onClick={() => {
                        const firstColor = product.colors[0].name;
                        const firstSize = product.availableSizes[0] || 'M';
                        addToBag(product.id, firstColor, firstSize, 1);
                      }}
                      className="w-full border border-[#E5E5E5] hover:border-[#111111] py-2.5 text-xs uppercase tracking-[0.16em] font-medium text-[#111111] flex items-center justify-center gap-2 transition-colors"
                    >
                      <ShoppingBag size={13} />
                      <span>Quick Add ({product.availableSizes[0] || 'M'})</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-12 border-t border-[#E5E5E5] flex justify-between items-center text-xs text-[#777777]">
              <span>Items are saved across your browser visits.</span>
              <button
                onClick={() => navigate('collection')}
                className="underline underline-offset-4 text-[#111111] hover:text-[#777777]"
              >
                Continue Browsing Collection →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
