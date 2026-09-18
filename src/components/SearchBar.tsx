import React, { useRef, useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filteredProducts: Product[];
  onSelectProduct: (product: Product) => void;
  isOpenModal?: boolean;
  onCloseModal?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  filteredProducts,
  onSelectProduct,
  isOpenModal,
  onCloseModal
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpenModal && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpenModal]);

  const handleClear = () => {
    onSearchChange('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const content = (
    <div className="w-full space-y-3">
      {/* Input container */}
      <div className="relative flex items-center">
        <div className="absolute left-4 pointer-events-none text-[#4A6450]">
          <Search className="w-5 h-5" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search products by name, Bengali name, ingredients (e.g. Amla, Methi)..."
          className="w-full pl-12 pr-10 py-3.5 bg-white rounded-2xl border border-[#D0DBD0] text-[#1E2E20] placeholder-[#798C7D] text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5A38] focus:border-transparent shadow-xs transition-all"
        />
        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute right-3.5 p-1 rounded-full text-[#6E8071] hover:text-[#182B1C] hover:bg-[#EEF2EC] transition-colors"
            title="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Live search match count & quick preview if query exists */}
      {searchQuery && (
        <div className="bg-white rounded-2xl p-3 border border-[#DEE5DC] shadow-sm max-h-80 overflow-y-auto space-y-2">
          <div className="flex items-center justify-between text-xs text-[#5B6E5E] px-2 pb-1 border-b border-[#EDF1EC]">
            <span>Found {filteredProducts.length} matching item{filteredProducts.length === 1 ? '' : 's'}</span>
            {searchQuery && (
              <button 
                onClick={handleClear} 
                className="text-[#2D5A38] hover:underline font-semibold"
              >
                Reset
              </button>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-6 text-center text-[#697B6B] text-xs space-y-1">
              <p className="font-semibold text-sm text-[#273B29]">No items matched "{searchQuery}"</p>
              <p>Try searching for "Hair Oil", "Hair Pack", "Dandruff", or "Combo".</p>
            </div>
          ) : (
            <div className="space-y-1.5">
              {filteredProducts.slice(0, 5).map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    if (onCloseModal) onCloseModal();
                  }}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#F2F6F1] cursor-pointer transition-colors group"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-lg bg-[#EAEFEA]"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-[#192E1D] group-hover:text-[#184622] truncate">
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-[#556A59] truncate font-serif">
                      {product.bengaliName}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-bold text-[#1E4D27]">
                        ৳{product.priceBDT}
                      </span>
                      <span className="text-[10px] text-[#869989] line-through">
                        ৳{product.originalPriceBDT}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#7A917F] group-hover:text-[#1F4625] group-hover:translate-x-0.5 transition-transform" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );

  // If configured to be used as a modal dialog
  if (isOpenModal !== undefined) {
    if (!isOpenModal) return null;
    return (
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 animate-in fade-in duration-150">
        <div className="w-full max-w-2xl bg-[#FBFBFA] rounded-3xl p-5 shadow-2xl border border-[#DCE4DA] relative space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E7ECE5]">
            <div className="flex items-center gap-2 text-sm font-bold text-[#18311B]">
              <Search className="w-4 h-4 text-[#2D5A38]" />
              <span>Search Storefront Collection</span>
            </div>
            <button
              onClick={onCloseModal}
              className="p-1.5 rounded-full text-[#6E8071] hover:bg-[#EAEFEA] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {content}
        </div>
      </div>
    );
  }

  // Regular inline search bar
  return content;
};
