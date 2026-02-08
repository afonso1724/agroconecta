import { useState, useEffect, useContext } from 'react';
import { Card } from '../components/Card';
import { StatusBadge } from '../components/StatusBadge';
import { Button } from '../components/Button';
import { payments } from '../data/mockData';
import { TopbarContext } from '../context/TopbarContext';
import { FiCreditCard, FiSmartphone, FiDollarSign } from 'react-icons/fi';

export const Payments = () => {
  const [paymentsList] = useState(payments);

  const totalPaid = paymentsList
    .filter(p => p.paymentStatus === 'Concluído')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalPending = paymentsList
    .filter(p => p.paymentStatus === 'Pendente')
    .reduce((sum, p) => sum + p.amount, 0);

  const getPaymentMethodIcon = (method) => {
    if (method === 'Transferência Bancária') return <FiCreditCard />;
    if (method === 'Kz') return <FiSmartphone />;
    if (method === 'Dinheiro') return <FiDollarSign />;
    return <FiCreditCard />;
  };

  const { setTitle, setSubtitle } = useContext(TopbarContext);

  useEffect(() => {
    setTitle('Pagamentos');
    setSubtitle('Histórico de pagamentos a agricultores');
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
            <p className="text-gray-600 text-sm font-medium">Total Pago</p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {(totalPaid / 1000).toFixed(1)}Kz
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {paymentsList.filter(p => p.paymentStatus === 'Concluído').length} transações
            </p>
          </Card>
          <Card>
            <p className="text-gray-600 text-sm font-medium">Pendente</p>
            <p className="text-3xl font-bold text-yellow-600 mt-2">
              {(totalPending / 1000).toFixed(1)} Kz
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {paymentsList.filter(p => p.paymentStatus === 'Pendente').length} transações
            </p>
          </Card>
          <Card>
            <p className="text-gray-600 text-sm font-medium">Saldo Total</p>
            <p className="text-3xl font-bold text-emerald-600 mt-2">
              {((totalPaid + totalPending) / 1000).toFixed(1)} Kz
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {paymentsList.length} pagamentos
            </p>
          </Card>
        </div>

        {/* Payments Table (desktop) */}
        <Card className="hidden md:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b-2 border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Agricultor</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Cultura</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Quantidade</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Valor</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Método</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Data</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Ação</th>
                </tr>
              </thead>
              <tbody>
                {paymentsList.map((payment) => (
                  <tr key={payment.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <p className="font-semibold text-gray-900">{payment.farmerName}</p>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{payment.crop}</td>
                    <td className="py-4 px-4 text-gray-700">
                      {payment.quantity.toLocaleString('pt-AO')} kg
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-semibold text-gray-900">
                        {(payment.amount / 1000).toFixed(1)} Kz
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        @ {payment.unitPrice} Kz/kg
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span>{getPaymentMethodIcon(payment.paymentMethod)}</span>
                        <span className="text-sm text-gray-700">{payment.paymentMethod}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700">
                      {new Date(payment.paymentDate).toLocaleDateString('pt-AO')}
                    </td>
                    <td className="py-4 px-4">
                      <StatusBadge status={payment.paymentStatus} />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Button size="sm" variant="outline">
                        Comprovante
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Mobile list */}
        <div className="md:hidden space-y-4">
          {paymentsList.map((payment) => (
            <Card key={`mobile-${payment.id}`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{payment.farmerName}</p>
                  <p className="text-sm text-gray-600">{payment.crop} • {payment.quantity.toLocaleString('pt-AO')} kg</p>
                  <p className="text-sm font-semibold text-emerald-600 mt-2">{(payment.amount / 1000).toFixed(1)}K Kz</p>
                </div>
                <div className="flex flex-col items-end">
                  <StatusBadge status={payment.paymentStatus} />
                  <Button size="sm" variant="outline" className="mt-2">Comprovante</Button>
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-600 flex items-center justify-between">
                <div className="flex items-center gap-2">{getPaymentMethodIcon(payment.paymentMethod)}<span>{payment.paymentMethod}</span></div>
                <div>{new Date(payment.paymentDate).toLocaleDateString('pt-AO')}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Detailed Cards */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {paymentsList.map((payment) => (
            <Card key={`detail-${payment.id}`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{payment.farmerName}</h3>
                  <p className="text-sm text-gray-600 mt-1">{payment.crop}</p>
                </div>
                <StatusBadge status={payment.paymentStatus} />
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-gray-600 text-xs font-semibold uppercase">Valor Total</p>
                <p className="text-3xl font-bold text-emerald-600 mt-2">
                  {(payment.amount / 1000).toFixed(1)} Kz
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <p className="text-gray-600">Quantidade</p>
                  <p className="font-semibold text-gray-900 mt-1">
                    {payment.quantity.toLocaleString('pt-AO')} kg
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Preço Unitário</p>
                  <p className="font-semibold text-gray-900 mt-1">
                    {payment.unitPrice} Kz/kg
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Método</p>
                  <p className="font-semibold text-gray-900 mt-1">
                    {payment.paymentMethod}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Data</p>
                  <p className="font-semibold text-gray-900 mt-1">
                    {new Date(payment.paymentDate).toLocaleDateString('pt-AO')}
                  </p>
                </div>
              </div>

              {payment.paymentMethod === 'Transferência Bancária' && (
                <div className="bg-gray-50 rounded-lg p-3 mb-4 text-sm">
                  <p className="text-gray-600 font-semibold">Informação Bancária</p>
                  <p className="text-gray-900 mt-1">Banco: {payment.bank}</p>
                  <p className="text-gray-900">Conta: {payment.bankAccount}</p>
                </div>
              )}

              <Button className="w-full" variant="outline">
                Ver Comprovante
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
