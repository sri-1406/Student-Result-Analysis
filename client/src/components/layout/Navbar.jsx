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

        <div className="hidden md:flex items-center gap-8">
          <Link to="/student/dashboard" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>
          <Link to="/faculty/dashboard" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <BarChart3 size={18} />
            <span>Analytics</span>
          </Link>
        </div>

        <button className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors">
          <LogOut size={18} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
