
import React from 'react';
import { Shield, Sword, Heart, Crown, Zap, User } from 'lucide-react';

export const COLORS = {
  primary: '#bc13fe',
  secondary: '#00f3ff',
  accent: '#3b82f6',
  background: '#050507',
  cardBg: 'rgba(255, 255, 255, 0.03)',
};

export const ROLE_ICONS: Record<string, React.ReactNode> = {
  'Tank': <Shield size={18} className="text-cyan-400" />,
  'Damage': <Sword size={18} className="text-red-400" />,
  'Support': <Heart size={18} className="text-green-400" />,
  'Captain': <Crown size={18} className="text-yellow-400" />,
  'Specialist': <Zap size={18} className="text-purple-400" />,
  'Recruit': <User size={18} className="text-gray-400" />,
};

export const INITIAL_ROLES = ['Tank', 'Damage', 'Support', 'Captain', 'Specialist', 'Recruit'] as const;

export const TRANSLATIONS = {
  ar: {
    nav: { home: 'الرئيسية', members: 'الأعضاء', generate: 'توليد الفرق', oracle: 'العراف' },
    landing: {
      badge: 'الجيل القادم من إدارة الفرق',
      hero1: 'اصـنـع الـفريـق',
      hero2: 'الأساطير',
      desc: 'نظام متقدم لتوليد الفرق بتوازن دقيق، مؤثرات بصرية مستقبلية، وحركات أسطورية.',
      btn_forge: 'تـولـيد التشكيلة',
      btn_manage: 'إدارة النخبة',
      f1_title: 'توازن دقيق',
      f1_desc: 'خوارزميات برمجية توازن الفرق بناءً على مستوى المهارة والأدوار بشكل عادل.',
      f2_title: 'دقة متناهية',
      f2_desc: 'تحكم كامل في القوائم مع ميكانيكا قفل الأدوار وإدارة الاحتياط.',
      f3_title: 'توليد فوري',
      f3_desc: 'احصل على تشكيلاتك في أجزاء من الثانية مع مؤثرات سينمائية.'
    },
    members: {
      title: 'قـائـمـة الـنـخـبـة',
      total: 'إجمالي العناصر: ',
      search: 'ابحث عن اسم...',
      btn_enlist: 'تـجنـيد',
      form_name: 'اسم العضو',
      form_role: 'الدور القتالي',
      form_level: 'مستوى المهارة',
      form_confirm: 'تأكيد التجنيد',
      empty: 'القائمة فارغة تماماً',
      empty_desc: 'قم بتجنيد أعضاء جدد لبدء تشكيل الفرق الأسطورية.'
    },
    roles: {
      Tank: 'مدرع', Damage: 'مهاجم', Support: 'دعم', Captain: 'قائد', Specialist: 'متخصص', Recruit: 'مستجد'
    },
    generate: {
      config: 'إعدادات التوليد',
      team_count: 'عدد الفرق',
      strategy: 'نمط التوزيع',
      modes: { random: 'عشوائي', balanced: 'متوازن', leader: 'قادة' },
      addons: 'إضافات تكتيكية',
      timer: 'مؤقت المباراة', sounds: 'مؤثرات صوتية', scoring: 'تسجيل النقاط', stats: 'إحصائيات الفرق',
      btn_forge: 'تـولـيد الـفـرق',
      calculating: 'جـاري الـتحـليل...',
      optimizing: 'تـحسـين الـمعـاييـر',
      balancing: 'جاري موازنة مهارات العناصر...',
      avg_skill: 'متوسط القوة:',
      current_score: 'النقاط الحالية',
      ready: 'المحرك جاهز',
      ready_desc: 'اضبط المعايير وقم بتشغيل المصنع لتوليد فرقك الأسطورية.',
      need_more: 'تحتاج لمزيد من الأعضاء'
    },
    oracle: {
      badge: 'محرك الاحتمالات المتقدم',
      title: 'عـراف',
      subtitle: 'الـتـيم فورج',
      desc: 'أدخل المتغيرات ودع النواة تختار لك مصيرك.',
      add_var: 'أضف خياراً جديداً',
      placeholder: 'اكتب هنا...',
      active: 'الخيارات النشطة',
      clear: 'مسح الكل',
      btn_pick: 'بـدء الاخـتيار العشوائي',
      analyzing: 'جـاري الـتحـليل...',
      algorithm: 'تـشغيـل الـخوارزميـة',
      scanning: 'فحص مساحة الاحتمالات...',
      locked: 'تم حسم القرار',
      rerun: 'إعـادة الـتحـليل',
      awaiting: 'بانتظار الأوامر'
    }
  },
  en: {
    nav: { home: 'Forge', members: 'Members', generate: 'Generate', oracle: 'Oracle' },
    landing: {
      badge: 'Next Gen Team Management',
      hero1: 'FORGE THE',
      hero2: 'LEGENDARY',
      desc: 'Advanced team generation with precision balancing, futuristic visuals, and legendary animations.',
      btn_forge: 'INITIALIZE FORGE',
      btn_manage: 'MANAGE SQUAD',
      f1_title: 'SMART BALANCE',
      f1_desc: 'Robust algorithms that balance squads based on skill and roles.',
      f2_title: 'PRECISION',
      f2_desc: 'Fine-tune your rosters with role-lock mechanics and bench management.',
      f3_title: 'INSTANT',
      f3_desc: 'Get your rosters in milliseconds with cinematic visuals and feedback.'
    },
    members: {
      title: 'SQUAD ROSTER',
      total: 'Total Personnel: ',
      search: 'Search by name...',
      btn_enlist: 'ENLIST',
      form_name: 'Member Name',
      form_role: 'Primary Role',
      form_level: 'Skill Level',
      form_confirm: 'CONFIRM ENLISTMENT',
      empty: 'ROSTER IS EMPTY',
      empty_desc: 'Enlist new members to begin forging squads.'
    },
    roles: {
      Tank: 'Tank', Damage: 'Damage', Support: 'Support', Captain: 'Captain', Specialist: 'Specialist', Recruit: 'Recruit'
    },
    generate: {
      config: 'FORGE CONFIG',
      team_count: 'SQUAD COUNT',
      strategy: 'STRATEGY MODE',
      modes: { random: 'Random', balanced: 'Balanced', leader: 'Leaders' },
      addons: 'TACTICAL ADD-ONS',
      timer: 'Match Timer', sounds: 'Audio Feedback', scoring: 'Live Scoring', stats: 'Squad Analytics',
      btn_forge: 'FORGE SQUADS',
      calculating: 'CALCULATING...',
      optimizing: 'OPTIMIZING PARAMETERS',
      balancing: 'Balancing squad metrics...',
      avg_skill: 'Avg Skill:',
      current_score: 'Current Score',
      ready: 'GENERATOR READY',
      ready_desc: 'Adjust the parameters and initialize the forge to generate squads.',
      need_more: 'Need more members'
    },
    oracle: {
      badge: 'Probability Engine',
      title: 'ORACLE',
      subtitle: 'SELECTOR',
      desc: 'Input variables and let the core decide your destiny.',
      add_var: 'Add New Variable',
      placeholder: 'Enter choice...',
      active: 'Active Options',
      clear: 'Clear All',
      btn_pick: 'INITIATE SELECTION',
      analyzing: 'ANALYZING...',
      algorithm: 'RUNNING ALGORITHM',
      scanning: 'Scanning probability space...',
      locked: 'Decision Locked',
      rerun: 'RE-RUN CORE',
      awaiting: 'Awaiting Command'
    }
  }
};
