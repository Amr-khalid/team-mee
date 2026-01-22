
import React, { useState } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { RefreshCcw, LayoutGrid, Timer, Trophy, BarChart2, Volume2, Users } from 'lucide-react';
import { Member, Team, GenerationMode, Addons } from '../types';
import { ROLE_ICONS } from '../constants';
import { useLanguage } from '../App';
import toast from 'react-hot-toast';

// Fixed motion type errors by casting to any
const motion = m as any;

const GeneratePage: React.FC<{ members: Member[] }> = ({ members }) => {
  const { t, lang } = useLanguage();
  const [numTeams, setNumTeams] = useState(2);
  const [mode, setMode] = useState<GenerationMode>(GenerationMode.RANDOM);
  const [addons, setAddons] = useState<Addons>({
    timer: false,
    sounds: true,
    scoring: false,
    highlightWinner: false,
    statistics: true
  });
  const [teams, setTeams] = useState<Team[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (members.length < numTeams) return;
    setIsGenerating(true);
    setTeams([]);
    await new Promise(r => setTimeout(r, 1200));
    
    let generatedTeams: Team[] = [];
    const shuffled = [...members].sort(() => 0.5 - Math.random());
    
    generatedTeams = Array.from({ length: numTeams }, (_, i) => ({
      id: crypto.randomUUID(),
      name: lang === 'ar' ? `الفرقة ${String.fromCharCode(65 + i)}` : `SQUAD ${String.fromCharCode(65 + i)}`,
      members: [],
      score: 0
    }));

    if (mode === GenerationMode.BALANCED) {
      const sorted = [...members].sort((a, b) => b.level - a.level);
      sorted.forEach((member, index) => {
        const teamIdx = index % numTeams;
        generatedTeams[teamIdx].members.push(member);
      });
    } else if (mode === GenerationMode.LEADER) {
      const captains = shuffled.filter(m => m.role === 'Captain' || m.role === 'قائد');
      const others = shuffled.filter(m => !(m.role === 'Captain' || m.role === 'قائد'));
      
      // Assign captains first
      generatedTeams.forEach((team, i) => { 
        if (captains[i]) team.members.push(captains[i]); 
      });
      
      // Assign others
      others.forEach((member, index) => {
        const teamIdx = (index + (captains.length > 0 ? 0 : 0)) % numTeams;
        generatedTeams[teamIdx].members.push(member);
      });
    } else {
      shuffled.forEach((member, index) => {
        const teamIdx = index % numTeams;
        generatedTeams[teamIdx].members.push(member);
      });
    }

    setTeams(generatedTeams);
    setIsGenerating(false);
  };

  const toggleAddon = (key: keyof Addons) => {
    setAddons(prev => ({ ...prev, [key]: !prev[key] }));
  };
se
  if (members.length === 0) { 
    window.location.href = '#/members';
    toast.error("You need to add members before generating teams.");
  }
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 h-full ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
      <div className="lg:col-span-4 space-y-6">
        <div className="glass p-6 rounded-3xl border border-white/5 sticky top-24">
          <div className={`flex items-center gap-3 mb-8 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse justify-end'}`}>
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
              <LayoutGrid size={20} />
            </div>
            <h2 className="font-bold text-xl tracking-tight">{t.generate.config}</h2>
          </div>

          <div className="space-y-8">
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t.generate.team_count}</label>
                <span className="text-cyan-400 font-bold">{numTeams}</span>
              </div>
              <input type="range" min="2" max="8" value={numTeams} onChange={(e) => setNumTeams(parseInt(e.target.value))} className="w-full accent-cyan-500 h-1 bg-white/10 rounded-full appearance-none cursor-pointer" />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t.generate.strategy}</label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { id: GenerationMode.RANDOM, label: t.generate.modes.random, icon: <Users size={14} />, emoji: '🎲' },
                  { id: GenerationMode.BALANCED, label: t.generate.modes.balanced, icon: <BarChart2 size={14} />, emoji: '⚖️' },
                  { id: GenerationMode.LEADER, label: t.generate.modes.leader, icon: <Trophy size={14} />, emoji: '👑' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setMode(item.id)}
                    className={`p-4 rounded-xl border transition-all flex flex-row items-center gap-4 group relative overflow-hidden ${lang === 'ar' ? 'text-right' : 'text-left'} ${
                      mode === item.id ? 'border-cyan-500 bg-cyan-500/10 shadow-[0_0_15px_rgba(0,243,255,0.1)]' : 'border-white/5 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className={`transition-colors ${mode === item.id ? 'text-cyan-400' : 'text-gray-500'}`}>{item.icon}</div>
                    <span className={`text-sm font-bold transition-colors ${mode === item.id ? 'text-white' : 'text-gray-400'}`}>{item.emoji} {item.label}</span>
                    {mode === item.id && <motion.div layoutId="mode-pulse" className="absolute inset-0 bg-cyan-400/5 animate-pulse" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-4">{t.generate.addons}</label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { key: 'timer', label: t.generate.timer, icon: <Timer size={16} /> },
                  { key: 'sounds', label: t.generate.sounds, icon: <Volume2 size={16} /> },
                  { key: 'scoring', label: t.generate.scoring, icon: <Trophy size={16} /> },
                  { key: 'statistics', label: t.generate.stats, icon: <BarChart2 size={16} /> },
                ].map((addon) => (
                  <button
                    key={addon.key}
                    onClick={() => toggleAddon(addon.key as keyof Addons)}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-all ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'} ${
                      addons[addon.key as keyof Addons] ? 'border-purple-500 bg-purple-500/5 text-purple-400' : 'border-white/5 text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    <div className={`flex items-center gap-3 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                      {addon.icon}
                      <span className="text-xs font-bold">{addon.label}</span>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${addons[addon.key as keyof Addons] ? 'bg-purple-400 shadow-[0_0_10px_rgba(188,19,254,0.5)]' : 'bg-white/10'}`} />
                  </button>
                ))}
              </div>
            </div>

            <button
              disabled={isGenerating || members.length < numTeams}
              onClick={handleGenerate}
              className={`w-full py-5 rounded-2xl font-bold text-lg tracking-widest transition-all relative overflow-hidden flex items-center justify-center gap-3 ${
                isGenerating ? 'bg-white/5 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-[0_0_30px_rgba(188,19,254,0.3)] hover:shadow-[0_0_50px_rgba(0,243,255,0.4)] active:scale-95'
              }`}
            >
              {isGenerating ? <><RefreshCcw className="animate-spin" /> {t.generate.calculating}</> : <><RefreshCcw /> {t.generate.btn_forge}</>}
            </button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-8">
        <AnimatePresence mode="wait">
          {isGenerating ? (
            <motion.div key="generating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full min-h-[500px] flex flex-col items-center justify-center glass rounded-3xl border border-white/5 relative overflow-hidden">
              <div className="scanner-effect h-full w-full absolute top-0 left-0 pointer-events-none opacity-20"></div>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="w-32 h-32 border-4 border-t-cyan-400 border-r-purple-500 border-b-blue-600 border-l-transparent rounded-full mb-8" />
              <h3 className="text-2xl font-black text-white mb-2 animate-pulse">{t.generate.optimizing}</h3>
              <p className="text-gray-500 font-mono text-sm uppercase">{t.generate.balancing}</p>
            </motion.div>
          ) : teams.length > 0 ? (
            <motion.div key="teams" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teams.map((team, idx) => (
                <motion.div key={team.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="glass rounded-3xl border border-white/5 overflow-hidden flex flex-col group hover:border-cyan-500/30 transition-all">
                  <div className={`p-6 bg-gradient-to-r from-white/5 to-transparent border-b border-white/5 flex items-center justify-between ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                      <h4 className="font-bold text-white tracking-widest">{team.name}</h4>
                      {addons.statistics && (
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] text-cyan-400 font-bold">{t.generate.avg_skill}</span>
                          <span className="text-[10px] text-gray-400 font-bold">{(team.members.reduce((acc, m) => acc + m.level, 0) / team.members.length || 0).toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 font-bold">{team.members.length}</div>
                  </div>
                  <div className="p-4 space-y-2 flex-1">
                    {team.members.map((member) => (
                      <div key={member.id} className={`flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group/item ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                        <div className={`flex items-center gap-3 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                          <div className="w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center">{ROLE_ICONS[member.role] || ROLE_ICONS['Recruit']}</div>
                          <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                            <p className="text-sm font-bold text-white group-hover/item:text-cyan-400 transition-colors">{member.name}</p>
                            <p className="text-[9px] text-gray-500 uppercase">{t.roles[member.role] || member.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">{[...Array(member.level)].map((_, i) => (<div key={i} className="w-1 h-3 rounded-full bg-cyan-400/50" />))}</div>
                      </div>
                    ))}
                  </div>
                  {addons.scoring && (
                    <div className={`p-4 bg-black/40 flex items-center justify-between border-t border-white/5 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                      <span className="text-xs font-bold text-gray-400 uppercase">{t.generate.current_score}</span>
                      <div className="flex items-center gap-4" dir="ltr">
                        <button className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 text-gray-400">-</button>
                        <span className="font-bold text-xl text-white">0</span>
                        <button className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 text-gray-400">+</button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full min-h-[500px] flex flex-col items-center justify-center glass rounded-3xl border border-dashed border-white/10 text-center px-6">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 text-gray-700"><Users size={40} /></div>
              <h3 className="text-xl text-gray-500 mb-2 font-bold">{t.generate.ready}</h3>
              <p className="text-gray-600 max-w-xs text-sm">{t.generate.ready_desc}</p>
              {members.length < numTeams && <p className="text-red-500/50 mt-6 text-xs font-bold uppercase tracking-widest">⚠️ {t.generate.need_more} ({lang === 'ar' ? 'الحالي' : 'Current'}: {members.length})</p>}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GeneratePage;
