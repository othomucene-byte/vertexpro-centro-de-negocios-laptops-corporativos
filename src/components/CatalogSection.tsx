import React from 'react';
import { Search, SlidersHorizontal, Star, Check, Layers, Plus, Cpu, HardDrive } from 'lucide-react';
import { Laptop } from '../types';

interface CatalogSectionProps {
  laptops: Laptop[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  onSelectProduct: (laptop: Laptop) => void;
  onAddToCart: (laptop: Laptop) => void;
  compareIds: string[];
  onToggleCompare: (id: string) => void;
}

const categories = ['Todos', 'Executivo', 'Workstation', 'Ultrabook', 'Engenharia'];

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  laptops,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onSelectProduct,
  onAddToCart,
  compareIds,
  onToggleCompare
}) => {
  return (
    <section id="catalogo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Catálogo Corporativo</h2>
          <p className="text-sm text-slate-500 mt-1">
            Selecione um modelo para configurar hardware ou adicionar ao pedido empresarial.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por modelo, CPU ou marca..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8">
        <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0 mr-1" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {laptops.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <p className="text-slate-500 font-medium">Nenhum laptop encontrado com os filtros atuais.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Todos');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold cursor-pointer"
          >
            Limpar Filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {laptops.map((laptop) => {
            const isCompared = compareIds.includes(laptop.id);
            return (
              <div
                key={laptop.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col hover:shadow-lg transition-shadow"
              >
                <div
                  onClick={() => onSelectProduct(laptop)}
                  className={`h-44 bg-gradient-to-br ${laptop.accentColor} p-5 flex flex-col justify-between text-white cursor-pointer relative`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider bg-white/15 px-2.5 py-1 rounded-md">
                      {laptop.brand} • {laptop.category}
                    </span>
                    {laptop.badge && (
                      <span className="text-[11px] font-bold bg-blue-500 text-white px-2.5 py-1 rounded-full">
                        {laptop.badge}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold leading-snug">{laptop.name}</h3>
                    <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-300">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>{laptop.rating}</span>
                      <span>•</span>
                      <span>{laptop.inStock} un. em estoque</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{laptop.description}</p>

                  <div className="space-y-2 mb-5 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="truncate font-medium">{laptop.processor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <HardDrive className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{laptop.ram} • {laptop.storage}</span>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-slate-100">
                    <div className="flex items-baseline justify-between mb-4">
                      <div>
                        <span className="text-xs text-slate-400 line-through block">
                          R$ {laptop.price.toLocaleString('pt-BR')}
                        </span>
                        <span className="text-xl font-extrabold text-slate-900">
                          R$ {laptop.b2bPrice.toLocaleString('pt-BR')}
                        </span>
                        <span className="text-[11px] text-emerald-600 font-semibold ml-1.5">B2B</span>
                      </div>
                      <button
                        onClick={() => onToggleCompare(laptop.id)}
                        className={`p-2 rounded-xl border text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer ${
                          isCompared
                            ? 'bg-blue-50 border-blue-200 text-blue-700'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                        title="Comparar modelo"
                      >
                        {isCompared ? <Check className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onSelectProduct(laptop)}
                        className="py-2.5 px-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Configurar
                      </button>
                      <button
                        onClick={() => onAddToCart(laptop)}
                        className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        Adicionar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
