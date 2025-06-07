
import React, { useState } from 'react';
import { Save, Upload, RefreshCw, Palette, Settings, Monitor } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { themeSettings } from '@/data/adminMockData';
import { ThemeSettings } from '@/types/admin';

const Layout = () => {
  const [settings, setSettings] = useState<ThemeSettings>(themeSettings);
  const [hasChanges, setHasChanges] = useState(false);

  const colorOptions = [
    { name: 'Laranja', value: '#ea580c', preview: 'bg-orange-600' },
    { name: 'Azul', value: '#3b82f6', preview: 'bg-blue-600' },
    { name: 'Verde', value: '#10b981', preview: 'bg-green-600' },
    { name: 'Roxo', value: '#8b5cf6', preview: 'bg-purple-600' },
    { name: 'Rosa', value: '#ec4899', preview: 'bg-pink-600' },
    { name: 'Vermelho', value: '#ef4444', preview: 'bg-red-600' },
  ];

  const borderRadiusOptions = [
    { name: 'Nenhum', value: 'none' },
    { name: 'Pequeno', value: 'small' },
    { name: 'Médio', value: 'medium' },
    { name: 'Grande', value: 'large' },
  ];

  const handleColorChange = (colorType: keyof ThemeSettings, value: string) => {
    setSettings(prev => ({ ...prev, [colorType]: value }));
    setHasChanges(true);
  };

  const handleSettingChange = (key: keyof ThemeSettings, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // Simular salvamento
    console.log('Salvando configurações:', settings);
    setHasChanges(false);
  };

  const handleReset = () => {
    setSettings(themeSettings);
    setHasChanges(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Layout e Aparência</h1>
          <p className="text-gray-600">Personalize a aparência visual do sistema</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset} disabled={!hasChanges}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Resetar
          </Button>
          <Button onClick={handleSave} disabled={!hasChanges}>
            <Save className="w-4 h-4 mr-2" />
            Salvar Alterações
          </Button>
        </div>
      </div>

      {hasChanges && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <Settings className="w-5 h-5 text-yellow-600 mr-2" />
            <span className="text-yellow-800">Você tem alterações não salvas</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cores do Sistema */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Palette className="w-5 h-5 mr-2" />
              Cores do Sistema
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Cor Primária
              </label>
              <div className="grid grid-cols-3 gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => handleColorChange('primaryColor', color.value)}
                    className={`flex items-center space-x-2 p-2 rounded-lg border-2 transition-all ${
                      settings.primaryColor === color.value
                        ? 'border-gray-400 bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full ${color.preview}`}></div>
                    <span className="text-sm">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Cor Secundária
              </label>
              <div className="grid grid-cols-3 gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => handleColorChange('secondaryColor', color.value)}
                    className={`flex items-center space-x-2 p-2 rounded-lg border-2 transition-all ${
                      settings.secondaryColor === color.value
                        ? 'border-gray-400 bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full ${color.preview}`}></div>
                    <span className="text-sm">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configurações Visuais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Monitor className="w-5 h-5 mr-2" />
              Configurações Visuais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Estilo do Cabeçalho
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleSettingChange('headerStyle', 'light')}
                  className={`p-3 rounded-lg border-2 text-center transition-all ${
                    settings.headerStyle === 'light'
                      ? 'border-blue-400 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="w-full h-8 bg-white border rounded mb-2"></div>
                  <span className="text-sm">Claro</span>
                </button>
                <button
                  onClick={() => handleSettingChange('headerStyle', 'dark')}
                  className={`p-3 rounded-lg border-2 text-center transition-all ${
                    settings.headerStyle === 'dark'
                      ? 'border-blue-400 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="w-full h-8 bg-gray-800 rounded mb-2"></div>
                  <span className="text-sm">Escuro</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Raio da Borda
              </label>
              <div className="grid grid-cols-2 gap-2">
                {borderRadiusOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSettingChange('borderRadius', option.value)}
                    className={`p-3 rounded-lg border-2 text-center transition-all ${
                      settings.borderRadius === option.value
                        ? 'border-blue-400 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-sm">{option.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logo e Imagens */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="w-5 h-5 mr-2" />
              Logo e Imagens
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo Principal
              </label>
              <div className="flex items-center space-x-4">
                <img
                  src={settings.logo}
                  alt="Logo atual"
                  className="w-16 h-16 object-contain border rounded-lg"
                />
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Enviar Nova Logo
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Favicon
              </label>
              <div className="flex items-center space-x-4">
                <img
                  src={settings.favicon}
                  alt="Favicon atual"
                  className="w-8 h-8 object-contain border rounded"
                />
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Enviar Favicon
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Preview das Alterações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div 
                className="p-4 rounded-lg text-white"
                style={{ backgroundColor: settings.primaryColor }}
              >
                <h3 className="font-medium">Cor Primária</h3>
                <p className="text-sm opacity-90">Botões e elementos principais</p>
              </div>
              
              <div 
                className="p-4 rounded-lg text-white"
                style={{ backgroundColor: settings.secondaryColor }}
              >
                <h3 className="font-medium">Cor Secundária</h3>
                <p className="text-sm opacity-90">Elementos de apoio</p>
              </div>

              <div className="text-center pt-4">
                <Badge variant="outline">
                  Estilo: {settings.headerStyle === 'light' ? 'Claro' : 'Escuro'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Layout;
