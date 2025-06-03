
import React from 'react';
import { Home, Grid3X3, Heart, User } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const MobileBottomNav = ({ activeTab = 'home', onTabChange }: MobileBottomNavProps) => {
  const tabs = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'categories', label: 'Categorias', icon: Grid3X3 },
    { id: 'favorites', label: 'Favoritos', icon: Heart },
    { id: 'profile', label: 'Perfil', icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="grid grid-cols-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange?.(tab.id)}
              className={`p-3 text-center transition-colors ${
                isActive 
                  ? 'text-orange-500 bg-orange-50' 
                  : 'text-gray-600 hover:text-orange-500 hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-5 h-5 mx-auto mb-1 ${isActive ? 'fill-current' : ''}`} />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;
