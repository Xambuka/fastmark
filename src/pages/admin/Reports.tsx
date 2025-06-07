
import React, { useState } from 'react';
import { Download, FileText, TrendingUp, Users, Building2, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const reportTypes = [
    {
      id: 'companies',
      title: 'Relatório de Empresas',
      description: 'Empresas cadastradas, aprovadas e rejeitadas',
      icon: Building2,
      color: 'bg-blue-500',
      data: { total: 247, approved: 198, pending: 32, rejected: 17 }
    },
    {
      id: 'users',
      title: 'Relatório de Usuários',
      description: 'Usuários ativos e estatísticas de engajamento',
      icon: Users,
      color: 'bg-green-500',
      data: { total: 1542, active: 1340, inactive: 202 }
    },
    {
      id: 'revenue',
      title: 'Relatório Financeiro',
      description: 'Receitas de planos e assinaturas',
      icon: TrendingUp,
      color: 'bg-purple-500',
      data: { monthly: 12750.50, growth: 15.4, plans: { company: 8420.30, advertiser: 4330.20 } }
    },
    {
      id: 'activity',
      title: 'Relatório de Atividades',
      description: 'Atividades recentes e logs do sistema',
      icon: FileText,
      color: 'bg-orange-500',
      data: { logins: 3891, actions: 12450, errors: 23 }
    }
  ];

  const periods = [
    { value: 'week', label: 'Última Semana' },
    { value: 'month', label: 'Último Mês' },
    { value: 'quarter', label: 'Último Trimestre' },
    { value: 'year', label: 'Último Ano' }
  ];

  const handleExport = (reportId: string, format: 'pdf' | 'excel') => {
    console.log(`Exportando relatório ${reportId} em formato ${format}`);
    // Simular download
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Relatórios</h1>
          <p className="text-gray-600">Análises e estatísticas do sistema</p>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            {periods.map((period) => (
              <option key={period.value} value={period.value}>
                {period.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Empresas Ativas</p>
                <p className="text-2xl font-bold text-gray-900">198</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Usuários Ativos</p>
                <p className="text-2xl font-bold text-gray-900">1,340</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Receita Mensal</p>
                <p className="text-2xl font-bold text-gray-900">R$ 12.750</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Crescimento</p>
                <p className="text-2xl font-bold text-gray-900">+15.4%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reportTypes.map((report) => (
          <Card key={report.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 ${report.color} rounded-lg`}>
                    <report.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{report.title}</CardTitle>
                    <p className="text-sm text-gray-600">{report.description}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {periods.find(p => p.value === selectedPeriod)?.label}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Report Data Preview */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {report.id === 'companies' && (
                    <>
                      <div>
                        <span className="text-gray-600">Total:</span>
                        <span className="font-medium ml-2">{report.data.total}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Aprovadas:</span>
                        <span className="font-medium ml-2 text-green-600">{report.data.approved}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Pendentes:</span>
                        <span className="font-medium ml-2 text-yellow-600">{report.data.pending}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Rejeitadas:</span>
                        <span className="font-medium ml-2 text-red-600">{report.data.rejected}</span>
                      </div>
                    </>
                  )}
                  
                  {report.id === 'users' && (
                    <>
                      <div>
                        <span className="text-gray-600">Total:</span>
                        <span className="font-medium ml-2">{report.data.total}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Ativos:</span>
                        <span className="font-medium ml-2 text-green-600">{report.data.active}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Inativos:</span>
                        <span className="font-medium ml-2 text-gray-500">{report.data.inactive}</span>
                      </div>
                    </>
                  )}
                  
                  {report.id === 'revenue' && (
                    <>
                      <div>
                        <span className="text-gray-600">Mensal:</span>
                        <span className="font-medium ml-2">R$ {report.data.monthly.toFixed(2)}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Crescimento:</span>
                        <span className="font-medium ml-2 text-green-600">+{report.data.growth}%</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Empresas:</span>
                        <span className="font-medium ml-2">R$ {report.data.plans.company.toFixed(2)}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Anúncios:</span>
                        <span className="font-medium ml-2">R$ {report.data.plans.advertiser.toFixed(2)}</span>
                      </div>
                    </>
                  )}
                  
                  {report.id === 'activity' && (
                    <>
                      <div>
                        <span className="text-gray-600">Logins:</span>
                        <span className="font-medium ml-2">{report.data.logins}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Ações:</span>
                        <span className="font-medium ml-2">{report.data.actions}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Erros:</span>
                        <span className="font-medium ml-2 text-red-600">{report.data.errors}</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Export Buttons */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExport(report.id, 'pdf')}
                    className="flex-1"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    PDF
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExport(report.id, 'excel')}
                    className="flex-1"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Excel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Reports;
