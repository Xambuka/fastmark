
import React, { useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Company } from '@/types';

interface CompanyMapProps {
  company: Company;
}

const CompanyMap = ({ company }: CompanyMapProps) => {
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  // Endereço completo para geocoding
  const fullAddress = `${company.address.street}, ${company.address.neighborhood}, ${company.address.city}, ${company.address.zipCode}`;

  const loadMap = () => {
    if (!mapboxToken) {
      alert('Por favor, insira seu token do Mapbox');
      return;
    }
    setShowTokenInput(false);
    // Aqui seria carregado o mapa real com o token
    console.log('Carregando mapa para:', fullAddress, 'com token:', mapboxToken);
  };

  const openInGoogleMaps = () => {
    const encodedAddress = encodeURIComponent(fullAddress);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  if (showTokenInput) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>Localização da Empresa</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Token do Mapbox necessário</h4>
            <p className="text-sm text-blue-700 mb-3">
              Para exibir o mapa interativo, você precisa de um token do Mapbox. 
              Visite <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="underline">mapbox.com</a> para obter um.
            </p>
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Cole seu token do Mapbox aqui"
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="flex-1"
              />
              <Button onClick={loadMap}>
                Carregar Mapa
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Endereço:</h4>
            <p className="text-gray-600">{fullAddress}</p>
            <Button 
              variant="outline" 
              onClick={openInGoogleMaps}
              className="flex items-center space-x-2"
            >
              <Navigation className="w-4 h-4" />
              <span>Abrir no Google Maps</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Aqui seria renderizado o mapa real do Mapbox
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="w-5 h-5" />
          <span>Localização da Empresa</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
          <p className="text-gray-600">Mapa carregaria aqui com o token do Mapbox</p>
        </div>
        <div className="mt-4 space-y-2">
          <h4 className="font-medium">Endereço:</h4>
          <p className="text-gray-600">{fullAddress}</p>
          <Button 
            variant="outline" 
            onClick={openInGoogleMaps}
            size="sm"
            className="flex items-center space-x-2"
          >
            <Navigation className="w-4 h-4" />
            <span>Abrir no Google Maps</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyMap;
