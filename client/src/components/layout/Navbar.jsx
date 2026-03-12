import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, GraduationCap, BarChart3, LogOut, 
  ChevronDown, Settings2, CheckCircle2, ShieldCheck
} from 'lucide-react';

const Navbar = () => {
  const [showSchemes, setShowSchemes] = useState(false);
  const [activeScheme, setActiveScheme] = useState('2025');

  const schemes = ['2025', '2022', '2021'];

  return (
    <nav className="sticky top-0 z-50 glass border-b border-indigo-500/10 px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-indigo-600 rounded-lg group-hover:scale-110 transition-transform">
            <GraduationCap className="text-white h-6 w-6" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">
            Result<span className="text-indigo-400 font-black">Sphere</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-900/40 p-1 rounded-2xl border border-white/5">
          <Link to="/student/dashboard" className="px-5 py-2.5 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all flex items-center gap-2">
            <LayoutDashboard size={14} className="text-indigo-400" />
            Student
          </Link>
          <Link to="/faculty/dashboard" className="px-5 py-2.5 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all flex items-center gap-2">
            <BarChart3 size={14} className="text-emerald-400" />
            Faculty
          </Link>
          <Link to="/admin/dashboard" className="px-5 py-2.5 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all flex items-center gap-2">
            <ShieldCheck size={14} className="text-rose-400" />
            Admin
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative group">
            <button 
              onClick={() => setShowSchemes(!showSchemes)}
              className="flex items-center gap-2 bg-slate-900/40 hover:bg-slate-800/60 text-white px-4 py-2 rounded-xl border border-white/5 transition-all font-black text-xs uppercase tracking-widest ring-indigo-500/20 hover:ring-4"
            >
              <Settings2 size={16} className="text-indigo-400" />
              <span>Scheme</span>
              <ChevronDown size={14} className={`text-slate-500 transition-transform duration-300 ${showSchemes ? 'rotate-180' : ''}`} />
            </button>

            {showSchemes && (
              <div className="absolute top-full mt-2 right-0 w-48 glass-dark border border-white/10 rounded-2xl p-2 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                {schemes.map(year => (
                  <button
                    key={year}
                    onClick={() => {
                      setActiveScheme(year);
                      setShowSchemes(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-black transition-all ${activeScheme === year ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                  >
                    <span>{year} SCHEME</span>
                    {activeScheme === year && <CheckCircle2 size={14} />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors bg-slate-800/50 p-2 rounded-xl border border-white/5 group">
            <LogOut size={18} className="group-hover:rotate-12 transition-transform" />
            <span className="font-black text-[10px] uppercase tracking-wider">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
