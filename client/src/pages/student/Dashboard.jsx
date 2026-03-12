import { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';
import { 
  Trophy, TrendingUp, BookOpen, AlertCircle, 
  Download, Search, Filter, ChevronRight, Settings2 
} from 'lucide-react';

const COLORS = ['#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe', '#e0e7ff'];

const allSchemes = {
  "2022_cse": {
    name: "2022 Scheme (CSE)",
    subjects: [
      { code: "BCS301", name: "Maths for CS", score: 85 },
      { code: "BCS302", name: "Digital Design", score: 92 },
      { code: "BCS303", name: "Operating Systems", score: 78 },
      { code: "BCS304", name: "Data Structures", score: 88 }
    ]
  },
  "2021_cse": {
    name: "2021 Scheme (CSE)",
    subjects: [
      { code: "21MAT31", name: "Transform Calculus", score: 82 },
      { code: "21CS32", name: "Data Structures", score: 85 },
      { code: "21CS33", name: "Analog & Digital", score: 74 },
      { code: "21CS34", name: "Computer Org", score: 80 }
    ]
  }
};

const Dashboard = () => {
  const [activeSem, setActiveSem] = useState(6);
  const [selectedScheme, setSelectedScheme] = useState("2022_cse");
  const [currentSubjects, setCurrentSubjects] = useState(allSchemes["2022_cse"].subjects);

  useEffect(() => {
    setCurrentSubjects(allSchemes[selectedScheme].subjects);
  }, [selectedScheme]);

  const mockProgress = [
    { sem: 'Sem 1', sgpa: 8.2 },
    { sem: 'Sem 2', sgpa: 8.5 },
    { sem: 'Sem 3', sgpa: 7.9 },
    { sem: 'Sem 4', sgpa: 8.8 },
    { sem: 'Sem 5', sgpa: 9.1 },
    { sem: 'Sem 6', sgpa: 8.5 },
  ];

  return (
    <div className="space-y-8 pb-12 transition-all duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">Student <span className="text-indigo-400">Analysis</span></h1>
          <p className="text-slate-400 mt-1">John Doe (1MS21CS001)</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 bg-slate-900/40 p-2 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 px-3 text-indigo-400">
            <Settings2 size={18} />
            <span className="text-sm font-bold uppercase tracking-wider">Select Scheme:</span>
          </div>
          <select 
            value={selectedScheme}
            onChange={(e) => setSelectedScheme(e.target.value)}
            className="bg-slate-800 text-white font-bold py-2.5 px-4 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer transition-all hover:border-indigo-500/30"
          >
            {Object.keys(allSchemes).map(key => (
              <option key={key} value={key}>{allSchemes[key].name}</option>
            ))}
          </select>
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl transition-all font-bold shadow-lg shadow-indigo-500/20 active:scale-95">
            <Download size={18} />
            <span>Report</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Current CGPA', value: '8.65', icon: Trophy, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
          { label: 'Last SGPA', value: '8.50', icon: TrendingUp, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
          { label: 'Total Credits', value: '132', icon: BookOpen, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
          { label: 'Active Scheme', value: allSchemes[selectedScheme].name.split(' ')[0], icon: Settings2, color: 'text-rose-400', bg: 'bg-rose-400/10' },
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
                <button key={t} className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${t === 'SGPA' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockProgress}>
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
          <h2 className="text-xl font-bold text-white mb-8">Scheme Specific Analysis</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={currentSubjects} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="subject" type="category" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} width={100} />
                <Tooltip 
                  cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
                />
                <Bar dataKey="score" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={20}>
                  {currentSubjects.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Result Table */}
      <div className="glass-dark rounded-3xl border border-white/5 overflow-hidden">
        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-indigo-500/5">
          <div>
            <h2 className="text-xl font-bold text-white">Curriculum Details</h2>
            <p className="text-sm text-slate-400 mt-1">Showing subjects for {allSchemes[selectedScheme].name}</p>
          </div>
          <button className="text-indigo-400 hover:text-indigo-300 font-bold text-sm flex items-center gap-1 group transition-all underline underline-offset-4">
            View Syllabus
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#1e293b]/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-8 py-5 font-semibold">Subject Code</th>
                <th className="px-8 py-5 font-semibold">Subject Name</th>
                <th className="px-8 py-5 font-semibold">Credits</th>
                <th className="px-8 py-5 font-semibold">Score</th>
                <th className="px-8 py-5 font-semibold">Grade</th>
                <th className="px-8 py-5 font-semibold">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {currentSubjects.map((sub, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-all group animate-in fade-in slide-in-from-left duration-300">
                  <td className="px-8 py-6 font-mono text-indigo-400 font-bold">{sub.code}</td>
                  <td className="px-8 py-6 font-medium text-white">{sub.name}</td>
                  <td className="px-8 py-6 text-slate-400 font-bold">4.0</td>
                  <td className="px-8 py-6 font-bold text-white">{sub.score}</td>
                  <td className="px-8 py-6">
                    <span className="bg-indigo-500/10 text-indigo-400 px-4 py-1.5 rounded-lg text-xs font-black border border-indigo-500/20 shadow-sm">
                      {sub.score > 90 ? 'S' : sub.score > 80 ? 'A' : 'B'}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-emerald-400 font-bold flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
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
