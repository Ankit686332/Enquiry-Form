export default function App() {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl space-y-6 text-center border border-slate-200/60 dark:border-slate-700">
        
        {/* Modern Tailwind Badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
          Tailwind CSS v4 Active
        </div>

        {/* Dynamic Typography */}
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          React + Vite Boilerplate
        </h1>
        
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Your utility-first development pipeline is successfully set up! No complex configurations or PostCSS wrappers required.
        </p>

        {/* Interactive Element Mockup */}
        <div className="pt-2">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl transition duration-200 transform active:scale-98 shadow-md shadow-blue-500/20">
            Explore Dashboard
          </button>
        </div>

      </div>
    </div>
  );
}