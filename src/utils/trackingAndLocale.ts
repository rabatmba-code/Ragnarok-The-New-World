export type SupportedLanguage = 'en' | 'id' | 'th' | 'zh';

export const SUPPORTED_LANGUAGES: readonly SupportedLanguage[] = ['en', 'id', 'th', 'zh'] as const;

export function normalizeLanguageCode(raw?: string | null): SupportedLanguage | null {
  if (!raw) return null;
  const lower = raw.toLowerCase().trim();
  if (lower.startsWith('id')) return 'id';
  if (lower.startsWith('th')) return 'th';
  if (lower.startsWith('zh')) return 'zh';
  if (lower.startsWith('en')) return 'en';
  return null;
}

export function detectSupportedLanguage(options: {
  search?: string;
  stored?: string | null;
  browserLanguages?: readonly string[];
}): SupportedLanguage {
  if (options.search) {
    const params = new URLSearchParams(options.search);
    const fromQuery = normalizeLanguageCode(params.get('lang'));
    if (fromQuery) return fromQuery;
  }

  const fromStorage = normalizeLanguageCode(options.stored);
  if (fromStorage) return fromStorage;

  if (options.browserLanguages && options.browserLanguages.length > 0) {
    for (const candidate of options.browserLanguages) {
      const matched = normalizeLanguageCode(candidate);
      if (matched) return matched;
    }
  }

  return 'en';
}

export function parseAbAngle(search?: string, stored?: string | null): string {
  if (search) {
    const params = new URLSearchParams(search);
    const raw = params.get('angle');
    if (raw) {
      const cleaned = raw.toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 40);
      if (cleaned) return cleaned;
    }
  }
  if (stored) {
    const cleaned = stored.toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 40);
    if (cleaned) return cleaned;
  }
  return 'default';
}

export interface AngleVariantCopy {
  badge: string;
  note: string;
}

export function getAngleHeroVariant(angle: string, lang: SupportedLanguage): AngleVariantCopy | null {
  const normalized = angle.toLowerCase();
  if (normalized === 'druid') {
    const map: Record<SupportedLanguage, AngleVariantCopy> = {
      en: {
        badge: 'NEW LAUNCH CLASS • SHAPESHIFTING DRUID',
        note: 'Command nature across 8 launch classes — transform freely with the all-new Shapeshifting Druid.',
      },
      id: {
        badge: 'KELAS BARU • DRUID PENGUBAH WUJUD',
        note: 'Kuasai 8 kelas saat rilis — berubah wujud bebas dengan kelas baru Druid yang serba bisa.',
      },
      th: {
        badge: 'อาชีพใหม่เปิดตัว • DRUID แปลงร่างได้',
        note: 'เลือกเล่นจาก 8 อาชีพตั้งแต่วันเปิดเกม — แปลงร่างได้อย่างอิสระด้วยอาชีพ Druid สุดพิเศษ',
      },
      zh: {
        badge: '首发新职业 • 多形态变形德鲁伊',
        note: '首发 8 大职业自由畅玩 —— 体验全新多形态变形职业“德鲁伊”，自由切换战斗姿态。',
      },
    };
    return map[lang];
  }

  if (normalized === 'idle') {
    const map: Record<SupportedLanguage, AngleVariantCopy> = {
      en: {
        badge: 'FREE RESETS • JOB SWITCHING • IDLE PROGRESSION',
        note: 'Zero-stress growth: free stat & skill resets, instant job switching, and smart idle progression.',
      },
      id: {
        badge: 'RESET GRATIS • GANTI JOB • PROGRES IDLE',
        note: 'Main santai tanpa ribet: reset stat & skill gratis, ganti job bebas, plus progres idle otomatis.',
      },
      th: {
        badge: 'รีเซ็ตฟรี • เปลี่ยนอาชีพได้ • ระบบฟาร์มอัตโนมัติ',
        note: 'เติบโตง่ายไม่เปลืองแรง: รีเซ็ตสเตตัสและสกิลฟรี สลับอาชีพได้อิสระ พร้อมระบบ Idle',
      },
      zh: {
        badge: '免费重置 • 自由转职 • 挂机自动成长',
        note: '轻松养成无负担：属性与技能免费重置、自由切换职业，更有智能挂机进度助力。',
      },
    };
    return map[lang];
  }

  if (normalized === 'new_era' || normalized === '2002') {
    const map: Record<SupportedLanguage, AngleVariantCopy> = {
      en: {
        badge: 'STANDALONE NEXT-GEN RELEASE • DISTINCT FROM 2002 RO',
        note: 'Published by Gravity Game Vision Limited — a brand-new Free-to-Play MMORPG separate from 2002 Ragnarok Online.',
      },
      id: {
        badge: 'RILIS STANDALONE BARU • BERBEDA DARI RO 2002',
        note: 'Diterbitkan oleh Gravity Game Vision Limited — MMORPG Free-to-Play baru yang berbeda dari Ragnarok Online 2002.',
      },
      th: {
        badge: 'เกมภาคใหม่แยกเดี่ยว • แตกต่างจาก RO ปี 2002',
        note: 'ให้บริการโดย Gravity Game Vision Limited — MMORPG เล่นฟรีภาคใหม่ที่ไม่ใช่ตัวเกม Ragnarok Online ปี 2002',
      },
      zh: {
        badge: '全新独立新作 • 不同于 2002 原版 RO',
        note: '由 Gravity Game Vision Limited 发行 —— 全新免费游玩 MMORPG，独立于 2002 年原版《仙境传说》。',
      },
    };
    return map[lang];
  }

  return null;
}

export function trackCtaClick(label: string, angle: string, lang: SupportedLanguage): void {
  if (typeof window === 'undefined') return;
  const dl = (window as unknown as { dataLayer?: Array<Record<string, unknown>> }).dataLayer;
  if (Array.isArray(dl)) {
    dl.push({
      event: 'cta_go2offer_click',
      cta_label: label,
      ab_angle: angle,
      language: lang,
      destination: '#go2offer#',
    });
  }
}
