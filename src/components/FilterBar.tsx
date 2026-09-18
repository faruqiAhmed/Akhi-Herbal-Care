import React from 'react';
import { 
  X, 
  RotateCcw, 
  Heart
} from 'lucide-react';
import { CATEGORIES, CONCERNS } from '../data/products';
import { FilterState, ProductCategory, HairConcern } from '../types';

interface FilterBarProps {
  filterState: FilterState;
  onFilterChange: (newFilter: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalProducts: number;
  filteredCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filterState,
  onFilterChange,
  onResetFilters,
  totalProducts,
  filteredCount
}) => {
  // Check how many non-default filters are active
  const activeFiltersCount = [
    filterState.category !== 'all',
    filterState.concern !== 'all',
    filterState.search.trim() !== ''
  ].filter(Boolean).length;

  return (
    <div className="w-full space-y-4">
      {/* Category Pills (Horizontal scrolling on mobile) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = filterState.category === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onFilterChange({ category: cat.id as ProductCategory })}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#183E21] text-white shadow-sm ring-1 ring-[#183E21]'
                  : 'bg-white text-[#384F3D] hover:bg-[#EEF3ED] border border-[#DEE4DC]'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] hidden sm:inline ${isActive ? 'text-[#BCE0C3]' : 'text-[#758A7A]'}`}>
                ({cat.bengali})
              </span>
            </button>
          );
        })}
      </div>

      {/* Secondary Controls: Hair Concern Pills & Filter Summary */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-[#EAEFE8]">
        
        {/* Concern filter row */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full sm:max-w-2xl scrollbar-none">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#637766] shrink-0 mr-1 flex items-center gap-1">
            <Heart className="w-3 h-3 text-[#2D5A38]" /> Concern:
          </span>
          {CONCERNS.map((c) => {
            const isSelected = filterState.concern === c.id;
            return (
              <button
                key={c.id}
                onClick={() => onFilterChange({ concern: c.id as HairConcern })}
                className={`whitespace-nowrap text-xs px-3 py-1 rounded-lg font-medium transition-colors shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#2E6039] text-white font-semibold'
                    : 'bg-[#EFF3EE] text-[#455D4A] hover:bg-[#E3EAE1]'
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Right side: Mobile Filter Modal trigger if needed */}
        {activeFiltersCount > 0 && (
          <div className="flex items-center gap-2.5 ml-auto">
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 text-[#C0392B] hover:text-[#96281B] font-semibold text-xs py-1.5 px-2.5 rounded-lg border border-[#F2D7D5] bg-[#FDEDEC] cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        )}
      </div>

      {/* Active Filter Chips & Reset All */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
          <span className="text-[#647967] font-medium">Active filters:</span>
          
          {filterState.category !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#E7EFE8] text-[#1E4525] rounded-full font-medium">
              Category: {CATEGORIES.find((c) => c.id === filterState.category)?.label}
              <button onClick={() => onFilterChange({ category: 'all' })} className="hover:text-black">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filterState.concern !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#E7EFE8] text-[#1E4525] rounded-full font-medium">
              Concern: {CONCERNS.find((c) => c.id === filterState.concern)?.label}
              <button onClick={() => onFilterChange({ concern: 'all' })} className="hover:text-black">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filterState.search && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#E7EFE8] text-[#1E4525] rounded-full font-medium">
              "{filterState.search}"
              <button onClick={() => onFilterChange({ search: '' })} className="hover:text-black">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-1 text-[#C0392B] hover:text-[#96281B] font-semibold text-xs ml-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        </div>
      )}
    </div>
  );
};
