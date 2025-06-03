
import React from 'react';
import { X, Plus, Minus, ShoppingBag, MessageCircle, Phone } from 'lucide-react';
import { CartItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

const Cart = ({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }: CartProps) => {
  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const groupedByCompany = items.reduce((groups, item) => {
    const companyId = item.company.id;
    if (!groups[companyId]) {
      groups[companyId] = {
        company: item.company,
        items: []
      };
    }
    groups[companyId].items.push(item);
    return groups;
  }, {} as Record<string, { company: any; items: CartItem[] }>);

  const handleWhatsApp = (company: any, companyItems: CartItem[]) => {
    const message = `Olá! Gostaria de fazer um pedido:\n\n${companyItems.map(item => 
      `${item.quantity}x ${item.product.name} - R$ ${(item.product.price * item.quantity).toFixed(2)}`
    ).join('\n')}\n\nTotal: R$ ${companyItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0).toFixed(2)}`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${company.whatsapp}?text=${encodedMessage}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center">
            <ShoppingBag className="w-5 h-5 mr-2" />
            Carrinho ({items.length})
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-4">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Seu carrinho está vazio</p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.values(groupedByCompany).map(({ company, items: companyItems }) => (
                <Card key={company.id}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{company.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {companyItems.map((item) => (
                      <div key={item.product.id} className="flex items-center space-x-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.product.name}</h4>
                          <p className="text-green-600 font-semibold">R$ {item.product.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onUpdateQuantity(item.product.id, Math.max(0, item.quantity - 1))}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="font-medium">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => onRemoveItem(item.product.id)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Separator />
                    <div className="flex justify-between items-center font-semibold">
                      <span>Subtotal:</span>
                      <span className="text-green-600">
                        R$ {companyItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      {company.whatsapp && (
                        <Button
                          onClick={() => handleWhatsApp(company, companyItems)}
                          className="flex-1 bg-green-500 hover:bg-green-600"
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          WhatsApp
                        </Button>
                      )}
                      <Button
                        onClick={() => window.open(`tel:${company.phone}`, '_self')}
                        variant="outline"
                        className="flex-1"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Ligar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Card className="bg-orange-50 border-orange-200">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total Geral:</span>
                    <span className="text-orange-600">R$ {total.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    * Entre em contato com cada restaurante para finalizar seu pedido
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
