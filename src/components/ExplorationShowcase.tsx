import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { EXPLORATION_FULLSCREEN_VIDEO_URL } from '../utils/mediaAssets';
import { SupportedLanguage } from '../utils/trackingAndLocale';

interface ExplorationShowcaseProps {
  activeLanguage: SupportedLanguage;
}

const COPY: Record<
  SupportedLanguage,
  {
    title: string;
    cta: string;
  }
> = {
  en: {
    title: '360° Seamless Open-World Exploration',
    cta: 'Explore Midgard Free',
  },
  id: {
    title: 'Eksplorasi Dunia Terbuka 360° Tanpa Batas',
    cta: 'Jelajahi Midgard Gratis',
  },
  th: {
    title: 'สำรวจโลกเปิด 360° ไร้รอยต่อ',
    cta: 'ออกสำรวจ Midgard ฟรี',
  },
  zh: {
    title: '360° 无缝开放世界自由探索',
    cta: '免费探索米德加尔特',
  },
};

export const ExplorationShowcase: React.FC<ExplorationShowcaseProps> = ({ activeLanguage }) => {
  const t = COPY[activeLanguage] || COPY.en;

  return (
    <section
      id="exploration-showcase"
      data-testid="exploration-fullscreen-section"
      aria-label={t.title}
      className="relative w-full h-[72vh] sm:h-[82vh] lg:h-[92vh] min-h-[520px] overflow-hidden bg-black border-y border-sky-400/25"
    >
      {/* Full-Screen Edge-to-Edge HD Gameplay Video */}
      <video
        src={EXPLORATION_FULLSCREEN_VIDEO_URL}
        poster="/assets/aistudio/image_d1a84294.png"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        data-testid="exploration-fullscreen-video"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Subtle Bottom Edge Vignette Only — Keeps 95%+ of the Visual Frame Pure & Unobstructed */}
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#05080f]/90 via-[#05080f]/35 to-transparent pointer-events-none" />

      {/* Minimal Bottom Bar: Short Title + Direct CTA */}
      <div className="absolute inset-x-0 bottom-0 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <h2 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-black text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] tracking-tight">
          {t.title}
        </h2>

        <a
          href="#go2offer#"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-extrabold text-sm text-slate-950 bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 hover:from-amber-200 hover:to-yellow-200 shadow-xl shadow-amber-400/25 transition-all transform hover:-translate-y-0.5 self-start sm:self-auto shrink-0"
        >
          <span>{t.cta}</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
};
