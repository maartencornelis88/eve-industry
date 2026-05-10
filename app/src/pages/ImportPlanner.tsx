const ImportPlanner = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-white">Import Planner</h1>
      <button
        disabled
        className="px-4 py-2 rounded bg-eve-amber/20 text-eve-amber text-sm font-medium opacity-50 cursor-not-allowed"
      >
        New Import Run
      </button>
    </div>
    <div className="rounded-lg border border-white/10 bg-white/5 p-8 text-center text-white/30 text-sm">
      Import run builder — coming soon
    </div>
  </div>
);

export default ImportPlanner;
