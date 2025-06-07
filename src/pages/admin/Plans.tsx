
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { plans } from '@/data/adminMockData';
import { Plan } from '@/types/admin';

const Plans = () => {
  const [planList, setPlanList] = useState<Plan[]>(plans);
  const [filter, setFilter] = useState<'all' | 'company' | 'advertiser'>('all');

  const getPlanStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const formatPrice = (price: number) => {
    return price === 0 ? 'Gratuito' : `R$ ${price.toFixed(2)}/mês`;
  };

  const getTypeText = (type: string) => {
    return type === 'company' ? 'Empresa' : 'Anunciante';
  };

  const filteredPlans = filter === 'all' 
    ? planList 
    : planList.filter(plan => plan.type === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestão de Planos</h1>
          <p className="text-gray-600">Gerencie os planos de assinatura para empresas e anunciantes</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Novo Plano</span>
        </Button>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 overflow-x-auto">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
          className="whitespace-nowrap"
        >
          Todos ({planList.length})
        </Button>
        <Button
          variant={filter === 'company' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('company')}
          className="whitespace-nowrap"
        >
          Empresas ({planList.filter(p => p.type === 'company').length})
        </Button>
        <Button
          variant={filter === 'advertiser' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('advertiser')}
          className="whitespace-nowrap"
        >
          Anunciantes ({planList.filter(p => p.type === 'advertiser').length})
        </Button>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlans.map((plan) => (
          <Card key={plan.id} className="relative hover:shadow-lg transition-shadow">
            {plan.featured && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-purple-500 text-white px-3 py-1">
                  Mais Popular
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center">
              <div 
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl"
                style={{ backgroundColor: plan.color }}
              >
                {plan.name[0]}
              </div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs">
                  {getTypeText(plan.type)}
                </Badge>
              </div>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <p className="text-gray-600">{plan.description}</p>
              <div className="text-3xl font-bold text-gray-900 mt-2">
                {formatPrice(plan.price)}
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status:</span>
                  <Badge className={getPlanStatusColor(plan.status)}>
                    {plan.status === 'active' ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Recursos:</h4>
                  <ul className="space-y-1">
                    {plan.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                    {plan.features.length > 3 && (
                      <li className="text-sm text-gray-500">
                        +{plan.features.length - 3} recursos adicionais
                      </li>
                    )}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  {plan.type === 'company' ? (
                    <>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Produtos</p>
                        <p className="font-medium">
                          {plan.maxProducts === -1 ? 'Ilimitado' : plan.maxProducts}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Prioridade</p>
                        <p className="font-medium">{plan.priority}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Anúncios</p>
                        <p className="font-medium">
                          {plan.maxAds === -1 ? 'Ilimitado' : plan.maxAds}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Impressões</p>
                        <p className="font-medium">
                          {plan.maxImpressions === -1 ? 'Ilimitadas' : plan.maxImpressions?.toLocaleString()}
                        </p>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    Ver
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
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

export default Plans;
