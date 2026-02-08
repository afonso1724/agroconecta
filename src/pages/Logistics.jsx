import { useState, useEffect, useContext } from 'react';
import { Card } from '../components/Card';
import { StatusBadge } from '../components/StatusBadge';
import { Button } from '../components/Button';
import { logistics } from '../data/mockData';
import { TopbarContext } from '../context/TopbarContext';
import { FiTruck, FiTruck as FiVan } from 'react-icons/fi';

export const Logistics = () => {
  const [logisticsList] = useState(logistics);

  const getTransportIcon = (type) => {
    if (type === 'Kombi') return <FiVan />;
    if (type === 'Camião') return <FiTruck />;
    return <FiTruck />;
  };

  const { setTitle, setSubtitle } = useContext(TopbarContext);

  useEffect(() => {
    setTitle('Logística');
    setSubtitle('Gerir distribuição e entregas de colheitas');
    return () => {
      setTitle('');
      setSubtitle('');
    };
  }, [setTitle, setSubtitle]);

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      <div className="p-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <p className="text-gray-600 text-sm font-medium">Agendadas</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {logisticsList.filter(l => l.status === 'Agendado').length}
            </p>
          </Card>
          <Card>
            <p className="text-gray-600 text-sm font-medium">Em Trânsito</p>
            <p className="text-3xl font-bold text-purple-600 mt-2">
              {logisticsList.filter(l => l.status === 'Em trânsito').length}
            </p>
          </Card>
          <Card>
            <p className="text-gray-600 text-sm font-medium">Total de Volume</p>
            <p className="text-3xl font-bold text-emerald-600 mt-2">
              {logisticsList.reduce((sum, l) => sum + l.quantity, 0).toLocaleString('pt-AO')} kg
            </p>
          </Card>
        </div>

        {/* Logistics List */}
        <div className="grid grid-cols-1 gap-6">
          {logisticsList.map((item) => (
            <Card key={item.id}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Section */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{item.farmerName}</h3>
                  <p className="text-sm text-gray-600 mt-1">{item.crop}</p>
                  
                  <div className="mt-4 space-y-2">
                    <div>
                      <p className="text-xs text-gray-600">Quantidade</p>
                      <p className="font-semibold text-gray-900">{item.quantity.toLocaleString('pt-AO')} {item.unit}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Data de Colheita</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(item.harvestDate).toLocaleDateString('pt-AO')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Middle Section */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{getTransportIcon(item.transportType)}</span>
                    <div>
                      <p className="text-sm text-gray-600">Tipo de Transporte</p>
                      <p className="font-semibold text-gray-900">{item.transportType}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-600">Motorista</p>
                      <p className="font-semibold text-gray-900">{item.driver}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Distância</p>
                      <p className="font-semibold text-gray-900">{item.distance} km</p>
                    </div>
                  </div>
                </div>

                {/* Right Section */}
                <div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Status</p>
                    <StatusBadge status={item.status} />
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg mb-4">
                    <p className="text-xs text-gray-600 font-semibold uppercase">Destino</p>
                    <p className="text-sm text-gray-900 font-medium mt-1">
                      {item.destinationMarket}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Rastrear
                    </Button>
                    <Button size="sm" variant="secondary">
                      Contactar
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
