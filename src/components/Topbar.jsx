import { useNavigate } from 'react-router-dom';
import { FiMenu, FiUser, FiLogOut } from 'react-icons/fi';

export const Topbar = ({ title, subtitle = '', onToggleSidebar = () => {}, adminLabel = 'Admin', version = 'v0.1.0' }) => {
  const navigate = useNavigate();
  const currentDate = new Date().toLocaleDateString('pt-AO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 md:px-8 py-4 md:py-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Hamburger for mobile */}
            <button className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100" onClick={onToggleSidebar} aria-label="Abrir menu">
              <FiMenu size={20} />
            </button>

            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h1>
              {subtitle && <p className="text-gray-600 mt-1 text-sm">{subtitle}</p>}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:block text-right">
              <p className="text-sm text-gray-600 capitalize">{currentDate}</p>
              <p className="text-xs text-gray-400 mt-1">Angola, UTC+1</p>
            </div>

            <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-md px-3 py-2">
              <FiUser className="text-gray-500" />
              <div className="text-sm">
                <div className="font-semibold text-gray-800">{adminLabel}</div>
                <div className="text-xs text-gray-500">Sistema {version}</div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 rounded-md text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
              aria-label="Sair"
              title="Fazer logout"
            >
              <FiLogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
