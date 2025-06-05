
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { AdminUser, AdminPermissions } from '@/types/admin';

interface CreateAdminFormProps {
  onSubmit: (user: Omit<AdminUser, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

const CreateAdminForm = ({ onSubmit, onCancel }: CreateAdminFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'moderator' as AdminUser['role'],
    avatar: ''
  });

  const [permissions, setPermissions] = useState<AdminPermissions>({
    dashboard: false,
    companies: { view: false, create: false, edit: false, delete: false, approve: false },
    users: { view: false, edit: false, delete: false, moderate: false },
    categories: { view: false, create: false, edit: false, delete: false },
    layout: { view: false, edit: false },
    plans: { view: false, create: false, edit: false, delete: false },
    settings: { view: false, edit: false }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      permissions
    });
  };

  const updatePermission = (category: keyof AdminPermissions, permission: string, value: boolean) => {
    setPermissions(prev => ({
      ...prev,
      [category]: typeof prev[category] === 'object' 
        ? { ...prev[category], [permission]: value }
        : value
    }));
  };

  const setRolePermissions = (role: AdminUser['role']) => {
    switch (role) {
      case 'superadmin':
        setPermissions({
          dashboard: true,
          companies: { view: true, create: true, edit: true, delete: true, approve: true },
          users: { view: true, edit: true, delete: true, moderate: true },
          categories: { view: true, create: true, edit: true, delete: true },
          layout: { view: true, edit: true },
          plans: { view: true, create: true, edit: true, delete: true },
          settings: { view: true, edit: true }
        });
        break;
      case 'admin':
        setPermissions({
          dashboard: true,
          companies: { view: true, create: false, edit: true, delete: false, approve: true },
          users: { view: true, edit: true, delete: false, moderate: true },
          categories: { view: true, create: true, edit: true, delete: false },
          layout: { view: true, edit: false },
          plans: { view: true, create: false, edit: false, delete: false },
          settings: { view: true, edit: false }
        });
        break;
      case 'moderator':
        setPermissions({
          dashboard: true,
          companies: { view: true, create: false, edit: false, delete: false, approve: false },
          users: { view: false, edit: false, delete: false, moderate: true },
          categories: { view: true, create: false, edit: false, delete: false },
          layout: { view: false, edit: false },
          plans: { view: false, create: false, edit: false, delete: false },
          settings: { view: false, edit: false }
        });
        break;
    }
  };

  const handleRoleChange = (role: AdminUser['role']) => {
    setFormData(prev => ({ ...prev, role }));
    setRolePermissions(role);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="role">Função</Label>
              <Select value={formData.role} onValueChange={handleRoleChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="moderator">Moderador</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="superadmin">Super Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Permissões</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium">Dashboard</h4>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={permissions.dashboard}
                    onCheckedChange={(checked) => updatePermission('dashboard', '', !!checked)}
                  />
                  <Label>Acessar Dashboard</Label>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Empresas</h4>
                {Object.entries(permissions.companies).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      checked={value}
                      onCheckedChange={(checked) => updatePermission('companies', key, !!checked)}
                    />
                    <Label className="capitalize">{key === 'view' ? 'Visualizar' : key === 'create' ? 'Criar' : key === 'edit' ? 'Editar' : key === 'delete' ? 'Excluir' : 'Aprovar'}</Label>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Usuários</h4>
                {Object.entries(permissions.users).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      checked={value}
                      onCheckedChange={(checked) => updatePermission('users', key, !!checked)}
                    />
                    <Label className="capitalize">{key === 'view' ? 'Visualizar' : key === 'edit' ? 'Editar' : key === 'delete' ? 'Excluir' : 'Moderar'}</Label>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Categorias</h4>
                {Object.entries(permissions.categories).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      checked={value}
                      onCheckedChange={(checked) => updatePermission('categories', key, !!checked)}
                    />
                    <Label className="capitalize">{key === 'view' ? 'Visualizar' : key === 'create' ? 'Criar' : key === 'edit' ? 'Editar' : 'Excluir'}</Label>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Planos</h4>
                {Object.entries(permissions.plans).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      checked={value}
                      onCheckedChange={(checked) => updatePermission('plans', key, !!checked)}
                    />
                    <Label className="capitalize">{key === 'view' ? 'Visualizar' : key === 'create' ? 'Criar' : key === 'edit' ? 'Editar' : 'Excluir'}</Label>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Configurações</h4>
                {Object.entries(permissions.settings).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      checked={value}
                      onCheckedChange={(checked) => updatePermission('settings', key, !!checked)}
                    />
                    <Label className="capitalize">{key === 'view' ? 'Visualizar' : 'Editar'}</Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex space-x-4">
          <Button type="submit">Criar Administrador</Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateAdminForm;
