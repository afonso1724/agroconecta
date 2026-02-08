import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { useContext, useEffect } from 'react';
import { TopbarContext } from '../context/TopbarContext';
import { StatusBadge } from '../components/StatusBadge';
import { Button } from '../components/Button';
import { farmers } from '../data/mockData';

export const FarmerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const farmer = farmers.find(f => f.id === parseInt(id));

  if (!farmer) {
    return (
      <div className="flex-1 bg-gray-50 min-h-screen">
        <div className="p-8">
          <Card className="text-center py-12">
            <p className="text-gray-600 mb-4">O agricultor solicitado não existe.</p>
            <Button onClick={() => navigate('/farmers')}>Voltar para Agricultores</Button>
          </Card>
        </div>
      </div>
    );
  }

  const timeline = [
    { step: 1, label: 'Registro', status: 'completed', date: '2026-01-15' },
    { step: 2, label: 'Satélite', status: 'completed', date: '2026-01-20' },
    { step: 3, label: 'Validação', status: farmer.status === 'A validar' ? 'current' : 'completed', date: '2026-02-10' },
    { step: 4, label: 'Logística', status: farmer.status === 'Pronto' ? 'current' : 'pending', date: '2026-02-15' },
    { step: 5, label: 'Pagamento', status: 'pending', date: '2026-02-20' },
  ];

  const getTimelineColor = (status) => {
    if (status === 'completed') return 'bg-emerald-600';
    if (status === 'current') return 'bg-yellow-500';
    return 'bg-gray-300';
  };

  const { setTitle, setSubtitle } = useContext(TopbarContext);

  useEffect(() => {
    setTitle(farmer.name);
    setSubtitle(`${farmer.crop} • ${farmer.region}`);
    return () => {
      setTitle('');
      setSubtitle('');
    };
  }, [farmer, setTitle, setSubtitle]);

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Farmer Info */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Informações do Agricultor</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600">Nome Completo</p>
                  <p className="text-lg font-semibold text-gray-900 mt-1">{farmer.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Região</p>
                  <p className="text-lg font-semibold text-gray-900 mt-1">{farmer.region}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Telefone</p>
                  <p className="text-lg font-semibold text-gray-900 mt-1">{farmer.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <div className="mt-1">
                    <StatusBadge status={farmer.status} />
                  </div>
                </div>
              </div>
            </Card>

            {/* Crop Info */}
            <Card className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Informações da Cultura</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600">Tipo de Cultura</p>
                  <p className="text-lg font-semibold text-gray-900 mt-1">{farmer.crop}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Área Plantada</p>
                  <p className="text-lg font-semibold text-gray-900 mt-1">{farmer.areaSize} ha</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Data Esperada de Colheita</p>
                  <p className="text-lg font-semibold text-gray-900 mt-1">
                    {new Date(farmer.expectedHarvest).toLocaleDateString('pt-AO')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Índice NDVI</p>
                  <p className="text-lg font-semibold text-gray-900 mt-1">
                    {(farmer.ndvi * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </Card>

            {/* GPS Location */}
            <Card>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Localização GPS</h2>
              <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 mb-4">
                <div className="text-center">
                  <p className="text-4xl mb-2"><svg className="inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="36" height="36"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg></p>
                  <p>Localização em mapa</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Latitude</p>
                  <p className="text-lg font-semibold text-gray-900">{farmer.gpsLat.toFixed(4)}°</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Longitude</p>
                  <p className="text-lg font-semibold text-gray-900">{farmer.gpsLng.toFixed(4)}°</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Timeline Sidebar */}
          <Card className="h-fit">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Progresso do Ciclo</h2>
            <div className="space-y-6">
              {timeline.map((item, idx) => (
                <div key={item.step} className="flex gap-4">
                  {/* Timeline Circle */}
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 ${getTimelineColor(item.status)} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                      {item.status === 'completed' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.704 5.29a1 1 0 010 1.414l-7.07 7.07a1 1 0 01-1.414 0l-3.536-3.536a1 1 0 111.414-1.414L8 11.586l6.29-6.29a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      ) : item.step}
                    </div>
                    {idx < timeline.length - 1 && (
                      <div className={`w-1 h-12 ${item.status === 'completed' ? 'bg-emerald-600' : 'bg-gray-300'}`} />
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <p className="font-semibold text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-600 mt-1">{new Date(item.date).toLocaleDateString('pt-AO')}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.status === 'completed' && 'Concluído'}
                      {item.status === 'current' && 'Em progresso'}
                      {item.status === 'pending' && 'Pendente'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <Button onClick={() => navigate('/farmers')} variant="secondary">
            Voltar
          </Button>
          <Button variant="primary">
            Editar Informações
          </Button>
          <Button variant="outline">
            Visualizar Histórico
          </Button>
        </div>
      </div>
    </div>
  );
};
