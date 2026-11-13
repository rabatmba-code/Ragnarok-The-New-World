import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface NavbarProps {
  onOpenPreRegister: () => void;
  onOpenVideo?: () => void;
  activeLanguage: 'en' | 'fil' | 'fr' | 'ar';
  onChangeLanguage: (lang: 'en' | 'fil') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenPreRegister,
  activeLanguage,
  onChangeLanguage,
}) => {
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
      preReg: 'Pre-Register',
    },
    fil: {
      preReg: 'Mag-pre-register',
    },
    fr: {
      preReg: 'Pré-inscription',
    },
    ar: {
      preReg: 'تسجيل مسبق',
    },
  };

  const t = navTranslations[activeLanguage as keyof typeof navTranslations] || navTranslations.en;

  return (
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

        {/* Right Actions & Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher: EN and FIL (Filipino) */}
          <div className="flex items-center bg-slate-900/80 border border-slate-700/60 rounded-lg p-0.5 text-xs">
            <button
              type="button"
              onClick={() => onChangeLanguage('en')}
              className={`px-2 sm:px-2.5 py-1 rounded transition-colors cursor-pointer ${activeLanguage === 'en' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => onChangeLanguage('fil')}
              className={`px-2 sm:px-2.5 py-1 rounded transition-colors cursor-pointer ${activeLanguage === 'fil' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
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

          {/* Pre-Register CTA */}
          <a
            href="#go2offer#"
            className="relative px-3 sm:px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 shadow-md shadow-amber-400/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer inline-flex items-center justify-center"
          >
            {t.preReg}
          </a>
        </div>
      </div>
    </nav>
  );
};
