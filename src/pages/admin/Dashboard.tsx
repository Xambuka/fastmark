
import React, { useState } from 'react';
import { Building2, Users, ShoppingCart, DollarSign, Palette, Save } from 'lucide-react';
import StatsCard from '@/components/admin/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { systemStats, themeSettings } from '@/data/adminMockData';

const Dashboard = () => {
  const [theme, setTheme] = useState(themeSettings);

  const handleThemeChange = (key: keyof typeof theme, value: string) => {
    setTheme(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveTheme = () => {
    console.log('Salvando tema:', theme);
    // Aqui implementaria a lógica para salvar o tema
  };

  return (
    <div className="space-y-4 md:space-y-6 max-w-full">
      {/* Header */}
      <div className="px-1">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm md:text-base text-gray-600">Visão geral e configurações do sistema</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatsCard
          title="Total de Empresas"
          value={systemStats.totalCompanies}
          change="+12% este mês"
          icon={Building2}
          trend="up"
        />
        <StatsCard
          title="Empresas Ativas"
          value={systemStats.activeCompanies}
          change="+8% este mês"
          icon={Building2}
          trend="up"
        />
        <StatsCard
          title="Total de Usuários"
          value={systemStats.totalUsers.toLocaleString()}
          change="+23% este mês"
          icon={Users}
          trend="up"
        />
        <StatsCard
          title="Receita Mensal"
          value={`R$ ${systemStats.monthlyRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          change="+15.4% este mês"
          icon={DollarSign}
          trend="up"
        />
      </div>

      {/* Theme Settings */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-lg md:text-xl">
            <Palette className="w-4 h-4 md:w-5 md:h-5" />
            <span>Configurações Visuais</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            <div className="space-y-2">
              <Label htmlFor="primaryColor" className="text-sm font-medium">Cor Primária</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="primaryColor"
                  type="color"
                  value={theme.primaryColor}
                  onChange={(e) => handleThemeChange('primaryColor', e.target.value)}
                  className="w-12 h-10 p-1 flex-shrink-0"
                />
                <Input
                  type="text"
                  value={theme.primaryColor}
                  onChange={(e) => handleThemeChange('primaryColor', e.target.value)}
                  className="flex-1 text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondaryColor" className="text-sm font-medium">Cor Secundária</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="secondaryColor"
                  type="color"
                  value={theme.secondaryColor}
                  onChange={(e) => handleThemeChange('secondaryColor', e.target.value)}
                  className="w-12 h-10 p-1 flex-shrink-0"
                />
                <Input
                  type="text"
                  value={theme.secondaryColor}
                  onChange={(e) => handleThemeChange('secondaryColor', e.target.value)}
                  className="flex-1 text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accentColor" className="text-sm font-medium">Cor de Destaque</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="accentColor"
                  type="color"
                  value={theme.accentColor}
                  onChange={(e) => handleThemeChange('accentColor', e.target.value)}
                  className="w-12 h-10 p-1 flex-shrink-0"
                />
                <Input
                  type="text"
                  value={theme.accentColor}
                  onChange={(e) => handleThemeChange('accentColor', e.target.value)}
                  className="flex-1 text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="backgroundColor" className="text-sm font-medium">Cor de Fundo</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="backgroundColor"
                  type="color"
                  value={theme.backgroundColor}
                  onChange={(e) => handleThemeChange('backgroundColor', e.target.value)}
                  className="w-12 h-10 p-1 flex-shrink-0"
                />
                <Input
                  type="text"
                  value={theme.backgroundColor}
                  onChange={(e) => handleThemeChange('backgroundColor', e.target.value)}
                  className="flex-1 text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="textColor" className="text-sm font-medium">Cor do Texto</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="textColor"
                  type="color"
                  value={theme.textColor}
                  onChange={(e) => handleThemeChange('textColor', e.target.value)}
                  className="w-12 h-10 p-1 flex-shrink-0"
                />
                <Input
                  type="text"
                  value={theme.textColor}
                  onChange={(e) => handleThemeChange('textColor', e.target.value)}
                  className="flex-1 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button onClick={handleSaveTheme} className="flex items-center space-x-2 text-sm">
              <Save className="w-4 h-4" />
              <span>Salvar Configurações</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Preview das Cores</CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
            <div 
              className="h-16 md:h-20 rounded-lg flex items-center justify-center text-white font-medium text-xs md:text-sm"
              style={{ backgroundColor: theme.primaryColor }}
            >
              Primária
            </div>
            <div 
              className="h-16 md:h-20 rounded-lg flex items-center justify-center text-white font-medium text-xs md:text-sm"
              style={{ backgroundColor: theme.secondaryColor }}
            >
              Secundária
            </div>
            <div 
              className="h-16 md:h-20 rounded-lg flex items-center justify-center text-white font-medium text-xs md:text-sm"
              style={{ backgroundColor: theme.accentColor }}
            >
              Destaque
            </div>
            <div 
              className="h-16 md:h-20 rounded-lg border-2 flex items-center justify-center font-medium text-xs md:text-sm"
              style={{ 
                backgroundColor: theme.backgroundColor,
                color: theme.textColor,
                borderColor: theme.primaryColor
              }}
            >
              Fundo
            </div>
            <div 
              className="h-16 md:h-20 rounded-lg border flex items-center justify-center text-xs md:text-sm col-span-2 md:col-span-1"
              style={{ color: theme.textColor }}
            >
              Texto
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
