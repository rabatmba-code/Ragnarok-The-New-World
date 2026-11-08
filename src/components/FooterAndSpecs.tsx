import React from 'react';
import { ExternalLink, Sparkles, Monitor, Cpu, HardDrive, Gamepad2, Shield, Heart } from 'lucide-react';

interface FooterAndSpecsProps {
  onOpenPreRegister: () => void;
  activeLanguage: 'en' | 'fil' | 'fr' | 'ar';
}

export const FooterAndSpecs: React.FC<FooterAndSpecsProps> = ({
  onOpenPreRegister,
  activeLanguage,
}) => {
  const content = {
    en: {
      finalCtaHeading: 'Ready To Live Your New World Adventure?',
      finalCtaSub: 'Wishlist now on Steam and pre-register to receive the exclusive Day-1 Poring Starter Pack.',
      wishlistBtn: 'Wishlist on Steam Now',
      preRegBtn: 'Pre-Register for Free',
      systemSpecsTitle: 'System Requirements (PC)',
      minimum: 'Minimum Requirements (1080p / 30-60 FPS)',
      recommended: 'Recommended Requirements (1440p-4K / 60+ FPS)',
      os: 'OS: Windows 10/11 64-bit',
      storage: 'Storage: 45 GB available SSD space',
      directx: 'DirectX: Version 12',
      communityTitle: 'Join the Global Adventurer Guilds',
      darijaFarewell: 'Brought to life for Moroccan and global gamers who live for the true MMORPG feeling.',
    },
    fil: {
      finalCtaHeading: 'Handa Ka Na Bang Maranasan ang Bagong Mundo?',
      finalCtaSub: 'I-wishlist na sa Steam at mag-pre-register para matanggap ang eksklusibong Day-1 Poring Starter Pack.',
      wishlistBtn: 'I-wishlist sa Steam Ngayon',
      preRegBtn: 'Mag-pre-register nang Libre',
      systemSpecsTitle: 'Mga Kinakailangang Pagtutukoy ng Sistema (PC)',
      minimum: 'Minimum na Pagtutukoy (1080p / 30-60 FPS)',
      recommended: 'Inirerekomendang Pagtutukoy (1440p-4K / 60+ FPS)',
      os: 'OS: Windows 10/11 64-bit',
      storage: 'Storage: 45 GB available SSD space',
      directx: 'DirectX: Bersyon 12',
      communityTitle: 'Sumali sa Pandaigdigang Adventurer Guilds',
      darijaFarewell: 'Ginawa nang may sigla para sa mga Pinoy at pandaigdigang manlalaro na sabik sa tunay na damdamin ng MMORPG.',
    },
    fr: {
      finalCtaHeading: 'Prêt à vivre votre aventure dans le Nouveau Monde ?',
      finalCtaSub: 'Ajoutez à votre liste Steam et pré-inscrivez-vous pour débloquer le pack de démarrage Poring exclusif.',
      wishlistBtn: 'Ajouter sur Steam',
      preRegBtn: 'Pré-inscription gratuite',
      systemSpecsTitle: 'Configuration requise (PC)',
      minimum: 'Configuration minimale (1080p / 30-60 FPS)',
      recommended: 'Configuration recommandée (1440p-4K / 60+ FPS)',
      os: 'Système : Windows 10/11 64-bit',
      storage: 'Stockage : 45 Go SSD disponible',
      directx: 'DirectX : Version 12',
      communityTitle: 'Rejoignez les guildes mondiales',
      darijaFarewell: 'Conçu avec passion pour les vrais gamers qui veulent vivre le jeu à 100%.',
    },
    ar: {
      finalCtaHeading: 'واجد تبدا المغامرة وتعيش فـ العالم الجديد؟',
      finalCtaSub: 'Steam ضيف اللعبة دابا فـ وسجل مسبقاً باش تاخد قبعة البورينغ والفلوس فور إطلاق السيرفر.',
      wishlistBtn: 'Steam دابا على Wishlist دير',
      preRegBtn: 'تسجيل مسبق فابور',
      systemSpecsTitle: 'مواصفات تشغيل اللعبة على الحاسوب (PC Specs)',
      minimum: 'الحد الأدنى للتشغيل (1080p / 30-60 FPS)',
      recommended: 'المواصفات الموصى بها (1440p-4K / 60+ FPS)',
      os: 'نظام التشغيل: Windows 10/11 64-bit',
      storage: 'المساحة: 45GB SSD مساحة شاغرة',
      directx: 'DirectX: إصدار 12',
      communityTitle: 'انضم لغروبات وغيلدات اللاعبين',
      darijaFarewell: 'مصنوعة بحب للناس ديال الغيمينغ لي كيبغيو يعيشو المود دو جو بالروح والحماس.',
    },
  };

  const t = content[activeLanguage as keyof typeof content] || content.en;

  return (
    <footer className="bg-[#05080f] text-slate-300 relative border-t border-slate-800">
      
      {/* Grand Pre-Footer CTA Card */}
      <div className="max-w-6xl mx-auto px-4 -translate-y-12 relative z-20">
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border-2 border-amber-500/40 rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch Imminent • Season 1: Midgard Awakening</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            {t.finalCtaHeading}
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8">
            {t.finalCtaSub}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://store.steampowered.com/app/4212480/Ragnarok_The_New_World/?location=hero_banner"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-sm font-extrabold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 hover:from-blue-500 hover:to-indigo-500 shadow-xl shadow-blue-500/30 transition-all transform hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M11.979 0C5.378 0 0 5.378 0 11.979c0 5.385 3.567 9.94 8.513 11.458l3.187-4.609a3.252 3.252 0 0 1-.223-.051 3.284 3.284 0 0 1-2.28-4.04l-3.95-1.632C4.37 13.987 4 15.228 4 16.54c0 3.792 2.628 6.98 6.182 7.82l2.368-3.424a3.298 3.298 0 0 1 1.705.474c1.82 1.05 2.445 3.38 1.396 5.2a3.308 3.308 0 0 1-5.198 1.396l-2.428 3.513C9.39 31.815 10.662 32 11.979 32 20.827 32 28 24.827 28 15.979S20.827 0 11.979 0z"/>
              </svg>
              <span>{t.wishlistBtn}</span>
              <ExternalLink className="w-4 h-4 opacity-80" />
            </a>

            <button
              type="button"
              onClick={onOpenPreRegister}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-xl shadow-amber-400/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>{t.preRegBtn}</span>
            </button>
          </div>
        </div>
      </div>

      {/* System Requirements Section */}
      <div className="max-w-6xl mx-auto px-4 py-12 border-b border-slate-800/80">
        <div className="flex items-center gap-3 mb-6">
          <Monitor className="w-5 h-5 text-amber-400" />
          <h3 className="font-cinzel text-xl font-bold text-white">
            {t.systemSpecsTitle}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300">
          {/* Minimum */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2.5">
            <div className="font-bold text-amber-400 pb-2 border-b border-slate-800">
              {t.minimum}
            </div>
            <div>{t.os}</div>
            <div>CPU: Intel Core i5-6600K / AMD Ryzen 5 1600</div>
            <div>RAM: 16 GB RAM</div>
            <div>GPU: NVIDIA GeForce GTX 1060 (6GB) / AMD Radeon RX 580</div>
            <div>{t.directx}</div>
            <div>{t.storage}</div>
          </div>

          {/* Recommended */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2.5">
            <div className="font-bold text-sky-400 pb-2 border-b border-slate-800">
              {t.recommended}
            </div>
            <div>{t.os}</div>
            <div>CPU: Intel Core i7-10700K / AMD Ryzen 7 3700X</div>
            <div>RAM: 32 GB RAM</div>
            <div>GPU: NVIDIA GeForce RTX 3060 (12GB) / AMD Radeon RX 6700 XT</div>
            <div>{t.directx}</div>
            <div>{t.storage} (NVMe SSD Recommended)</div>
          </div>
        </div>
      </div>

      {/* Community Links & Copyright */}
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-xl overflow-hidden p-0.5 bg-gradient-to-br from-amber-400 to-yellow-600 shadow-md shrink-0">
            <img
              src="/assets/ragnarok_logo.jpg"
              alt="Ragnarok: The New World Emblem"
              className="w-full h-full object-cover rounded-[10px]"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-cinzel text-base font-bold text-white tracking-wider">
                RAGNAROK: THE NEW WORLD
              </span>
              <span className="text-[10px] bg-slate-800 text-amber-400 px-2 py-0.5 rounded font-mono">
                STEAM HERO BANNER
              </span>
            </div>
          <p className="max-w-md text-slate-400 text-[11px] leading-relaxed">
            © GRAVITY Co., Ltd. & Official Licensees. All rights reserved. This page is built for the global gaming community.
          </p>
          <p className="text-[11px] text-amber-300/80 mt-2 font-medium">
            {t.darijaFarewell}
          </p>
          </div>
        </div>

        {/* Community Buttons */}
        <div className="flex items-center gap-3">
          <a
            href="https://store.steampowered.com/app/4212480/Ragnarok_The_New_World/?location=hero_banner"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400 text-slate-300 hover:text-white transition-colors"
            title="Steam Store"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M11.979 0C5.378 0 0 5.378 0 11.979c0 5.385 3.567 9.94 8.513 11.458l3.187-4.609a3.252 3.252 0 0 1-.223-.051 3.284 3.284 0 0 1-2.28-4.04l-3.95-1.632C4.37 13.987 4 15.228 4 16.54c0 3.792 2.628 6.98 6.182 7.82l2.368-3.424a3.298 3.298 0 0 1 1.705.474c1.82 1.05 2.445 3.38 1.396 5.2a3.308 3.308 0 0 1-5.198 1.396l-2.428 3.513C9.39 31.815 10.662 32 11.979 32 20.827 32 28 24.827 28 15.979S20.827 0 11.979 0z"/>
            </svg>
          </a>
          <a
            href="https://www.youtube.com/watch?v=RUjnauha-aU"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-red-400 text-slate-300 hover:text-red-400 transition-colors"
            title="YouTube Gameplay"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
          <a
            href="https://store.steampowered.com/app/4212480/Ragnarok_The_New_World/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400 text-amber-400 text-xs font-bold transition-colors"
          >
            Discord / Community
          </a>
        </div>
      </div>

    </footer>
  );
};
