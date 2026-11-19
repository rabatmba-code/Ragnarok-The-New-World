import React, { useState } from 'react';
import { Swords, Zap, Sparkles, BarChart3, Award } from 'lucide-react';
import { GAME_CLASSES, GameClass, calculateClassMatch } from '../utils/gameData';
import { SupportedLanguage } from '../utils/trackingAndLocale';

interface ClassSelectorProps {
  activeLanguage: SupportedLanguage;
}

interface ClassLocalizedMeta {
  title: string;
  playstyle: string;
  quote: string;
}

export const ClassSelector: React.FC<ClassSelectorProps> = ({ activeLanguage }) => {
  const [selectedClassId, setSelectedClassId] = useState<string>('druid');
  const [quizMode, setQuizMode] = useState(false);

  const [combatChoice, setCombatChoice] = useState<
    'frontline' | 'magic' | 'ranged' | 'stealth' | 'healing' | 'wealth' | 'shapeshift'
  >('shapeshift');
  const [roleChoice, setRoleChoice] = useState<'lead' | 'support' | 'solo'>('lead');
  const [goalChoice, setGoalChoice] = useState<'dungeon' | 'pvp' | 'trading' | 'social'>('dungeon');
  const [quizResult, setQuizResult] = useState<GameClass | null>(null);

  const currentClass = GAME_CLASSES.find((c) => c.id === selectedClassId) || GAME_CLASSES[0];

  const handleRunQuiz = () => {
    const matched = calculateClassMatch({
      preferredCombat: combatChoice,
      teamRole: roleChoice,
      dailyGoal: goalChoice,
    });
    setQuizResult(matched);
    setSelectedClassId(matched.id);
  };

  const roleLabelsByLang: Record<SupportedLanguage, Record<GameClass['role'], string>> = {
    en: { Tank: 'Tank', DPS: 'DPS', Support: 'Support', 'Crowd Control': 'Hybrid / CC', Economy: 'Economy' },
    id: { Tank: 'Tank', DPS: 'DPS', Support: 'Support', 'Crowd Control': 'Hibrida / CC', Economy: 'Ekonomi' },
    th: { Tank: 'แทงก์', DPS: 'ดาเมจ', Support: 'ซัพพอร์ต', 'Crowd Control': 'ไฮบริด / ควบคุม', Economy: 'การค้า' },
    zh: { Tank: '坦克', DPS: '输出', Support: '辅助', 'Crowd Control': '多形态 / 控制', Economy: '商业' },
  };

  const classMetaByLang: Record<SupportedLanguage, Record<string, ClassLocalizedMeta>> = {
    en: {
      knight: {
        title: 'The Steel Bastion of Prontera',
        playstyle: 'High defense, berserk damage, cavalry mounted combat with Bowling Bash.',
        quote: 'My shield stands between darkness and the people of Midgard.',
      },
      wizard: {
        title: 'Master of Celestial Elements',
        playstyle: 'Devastating area-of-effect elemental spells, controlling battlefields from afar.',
        quote: 'Fire, ice, and lightning answer my command.',
      },
      sniper: {
        title: 'The Eagle-Eyed Sharpshooter',
        playstyle: 'Ultra-fast ranged critical strikes, falcon companions, and strategic elemental traps.',
        quote: 'Before you hear the bowstring snap, the arrow has found its mark.',
      },
      assassin: {
        title: 'The Shadow Blade of Morroc',
        playstyle: 'Lethal burst stealth, dual-wield katars, poison coatings, and critical strike frenzy.',
        quote: 'You cannot strike what you cannot see.',
      },
      priest: {
        title: 'The Divine Envoy of Odin',
        playstyle: 'Party benedictions, miraculous resurrections, holy purification, and protective barriers.',
        quote: 'In faith there is unyielding strength and light for every soul.',
      },
      whitesmith: {
        title: 'The Industrial Titan & Merchant King',
        playstyle: 'Over-refining supreme weapons, high-speed cart combat, and automated market mastery.',
        quote: 'True power is forged in fire and traded for millions of Zeny.',
      },
      druid: {
        title: 'Shapeshifting Warden of Midgard Wilds',
        playstyle:
          'Signature multi-form launch class! Morph seamlessly between ferocious Beast, soaring Eagle, and primal Nature forms for hybrid melee, burst magic, and group utility.',
        quote: 'One spirit, many forms — the wilds of Midgard answer every call.',
      },
      paladin: {
        title: 'Sacred Crusader of the Royal Guard',
        playstyle:
          'Holy shield vanguard capable of absorbing lethal MVP boss mechanics, casting Devotion to protect allies, and unleashing radiant Grand Cross AoE damage.',
        quote: 'Stand behind my aegis and no boss in Midgard shall break our line.',
      },
    },
    id: {
      knight: {
        title: 'Benteng Baja Prontera',
        playstyle: 'Pertahanan tinggi, serangan berserk mematikan, dan pertempuran berkuda dengan Bowling Bash.',
        quote: 'Perisaiku berdiri di antara kegelapan dan rakyat Midgard.',
      },
      wizard: {
        title: 'Penguasa Elemen Surgawi',
        playstyle: 'Sihir elemen area luas yang menghancurkan, mengendalikan medan perang dari jarak jauh.',
        quote: 'Api, es, dan petir tunduk pada perintahku.',
      },
      sniper: {
        title: 'Penembak Jitu Bermata Elang',
        playstyle: 'Serangan kritikal jarak jauh super cepat, rekan elang, dan perangkap elemen strategis.',
        quote: 'Sebelum suara tali busur terdengar, panahku sudah mengenai sasaran.',
      },
      assassin: {
        title: 'Pedang Bayangan dari Morroc',
        playstyle: 'Serangan sembunyi-sembunyi mematikan, katar ganda, racun, dan rentetan kritikal cepat.',
        quote: 'Kau tak bisa menyerang apa yang tak bisa kau lihat.',
      },
      priest: {
        title: 'Utusan Suci Odin',
        playstyle: 'Berkat tim, kebangkitan ajaib, penyucian suci, dan perisai pelindung untuk seluruh party.',
        quote: 'Dalam iman ada kekuatan teguh dan cahaya bagi setiap jiwa.',
      },
      whitesmith: {
        title: 'Raja Pedagang & Pandai Besi Legendaris',
        playstyle: 'Menempa senjata tingkat atas, bertarung dengan gerobak cepat, dan menguasai pasar Zeny.',
        quote: 'Kekuatan sejati ditempa dalam api dan diperdagangkan demi jutaan Zeny.',
      },
      druid: {
        title: 'Penjaga Alam Pengubah Wujud Midgard',
        playstyle:
          'Kelas andalan multi-wujud saat rilis! Berubah mulus antara wujud Buas, Elang, dan Alam untuk serangan jarak dekat, sihir ledakan, serta dukungan tim.',
        quote: 'Satu roh, banyak wujud — alam liar Midgard menjawab setiap panggilan.',
      },
      paladin: {
        title: 'Ksatria Suci Pengawal Kerajaan',
        playstyle:
          'Garda depan berperisai suci yang mampu menahan serangan bos MVP mematikan, melindungi sekutu dengan Devotion, dan melepaskan Grand Cross.',
        quote: 'Berdirilah di belakang perisaiku dan tak ada bos yang mampu menembus barisan kita.',
      },
    },
    th: {
      knight: {
        title: 'ปราการเหล็กแห่งพรอนเทรา',
        playstyle: 'พลังป้องกันสูง โจมตีบ้าคลั่ง และต่อสู้บนหลังสัตว์ขี่ด้วยสกิล Bowling Bash',
        quote: 'โล่ของข้าจะยืนหยัดขวางความมืดมิดเพื่อปกป้องชาว Midgard',
      },
      wizard: {
        title: 'จอมเวทผู้ควบคุมธาตุแห่งสวรรค์',
        playstyle: 'เวทมนตร์ธาตุหมู่รุนแรง ควบคุมสมรภูมิจากระยะไกลด้วยพายุอุกกาบาตและน้ำแข็ง',
        quote: 'ไฟ น้ำแข็ง และสายฟ้า ล้วนตอบรับคำสั่งของข้า',
      },
      sniper: {
        title: 'นักแม่นธนูเนตรเหยี่ยว',
        playstyle: 'โจมตีระยะไกลคริติคอลสุดไว พร้อมเหยี่ยวคู่ใจและกับดักธาตุเชิงกลยุทธ์',
        quote: 'ก่อนที่คุณจะได้ยินเสียงสายธนู ลูกศรก็พุ่งเข้าเป้าไปแล้ว',
      },
      assassin: {
        title: 'คมมีดเงาแห่งมอร็อค',
        playstyle: 'ลอบสังหารความเสียหายฉับพลัน กาตาร์คู่ เคลือบพิษ และคอมโบคริติคอลสุดอันตราย',
        quote: 'เจ้าไม่อาจฟันสิ่งที่ดวงตามองไม่เห็นได้',
      },
      priest: {
        title: 'ทูตศักดิ์สิทธิ์แห่งโอดิน',
        playstyle: 'บัฟสนับสนุนปาร์ตี้ ชุบชีวิต ปัดเป่าคำสาป และกางบาเรียปกป้องเพื่อนร่วมทีม',
        quote: 'ในศรัทธามีพลังอันมั่นคงและแสงสว่างสำหรับทุกดวงวิญญาณ',
      },
      whitesmith: {
        title: 'จอมช่างตีเหล็กและราชันย์พ่อค้า',
        playstyle: 'ตีบวกอาวุธระดับสูงสุด ต่อสู้ด้วยรถเข็นความเร็วสูง และครองตลาดเศรษฐกิจ Zeny',
        quote: 'พลังที่แท้จริงหลอมขึ้นจากเปลวไฟและแลกเปลี่ยนเป็นเงินล้าน Zeny',
      },
      druid: {
        title: 'ผู้พิทักษ์พงไพรแปลงร่างแห่ง Midgard',
        playstyle:
          'อาชีพเด่นหลายร่างวันเปิดตัว! แปลงร่างได้อย่างไร้รอยต่อระหว่างร่างอสูร ร่างเหยี่ยว และร่างธรรมชาติ ผสานทั้งประชิด เวท และซัพพอร์ตทีม',
        quote: 'หนึ่งวิญญาณ หลายรูปลักษณ์ — พงไพรแห่ง Midgard พร้อมขานรับทุกเสียงเรียก',
      },
      paladin: {
        title: 'อัศวินศักดิ์สิทธิ์แห่งราชองครักษ์',
        playstyle:
          'แนวหน้าโล่ศักดิ์สิทธิ์ที่รับดาเมจบอส MVP แทนเพื่อนด้วย Devotion พร้อมปลดปล่อย Grand Cross โจมตีวงกว้าง',
        quote: 'ยืนอยู่หลังโล่ของข้า แล้วจะไม่มีบอสหน้าไหนทำลายแนวรับของเราได้',
      },
    },
    zh: {
      knight: {
        title: '普隆德拉钢铁壁垒',
        playstyle: '高防御、狂暴爆发伤害，搭配骑乘战斗与经典技能“怪物互击”。',
        quote: '我的盾牌将横亘在黑暗与米德加尔特人民之间。',
      },
      wizard: {
        title: '天穹元素主宰',
        playstyle: '毁天灭地的范围元素魔法，在远程掌控全场节奏与群体清场。',
        quote: '烈焰、寒冰与雷霆皆听我号令。',
      },
      sniper: {
        title: '鹰眼神射手',
        playstyle: '极速远程暴击输出，搭配猎鹰伙伴协战与多元素战术陷阱。',
        quote: '在你听见弓弦震响之前，利箭早已命中目标。',
      },
      assassin: {
        title: '梦罗克暗影之刃',
        playstyle: '致命潜行爆发、双持拳刃、剧毒涂装与高频暴击连斩。',
        quote: '你无法击中你根本看不见的身影。',
      },
      priest: {
        title: '奥丁神圣使者',
        playstyle: '全队神圣祝福、奇迹复活、净化驱散与强力护盾守护。',
        quote: '信仰赋予我们不屈的力量，也照亮每一颗灵魂。',
      },
      whitesmith: {
        title: '锻造巨匠与商业之王',
        playstyle: '精炼极品神兵、高速手推车重击，并称霸普隆德拉自由市场。',
        quote: '真正的力量在烈火中锻造，也在千万 Zeny 的交易中流传。',
      },
      druid: {
        title: '米德加尔特荒野变形守护者',
        playstyle:
          '首发重磅多形态职业！在凶猛巨兽、翱翔雄鹰与自然形态间无缝切换，兼顾近战爆发、元素法术与团队辅助。',
        quote: '一魂多形——米德加尔特的荒野响应每一次召唤。',
      },
      paladin: {
        title: '皇家近卫神圣十字军',
        playstyle:
          '圣盾先锋，能硬抗 MVP 首领致命机制，施放“牺牲”守护队友，并爆发范围圣光“圣十字审判”。',
        quote: '站在我的神盾之后，任何首领都休想击溃我们的防线。',
      },
    },
  };

  const titles: Record<
    SupportedLanguage,
    {
      tag: string;
      heading: string;
      subheading: string;
      quizBtn: string;
      overviewTab: string;
      statsHeading: string;
      skillsHeading: string;
      quizHeading: string;
      quizSub: string;
      masterEvolution: string;
      maxBaseCap: string;
      kafraNote: string;
      q1: string;
      q1Opts: Record<string, string>;
      q2: string;
      q2Opts: Record<string, string>;
      q3: string;
      q3Opts: Record<string, string>;
      revealBtn: string;
      destinedCalling: string;
      viewInDepth: string;
      statLabels: Record<'STR' | 'AGI' | 'VIT' | 'INT' | 'DEX' | 'LUK', string>;
    }
  > = {
    en: {
      tag: '8 LAUNCH CLASSES • FREE STAT & SKILL RESETS',
      heading: 'Master 8 Launch Classes — Featuring the Shapeshifting Druid',
      subheading:
        'Switch jobs freely and reset stats or skills at zero cost across all 8 launch classes — including the multi-form Druid built for PvE bosses, Guild Wars, and open-world exploration.',
      quizBtn: 'Take Destiny Quiz',
      overviewTab: 'All 8 Launch Classes',
      statsHeading: 'Attribute Synergy',
      skillsHeading: 'Core Signature Abilities',
      quizHeading: 'Which of the 8 Launch Classes Fits Your Soul?',
      quizSub: 'Answer 3 quick combat questions to unveil your destined Midgard class.',
      masterEvolution: 'Free Job Switching & Skill Reset',
      maxBaseCap: 'Max Base Cap: 99',
      kafraNote: 'Stats & skills can be reset for free anytime as you switch jobs across Midgard.',
      q1: '1. When facing a powerful MVP boss, what is your instinct?',
      q1Opts: {
        shapeshift: '🐾 Shapeshift into Beast/Eagle forms (Druid)',
        frontline: '🛡️ Charge with heavy shield',
        magic: '🔮 Cast huge AOE meteor storms',
        ranged: '🏹 Snipe from max range',
        stealth: '🗡️ Vanish into shadows & backstab',
        healing: '✨ Keep party alive with heals',
        wealth: '🔨 Bash with merchant cart & loot',
      },
      q2: '2. What role do you play in a gaming squad?',
      q2Opts: {
        lead: '👑 Frontline Commander',
        support: '🤝 Dedicated Guardian & Healer',
        solo: '🎯 Lone Wolf Damage Dealer',
      },
      q3: '3. What gives you the biggest adrenaline rush in games?',
      q3Opts: {
        dungeon: '🏰 Clearing 100-floor tower',
        pvp: '⚔️ Winning Guild vs Guild WoE',
        trading: '💰 Making 100M Zeny in market',
        social: '🎉 Social events & wedding party',
      },
      revealBtn: 'Reveal My Class Match',
      destinedCalling: 'Your Destined Calling:',
      viewInDepth: 'View Class In-Depth',
      statLabels: {
        STR: 'Strength (Physical Power)',
        AGI: 'Agility (ASPD & Flee)',
        VIT: 'Vitality (Max HP & Defense)',
        INT: 'Intelligence (Magic Attack & SP)',
        DEX: 'Dexterity (Accuracy & Cast Speed)',
        LUK: 'Luck (Critical & Perfect Dodge)',
      },
    },
    id: {
      tag: '8 KELAS RILIS • RESET STAT & SKILL GRATIS',
      heading: 'Kuasai 8 Kelas Rilis — Termasuk Druid Pengubah Wujud',
      subheading:
        'Bebas ganti job dan reset stat atau skill gratis di seluruh 8 kelas rilis — termasuk Druid multi-wujud untuk bos MVP, Guild War, dan eksplorasi dunia terbuka.',
      quizBtn: 'Ikuti Kuis Kelas',
      overviewTab: 'Semua 8 Kelas Rilis',
      statsHeading: 'Sinergi Atribut',
      skillsHeading: 'Kemampuan Utama',
      quizHeading: 'Kelas Mana yang Cocok dengan Gaya Bermainmu?',
      quizSub: 'Jawab 3 pertanyaan singkat untuk menemukan kelas takdirmu di Midgard.',
      masterEvolution: 'Ganti Job & Reset Skill Gratis',
      maxBaseCap: 'Batas Dasar Maks: 99',
      kafraNote: 'Stat & skill dapat direset gratis kapan saja saat berpindah job di Midgard.',
      q1: '1. Saat menghadapi bos MVP kuat, apa insting pertamamu?',
      q1Opts: {
        shapeshift: '🐾 Berubah wujud Buas/Elang (Druid)',
        frontline: '🛡️ Maju dengan perisai berat',
        magic: '🔮 Lepaskan badai meteor AOE besar',
        ranged: '🏹 Menembak jitu dari jarak jauh',
        stealth: '🗡️ Menghilang ke bayangan & menyerang balik',
        healing: '✨ Menjaga tim tetap hidup dengan heal',
        wealth: '🔨 Menghantam dengan gerobak & mengumpulkan loot',
      },
      q2: '2. Peran apa yang kamu sukai dalam tim?',
      q2Opts: {
        lead: '👑 Komandan Garda Depan',
        support: '🤝 Pelindung & Healer Setia',
        solo: '🎯 Penyerang Utama Mandiri',
      },
      q3: '3. Apa yang memberimu adrenalin terbesar di dalam game?',
      q3Opts: {
        dungeon: '🏰 Menaklukkan menara 100 lantai',
        pvp: '⚔️ Memenangkan Guild War (WoE)',
        trading: '💰 Meraih 100 juta Zeny di pasar',
        social: '🎉 Acara sosial & pesta pernikahan',
      },
      revealBtn: 'Ungkap Kelas Takdirku',
      destinedCalling: 'Kelas Takdirmu:',
      viewInDepth: 'Lihat Detail Kelas',
      statLabels: {
        STR: 'Kekuatan (Serangan Fisik)',
        AGI: 'Kelincahan (ASPD & Hindaran)',
        VIT: 'Vitalitas (HP Maks & Pertahanan)',
        INT: 'Kecerdasan (Serangan Sihir & SP)',
        DEX: 'Ketangkasan (Akurasi & Kecepatan Cast)',
        LUK: 'Keberuntungan (Kritikal & Dodge)',
      },
    },
    th: {
      tag: '8 อาชีพวันเปิดตัว • รีเซ็ตสเตตัสและสกิลฟรี',
      heading: 'เลือกเล่น 8 อาชีพวันเปิดตัว — พร้อม Druid แปลงร่างได้',
      subheading:
        'สลับอาชีพได้อย่างอิสระและรีเซ็ตสเตตัสกับสกิลฟรีในทั้ง 8 อาชีพเปิดตัว นำโดย Druid หลายร่างสำหรับการล่าบอส สงครามกิลด์ และโลกเปิด',
      quizBtn: 'ทำแบบทดสอบอาชีพ',
      overviewTab: 'ดูทั้ง 8 อาชีพ',
      statsHeading: 'ค่าสถานะแนะนำ',
      skillsHeading: 'สกิลเด่นประจำอาชีพ',
      quizHeading: 'อาชีพใดใน 8 อาชีพที่เหมาะกับสไตล์ของคุณ?',
      quizSub: 'ตอบคำถามสั้นๆ 3 ข้อเพื่อค้นหาอาชีพคู่ใจของคุณใน Midgard',
      masterEvolution: 'สลับอาชีพและรีเซ็ตสกิลฟรี',
      maxBaseCap: 'เพดานค่าสถานะพื้นฐาน: 99',
      kafraNote: 'สามารถรีเซ็ตค่าสถานะและสกิลได้ฟรีทุกเมื่อเมื่อต้องการสลับสายอาชีพใน Midgard',
      q1: '1. เมื่อต้องเผชิญหน้ากับบอส MVP สุดโหด สัญชาตญาณแรกของคุณคือ?',
      q1Opts: {
        shapeshift: '🐾 แปลงร่างเป็นอสูร/เหยี่ยว (Druid)',
        frontline: '🛡️ พุ่งชนแนวหน้าด้วยโล่แกร่ง',
        magic: '🔮 ร่ายพายุอุกกาบาต AOE ล้างจอ',
        ranged: '🏹 ยิงสไนป์คริติคอลจากระยะไกล',
        stealth: '🗡️ หายตัวเข้าเงาแล้วลอบโจมตี',
        healing: '✨ คอยฮีลและกางบัฟให้เพื่อนรอด',
        wealth: '🔨 ฟาดด้วยรถเข็นพ่อค้าและกวาดของดรอป',
      },
      q2: '2. คุณชอบรับบทบาทไหนในปาร์ตี้?',
      q2Opts: {
        lead: '👑 ผู้นำแนวหน้า',
        support: '🤝 ผู้พิทักษ์และฮีลเลอร์คู่ใจ',
        solo: '🎯 ดาเมจเดี่ยวสายลุย',
      },
      q3: '3. กิจกรรมไหนที่ทำให้คุณตื่นเต้นที่สุดในเกม?',
      q3Opts: {
        dungeon: '🏰 ตะลุยหอคอย 100 ชั้น',
        pvp: '⚔️ คว้าชัยสงครามกิลด์ WoE',
        trading: '💰 ทำกำไร 100 ล้าน Zeny ในตลาด',
        social: '🎉 อีเวนต์สังคมและงานแต่งงาน',
      },
      revealBtn: 'เปิดเผยอาชีพที่ใช่สำหรับฉัน',
      destinedCalling: 'อาชีพคู่ชะตาของคุณคือ:',
      viewInDepth: 'ดูรายละเอียดอาชีพนี้',
      statLabels: {
        STR: 'พละกำลัง (โจมตีกายภาพ)',
        AGI: 'ความว่องไว (ความเร็วโจมตีและหลบหลีก)',
        VIT: 'ความทนทาน (HP สูงสุดและป้องกัน)',
        INT: 'สติปัญญา (โจมตีเวทและ SP)',
        DEX: 'ความแม่นยำ (ความแม่นและร่ายไว)',
        LUK: 'โชค (คริติคอลและหลบสมบูรณ์)',
      },
    },
    zh: {
      tag: '首发 8 大职业 • 免费洗点与自由转职',
      heading: '驾驭首发 8 大职业 —— 重磅推出多形态变形德鲁伊',
      subheading:
        '全部 8 大首发职业均支持免费属性与技能重置及自由转职，更包含可切换多形态的全新德鲁伊（Druid），畅玩首领战、公会战与开放世界探索。',
      quizBtn: '参与职业倾向测试',
      overviewTab: '查看全部 8 大职业',
      statsHeading: '推荐属性配比',
      skillsHeading: '核心招牌技能',
      quizHeading: '哪一个首发职业最契合你的战斗灵魂？',
      quizSub: '回答 3 个快速问题，匹配你的专属米德加尔特职业。',
      masterEvolution: '支持自由转职与免费洗点',
      maxBaseCap: '基础属性上限：99',
      kafraNote: '冒险途中随时可免费重置属性点与技能点，畅快体验全部职业流派。',
      q1: '1. 面对强大的 MVP 首领时，你的第一直觉是？',
      q1Opts: {
        shapeshift: '🐾 变身巨兽/雄鹰多形态作战（德鲁伊）',
        frontline: '🛡️ 举起厚重盾牌冲锋抗伤',
        magic: '🔮 咏唱毁天灭地的范围陨石术',
        ranged: '🏹 在极限射程外远程狙击',
        stealth: '🗡️ 潜入暗影发动致命背刺',
        healing: '✨ 用治疗与护盾保住全队性命',
        wealth: '🔨 推车重击并收割满地战利品',
      },
      q2: '2. 在团队开荒中你最擅长哪种定位？',
      q2Opts: {
        lead: '👑 前排指挥官',
        support: '🤝 坚实守护与治疗核心',
        solo: '🎯 独行侠高爆发输出',
      },
      q3: '3. 游戏里什么最能让你热血沸腾？',
      q3Opts: {
        dungeon: '🏰 通关百层恩德勒斯塔',
        pvp: '⚔️ 赢下跨服公会攻城战（WoE）',
        trading: '💰 在市场赚取一亿 Zeny',
        social: '🎉 参与社交庆典与教堂婚礼',
      },
      revealBtn: '揭晓我的本命职业',
      destinedCalling: '为你匹配的本命职业：',
      viewInDepth: '查看该职业详情',
      statLabels: {
        STR: '力量（物理攻击）',
        AGI: '敏捷（攻速与闪避）',
        VIT: '体质（生命上限与防御）',
        INT: '智力（魔法攻击与魔力）',
        DEX: '灵巧（命中与咏唱速度）',
        LUK: '幸运（暴击与完全回避）',
      },
    },
  };

  const t = titles[activeLanguage] || titles.en;
  const roleLabels = roleLabelsByLang[activeLanguage] || roleLabelsByLang.en;
  const classMetaMap = classMetaByLang[activeLanguage] || classMetaByLang.en;
  const currentMeta = classMetaMap[currentClass.id] || {
    title: currentClass.title,
    playstyle: currentClass.playstyle,
    quote: currentClass.quote,
  };
  const quizMeta = quizResult
    ? classMetaMap[quizResult.id] || {
        title: quizResult.title,
        playstyle: quizResult.playstyle,
        quote: quizResult.quote,
      }
    : null;

  return (
    <section id="classes" className="py-20 lg:py-28 bg-[#090e18]/50 backdrop-blur-[2px] relative overflow-hidden border-b border-slate-800">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Swords className="w-3.5 h-3.5" />
            <span>{t.tag}</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            {t.heading}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">{t.subheading}</p>

          <div className="mt-6 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => setQuizMode(false)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                !quizMode
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {t.overviewTab}
            </button>
            <button
              type="button"
              onClick={() => setQuizMode(true)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                quizMode
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-300" />
              <span>{t.quizBtn}</span>
            </button>
          </div>
        </div>

        {/* QUIZ VIEW */}
        {quizMode ? (
          <div className="max-w-3xl mx-auto bg-slate-900/90 border border-purple-500/40 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl animate-in fade-in">
            <div className="text-center mb-8">
              <h3 className="font-cinzel text-2xl font-bold text-white mb-2">{t.quizHeading}</h3>
              <p className="text-xs sm:text-sm text-slate-400">{t.quizSub}</p>
            </div>

            <div className="space-y-6">
              {/* Question 1 */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                  {t.q1}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {(['shapeshift', 'frontline', 'magic', 'ranged', 'stealth', 'healing', 'wealth'] as const).map(
                    (id) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setCombatChoice(id)}
                        className={`p-3 rounded-xl text-xs text-left font-medium border transition-all cursor-pointer ${
                          combatChoice === id
                            ? 'bg-purple-600/20 border-purple-400 text-white font-bold'
                            : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {t.q1Opts[id]}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Question 2 */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-sky-400 mb-2">
                  {t.q2}
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {(['lead', 'support', 'solo'] as const).map((id) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setRoleChoice(id)}
                      className={`p-3 rounded-xl text-xs text-left font-medium border transition-all cursor-pointer ${
                        roleChoice === id
                          ? 'bg-sky-600/20 border-sky-400 text-white font-bold'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {t.q2Opts[id]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3 */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
                  {t.q3}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {(['dungeon', 'pvp', 'trading', 'social'] as const).map((id) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setGoalChoice(id)}
                      className={`p-3 rounded-xl text-xs text-left font-medium border transition-all cursor-pointer ${
                        goalChoice === id
                          ? 'bg-emerald-600/20 border-emerald-400 text-white font-bold'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {t.q3Opts[id]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-center">
                <button
                  type="button"
                  onClick={handleRunQuiz}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-purple-600/30 transition-all cursor-pointer transform hover:-translate-y-0.5"
                >
                  {t.revealBtn}
                </button>
              </div>

              {quizResult && quizMeta && (
                <div className="mt-6 p-5 rounded-2xl bg-slate-950 border border-amber-400/80 animate-in zoom-in-95 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-2xl font-bold text-amber-400">
                      <Award className="w-7 h-7 text-amber-400" />
                    </div>
                    <div>
                      <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                        {t.destinedCalling}
                      </div>
                      <div className="text-xl font-cinzel font-black text-white">
                        {quizResult.name} ({quizMeta.title})
                      </div>
                      <div className="text-xs text-slate-300 mt-0.5">{quizMeta.playstyle}</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setQuizMode(false);
                      setSelectedClassId(quizResult.id);
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold hover:bg-amber-300 shrink-0"
                  >
                    {t.viewInDepth} &rarr;
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* STANDARD CLASS ROSTER VIEW */
          <div className="space-y-8">
            {/* Class Nav Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto">
              {GAME_CLASSES.map((cls) => {
                const isSelected = selectedClassId === cls.id;
                return (
                  <button
                    key={cls.id}
                    type="button"
                    onClick={() => setSelectedClassId(cls.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                      isSelected
                        ? 'bg-slate-900 border-amber-400 text-white shadow-lg shadow-amber-500/10 transform -translate-y-0.5'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cls.accentColor }} />
                    <span>{cls.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950 text-slate-400">
                      {roleLabels[cls.role]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Class Showcase Card */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-xl shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Overview & Lore */}
              <div className="lg:col-span-6 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-md"
                      style={{ backgroundColor: currentClass.accentColor }}
                    >
                      {roleLabels[currentClass.role]}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{t.masterEvolution}</span>
                  </div>

                  <h3 className="font-cinzel text-3xl sm:text-4xl font-black text-white mb-2">
                    {currentClass.name}
                  </h3>
                  <div className="text-sm font-semibold text-amber-400 mb-4">{currentMeta.title}</div>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                    {currentMeta.playstyle}
                  </p>

                  <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs italic text-slate-300 font-mono mb-6">
                    "{currentMeta.quote}"
                  </div>
                </div>

                {/* Skills Showcase */}
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>{t.skillsHeading}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {currentClass.keySkills.map((skill, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                        <span className="truncate">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Attribute Synergy */}
              <div className="lg:col-span-6 bg-slate-950/80 border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-amber-400" />
                    <span className="font-cinzel text-sm font-bold text-white">{t.statsHeading}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">{t.maxBaseCap}</span>
                </div>

                <div className="space-y-4">
                  {[
                    { key: 'STR' as const, val: currentClass.recommendedStats.str, color: 'bg-red-500' },
                    { key: 'AGI' as const, val: currentClass.recommendedStats.agi, color: 'bg-emerald-500' },
                    { key: 'VIT' as const, val: currentClass.recommendedStats.vit, color: 'bg-blue-500' },
                    { key: 'INT' as const, val: currentClass.recommendedStats.int, color: 'bg-purple-500' },
                    { key: 'DEX' as const, val: currentClass.recommendedStats.dex, color: 'bg-amber-500' },
                    { key: 'LUK' as const, val: currentClass.recommendedStats.luk, color: 'bg-yellow-400' },
                  ].map((stat) => (
                    <div key={stat.key} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-mono font-bold text-slate-300">
                          {stat.key}{' '}
                          <span className="font-sans text-[11px] text-slate-400 font-normal">
                            ({t.statLabels[stat.key]})
                          </span>
                        </span>
                        <span className="font-mono font-bold text-amber-400">{stat.val}</span>
                      </div>
                      <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className={`h-full ${stat.color} rounded-full transition-all duration-500`}
                          style={{ width: `${(stat.val / 99) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400 text-center">
                  {t.kafraNote}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
