import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LegendCupGiveaway } from './components/LegendCupGiveaway';
import { VideoTheater } from './components/VideoTheater';
import { GameModes } from './components/GameModes';
import { PronteraMarket } from './components/PronteraMarket';
import { ClassSelector } from './components/ClassSelector';
import { ScreenshotGallery } from './components/ScreenshotGallery';
import { PreRegisterModal } from './components/PreRegisterModal';
import { FooterAndSpecs } from './components/FooterAndSpecs';
import { X, Eye } from 'lucide-react';

export default function App() {
  const [isPreRegisterOpen, setIsPreRegisterOpen] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState<'en' | 'fil'>('en');

  // Inspect Image Modal state
  const [inspectImage, setInspectImage] = useState<{ src: string; caption: string } | null>(null);

  const scrollToVideo = () => {
    const el = document.getElementById('media');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      
      {/* Navigation */}
      <Navbar
        onOpenPreRegister={() => setIsPreRegisterOpen(true)}
        onOpenVideo={scrollToVideo}
        activeLanguage={activeLanguage}
        onChangeLanguage={setActiveLanguage}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <Hero
          onOpenPreRegister={() => setIsPreRegisterOpen(true)}
          onOpenVideo={scrollToVideo}
          activeLanguage={activeLanguage}
        />

        {/* 🏆 Official Legend Cup Global Tournament ($1.01M) & 🎁 Share & Win a $10 Gift Card! */}
        <LegendCupGiveaway
          activeLanguage={activeLanguage}
          onInspectImage={(src, caption) => setInspectImage({ src, caption })}
        />

        {/* Video Theater (Steam HLS Trailer + YouTube 4K) */}
        <VideoTheater activeLanguage={activeLanguage} />

        {/* 4 Pillars of Game Living ("Mode de Jeu") */}
        <GameModes
          activeLanguage={activeLanguage}
          onInspectImage={(src, caption) => setInspectImage({ src, caption })}
        />

        {/* Interactive Prontera Street Market Simulator */}
        <PronteraMarket activeLanguage={activeLanguage} />

        {/* Class Archetypes & Destiny Quiz */}
        <ClassSelector activeLanguage={activeLanguage} />

        {/* Official Screenshot Vault Lightbox */}
        <ScreenshotGallery activeLanguage={activeLanguage} />

      </main>

      {/* System Requirements, Steam Card & Footer */}
      <FooterAndSpecs
        onOpenPreRegister={() => setIsPreRegisterOpen(true)}
        activeLanguage={activeLanguage}
      />

      {/* Pre-Registration Modal */}
      <PreRegisterModal
        isOpen={isPreRegisterOpen}
        onClose={() => setIsPreRegisterOpen(false)}
        activeLanguage={activeLanguage}
      />

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
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-[16/10] max-h-[75vh] bg-black flex items-center justify-center">
              <img
                src={inspectImage.src}
                alt="Game Inspection"
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
