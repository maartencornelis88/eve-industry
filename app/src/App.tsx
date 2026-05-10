import { useState } from 'react';
import Dashboard from '@/pages/Dashboard';
import ImportPlanner from '@/pages/ImportPlanner';
import Production from '@/pages/Production';
import Transactions from '@/pages/Transactions';
import Settings from '@/pages/Settings';
import { TAB_IDS, TAB_LABELS, type TabId } from '@/lib/constants';

const TABS: { id: TabId; label: string }[] = [
  { id: TAB_IDS.DASHBOARD,    label: TAB_LABELS.DASHBOARD },
  { id: TAB_IDS.IMPORT,       label: TAB_LABELS.IMPORT },
  { id: TAB_IDS.PRODUCTION,   label: TAB_LABELS.PRODUCTION },
  { id: TAB_IDS.TRANSACTIONS, label: TAB_LABELS.TRANSACTIONS },
  { id: TAB_IDS.SETTINGS,     label: TAB_LABELS.SETTINGS },
];

const PAGE_MAP: Record<TabId, JSX.Element> = {
  dashboard:    <Dashboard />,
  import:       <ImportPlanner />,
  production:   <Production />,
  transactions: <Transactions />,
  settings:     <Settings />,
};

const App = () => {
  const [activeTab, setActiveTab] = useState<TabId>(TAB_IDS.DASHBOARD);

  return (
    <div className="min-h-screen bg-background text-white font-sans">
      <header className="border-b border-white/10 px-6 py-4 sticky top-0 z-10 bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-eve-amber font-semibold tracking-wide text-sm uppercase">
              EVE Industry
            </span>
          </div>
          <nav className="flex gap-1" role="tablist">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-eve-amber/15 text-eve-amber'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {PAGE_MAP[activeTab]}
      </main>
    </div>
  );
};

export default App;
