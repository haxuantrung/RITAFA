import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown, Filter, SlidersHorizontal, X } from 'lucide-react';
import { Badge, Button, Drawer, ElementGlyph, ProgressBar } from '@components/ui';
import { ProductCard } from '@components/product/ProductCard';
import { PRODUCTS } from '@/data/products';
import { ELEMENTS } from '@/data/elements';
import type { ElementCode, ProductCategory } from '@/types';
import { cn } from '@/utils/cn';
import { formatCompactVND } from '@/utils/formatters';

type SortKey = 'newest' | 'price-asc' | 'price-desc' | 'best-selling';

const SORTS: { key: SortKey; label: string }[] = [
  { key: 'newest', label: 'Mới nhất' },
  { key: 'best-selling', label: 'Bán chạy' },
  { key: 'price-asc', label: 'Giá: Thấp → Cao' },
  { key: 'price-desc', label: 'Giá: Cao → Thấp' },
];

const CATEGORIES: { key: ProductCategory; label: string }[] = [
  { key: 'tops', label: 'Áo' },
  { key: 'bottoms', label: 'Quần' },
  { key: 'outerwear', label: 'Khoác ngoài' },
  { key: 'underlayer', label: 'Lớp lót' },
  { key: 'accessories', label: 'Phụ kiện' },
];

const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const;

function FilterPanel({
  selectedElements,
  toggleElement,
  selectedCategories,
  toggleCategory,
  selectedSizes,
  toggleSize,
  priceRange,
  setPriceRange,
  selectedTechs,
  toggleTech,
  clearAll,
}: {
  selectedElements: ElementCode[];
  toggleElement: (c: ElementCode) => void;
  selectedCategories: ProductCategory[];
  toggleCategory: (c: ProductCategory) => void;
  selectedSizes: string[];
  toggleSize: (s: string) => void;
  priceRange: [number, number];
  setPriceRange: (r: [number, number]) => void;
  selectedTechs: string[];
  toggleTech: (t: string) => void;
  clearAll: () => void;
}) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h4 className="font-display text-lg font-semibold tracking-tight">Filter</h4>
        <button onClick={clearAll} className="font-mono text-[10px] uppercase tracking-widest text-amber-500 hover:underline">
          Clear all
        </button>
      </div>

      {/* Element */}
      <fieldset>
        <legend className="lab-label mb-3">Element</legend>
        <div className="grid grid-cols-2 gap-2">
          {ELEMENTS.map((el) => {
            const isOn = selectedElements.includes(el.code);
            return (
              <button
                key={el.code}
                type="button"
                onClick={() => toggleElement(el.code)}
                className={cn(
                  'flex items-center gap-2 rounded-xl border px-3 py-2 text-left text-sm transition-all',
                  isOn
                    ? 'border-current ring-2 ring-current/20'
                    : 'border-black/[0.06] hover:border-black/30 dark:border-white/[0.06] dark:hover:border-white/30',
                )}
                style={isOn ? { color: el.hex } : undefined}
              >
                <ElementGlyph code={el.code} size="sm" />
                <span className="text-ink-900 dark:text-white">{el.name}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Category */}
      <fieldset>
        <legend className="lab-label mb-3">Category</legend>
        <ul className="space-y-2">
          {CATEGORIES.map((c) => {
            const isOn = selectedCategories.includes(c.key);
            return (
              <li key={c.key}>
                <label className="flex cursor-pointer items-center gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={isOn}
                    onChange={() => toggleCategory(c.key)}
                    className="h-4 w-4 rounded border-ink-300 text-amber-500 focus:ring-amber-500 dark:border-ink-600 dark:bg-ink-800"
                  />
                  {c.label}
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>

      {/* Size */}
      <fieldset>
        <legend className="lab-label mb-3">Size</legend>
        <div className="flex flex-wrap gap-2">
          {ALL_SIZES.map((s) => {
            const isOn = selectedSizes.includes(s);
            return (
              <button
                key={s}
                type="button"
                onClick={() => toggleSize(s)}
                className={cn(
                  'h-9 w-12 rounded-md border font-mono text-xs uppercase transition-all',
                  isOn
                    ? 'border-amber-500 bg-amber-500 text-ink-900'
                    : 'border-black/[0.06] hover:border-amber-500 dark:border-white/[0.06]',
                )}
              >
                {s}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Price */}
      <fieldset>
        <legend className="lab-label mb-3">Price</legend>
        <div className="space-y-3">
          <div className="flex items-center justify-between font-mono text-xs">
            <span>{formatCompactVND(priceRange[0])}</span>
            <span>{formatCompactVND(priceRange[1])}</span>
          </div>
          <input
            type="range"
            min={0}
            max={5_000_000}
            step={100_000}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value, 10)])}
            className="w-full accent-amber-500"
          />
          <ProgressBar value={(priceRange[1] / 5_000_000) * 100} tone="amber" thickness="thin" />
        </div>
      </fieldset>

      {/* Tech */}
      <fieldset>
        <legend className="lab-label mb-3">Fabric Tech</legend>
        <div className="space-y-2">
          {['4-way stretch', 'Quick-dry', 'Anti-bacterial', 'Wrinkle-resistant', 'Cooling', 'Organic'].map(
            (t) => {
              const isOn = selectedTechs.includes(t);
              return (
                <label key={t} className="flex cursor-pointer items-center gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={isOn}
                    onChange={() => toggleTech(t)}
                    className="h-4 w-4 rounded border-ink-300 text-amber-500 focus:ring-amber-500 dark:border-ink-600 dark:bg-ink-800"
                  />
                  {t}
                </label>
              );
            },
          )}
        </div>
      </fieldset>
    </div>
  );
}

/**
 * Product Listing Page (PLP).
 * REQS §4.1.2: Sidebar filter (real-time, URL params), Sort, Infinite scroll-feel, Grid 4/2/1.
 */
export function ProductListingPage() {
  const [params, setParams] = useSearchParams();
  const initialEl = params.get('element') as ElementCode | null;

  const [selectedElements, setSelectedElements] = useState<ElementCode[]>(initialEl ? [initialEl] : []);
  const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5_000_000]);
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>('newest');
  const [filterOpen, setFilterOpen] = useState(false);

  const toggle = <T,>(arr: T[], setArr: (v: T[]) => void, value: T) =>
    setArr(arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (selectedElements.length) list = list.filter((p) => selectedElements.includes(p.element));
    if (selectedCategories.length) list = list.filter((p) => selectedCategories.includes(p.category));
    if (selectedSizes.length)
      list = list.filter((p) =>
        p.sizes.some((s) => selectedSizes.includes(s.label) && s.stock > 0),
      );
    list = list.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'best-selling': list.sort((a, b) => b.soldCount - a.soldCount); break;
      default: list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
    }
    return list;
  }, [selectedElements, selectedCategories, selectedSizes, priceRange, sort]);

  const activeFilterCount =
    selectedElements.length + selectedCategories.length + selectedSizes.length + selectedTechs.length +
    (priceRange[1] < 5_000_000 ? 1 : 0);

  const clearAll = () => {
    setSelectedElements([]);
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedTechs([]);
    setPriceRange([0, 5_000_000]);
    setParams({});
  };

  const filterProps = {
    selectedElements,
    toggleElement: (c: ElementCode) => toggle(selectedElements, setSelectedElements, c),
    selectedCategories,
    toggleCategory: (c: ProductCategory) => toggle(selectedCategories, setSelectedCategories, c),
    selectedSizes,
    toggleSize: (s: string) => toggle(selectedSizes, setSelectedSizes, s),
    priceRange,
    setPriceRange,
    selectedTechs,
    toggleTech: (t: string) => toggle(selectedTechs, setSelectedTechs, t),
    clearAll,
  };

  return (
    <div className="bg-white dark:bg-ink-950">
      {/* Hero strip */}
      <header className="border-b border-black/[0.06] bg-ink-50 dark:border-white/[0.06] dark:bg-ink-900">
        <div className="mx-auto flex max-w-screen-2xl flex-col gap-3 px-4 py-10 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-10 lg:py-16">
          <div className="space-y-2">
            <p className="lab-label">// Shop · All Elements</p>
            <h1 className="font-display text-h2 font-semibold tracking-tight">
              {selectedElements.length === 1
                ? `[${selectedElements[0]}] ${ELEMENTS.find((e) => e.code === selectedElements[0])?.name}`
                : 'Year One Collection'}
            </h1>
            <p className="max-w-xl text-muted">
              {filtered.length.toString().padStart(2, '0')} sản phẩm · Engineered for everyday science.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {ELEMENTS.map((el) => {
              const isOn = selectedElements.includes(el.code);
              return (
                <button
                  key={el.code}
                  type="button"
                  onClick={() => filterProps.toggleElement(el.code)}
                  className={cn(
                    'rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-all',
                    isOn ? 'border-current' : 'border-black/[0.08] dark:border-white/[0.08]',
                  )}
                  style={isOn ? { color: el.hex } : undefined}
                >
                  [{el.code}] {el.name}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main grid */}
      <div className="mx-auto grid max-w-screen-2xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-10">
        {/* Sidebar (desktop) */}
        <aside className="hidden lg:block">
          <div className="sticky top-32">
            <FilterPanel {...filterProps} />
          </div>
        </aside>

        {/* Right column */}
        <div className="space-y-6">
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFilterOpen(true)}
                leftIcon={<Filter className="h-3.5 w-3.5" />}
                className="lg:hidden"
              >
                Filter
                {activeFilterCount > 0 && (
                  <Badge tone="amber" className="ml-1">{activeFilterCount}</Badge>
                )}
              </Button>
              <div className="hidden font-mono text-xs uppercase tracking-widest text-muted lg:flex">
                {activeFilterCount > 0 && (
                  <span>{activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active</span>
                )}
              </div>
            </div>

            <label className="relative inline-flex items-center gap-2">
              <SlidersHorizontal className="h-3.5 w-3.5 text-muted" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="appearance-none rounded-full border border-black/[0.08] bg-transparent py-1.5 pl-3 pr-9 font-mono text-xs uppercase tracking-widest outline-none transition-colors hover:border-amber-500 dark:border-white/[0.08]"
              >
                {SORTS.map((s) => (
                  <option key={s.key} value={s.key} className="bg-white dark:bg-ink-900">
                    {s.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 h-3.5 w-3.5" />
            </label>
          </div>

          {/* Active chips */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedElements.map((c) => (
                <button
                  key={c}
                  onClick={() => filterProps.toggleElement(c)}
                  className="chip"
                >
                  Element: [{c}] <X className="h-3 w-3" />
                </button>
              ))}
              {selectedSizes.map((s) => (
                <button key={s} onClick={() => filterProps.toggleSize(s)} className="chip">
                  Size: {s} <X className="h-3 w-3" />
                </button>
              ))}
              {priceRange[1] < 5_000_000 && (
                <button onClick={() => setPriceRange([0, 5_000_000])} className="chip">
                  Up to {formatCompactVND(priceRange[1])} <X className="h-3 w-3" />
                </button>
              )}
            </div>
          )}

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-24 text-center">
              <h3 className="font-display text-2xl font-semibold">Không có sản phẩm phù hợp</h3>
              <p className="text-muted">Thử bỏ bớt một vài filter.</p>
              <Button variant="outline" onClick={clearAll}>Xoá tất cả filter</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}

          {/* Infinite scroll sentinel (visual only in this prototype) */}
          {filtered.length > 0 && (
            <div className="flex items-center justify-center py-12 font-mono text-[10px] uppercase tracking-widest text-muted">
              <span className="h-px w-12 bg-current opacity-30" />
              <span className="mx-4">End of results · {filtered.length} of {PRODUCTS.length}</span>
              <span className="h-px w-12 bg-current opacity-30" />
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <Drawer
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        side="bottom"
        title={`Filter${activeFilterCount > 0 ? ` · ${activeFilterCount}` : ''}`}
        footer={
          <div className="flex gap-2">
            <Button variant="outline" onClick={clearAll} className="flex-1">
              Reset
            </Button>
            <Button onClick={() => setFilterOpen(false)} className="flex-1">
              Áp dụng ({filtered.length})
            </Button>
          </div>
        }
      >
        <div className="p-6">
          <FilterPanel {...filterProps} />
        </div>
      </Drawer>
    </div>
  );
}
