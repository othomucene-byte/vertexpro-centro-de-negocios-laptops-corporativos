import React, { useState } from 'react';
import { X, Trash2, Building2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemove: (index: number) => void;
  onCreateQuote: (company: string, contact: string) => void;
  onCheckoutSuccess: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemove,
  onCreateQuote,
  onCheckoutSuccess
}) => {
  const [company, setCompany] = useState('');
  const [contact, setContact] = useState('');
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-sm flex justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-slate-900" />
            <h2 className="font-bold text-lg text-slate-900">Pedido Corporativo</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-500 text-sm">Seu pedido está vazio.</p>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div key={`${item.laptop.id}-${idx}`} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{item.laptop.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {item.customConfig
                        ? `${item.customConfig.ram} • ${item.customConfig.storage}`
                        : `${item.laptop.ram} • ${item.laptop.storage}`}
                    </p>
                  </div>
                  <button
                    onClick={() => onRemove(idx)}
                    className="text-slate-400 hover:text-red-500 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200/70">
                  <div className="flex items-center border border-slate-200 bg-white rounded-lg">
                    <button
                      onClick={() => onUpdateQuantity(idx, -1)}
                      className="px-2.5 py-1 text-xs font-bold hover:bg-slate-100 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-2.5 py-1 text-xs font-bold">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(idx, 1)}
                      className="px-2.5 py-1 text-xs font-bold hover:bg-slate-100 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-bold text-sm text-slate-900">
                    R$ {(item.unitPrice * item.quantity).toLocaleString('pt-BR')}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Total Estimado (B2B)</span>
              <span className="text-xl font-extrabold text-slate-900">
                R$ {subtotal.toLocaleString('pt-BR')}
              </span>
            </div>

            {showQuoteForm ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!company.trim() || !contact.trim()) return;
                  onCreateQuote(company, contact);
                }}
                className="space-y-3 pt-2"
              >
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Razão Social / Empresa"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm"
                />
                <input
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Nome do Responsável"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowQuoteForm(false)}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white cursor-pointer"
                  >
                    Voltar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer"
                  >
                    Enviar Cotação
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={onCheckoutSuccess}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold cursor-pointer"
                >
                  Finalizar Compra Direta
                </button>
                <button
                  onClick={() => setShowQuoteForm(true)}
                  className="w-full py-2.5 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Building2 className="w-4 h-4" />
                  Gerar Cotação no Centro de Negócios
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
