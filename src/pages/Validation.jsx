import { useState, useEffect, useContext } from 'react';
import { Card } from '../components/Card';
import { TopbarContext } from '../context/TopbarContext';
import { StatusBadge } from '../components/StatusBadge';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { validations } from '../data/mockData';
import { FiCheck, FiX } from 'react-icons/fi';

export const Validation = () => {
  const [validationList, setValidationList] = useState(validations);
  const [selectedValidation, setSelectedValidation] = useState(null);
  const [modalType, setModalType] = useState(null); // 'ready' or 'notready'
  const [quantity, setQuantity] = useState('');
  const [remainingDays, setRemainingDays] = useState('');

  const handleConfirmReady = (validation) => {
    setSelectedValidation(validation);
    setModalType('ready');
    setQuantity('');
  };

  const handleNotReady = (validation) => {
    setSelectedValidation(validation);
    setModalType('notready');
    setRemainingDays('');
  };

  const handleSubmitReady = () => {
    if (quantity && selectedValidation) {
      setValidationList(validationList.map(v => 
        v.id === selectedValidation.id 
          ? { ...v, status: 'Validado', result: 'Pronto', quantity: parseInt(quantity) }
          : v
      ));
      setModalType(null);
      setSelectedValidation(null);
    }
  };

  const handleSubmitNotReady = () => {
    if (remainingDays && selectedValidation) {
      setValidationList(validationList.map(v => 
        v.id === selectedValidation.id 
          ? { ...v, status: 'Pendente', result: 'Não pronto', remainingDays: parseInt(remainingDays) }
          : v
      ));
      setModalType(null);
      setSelectedValidation(null);
    }
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedValidation(null);
  };

  const { setTitle, setSubtitle } = useContext(TopbarContext);

  useEffect(() => {
    setTitle('Validações');
    setSubtitle('Gerir validações de culturas');
    return () => {
      setTitle('');
      setSubtitle('');
    };
  }, [setTitle, setSubtitle]);

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      <div className="p-8">
        <div className="grid grid-cols-1 gap-6">
          {validationList.length === 0 ? (
            <Card className="text-center py-12">
              <p className="text-gray-600">Nenhuma validação agendada.</p>
            </Card>
          ) : (
            validationList.map((validation) => (
              <Card key={validation.id}>
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-bold text-gray-900">{validation.farmerName}</h3>
                      <StatusBadge status={validation.status} />
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Cultura</p>
                        <p className="font-semibold text-gray-900 mt-1">{validation.crop}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Área (ha)</p>
                        <p className="font-semibold text-gray-900 mt-1">{validation.area}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Data Agendada</p>
                        <p className="font-semibold text-gray-900 mt-1">
                          {new Date(validation.scheduledDate).toLocaleDateString('pt-AO')}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Validador</p>
                        <p className="font-semibold text-gray-900 mt-1">{validation.validator}</p>
                      </div>
                          {validation.result === 'Pronto' && (
                        <div>
                          <p className="text-gray-600">Quantidade (kg)</p>
                          <p className="font-semibold text-green-600 mt-1">{validation.quantity}</p>
                        </div>
                      )}
                          {validation.result === 'Não pronto' && (
                        <div>
                          <p className="text-gray-600">Dias Restantes</p>
                          <p className="font-semibold text-yellow-600 mt-1">{validation.remainingDays}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  {validation.status === 'Pendente' && (
                    <div className="flex gap-2 flex-col">
                      <Button
                        size="sm"
                        variant="success"
                        onClick={() => handleConfirmReady(validation)}
                        className="flex items-center gap-2"
                      >
                        <FiCheck />
                        Confirmar Pronto
                      </Button>
                      <Button
                        size="sm"
                        variant="warning"
                        onClick={() => handleNotReady(validation)}
                        className="flex items-center gap-2"
                      >
                        <FiX />
                        Não Pronto
                      </Button>
                    </div>
                  )}
                  {validation.status === 'Validado' && (
                    <div className="text-center">
                      <p className="text-sm text-green-600 font-semibold"><FiCheck /> Validado</p>
                    </div>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Modal for Ready */}
      <Modal
        isOpen={modalType === 'ready'}
        onClose={closeModal}
        title="Confirmar Colheita Pronta"
        actions={[
          <Button key="cancel" variant="secondary" onClick={closeModal}>
            Cancelar
          </Button>,
          <Button 
            key="confirm" 
            variant="success" 
            onClick={handleSubmitReady}
            disabled={!quantity}
          >
            Confirmar
          </Button>,
        ]}
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Registre a quantidade colhida para {selectedValidation?.farmerName}
          </p>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Quantidade (kg)
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </Modal>

      {/* Modal for Not Ready */}
      <Modal
        isOpen={modalType === 'notready'}
        onClose={closeModal}
        title="Registrar Não Pronto"
        actions={[
          <Button key="cancel" variant="secondary" onClick={closeModal}>
            Cancelar
          </Button>,
          <Button 
            key="confirm" 
            variant="warning" 
            onClick={handleSubmitNotReady}
            disabled={!remainingDays}
          >
            Registrar
          </Button>,
        ]}
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Indique quantos dias faltam para {selectedValidation?.farmerName} estar pronto
          </p>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Dias Restantes
            </label>
            <input
              type="number"
              value={remainingDays}
              onChange={(e) => setRemainingDays(e.target.value)}
              placeholder="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
