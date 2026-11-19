import React from 'react';
import { SupportedLanguage } from '../utils/trackingAndLocale';

interface FooterAndSpecsProps {
  onOpenPreRegister: () => void;
  activeLanguage: SupportedLanguage;
}

export const FooterAndSpecs: React.FC<FooterAndSpecsProps> = ({ activeLanguage }) => {
  const content: Record<
    SupportedLanguage,
    {
      copyright: string;
      farewell: string;
      communityBtn: string;
      steamTitle: string;
      youtubeTitle: string;
    }
  > = {
    en: {
      copyright:
        '© Gravity Game Vision Limited & GRAVITY Co., Ltd. All rights reserved. Supported in ไทย, English, Bahasa Indonesia, and 简体中文.',
      farewell:
        'Published by Gravity Game Vision Limited • Free-to-Play PC (Windows via Steam) MMORPG with optional in-game purchases / gacha — distinct from the original 2002 Ragnarok Online. Gravity Account required via launcher.',
      communityBtn: 'Play on Steam',
      steamTitle: 'Steam Store',
      youtubeTitle: 'Gameplay Videos',
    },
    id: {
      copyright:
        '© Gravity Game Vision Limited & GRAVITY Co., Ltd. Hak cipta dilindungi. Mendukung ไทย, English, Bahasa Indonesia, dan 简体中文.',
      farewell:
        'Diterbitkan oleh Gravity Game Vision Limited • MMORPG PC (Windows via Steam) Free-to-Play dengan pembelian dalam game / gacha opsional — berbeda dari Ragnarok Online asli 2002. Memerlukan akun Gravity melalui launcher.',
      communityBtn: 'Main di Steam',
      steamTitle: 'Toko Steam',
      youtubeTitle: 'Video Gameplay',
    },
    th: {
      copyright:
        '© Gravity Game Vision Limited และ GRAVITY Co., Ltd. สงวนลิขสิทธิ์ รองรับภาษา ไทย, English, Bahasa Indonesia และ 简体中文',
      farewell:
        'ให้บริการโดย Gravity Game Vision Limited • เกม MMORPG บน PC (Windows ผ่าน Steam) เล่นฟรีพร้อมการซื้อในเกม / กาชาแบบเลือกได้ — แตกต่างจาก Ragnarok Online ต้นฉบับปี 2002 และต้องใช้บัญชี Gravity ผ่านตัวเปิดเกม',
      communityBtn: 'เล่นบน Steam',
      steamTitle: 'ร้านค้า Steam',
      youtubeTitle: 'วิดีโอเกมเพลย์',
    },
    zh: {
      copyright:
        '© Gravity Game Vision Limited 与 GRAVITY Co., Ltd. 保留所有权利。支持 ไทย、English、Bahasa Indonesia 与 简体中文。',
      farewell:
        '由 Gravity Game Vision Limited 发行 • PC（Windows 经由 Steam）免费游玩 MMORPG，含可选内购 / 扭蛋机制 —— 独立于 2002 年原版《仙境传说》，启动器登录需绑定 Gravity 账号。',
      communityBtn: '前往 Steam 游玩',
      steamTitle: 'Steam 商店',
      youtubeTitle: '实机视频',
    },
  };

  const t = content[activeLanguage] || content.en;

  return (
    <footer className="bg-[#05080f]/75 backdrop-blur-md text-slate-300 relative border-t border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
        <div className="flex items-start gap-4">
          <div className="h-12 w-auto rounded-xl overflow-hidden p-1 bg-gradient-to-r from-sky-500/30 via-pink-500/25 to-amber-500/30 border border-sky-400/50 shadow-md shrink-0 flex items-center">
            <img
              src="/assets/official_chibi_logo.png"
              alt="Ragnarok: The New World Chibi Official Crest"
              loading="lazy"
              decoding="async"
              className="h-10 w-auto object-contain rounded-lg"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="font-cinzel text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-400 to-sky-200 tracking-wider">
                RAGNARÖK: THE NEW WORLD
              </span>
              <span className="text-[10px] bg-pink-500/20 text-pink-300 border border-pink-500/30 px-2 py-0.5 rounded-full font-mono font-bold">
                GRAVITY GAME VISION LIMITED
              </span>
            </div>
            <p className="max-w-xl text-slate-400 text-[11px] leading-relaxed">{t.copyright}</p>
            <p className="text-[11px] text-amber-300/85 mt-2 font-medium">{t.farewell}</p>
          </div>
        </div>

        {/* Community Buttons */}
        <div className="flex items-center gap-3">
          <a
            href="#go2offer#"
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400 text-slate-300 hover:text-white transition-colors"
            title={t.steamTitle}
            aria-label={t.steamTitle}
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 28 32">
              <path d="M11.979 0C5.378 0 0 5.378 0 11.979c0 5.385 3.567 9.94 8.513 11.458l3.187-4.609a3.252 3.252 0 0 1-.223-.051 3.284 3.284 0 0 1-2.28-4.04l-3.95-1.632C4.37 13.987 4 15.228 4 16.54c0 3.792 2.628 6.98 6.182 7.82l2.368-3.424a3.298 3.298 0 0 1 1.705.474c1.82 1.05 2.445 3.38 1.396 5.2a3.308 3.308 0 0 1-5.198 1.396l-2.428 3.513C9.39 31.815 10.662 32 11.979 32 20.827 32 28 24.827 28 15.979S20.827 0 11.979 0z" />
            </svg>
          </a>
          <a
            href="#go2offer#"
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-red-400 text-slate-300 hover:text-red-400 transition-colors"
            title={t.youtubeTitle}
            aria-label={t.youtubeTitle}
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
          <a
            href="#go2offer#"
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400 text-amber-400 text-xs font-bold transition-colors"
          >
            {t.communityBtn}
          </a>
        </div>
      </div>
    </footer>
  );
};
