import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero, HeroStatsBar } from './components/Hero';
import { HERO_VIDEO_1_URL } from './utils/mediaAssets';
import { ConsentBanner } from './components/ConsentBanner';
import { X } from 'lucide-react';
import {
  SupportedLanguage,
  detectSupportedLanguage,
  parseAbAngle,
  trackCtaClick,
} from './utils/trackingAndLocale';

// Code-split below-the-fold sections so Hero + Navbar + Stats paint immediately on PC
const LaunchOverviewAndGuide = lazy(() =>
  import('./components/LaunchOverviewAndGuide').then((m) => ({
    default: m.LaunchOverviewAndGuide,
  }))
);
const LegendCupGiveaway = lazy(() =>
  import('./components/LegendCupGiveaway').then((m) => ({
    default: m.LegendCupGiveaway,
  }))
);
const SeasonalSpotlight = lazy(() =>
  import('./components/SeasonalSpotlight').then((m) => ({
    default: m.SeasonalSpotlight,
  }))
);
const SkyDescentMiniGame = lazy(() =>
  import('./components/SkyDescentMiniGame').then((m) => ({
    default: m.SkyDescentMiniGame,
  }))
);
const ExplorationShowcase = lazy(() =>
  import('./components/ExplorationShowcase').then((m) => ({
    default: m.ExplorationShowcase,
  }))
);
const VideoTheater = lazy(() =>
  import('./components/VideoTheater').then((m) => ({
    default: m.VideoTheater,
  }))
);
const GameModes = lazy(() =>
  import('./components/GameModes').then((m) => ({
    default: m.GameModes,
  }))
);
const PronteraMarket = lazy(() =>
  import('./components/PronteraMarket').then((m) => ({
    default: m.PronteraMarket,
  }))
);
const ClassSelector = lazy(() =>
  import('./components/ClassSelector').then((m) => ({
    default: m.ClassSelector,
  }))
);
const ScreenshotGallery = lazy(() =>
  import('./components/ScreenshotGallery').then((m) => ({
    default: m.ScreenshotGallery,
  }))
);
const FooterAndSpecs = lazy(() =>
  import('./components/FooterAndSpecs').then((m) => ({
    default: m.FooterAndSpecs,
  }))
);

function getInitialLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return 'en';
  if (window.__RO_INITIAL_LANG__) {
    return window.__RO_INITIAL_LANG__;
  }
  let stored: string | null = null;
  try {
    stored = localStorage.getItem('ro_lang');
  } catch {
    stored = null;
  }
  return detectSupportedLanguage({
    search: window.location.search,
    stored,
    browserLanguages: navigator.languages || [navigator.language],
  });
}

function getInitialAngle(): string {
  if (typeof window === 'undefined') return 'default';
  if (window.__RO_AB_ANGLE__) {
    return window.__RO_AB_ANGLE__;
  }
  let stored: string | null = null;
  try {
    stored = sessionStorage.getItem('ro_ab_angle');
  } catch {
    stored = null;
  }
  return parseAbAngle(window.location.search, stored);
}

export default function App() {
  const [activeLanguage, setActiveLanguage] = useState<SupportedLanguage>(getInitialLanguage);
  const [activeAngle] = useState<string>(getInitialAngle);
  const [enableSiteBgVideo, setEnableSiteBgVideo] = useState(false);

  // Inspect Image Modal state
  const [inspectImage, setInspectImage] = useState<{ src: string; caption: string } | null>(null);

  // Defer below-hero continuous background video slightly so Hero Video 1 gets 100% initial bandwidth
  useEffect(() => {
    let activated = false;
    const activate = () => {
      if (activated) return;
      activated = true;
      setEnableSiteBgVideo(true);
      window.removeEventListener('scroll', onScroll);
    };
    const onScroll = () => {
      if (window.scrollY > 40) {
        activate();
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    const timer = window.setTimeout(activate, 1100);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Sync HTML lang attribute and persisted preference whenever language changes
  useEffect(() => {
    document.documentElement.lang = activeLanguage;
    document.documentElement.dataset.lang = activeLanguage;
    try {
      localStorage.setItem('ro_lang', activeLanguage);
    } catch {
      // ignore restricted storage
    }
  }, [activeLanguage]);

  // Delegated tracking for all #go2offer# CTA clicks with active A/B angle & language
  useEffect(() => {
    const handleCtaClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest('a[href="#go2offer#"]') as HTMLAnchorElement | null;
      if (anchor) {
        const label = (anchor.textContent || anchor.title || 'go2offer_cta').trim().slice(0, 80);
        trackCtaClick(label, activeAngle, activeLanguage);
      }
    };
    document.addEventListener('click', handleCtaClick);
    return () => document.removeEventListener('click', handleCtaClick);
  }, [activeAngle, activeLanguage]);

  const scrollToVideo = () => {
    const el = document.getElementById('media');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const noop = () => {};

  return (
    <div className="min-h-screen bg-[#070b16] text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* Navigation */}
      <Navbar
        onOpenPreRegister={noop}
        onOpenVideo={scrollToVideo}
        activeLanguage={activeLanguage}
        onChangeLanguage={setActiveLanguage}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenPreRegister={noop}
          onOpenVideo={scrollToVideo}
          activeLanguage={activeLanguage}
          activeAngle={activeAngle}
        />

        {/* Continuous Background Video Layer from Below Hero to Footer */}
        <div className="relative isolate">
          <div
            aria-hidden="true"
            className="sticky top-0 h-screen -mb-[100vh] pointer-events-none overflow-hidden z-0"
          >
            <video
              src={enableSiteBgVideo ? HERO_VIDEO_1_URL : undefined}
              poster="/assets/aistudio/image_2f98b010.png"
              autoPlay={enableSiteBgVideo}
              loop
              muted
              playsInline
              preload={enableSiteBgVideo ? 'auto' : 'none'}
              data-testid="site-bg-video"
              className="w-full h-full object-cover object-center brightness-[0.44] contrast-[1.08] scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#060a14]/70 via-[#060a14]/50 to-[#05080f]/80" />
          </div>

          <div className="relative z-10">
            {/* 4-Stat Highlights Bar Directly Under Hero */}
            <HeroStatsBar activeLanguage={activeLanguage} />

            <Suspense fallback={<div className="min-h-[400px]" />}>
              {/* Official Release Overview: Concept, 2002 Distinction, 8 Features/Druid, 5-Step Login & PC Specs */}
              <LaunchOverviewAndGuide
                activeLanguage={activeLanguage}
                onChangeLanguage={setActiveLanguage}
              />

              {/* Official Legend Cup Tournament & Play Stages / Collect Tokens */}
              <LegendCupGiveaway
                activeLanguage={activeLanguage}
                onInspectImage={(src, caption) => setInspectImage({ src, caption })}
              />

              {/* Official Seasonal Highlights: Campus Kitty Wonder Tour & Imperial Siege War */}
              <SeasonalSpotlight
                activeLanguage={activeLanguage}
                onInspectImage={(src, caption) => setInspectImage({ src, caption })}
              />

              {/* PC Hardcore Sky Descent Mini-Game: Midgard Sky Dive */}
              <SkyDescentMiniGame activeLanguage={activeLanguage} />

              {/* Section 6: Full-Screen Edge-to-Edge HD Open-World Exploration Video */}
              <ExplorationShowcase activeLanguage={activeLanguage} />

              {/* Video Theater (Direct HD MP4 Trailers) */}
              <VideoTheater activeLanguage={activeLanguage} />

              {/* 4 Pillars of Game Living ("Mode de Jeu") */}
              <GameModes
                activeLanguage={activeLanguage}
                onInspectImage={(src, caption) => setInspectImage({ src, caption })}
              />

              {/* Interactive Prontera Street Market Simulator */}
              <PronteraMarket activeLanguage={activeLanguage} />

              {/* 8 Launch Classes & Destiny Quiz */}
              <ClassSelector activeLanguage={activeLanguage} />

              {/* Official Screenshot Vault Lightbox */}
              <ScreenshotGallery activeLanguage={activeLanguage} />

              {/* Footer & Official Publisher Attribution */}
              <FooterAndSpecs
                onOpenPreRegister={noop}
                activeLanguage={activeLanguage}
              />
            </Suspense>
          </div>
        </div>
      </main>

      {/* Google Consent Mode v2 Banner */}
      <ConsentBanner activeLanguage={activeLanguage} />

      {/* Standalone Image Inspector Modal */}
      {inspectImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in"
          onClick={() => setInspectImage(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-slate-900 border border-amber-500/50 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 bg-slate-950 flex items-center justify-between border-b border-slate-800">
              <span className="text-xs font-bold text-amber-400 font-mono">
                RAGNAROK: THE NEW WORLD • CAPTURE INSPECTOR
              </span>
              <button
                type="button"
                onClick={() => setInspectImage(null)}
                aria-label="Close Inspector"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-[16/10] max-h-[75vh] bg-black flex items-center justify-center">
              <img
                src={inspectImage.src}
                alt="Game Inspection"
                decoding="async"
                className="max-w-full max-h-[75vh] object-contain"
              />
            </div>

            <div className="p-4 bg-slate-950 border-t border-slate-800 text-xs text-slate-300">
              {inspectImage.caption}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
