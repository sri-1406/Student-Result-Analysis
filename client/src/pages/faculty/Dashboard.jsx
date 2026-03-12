import { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, AreaChart, Area
} from 'recharts';
import { 
  Users, CheckCircle2, XCircle, BarChart2, 
  Search, Download, Plus, Filter, TrendingUp, BookOpen 
} from 'lucide-react';

const COLORS = ['#6366f1', '#a855f7', '#22d3ee', '#f43f5e'];

const mockStats = [
  { name: 'S Grade', value: 25 },
  { name: 'A Grade', value: 45 },
  { name: 'B Grade', value: 30 },
  { name: 'C Grade', value: 20 },
];

const mockSubjectStats = [
  { code: 'BCS301', pass: 92, fail: 8, avg: 82 },
  { code: 'BCS302', pass: 88, fail: 12, avg: 76 },
  { code: 'BCS303', pass: 95, fail: 5, avg: 85 },
  { code: 'BCS304', pass: 80, fail: 20, avg: 70 },
];

const FacultyDashboard = () => {
  return (
    <div className="space-y-8 pb-12 transition-all duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black tracking-tight leading-tight">
            <span className="text-white">Faculty</span> <span className="text-gradient">Insights</span>
          </h1>
          <p className="text-slate-400 mt-2 font-medium flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Analyzing Batch Performance — Semester 6 (CSE)
          </p>
        </div>
        <div className="flex gap-4 bg-slate-900/40 p-2 rounded-2xl border border-white/10">
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl transition-all font-black text-xs uppercase shadow-lg shadow-indigo-500/20 active:scale-95">
            <Plus size={18} />
            <span>Fetch Results</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Students', value: '184', icon: Users, color: 'text-indigo-400', glow: 'shadow-indigo-500/10' },
          { label: 'Pass Rate', value: '94.2%', icon: CheckCircle2, color: 'text-emerald-400', glow: 'shadow-emerald-500/10' },
          { label: 'Avg Marks', value: '78.5', icon: TrendingUp, color: 'text-cyan-400', glow: 'shadow-cyan-500/10' },
        ].map((stat, idx) => (
          <div key={idx} className={`glass-dark p-8 rounded-[2.5rem] border border-white/5 flex items-center gap-6 group hover:border-white/20 transition-all duration-500 card-glow shadow-xl ${stat.glow}`}>
            <div className={`p-5 rounded-[1.5rem] bg-slate-900/50 ${stat.color} group-hover:scale-110 transition-transform duration-500 border border-white/5`}>
              <stat.icon size={32} />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-black uppercase tracking-widest">{stat.label}</p>
              <h3 className={`text-4xl font-black mt-1 ${stat.color} tracking-tighter`}>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pass/Fail Distribution */}
        <div className="glass-dark p-8 rounded-[2.5rem] border border-white/5 card-glow relative overflow-hidden group">
          <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-2">
            Grade Distribution
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockStats}
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {mockStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject-wise Comparison */}
        <div className="glass-dark p-8 rounded-[2.5rem] border border-white/5 card-glow relative overflow-hidden group">
          <h2 className="text-2xl font-black text-white mb-8">Pass % by Subject</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockSubjectStats}>
                <defs>
                  <linearGradient id="colorPass" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="code" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
                />
                <Area type="monotone" dataKey="pass" stroke="#6366f1" fillOpacity={1} fill="url(#colorPass)" strokeWidth={4} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Action Table */}
      <div className="glass-dark rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h2 className="text-2xl font-black text-white">Subject Statistics</h2>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-slate-900/80 border border-slate-700/50 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <button className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-400 hover:text-white transition-all border border-white/5">
              <Filter size={20} />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#1e293b]/50 text-slate-400 text-xs uppercase tracking-widest font-black">
              <tr>
                <th className="px-8 py-6">Code</th>
                <th className="px-8 py-6">Subject</th>
                <th className="px-8 py-6">Students</th>
                <th className="px-8 py-6">Pass %</th>
                <th className="px-8 py-6">Avg Marks</th>
                <th className="px-8 py-6">Report</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {mockSubjectStats.map((sub, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-all group duration-300">
                  <td className="px-8 py-6 font-mono text-indigo-400 font-bold">{sub.code}</td>
                  <td className="px-8 py-6 font-bold text-white">Subject_{sub.code}</td>
                  <td className="px-8 py-6 text-slate-400">184</td>
                  <td className="px-8 py-6 text-emerald-400 font-black">{sub.pass}%</td>
                  <td className="px-8 py-6 text-white font-medium">{sub.avg}</td>
                  <td className="px-8 py-6">
                    <button className="flex items-center gap-2 text-indigo-400 hover:text-white transition-all bg-indigo-500/10 px-4 py-2 rounded-xl border border-indigo-500/20 font-black text-[10px] uppercase">
                      <Download size={14} />
                      Export
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
