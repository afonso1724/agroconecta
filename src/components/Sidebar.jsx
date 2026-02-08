import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiUsers, FiCheckSquare, FiTruck, FiCreditCard, FiFeather } from 'react-icons/fi';

const navItems = [
  { path: '/', label: 'Dashboard', icon: <FiHome /> },
  { path: '/farmers', label: 'Agricultores', icon: <FiUsers /> },
  { path: '/farm-register', label: 'Registar Lavra', icon: <FiFeather /> },
  { path: '/validation', label: 'Validações', icon: <FiCheckSquare /> },
  { path: '/logistics', label: 'Logística', icon: <FiTruck /> },
  { path: '/payments', label: 'Pagamentos', icon: <FiCreditCard /> },
];

export const Sidebar = ({ isOpen = false, onClose = () => {} }) => {
  const location = useLocation();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:left-0 w-64 bg-emerald-800 text-white shadow-lg z-20">
        <div className="p-6">
          <h1 className="text-2xl font-bold">AgroConecta</h1>
          <p className="text-emerald-100 text-xs mt-1">Dashboard Interno</p>
        </div>

        <nav className="mt-8 space-y-2 px-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-emerald-600 text-white'
                    : 'text-emerald-100 hover:bg-emerald-700'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-40 md:hidden ${isOpen ? '' : 'pointer-events-none'}`} aria-hidden={!isOpen}>
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={onClose}
        />

        <aside className={`fixed left-0 top-0 bottom-0 w-64 bg-emerald-800 text-white transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 border-b border-emerald-700">
            <h1 className="text-2xl font-bold">AgroConecta</h1>
            <p className="text-emerald-100 text-xs mt-1">Dashboard Interno</p>
          </div>
          <nav className="mt-6 space-y-2 px-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-emerald-100 hover:bg-emerald-700`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>
      </div>
    </>
  );
};
