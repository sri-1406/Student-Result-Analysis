import { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';
import { 
  Trophy, TrendingUp, BookOpen, AlertCircle, 
  Download, Search, Filter, ChevronRight 
} from 'lucide-react';

const COLORS = ['#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe', '#e0e7ff'];

const mockData = {
  semesterProgress: [
    { sem: 'Sem 1', sgpa: 8.2 },
    { sem: 'Sem 2', sgpa: 8.5 },
    { sem: 'Sem 3', sgpa: 7.9 },
    { sem: 'Sem 4', sgpa: 8.8 },
    { sem: 'Sem 5', sgpa: 9.1 },
    { sem: 'Sem 6', sgpa: 8.5 },
  ],
  subjectPerformance: [
    { subject: 'Maths', score: 85 },
    { subject: 'DAA', score: 92 },
    { subject: 'DBMS', score: 78 },
    { subject: 'OS', score: 88 },
    { subject: 'CN', score: 82 },
  ]
};

const Dashboard = () => {
  const [activeSem, setActiveSem] = useState(6);

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">Student <span className="text-indigo-400">Dashboard</span></h1>
          <p className="text-slate-400 mt-1">Welcome back, John Doe (1MS21CS001)</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-xl border border-slate-700 transition-all font-medium">
            <Download size={18} />
            <span>Download Report</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Current CGPA', value: '8.65', icon: Trophy, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
          { label: 'Last SGPA', value: '8.50', icon: TrendingUp, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
          { label: 'Total Credits', value: '132', icon: BookOpen, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
          { label: 'Pending Backlogs', value: '0', icon: AlertCircle, color: 'text-rose-400', bg: 'bg-rose-400/10' },
        ].map((stat, idx) => (
          <div key={idx} className="glass-dark p-6 rounded-3xl border border-white/5 flex items-start justify-between group hover:border-indigo-500/30 transition-all">
            <div>
              <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
              <h3 className="text-3xl font-bold text-white mt-1">{stat.value}</h3>
            </div>
            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
              <stat.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress Chart */}
        <div className="lg:col-span-2 glass-dark p-8 rounded-3xl border border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white">Academic Progress</h2>
            <div className="flex gap-2 bg-slate-900/50 p-1 rounded-lg">
              {['SGPA', 'CGPA'].map(t => (
                <button key={t} className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${t === 'SGPA' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData.semesterProgress}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="sem" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} domain={[0, 10]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
                  itemStyle={{ color: '#818cf8' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="sgpa" 
                  stroke="#6366f1" 
                  strokeWidth={4} 
                  dot={{ r: 6, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 8, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject wise Distribution */}
        <div className="glass-dark p-8 rounded-3xl border border-white/5">
          <h2 className="text-xl font-bold text-white mb-8">Latest Performance</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData.subjectPerformance} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="subject" type="category" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} width={60} />
                <Tooltip 
                  cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
                />
                <Bar dataKey="score" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={20}>
                  {mockData.subjectPerformance.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Result Table (Placeholder) */}
      <div className="glass-dark rounded-3xl border border-white/5 overflow-hidden">
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Detailed Results — Semester {activeSem}</h2>
          <button className="text-indigo-400 hover:text-indigo-300 font-bold text-sm flex items-center gap-1 group transition-all">
            View All Semesters
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#1e293b]/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-8 py-4 font-semibold">Subject Code</th>
                <th className="px-8 py-4 font-semibold">Subject Name</th>
                <th className="px-8 py-4 font-semibold">Int</th>
                <th className="px-8 py-4 font-semibold">Ext</th>
                <th className="px-8 py-4 font-semibold">Total</th>
                <th className="px-8 py-4 font-semibold">Grade</th>
                <th className="px-8 py-4 font-semibold">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockData.subjectPerformance.map((sub, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-5 font-mono text-indigo-400">21CS6{idx+1}</td>
                  <td className="px-8 py-5 font-medium text-white">{sub.subject}</td>
                  <td className="px-8 py-5 text-slate-400">38</td>
                  <td className="px-8 py-5 text-slate-400">52</td>
                  <td className="px-8 py-5 font-bold text-white">{sub.score}</td>
                  <td className="px-8 py-5">
                    <span className="bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-lg text-sm font-bold border border-indigo-500/20">A+</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      PASS
                    </span>
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

export default Dashboard;
