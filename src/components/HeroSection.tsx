
import React from 'react';
import { Search, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeroSectionProps {
  onSearch?: (query: string) => void;
}

const HeroSection = ({ onSearch }: HeroSectionProps) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <div className="relative bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Sabor que chega até você
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-orange-100 animate-fade-in">
            Descubra os melhores restaurantes e estabelecimentos da sua região
          </p>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8 animate-fade-in">
            <div className="flex flex-col md:flex-row gap-4 bg-white rounded-lg p-2 text-gray-800">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Digite seu endereço..."
                  className="pl-10 border-0 focus:ring-0"
                />
              </div>
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Buscar restaurantes ou pratos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-0 focus:ring-0"
                />
              </div>
              <Button 
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8"
              >
                Buscar
              </Button>
            </div>
          </form>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-orange-100">Restaurantes Parceiros</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">30min</div>
              <div className="text-orange-100">Entrega Média</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-orange-100">Sempre Disponível</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
