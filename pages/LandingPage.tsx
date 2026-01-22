
import React from 'react';
import { motion as m } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Zap, Target, Cpu } from 'lucide-react';
import { useLanguage } from '../App';

// Fixed motion type errors by casting to any
const motion = m as any;

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => {
  const { lang } = useLanguage();
  return (
    <motion.div 
      whileHover={{ y: -10, scale: 1.02 }}
      className={`glass p-8 rounded-2xl border border-white/5 relative overflow-hidden group ${lang === 'ar' ? 'text-right' : 'text-left'}`}
    >
      <div className={`absolute top-0 ${lang === 'ar' ? 'left-0' : 'right-0'} p-4 opacity-10 group-hover:opacity-30 transition-opacity`}>
        {icon}
      </div>
      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 text-cyan-400 shadow-[0_0_15px_rgba(0,243,255,0.2)]">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
      <div className={`absolute bottom-0 ${lang === 'ar' ? 'right-0' : 'left-0'} w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
    </motion.div>
  );
};

const LandingPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="text-center max-w-4xl py-20 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-bold uppercase tracking-[0.3em] mb-8"
        >
          {t.landing.badge}
        </motion.div>
        
        <motion.h1 
          className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {t.landing.hero1} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-cyan-400 to-blue-500 animate-gradient-x">
            {t.landing.hero2}
          </span>
        </motion.h1>

        <motion.p 
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {t.landing.desc}
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link 
            to="/generate" 
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-xl font-bold text-white shadow-[0_0_30px_rgba(188,19,254,0.4)] hover:shadow-[0_0_50px_rgba(0,243,255,0.6)] transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 group"
          >
            <Zap size={20} className="group-hover:animate-pulse" />
            {t.landing.btn_forge}
          </Link>
          <Link 
            to="/members" 
            className="px-8 py-4 glass border border-white/10 rounded-xl font-bold text-gray-300 hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <Shield size={20} />
            {t.landing.btn_manage}
          </Link>
        </motion.div>
      </section>

      {/* Stats / Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mt-20">
        <FeatureCard 
          icon={<Cpu size={24} />} 
          title={t.landing.f1_title} 
          desc={t.landing.f1_desc} 
        />
        <FeatureCard 
          icon={<Target size={24} />} 
          title={t.landing.f2_title} 
          desc={t.landing.f2_desc} 
        />
        <FeatureCard 
          icon={<Zap size={24} />} 
          title={t.landing.f3_title} 
          desc={t.landing.f3_desc} 
        />
      </section>
    </div>
  );
};

export default LandingPage;
