import React from 'react';
import { Sparkles, Eye, Flame, Cat } from 'lucide-react';
import { SupportedLanguage } from '../utils/trackingAndLocale';

interface SeasonalSpotlightProps {
  activeLanguage: string;
  onInspectImage: (src: string, caption: string) => void;
}

export const SeasonalSpotlight: React.FC<SeasonalSpotlightProps> = ({
  activeLanguage,
  onInspectImage,
}) => {
  const content: Record<
    SupportedLanguage,
    {
      tag: string;
      heading: string;
      subheading: string;
      kittyTitle: string;
      kittyBadge: string;
      kittyDesc: string;
      kittyPill1: string;
      kittyPill2: string;
      kittyPill3: string;
      siegeTitle: string;
      siegeBadge: string;
      siegeDesc: string;
      siegePill1: string;
      siegePill2: string;
      siegePill3: string;
      inspectShort: string;
      inspectBtn: string;
    }
  > = {
    en: {
      tag: 'NEW SEASONAL HIGHLIGHTS & EVENTS',
      heading: 'Wonder Tour Outfits & Imperial Siege War',
      subheading:
        'Immerse in the dual soul of Midgard: adorable chibi lifestyle fashion in the Campus Kitty Wonder Tour, and the earth-shaking clash of guilds in cross-server Siege War.',
      kittyTitle: 'Campus Kitty: Wonder Tour Feline Outfit',
      kittyBadge: 'Chibi Wardrobe & Pets',
      kittyDesc:
        'Dress in charming pastel blue school sailor suits, feline ear headgears, and adopt cuddle-loving kittens in the heart of Prontera. Featuring official Ragnarok: The New World chibi artwork.',
      kittyPill1: 'Pastel Feline Sailor Attire',
      kittyPill2: 'Adoptable Midgard Kittens',
      kittyPill3: 'Stat-Free Chibi Transmog',
      siegeTitle: 'Siege War: War of Emperium (GvG)',
      siegeBadge: 'Cross-Server Guild Clash',
      siegeDesc:
        'Assemble your guild to storm ancient imperial fortifications, capture Emperium crystals, and defend your banners in massive cross-server Guild vs Guild warfare.',
      siegePill1: 'Imperial Castle Conquer',
      siegePill2: '8 Launch Class Synergies',
      siegePill3: 'Legendary Guild Artifacts',
      inspectShort: 'Inspect Art',
      inspectBtn: 'Inspect Full Resolution Art',
    },
    id: {
      tag: 'SOROTAN MUSIMAN & EVENT TERBARU',
      heading: 'Kostum Wonder Tour & Perang Pengepungan (Siege War)',
      subheading:
        'Rasakan dua sisi pesona Midgard: gaya chibi imut dalam Campus Kitty Wonder Tour, serta bentrokan kolosal antar-guild dalam Siege War lintas server.',
      kittyTitle: 'Campus Kitty: Kostum Kucing Wonder Tour',
      kittyBadge: 'Lemari Chibi & Hewan Peliharaan',
      kittyDesc:
        'Kenakan seragam pelaut biru pastel, aksesori telinga kucing, dan adopsi anak kucing menggemaskan di pusat Prontera dengan ilustrasi chibi resmi Ragnarok: The New World.',
      kittyPill1: 'Seragam Pelaut Kucing Pastel',
      kittyPill2: 'Anak Kucing Midgard',
      kittyPill3: 'Transmog Chibi Bebas Stat',
      siegeTitle: 'Siege War: War of Emperium (GvG)',
      siegeBadge: 'Perang Guild Lintas Server',
      siegeDesc:
        'Kumpulkan guild kamu untuk menyerbu benteng kekaisaran kuno, merebut kristal Emperium, dan mempertahankan panji kemenangan dalam perang GvG besar.',
      siegePill1: 'Penaklukan Kastil Kekaisaran',
      siegePill2: 'Sinergi 8 Kelas Rilis',
      siegePill3: 'Artefak Guild Legendaris',
      inspectShort: 'Lihat Karya',
      inspectBtn: 'Lihat Gambar Resolusi Penuh',
    },
    th: {
      tag: 'ไฮไลต์ประจำซีซันและกิจกรรมใหม่',
      heading: 'แฟชั่น Wonder Tour และสงครามชิงปราสาท Siege War',
      subheading:
        'สัมผัสสองเสน่ห์แห่ง Midgard: แฟชั่นจิบิสุดน่ารักจาก Campus Kitty Wonder Tour และศึกสงครามกิลด์ข้ามเซิร์ฟเวอร์อันดุเดือดใน Siege War',
      kittyTitle: 'Campus Kitty: ชุดแฟชั่นแมวเหมียว Wonder Tour',
      kittyBadge: 'แฟชั่นจิบิและสัตว์เลี้ยง',
      kittyDesc:
        'แต่งตัวด้วยชุดนักเรียนกะลาสีฟ้าพาสเทล หูแมวสุดน่ารัก และเลี้ยงลูกแมวขี้อ้อนใจกลางพรอนเทร่า พร้อมภาพอาร์ตเวิร์กจิบิอย่างเป็นทางการของ Ragnarok: The New World',
      kittyPill1: 'ชุดกะลาสีพาสเทลลายแมว',
      kittyPill2: 'ลูกแมวคู่หูแห่ง Midgard',
      kittyPill3: 'เปลี่ยนลุคอิสระไม่กระทบค่าสเตตัส',
      siegeTitle: 'Siege War: สงครามชิงปราสาท (GvG)',
      siegeBadge: 'ศึกกิลด์ข้ามเซิร์ฟเวอร์',
      siegeDesc:
        'รวมพลังสมาชิกกิลด์บุกทะลวงปราสาทจักรวรรดิ ยึดครองคริสตัล Emperium และปกป้องธงแห่งเกียรติยศในสงคราม GvG ขนาดมหึมา',
      siegePill1: 'พิชิตปราสาทจักรวรรดิ',
      siegePill2: 'คอมโบประสานงาน 8 อาชีพ',
      siegePill3: 'สมบัติและวัตถุโบราณกิลด์ระดับตำนาน',
      inspectShort: 'ดูภาพชัดๆ',
      inspectBtn: 'ดูภาพความละเอียดเต็ม',
    },
    zh: {
      tag: '全新赛季亮点与特色活动',
      heading: '奇妙巡游萌猫时装与帝国攻城战',
      subheading:
        '领略米德加尔特的双重魅力：在校园萌猫巡游中尽享 Q 版治愈穿搭，并在跨服公会攻城战中体验热血激战。',
      kittyTitle: '校园萌猫：奇妙巡游猫咪主题时装',
      kittyBadge: 'Q 版衣橱与萌宠',
      kittyDesc:
        '换上清新淡蓝水手服与萌猫耳头饰，在普隆德拉街头邂逅软萌小猫伙伴，尽赏《Ragnarok: The New World》官方 Q 版原画。',
      kittyPill1: '淡蓝萌猫水手制服',
      kittyPill2: '可领养米德加尔特小猫',
      kittyPill3: '无属性负担自由幻化',
      siegeTitle: '帝国攻城战：公会据点争夺（GvG）',
      siegeBadge: '跨服公会巅峰对决',
      siegeDesc:
        '集结公会战友强攻古老帝国要塞，夺取华丽金属水晶，在恢弘的跨服公会战中捍卫荣耀战旗。',
      siegePill1: '帝国城堡领地争夺',
      siegePill2: '首发 8 大职业战术配合',
      siegePill3: '传说级公会神器奖励',
      inspectShort: '查看原画',
      inspectBtn: '查看全分辨率原画',
    },
  };

  const t = content[activeLanguage as SupportedLanguage] || content.en;

  const kittyImg = '/assets/aistudio/image_2f98b010.png';
  const siegeImg = '/assets/aistudio/image_d1a84294.png';

  return (
    <section id="seasonal" className="py-20 lg:py-28 bg-[#070b16]/50 backdrop-blur-[2px] relative overflow-hidden border-b border-blue-500/20">
      <div className="absolute top-1/3 -left-36 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-36 w-96 h-96 bg-pink-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[32rem] h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/20 via-pink-500/20 to-amber-500/20 border border-blue-400/40 text-blue-300 text-xs font-black uppercase tracking-widest mb-4 shadow-lg shadow-blue-500/10">
            <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
            <span>{t.tag}</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-300">
              {t.heading}
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            {t.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Card 1 */}
          <div className="rounded-3xl border-2 border-sky-500/40 hover:border-pink-500/60 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-[#0c1328] shadow-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 group hover:shadow-sky-500/10">
            <div>
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] mb-5 border border-sky-500/30 bg-black cursor-pointer group/img">
                <img
                  src={kittyImg}
                  alt={t.kittyTitle}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700"
                  onClick={() => onInspectImage(kittyImg, t.kittyTitle)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-slate-950/85 border border-pink-400/70 text-[11px] font-black text-pink-300 uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5 shadow-md">
                    <Cat className="w-3.5 h-3.5 text-pink-400" />
                    <span>{t.kittyBadge}</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onInspectImage(kittyImg, t.kittyTitle)}
                  className="absolute top-3.5 right-3.5 p-2 rounded-xl bg-slate-950/85 hover:bg-sky-500 hover:text-slate-950 text-sky-300 border border-sky-400/60 text-xs font-bold transition-all backdrop-blur-md shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Eye className="w-4 h-4" />
                  <span className="hidden sm:inline text-[11px]">{t.inspectShort}</span>
                </button>
              </div>

              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
                {t.kittyTitle}
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-5">
                {t.kittyDesc}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-300 text-xs font-bold">
                  🐾 {t.kittyPill1}
                </span>
                <span className="px-3 py-1 rounded-xl bg-pink-500/15 border border-pink-500/30 text-pink-300 text-xs font-bold">
                  🐱 {t.kittyPill2}
                </span>
                <span className="px-3 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold">
                  ✨ {t.kittyPill3}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs font-mono text-sky-400 font-semibold">
                RAGNARÖK • THE NEW WORLD
              </span>
              <button
                type="button"
                onClick={() => onInspectImage(kittyImg, t.kittyTitle)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-sky-500/20 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{t.inspectBtn}</span>
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-3xl border-2 border-amber-500/40 hover:border-red-500/60 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-[#1b0e12] shadow-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 group hover:shadow-amber-500/10">
            <div>
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] mb-5 border border-amber-500/30 bg-black cursor-pointer group/img">
                <img
                  src={siegeImg}
                  alt={t.siegeTitle}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700"
                  onClick={() => onInspectImage(siegeImg, t.siegeTitle)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-slate-950/85 border border-amber-400/70 text-[11px] font-black text-amber-300 uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5 shadow-md">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    <span>{t.siegeBadge}</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onInspectImage(siegeImg, t.siegeTitle)}
                  className="absolute top-3.5 right-3.5 p-2 rounded-xl bg-slate-950/85 hover:bg-amber-500 hover:text-slate-950 text-amber-300 border border-amber-400/60 text-xs font-bold transition-all backdrop-blur-md shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Eye className="w-4 h-4" />
                  <span className="hidden sm:inline text-[11px]">{t.inspectShort}</span>
                </button>
              </div>

              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                {t.siegeTitle}
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-5">
                {t.siegeDesc}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold">
                  🏰 {t.siegePill1}
                </span>
                <span className="px-3 py-1 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-bold">
                  ⚔️ {t.siegePill2}
                </span>
                <span className="px-3 py-1 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-bold">
                  🛡️ {t.siegePill3}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs font-mono text-amber-400 font-semibold">
                WAR OF EMPERIUM • MIDGARD
              </span>
              <button
                type="button"
                onClick={() => onInspectImage(siegeImg, t.siegeTitle)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 text-xs font-bold shadow-lg shadow-amber-500/20 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{t.inspectBtn}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
