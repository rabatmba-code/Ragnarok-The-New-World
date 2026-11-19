import React from 'react';
import {
  ShieldCheck,
  Sparkles,
  Users,
  Crown,
  Swords,
  Compass,
  RotateCcw,
  RefreshCw,
  Clock,
  Cpu,
  HardDrive,
  Wifi,
  Globe,
  CheckCircle2,
  ArrowRight,
  Info,
} from 'lucide-react';
import { SupportedLanguage } from '../utils/trackingAndLocale';
import { LAUNCH_CLASSES_VIDEO_URL } from '../utils/mediaAssets';

interface LaunchOverviewAndGuideProps {
  activeLanguage: SupportedLanguage;
  onChangeLanguage?: (lang: SupportedLanguage) => void;
}

interface FeatureItem {
  title: string;
  desc: string;
  badge?: string;
}

interface StepItem {
  num: string;
  title: string;
  desc: string;
}

interface OverviewCopy {
  sectionTag: string;
  sectionTitle: string;
  sectionSub: string;
  identityTitle: string;
  publisherLabel: string;
  publisherValue: string;
  platformLabel: string;
  platformValue: string;
  modelLabel: string;
  modelValue: string;
  accountLabel: string;
  accountValue: string;
  distinctionBadge: string;
  distinctionTitle: string;
  distinctionBody: string;
  pillF2p: string;
  pillLauncher: string;
  pillClasses: string;
  featuresTitle: string;
  featuresSub: string;
  rosterLink: string;
  features: FeatureItem[];
  stepsTag: string;
  stepsTitle: string;
  stepsSub: string;
  stepPrefix: string;
  steps: StepItem[];
  stepsCta: string;
  reqTitle: string;
  reqSub: string;
  minRamLabel: string;
  minRamVal: string;
  recRamLabel: string;
  recRamVal: string;
  storageLabel: string;
  storageVal: string;
  networkLabel: string;
  networkVal: string;
  langTitle: string;
  langSub: string;
  langHint: string;
  bottomCta: string;
}

const COPY: Record<SupportedLanguage, OverviewCopy> = {
  en: {
    sectionTag: 'OFFICIAL PC RELEASE BRIEFING',
    sectionTitle: 'Transparent Facts Before Entering Midgard',
    sectionSub:
      'Clear official details on platform (PC Windows via Steam), Free-to-Play model with optional in-game purchases/gacha, Gravity Account launcher login, 8 launch classes, and PC specs.',
    identityTitle: 'Concept, Platform & Transparency',
    publisherLabel: 'Official Publisher',
    publisherValue: 'Gravity Game Vision Limited',
    platformLabel: 'Platform',
    platformValue: 'PC (Windows via Steam)',
    modelLabel: 'Monetization Model',
    modelValue: 'Free-to-Play (optional in-game purchases & gacha)',
    accountLabel: 'Account Requirement',
    accountValue: 'Gravity Account required via the game launcher',
    distinctionBadge: 'IMPORTANT DISTINCTION',
    distinctionTitle: 'New PC Release — Not the Classic 2002 Ragnarok Online',
    distinctionBody:
      'Ragnarok: The New World is a standalone next-generation PC MMORPG (Windows via Steam) published by Gravity Game Vision Limited. It is completely separate from the classic 2002 Ragnarok Online client — featuring a seamless 3D open world, 8 launch classes, transparent optional in-game purchases/gacha, and required Gravity Account sign-in from the launcher.',
    pillF2p: 'Free-to-Play + Optional Gacha',
    pillLauncher: 'Gravity Account in Launcher',
    pillClasses: '8 Launch Classes',
    featuresTitle: '8 Launch Classes & Core Gameplay Features',
    featuresSub:
      'Built for both competitive squads and relaxed daily progression — featuring the all-new shapeshifting Druid.',
    rosterLink: 'View All 8 Launch Classes',
    features: [
      {
        title: '8 Launch Classes & Shapeshifting Druid',
        desc: 'Start with 8 distinct jobs at launch, headlined by the multi-form Druid capable of shifting between beast, eagle, and mystic forms.',
        badge: 'NEW DRUID',
      },
      {
        title: 'Multiplayer Co-op',
        desc: 'Team up across seamless servers for party dungeons, cooperative quests, and coordinated raids.',
      },
      {
        title: 'Guilds & Alliances',
        desc: 'Found or join a Guild, unlock shared guild halls, and dominate server-wide territory wars.',
      },
      {
        title: 'Epic Boss Battles',
        desc: 'Challenge iconic Midgard MVP bosses with telegraphed mechanics, team roles, and rare drops.',
      },
      {
        title: 'Open-World Exploration',
        desc: 'Roam seamlessly across 360° Midgard landscapes, cities, peaks, and secret landmarks without loading walls.',
      },
      {
        title: 'Free Stat & Skill Resets',
        desc: 'Experiment with builds freely — reset your attribute points and skill trees at zero cost.',
      },
      {
        title: 'Flexible Job Switching',
        desc: 'Adapt to any party need by switching jobs seamlessly on your adventurer without starting over.',
      },
      {
        title: 'Idle Progression',
        desc: 'Keep advancing even on busy days with built-in smart idle progression that supports steady growth.',
      },
    ],
    stepsTag: 'FIRST LOGIN ROADMAP',
    stepsTitle: '5 Simple Steps to Your First Login',
    stepsSub: 'Go from Steam download to exploring Midgard using your Gravity Account in the launcher.',
    stepPrefix: 'STEP',
    steps: [
      {
        num: '01',
        title: 'Install Free on PC via Steam',
        desc: 'Visit the official Steam store page on Windows PC and download the Free-to-Play client (~30 GB).',
      },
      {
        num: '02',
        title: 'Open Launcher via Steam',
        desc: 'Start Ragnarok: The New World from your Steam Library to open the official game launcher.',
      },
      {
        num: '03',
        title: 'Sign In with Gravity Account',
        desc: 'Log in or create your mandatory Gravity Account directly inside the launcher to bind your progress.',
      },
      {
        num: '04',
        title: 'Pick Language & Launch Class',
        desc: 'Choose Thai, English, Indonesian, or Simplified Chinese, then pick from 8 classes including Druid.',
      },
      {
        num: '05',
        title: 'Complete First Login in Midgard',
        desc: 'Enter Prontera, join a Guild, activate Idle Progression, and claim your starter launch rewards.',
      },
    ],
    stepsCta: 'Start Step 1 on Steam Now',
    reqTitle: 'Announced PC System Requirements',
    reqSub: 'Official Windows PC baseline hardware & connection specs for smooth performance.',
    minRamLabel: 'Minimum Memory',
    minRamVal: '12 GB RAM',
    recRamLabel: 'Recommended Memory',
    recRamVal: '16 GB RAM',
    storageLabel: 'Storage Space',
    storageVal: '~30 GB Available Space',
    networkLabel: 'Network Connection',
    networkVal: 'Fast Broadband Internet',
    langTitle: '4 Officially Supported Languages',
    langSub: 'Switch seamlessly between ไทย, EN, ID, and 简中 — the entire page updates immediately.',
    langHint: 'Click any language below to switch all content on this page:',
    bottomCta: 'Download & Play Free on PC',
  },
  id: {
    sectionTag: 'RINGKASAN RESMI RILIS PC',
    sectionTitle: 'Informasi Transparan Sebelum Memasuki Midgard',
    sectionSub:
      'Penjelasan jujur soal platform PC (Windows via Steam), model Free-to-Play dengan pembelian dalam game/gacha opsional, kewajiban Akun Gravity di launcher, 8 kelas, dan spesifikasi PC.',
    identityTitle: 'Konsep, Platform & Transparansi',
    publisherLabel: 'Penerbit Resmi',
    publisherValue: 'Gravity Game Vision Limited',
    platformLabel: 'Platform',
    platformValue: 'PC (Windows via Steam)',
    modelLabel: 'Model Monetisasi',
    modelValue: 'Free-to-Play (pembelian opsional dalam game & gacha)',
    accountLabel: 'Kebutuhan Akun',
    accountValue: 'Wajib login Akun Gravity dari launcher game',
    distinctionBadge: 'PERBEDAAN PENTING',
    distinctionTitle: 'Game PC Baru — Bukan Ragnarok Online Klasik 2002',
    distinctionBody:
      'Ragnarok: The New World adalah MMORPG PC generasi baru (Windows via Steam) dari Gravity Game Vision Limited. Game ini terpisah sepenuhnya dari Ragnarok Online klasik tahun 2002, dengan dunia terbuka 3D modern, 8 kelas rilis, info jelas soal pembelian dalam game/gacha, serta login wajib Akun Gravity melalui launcher.',
    pillF2p: 'Free-to-Play + Gacha Opsional',
    pillLauncher: 'Akun Gravity di Launcher',
    pillClasses: '8 Kelas Rilis',
    featuresTitle: '8 Kelas Rilis & Fitur Gameplay Utama',
    featuresSub:
      'Dirancang untuk pemain kompetitif maupun santai — menampilkan kelas baru Druid pengubah wujud.',
    rosterLink: 'Lihat Semua 8 Kelas Rilis',
    features: [
      {
        title: '8 Kelas Rilis & Druid Pengubah Wujud',
        desc: 'Tersedia 8 kelas sejak peluncuran, dipimpin oleh kelas Druid multi-wujud yang dapat berubah bentuk dalam pertempuran.',
        badge: 'DRUID BARU',
      },
      {
        title: 'Multiplayer Co-op',
        desc: 'Bermain bersama teman lintas server untuk menaklukkan dungeon, misi tim, dan raid besar.',
      },
      {
        title: 'Guild & Aliansi',
        desc: 'Bangun atau gabung Guild, kembangkan markas bersama, dan menangkan pertempuran antar-guild.',
      },
      {
        title: 'Pertarungan Bos (MVP)',
        desc: 'Hadapi bos raksasa legendaris dengan mekanik strategis, kerja sama tim, dan drop langka.',
      },
      {
        title: 'Eksplorasi Dunia Terbuka',
        desc: 'Jelajahi dunia Midgard 360° tanpa batas, dari kota Prontera hingga puncak gunung dan pantai tersembunyi.',
      },
      {
        title: 'Reset Stat & Skill Gratis',
        desc: 'Bebas bereksperimen dengan build karakter — reset statistik dan skill sepenuhnya gratis.',
      },
      {
        title: 'Ganti Job Fleksibel',
        desc: 'Ubah pekerjaan (Job Switching) sesuai kebutuhan tim tanpa perlu membuat karakter baru dari nol.',
      },
      {
        title: 'Progres Otomatis (Idle Progression)',
        desc: 'Tetap berkembang bahkan saat sibuk berkat sistem progres otomatis (Idle) yang cerdas.',
      },
    ],
    stepsTag: 'PANDUAN FIRST LOGIN',
    stepsTitle: '5 Langkah Mudah Menuju Login Pertama (First Login)',
    stepsSub: 'Mulai petualanganmu di PC Windows via Steam dan login Akun Gravity di launcher.',
    stepPrefix: 'LANGKAH',
    steps: [
      {
        num: '01',
        title: 'Unduh Gratis di PC via Steam',
        desc: 'Buka halaman resmi Steam di PC Windows dan unduh klien Free-to-Play (~30 GB).',
      },
      {
        num: '02',
        title: 'Buka Launcher lewat Steam',
        desc: 'Jalankan Ragnarok: The New World dari Steam Library untuk membuka launcher resmi.',
      },
      {
        num: '03',
        title: 'Masuk dengan Akun Gravity',
        desc: 'Login atau buat Akun Gravity wajib langsung di launcher untuk menyimpan progres karakter.',
      },
      {
        num: '04',
        title: 'Pilih Bahasa & Kelas Rilis',
        desc: 'Pilih Thai, Inggris, Indonesia, atau Mandarin Sederhana, lalu pilih 1 dari 8 kelas termasuk Druid.',
      },
      {
        num: '05',
        title: 'Selesaikan Login Pertama di Midgard',
        desc: 'Masuki Prontera, bergabung dengan Guild, aktifkan Idle Progression, dan klaim hadiah peluncuran.',
      },
    ],
    stepsCta: 'Mulai Langkah 1 di Steam Sekarang',
    reqTitle: 'Spesifikasi PC Resmi yang Diumumkan',
    reqSub: 'Kebutuhan perangkat keras PC Windows dan koneksi internet untuk performa optimal.',
    minRamLabel: 'RAM Minimum',
    minRamVal: '12 GB RAM',
    recRamLabel: 'RAM Direkomendasikan',
    recRamVal: '16 GB RAM',
    storageLabel: 'Ruang Penyimpanan',
    storageVal: 'Sekitar 30 GB Ruang Kosong',
    networkLabel: 'Koneksi Internet',
    networkVal: 'Internet Broadband Cepat',
    langTitle: '4 Bahasa Resmi yang Didukung',
    langSub: 'Ganti dengan mulus antara ไทย, EN, ID, dan 简中 — seluruh isi halaman langsung ikut berubah.',
    langHint: 'Klik bahasa di bawah untuk langsung menerjemahkan seluruh halaman:',
    bottomCta: 'Unduh & Main Gratis di PC',
  },
  th: {
    sectionTag: 'ข้อมูลอย่างเป็นทางการสำหรับเวอร์ชัน PC',
    sectionTitle: 'ข้อมูลชัดเจนโปร่งใสก่อนออกผจญภัยใน Midgard',
    sectionSub:
      'รายละเอียดชัดเจนสำหรับแพลตฟอร์ม PC (Windows ผ่าน Steam) รูปแบบเล่นฟรีที่มีการซื้อในเกม/กาชา การล็อกอินบัญชี Gravity ผ่าน Launcher 8 อาชีพวันเปิดตัว และสเปก PC',
    identityTitle: 'แนวคิดเกม แพลตฟอร์ม และความโปร่งใส',
    publisherLabel: 'ผู้ให้บริการอย่างเป็นทางการ',
    publisherValue: 'Gravity Game Vision Limited',
    platformLabel: 'แพลตฟอร์ม',
    platformValue: 'PC (Windows ผ่าน Steam)',
    modelLabel: 'รูปแบบการให้บริการ',
    modelValue: 'เล่นฟรี Free-to-Play (มีการซื้อในเกมและกาชาแบบเลือกซื้อ)',
    accountLabel: 'ข้อกำหนดบัญชีผู้ใช้',
    accountValue: 'จำเป็นต้องล็อกอินบัญชี Gravity ผ่านตัว Launcher ของเกม',
    distinctionBadge: 'ข้อแตกต่างที่สำคัญ',
    distinctionTitle: 'เกม PC ภาคใหม่ — ไม่ใช่ Ragnarok Online คลาสสิกปี 2002',
    distinctionBody:
      'Ragnarok: The New World คือเกม MMORPG ยุคใหม่บน PC (Windows ผ่าน Steam) โดย Gravity Game Vision Limited แยกจากตัวเกม Ragnarok Online คลาสสิกปี 2002 อย่างสมบูรณ์ มาพร้อมโลกเปิด 3D ไร้รอยต่อ 8 อาชีพเปิดตัว รายละเอียดการซื้อในเกม/กาชาที่โปร่งใส และต้องล็อกอินบัญชี Gravity ผ่าน Launcher',
    pillF2p: 'เล่นฟรี + กาชา/ไอเทมเสริม',
    pillLauncher: 'บัญชี Gravity ใน Launcher',
    pillClasses: '8 อาชีพเปิดตัว',
    featuresTitle: '8 อาชีพเปิดตัวและฟีเจอร์เด่นของเกม',
    featuresSub:
      'รองรับทั้งสายลุยปาร์ตี้และสายเล่นสบาย — โดดเด่นด้วยอาชีพ Druid แปลงร่างได้หลายรูปแบบ',
    rosterLink: 'ดูทั้ง 8 อาชีพวันเปิดตัว',
    features: [
      {
        title: '8 อาชีพวันเปิดตัว พร้อม Druid แปลงร่าง',
        desc: 'เลือกเล่นได้ 8 อาชีพตั้งแต่วันแรก นำโดยอาชีพ Druid ที่สามารถแปลงร่างได้หลากหลายรูปแบบตามสถานการณ์',
        badge: 'DRUID ใหม่',
      },
      {
        title: 'เล่นร่วมกันแบบ Multiplayer',
        desc: 'รวมทีมกับเพื่อนข้ามเซิร์ฟเวอร์ ลุยดันเจี้ยน เควสต์ปาร์ตี้ และศึกเรดสุดมันส์',
      },
      {
        title: 'ระบบกิลด์ (Guilds)',
        desc: 'สร้างหรือเข้าร่วมกิลด์ พัฒนาฐานที่มั่น และร่วมศึกชิงดินแดนอันยิ่งใหญ่',
      },
      {
        title: 'ศึกพิชิตบอส (Boss Battles)',
        desc: 'ท้าทายบอส MVP สุดโหดด้วยแมคคานิกการต่อสู้ที่ต้องอาศัยจังหวะและทีมเวิร์ก',
      },
      {
        title: 'สำรวจโลกเปิด (Open-World)',
        desc: 'ออกสำรวจทวีป Midgard 360° ได้อย่างอิสระทั้งเมืองพรอนเทร่า ภูเขา และพื้นที่ลับ',
      },
      {
        title: 'รีเซ็ตสเตตัสและสกิลฟรี',
        desc: 'ทดลองสายการเล่นได้เต็มที่ รีเซ็ตค่าสถานะและสกิลฟรีโดยไม่มีค่าใช้จ่าย',
      },
      {
        title: 'สลับอาชีพได้อย่างอิสระ (Job Switching)',
        desc: 'ปรับเปลี่ยนอาชีพให้เข้ากับปาร์ตี้ได้ทันทีโดยไม่ต้องเริ่มปั้นตัวละครใหม่',
      },
      {
        title: 'ระบบพัฒนาอัตโนมัติ (Idle Progression)',
        desc: 'เติบโตต่อเนื่องแม้ไม่มีเวลาเฝ้าหน้าจอด้วยระบบ Idle อัจฉริยะ',
      },
    ],
    stepsTag: 'ขั้นตอนเข้าเล่นครั้งแรก',
    stepsTitle: '5 ขั้นตอนง่ายๆ สู่การเข้าสู่ระบบครั้งแรก (First Login)',
    stepsSub: 'เข้าสู่โลก Midgard บน Windows PC ผ่าน Steam และล็อกอินบัญชี Gravity ใน Launcher',
    stepPrefix: 'ขั้นตอน',
    steps: [
      {
        num: '01',
        title: 'ดาวน์โหลดฟรีบน PC ผ่าน Steam',
        desc: 'ไปที่หน้าร้านค้า Steam บน Windows PC และดาวน์โหลดตัวเกมเล่นฟรี (~30 GB)',
      },
      {
        num: '02',
        title: 'เปิด Launcher ผ่าน Steam',
        desc: 'เปิด Ragnarok: The New World จากคลังเกม Steam เพื่อเข้าสู่ตัว Launcher อย่างเป็นทางการ',
      },
      {
        num: '03',
        title: 'ล็อกอินด้วยบัญชี Gravity',
        desc: 'เข้าสู่ระบบหรือสมัครบัญชี Gravity ที่จำเป็นภายใน Launcher เพื่อผูกข้อมูลผู้เล่น',
      },
      {
        num: '04',
        title: 'เลือกภาษาและอาชีพเริ่มต้น',
        desc: 'เลือกภาษาไทย อังกฤษ อินโดนีเซีย หรือจีนตัวย่อ แล้วเลือก 1 จาก 8 อาชีพ รวมถึง Druid',
      },
      {
        num: '05',
        title: 'เข้าสู่โลก Midgard ครั้งแรกสำเร็จ',
        desc: 'ก้าวเข้าสู่เมืองพรอนเทร่า เข้าร่วมกิลด์ เปิดระบบ Idle และรับของรางวัลเปิดตัวทันที',
      },
    ],
    stepsCta: 'เริ่มขั้นตอนที่ 1 บน Steam เลย',
    reqTitle: 'ความต้องการระบบ PC ที่ประกาศอย่างเป็นทางการ',
    reqSub: 'สเปก Windows PC และการเชื่อมต่ออินเทอร์เน็ตเพื่อให้เล่นได้อย่างลื่นไหล',
    minRamLabel: 'หน่วยความจำขั้นต่ำ (RAM)',
    minRamVal: '12 GB RAM',
    recRamLabel: 'หน่วยความจำที่แนะนำ (RAM)',
    recRamVal: '16 GB RAM',
    storageLabel: 'พื้นที่จัดเก็บข้อมูล',
    storageVal: 'ประมาณ 30 GB',
    networkLabel: 'การเชื่อมต่ออินเทอร์เน็ต',
    networkVal: 'อินเทอร์เน็ตความเร็วสูง',
    langTitle: 'รองรับ 4 ภาษาอย่างเป็นทางการ',
    langSub: 'สลับได้ทันทีระหว่าง ไทย, EN, ID และ 简中 — เนื้อหาทั้งหน้าเปลี่ยนภาษาทันที',
    langHint: 'คลิกภาษาด้านล่างเพื่อเปลี่ยนภาษาทั้งหน้าเว็บทันที:',
    bottomCta: 'ดาวน์โหลดและเล่นฟรีบน PC',
  },
  zh: {
    sectionTag: '官方 PC 上线核心指南',
    sectionTitle: '踏入米德加尔特前的透明官方说明',
    sectionSub:
      '清晰披露 PC（Windows Steam 平台）定位、免费游玩及可选内购/抽卡机制、启动器登录 Gravity 账号要求、首发 8 大职业与官方 PC 配置。',
    identityTitle: '游戏定位、平台与透明说明',
    publisherLabel: '官方发行商',
    publisherValue: 'Gravity Game Vision Limited',
    platformLabel: '运行平台',
    platformValue: 'PC（Windows Steam 平台）',
    modelLabel: '收费模式',
    modelValue: '免费游玩（含游戏内可选内购与抽卡/扭蛋）',
    accountLabel: '账号要求',
    accountValue: '需通过游戏启动器登录 Gravity 账号',
    distinctionBadge: '重要区分说明',
    distinctionTitle: '全新 PC 独立新作 —— 非 2002 年经典原版 RO',
    distinctionBody:
      '《Ragnarok: The New World》是由 Gravity Game Vision Limited 发行的全新次世代 PC MMORPG（Windows Steam 平台），完全独立于 2002 年经典原版《仙境传说》。采用无缝 3D 开放世界与首发 8 大职业，公开透明说明可选内购/抽卡内容，并需通过启动器登录 Gravity 账号进入游戏。',
    pillF2p: '免费游玩 + 可选抽卡内购',
    pillLauncher: '启动器登录 Gravity 账号',
    pillClasses: '首发 8 大职业',
    featuresTitle: '首发 8 大职业与核心玩法亮点',
    featuresSub:
      '兼顾硬核开荒与轻松护肝 —— 首发即含全新多形态变形职业“德鲁伊（Druid）”。',
    rosterLink: '查看全部 8 大首发职业',
    features: [
      {
        title: '首发 8 大职业与变形德鲁伊',
        desc: '上线即开放 8 大特色职业，重磅推出多形态“德鲁伊（Druid）”，可在多种战斗形态间自由切换。',
        badge: '全新德鲁伊',
      },
      {
        title: '多人合作联机',
        desc: '与好友跨服组队挑战团队副本、协作任务与大型世界事件。',
      },
      {
        title: '公会系统（Guilds）',
        desc: '创建或加入公会，共建公会领地，携手征战全服公会战。',
      },
      {
        title: '史诗首领战（MVP）',
        desc: '挑战经典世界首领，配合机制走位赢取稀有卡片与装备掉落。',
      },
      {
        title: '开放世界自由探索',
        desc: '360° 无缝畅游米德加尔特大陆，自由攀爬、飞行并发现隐藏奇观。',
      },
      {
        title: '属性与技能免费重置',
        desc: '零成本自由洗点，随时尝试不同流派构筑，告别加点焦虑。',
      },
      {
        title: '自由切换职业',
        desc: '根据队伍需求灵活切换职业，无需重新练号即可体验多样定位。',
      },
      {
        title: '挂机自动成长（Idle Progression）',
        desc: '内置智能离线/挂机进度机制，碎片时间也能稳步提升战力。',
      },
    ],
    stepsTag: '首次登录流程',
    stepsTitle: '5 步轻松完成首次登录（First Login）',
    stepsSub: '在 Windows PC 上通过 Steam 下载，并在启动器内登录 Gravity 账号即可畅玩。',
    stepPrefix: '步骤',
    steps: [
      {
        num: '01',
        title: '在 Steam 免费下载 PC 客户端',
        desc: '前往 Windows Steam 官方页面，免费下载约 30 GB 客户端。',
      },
      {
        num: '02',
        title: '通过 Steam 打开官方启动器',
        desc: '从 Steam 游戏库启动《Ragnarok: The New World》以打开官方游戏启动器。',
      },
      {
        num: '03',
        title: '在启动器登录 Gravity 账号',
        desc: '在启动器内登录或注册必需的 Gravity 账号，安全绑定您的冒险进度。',
      },
      {
        num: '04',
        title: '选择语言并创建首发职业',
        desc: '支持泰语、英语、印尼语及简体中文，在包含德鲁伊在内的 8 大职业中创建角色。',
      },
      {
        num: '05',
        title: '完成首次登录开启冒险',
        desc: '抵达普隆德拉，加入公会、开启挂机进度并领取首发上线福利。',
      },
    ],
    stepsCta: '立即前往 Steam 开始第 1 步',
    reqTitle: '官方公布的 PC 运行配置要求',
    reqSub: 'Windows PC 流畅体验米德加尔特开放世界的官方配置与网络标准。',
    minRamLabel: '最低内存要求',
    minRamVal: '12 GB RAM',
    recRamLabel: '推荐内存配置',
    recRamVal: '16 GB RAM',
    storageLabel: '所需存储空间',
    storageVal: '约 30 GB 可用空间',
    networkLabel: '网络要求',
    networkVal: '高速宽带网络连接',
    langTitle: '官方支持 4 种语言',
    langSub: '支持 ไทย、EN、ID、简中无缝切换 —— 点击即可同步翻译整页内容。',
    langHint: '点击下方任意语言即可立即切换整页语言：',
    bottomCta: '立即在 PC 免费下载游玩',
  },
};

const FEATURE_ICONS = [
  Sparkles,
  Users,
  Crown,
  Swords,
  Compass,
  RotateCcw,
  RefreshCw,
  Clock,
];

const LANGUAGE_CARDS: Array<{ code: SupportedLanguage; native: string; label: string }> = [
  { code: 'th', native: 'ภาษาไทย', label: 'ไทย' },
  { code: 'en', native: 'English', label: 'EN' },
  { code: 'id', native: 'Bahasa Indonesia', label: 'ID' },
  { code: 'zh', native: '简体中文', label: '简中' },
];

export const LaunchOverviewAndGuide: React.FC<LaunchOverviewAndGuideProps> = ({
  activeLanguage,
  onChangeLanguage,
}) => {
  const t = COPY[activeLanguage] || COPY.en;

  return (
    <section
      id="official-guide"
      className="py-20 lg:py-24 bg-[#070c17]/50 backdrop-blur-[2px] relative overflow-hidden border-b border-slate-800/80"
    >
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t.sectionTag}</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            {t.sectionTitle}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {t.sectionSub}
          </p>
        </div>

        {/* BLOCK 1: Concept, Platform, Monetization Transparency & 2002 Distinction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <h3 className="font-cinzel text-xl font-bold text-white mb-5 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
                <span>{t.identityTitle}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">
                    {t.publisherLabel}
                  </div>
                  <div className="text-sm font-extrabold text-sky-300">
                    {t.publisherValue}
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">
                    {t.platformLabel}
                  </div>
                  <div className="text-sm font-extrabold text-white">
                    {t.platformValue}
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">
                    {t.modelLabel}
                  </div>
                  <div className="text-sm font-bold text-emerald-300">
                    {t.modelValue}
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">
                    {t.accountLabel}
                  </div>
                  <div className="text-sm font-bold text-amber-300">
                    {t.accountValue}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-gradient-to-br from-slate-900/95 via-[#0c1428] to-slate-900/90 border border-amber-500/35 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-500/15 border border-amber-400/40 text-amber-300 text-[11px] font-extrabold uppercase tracking-wider mb-4">
                <Info className="w-3.5 h-3.5" />
                <span>{t.distinctionBadge}</span>
              </div>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-black text-white mb-3 leading-snug">
                {t.distinctionTitle}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {t.distinctionBody}
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-300">
                <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-emerald-300 font-bold">
                  {t.pillF2p}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-sky-300 font-bold">
                  {t.pillLauncher}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-amber-300 font-bold">
                  {t.pillClasses}
                </span>
              </div>
              <a
                href="#go2offer#"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold transition-all shadow-md shadow-amber-400/20"
              >
                <span>{t.bottomCta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* BLOCK 2: Gameplay Video Showcase + 8 Core Features & 8 Launch Classes */}
        <div className="space-y-10">
          {/* Official Classes & Gameplay Video Directly Above 8 Launch Classes */}
          <div className="relative rounded-3xl overflow-hidden border border-sky-400/35 bg-slate-950/90 shadow-2xl shadow-sky-950/40">
            <div className="relative aspect-video w-full bg-black">
              <video
                src={LAUNCH_CLASSES_VIDEO_URL}
                poster="/assets/aistudio/image_2f98b010.png"
                autoPlay
                loop
                muted
                playsInline
                controls
                preload="auto"
                data-testid="classes-showcase-video"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h3
                data-testid="launch-classes-heading"
                className="font-cinzel text-2xl sm:text-3xl font-black text-white"
              >
                {t.featuresTitle}
              </h3>
              <p className="text-slate-400 text-sm sm:text-base mt-1.5">
                {t.featuresSub}
              </p>
            </div>
            <a
              href="#classes"
              className="text-xs font-bold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1.5 self-start md:self-auto"
            >
              <span>{t.rosterLink}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.features.map((feat, idx) => {
              const Icon = FEATURE_ICONS[idx] || Sparkles;
              const isDruidCard = idx === 0;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                    isDruidCard
                      ? 'bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-950 border-emerald-400/50 shadow-lg shadow-emerald-500/10'
                      : 'bg-slate-900/75 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3.5">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                          isDruidCard
                            ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300'
                            : 'bg-sky-500/10 border-sky-500/25 text-sky-300'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      {feat.badge && (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-extrabold tracking-wider">
                          {feat.badge}
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-white text-sm sm:text-base mb-2 leading-snug">
                      {feat.title}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BLOCK 3: 5 Steps to First Login */}
        <div className="bg-slate-900/75 border border-slate-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest mb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{t.stepsTag}</span>
              </div>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-black text-white">
                {t.stepsTitle}
              </h3>
              <p className="text-slate-400 text-sm sm:text-base mt-1">
                {t.stepsSub}
              </p>
            </div>
            <a
              href="#go2offer#"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white text-sm font-extrabold shadow-lg shadow-blue-600/25 transition-all shrink-0"
            >
              <span>{t.stepsCta}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {t.steps.map((step) => (
              <div
                key={step.num}
                className="relative p-5 rounded-2xl bg-slate-950/85 border border-slate-800 hover:border-sky-500/40 transition-colors flex flex-col"
              >
                <div className="text-xs font-mono font-black text-amber-400 mb-2">
                  {t.stepPrefix} {step.num}
                </div>
                <h4 className="font-bold text-white text-sm mb-2 leading-snug">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* BLOCK 4: Announced PC Requirements & 4 Supported Languages */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="mb-6">
              <h3 className="font-cinzel text-2xl font-black text-white flex items-center gap-2.5">
                <Cpu className="w-5 h-5 text-sky-400 shrink-0" />
                <span>{t.reqTitle}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {t.reqSub}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800">
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                  {t.minRamLabel}
                </div>
                <div className="text-xl font-cinzel font-black text-amber-300">
                  {t.minRamVal}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/90 border border-sky-500/35">
                <div className="text-[11px] uppercase tracking-wider text-sky-300 font-bold mb-1">
                  {t.recRamLabel}
                </div>
                <div className="text-xl font-cinzel font-black text-white">
                  {t.recRamVal}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0">
                  <HardDrive className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                    {t.storageLabel}
                  </div>
                  <div className="text-sm sm:text-base font-extrabold text-white">
                    {t.storageVal}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-300 shrink-0">
                  <Wifi className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                    {t.networkLabel}
                  </div>
                  <div className="text-sm sm:text-base font-extrabold text-white">
                    {t.networkVal}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <h3 className="font-cinzel text-2xl font-black text-white flex items-center gap-2.5">
                <Globe className="w-5 h-5 text-amber-400 shrink-0" />
                <span>{t.langTitle}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 mb-4">
                {t.langSub}
              </p>
              <p className="text-[11px] text-slate-400 mb-3">
                {t.langHint}
              </p>

              <div className="grid grid-cols-2 gap-3">
                {LANGUAGE_CARDS.map((lang) => {
                  const isActive = activeLanguage === lang.code;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => onChangeLanguage?.(lang.code)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        isActive
                          ? 'bg-amber-400/15 border-amber-400 text-white shadow-md shadow-amber-500/10'
                          : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono font-black text-amber-400">
                          {lang.label}
                        </span>
                        {isActive && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                        )}
                      </div>
                      <div className="text-sm font-bold text-white">
                        {lang.native}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <a
              href="#go2offer#"
              className="mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 text-sm font-extrabold shadow-lg shadow-amber-500/20 transition-all"
            >
              <span>{t.bottomCta}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
