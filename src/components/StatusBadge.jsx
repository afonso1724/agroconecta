import { FiCheckCircle, FiClock, FiTruck, FiFeather } from 'react-icons/fi';

const mapping = {
  'Em crescimento': { label: 'Em crescimento', classes: 'bg-blue-50 text-blue-700', icon: <FiFeather /> },
  Pronto: { label: 'Pronto', classes: 'bg-green-50 text-green-700', icon: <FiCheckCircle /> },
  Validado: { label: 'Validado', classes: 'bg-emerald-50 text-emerald-700', icon: <FiCheckCircle /> },
  'Concluído': { label: 'Concluído', classes: 'bg-emerald-50 text-emerald-700', icon: <FiCheckCircle /> },
  Entregue: { label: 'Entregue', classes: 'bg-gray-100 text-gray-700', icon: <FiTruck /> },
  Pendente: { label: 'Pendente', classes: 'bg-yellow-50 text-yellow-700', icon: <FiClock /> },
};

export const StatusBadge = ({ status, className = '' }) => {
  const key = Object.keys(mapping).find(k => k.toLowerCase() === String(status).toLowerCase()) || null;
  const item = key ? mapping[key] : { label: status, classes: 'bg-gray-100 text-gray-700' };

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${item.classes} ${className}`}>
      {item.icon && <span className="text-sm">{item.icon}</span>}
      <span>{item.label}</span>
    </span>
  );
};
