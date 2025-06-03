
import React from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-2 rounded-lg font-bold text-xl inline-block">
              Food<span className="text-yellow-300">Market</span>
            </div>
            <p className="text-gray-300 text-sm">
              Conectando você aos melhores restaurantes e estabelecimentos da sua região.
            </p>
            <div className="flex space-x-4">
              <Instagram className="w-5 h-5 text-gray-400 hover:text-orange-500 cursor-pointer transition-colors" />
              <Facebook className="w-5 h-5 text-gray-400 hover:text-orange-500 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">Início</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">Restaurantes</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">Categorias</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">Sobre Nós</a></li>
            </ul>
          </div>

          {/* Para Empresas */}
          <div>
            <h3 className="font-semibold mb-4">Para Empresas</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">Cadastre seu Negócio</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">Planos e Preços</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">Anuncie Conosco</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">Suporte</a></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span className="text-gray-300">São Paulo, SP</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-orange-500" />
                <span className="text-gray-300">(11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-orange-500" />
                <span className="text-gray-300">contato@foodmarket.com</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; 2024 FoodMarket. Todos os direitos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-orange-500 transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
