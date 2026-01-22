
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion as m, AnimatePresence } from 'framer-motion';
import { Users, LayoutDashboard, Settings, Info, Menu, X, Github, Target, Languages } from 'lucide-react';
import LandingPage from './pages/LandingPage';
import MembersPage from './pages/MembersPage';
import GeneratePage from './pages/GeneratePage';
import PickPage from './pages/PickPage';
import { Member } from './types';
import { TRANSLATIONS } from './constants';

// Fixed motion type errors by casting to any
const motion = m as any;

type Language = 'ar' | 'en';
interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const navLinks = [
    { name: t.nav.home, path: '/', icon: <Info size={18} /> },
    { name: t.nav.members, path: '/members', icon: <Users size={18} /> },
    { name: t.nav.generate, path: '/generate', icon: <LayoutDashboard size={18} /> },
    { name: t.nav.oracle, path: '/pick', icon: <Target size={18} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-cyan-400 rounded-lg flex items-center justify-center rotate-45 group-hover:rotate-90 transition-transform duration-500 shadow-[0_0_20px_rgba(188,19,254,0.5)]">
            <span className="text-white font-black -rotate-45 group-hover:-rotate-90 transition-transform duration-500">TF</span>
          </div>
          <span className="font-orbitron font-black text-2xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            TEAM 
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors hover:text-cyan-400 ${
                location.pathname === link.path ? 'text-cyan-400' : 'text-gray-400'
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
          
          <button 
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/50 text-xs font-bold transition-all text-cyan-400"
          >
            <Languages size={14} />
            {lang === 'ar' ? 'EN' : 'عربي'}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-cyan-400"
          >
            <Languages size={18} />
          </button>
          <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: lang === 'ar' ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: lang === 'ar' ? 100 : -100 }}
            className="fixed inset-0 top-[73px] bg-black/95 backdrop-blur-xl z-40 md:hidden flex flex-col p-8 gap-8"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-4 text-2xl font-bold transition-colors ${
                  location.pathname === link.path ? 'text-cyan-400' : 'text-gray-400'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="pt-24 min-h-screen container mx-auto px-6 pb-20"
  >
    {children}
  </motion.div>
);

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem('tf_lang') as Language) || 'ar';
  });
  const [members, setMembers] = useState<Member[]>(() => {
    const saved = localStorage.getItem('tf_members');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('tf_lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('tf_members', JSON.stringify(members));
  }, [members]);

  const addMember = (member: Member) => setMembers([...members, member]);
  const deleteMember = (id: string) => setMembers(members.filter(m => m.id !== id));
  const updateMember = (updated: Member) => setMembers(members.map(m => m.id === updated.id ? updated : m));

  const t = (TRANSLATIONS as any)[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <HashRouter>
        <div className="relative">
          <Navbar />
          
          <div className="fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute top-0 -left-20 w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-0 -right-20 w-96 h-96 bg-cyan-600/20 blur-[120px] rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>
          </div>

          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<PageWrapper><LandingPage /></PageWrapper>} />
              <Route 
                path="/members" 
                element={
                  <PageWrapper>
                    <MembersPage 
                      members={members} 
                      onAdd={addMember} 
                      onDelete={deleteMember} 
                      onUpdate={updateMember}
                    />
                  </PageWrapper>
                } 
              />
              <Route 
                path="/generate" 
                element={
                  <PageWrapper>
                    <GeneratePage members={members} />
                  </PageWrapper>
                } 
              />
              <Route 
                path="/pick" 
                element={
                  <PageWrapper>
                    <PickPage />
                  </PageWrapper>
                } 
              />
            </Routes>
          </AnimatePresence>
        </div>
      </HashRouter>
    </LanguageContext.Provider>
  );
};

export default App;
