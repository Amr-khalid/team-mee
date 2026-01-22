
import React, { useState } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Search, UserPlus, Star, X, Users } from 'lucide-react';
import { Member, Role } from '../types';
import { ROLE_ICONS, INITIAL_ROLES } from '../constants';
import { useLanguage } from '../App';

// Fixed motion type errors by casting to any
const motion = m as any;

interface MembersPageProps {
  members: Member[];
  onAdd: (member: Member) => void;
  onDelete: (id: string) => void;
  onUpdate: (member: Member) => void;
}

const MembersPage: React.FC<MembersPageProps> = ({ members, onAdd, onDelete, onUpdate }) => {
  const { t, lang } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newMember, setNewMember] = useState<Partial<Member>>({ 
    name: '', 
    role: 'Recruit', 
    level: 5 
  });

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMember.name) return;
    
    onAdd({
      id: crypto.randomUUID(),
      name: newMember.name!,
      role: newMember.role as Role || 'Recruit',
      level: newMember.level || 5
    });
    setNewMember({ name: '', role: 'Recruit', level: 5 });
    setIsAdding(false);
  };

  return (
    <div className={`max-w-6xl mx-auto ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h2 className="text-4xl font-black text-white">{t.members.title}</h2>
          <p className="text-gray-400 mt-1 uppercase tracking-widest text-xs font-bold">{t.members.total} {members.length}</p>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className={`absolute ${lang === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-gray-500`} size={18} />
            <input 
              type="text" 
              placeholder={t.members.search} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full bg-white/5 border border-white/10 rounded-xl py-3 ${lang === 'ar' ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'} text-white focus:border-cyan-500 outline-none transition-all`}
            />
          </div>
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(0,243,255,0.3)] active:scale-95 whitespace-nowrap"
          >
            <UserPlus size={20} />
            {t.members.btn_enlist}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass p-6 rounded-2xl border border-cyan-500/30 mb-8 overflow-hidden relative"
          >
            <div className="scanner-effect"></div>
            <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{t.members.form_name}</label>
                <input 
                  autoFocus
                  required
                  type="text" 
                  value={newMember.name}
                  onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                  className={`w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 outline-none ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{t.members.form_role}</label>
                <select 
                  value={newMember.role}
                  onChange={(e) => setNewMember({...newMember, role: e.target.value as Role})}
                  className={`w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 outline-none ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                >
                  {INITIAL_ROLES.map(role => (
                    <option key={role} value={role} className="bg-gray-900">{t.roles[role]}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{t.members.form_level} ({newMember.level})</label>
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  step="1"
                  value={newMember.level}
                  onChange={(e) => setNewMember({...newMember, level: parseInt(e.target.value)})}
                  className="w-full accent-cyan-500"
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="flex-1 bg-cyan-500 text-black font-black py-3 rounded-lg hover:bg-cyan-400 transition-colors whitespace-nowrap text-sm">{t.members.form_confirm}</button>
                <button 
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="p-3 bg-white/5 text-gray-400 rounded-lg hover:bg-white/10"
                >
                  <X size={20} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {filteredMembers.length === 0 ? (
        <div className="text-center py-40 glass rounded-3xl border border-dashed border-white/10">
          <Users size={60} className="mx-auto text-gray-700 mb-6" />
          <h3 className="text-xl text-gray-500 font-bold">{t.members.empty}</h3>
          <p className="text-gray-600 mt-2">{t.members.empty_desc}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredMembers.map((member, index) => (
              <motion.div
                key={member.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                className={`glass p-5 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(0,243,255,0.1)] transition-all ${lang === 'ar' ? 'text-right' : 'text-left'}`}
              >
                <div className={`flex items-center gap-4 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="flex-1">
                    <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors">{member.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-gray-400 uppercase tracking-widest">{t.roles[member.role] || member.role}</span>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={8} 
                            className={i < Math.ceil(member.level / 2) ? "text-yellow-500 fill-yellow-500" : "text-gray-700"} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    {ROLE_ICONS[member.role] || ROLE_ICONS['Recruit']}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => onDelete(member.id)}
                    className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default MembersPage;
