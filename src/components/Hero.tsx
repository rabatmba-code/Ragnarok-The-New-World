import React, { useState } from 'react';
import { Play, Sparkles, ExternalLink, Users, Trophy, Compass, Image as ImageIcon } from 'lucide-react';

interface HeroProps {
  onOpenPreRegister: () => void;
  onOpenVideo: () => void;
  activeLanguage: 'en' | 'fil' | 'fr' | 'ar';
}

export const Hero: React.FC<HeroProps> = ({
  onOpenPreRegister,
  onOpenVideo,
  activeLanguage,
}) => {
  const [backdropIdx, setBackdropIdx] = useState(0);

  const backdrops = [
    {
      src: '/assets/aistudio/image_2f98b010.png',
      label: '🐱 Campus Kitty Wonder Tour',
    },
    {
      src: '/assets/aistudio/image_d1a84294.png',
      label: '⚔️ Imperial Siege War',
    },
    {
      src: '/assets/aistudio/image_81863f60.png',
      label: '🏆 Legend Cup $1.01M (4K UHD)',
    },
    {
      src: '/assets/steam_hd/steam_ss_3.jpg',
      label: 'Sky Cruiser & Airship',
    },
    {
      src: '/assets/steam_hd/steam_ss_10.jpg',
      label: '360° Open World & Star Flight',
    },
    {
      src: '/assets/steam_hd/steam_ss_1.jpg',
      label: 'Prontera Capital Square',
    },
    {
      src: '/assets/steam_hd/steam_ss_11.jpg',
      label: 'Tropical Sunset Coast',
    },
  ];

  const content = {
    en: {
      badge: 'NEXT-GEN OPEN WORLD MMORPG • 100% FREE ADVENTURE',
      titleHighlight: 'ACROSS TIME,',
      titleMain: 'INTO THE NEW WORLD.',
      subtitle:
        'Reinventing the legendary anime MMORPG for a new generation. Unfettered 360° open world exploration, vibrant Prontera street markets, deep class evolutions, romance in holy cathedrals, and endless shared memories with your companions.',
      wishlistCta: 'Wishlist on Steam',
      watchTrailer: 'Watch Gameplay Trailer',
      preRegBadge: 'Claim Free Poring Headgear at Launch',
      stat1Label: 'Pre-Registered Adventurers',
      stat1Val: '1,248,930+',
      stat2Label: 'Seamless Open World',
      stat2Val: '16.8 km²',
      stat3Label: 'Advanced Job Classes',
      stat3Val: '24+',
      stat4Label: 'Active Player Economy',
      stat4Val: '100% Free Trade',
      darijaNote: 'Made for gamers who want to truly live and feel the game mode in crystal-clear Full HD.',
      changeScene: 'Switch Backdrop View (1080p)',
    },
    fil: {
      badge: 'BAGONG HENERASYON NG OPEN WORLD MMORPG • 100% LIBRENG ADVENTURE',
      titleHighlight: 'SA BAWAT PANAHON,',
      titleMain: 'TUNGO SA BAGONG MUNDO.',
      subtitle:
        'Muling binuhay ang maalamat na anime MMORPG para sa mga Pilipino at global gamers! Malawak na 360° open world exploration, masiglang palengke sa Prontera, matinding labanan sa War of Emperium, at walang katapusang pakikipagsapalaran kasama ang iyong mga tropa at guildmates.',
      wishlistCta: 'I-wishlist sa Steam',
      watchTrailer: 'Panoorin ang Gameplay Trailer',
      preRegBadge: 'Kunin ang Libreng Poring Headgear sa Paglulunsad',
      stat1Label: 'Mga Naka-pre-register',
      stat1Val: '1,248,930+',
      stat2Label: 'Seamless na Open World',
      stat2Val: '16.8 km²',
      stat3Label: 'Advanced na Job Classes',
      stat3Val: '24+',
      stat4Label: 'Libreng Kalakalan',
      stat4Val: '100% Player Trade',
      darijaNote: 'Ginawa para sa mga gamers na nais maranasan ang tunay na laro sa napakalinaw na Full HD.',
      changeScene: 'Palitan ang Tanawin (1080p)',
    },
    fr: {
      badge: 'MMORPG OPEN WORLD NOUVELLE GÉNÉRATION • 100% GRATUIT',
      titleHighlight: 'À TRAVERS LE TEMPS,',
      titleMain: 'DANS LE NOUVEAU MONDE.',
      subtitle:
        'L’immersion totale dans Midgard en Full HD 1080p : escaladez les cathédrales, plongez dans les rivières, ouvrez votre échoppe marchande à Prontera et vivez votre aventure anime ultime.',
      wishlistCta: 'Ajouter à la liste Steam',
      watchTrailer: 'Voir le Trailer Officiel',
      preRegBadge: 'Obtenez le Chapeau Poring Exclusif',
      stat1Label: 'Aventuriers Pré-inscrits',
      stat1Val: '1 248 930+',
      stat2Label: 'Monde Ouvert Sans Transition',
      stat2Val: '16.8 km²',
      stat3Label: 'Classes & Évolutions',
      stat3Val: '24+',
      stat4Label: 'Économie 100% Libre',
      stat4Val: 'Marché Ouvert',
      darijaNote: 'Conçu pour les gamers qui veulent vivre chaque instant du jeu avec une clarté visuelle totale.',
      changeScene: 'Changer la scène de fond (1080p)',
    },
    ar: {
      badge: 'عالم مفتوح من الجيل القادم • مغامرة مجانية 100% بجودة 1080p Full HD',
      titleHighlight: 'عبر الزمن،',
      titleMain: 'نحو العالم الجديد المفتوح.',
      subtitle:
        'مرحبا بك في عالم راغناروك الجديد بدقة وصورة واضحة 100%! استكشف بحرية كاملة، تسلق أبراج برونتيرا، افتح متجرك الخاص في السوق الشعبي، تزوج شريكك في الكاتدرائية وعيش تجربة الغيمينغ الحقيقية.',
      wishlistCta: 'Steam ضيفها لـ',
      watchTrailer: 'شاهد التريلر الرسمي',
      preRegBadge: 'احصل على قبعة البورينغ الوردية مجاناً عند الإطلاق',
      stat1Label: 'لاعب مسجل مسبقاً',
      stat1Val: '+1,248,930',
      stat2Label: 'عالم مفتوح ضخم',
      stat2Val: '16.8 كم²',
      stat3Label: 'مهن وتطورات حربية',
      stat3Val: '+24',
      stat4Label: 'تجارة واقتصاد حر',
      stat4Val: '100% تجارة حرة',
      darijaNote: 'للناس ديال الغيمينغ لي كيبغيو يعيشو المود دو جو بأعلى وضوح وجودة HD!',
      changeScene: 'بدل المنظر ديال الخلفية (1080p)',
    },
  };

  const t = content[activeLanguage as keyof typeof content] || content.en;

  return (
    <div className="relative min-h-[92vh] flex items-center justify-center overflow-hidden border-b border-amber-500/20">
      {/* Background Graphic Visual using full 1920x1080 Steam Master original */}
      <div className="absolute inset-0 z-0">
        <img
          key={backdrops[backdropIdx].src}
          src={backdrops[backdropIdx].src}
          alt="Ragnarok: The New World Full HD Scene"
          className="w-full h-full object-cover object-center filter brightness-[0.68] contrast-[1.12] transition-all duration-700"
        />
        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-[#080c14]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080c14]/85 via-transparent to-[#080c14]/85" />
        <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-[#080c14]/70" />
      </div>

      {/* Floating Sparkles & Light Orbs */}
      <div className="absolute top-1/4 left-1/5 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-14 lg:py-20 text-center flex flex-col items-center">
        
        {/* Official Chibi Game Logo Crest */}
        <div className="mb-6 flex flex-col items-center">
          <div className="relative group p-1.5 sm:p-2 rounded-3xl bg-gradient-to-r from-sky-500/30 via-pink-500/25 to-amber-500/30 border-2 border-sky-400/50 shadow-2xl shadow-sky-500/25 backdrop-blur-md hover:scale-105 hover:border-pink-400/70 transition-all duration-300 ring-2 ring-sky-400/30">
            <img
              src="/assets/official_chibi_logo.png"
              alt="Ragnarok: The New World Official Chibi Logo"
              className="h-20 sm:h-24 md:h-28 w-auto object-contain rounded-2xl filter drop-shadow-[0_8px_20px_rgba(37,99,235,0.45)]"
            />
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-pink-300 to-amber-300 tracking-wider">
              OFFICIAL GRAVITY MMORPG
            </span>
          </div>
        </div>

        {/* Grand Game Headline */}
        <h1 className="font-cinzel text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-tight drop-shadow-md">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-300 to-amber-300">
            {t.titleHighlight}
          </span>
          <span className="block text-white mt-1">
            {t.titleMain}
          </span>
        </h1>

        {/* Narrative Description */}
        <p className="max-w-3xl text-slate-100 text-base sm:text-lg lg:text-xl font-normal leading-relaxed mb-6 drop-shadow">
          {t.subtitle}
        </p>

        {/* Moroccan/Darija Gamer Callout */}
        <div className="mb-6 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500/15 via-blue-500/15 to-amber-500/15 border border-amber-400/30 text-amber-200 text-xs sm:text-sm font-medium backdrop-blur-sm inline-flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{t.darijaNote}</span>
        </div>

        {/* 1080p Backdrop Selector Toolbar */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2 bg-slate-950/70 p-1.5 rounded-2xl border border-slate-700/80 backdrop-blur-md">
          <span className="text-[11px] font-bold text-slate-400 px-2 flex items-center gap-1">
            <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
            <span>1080p Scenes:</span>
          </span>
          {backdrops.map((b, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setBackdropIdx(idx)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                backdropIdx === idx
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/30'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>

        {/* Action Button Group */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 mb-12 w-full max-w-xl">
          {/* Steam Wishlist - Primary CTA */}
          <a
            href="#go2offer#"
            className="flex-1 min-w-[220px] inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-base font-extrabold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 hover:from-blue-500 hover:to-indigo-500 shadow-xl shadow-blue-600/30 transition-all transform hover:-translate-y-1 active:translate-y-0"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 28 32">
              <path d="M11.979 0C5.378 0 0 5.378 0 11.979c0 5.385 3.567 9.94 8.513 11.458l3.187-4.609a3.252 3.252 0 0 1-.223-.051 3.284 3.284 0 0 1-2.28-4.04l-3.95-1.632C4.37 13.987 4 15.228 4 16.54c0 3.792 2.628 6.98 6.182 7.82l2.368-3.424a3.298 3.298 0 0 1 1.705.474c1.82 1.05 2.445 3.38 1.396 5.2a3.308 3.308 0 0 1-5.198 1.396l-2.428 3.513C9.39 31.815 10.662 32 11.979 32 20.827 32 28 24.827 28 15.979S20.827 0 11.979 0z"/>
            </svg>
            <span>{t.wishlistCta}</span>
            <ExternalLink className="w-4 h-4 opacity-80" />
          </a>

          {/* Watch Gameplay Trailer - Secondary */}
          <button
            type="button"
            onClick={onOpenVideo}
            className="flex-1 min-w-[220px] inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-base font-bold text-slate-100 bg-slate-900/80 hover:bg-slate-800 border border-slate-600/80 hover:border-amber-400 shadow-xl backdrop-blur-md transition-all transform hover:-translate-y-1 cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center pl-0.5">
              <Play className="w-3.5 h-3.5 fill-current" />
            </div>
            <span>{t.watchTrailer}</span>
          </button>
        </div>

        {/* Pre-registration Milestone Teaser CTA Bar */}
        <a
          href="#go2offer#"
          className="group max-w-lg w-full bg-slate-900/80 hover:bg-slate-900/95 border border-amber-500/30 hover:border-amber-400 rounded-2xl p-3.5 flex items-center justify-between gap-4 backdrop-blur-md transition-all cursor-pointer shadow-lg hover:shadow-amber-500/10"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-lg">
              🎀
            </div>
            <div className="text-left">
              <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                Launch Milestone Reward
              </div>
              <div className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">
                {t.preRegBadge}
              </div>
            </div>
          </div>
          <span className="px-3 py-1.5 rounded-lg bg-amber-400 text-slate-950 text-xs font-bold group-hover:scale-105 transition-transform">
            Claim Now
          </span>
        </a>

        {/* Live Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 w-full pt-8 border-t border-slate-800/80">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-center gap-2 text-amber-400 font-cinzel text-2xl font-bold">
              <Users className="w-5 h-5 text-amber-400" />
              <span>{t.stat1Val}</span>
            </div>
            <div className="text-xs text-slate-400 font-medium mt-1">{t.stat1Label}</div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-center gap-2 text-sky-400 font-cinzel text-2xl font-bold">
              <Compass className="w-5 h-5 text-sky-400" />
              <span>{t.stat2Val}</span>
            </div>
            <div className="text-xs text-slate-400 font-medium mt-1">{t.stat2Label}</div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-center gap-2 text-purple-400 font-cinzel text-2xl font-bold">
              <Trophy className="w-5 h-5 text-purple-400" />
              <span>{t.stat3Val}</span>
            </div>
            <div className="text-xs text-slate-400 font-medium mt-1">{t.stat3Label}</div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-center gap-2 text-emerald-400 font-cinzel text-2xl font-bold">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span>{t.stat4Val}</span>
            </div>
            <div className="text-xs text-slate-400 font-medium mt-1">{t.stat4Label}</div>
          </div>
        </div>

      </div>
    </div>
  );
};
