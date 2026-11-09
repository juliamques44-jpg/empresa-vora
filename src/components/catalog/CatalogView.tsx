/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, X, ArrowUpDown, Check, RefreshCw } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCategory, ProductSize, ProductColorName } from '../../types';
import { ProductCard } from './ProductCard';
import { EVORA_COLORS } from '../../data/mockData';

export const CatalogView: React.FC = () => {
  const { products, selectedCategory, setSelectedCategory } = useStore();

  // Filter States
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [selectedColor, setSelectedColor] = useState<ProductColorName | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [onlyLimitedEdition, setOnlyLimitedEdition] = useState<boolean>(false);
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'pronta' | 'demanda'>('all');
  const [priceRange, setPriceRange] = useState<'all' | 'low' | 'mid' | 'high'>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'price-asc' | 'price-desc' | 'popular'>('recent');

  // Mobile Filter Drawer State
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const categories: (ProductCategory | 'Todas')[] = [
    'Todas',
    'Alfaiataria',
    'Vestidos',
    'Peças Esculturais',
    'Essenciais Atemporais',
    'Edições Limitadas',
    'Acessórios'
  ];

  const sizes: ProductSize[] = ['PP', 'P', 'M', 'G', 'GG', 'Sob Medida'];

  const colors: { name: ProductColorName; hex: string }[] = [
    { name: 'Off-White Natural', hex: EVORA_COLORS.offwhite },
    { name: 'Verde Évora', hex: EVORA_COLORS.green },
    { name: 'Vinho Imperial', hex: EVORA_COLORS.wine },
    { name: 'Marrom Terracota', hex: EVORA_COLORS.brown },
    { name: 'Bege Areia', hex: EVORA_COLORS.beige }
  ];

  const materials = [
    'Linho',
    'Lã',
    'Liocel',
    'Couro de Maçã',
    'Seda'
  ];

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory && selectedCategory !== 'Todas') {
        if (selectedCategory === 'Edições Limitadas') {
          if (!p.isLimitedEdition) return false;
        } else if (p.category !== selectedCategory) {
          return false;
        }
      }

      // Size filter
      if (selectedSize && !p.sizes.includes(selectedSize)) {
        return false;
      }

      // Color filter
      if (selectedColor && !p.colors.some((c) => c.name === selectedColor)) {
        return false;
      }

      // Material filter
      if (selectedMaterial) {
        const mat = selectedMaterial.toLowerCase();
        if (!p.materialType.toLowerCase().includes(mat) && !p.composition.toLowerCase().includes(mat)) {
          return false;
        }
      }

      // Limited edition toggle
      if (onlyLimitedEdition && !p.isLimitedEdition) {
        return false;
      }

      // Availability filter
      if (availabilityFilter === 'pronta' && !p.availability.includes('Pronta')) {
        return false;
      }
      if (availabilityFilter === 'demanda' && !p.availability.includes('Demanda')) {
        return false;
      }

      // Price range
      if (priceRange === 'low' && p.price > 2200) return false;
      if (priceRange === 'mid' && (p.price < 2200 || p.price > 3500)) return false;
      if (priceRange === 'high' && p.price <= 3500) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'popular') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      return 0; // recent default
    });
  }, [
    products, 
    selectedCategory, 
    selectedSize, 
    selectedColor, 
    selectedMaterial, 
    onlyLimitedEdition, 
    availabilityFilter, 
    priceRange, 
    sortBy
  ]);

  const activeFiltersCount = [
    Boolean(selectedCategory && selectedCategory !== 'Todas'),
    Boolean(selectedSize),
    Boolean(selectedColor),
    Boolean(selectedMaterial),
    onlyLimitedEdition,
    availabilityFilter !== 'all',
    priceRange !== 'all'
  ].filter(Boolean).length;

  const resetFilters = () => {
    setSelectedCategory(null);
    setSelectedSize(null);
    setSelectedColor(null);
    setSelectedMaterial(null);
    setOnlyLimitedEdition(false);
    setAvailabilityFilter('all');
    setPriceRange('all');
  };

  return (
    <div className="bg-[#F5F1E8] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title & Breadcrumb */}
        <div className="mb-10 text-center sm:text-left border-b border-[#D8CCBA]/60 pb-8">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-[10px] tracking-[0.25em] uppercase text-[#72513E] mb-2 font-light">
            <span>Maison ÉVORA</span>
            <span>/</span>
            <span className="text-[#183D32] font-medium">Acervo & Loja</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#183D32] font-light">
            O Acervo Permanente
          </h1>
          <p className="text-xs sm:text-sm text-[#72513E] font-light mt-2 max-w-xl">
            Peças atemporais de alfaiataria sustentável e silhuetas esculturais. Cada modelo é desenhado para durar uma vida inteira.
          </p>
        </div>

        {/* Category Horizontal Selector (Zero-Pill, Elegant Tabs) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-[#D8CCBA]/40 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = (!selectedCategory && cat === 'Todas') || selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat === 'Todas' ? null : cat)}
                className={`px-4 py-2 text-xs tracking-[0.18em] uppercase transition-all whitespace-nowrap cursor-pointer border ${
                  isSelected
                    ? 'bg-[#183D32] text-[#F5F1E8] border-[#183D32] font-medium'
                    : 'bg-white/40 text-[#183D32] border-[#D8CCBA] hover:border-[#183D32]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Utility Controls Bar: Mobile filter trigger + Desktop active filters + Sort Dropdown */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 text-xs">
          <div className="flex items-center gap-3">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 border border-[#D8CCBA] bg-white/40 px-4 py-2.5 text-[#183D32] font-medium tracking-wider uppercase cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filtros {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}</span>
            </button>

            {/* Total items counter */}
            <span className="text-[#72513E] font-light">
              Exibindo <strong className="font-medium text-[#183D32] tabular-nums">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'peça de autor' : 'peças de autor'}
            </span>

            {/* Reset button if filters active */}
            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="hidden lg:flex items-center gap-1 text-[#642B38] hover:underline cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Limpar filtros</span>
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-[#72513E] tracking-wider uppercase text-[11px] font-light">
              Ordenar por:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white/60 border border-[#D8CCBA] text-[#183D32] text-xs px-3 py-2 focus:outline-none focus:border-[#183D32] cursor-pointer"
            >
              <option value="recent">Mais Recentes</option>
              <option value="popular">Destaques da Maison</option>
              <option value="price-asc">Menor Preço</option>
              <option value="price-desc">Maior Preço</option>
            </select>
          </div>
        </div>

        {/* Main Layout: Desktop Sidebar Filters + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Desktop Left Sidebar Filters */}
          <aside className="hidden lg:block lg:col-span-3 space-y-8 pr-4 border-r border-[#D8CCBA]/50">
            {/* Filter: Tamanho */}
            <div>
              <h4 className="text-[11px] tracking-[0.25em] uppercase text-[#72513E] font-medium mb-3">
                Tamanho
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map((sz) => {
                  const isSelected = selectedSize === sz;
                  return (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(isSelected ? null : sz)}
                      className={`py-2 text-xs border text-center transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#183D32] text-[#F5F1E8] border-[#183D32] font-semibold'
                          : 'border-[#D8CCBA] text-[#183D32] hover:border-[#183D32] bg-white/40'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter: Cores da Maison */}
            <div>
              <h4 className="text-[11px] tracking-[0.25em] uppercase text-[#72513E] font-medium mb-3">
                Paleta da Maison
              </h4>
              <div className="space-y-2">
                {colors.map((c) => {
                  const isSelected = selectedColor === c.name;
                  return (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(isSelected ? null : c.name)}
                      className={`w-full flex items-center justify-between p-2 text-xs border transition-colors cursor-pointer text-left ${
                        isSelected
                          ? 'border-[#183D32] bg-white text-[#183D32] font-medium'
                          : 'border-transparent hover:border-[#D8CCBA] text-[#183D32]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-4 h-4 rounded-full border border-[#D8CCBA] shrink-0"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#183D32]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter: Materiais Nobres */}
            <div>
              <h4 className="text-[11px] tracking-[0.25em] uppercase text-[#72513E] font-medium mb-3">
                Material Nobre
              </h4>
              <div className="flex flex-wrap gap-2">
                {materials.map((mat) => {
                  const isSelected = selectedMaterial === mat;
                  return (
                    <button
                      key={mat}
                      onClick={() => setSelectedMaterial(isSelected ? null : mat)}
                      className={`text-xs px-3 py-1.5 border transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#183D32] text-[#F5F1E8] border-[#183D32]'
                          : 'border-[#D8CCBA] text-[#183D32] bg-white/40 hover:border-[#183D32]'
                      }`}
                    >
                      {mat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter: Faixa de Preço */}
            <div>
              <h4 className="text-[11px] tracking-[0.25em] uppercase text-[#72513E] font-medium mb-3">
                Investimento
              </h4>
              <div className="space-y-1.5 text-xs text-[#183D32]">
                {[
                  { id: 'all', label: 'Todos os valores' },
                  { id: 'low', label: 'Até R$ 2.200' },
                  { id: 'mid', label: 'R$ 2.200 a R$ 3.500' },
                  { id: 'high', label: 'Acima de R$ 3.500' }
                ].map((range) => (
                  <label key={range.id} className="flex items-center gap-2 cursor-pointer py-1">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={priceRange === range.id}
                      onChange={() => setPriceRange(range.id as any)}
                      className="accent-[#183D32] cursor-pointer"
                    />
                    <span>{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter: Disponibilidade & Edições */}
            <div className="space-y-3 pt-2 border-t border-[#D8CCBA]/40">
              <label className="flex items-center gap-2 text-xs text-[#183D32] cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyLimitedEdition}
                  onChange={(e) => setOnlyLimitedEdition(e.target.checked)}
                  className="accent-[#183D32] cursor-pointer"
                />
                <span className="font-medium">Apenas Edições Limitadas</span>
              </label>

              <div className="space-y-1 text-xs text-[#72513E]">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="avail"
                    checked={availabilityFilter === 'all'}
                    onChange={() => setAvailabilityFilter('all')}
                    className="accent-[#183D32]"
                  />
                  <span>Todas as disponibilidades</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="avail"
                    checked={availabilityFilter === 'pronta'}
                    onChange={() => setAvailabilityFilter('pronta')}
                    className="accent-[#183D32]"
                  />
                  <span>Pronta Entrega</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="avail"
                    checked={availabilityFilter === 'demanda'}
                    onChange={() => setAvailabilityFilter('demanda')}
                    className="accent-[#183D32]"
                  />
                  <span>Sob Demanda / Medida</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Product Grid Area: 2 columns on mobile, 3 columns on desktop */}
          <main className="lg:col-span-9">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center border border-[#D8CCBA] bg-white/40 p-8 space-y-4">
                <p className="font-serif text-2xl text-[#183D32]">
                  Nenhuma peça atende a essa combinação de critérios.
                </p>
                <p className="text-xs text-[#72513E] max-w-md mx-auto font-light">
                  Experimente remover os filtros aplicados para visualizar outras criações da Maison.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-[#183D32] text-[#F5F1E8] px-6 py-2.5 text-xs tracking-wider uppercase font-medium hover:bg-[#642B38] transition-colors cursor-pointer"
                >
                  Restaurar Todo o Acervo
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-[#183D32]/60 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-sm bg-[#F5F1E8] h-full flex flex-col p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#D8CCBA]">
              <h3 className="font-serif text-xl text-[#183D32]">Filtros do Acervo</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 text-[#183D32] cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="py-6 space-y-6 flex-grow">
              {/* Category */}
              <div>
                <h4 className="text-xs uppercase tracking-wider text-[#72513E] font-medium mb-2">Categoria</h4>
                <div className="flex flex-wrap gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat === 'Todas' ? null : cat)}
                      className={`text-xs px-3 py-1.5 border ${
                        (!selectedCategory && cat === 'Todas') || selectedCategory === cat
                          ? 'bg-[#183D32] text-[#F5F1E8] border-[#183D32]'
                          : 'border-[#D8CCBA] bg-white/50 text-[#183D32]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h4 className="text-xs uppercase tracking-wider text-[#72513E] font-medium mb-2">Tamanho</h4>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(selectedSize === sz ? null : sz)}
                      className={`py-2 text-xs border ${
                        selectedSize === sz
                          ? 'bg-[#183D32] text-[#F5F1E8] border-[#183D32]'
                          : 'border-[#D8CCBA] bg-white/50 text-[#183D32]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div>
                <h4 className="text-xs uppercase tracking-wider text-[#72513E] font-medium mb-2">Cores</h4>
                <div className="space-y-1">
                  {colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(selectedColor === c.name ? null : c.name)}
                      className="w-full flex items-center justify-between p-2 text-xs border border-transparent hover:border-[#D8CCBA]"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded-full border border-[#D8CCBA]" style={{ backgroundColor: c.hex }} />
                        <span>{c.name}</span>
                      </div>
                      {selectedColor === c.name && <Check className="w-3.5 h-3.5 text-[#183D32]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggle Limited Edition */}
              <label className="flex items-center gap-2 text-xs text-[#183D32] pt-2 border-t border-[#D8CCBA]">
                <input
                  type="checkbox"
                  checked={onlyLimitedEdition}
                  onChange={(e) => setOnlyLimitedEdition(e.target.checked)}
                  className="accent-[#183D32]"
                />
                <span className="font-medium">Apenas Edições Limitadas</span>
              </label>
            </div>

            <div className="pt-4 border-t border-[#D8CCBA] flex gap-3">
              <button
                onClick={resetFilters}
                className="w-1/2 py-3 border border-[#D8CCBA] text-xs uppercase tracking-wider text-[#72513E]"
              >
                Limpar
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-1/2 py-3 bg-[#183D32] text-[#F5F1E8] text-xs uppercase tracking-wider font-medium"
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
