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
          
          {/* Logo & Emblem */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="font-cinzel text-xl font-bold text-amber-400">R</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-cinzel text-lg md:text-xl font-black tracking-wider text-slate-100 group-hover:text-amber-400 transition-colors">
                  RAGNAROK
                </span>
                <span className="bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 text-[10px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-tighter">
                  New World
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-widest uppercase font-mono">
                Across Time Into the World
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="#legend-cup" className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-amber-400 font-bold px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <Gift className="w-4 h-4 text-amber-400" />
              <span>{t.legendCup}</span>
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
