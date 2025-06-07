
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Check, X, Eye, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Company {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  category: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  logo?: string;
  description: string;
}

const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'Restaurante Bella Vista',
    email: 'contato@bellavista.com',
    phone: '(11) 99999-0001',
    address: 'Rua das Flores, 123 - Centro',
    category: 'Restaurante',
    status: 'approved',
    createdAt: '2024-01-15',
    logo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=60',
    description: 'Restaurante italiano com ambiente aconchegante'
  },
  {
    id: '2',
    name: 'Tech Solutions',
    email: 'info@techsolutions.com',
    phone: '(11) 99999-0002',
    address: 'Av. Paulista, 1000 - Bela Vista',
    category: 'Tecnologia',
    status: 'pending',
    createdAt: '2024-01-20',
    description: 'Soluções em tecnologia para empresas'
  },
  {
    id: '3',
    name: 'Farmácia Central',
    email: 'contato@farmaciacentral.com',
    phone: '(11) 99999-0003',
    address: 'Rua da Saúde, 456 - Vila Madalena',
    category: 'Farmácia',
    status: 'rejected',
    createdAt: '2024-01-18',
    logo: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=60',
    description: 'Farmácia de bairro com atendimento 24h'
  },
  {
    id: '4',
    name: 'Boutique Fashion',
    email: 'vendas@boutiquefashion.com',
    phone: '(11) 99999-0004',
    address: 'Shopping Vila Olímpia, Loja 245',
    category: 'Moda',
    status: 'pending',
    createdAt: '2024-01-22',
    description: 'Moda feminina moderna e elegante'
  }
];

const Companies = () => {
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const getStatusBadgeColor = (status: Company['status']) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Company['status']) => {
    switch (status) {
      case 'approved': return 'Aprovada';
      case 'pending': return 'Pendente';
      case 'rejected': return 'Rejeitada';
      default: return status;
    }
  };

  const handleApprove = (companyId: string) => {
    setCompanies(companies.map(company => 
      company.id === companyId ? { ...company, status: 'approved' } : company
    ));
  };

  const handleReject = (companyId: string) => {
    setCompanies(companies.map(company => 
      company.id === companyId ? { ...company, status: 'rejected' } : company
    ));
  };

  const handleDelete = (companyId: string) => {
    if (confirm('Tem certeza que deseja excluir esta empresa?')) {
      setCompanies(companies.filter(company => company.id !== companyId));
    }
  };

  const filteredCompanies = filter === 'all' 
    ? companies 
    : companies.filter(company => company.status === filter);

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Empresas</h1>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
              className="text-xs sm:text-sm"
            >
              Todas ({companies.length})
            </Button>
            <Button
              variant={filter === 'pending' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('pending')}
              className="text-xs sm:text-sm"
            >
              Pendentes ({companies.filter(c => c.status === 'pending').length})
            </Button>
            <Button
              variant={filter === 'approved' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('approved')}
              className="text-xs sm:text-sm"
            >
              Aprovadas ({companies.filter(c => c.status === 'approved').length})
            </Button>
            <Button
              variant={filter === 'rejected' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('rejected')}
              className="text-xs sm:text-sm"
            >
              Rejeitadas ({companies.filter(c => c.status === 'rejected').length})
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:gap-6">
        {filteredCompanies.map((company) => (
          <Card key={company.id}>
            <CardHeader className="pb-3">
              <div className="flex flex-col space-y-3 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
                <div className="flex items-start space-x-3 sm:space-x-4 min-w-0 flex-1">
                  {company.logo ? (
                    <img 
                      src={company.logo} 
                      alt={company.name}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-6 h-6 text-gray-500" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-base sm:text-lg truncate">{company.name}</CardTitle>
                    <p className="text-sm text-gray-600 truncate">{company.email}</p>
                    <p className="text-sm text-gray-500">{company.category}</p>
                  </div>
                </div>
                <Badge className={`${getStatusBadgeColor(company.status)} flex-shrink-0 self-start sm:self-center`}>
                  {getStatusText(company.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <p className="text-sm text-gray-600">{company.description}</p>
                <div className="text-sm text-gray-500 space-y-1">
                  <p><strong>Telefone:</strong> {company.phone}</p>
                  <p><strong>Endereço:</strong> {company.address}</p>
                  <p><strong>Cadastrado em:</strong> {company.createdAt}</p>
                </div>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 sm:flex-none"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    <span className="hidden xs:inline">Ver Detalhes</span>
                  </Button>
                  
                  {company.status === 'pending' && (
                    <>
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => handleApprove(company.id)}
                        className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700"
                      >
                        <Check className="w-4 h-4 mr-1" />
                        <span className="hidden xs:inline">Aprovar</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleReject(company.id)}
                        className="flex-1 sm:flex-none"
                      >
                        <X className="w-4 h-4 mr-1" />
                        <span className="hidden xs:inline">Rejeitar</span>
                      </Button>
                    </>
                  )}
                  
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 sm:flex-none"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    <span className="hidden xs:inline">Editar</span>
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(company.id)}
                    className="flex-1 sm:flex-none"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    <span className="hidden xs:inline">Excluir</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCompanies.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {filter === 'all' ? 'Nenhuma empresa encontrada' : `Nenhuma empresa ${getStatusText(filter as Company['status']).toLowerCase()}`}
          </h3>
          <p className="text-gray-500">
            {filter === 'all' 
              ? 'Quando empresas se cadastrarem, elas aparecerão aqui.'
              : 'Não há empresas com este status no momento.'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default Companies;
