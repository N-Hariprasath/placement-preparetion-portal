import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { AIChatbotModal } from '../common/AIChatbotModal';

export const AppLayout: React.FC = () => {
  const location = useLocation();
  const isPublicPage = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/forgot-password';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <div className="flex-1 flex w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        {!isPublicPage && (
          <div className="hidden lg:block">
            <Sidebar />
          </div>
        )}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>

      <Footer />
      <AIChatbotModal />
    </div>
  );
};
