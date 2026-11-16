import React, { useState } from 'react';
import { X, Check, Shield } from 'lucide-react';
import { Laptop, CustomConfig } from '../types';

interface ProductModalProps {
  laptop: Laptop;
  onClose: () => void;
  onAddToCart: (qty: number, config: CustomConfig) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ laptop, onClose, onAddToCart }) => {
  const [ram, setRam] = useState(laptop.ram);
  const [storage, setStorage] = useState(laptop.storage);
  const [warranty, setWarranty] = useState('Padrão 12 meses');
  const [quantity, setQuantity] = useState(1);

  const ramExtra = ram.includes('64GB') && !laptop.ram.includes('64GB') ? 1800 : 0;
  const storageExtra = storage.includes('2TB') && !laptop.storage.includes('2TB') ? 1200 : 0;
  const warrantyExtra = warranty.includes('36 meses') ? 950 : 0;
  const extraPrice = ramExtra + storageExtra + warrantyExtra;
  const unitTotal = laptop.b2bPrice + extraPrice;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className={`p-6 bg-gradient-to-r ${laptop.accentColor} text-white flex items-start justify-between`}>
          <div>
            <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">
              {laptop.brand} • {laptop.category}
            </span>
            <h2 className="text-2xl font-bold mt-1">{laptop.name}</h2>
            <p className="text-xs text-slate-300 mt-1">{laptop.processor}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div>
              <span className="text-slate-400 block">Tela</span>
              <span className="font-semibold text-slate-800">{laptop.display}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Bateria</span>
              <span className="font-semibold text-slate-800">{laptop.battery}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Peso</span>
              <span className="font-semibold text-slate-800">{laptop.weight}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Memória RAM</label>
            <div className="grid grid-cols-2 gap-2.5">
              {[laptop.ram, '64GB DDR5 ECC (+R$ 1.800)'].map((option) => (
                <button
                  key={option}
                  onClick={() => setRam(option)}
                  className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center justify-between cursor-pointer ${
                    ram === option
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{option}</span>
                  {ram === option && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Armazenamento SSD</label>
            <div className="grid grid-cols-2 gap-2.5">
              {[laptop.storage, '2TB NVMe Gen4 (+R$ 1.200)'].map((option) => (
                <button
                  key={option}
                  onClick={() => setStorage(option)}
                  className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center justify-between cursor-pointer ${
                    storage === option
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{option}</span>
                  {storage === option && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Garantia Corporativa</label>
            <div className="grid grid-cols-2 gap-2.5">
              {['Padrão 12 meses', 'On-Site 36 meses (+R$ 950)'].map((option) => (
                <button
                  key={option}
                  onClick={() => setWarranty(option)}
                  className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center justify-between cursor-pointer ${
                    warranty === option
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" />
                    {option}
                  </span>
                  {warranty === option && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-500">Qtd:</span>
              <div className="flex items-center border border-slate-200 rounded-xl">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-l-xl cursor-pointer"
                >
                  -
                </button>
                <span className="px-3 py-1.5 text-sm font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-r-xl cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Total B2B</span>
                <span className="text-xl font-extrabold text-slate-900">
                  R$ {(unitTotal * quantity).toLocaleString('pt-BR')}
                </span>
              </div>
              <button
                onClick={() => onAddToCart(quantity, { ram, storage, warranty, extraPrice })}
                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                Adicionar ao Pedido
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
