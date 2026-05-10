const Dashboard = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {['Best margins today', 'Days of stock alerts', 'ISK on market'].map((label) => (
        <div key={label} className="rounded-lg border border-white/10 bg-white/5 p-6">
          <p className="text-xs uppercase tracking-widest text-white/40 mb-2">{label}</p>
          <p className="text-2xl font-semibold text-white/20">—</p>
        </div>
      ))}
    </div>
    <div className="rounded-lg border border-white/10 bg-white/5 p-8 text-center text-white/30 text-sm">
      Market snapshot table — coming soon
    </div>
  </div>
);

export default Dashboard;
