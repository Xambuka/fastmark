
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Shield, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { adminUsers } from '@/data/adminMockData';
import { AdminUser } from '@/types/admin';
import CreateAdminForm from '@/components/admin/CreateAdminForm';
import EditAdminForm from '@/components/admin/EditAdminForm';
import ChangePasswordForm from '@/components/admin/ChangePasswordForm';

const AdminUsers = () => {
  const [users, setUsers] = useState<AdminUser[]>(adminUsers);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [changingPasswordUser, setChangingPasswordUser] = useState<AdminUser | null>(null);

  const getRoleBadgeColor = (role: AdminUser['role']) => {
    switch (role) {
      case 'superadmin': return 'bg-red-100 text-red-800';
      case 'admin': return 'bg-blue-100 text-blue-800';
      case 'moderator': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm('Tem certeza que deseja excluir este administrador?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleCreateUser = (newUser: Omit<AdminUser, 'id' | 'createdAt'>) => {
    const user: AdminUser = {
      ...newUser,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setUsers([...users, user]);
    setShowCreateForm(false);
  };

  const handleEditUser = (updatedUser: AdminUser) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    setEditingUser(null);
  };

  if (showCreateForm) {
    return (
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Criar Administrador</h1>
          <Button variant="outline" onClick={() => setShowCreateForm(false)}>
            Voltar
          </Button>
        </div>
        <CreateAdminForm onSubmit={handleCreateUser} onCancel={() => setShowCreateForm(false)} />
      </div>
    );
  }

  if (editingUser) {
    return (
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Editar Administrador</h1>
          <Button variant="outline" onClick={() => setEditingUser(null)}>
            Voltar
          </Button>
        </div>
        <EditAdminForm 
          user={editingUser} 
          onSubmit={handleEditUser} 
          onCancel={() => setEditingUser(null)} 
        />
      </div>
    );
  }

  if (changingPasswordUser) {
    return (
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Alterar Senha</h1>
          <Button variant="outline" onClick={() => setChangingPasswordUser(null)}>
            Voltar
          </Button>
        </div>
        <ChangePasswordForm 
          user={changingPasswordUser} 
          onCancel={() => setChangingPasswordUser(null)} 
        />
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Administradores</h1>
        <Button onClick={() => setShowCreateForm(true)} className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Novo Administrador
        </Button>
      </div>

      <div className="grid gap-4 md:gap-6">
        {users.map((user) => (
          <Card key={user.id}>
            <CardHeader className="pb-3">
              <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  {user.avatar && (
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex-shrink-0"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-base sm:text-lg truncate">{user.name}</CardTitle>
                    <p className="text-sm text-gray-600 truncate">{user.email}</p>
                  </div>
                </div>
                <Badge className={`${getRoleBadgeColor(user.role)} flex-shrink-0 self-start sm:self-center`}>
                  {user.role === 'superadmin' ? 'Super Admin' : 
                   user.role === 'admin' ? 'Admin' : 'Moderador'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                <div className="text-sm text-gray-600">
                  <p>Criado em: {user.createdAt}</p>
                  {user.lastLogin && <p>Último login: {user.lastLogin}</p>}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setChangingPasswordUser(user)}
                    className="flex-1 sm:flex-none"
                  >
                    <Shield className="w-4 h-4 mr-1" />
                    <span className="hidden xs:inline">Senha</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingUser(user)}
                    className="flex-1 sm:flex-none"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    <span className="hidden xs:inline">Editar</span>
                  </Button>
                  {user.role !== 'superadmin' && (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteUser(user.id)}
                      className="flex-1 sm:flex-none"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      <span className="hidden xs:inline">Excluir</span>
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
