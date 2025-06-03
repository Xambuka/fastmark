
import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CategoryFilter from '@/components/CategoryFilter';
import CompanyCard from '@/components/CompanyCard';
import ProductCard from '@/components/ProductCard';
import Cart from '@/components/Cart';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import { companies, products } from '@/data/mockData';
import { CartItem, Product } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [currentView, setCurrentView] = useState<'companies' | 'products'>('companies');

  // Filter companies based on category and search
  const filteredCompanies = useMemo(() => {
    return companies.filter(company => {
      const matchesSearch = searchQuery === '' || 
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesSearch && company.status === 'active';
    });
  }, [searchQuery]);

  // Filter products based on category and search
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = !selectedCategory || product.categoryId === selectedCategory;
      
      return matchesSearch && matchesCategory && product.available;
    });
  }, [searchQuery, selectedCategory]);

  const handleAddToCart = (product: Product) => {
    const company = companies.find(c => c.id === product.companyId);
    if (!company) return;

    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prev, { product, quantity: 1, company }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(productId);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentView('companies');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        onSearch={handleSearch}
      />
      
      <main className="pb-20 md:pb-0">
        <HeroSection onSearch={handleSearch} />
        
        <div className="container mx-auto px-4">
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
          
          <Tabs value={currentView} onValueChange={(value) => setCurrentView(value as 'companies' | 'products')}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="companies">Estabelecimentos</TabsTrigger>
              <TabsTrigger value="products">Produtos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="companies">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredCompanies.map((company) => (
                  <CompanyCard 
                    key={company.id} 
                    company={company}
                    onClick={() => {
                      console.log('Navegando para empresa:', company.name);
                    }}
                  />
                ))}
              </div>
              
              {filteredCompanies.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Nenhum estabelecimento encontrado
                  </h3>
                  <p className="text-gray-500">
                    Tente ajustar sua busca ou explorar outras categorias
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="products">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
                {filteredProducts.map((product) => {
                  const company = companies.find(c => c.id === product.companyId);
                  return (
                    <ProductCard 
                      key={product.id} 
                      product={product}
                      company={company}
                      onAddToCart={handleAddToCart}
                    />
                  );
                })}
              </div>
              
              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">🍽️</div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Nenhum produto encontrado
                  </h3>
                  <p className="text-gray-500">
                    Tente ajustar sua busca ou escolher outra categoria
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
      
      <MobileBottomNav 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
};

export default Index;
