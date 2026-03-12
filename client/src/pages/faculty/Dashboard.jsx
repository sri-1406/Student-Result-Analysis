import { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { 
  Users, CheckCircle2, XCircle, BarChart2, 
  Search, Download, Plus, Filter 
} from 'lucide-react';

const COLORS = ['#10b981', '#f43f5e', '#6366f1', '#f59e0b'];

const mockStats = [
  { name: 'Pass', value: 85 },
  { name: 'Fail', value: 12 },
  { name: 'Absent', value: 3 },
];

const mockSubjectStats = [
  { code: '21CS61', pass: 92, fail: 8 },
  { code: '21CS62', pass: 88, fail: 12 },
  { code: '21CS63', pass: 95, fail: 5 },
  { code: '21CS64', pass: 80, fail: 20 },
];

const FacultyDashboard = () => {
  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">Faculty <span className="text-emerald-400">Analytics</span></h1>
          <p className="text-slate-400 mt-1">Analyzing department performance for Semester 6</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl transition-all font-bold shadow-lg shadow-indigo-500/20">
            <Plus size={18} />
            <span>Fetch New Batch</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Students', value: '184', icon: Users, color: 'text-white', bg: 'bg-white/5' },
          { label: 'Overall Pass %', value: '88.4%', icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
          { label: 'Overall Fail %', value: '11.6%', icon: XCircle, color: 'text-rose-400', bg: 'bg-rose-400/10' },
        ].map((stat, idx) => (
          <div key={idx} className="glass-dark p-6 rounded-3xl border border-white/5 flex items-center gap-6 group hover:border-indigo-500/30 transition-all">
            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
              <h3 className="text-3xl font-bold text-white leading-none mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pass/Fail Distribution */}
        <div className="glass-dark p-8 rounded-3xl border border-white/5">
          <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
            <BarChart2 className="text-indigo-400" />
            Result Distribution
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
        <div className="glass-dark p-8 rounded-3xl border border-white/5">
          <h2 className="text-xl font-bold text-white mb-8">Subject-wise Pass Comparison</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockSubjectStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="code" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
                />
                <Bar dataKey="pass" fill="#10b981" radius={[4, 4, 0, 0]} name="Pass %" />
                <Bar dataKey="fail" fill="#f43f5e" radius={[4, 4, 0, 0]} name="Fail %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Action Table */}
      <div className="glass-dark rounded-3xl border border-white/5">
        <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-white">Subject-wise Detailed Report</h2>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type="text" 
                placeholder="Search subject..." 
                className="bg-slate-900/50 border border-slate-700/50 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-all">
              <Filter size={18} />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#1e293b]/50 text-slate-400 text-xs uppercase">
              <tr>
                <th className="px-8 py-4">Code</th>
                <th className="px-8 py-4">Subject</th>
                <th className="px-8 py-4">Total</th>
                <th className="px-8 py-4">Pass</th>
                <th className="px-8 py-4">Fail</th>
                <th className="px-8 py-4">Avg Marks</th>
                <th className="px-8 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { code: '21CS61', name: 'Software Engineering', total: 184, pass: 170, fail: 14, avg: 72 },
                { code: '21CS62', name: 'Full Stack Development', total: 184, pass: 162, fail: 22, avg: 68 },
                { code: '21CS63', name: 'Computer Networks', total: 184, pass: 175, fail: 9, avg: 75 },
                { code: '21CS64', name: 'Operating Systems', total: 184, pass: 148, fail: 36, avg: 64 },
              ].map((sub, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="px-8 py-5 font-mono text-indigo-400">{sub.code}</td>
                  <td className="px-8 py-5 font-medium text-white">{sub.name}</td>
                  <td className="px-8 py-5 text-slate-400">{sub.total}</td>
                  <td className="px-8 py-5 text-emerald-400 font-bold">{sub.pass}</td>
                  <td className="px-8 py-5 text-rose-400 font-bold">{sub.fail}</td>
                  <td className="px-8 py-5 text-white">{sub.avg}</td>
                  <td className="px-8 py-5">
                    <button className="text-indigo-400 hover:text-white transition-colors">
                      <Download size={18} />
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
