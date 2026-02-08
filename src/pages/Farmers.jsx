import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { useContext, useEffect } from 'react';
import { TopbarContext } from '../context/TopbarContext';
import { StatusBadge } from '../components/StatusBadge';
import { farmers } from '../data/mockData';

export const Farmers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCrop, setFilterCrop] = useState('');
  const [filterRegion, setFilterRegion] = useState('');

  const crops = useMemo(() => [...new Set(farmers.map(f => f.crop))], []);
  const regions = useMemo(() => [...new Set(farmers.map(f => f.region))], []);

  const filteredFarmers = useMemo(() => {
    return farmers.filter(farmer => {
      const matchesSearch = farmer.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCrop = !filterCrop || farmer.crop === filterCrop;
      const matchesRegion = !filterRegion || farmer.region === filterRegion;
      return matchesSearch && matchesCrop && matchesRegion;
    });
  }, [searchTerm, filterCrop, filterRegion]);

  const { setTitle, setSubtitle } = useContext(TopbarContext);

  useEffect(() => {
    setTitle('Agricultores');
    setSubtitle(`${filteredFarmers.length} agricultor(es) encontrado(s)`);
    return () => {
      setSubtitle('');
    };
  }, [setTitle, setSubtitle, filteredFarmers.length]);

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      <div className="p-8">
        {/* Search and Filters */}
        <Card className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Procurar agricultor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <select
              value={filterCrop}
              onChange={(e) => setFilterCrop(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Todas as culturas</option>
              {crops.map(crop => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </select>
            <select
              value={filterRegion}
              onChange={(e) => setFilterRegion(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Todas as regiões</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterCrop('');
                setFilterRegion('');
              }}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
            >
              Limpar Filtros
            </button>
          </div>
        </Card>

        {/* Farmers List - mobile cards + desktop table */}
        <div className="space-y-4">
          {/* Mobile cards */}
          <div className="md:hidden">
            {filteredFarmers.length === 0 ? (
              <Card className="text-center py-8">Nenhum agricultor encontrado</Card>
            ) : (
              <div className="space-y-3">
                {filteredFarmers.map(farmer => (
                  <Card key={`card-${farmer.id}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{farmer.region} • {farmer.crop}</p>
                        <h3 className="text-lg font-semibold text-gray-900">{farmer.name}</h3>
                        <p className="text-sm text-gray-700 mt-1">Área: {farmer.areaSize} ha</p>
                        <p className="text-sm text-gray-500">Colheita: {new Date(farmer.expectedHarvest).toLocaleDateString('pt-AO')}</p>
                      </div>
                      <div className="flex flex-col items-end gap-3">
                        <StatusBadge status={farmer.status} />
                        <Link to={`/farmers/${farmer.id}`} className="text-emerald-600 hover:text-emerald-700 font-semibold">Ver</Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Desktop table */}
          <Card className="hidden md:block">
            <div className="overflow-x-auto">
              <table className="w-full">
              <thead className="border-b-2 border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Nome</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Região</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Cultura</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Área (ha)</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Colheita Esperada</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Ação</th>
                </tr>
              </thead>
                <tbody>
                  {filteredFarmers.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="py-8 text-center text-gray-500">
                        Nenhum agricultor encontrado
                      </td>
                    </tr>
                  ) : (
                    filteredFarmers.map((farmer) => (
                      <tr key={farmer.id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4 font-medium text-gray-900">{farmer.name}</td>
                        <td className="py-4 px-4 text-gray-700">{farmer.region}</td>
                        <td className="py-4 px-4 text-gray-700">{farmer.crop}</td>
                        <td className="py-4 px-4 text-gray-700">{farmer.areaSize}</td>
                        <td className="py-4 px-4 text-gray-700">
                          {new Date(farmer.expectedHarvest).toLocaleDateString('pt-AO')}
                        </td>
                        <td className="py-4 px-4">
                          <StatusBadge status={farmer.status} />
                        </td>
                        <td className="py-4 px-4 text-center">
                          <Link
                            to={`/farmers/${farmer.id}`}
                            className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
                          >
                            Ver Detalhes
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
