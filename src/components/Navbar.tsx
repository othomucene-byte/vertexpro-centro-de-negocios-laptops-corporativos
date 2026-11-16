import React from 'react';
import { Laptop as LaptopIcon, ShoppingBag, Building2, Layers } from 'lucide-react';
import { ActiveTab } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  cartCount: number;
  onOpenCart: () => void;
  compareCount: number;
  onOpenCompare: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  compareCount,
  onOpenCompare
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <div
          onClick={() => setActiveTab('catalog')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center group-hover:bg-blue-600 transition-colors">
            <LaptopIcon className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight text-slate-900 block leading-none">
              VertexPro
            </span>
            <span className="text-[11px] font-medium text-slate-500 tracking-wide uppercase">
              Business Center
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              activeTab === 'catalog'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Catálogo de Laptops
          </button>
          <button
            onClick={() => setActiveTab('business')}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'business'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4 text-blue-600" />
            Centro de Negócios B2B
          </button>
        </nav>

        <div className="flex items-center gap-2.5">
          {compareCount > 0 && (
            <button
              onClick={onOpenCompare}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-sm font-semibold transition-colors cursor-pointer"
            >
              <Layers className="w-4 h-4" />
              <span className="hidden sm:inline">Comparar</span>
              <span className="bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {compareCount}
              </span>
            </button>
          )}

          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-sm font-semibold transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Pedido</span>
            {cartCount > 0 && (
              <span className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-md font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="md:hidden flex border-t border-slate-100 bg-slate-50 px-4 py-2 gap-2">
        <button
          onClick={() => setActiveTab('catalog')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold text-center ${
            activeTab === 'catalog' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
          }`}
        >
          Catálogo
        </button>
        <button
          onClick={() => setActiveTab('business')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold text-center ${
            activeTab === 'business' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
          }`}
        >
          Centro de Negócios
        </button>
      </div>
    </header>
  );
};
