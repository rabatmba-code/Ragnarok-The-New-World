import React, { useState } from 'react';
import { Swords, Shield, Zap, Sparkles, ChevronRight, BarChart3, HelpCircle, Check, Award } from 'lucide-react';
import { GAME_CLASSES, GameClass, calculateClassMatch } from '../utils/gameData';

interface ClassSelectorProps {
  activeLanguage: 'en' | 'fil' | 'fr' | 'ar';
}

export const ClassSelector: React.FC<ClassSelectorProps> = ({ activeLanguage }) => {
  const [selectedClassId, setSelectedClassId] = useState<string>('knight');
  const [quizMode, setQuizMode] = useState(false);

  // Quiz state
  const [combatChoice, setCombatChoice] = useState<'frontline' | 'magic' | 'ranged' | 'stealth' | 'healing' | 'wealth'>('frontline');
  const [roleChoice, setRoleChoice] = useState<'lead' | 'support' | 'solo'>('lead');
  const [goalChoice, setGoalChoice] = useState<'dungeon' | 'pvp' | 'trading' | 'social'>('dungeon');
  const [quizResult, setQuizResult] = useState<GameClass | null>(null);

  const currentClass = GAME_CLASSES.find((c) => c.id === selectedClassId) || GAME_CLASSES[0];

  const handleRunQuiz = () => {
    const matched = calculateClassMatch({
      preferredCombat: combatChoice,
      teamRole: roleChoice,
      dailyGoal: goalChoice,
    });
    setQuizResult(matched);
    setSelectedClassId(matched.id);
  };

  const titles = {
    en: {
      tag: 'CHOOSE YOUR DESTINY',
      heading: 'Master Six Legendary Job Evolutions',
      subheading:
        'Every class offers branching skill trees, unique party synergies, and distinct playstyles across PvE dungeons, War of Emperium (WoE), and open-world survival.',
      quizBtn: 'Take Destiny Quiz',
      overviewTab: 'Class Roster',
      statsHeading: 'Attribute Synergy',
      skillsHeading: 'Core Signature Abilities',
      quizHeading: 'Which Class Fits Your Gaming Soul?',
      quizSub: 'Answer 3 quick combat questions to unveil your destined Midgard class.',
    },
    fil: {
      tag: 'PUMILI NG IYONG DESTINASYON',
      heading: 'Kabisaduhin ang Anim na Maalamat na Klase',
      subheading:
        'Bawat klase ay may malalalim na skill trees, kakaibang party synergy, at playstyle na angkop para sa PvE dungeons, War of Emperium (WoE), at open-world survival.',
      quizBtn: 'Kumuha ng Destiny Quiz',
      overviewTab: 'Lahat ng Klase',
      statsHeading: 'Inirerekomendang Stats',
      skillsHeading: 'Mga Pangunahing Kakayahan',
      quizHeading: 'Aling Klase ang Angkop sa Iyong Istilo?',
      quizSub: 'Sagutin ang 3 mabilis na tanong sa labanan para malaman ang iyong nakatakdang klase.',
    },
    fr: {
      tag: 'CHOISISSEZ VOTRE DESTIN',
      heading: 'Maîtrisez Six Classes Légendaires',
      subheading:
        'Chaque classe propose des arbres de compétences profonds, des synergies d’équipe uniques et un style de jeu taillé pour le PvE, le PvP et le WoE.',
      quizBtn: 'Faire le Quiz de Destinée',
      overviewTab: 'Toutes les Classes',
      statsHeading: 'Attributs Recommandés',
      skillsHeading: 'Compétences Majeures',
      quizHeading: 'Quelle classe correspond à votre style ?',
      quizSub: 'Répondez à 3 questions rapides pour découvrir votre vocation.',
    },
    ar: {
      tag: 'اختار طريقك فـ عالم راغناروك',
      heading: '6 مهن أسطورية بمهارات حربية جبارة',
      subheading:
        'كل شخصية عندها ستايل خاص: تانك، سحر، قنص، اغتيال، هيلينغ، ولا تجارة وفلوس!',
      quizBtn: 'كويز: شكون الشخصية لي كتناسبك؟',
      overviewTab: 'جميع الشخصيات',
      statsHeading: 'توزيع النقاط (Stats)',
      skillsHeading: 'أقوى المهارات (Skills)',
      quizHeading: 'شنو هي الشخصية لي كتناسب الستايل ديالك؟',
      quizSub: 'جاوب على 3 أسئلة سريعة وغادي نحددو ليك مهنتك الأسطورية.',
    },
  };

  const t = titles[activeLanguage as keyof typeof titles] || titles.en;

  return (
    <section id="classes" className="py-20 lg:py-28 bg-[#090e18] relative overflow-hidden border-b border-slate-800">
      
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Swords className="w-3.5 h-3.5" />
            <span>{t.tag}</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            {t.heading}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            {t.subheading}
          </p>

          <div className="mt-6 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => setQuizMode(false)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                !quizMode
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {t.overviewTab}
            </button>
            <button
              type="button"
              onClick={() => setQuizMode(true)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                quizMode
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-300" />
              <span>{t.quizBtn}</span>
            </button>
          </div>
        </div>

        {/* QUIZ VIEW */}
        {quizMode ? (
          <div className="max-w-3xl mx-auto bg-slate-900/90 border border-purple-500/40 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl animate-in fade-in">
            <div className="text-center mb-8">
              <h3 className="font-cinzel text-2xl font-bold text-white mb-2">
                {t.quizHeading}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                {t.quizSub}
              </p>
            </div>

            <div className="space-y-6">
              {/* Question 1: Combat Style */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                  1. When facing a powerful MVP boss, what is your instinct?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'frontline', label: '🛡️ Charge with heavy shield' },
                    { id: 'magic', label: '🔮 Cast huge AOE meteor storms' },
                    { id: 'ranged', label: '🏹 Snipe from max range' },
                    { id: 'stealth', label: '🗡️ Vanish into shadows & backstab' },
                    { id: 'healing', label: '✨ Keep party alive with heals' },
                    { id: 'wealth', label: '🔨 Bash with merchant cart & loot' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setCombatChoice(opt.id as any)}
                      className={`p-3 rounded-xl text-xs text-left font-medium border transition-all cursor-pointer ${
                        combatChoice === opt.id
                          ? 'bg-purple-600/20 border-purple-400 text-white font-bold'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2: Team Role */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-sky-400 mb-2">
                  2. What role do you play in a gaming squad?
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'lead', label: '👑 Frontline Commander' },
                    { id: 'support', label: '🤝 Dedicated Guardian & Healer' },
                    { id: 'solo', label: '🎯 Lone Wolf Damage Dealer' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setRoleChoice(opt.id as any)}
                      className={`p-3 rounded-xl text-xs text-left font-medium border transition-all cursor-pointer ${
                        roleChoice === opt.id
                          ? 'bg-sky-600/20 border-sky-400 text-white font-bold'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3: Daily Goal */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
                  3. What gives you the biggest adrenaline rush in games?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'dungeon', label: '🏰 Clearing 100-floor tower' },
                    { id: 'pvp', label: '⚔️ Winning Guild vs Guild WoE' },
                    { id: 'trading', label: '💰 Making 100M Zeny in market' },
                    { id: 'social', label: '🎉 Social events & wedding party' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setGoalChoice(opt.id as any)}
                      className={`p-3 rounded-xl text-xs text-left font-medium border transition-all cursor-pointer ${
                        goalChoice === opt.id
                          ? 'bg-emerald-600/20 border-emerald-400 text-white font-bold'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-center">
                <button
                  type="button"
                  onClick={handleRunQuiz}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-purple-600/30 transition-all cursor-pointer transform hover:-translate-y-0.5"
                >
                  Reveal My Class Match
                </button>
              </div>

              {quizResult && (
                <div className="mt-6 p-5 rounded-2xl bg-slate-950 border border-amber-400/80 animate-in zoom-in-95 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-2xl font-bold text-amber-400">
                      <Award className="w-7 h-7 text-amber-400" />
                    </div>
                    <div>
                      <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                        Your Destined Calling:
                      </div>
                      <div className="text-xl font-cinzel font-black text-white">
                        {quizResult.name} ({quizResult.title})
                      </div>
                      <div className="text-xs text-slate-300 mt-0.5">
                        {quizResult.playstyle}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setQuizMode(false);
                      setSelectedClassId(quizResult.id);
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold hover:bg-amber-300 shrink-0"
                  >
                    View Class In-Depth &rarr;
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* STANDARD CLASS ROSTER VIEW */
          <div className="space-y-8">
            
            {/* Class Nav Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto">
              {GAME_CLASSES.map((cls) => {
                const isSelected = selectedClassId === cls.id;
                return (
                  <button
                    key={cls.id}
                    type="button"
                    onClick={() => setSelectedClassId(cls.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                      isSelected
                        ? 'bg-slate-900 border-amber-400 text-white shadow-lg shadow-amber-500/10 transform -translate-y-0.5'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: cls.accentColor }}
                    />
                    <span>{cls.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950 text-slate-400">
                      {cls.role}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Class Showcase Card */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-xl shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Overview & Lore */}
              <div className="lg:col-span-6 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-md"
                      style={{ backgroundColor: currentClass.accentColor }}
                    >
                      {currentClass.role}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Master Job Evolution
                    </span>
                  </div>

                  <h3 className="font-cinzel text-3xl sm:text-4xl font-black text-white mb-2">
                    {currentClass.name}
                  </h3>
                  <div className="text-sm font-semibold text-amber-400 mb-4">
                    {currentClass.title}
                  </div>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                    {currentClass.playstyle}
                  </p>

                  <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs italic text-slate-300 font-mono mb-6">
                    "{currentClass.quote}"
                  </div>
                </div>

                {/* Skills Showcase */}
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>{t.skillsHeading}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {currentClass.keySkills.map((skill, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                        <span className="truncate">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Attribute Synergy (Stats Bar Chart) */}
              <div className="lg:col-span-6 bg-slate-950/80 border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-amber-400" />
                    <span className="font-cinzel text-sm font-bold text-white">
                      {t.statsHeading}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Max Base Cap: 99
                  </span>
                </div>

                <div className="space-y-4">
                  {[
                    { key: 'STR', label: 'Strength (Physical Power)', val: currentClass.recommendedStats.str, color: 'bg-red-500' },
                    { key: 'AGI', label: 'Agility (ASPD & Flee)', val: currentClass.recommendedStats.agi, color: 'bg-emerald-500' },
                    { key: 'VIT', label: 'Vitality (Max HP & Defense)', val: currentClass.recommendedStats.vit, color: 'bg-blue-500' },
                    { key: 'INT', label: 'Intelligence (Magic Attack & SP)', val: currentClass.recommendedStats.int, color: 'bg-purple-500' },
                    { key: 'DEX', label: 'Dexterity (Accuracy & Cast Speed)', val: currentClass.recommendedStats.dex, color: 'bg-amber-500' },
                    { key: 'LUK', label: 'Luck (Critical & Perfect Dodge)', val: currentClass.recommendedStats.luk, color: 'bg-yellow-400' },
                  ].map((stat) => (
                    <div key={stat.key} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-mono font-bold text-slate-300">
                          {stat.key} <span className="font-sans text-[11px] text-slate-400 font-normal">({stat.label})</span>
                        </span>
                        <span className="font-mono font-bold text-amber-400">{stat.val}</span>
                      </div>
                      <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className={`h-full ${stat.color} rounded-full transition-all duration-500`}
                          style={{ width: `${(stat.val / 99) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400 text-center">
                  Stats are fully customizable at any Kafra Service Center in Prontera.
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
