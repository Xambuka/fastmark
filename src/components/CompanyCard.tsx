
import React from 'react';
import { Star, Clock, MapPin, Badge as BadgeIcon } from 'lucide-react';
import { Company } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CompanyCardProps {
  company: Company;
  onClick?: () => void;
}

const CompanyCard = ({ company, onClick }: CompanyCardProps) => {
  const isOpen = () => {
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const currentTime = now.toTimeString().slice(0, 5);
    
    const todayHours = company.openingHours[currentDay];
    if (!todayHours || todayHours.closed) return false;
    
    return currentTime >= todayHours.open && currentTime <= todayHours.close;
  };

  const getPlanBadgeColor = (plan: string) => {
    switch (plan) {
      case 'premium':
        return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
      case 'basic':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <Card 
      className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={company.coverImage}
          alt={company.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 left-2">
          <Badge className={getPlanBadgeColor(company.plan)}>
            {company.plan === 'premium' ? 'Premium' : company.plan === 'basic' ? 'Básico' : 'Gratuito'}
          </Badge>
        </div>
        <div className="absolute top-2 right-2">
          <Badge variant={isOpen() ? 'default' : 'destructive'} className="bg-white text-gray-800">
            {isOpen() ? 'Aberto' : 'Fechado'}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg truncate">{company.name}</h3>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{company.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{company.description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{company.deliveryTime}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>{company.address.neighborhood}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-3 pt-3 border-t">
          <span className="text-sm text-gray-600">Taxa de entrega</span>
          <span className="font-medium text-green-600">
            {company.deliveryFee === 0 ? 'Grátis' : `R$ ${company.deliveryFee.toFixed(2)}`}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;
