import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CatalogSection } from './components/CatalogSection';
import { BusinessCenterSection } from './components/BusinessCenterSection';
import { CompareModal } from './components/CompareModal';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { laptopsData } from './data/laptops';
import { Laptop, CartItem, BusinessQuote, ActiveTab } from './types';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('vertexpro_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [quotes, setQuotes] = useState<BusinessQuote[]>(() => {
    try {
      const saved = localStorage.getItem('vertexpro_quotes');
      return saved ? JSON.parse(saved) : [
        {
          id: 'COT-2025-084',
          company: 'Nexus Engenharia Ltda',
          contact: 'Mariana Costa',
          itemsCount: 12,
          totalValue: 142800,
          status: 'Aprovada',
          date: '14/05/2025'
        },
        {
          id: 'COT-2025-091',
          company: 'Atlas Consultoria Financeira',
          contact: 'Roberto Mendes',
          itemsCount: 25,
          totalValue: 218500,
          status: 'Em Análise',
          date: '18/05/2025'
        }
      ];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Laptop | null>(null);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  useEffect(() => {
    localStorage.setItem('vertexpro_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('vertexpro_quotes', JSON.stringify(quotes));
  }, [quotes]);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3200);
  };

  const filteredLaptops = useMemo(() => {
    return laptopsData.filter((laptop) => {
      const matchesCategory = selectedCategory === 'Todos' || laptop.category === selectedCategory;
      const matchesSearch =
        laptop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        laptop.processor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        laptop.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleAddToCart = (laptop: Laptop, quantity = 1, customConfig?: { ram: string; storage: string; warranty: string; extraPrice: number }) => {
    const configKey = customConfig ? `${customConfig.ram}-${customConfig.storage}-${customConfig.warranty}` : 'default';
    const unitPrice = laptop.price + (customConfig?.extraPrice || 0);

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.laptop.id === laptop.id && item.configKey === configKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { laptop, quantity, configKey, customConfig, unitPrice }];
    });

    showToast(`${laptop.name} adicionado ao pedido (${quantity}x)`);
  };

  const handleUpdateQuantity = (index: number, delta: number) => {
    setCart((prev) => {
      const updated = [...prev];
      const newQty = updated[index].quantity + delta;
      if (newQty <= 0) {
        updated.splice(index, 1);
      } else {
        updated[index].quantity = newQty;
      }
      return updated;
    });
  };

  const handleRemoveFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleToggleCompare = (id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) {
        showToast('Máximo de 3 laptops para comparação simultânea.', 'info');
        return prev;
      }
      return [...prev, id];
    });
  };

  const handleCreateQuote = (company: string, contact: string) => {
    if (cart.length === 0) return;
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalValue = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
    const newQuote: BusinessQuote = {
      id: `COT-2025-${Math.floor(100 + Math.random() * 899)}`,
      company,
      contact,
      itemsCount: totalItems,
      totalValue,
      status: 'Em Análise',
      date: new Date().toLocaleDateString('pt-BR')
    };
    setQuotes((prev) => [newQuote, ...prev]);
    setCart([]);
    setIsCartOpen(false);
    setActiveTab('business');
    showToast(`Cotação ${newQuote.id} enviada para o Centro de Negócios!`);
  };

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const compareLaptops = laptopsData.filter((l) => compareIds.includes(l.id));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartItems}
        onOpenCart={() => setIsCartOpen(true)}
        compareCount={compareIds.length}
        onOpenCompare={() => setIsCompareOpen(true)}
      />

      <main className="flex-1">
        {activeTab === 'catalog' ? (
          <>
            <HeroSection
              onExplore={() => {
                document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenBusiness={() => setActiveTab('business')}
            />
            <CatalogSection
              laptops={filteredLaptops}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              onSelectProduct={setSelectedProduct}
              onAddToCart={(laptop) => handleAddToCart(laptop, 1)}
              compareIds={compareIds}
              onToggleCompare={handleToggleCompare}
            />
          </>
        ) : (
          <BusinessCenterSection
            quotes={quotes}
            onUpdateQuoteStatus={(id, status) => {
              setQuotes((prev) => prev.map((q) => (q.id === id ? { ...q, status } : q)));
              showToast(`Status da cotação ${id} atualizado para ${status}`);
            }}
            onGoToCatalog={() => setActiveTab('catalog')}
          />
        )}
      </main>

      <Footer />

      {selectedProduct && (
        <ProductModal
          laptop={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(qty, config) => {
            handleAddToCart(selectedProduct, qty, config);
            setSelectedProduct(null);
          }}
        />
      )}

      {isCompareOpen && (
        <CompareModal
          laptops={compareLaptops}
          onClose={() => setIsCompareOpen(false)}
          onRemove={(id) => handleToggleCompare(id)}
          onAddToCart={(laptop) => handleAddToCart(laptop, 1)}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        onCreateQuote={handleCreateQuote}
        onCheckoutSuccess={() => {
          setCart([]);
          setIsCartOpen(false);
          showToast('Pedido corporativo finalizado com sucesso!');
        }}
      />

      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 animate-fade-in">
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
          )}
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  );
}

export default App;
