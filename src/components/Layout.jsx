import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { TopbarContext } from '../context/TopbarContext';

export const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');

  const open = () => setSidebarOpen(true);
  const close = () => setSidebarOpen(false);

  return (
    <TopbarContext.Provider value={{ title, subtitle, setTitle, setSubtitle }}>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar isOpen={sidebarOpen} onClose={close} />

        <div className="flex-1 flex flex-col md:ml-64">
          <Topbar title={title} subtitle={subtitle} onToggleSidebar={open} adminLabel="Admin" version="v0.1.0" />
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </TopbarContext.Provider>
  );
};
