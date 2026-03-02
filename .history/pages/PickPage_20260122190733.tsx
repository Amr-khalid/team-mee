
import React, { useState } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Zap, Sparkles, RefreshCw, X, Dice5 } from 'lucide-react';
import { useLanguage } from '../App';

// Fixed motion type errors by casting to any
const motion = m as any;

const PickPage: React.FC = () => {
  const { t, lang } = useLanguage();
  const [options, setOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isPicking, setIsPicking] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const addOption = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (inputValue.trim() && !options.includes(inputValue.trim())) {
      setOptions([...options, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const pickRandom = async () => {
    if (options.length < 2) return;
    setIsPicking(true);
    setResult(null);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const randomIndex = Math.floor(Math.random() * options.length);
    setResult(options[randomIndex]);
    setIsPicking(false);
  };

  const reset = () => {
    setOptions([]);
    setResult(null);
  };

  return (
    <div className={`max-w-4xl mx-auto flex flex-col gap-8 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
      <div className="text-center mb-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-block px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-[0.3em] mb-4">
          {t.oracle.badge}
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
          {t.oracle.title} <span className="text-cyan-400">{t.oracle.subtitle}</span>
        </h2>
        <p className="text-gray-400 mt-2 font-light">{t.oracle.desc}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="glass p-8 rounded-3xl border border-white/5 space-y-6">
          <form onSubmit={addOption} className="space-y-4">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">{t.oracle.add_var}</label>
            <div className="relative">
              <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder={t.oracle.placeholder} className={`w-full bg-black/40 border border-white/10 rounded-xl py-4 ${lang === 'ar' ? 'pr-4 pl-12 text-right' : 'pl-4 pr-12 text-left'} text-white focus:border-cyan-500 outline-none transition-all placeholder:text-gray-600`} />
              <button type="submit" className={`absolute ${lang === 'ar' ? 'left-2' : 'right-2'} top-1/2 -translate-y-1/2 w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center text-black hover:bg-cyan-400 transition-colors`}>
                <Plus size={20} />
              </button>
            </div>
          </form>

          <div className="space-y-3">
            <div className={`flex items-center justify-between ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t.oracle.active} ({options.length})</label>
              {options.length > 0 && <button onClick={reset} className="text-[10px] text-red-400 hover:underline uppercase font-bold tracking-tighter">{t.oracle.clear}</button>}
            </div>
            
            <div className="flex flex-wrap gap-2 min-h-[100px] p-4 bg-white/5 rounded-2xl border border-white/5">
              <AnimatePresence>
                {options.length === 0 ? <p className="text-gray-600 text-sm italic m-auto">{lang === 'ar' ? 'لا توجد خيارات...' : 'No options...'}</p> : 
                  options.map((option, index) => (
                    <motion.div key={option} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className={`flex items-center gap-2 bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg text-sm text-gray-200 group hover:border-cyan-500/50 transition-colors ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                      {option}
                      <button onClick={() => removeOption(index)} className="text-gray-500 hover:text-red-400">
                        <X size={14} />
                      </button>
                    </motion.div>
                  ))
                }
              </AnimatePresence>
            </div>
          </div>

          <button disabled={options.length < 2 || isPicking} onClick={pickRandom} className={`w-full py-5 rounded-2xl font-bold text-lg tracking-widest transition-all relative overflow-hidden flex items-center justify-center gap-3 ${options.length < 2 || isPicking ? 'bg-white/5 text-gray-500 cursor-not-allowed opacity-50' : 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-[0_0_30px_rgba(188,19,254,0.3)] hover:shadow-[0_0_50px_rgba(0,243,255,0.4)]'}`}>
            {isPicking ? <><RefreshCw className="animate-spin" /> {t.oracle.analyzing}</> : <><Dice5 /> {t.oracle.btn_pick}</>}
          </button>
        </div>

        <div className="h-full">
          <div className="glass h-full min-h-[400px] rounded-3xl border border-white/5 flex flex-col items-center justify-center relative overflow-hidden p-8">
            <div className="scanner-effect h-full w-full absolute top-0 left-0 pointer-events-none opacity-10"></div>
            <AnimatePresence mode="wait">
              {isPicking ? (
                <motion.div key="picking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center text-center">
                  <div className="relative mb-8">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="w-32 h-32 border-2 border-dashed border-cyan-500 rounded-full" />
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }} className="absolute inset-0 flex items-center justify-center text-cyan-500"><Sparkles size={40} /></motion.div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{t.oracle.algorithm}</h3>
                  <p className="text-gray-500 text-sm font-mono animate-pulse">{t.oracle.scanning}</p>
                </motion.div>
              ) : result ? (
                <motion.div key="result" initial={{ opacity: 0, scale: 0.5, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="text-center">
                  <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="w-24 h-24 bg-gradient-to-br from-purple-500 to-cyan-400 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(0,243,255,0.4)] rotate-12">
                    <Dice5 size={48} className="text-white -rotate-12" />
                  </motion.div>
                  <p className="text-xs font-bold text-cyan-400 uppercase tracking-[0.4em] mb-2">{t.oracle.locked}</p>
                  <h2 className="text-5xl md:text-6xl font-black text-white break-words drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">{result}</h2>
                  <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} onClick={() => setResult(null)} className="mt-10 px-6 py-2 border border-white/10 rounded-full text-xs font-bold text-gray-500 hover:text-white hover:border-white/20 transition-all flex items-center gap-2 mx-auto">
                    <RefreshCw size={14} /> {t.oracle.rerun}
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div key="idle" className="text-center text-gray-600">
                  <Dice5 size={64} className="mx-auto mb-4 opacity-20" />
                  <p className="text-sm uppercase tracking-widest font-bold">{t.oracle.awaiting}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickPage;
