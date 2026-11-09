import React from 'react';
import { AppProvider } from './context/AppContext';
import { AdminPanel } from './components/AdminPanel';
import { AuthModal } from './components/AuthModal';
import { InvoiceModal } from './components/InvoiceModal';
import { PayslipModal } from './components/PayslipModal';
import { ClientMailModal } from './components/ClientMailModal';
import { LegalCenter } from './components/LegalCenter';

const MainContent: React.FC = () => {
  const legalPage = new URLSearchParams(window.location.search).get('legal');
  if (legalPage === 'privacy' || legalPage === 'terms' || legalPage === 'deletion') {
    return <LegalCenter page={legalPage} />;
  }

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased text-slate-800 bg-[#F3F7FF]">
      <main className="flex-1">
        <AdminPanel />
      </main>

      {/* Admin Modals */}
      <AuthModal />
      <InvoiceModal />
      <PayslipModal />
      <ClientMailModal />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
