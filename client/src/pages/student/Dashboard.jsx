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
  },
  "2025_cse": {
    name: "2025 Scheme (CSE)",
    subjects: [
      { code: "BMAT101", name: "Applied Maths-1", score: 88 },
      { code: "BPHYS102", name: "Quantum Physics", score: 84 },
      { code: "BPLC105B", name: "Python Prog", score: 90 },
      { code: "BCS106", name: "Intro to AI", score: 95 }
    ]
  }
};

const Dashboard = () => {
  const [activeSem, setActiveSem] = useState(6);
  
  // Initialize based on user's registered scheme
  const getUserScheme = () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.scheme) {
        const key = `${user.scheme}_cse`;
        return allSchemes[key] ? key : "2022_cse";
      }
    } catch (e) {}
    return "2022_cse";
  };

  const [selectedScheme, setSelectedScheme] = useState(getUserScheme());
  const [currentSubjects, setCurrentSubjects] = useState(allSchemes[getUserScheme()].subjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.usn) {
          const response = await fetch(`http://localhost:5000/api/results/${user.usn}`);
          const data = await response.json();
          if (data && data.subjects) {
            const mapped = data.subjects.map(s => ({
              code: s.code,
              name: s.name,
              score: s.totalMarks
            }));
            setCurrentSubjects(mapped);
          }
        }
      } catch (err) {
        console.error("Dashboard fetch failed, using default data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  useEffect(() => {
    // Only update if not loading real data
    if (!loading) {
       // Allow user to switch schemes if they want to see "what iff" subjects,
       // but real data overrides initial state.
    }
  }, [selectedScheme, loading]);

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
          <h1 className="text-5xl font-black tracking-tight leading-tight">
            <span className="text-white">Academic</span> <span className="text-gradient">Analytics</span>
          </h1>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 bg-slate-900/40 p-2 rounded-2xl border border-white/5">
          <button className="flex items-center gap-2 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 px-6 py-2.5 rounded-xl transition-all font-black text-xs border border-indigo-500/20 active:scale-95">
            <Download size={16} />
            <span>GENERATE REPORT</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Current CGPA', value: '8.65', icon: Trophy, color: 'text-indigo-400', glow: 'shadow-indigo-500/20' },
          { label: 'Last SGPA', value: '8.50', icon: TrendingUp, color: 'text-violet-400', glow: 'shadow-violet-500/20' },
          { label: 'Total Credits', value: '132', icon: BookOpen, color: 'text-cyan-400', glow: 'shadow-cyan-500/20' },
          { label: 'Active Scheme', value: allSchemes[selectedScheme].name.split(' ')[0], icon: Settings2, color: 'text-rose-400', glow: 'shadow-rose-500/20' },
        ].map((stat, idx) => (
          <div key={idx} className={`glass-dark p-6 rounded-[2.5rem] border border-white/5 flex items-start justify-between group hover:border-white/20 transition-all duration-500 cursor-default card-glow shadow-xl ${stat.glow}`}>
            <div>
              <p className="text-slate-400 text-xs font-black uppercase tracking-widest">{stat.label}</p>
              <h3 className={`text-4xl font-black mt-2 tracking-tighter ${stat.color}`}>{stat.value}</h3>
            </div>
            <div className={`p-4 rounded-[1.5rem] bg-slate-900/50 ${stat.color} group-hover:scale-110 transition-transform duration-500 border border-white/5`}>
              <stat.icon size={28} />
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress Chart */}
        <div className="lg:col-span-2 glass-dark p-8 rounded-[2.5rem] border border-white/5 card-glow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] pointer-events-none group-hover:bg-indigo-500/10 transition-all duration-700" />
          <div className="flex items-center justify-between mb-8 relative z-10">
            <h2 className="text-2xl font-black text-white tracking-tight">Academic <span className="text-indigo-400">Journey</span></h2>
            <div className="flex gap-1 bg-slate-900/80 p-1.5 rounded-2xl border border-white/5">
              {['SGPA', 'CGPA'].map(t => (
                <button key={t} className={`px-6 py-2 text-xs font-black rounded-xl transition-all duration-300 ${t === 'SGPA' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/40 translate-y-[-1px]' : 'text-slate-500 hover:text-slate-300'}`}>
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
