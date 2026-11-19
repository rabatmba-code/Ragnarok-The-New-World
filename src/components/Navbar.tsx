import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { RAGNAROK_MUSIC_URL } from '../utils/mediaAssets';
import { SupportedLanguage } from '../utils/trackingAndLocale';

interface NavbarProps {
  onOpenPreRegister: () => void;
  onOpenVideo?: () => void;
  activeLanguage: SupportedLanguage;
  onChangeLanguage: (lang: SupportedLanguage) => void;
}

const DEFAULT_BGM_VOLUME = 0.78;

export const Navbar: React.FC<NavbarProps> = ({
  activeLanguage,
  onChangeLanguage,
}) => {
  // Music is ON by default until the user explicitly chooses to mute it
  const [soundEnabled, setSoundEnabled] = useState(true);
  const userMutedRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = DEFAULT_BGM_VOLUME;
    audio.loop = true;
    audio.muted = false;

    const unlockEvents: Array<keyof WindowEventMap> = [
      'pointerdown',
      'click',
      'keydown',
      'touchstart',
      'wheel',
    ];

    const removeUnlockListeners = () => {
      unlockEvents.forEach((evt) => {
        window.removeEventListener(evt, handleFirstInteraction, true);
      });
    };

    const tryStartPlayback = () => {
      if (userMutedRef.current) return;
      audio.volume = DEFAULT_BGM_VOLUME;
      audio.muted = false;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            if (!userMutedRef.current) {
              setSoundEnabled(true);
              removeUnlockListeners();
            }
          })
          .catch(() => {
            // Browser blocked unmuted autoplay before first gesture — keep listeners armed
          });
      }
    };

    function handleFirstInteraction(event: Event) {
      if (userMutedRef.current) {
        removeUnlockListeners();
        return;
      }
      // If user explicitly clicked the mute button itself, let toggleSound handle it
      const target = event.target as HTMLElement | null;
      if (target?.closest('[data-testid="bgm-toggle"]')) {
        return;
      }
      const currentAudio = audioRef.current;
      if (!currentAudio) return;
      if (currentAudio.paused) {
        tryStartPlayback();
      } else {
        removeUnlockListeners();
      }
    }

    const handleVisibilityResume = () => {
      if (!document.hidden && !userMutedRef.current && audio.paused) {
        tryStartPlayback();
      }
    };

    // Attempt immediate autoplay as soon as the site opens
    tryStartPlayback();

    // Arm seamless unlock on the very first user gesture if autoplay was blocked
    unlockEvents.forEach((evt) => {
      window.addEventListener(evt, handleFirstInteraction, { capture: true, passive: true });
    });
    document.addEventListener('visibilitychange', handleVisibilityResume);

    return () => {
      removeUnlockListeners();
      document.removeEventListener('visibilitychange', handleVisibilityResume);
      audio.pause();
    };
  }, []);

  const toggleSound = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (soundEnabled) {
      userMutedRef.current = true;
      audio.pause();
      setSoundEnabled(false);
    } else {
      userMutedRef.current = false;
      audio.volume = DEFAULT_BGM_VOLUME;
      audio.muted = false;
      setSoundEnabled(true);
      audio.play().catch(() => {
        // Retry allowed on next gesture if needed
      });
    }
  };

  const navTranslations: Record<
    SupportedLanguage,
    { preReg: string; musicOn: string; musicOff: string }
  > = {
    en: {
      preReg: 'Play Free Now',
      musicOn: 'Pause Ragnarok Music',
      musicOff: 'Play Ragnarok Music',
    },
    id: {
      preReg: 'Main Gratis',
      musicOn: 'Jeda Musik Ragnarok',
      musicOff: 'Putar Musik Ragnarok',
    },
    th: {
      preReg: 'เล่นฟรีเลย',
      musicOn: 'หยุดเพลง Ragnarok',
      musicOff: 'เปิดเพลง Ragnarok',
    },
    zh: {
      preReg: '立即免费游玩',
      musicOn: '暂停仙境传说音乐',
      musicOff: '播放仙境传说音乐',
    },
  };

  const t = navTranslations[activeLanguage] || navTranslations.en;

  const langOptions: Array<{ code: SupportedLanguage; label: string; title: string }> = [
    { code: 'th', label: 'ไทย', title: 'ภาษาไทย' },
    { code: 'en', label: 'EN', title: 'English' },
    { code: 'id', label: 'ID', title: 'Bahasa Indonesia' },
    { code: 'zh', label: '简中', title: '简体中文' },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-gradient-to-r from-[#0e2a5c]/95 via-[#3d1c4f]/95 to-[#4f3412]/95 backdrop-blur-md border-b-2 border-sky-400/55 shadow-[0_8px_32px_rgba(56,189,248,0.22)] px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Official Chibi Game Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative h-11 sm:h-12 w-auto flex items-center rounded-2xl overflow-hidden p-1 bg-gradient-to-r from-sky-400/40 via-pink-400/35 to-amber-400/40 border border-sky-300/70 shadow-lg shadow-sky-400/25 group-hover:scale-105 group-hover:border-pink-300/80 transition-all duration-300 ring-1 ring-white/25">
            <img
              src="/assets/official_chibi_logo.png"
              alt="Ragnarok: The New World Chibi Official Logo"
              fetchPriority="high"
              decoding="async"
              className="h-9 sm:h-10 w-auto object-contain rounded-xl"
            />
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center gap-1.5">
              <span className="font-cinzel text-base md:text-lg font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-white to-amber-200 group-hover:from-amber-200 group-hover:to-pink-200 transition-all drop-shadow">
                RAGNARÖK
              </span>
              <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tight shadow-sm shadow-pink-500/30">
                The New World
              </span>
            </div>
            <p className="text-[10px] text-amber-200/95 tracking-widest uppercase font-mono font-bold">
              Gravity Game Vision Limited
            </p>
          </div>
        </a>

        {/* Right Actions & Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher: ไทย | EN | ID | 简中 */}
          <div
            role="group"
            aria-label="Language Switcher"
            className="flex items-center bg-[#09142b]/80 border border-sky-300/40 rounded-lg p-0.5 text-xs shadow-inner"
          >
            {langOptions.map((opt) => (
              <button
                key={opt.code}
                type="button"
                data-lang-btn={opt.code}
                onClick={() => onChangeLanguage(opt.code)}
                title={opt.title}
                className={`px-2 sm:px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  activeLanguage === opt.code
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-black shadow-sm'
                    : 'text-sky-100/80 hover:text-white'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Ambient Music Audio Element — Auto-plays on site open until user mutes */}
          <audio
            ref={audioRef}
            src={RAGNAROK_MUSIC_URL}
            autoPlay
            loop
            preload="auto"
            data-testid="bgm-audio"
            onPlay={() => {
              if (!userMutedRef.current) {
                setSoundEnabled(true);
              }
            }}
          />

          {/* Ambient Sound Toggle */}
          <button
            type="button"
            data-testid="bgm-toggle"
            onClick={toggleSound}
            aria-pressed={soundEnabled}
            aria-label={soundEnabled ? t.musicOn : t.musicOff}
            title={soundEnabled ? t.musicOn : t.musicOff}
            className="p-2 rounded-lg bg-[#09142b]/80 hover:bg-sky-900/70 border border-sky-300/40 text-sky-100 hover:text-amber-300 transition-all cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-300 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Pre-Register CTA */}
          <a
            href="#go2offer#"
            className="relative px-3.5 sm:px-4 py-2 rounded-xl text-xs font-extrabold text-slate-950 bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 hover:from-amber-200 hover:to-yellow-200 shadow-md shadow-amber-400/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer inline-flex items-center justify-center whitespace-nowrap"
          >
            {t.preReg}
          </a>
        </div>
      </div>
    </nav>
  );
};
