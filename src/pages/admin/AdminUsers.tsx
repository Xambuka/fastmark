
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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Criar Administrador</h1>
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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Editar Administrador</h1>
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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Alterar Senha</h1>
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Administradores</h1>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Administrador
        </Button>
      </div>

      <div className="grid gap-6">
        {users.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {user.avatar && (
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-12 h-12 rounded-full"
                    />
                  )}
                  <div>
                    <CardTitle className="text-lg">{user.name}</CardTitle>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                </div>
                <Badge className={getRoleBadgeColor(user.role)}>
                  {user.role === 'superadmin' ? 'Super Admin' : 
                   user.role === 'admin' ? 'Admin' : 'Moderador'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  <p>Criado em: {user.createdAt}</p>
                  {user.lastLogin && <p>Último login: {user.lastLogin}</p>}
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setChangingPasswordUser(user)}
                  >
                    <Shield className="w-4 h-4 mr-1" />
                    Senha
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingUser(user)}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Editar
                  </Button>
                  {user.role !== 'superadmin' && (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Excluir
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
