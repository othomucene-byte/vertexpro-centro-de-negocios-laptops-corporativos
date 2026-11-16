import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          <span className="font-bold text-slate-900">VertexPro Business Center</span> — Soluções em Laptops Corporativos.
        </div>
        <div>
          Atendimento B2B: segunda a sexta, das 08h às 19h • Garantia On-Site Nacional
        </div>
      </div>
    </footer>
  );
};
