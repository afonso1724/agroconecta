import { useState, useEffect, useContext } from 'react';
import { Card } from '../components/Card';
import { TopbarContext } from '../context/TopbarContext';
import { dashboardKPIs, recentActivity } from '../data/mockData';
import { FiUsers, FiFeather, FiCheckCircle, FiTruck, FiBarChart2, FiActivity, FiCheckSquare, FiCreditCard } from 'react-icons/fi';

export const Dashboard = () => {
  const [kpis, setKpis] = useState(dashboardKPIs);
  const [loading, setLoading] = useState(true);
  const [activity, setActivity] = useState([]);
  const { setTitle, setSubtitle } = useContext(TopbarContext);

  useEffect(() => {
    setTitle('Dashboard');
    setSubtitle('Visão geral do sistema Agriterra');
  }, [setTitle, setSubtitle]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setActivity(recentActivity);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const KPICard = ({ title, value, icon, color }) => (
    <Card className="flex items-start gap-4">
      <div className={`${color} p-4 rounded-lg text-white text-2xl`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
    </Card>
  );

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      <div className="p-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard 
            title="Total de Agricultores" 
            value={kpis.totalFarmers}
            icon={<FiUsers />}
            color="bg-blue-500"
          />
          <KPICard 
            title="Culturas Ativas" 
            value={kpis.activeCrops}
            icon={<FiFeather />}
            color="bg-emerald-600"
          />
          <KPICard 
            title="Colheitas Prontas" 
            value={kpis.harvestsReady}
            icon={<FiCheckCircle />}
            color="bg-green-500"
          />
          <KPICard 
            title="Entregas em Trânsito" 
            value={kpis.deliveriesInProgress}
            icon={<FiTruck />}
            color="bg-purple-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Placeholder */}
          <Card className="lg:col-span-2">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Atividade Semanal</h2>
            <div className="h-48 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-lg flex items-center justify-center text-gray-500">
              <div className="text-center">
                <p className="text-4xl mb-2"><FiBarChart2 className="mx-auto" size={36} /></p>
                <p>Gráfico de atividades</p>
              </div>
            </div>
          </Card>

          {/* Stats Card */}
          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Status Geral</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-sm text-gray-600">Sistema</span>
                <span className="text-sm font-semibold text-green-600 flex items-center gap-2"><FiCheckCircle /> Online</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-sm text-gray-600">Conectividade</span>
                <span className="text-sm font-semibold text-green-600 flex items-center gap-2"><FiCheckCircle /> Estável</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Última sincronização</span>
                <span className="text-sm font-semibold text-gray-700">Agora</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Atividades Recentes</h2>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {activity.map((item) => (
                <div key={item.id} className="flex items-start gap-3 pb-3 border-b last:border-b-0">
                  <span className="text-2xl text-gray-500">
                    {item.type === 'validation' && <FiCheckSquare />}
                    {item.type === 'harvest' && <FiFeather />}
                    {item.type === 'logistics' && <FiTruck />}
                    {item.type === 'payment' && <FiCreditCard />}
                    {item.type === 'registration' && <FiActivity />}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{item.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
