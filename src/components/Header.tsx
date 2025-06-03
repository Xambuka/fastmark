
import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  cartItemsCount?: number;
  onCartClick?: () => void;
  onSearch?: (query: string) => void;
}

const Header = ({ cartItemsCount = 0, onCartClick, onSearch }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-2 rounded-lg font-bold text-xl">
              Food<span className="text-yellow-300">Market</span>
            </div>
          </div>

          {/* Location - Desktop */}
          <div className="hidden md:flex items-center space-x-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Vila Madalena, São Paulo</span>
          </div>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Buscar restaurantes ou pratos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600"
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </form>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-700 hover:text-orange-500 transition-colors">
              Início
            </a>
            <a href="#" className="text-gray-700 hover:text-orange-500 transition-colors">
              Categorias
            </a>
            <a href="#" className="text-gray-700 hover:text-orange-500 transition-colors">
              Favoritos
            </a>
            <Button
              variant="outline"
              size="sm"
              onClick={onCartClick}
              className="relative"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Carrinho
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[1.25rem] h-5 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600">
              Entrar
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Buscar restaurantes ou pratos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
            <Button
              type="submit"
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600"
            >
              <Search className="w-4 h-4" />
            </Button>
          </form>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white py-4">
            <nav className="flex flex-col space-y-3">
              <a href="#" className="text-gray-700 hover:text-orange-500 transition-colors px-2 py-1">
                Início
              </a>
              <a href="#" className="text-gray-700 hover:text-orange-500 transition-colors px-2 py-1">
                Categorias
              </a>
              <a href="#" className="text-gray-700 hover:text-orange-500 transition-colors px-2 py-1">
                Favoritos
              </a>
              <div className="flex items-center space-x-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onCartClick}
                  className="relative flex-1"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Carrinho ({cartItemsCount})
                </Button>
                <Button className="bg-orange-500 hover:bg-orange-600 flex-1">
                  Entrar
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
