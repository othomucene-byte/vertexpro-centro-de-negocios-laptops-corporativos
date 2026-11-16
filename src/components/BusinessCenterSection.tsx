import React from 'react';
import { Building2, FileText, TrendingUp, CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import { BusinessQuote } from '../types';

interface BusinessCenterSectionProps {
  quotes: BusinessQuote[];
  onUpdateQuoteStatus: (id: string, status: BusinessQuote['status']) => void;
  onGoToCatalog: () => void;
}

export const BusinessCenterSection: React.FC<BusinessCenterSectionProps> = ({
  quotes,
  onUpdateQuoteStatus,
  onGoToCatalog
}) => {
  const totalVolume = quotes.reduce((acc, q) => acc + q.totalValue, 0);
  const totalUnits = quotes.reduce((acc, q) => acc + q.itemsCount, 0);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Building2 className="w-4 h-4" />
            Portal Corporativo
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Centro de Negócios B2B</h1>
          <p className="text-sm text-slate-500 mt-1">
            Gerencie cotações em lote, aprovações de faturamento e alocação de frotas.
          </p>
        </div>
        <button
          onClick={onGoToCatalog}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold flex items-center gap-2 self-start cursor-pointer"
        >
          Nova Cotação no Catálogo
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between text-slate-500 text-sm mb-2">
            <span>Volume em Cotações</span>
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">
            R$ {totalVolume.toLocaleString('pt-BR')}
          </p>
          <span className="text-xs text-emerald-600 font-medium">Condição especial B2B aplicada</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between text-slate-500 text-sm mb-2">
            <span>Laptops Solicitados</span>
            <FileText className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{totalUnits} unidades</p>
          <span className="text-xs text-slate-500">Distribuídos em {quotes.length} processos</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between text-slate-500 text-sm mb-2">
            <span>Status de Crédito CNPJ</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-600">Pré-Aprovado</p>
          <span className="text-xs text-slate-500">Faturamento 30/60/90 dias disponível</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-bold text-slate-900">Cotações e Pedidos Empresariais</h2>
          <span className="text-xs text-slate-500">{quotes.length} registros</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase border-b border-slate-200">
                <th className="py-3.5 px-6 font-semibold">Código</th>
                <th className="py-3.5 px-6 font-semibold">Empresa / Contato</th>
                <th className="py-3.5 px-6 font-semibold">Qtd.</th>
                <th className="py-3.5 px-6 font-semibold">Valor Total</th>
                <th className="py-3.5 px-6 font-semibold">Status</th>
                <th className="py-3.5 px-6 font-semibold text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {quotes.map((quote) => (
                <tr key={quote.id} className="hover:bg-slate-50/70">
                  <td className="py-4 px-6 font-semibold text-slate-900">{quote.id}</td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-slate-900">{quote.company}</div>
                    <div className="text-xs text-slate-500">{quote.contact} • {quote.date}</div>
                  </td>
                  <td className="py-4 px-6 text-slate-700">{quote.itemsCount} un.</td>
                  <td className="py-4 px-6 font-bold text-slate-900">
                    R$ {quote.totalValue.toLocaleString('pt-BR')}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        quote.status === 'Faturada'
                          ? 'bg-emerald-50 text-emerald-700'
                          : quote.status === 'Aprovada'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {quote.status === 'Em Análise' ? (
                        <Clock className="w-3 h-3" />
                      ) : (
                        <CheckCircle2 className="w-3 h-3" />
                      )}
                      {quote.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    {quote.status === 'Em Análise' && (
                      <button
                        onClick={() => onUpdateQuoteStatus(quote.id, 'Aprovada')}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer"
                      >
                        Aprovar
                      </button>
                    )}
                    {quote.status === 'Aprovada' && (
                      <button
                        onClick={() => onUpdateQuoteStatus(quote.id, 'Faturada')}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold cursor-pointer"
                      >
                        Faturar NF-e
                      </button>
                    )}
                    {quote.status === 'Faturada' && (
                      <span className="text-xs text-slate-400 font-medium">Concluído</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
