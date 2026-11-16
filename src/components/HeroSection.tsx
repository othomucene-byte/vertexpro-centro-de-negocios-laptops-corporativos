import React from 'react';
import { ArrowRight, ShieldCheck, Truck, Building2 } from 'lucide-react';

interface HeroSectionProps {
  onExplore: () => void;
  onOpenBusiness: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore, onOpenBusiness }) => {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.22),_transparent_50%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold mb-6">
            <Building2 className="w-3.5 h-3.5" />
            Plataforma Oficial de Hardware Corporativo & Frotas
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-5">
            Laptops de alta performance para impulsionar o seu{' '}
            <span className="text-blue-400">Centro de Negócios</span>.
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
            Equipamentos com segurança Intel vPro, garantia on-site e condições exclusivas para CNPJ. Configure sua frota, compare especificações e emita cotações em segundos.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onExplore}
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm flex items-center gap-2 transition-colors cursor-pointer"
            >
              Explorar Catálogo
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenBusiness}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-sm transition-colors cursor-pointer"
            >
              Acessar Centro de Negócios
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 pt-8 border-t border-slate-800/80">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0" />
              <span className="text-xs sm:text-sm text-slate-300">Garantia Corporativa On-Site 36 meses</span>
            </div>
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-blue-400 shrink-0" />
              <span className="text-xs sm:text-sm text-slate-300">Envio expresso segurado para todo o país</span>
            </div>
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-blue-400 shrink-0" />
              <span className="text-xs sm:text-sm text-slate-300">10% OFF automático para compras CNPJ</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
