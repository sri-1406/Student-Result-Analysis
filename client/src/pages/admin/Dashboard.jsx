import { useState, useEffect } from 'react';
import { 
  Users, ShieldCheck, UserCog, Search, Filter, 
  Trash2, Edit, CheckCircle, XCircle 
} from 'lucide-react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@vtu.com', role: 'student', usn: '1MS21CS001', status: 'Active' },
    { id: 2, name: 'Dr. Smith', email: 'smith@vtu.com', role: 'faculty', branch: 'CSE', status: 'Active' },
    { id: 3, name: 'Admin One', email: 'admin@vtu.com', role: 'admin', status: 'Active' },
  ]);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black tracking-tight leading-tight">
            <span className="text-white">Admin</span> <span className="text-gradient">Control Panel</span>
          </h1>
          <p className="text-slate-400 mt-2 font-medium">System Configuration & User Management</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Users', value: '1,284', icon: Users, color: 'text-indigo-400' },
          { label: 'Verified USNs', value: '1,120', icon: ShieldCheck, color: 'text-emerald-400' },
          { label: 'System Health', value: 'Optimal', icon: CheckCircle, color: 'text-cyan-400' },
        ].map((stat, idx) => (
          <div key={idx} className="glass-dark p-8 rounded-[2.5rem] border border-white/5 card-glow shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest">{stat.label}</p>
                <h3 className={`text-3xl font-black mt-2 ${stat.color}`}>{stat.value}</h3>
              </div>
              <div className={`p-4 rounded-2xl bg-slate-900/50 ${stat.color} border border-white/5`}>
                <stat.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-dark rounded-[2.5rem] border border-white/5 overflow-hidden">
        <div className="p-8 border-b border-white/5 flex flex-col md:flex-row gap-4 items-center justify-between">
          <h2 className="text-2xl font-black text-white">User Management</h2>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, email or USN..."
              className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#1e293b]/50 text-slate-400 text-xs uppercase tracking-widest font-black">
              <tr>
                <th className="px-8 py-6">Name & Email</th>
                <th className="px-8 py-6">Role</th>
                <th className="px-8 py-6">Identifier</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-white/5 transition-all group duration-300">
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-white font-bold">{user.name}</span>
                      <span className="text-slate-500 text-xs">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm">
                    <span className={`px-3 py-1 rounded-full font-black text-[10px] border tracking-wider uppercase ${
                      user.role === 'admin' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 
                      user.role === 'faculty' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 
                      'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-6 font-mono text-xs text-slate-400">{user.usn || user.branch || 'N/A'}</td>
                  <td className="px-8 py-6">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs capitalize">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                      {user.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <button className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-all">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all">
                        <Trash2 size={16} />
                      </button>
                    </div>
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

export default AdminDashboard;
