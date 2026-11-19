import React, { useEffect, useState } from 'react';
import { Shield } from 'lucide-react';
import { SupportedLanguage } from '../utils/trackingAndLocale';

interface ConsentBannerProps {
  activeLanguage: SupportedLanguage;
}

const CONSENT_TEXT: Record<
  SupportedLanguage,
  { title: string; body: string; accept: string; essential: string }
> = {
  en: {
    title: 'Privacy & Consent Preferences',
    body: 'We use Google Consent Mode to respect your analytics and measurement preferences.',
    accept: 'Accept All',
    essential: 'Essential Only',
  },
  id: {
    title: 'Preferensi Privasi & Persetujuan',
    body: 'Kami menggunakan Google Consent Mode untuk menghormati preferensi analitik Anda.',
    accept: 'Terima Semua',
    essential: 'Esensial Saja',
  },
  th: {
    title: 'การตั้งค่าความเป็นส่วนตัวและความยินยอม',
    body: 'เราใช้ Google Consent Mode เพื่อเคารพการตั้งค่าการวิเคราะห์ข้อมูลของคุณ',
    accept: 'ยอมรับทั้งหมด',
    essential: 'เฉพาะที่จำเป็น',
  },
  zh: {
    title: '隐私与同意偏好设置',
    body: '本站采用 Google Consent Mode，充分尊重您的分析与衡量偏好。',
    accept: '全部接受',
    essential: '仅限必要',
  },
};

declare global {
  interface Window {
    __updateRoConsent?: (allowAll: boolean) => void;
    __RO_INITIAL_LANG__?: SupportedLanguage;
    __RO_AB_ANGLE__?: string;
  }
}

export const ConsentBanner: React.FC<ConsentBannerProps> = ({ activeLanguage }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ro_consent_state');
      if (saved !== 'granted' && saved !== 'denied') {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const t = CONSENT_TEXT[activeLanguage] || CONSENT_TEXT.en;

  const handleChoice = (allowAll: boolean) => {
    if (typeof window !== 'undefined' && typeof window.__updateRoConsent === 'function') {
      window.__updateRoConsent(allowAll);
    } else {
      try {
        localStorage.setItem('ro_consent_state', allowAll ? 'granted' : 'denied');
      } catch {
        // ignore storage restrictions
      }
    }
    setVisible(false);
  };

  return (
    <aside
      role="dialog"
      aria-label={t.title}
      className="fixed bottom-4 right-4 z-50 max-w-sm w-[calc(100%-2rem)] bg-slate-950/95 border border-slate-700/80 rounded-2xl p-4 shadow-2xl backdrop-blur-md"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-sky-500/15 border border-sky-400/30 flex items-center justify-center text-sky-300 shrink-0 mt-0.5">
          <Shield className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-bold text-white mb-1">{t.title}</div>
          <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
            {t.body}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleChoice(true)}
              className="flex-1 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold transition-colors cursor-pointer"
            >
              {t.accept}
            </button>
            <button
              type="button"
              onClick={() => handleChoice(false)}
              className="flex-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
            >
              {t.essential}
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
