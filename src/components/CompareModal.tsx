import React from 'react';
import { X, Trash2 } from 'lucide-react';
import { Laptop } from '../types';

interface CompareModalProps {
  laptops: Laptop[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onAddToCart: (laptop: Laptop) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  laptops,
  onClose,
  onRemove,
  onAddToCart
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Comparador Técnico</h2>
            <p className="text-xs text-slate-500">Análise lado a lado para decisão de compra corporativa</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {laptops.length === 0 ? (
          <p className="text-center text-slate-500 py-10">Nenhum modelo selecionado para comparação.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-3 px-4 text-xs uppercase text-slate-400 font-semibold">Especificação</th>
                  {laptops.map((l) => (
                    <th key={l.id} className="py-3 px-4 min-w-[180px]">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[11px] text-blue-600 font-bold uppercase">{l.brand}</span>
                          <div className="font-bold text-slate-900">{l.name}</div>
                        </div>
                        <button
                          onClick={() => onRemove(l.id)}
                          className="text-slate-400 hover:text-red-500 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-500">Preço B2B</td>
                  {laptops.map((l) => (
                    <td key={l.id} className="py-3 px-4 font-extrabold text-slate-900 text-sm">
                      R$ {l.b2bPrice.toLocaleString('pt-BR')}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-500">Processador</td>
                  {laptops.map((l) => (
                    <td key={l.id} className="py-3 px-4 text-slate-700">{l.processor}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-500">Memória RAM</td>
                  {laptops.map((l) => (
                    <td key={l.id} className="py-3 px-4 text-slate-700">{l.ram}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-500">Armazenamento</td>
                  {laptops.map((l) => (
                    <td key={l.id} className="py-3 px-4 text-slate-700">{l.storage}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-500">Tela</td>
                  {laptops.map((l) => (
                    <td key={l.id} className="py-3 px-4 text-slate-700">{l.display}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-500">Peso</td>
                  {laptops.map((l) => (
                    <td key={l.id} className="py-3 px-4 text-slate-700">{l.weight}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4" />
                  {laptops.map((l) => (
                    <td key={l.id} className="py-4 px-4">
                      <button
                        onClick={() => onAddToCart(l)}
                        className="w-full py-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-semibold cursor-pointer"
                      >
                        Adicionar
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
