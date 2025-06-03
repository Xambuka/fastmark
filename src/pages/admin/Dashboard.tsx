
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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Visão geral e configurações do sistema</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Palette className="w-5 h-5" />
            <span>Configurações Visuais</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="primaryColor">Cor Primária</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="primaryColor"
                  type="color"
                  value={theme.primaryColor}
                  onChange={(e) => handleThemeChange('primaryColor', e.target.value)}
                  className="w-16 h-10 p-1"
                />
                <Input
                  type="text"
                  value={theme.primaryColor}
                  onChange={(e) => handleThemeChange('primaryColor', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondaryColor">Cor Secundária</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="secondaryColor"
                  type="color"
                  value={theme.secondaryColor}
                  onChange={(e) => handleThemeChange('secondaryColor', e.target.value)}
                  className="w-16 h-10 p-1"
                />
                <Input
                  type="text"
                  value={theme.secondaryColor}
                  onChange={(e) => handleThemeChange('secondaryColor', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accentColor">Cor de Destaque</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="accentColor"
                  type="color"
                  value={theme.accentColor}
                  onChange={(e) => handleThemeChange('accentColor', e.target.value)}
                  className="w-16 h-10 p-1"
                />
                <Input
                  type="text"
                  value={theme.accentColor}
                  onChange={(e) => handleThemeChange('accentColor', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="backgroundColor">Cor de Fundo</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="backgroundColor"
                  type="color"
                  value={theme.backgroundColor}
                  onChange={(e) => handleThemeChange('backgroundColor', e.target.value)}
                  className="w-16 h-10 p-1"
                />
                <Input
                  type="text"
                  value={theme.backgroundColor}
                  onChange={(e) => handleThemeChange('backgroundColor', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="textColor">Cor do Texto</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="textColor"
                  type="color"
                  value={theme.textColor}
                  onChange={(e) => handleThemeChange('textColor', e.target.value)}
                  className="w-16 h-10 p-1"
                />
                <Input
                  type="text"
                  value={theme.textColor}
                  onChange={(e) => handleThemeChange('textColor', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button onClick={handleSaveTheme} className="flex items-center space-x-2">
              <Save className="w-4 h-4" />
              <span>Salvar Configurações</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Preview das Cores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4">
            <div 
              className="h-20 rounded-lg flex items-center justify-center text-white font-medium"
              style={{ backgroundColor: theme.primaryColor }}
            >
              Primária
            </div>
            <div 
              className="h-20 rounded-lg flex items-center justify-center text-white font-medium"
              style={{ backgroundColor: theme.secondaryColor }}
            >
              Secundária
            </div>
            <div 
              className="h-20 rounded-lg flex items-center justify-center text-white font-medium"
              style={{ backgroundColor: theme.accentColor }}
            >
              Destaque
            </div>
            <div 
              className="h-20 rounded-lg border-2 flex items-center justify-center font-medium"
              style={{ 
                backgroundColor: theme.backgroundColor,
                color: theme.textColor,
                borderColor: theme.primaryColor
              }}
            >
              Fundo
            </div>
            <div 
              className="h-20 rounded-lg border flex items-center justify-center"
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
