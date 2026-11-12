import React, { useState } from 'react';
import { Sparkles, Gamepad2, ShoppingBag, Swords, Film, ShieldCheck, ExternalLink, Menu, X, Volume2, VolumeX, Gift, Trophy } from 'lucide-react';

interface NavbarProps {
  onOpenPreRegister: () => void;
  onOpenVideo: () => void;
  activeLanguage: 'en' | 'fil' | 'fr' | 'ar';
  onChangeLanguage: (lang: 'en' | 'fil') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenPreRegister,
  onOpenVideo,
  activeLanguage,
  onChangeLanguage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioCtxRef = React.useRef<AudioContext | null>(null);
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const toggleSound = () => {
    if (soundEnabled) {
      if (timerRef.current) clearInterval(timerRef.current);
      setSoundEnabled(false);
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioCtx();
        }
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }

        const notes = [523.25, 659.25, 783.99, 987.77, 1046.5, 783.99, 659.25, 587.33];
        let idx = 0;

        timerRef.current = setInterval(() => {
          if (!audioCtxRef.current) return;
          const osc = audioCtxRef.current.createOscillator();
          const gain = audioCtxRef.current.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(notes[idx % notes.length], audioCtxRef.current.currentTime);
          gain.gain.setValueAtTime(0.04, audioCtxRef.current.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 1.1);
          osc.connect(gain);
          gain.connect(audioCtxRef.current.destination);
          osc.start();
          osc.stop(audioCtxRef.current.currentTime + 1.1);
          idx++;
        }, 550);

        setSoundEnabled(true);
      } catch {
        setSoundEnabled(true);
      }
    }
  };

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close().catch(() => {});
    };
  }, []);

  const navTranslations = {
    en: {
      gameModes: 'Game Modes',
      prontera: 'Prontera Market',
      classes: 'Classes',
      legendCup: 'Legend Cup & $10 Gift',
      media: 'Media & Videos',
      preReg: 'Pre-Register',
      wishlist: 'Wishlist on Steam',
    },
    fil: {
      gameModes: 'Mga Mode ng Laro',
      prontera: 'Prontera Palengke',
      classes: 'Mga Klase & Trabaho',
      legendCup: 'Legend Cup & $10 Regalo',
      media: 'Mga Video & Media',
      preReg: 'Mag-pre-register',
      wishlist: 'Wishlist sa Steam',
    },
    fr: {
      gameModes: 'Modes de Jeu',
      prontera: 'Marché de Prontera',
      classes: 'Classes',
      legendCup: 'Legend Cup & Cadeau 10$',
      media: 'Médias & Vidéos',
      preReg: 'Pré-inscription',
      wishlist: 'Ajouter sur Steam',
    },
    ar: {
      gameModes: 'طرق اللعب',
      prontera: 'سوق برونتيرا',
      classes: 'المهن والشخصيات',
      legendCup: 'كأس الأساطير وهدية $10',
      media: 'فيديوهات وصور',
      preReg: 'تسجيل مسبق',
      wishlist: 'Steam أضف إلى قائمة',
    },
  };

  const t = navTranslations[activeLanguage as keyof typeof navTranslations] || navTranslations.en;

  return (
    <>
      {/* Main Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-[#090d18]/95 backdrop-blur-md border-b border-amber-500/20 px-4 lg:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo & Emblem featuring the Official Chibi Game Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative h-11 sm:h-12 w-auto flex items-center rounded-2xl overflow-hidden p-1 bg-gradient-to-r from-sky-500/30 via-pink-500/25 to-amber-500/30 border border-sky-400/50 shadow-lg shadow-sky-500/20 group-hover:scale-105 group-hover:border-pink-400/60 transition-all duration-300 ring-1 ring-sky-400/30">
              <img
                src="/assets/official_chibi_logo.png"
                alt="Ragnarok: The New World Chibi Official Logo"
                className="h-9 sm:h-10 w-auto object-contain rounded-xl"
              />
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-1.5">
                <span className="font-cinzel text-base md:text-lg font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-400 to-sky-100 group-hover:from-amber-300 group-hover:to-yellow-200 transition-all drop-shadow">
                  RAGNARÖK
                </span>
                <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tight shadow-sm shadow-pink-500/25">
                  The New World
                </span>
              </div>
              <p className="text-[10px] text-amber-300/90 tracking-widest uppercase font-mono font-bold">
                Across Time Into Midgard
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-300">
            <a href="#legend-cup" className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-amber-400 font-bold px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <Gift className="w-4 h-4 text-amber-400" />
              <span>{t.legendCup}</span>
            </a>
            <a href="#seasonal" className="hover:text-pink-300 transition-colors flex items-center gap-1.5 text-pink-300 font-bold px-2.5 py-1 rounded-lg bg-pink-500/10 border border-pink-500/30">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span>{activeLanguage === 'fil' ? 'Mga Event' : activeLanguage === 'ar' ? 'الفعاليات' : 'Events & Art'}</span>
            </a>
            <a href="#modes" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
              <Gamepad2 className="w-4 h-4 text-amber-400" />
              <span>{t.gameModes}</span>
            </a>
            <a href="#market" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span>{t.prontera}</span>
            </a>
            <a href="#classes" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
              <Swords className="w-4 h-4 text-amber-400" />
              <span>{t.classes}</span>
            </a>
            <a href="#media" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
              <Film className="w-4 h-4 text-amber-400" />
              <span>{t.media}</span>
            </a>
          </div>

          {/* Right Actions & Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher: EN and FIL (Filipino) */}
            <div className="flex items-center bg-slate-900/80 border border-slate-700/60 rounded-lg p-0.5 text-xs">
              <button
                type="button"
                onClick={() => onChangeLanguage('en')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${activeLanguage === 'en' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => onChangeLanguage('fil')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${activeLanguage === 'fil' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
                title="Filipino / Tagalog"
              >
                FIL
              </button>
            </div>

            {/* Ambient Sound Toggle */}
            <button
              type="button"
              onClick={toggleSound}
              aria-label={soundEnabled ? 'Mute ambient sound' : 'Unmute ambient sound'}
              title={soundEnabled ? 'Mute ambience' : 'Play Prontera Ambience'}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-amber-400 transition-all cursor-pointer"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Pre-Register Button */}
            <button
              type="button"
              onClick={onOpenPreRegister}
              className="relative px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 shadow-md shadow-amber-400/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              {t.preReg}
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={onOpenPreRegister}
              className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-amber-400"
            >
              {t.preReg}
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-800 flex flex-col gap-3 pb-2 animate-in fade-in slide-in-from-top-2">
            <a
              href="#legend-cup"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-sm text-amber-400 font-bold p-2 rounded-lg bg-amber-500/10 border border-amber-500/20"
            >
              <Gift className="w-4 h-4 text-amber-400" />
              <span>{t.legendCup}</span>
            </a>
            <a
              href="#seasonal"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-sm text-pink-300 font-bold p-2 rounded-lg bg-pink-500/10 border border-pink-500/20"
            >
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span>{activeLanguage === 'fil' ? 'Mga Event' : activeLanguage === 'ar' ? 'الفعاليات' : 'Events & Art'}</span>
            </a>
            <a
              href="#modes"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-sm text-slate-200 p-2 rounded-lg hover:bg-slate-800"
            >
              <Gamepad2 className="w-4 h-4 text-amber-400" />
              <span>{t.gameModes}</span>
            </a>
            <a
              href="#market"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-sm text-slate-200 p-2 rounded-lg hover:bg-slate-800"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span>{t.prontera}</span>
            </a>
            <a
              href="#classes"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-sm text-slate-200 p-2 rounded-lg hover:bg-slate-800"
            >
              <Swords className="w-4 h-4 text-amber-400" />
              <span>{t.classes}</span>
            </a>
            <a
              href="#media"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-sm text-slate-200 p-2 rounded-lg hover:bg-slate-800"
            >
              <Film className="w-4 h-4 text-amber-400" />
              <span>{t.media}</span>
            </a>
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
              <div className="flex gap-1.5">
                {(['en', 'fil'] as const).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => onChangeLanguage(lang)}
                    className={`px-3 py-1 rounded text-xs font-bold cursor-pointer ${activeLanguage === lang ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'}`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
