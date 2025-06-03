
import React from 'react';
import { Plus, Star } from 'lucide-react';
import { Product, Company } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
  company?: Company;
  onAddToCart?: (product: Product) => void;
}

const ProductCard = ({ product, company, onAddToCart }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-32 sm:h-40 object-cover"
        />
        {product.featured && (
          <Badge className="absolute top-2 left-2 bg-orange-500 text-white">
            Destaque
          </Badge>
        )}
        {!product.available && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Badge variant="destructive" className="text-white">
              Indisponível
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-3">
        <h3 className="font-semibold text-sm sm:text-base mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2">{product.description}</p>
        
        {company && (
          <div className="flex items-center space-x-1 mb-2">
            <span className="text-xs text-gray-500">por</span>
            <span className="text-xs font-medium text-orange-600">{company.name}</span>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <span className="font-bold text-green-600 text-sm sm:text-base">
            R$ {product.price.toFixed(2)}
          </span>
          
          {product.available && (
            <Button
              size="sm"
              onClick={() => onAddToCart?.(product)}
              className="bg-orange-500 hover:bg-orange-600 text-white p-2"
            >
              <Plus className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
