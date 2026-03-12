import { Link } from 'react-router-dom';
import { LayoutDashboard, GraduationCap, BarChart3, LogOut } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-indigo-500/10 px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-indigo-600 rounded-lg group-hover:scale-110 transition-transform">
            <GraduationCap className="text-white h-6 w-6" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">
            Result<span className="text-indigo-400">Sphere</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4 bg-slate-900/40 p-1.5 rounded-xl border border-white/5">
            <button className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-black rounded-lg shadow-lg">2025 SCHEME</button>
            <button className="px-3 py-1.5 text-slate-500 hover:text-white text-xs font-bold transition-all">2022</button>
            <button className="px-3 py-1.5 text-slate-500 hover:text-white text-xs font-bold transition-all">2021</button>
          </div>

          <button className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors bg-slate-800/50 p-2 rounded-lg border border-white/5">
            <LogOut size={18} />
            <span className="font-bold text-xs uppercase tracking-wider">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
