
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  Grid3X3, 
  Palette, 
  CreditCard, 
  Settings,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const AdminSidebar = ({ isOpen, onToggle }: AdminSidebarProps) => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Building2, label: 'Empresas', path: '/admin/companies' },
    { icon: Users, label: 'Usuários', path: '/admin/users' },
    { icon: Grid3X3, label: 'Categorias', path: '/admin/categories' },
    { icon: CreditCard, label: 'Planos', path: '/admin/plans' },
    { icon: Palette, label: 'Layout', path: '/admin/layout' },
    { icon: BarChart3, label: 'Relatórios', path: '/admin/reports' },
    { icon: Settings, label: 'Configurações', path: '/admin/settings' },
  ];

  return (
    <div className={`
      fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-30
      ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0 md:w-16'}
    `}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h1 className={`text-xl font-bold text-gray-800 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 md:opacity-0'
        }`}>
          Admin Panel
        </h1>
        
        {/* Botão de fechar para mobile quando sidebar está aberta */}
        <button
          onClick={onToggle}
          className={`p-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          <X className="w-5 h-5" />
        </button>
        
        {/* Botão toggle para desktop - só aparece em desktop e quando sidebar está aberta */}
        {isOpen && (
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors hidden md:block"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
      </div>

      <nav className="mt-6">
        <ul className="space-y-2 px-3">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === '/admin'}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-orange-100 text-orange-700 border-r-2 border-orange-500'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className={`ml-3 font-medium transition-opacity duration-300 ${
                  isOpen ? 'opacity-100' : 'opacity-0 md:opacity-0'
                }`}>
                  {item.label}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
