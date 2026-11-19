import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ExternalLink, Users, Globe2, Swords, Coins } from 'lucide-react';
import { HERO_INTRO_VIDEO_1_URL, HERO_VIDEO_2_URL } from '../utils/mediaAssets';
import { SupportedLanguage } from '../utils/trackingAndLocale';

interface HeroProps {
  onOpenPreRegister: () => void;
  onOpenVideo: () => void;
  activeLanguage: SupportedLanguage;
  activeAngle?: string;
}

const HERO_VIDEOS = [
  {
    src: HERO_INTRO_VIDEO_1_URL,
    poster: '/assets/aistudio/image_2f98b010.png',
  },
  {
    src: HERO_VIDEO_2_URL,
    poster: '/assets/aistudio/image_d1a84294.png',
  },
] as const;

export const Hero: React.FC<HeroProps> = ({ activeLanguage }) => {
  const [videoIdx, setVideoIdx] = useState<0 | 1>(0);
  const [firstVideoPlaying, setFirstVideoPlaying] = useState(false);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([null, null]);

  const advanceToNextVideo = useCallback(() => {
    setVideoIdx((prev) => (prev === 0 ? 1 : 0));
  }, []);

  useEffect(() => {
    const activeVideo = videoRefs.current[videoIdx];
    const inactiveVideo = videoRefs.current[videoIdx === 0 ? 1 : 0];

    if (inactiveVideo && !inactiveVideo.paused) {
      inactiveVideo.pause();
    }

    if (activeVideo) {
      activeVideo.currentTime = 0;
      activeVideo.muted = true;
      activeVideo.play().catch(() => {
        // Ignore transient autoplay errors
      });
    }
  }, [videoIdx]);

  const content: Record<
    SupportedLanguage,
    {
      titleHighlight: string;
      titleMain: string;
      wishlistCta: string;
    }
  > = {
    en: {
      titleHighlight: 'ACROSS TIME,',
      titleMain: 'INTO THE NEW WORLD.',
      wishlistCta: 'Play Free via Steam',
    },
    id: {
      titleHighlight: 'MELINTASI WAKTU,',
      titleMain: 'MENUJU DUNIA BARU.',
      wishlistCta: 'Main Gratis di Steam',
    },
    th: {
      titleHighlight: 'ข้ามผ่านกาลเวลา,',
      titleMain: 'สู่โลกใบใหม่แห่ง Midgard.',
      wishlistCta: 'เล่นฟรีบน Steam',
    },
    zh: {
      titleHighlight: '跨越时空，',
      titleMain: '踏入米德加尔特新世界。',
      wishlistCta: '前往 Steam 免费游玩',
    },
  };

  const t = content[activeLanguage] || content.en;

  return (
    <section
      data-testid="hero-section"
      data-active-video={videoIdx}
      className="relative min-h-[82vh] flex items-center justify-center overflow-hidden border-b border-sky-400/25"
    >
      {/* Clean Full-Bleed Auto-Switching HD Video Backdrop (Seamless Crossfade) */}
      <div className="absolute inset-0 z-0 bg-[#080c14]">
        {HERO_VIDEOS.map((vid, idx) => {
          const isActive = videoIdx === idx;
          const preloadMode = idx === 0 || firstVideoPlaying || isActive ? 'auto' : 'metadata';
          return (
            <video
              key={vid.src}
              ref={(el) => {
                videoRefs.current[idx] = el;
              }}
              src={vid.src}
              poster={vid.poster}
              autoPlay={idx === 0}
              muted
              playsInline
              preload={preloadMode}
              data-testid={`hero-video-${idx}`}
              onPlaying={() => {
                if (idx === 0 && !firstVideoPlaying) {
                  setFirstVideoPlaying(true);
                }
              }}
              onEnded={() => {
                if (videoIdx === idx) {
                  advanceToNextVideo();
                }
              }}
              onError={() => {
                if (videoIdx === idx) {
                  advanceToNextVideo();
                }
              }}
              className={`absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.76] contrast-[1.08] transition-opacity duration-700 ${
                isActive ? 'opacity-100 z-[1]' : 'opacity-0 z-0 pointer-events-none'
              }`}
            />
          );
        })}
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#080c14] via-[#080c14]/35 to-transparent" />
        <div className="absolute inset-0 z-[2] bg-gradient-to-r from-[#080c14]/70 via-transparent to-[#080c14]/70" />
      </div>

      {/* Ultra-Clean Hero Content (No Pill Badge, No Duplicate Logo, No Watch Trailer or Video Toggle Buttons) */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-16 lg:py-24 text-center flex flex-col items-center">
        <h1 className="font-cinzel text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-10 leading-tight drop-shadow-lg">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-300 to-amber-300">
            {t.titleHighlight}
          </span>
          <span className="block text-white mt-1">{t.titleMain}</span>
        </h1>

        <a
          href="#go2offer#"
          className="min-w-[260px] whitespace-nowrap inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-extrabold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 hover:from-blue-500 hover:to-indigo-500 shadow-xl shadow-blue-600/35 transition-all transform hover:-translate-y-1 active:translate-y-0"
        >
          <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 28 32">
            <path d="M11.979 0C5.378 0 0 5.378 0 11.979c0 5.385 3.567 9.94 8.513 11.458l3.187-4.609a3.252 3.252 0 0 1-.223-.051 3.284 3.284 0 0 1-2.28-4.04l-3.95-1.632C4.37 13.987 4 15.228 4 16.54c0 3.792 2.628 6.98 6.182 7.82l2.368-3.424a3.298 3.298 0 0 1 1.705.474c1.82 1.05 2.445 3.38 1.396 5.2a3.308 3.308 0 0 1-5.198 1.396l-2.428 3.513C9.39 31.815 10.662 32 11.979 32 20.827 32 28 24.827 28 15.979S20.827 0 11.979 0z" />
          </svg>
          <span>{t.wishlistCta}</span>
          <ExternalLink className="w-4 h-4 opacity-80 shrink-0" />
        </a>
      </div>
    </section>
  );
};

interface HeroStatsBarProps {
  activeLanguage: SupportedLanguage;
}

export const HeroStatsBar: React.FC<HeroStatsBarProps> = ({ activeLanguage }) => {
  const statsCopy: Record<
    SupportedLanguage,
    {
      preRegLabel: string;
      worldLabel: string;
      classesLabel: string;
      tradeValue: string;
      tradeLabel: string;
    }
  > = {
    en: {
      preRegLabel: 'Pre-Registered Adventurers',
      worldLabel: 'Seamless Open World',
      classesLabel: 'Advanced Job Classes',
      tradeValue: '100% Free Trade',
      tradeLabel: 'Player-Driven Market',
    },
    id: {
      preRegLabel: 'Petualang Pra-Registrasi',
      worldLabel: 'Dunia Terbuka Tanpa Batas',
      classesLabel: 'Kelas Job Lanjutan',
      tradeValue: '100% Perdagangan Bebas',
      tradeLabel: 'Pasar Ekonomi Pemain',
    },
    th: {
      preRegLabel: 'นักผจญภัยลงทะเบียนล่วงหน้า',
      worldLabel: 'โลกเปิดกว้างไร้รอยต่อ',
      classesLabel: 'คลาสอาชีพระดับสูง',
      tradeValue: '100% การค้าอิสระ',
      tradeLabel: 'ตลาดแลกเปลี่ยนโดยผู้เล่น',
    },
    zh: {
      preRegLabel: '已预约冒险者',
      worldLabel: '无缝开放大世界',
      classesLabel: '高阶进阶职业',
      tradeValue: '100% 自由交易',
      tradeLabel: '玩家主导自由市场',
    },
  };

  const s = statsCopy[activeLanguage] || statsCopy.en;

  const stats = [
    {
      icon: Users,
      value: '1,248,930+',
      label: s.preRegLabel,
      accent: 'text-sky-300',
      border: 'border-sky-400/30',
    },
    {
      icon: Globe2,
      value: '16.8 km²',
      label: s.worldLabel,
      accent: 'text-emerald-300',
      border: 'border-emerald-400/30',
    },
    {
      icon: Swords,
      value: '24+',
      label: s.classesLabel,
      accent: 'text-pink-300',
      border: 'border-pink-400/30',
    },
    {
      icon: Coins,
      value: s.tradeValue,
      label: s.tradeLabel,
      accent: 'text-amber-300',
      border: 'border-amber-400/30',
    },
  ];

  return (
    <section
      data-testid="hero-stats-bar"
      className="py-8 bg-[#060a14]/55 backdrop-blur-md border-b border-sky-400/25 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`rounded-2xl bg-slate-950/75 border ${item.border} px-5 py-4 text-center shadow-lg backdrop-blur-md flex flex-col items-center justify-center`}
              >
                <Icon className={`w-5 h-5 ${item.accent} mb-1.5`} />
                <div className={`font-cinzel text-xl sm:text-2xl font-black ${item.accent} leading-tight`}>
                  {item.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
