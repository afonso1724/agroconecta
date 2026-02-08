import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { TopbarContext } from '../context/TopbarContext';
import { FiPlus, FiCalendar, FiMapPin } from 'react-icons/fi';

const crops = ['Milho', 'Arroz', 'Feijão', 'Mandioca', 'Batata-doce', 'Abóbora', 'Tomate', 'Cebola'];

export const FarmRegister = () => {
  const navigate = useNavigate();
  const { setTitle, setSubtitle } = useContext(TopbarContext);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [farmData, setFarmData] = useState({
    farmerName: '',
    crop: '',
    plantDate: '',
    estimatedHarvestDate: '',
    area: '',
    expectedYield: '',
    location: '',
    notes: '',
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setTitle('Registar Lavra');
    setSubtitle('Adicione uma nova planta/cultura ao seu registo');
    return () => {
      setTitle('');
      setSubtitle('');
    };
  }, [setTitle, setSubtitle]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFarmData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate
    if (!farmData.farmerName || !farmData.crop || !farmData.plantDate || !farmData.area) {
      alert('Por favor preencha os campos obrigatórios: Nome do Agricultor, Cultura, Data de Plantio e Área');
      return;
    }

    // Mock save to localStorage
    const farmRecords = JSON.parse(localStorage.getItem('farmRecords') || '[]');
    farmRecords.push({
      id: Date.now(),
      ...farmData,
      registeredAt: new Date().toISOString(),
    });
    localStorage.setItem('farmRecords', JSON.stringify(farmRecords));

    setSuccess(true);
    setTimeout(() => {
      setShowModal(false);
      setSuccess(false);
      setFarmData({
        farmerName: '',
        crop: '',
        plantDate: '',
        estimatedHarvestDate: '',
        area: '',
        expectedYield: '',
        location: '',
        notes: '',
      });
      setSelectedFarm(null);
    }, 2000);
  };

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      <div className="p-4 md:p-8">
        {/* Header Section */}
        <div className="mb-8">
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer"
          >
            <FiPlus className="text-xl" />
            Registar Nova Lavra
          </button>
        </div>

        {/* Recent Registrations */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Minhas Lavras</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(() => {
              const records = JSON.parse(localStorage.getItem('farmRecords') || '[]');
              if (records.length === 0) {
                return (
                  <Card className="col-span-full">
                    <div className="text-center py-12">
                      <p className="text-gray-600 mb-4">Nenhuma lavra registada ainda.</p>
                      <button
                        onClick={() => setShowModal(true)}
                        className="text-emerald-600 hover:text-emerald-700 font-medium"
                      >
                        Clique aqui para registar a primeira
                      </button>
                    </div>
                  </Card>
                );
              }
              return records.map((farm) => (
                <Card
                  key={farm.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => {
                    setSelectedFarm(farm);
                    setShowDetailModal(true);
                  }}
                >
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900">{farm.crop}</h3>
                    <p className="text-sm text-gray-600 mt-1">{farm.farmerName}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 mb-4 space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <FiCalendar className="text-emerald-600" />
                      <span>Plantio: {new Date(farm.plantDate).toLocaleDateString('pt-AO')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <FiMapPin className="text-emerald-600" />
                      <span>Área: {farm.area} ha</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                    <div>
                      <p className="text-gray-600">Colheita Prevista</p>
                      <p className="font-semibold text-gray-900">
                        {farm.estimatedHarvestDate ? new Date(farm.estimatedHarvestDate).toLocaleDateString('pt-AO') : '-'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Producção Estimada</p>
                      <p className="font-semibold text-gray-900">{farm.expectedYield || '-'} kg</p>
                    </div>
                  </div>

                  {farm.notes && (
                    <div className="text-xs text-gray-600 bg-blue-50 rounded p-2">
                      <p className="font-semibold text-blue-900 mb-1">Notas:</p>
                      <p>{farm.notes}</p>
                    </div>
                  )}
                </Card>
              ));
            })()}
          </div>
        </div>
      </div>

      {/* Register Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          if (!success) setShowModal(false);
        }}
        title="Registar Nova Lavra"
      >
        {success ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">✓</div>
            <p className="text-gray-900 font-semibold">Lavra registada com sucesso!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 max-h-96 overflow-y-auto">
            {/* Section 1: Informações Básicas */}
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">Informações Básicas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Farmer Name */}
                <div className="md:col-span-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Nome do Agricultor <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="farmerName"
                    value={farmData.farmerName}
                    onChange={handleChange}
                    placeholder="Ex: João Silva"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
                  />
                </div>

                {/* Crop Selection */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Cultura <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="crop"
                    value={farmData.crop}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
                  >
                    <option value="">Selecione</option>
                    {crops.map(crop => (
                      <option key={crop} value={crop}>{crop}</option>
                    ))}
                  </select>
                </div>

                {/* Area */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Área (hectares) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="area"
                    value={farmData.area}
                    onChange={handleChange}
                    placeholder="Ex: 2.5"
                    step="0.1"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Datas */}
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">Cronograma</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Plant Date */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Plantio <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="plantDate"
                    value={farmData.plantDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
                  />
                </div>

                {/* Estimated Harvest Date */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Colheita Prevista
                  </label>
                  <input
                    type="date"
                    name="estimatedHarvestDate"
                    value={farmData.estimatedHarvestDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Produção e Localização */}
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">Produção e Local</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Expected Yield */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Producção Est. (kg)
                  </label>
                  <input
                    type="number"
                    name="expectedYield"
                    value={farmData.expectedYield}
                    onChange={handleChange}
                    placeholder="Ex: 5000"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Localização
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={farmData.location}
                    onChange={handleChange}
                    placeholder="Ex: Luanda, Bairro viana"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Notas */}
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">Observações</h3>
              <div>
                <textarea
                  name="notes"
                  value={farmData.notes}
                  onChange={handleChange}
                  placeholder="Detalhes adicionais..."
                  rows="2"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none resize-none"
                />
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium">
                Registar Lavra
              </Button>
            </div>
          </form>
        )}
      </Modal>

      {/* Detail Modal */}
      <Modal
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedFarm(null);
        }}
        title="Detalhes da Lavra"
      >
        {selectedFarm && (
          <div className="max-h-96 overflow-y-auto space-y-3 pr-2">
            {/* Personal Info */}
            <div>
              <h3 className="text-xs font-semibold text-gray-700 mb-2 pb-1 border-b border-gray-200">Agricultor</h3>
              <div className="grid grid-cols-1 gap-2">
                <div>
                  <p className="text-xs text-gray-600">{selectedFarm.farmerName}</p>
                </div>
              </div>
            </div>

            {/* Crop Info */}
            <div>
              <h3 className="text-xs font-semibold text-gray-700 mb-2 pb-1 border-b border-gray-200">Lavra</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-600">Cultura</p>
                  <p className="text-xs font-semibold text-gray-900">{selectedFarm.crop}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Área (ha)</p>
                  <p className="text-xs font-semibold text-gray-900">{selectedFarm.area}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Plantio</p>
                  <p className="text-xs font-semibold text-gray-900">
                    {new Date(selectedFarm.plantDate).toLocaleDateString('pt-AO')}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Colheita</p>
                  <p className="text-xs font-semibold text-gray-900">
                    {selectedFarm.estimatedHarvestDate
                      ? new Date(selectedFarm.estimatedHarvestDate).toLocaleDateString('pt-AO')
                      : '-'}
                  </p>
                </div>
              </div>
            </div>

            {/* Production Info */}
            <div>
              <h3 className="text-xs font-semibold text-gray-700 mb-2 pb-1 border-b border-gray-200">Produção</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-600">Rendimento</p>
                  <p className="text-xs font-semibold text-gray-900">
                    {selectedFarm.expectedYield ? `${selectedFarm.expectedYield} kg` : '-'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Localização</p>
                  <p className="text-xs font-semibold text-gray-900">{selectedFarm.location || '-'}</p>
                </div>
              </div>
            </div>

            {/* Notes */}
            {selectedFarm.notes && (
              <div>
                <h3 className="text-xs font-semibold text-gray-700 mb-2 pb-1 border-b border-gray-200">Notas</h3>
                <div className="bg-gray-50 rounded-lg p-2">
                  <p className="text-xs text-gray-700">{selectedFarm.notes}</p>
                </div>
              </div>
            )}

            {/* Meta Info */}
            <div>
              <h3 className="text-xs font-semibold text-gray-700 mb-2 pb-1 border-b border-gray-200">Registo</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-600">ID</p>
                  <p className="text-xs font-mono text-gray-900">{selectedFarm.id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Data</p>
                  <p className="text-xs text-gray-900">
                    {selectedFarm.registeredAt
                      ? new Date(selectedFarm.registeredAt).toLocaleDateString('pt-AO')
                      : '-'}
                  </p>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <div className="flex justify-end pt-3 border-t border-gray-200 mt-3">
              <Button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedFarm(null);
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-lg font-medium text-xs"
              >
                Fechar
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
