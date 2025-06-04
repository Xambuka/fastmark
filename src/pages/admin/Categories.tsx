
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Check, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data para categorias
const initialCategories = [
  { 
    id: '1', 
    name: 'Restaurantes', 
    description: 'Estabelecimentos que servem refeições', 
    slug: 'restaurantes',
    status: 'active',
    count: 54,
    icon: '🍽️',
    featured: true
  },
  { 
    id: '2', 
    name: 'Lanchonetes', 
    description: 'Fast food e lanches rápidos', 
    slug: 'lanchonetes',
    status: 'active',
    count: 38,
    icon: '🍔',
    featured: true 
  },
  { 
    id: '3', 
    name: 'Cafeterias', 
    description: 'Café e produtos de padaria', 
    slug: 'cafeterias',
    status: 'active',
    count: 25,
    icon: '☕',
    featured: false
  },
  { 
    id: '4', 
    name: 'Pizzarias', 
    description: 'Especializado em pizzas', 
    slug: 'pizzarias',
    status: 'inactive',
    count: 17,
    icon: '🍕',
    featured: false
  },
  { 
    id: '5', 
    name: 'Docerias', 
    description: 'Sobremesas e doces', 
    slug: 'docerias',
    status: 'active',
    count: 12,
    icon: '🍰',
    featured: false
  }
];

const Categories = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filtra as categorias baseado no status e termo de busca
  const filteredCategories = categories.filter(category => {
    const matchesStatus = filterStatus === 'all' || category.status === filterStatus;
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         category.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Toggle featured status
  const toggleFeatured = (id: string) => {
    setCategories(categories.map(category => 
      category.id === id ? { ...category, featured: !category.featured } : category
    ));
  };

  // Toggle status (active/inactive)
  const toggleStatus = (id: string) => {
    setCategories(categories.map(category => 
      category.id === id ? { 
        ...category, 
        status: category.status === 'active' ? 'inactive' : 'active' 
      } : category
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestão de Categorias</h1>
          <p className="text-gray-600">Gerencie as categorias de empresas</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Nova Categoria</span>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Buscar categorias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="active">Ativas</SelectItem>
            <SelectItem value="inactive">Inativas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Categories Table */}
      <Card>
        <CardHeader>
          <CardTitle>Todas as Categorias</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ícone</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead className="hidden md:table-cell">Descrição</TableHead>
                <TableHead className="hidden md:table-cell">Slug</TableHead>
                <TableHead>Empresas</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Destaque</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <span className="text-xl">{category.icon}</span>
                  </TableCell>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{category.description}</TableCell>
                  <TableCell className="hidden md:table-cell">{category.slug}</TableCell>
                  <TableCell>{category.count}</TableCell>
                  <TableCell>
                    <Badge 
                      className={
                        category.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }
                    >
                      {category.status === 'active' ? 'Ativa' : 'Inativa'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => toggleFeatured(category.id)}
                      className={
                        category.featured 
                          ? 'text-purple-600 hover:text-purple-700' 
                          : 'text-gray-400 hover:text-gray-500'
                      }
                    >
                      {category.featured ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => toggleStatus(category.id)}
                        className={
                          category.status === 'active' 
                            ? 'text-red-600 hover:text-red-700' 
                            : 'text-green-600 hover:text-green-700'
                        }
                      >
                        {category.status === 'active' ? 'Desativar' : 'Ativar'}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-gray-900">
                {categories.length}
              </span>
              <p className="text-gray-600">Total de Categorias</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-green-600">
                {categories.filter(cat => cat.status === 'active').length}
              </span>
              <p className="text-gray-600">Categorias Ativas</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-purple-600">
                {categories.filter(cat => cat.featured).length}
              </span>
              <p className="text-gray-600">Categorias em Destaque</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Categories;
