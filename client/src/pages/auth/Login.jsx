import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login for now
    if (email && password) {
      toast.success('Successfully logged in!');
      navigate('/student/dashboard');
    } else {
      toast.error('Please fill in all fields');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 relative px-4">
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-500/20 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-cyan-500/10 blur-[100px] pointer-events-none" />
      <div className="glass-dark p-10 rounded-[2.5rem] border border-white/10 shadow-2xl relative z-10 card-glow">
        <div className="text-center mb-8">
          <div className="inline-flex gap-2 bg-slate-900/40 p-1 rounded-xl mb-6 border border-white/5 mx-auto">
            <button className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-black rounded-lg">2025 SCHEME</button>
            <button className="px-3 py-1.5 text-slate-500 hover:text-white text-xs font-bold transition-all">2022</button>
            <button className="px-3 py-1.5 text-slate-500 hover:text-white text-xs font-bold transition-all">2021</button>
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-white mb-2">Login</h1>
          <p className="text-slate-400 font-medium">Access your <span className="text-gradient font-bold uppercase tracking-wider text-xs">Academic Insights</span></p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                placeholder="name@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 group transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.98]"
          >
            <LogIn h-5 w-5 />
            <span>Sign In</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-400 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-semibold underline-offset-4 hover:underline">
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
