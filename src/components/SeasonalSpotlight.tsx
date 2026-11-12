import React from 'react';
import { Sparkles, Swords, Shirt, Eye, Shield, Trophy, Flame, Cat, Heart } from 'lucide-react';

interface SeasonalSpotlightProps {
  activeLanguage: 'en' | 'fil' | 'fr' | 'ar';
  onInspectImage: (src: string, caption: string) => void;
}

export const SeasonalSpotlight: React.FC<SeasonalSpotlightProps> = ({
  activeLanguage,
  onInspectImage,
}) => {
  const content = {
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
      siegePill2: '24+ Job Class Synergies',
      siegePill3: 'Legendary Guild Artifacts',
      inspectBtn: 'Inspect Full Resolution Art',
    },
    fil: {
      tag: 'MGA BAGONG PANG-SEASONG KAGANAPAN AT BALITA',
      heading: 'Wonder Tour Kasuotan at Digmaang Pagkubkob',
      subheading:
        'Damhin ang dalawang mukha ng Midgard: ang nakatutuwang estilong chibi ng Campus Kitty Wonder Tour, at ang maapoy na labanan ng mga guild sa cross-server Siege War.',
      kittyTitle: 'Campus Kitty: Bagong Wonder Tour Outfit',
      kittyBadge: 'Kasuotang Chibi at Alagang Pusa',
      kittyDesc:
        'Magsuot ng pastel blue sailor uniform, tainga ng pusa, at mag-alaga ng malalambing na kuting sa gitna ng Prontera. Tampok ang opisyal na Ragnarok: The New World chibi art.',
      kittyPill1: 'Pastel Blue Sailor Uniform',
      kittyPill2: 'Mga Alagang Kuting ng Midgard',
      kittyPill3: 'Libreng Transmog sa Kasuotan',
      siegeTitle: 'Siege War: War of Emperium (GvG)',
      siegeBadge: 'Labanan ng mga Guild',
      siegeDesc:
        'Tipunin ang iyong guild upang lusubin ang mga kastilyo, agawin ang Emperium crystal, at ipagtanggol ang inyong bandera sa matinding cross-server guild warfare.',
      siegePill1: 'Pagsakop sa Imperial Castle',
      siegePill2: '24+ Sinerhiya ng mga Trabaho',
      siegePill3: 'Maalamat na Guild Artifacts',
      inspectBtn: 'Suriin ang Buong Larawan',
    },
    fr: {
      tag: 'NOUVEAUX ÉVÉNEMENTS & ÉDITIONS SPÉCIALES',
      heading: 'Tenues Wonder Tour & Guerre de Siège Impériale',
      subheading:
        'Vivez la double magie de Midgard : la mignonnerie chibi de Campus Kitty et l’intensité martiale de la Guerre de Siège inter-serveurs.',
      kittyTitle: 'Campus Kitty : Nouvelle Tenue Wonder Tour',
      kittyBadge: 'Garde-Robe Chibi & Compagnons',
      kittyDesc:
        'Enfilez des uniformes marins bleu pastel, oreilles de chat et cajolez de doux chatons à Prontera avec l’art officiel chibi de Ragnarok: The New World.',
      kittyPill1: 'Costume Écolier Félid',
      kittyPill2: 'Chatons de Compagnie',
      kittyPill3: 'Transmogrification Chibi',
      siegeTitle: 'Guerre de Siège : War of Emperium (GvG)',
      siegeBadge: 'Choc de Guildes Inter-Serveurs',
      siegeDesc:
        'Prenez d’assaut les forteresses impériales, capturez le cristal Emperium et défendez vos bannières dans des affrontements massifs de guildes.',
      siegePill1: 'Conquête de Châteaux',
      siegePill2: 'Synergies de 24+ Classes',
      siegePill3: 'Artefacts de Guilde Légendaires',
      inspectBtn: 'Inspecter en Haute Définition',
    },
    ar: {
      tag: 'أحدث فعاليات السيزون وتحديثات اللعبة',
      heading: 'أزياء القطط اللطيفة وحرب الحصار الإمبراطورية (Siege War)',
      subheading:
        'عيش الجمال الحقيقي لعالم اللعبة: بين الستايل التشيبي اللطيف والقطط الوفية، وبين أقوى معارك الغيلد وحرب الحصار الاستراتيجية عبر السيرفرات.',
      kittyTitle: 'أزياء Campus Kitty: جولة العجائب للقطط اللطيفة',
      kittyBadge: 'أزياء تشيبي وقطط أليفة',
      kittyDesc:
        'أزياء بحارة كلاسيكية باللون الأزرق السماوي مع آذان القطط وقطط صغيرة مرافقة فـ برونتيرا مع الشعار الرسمي الأسطوري للعبة.',
      kittyPill1: 'أزياء بحارة باللون السماوي',
      kittyPill2: 'قطط مرافقة حقيقية',
      kittyPill3: 'تغيير شكل حر ومجاني',
      siegeTitle: 'حرب الحصار: معركة الإمبراطورية (War of Emperium)',
      siegeBadge: 'معارك الغيلد الكبرى (GvG)',
      siegeDesc:
        'جمع أعضاء الغيلد ديالك وحاصر القلاع الإمبراطورية التاريخية، دمر كريستالة الإمبيريوم ورفع راية انتصارك فـ أضخم حروب السيرفرات.',
      siegePill1: 'اقتحام قلاع السيرفرات',
      siegePill2: 'تعاون أكثر من 24 مهنة',
      siegePill3: 'أسلحة ورايات غيلد أسطورية',
      inspectBtn: 'عرض الصورة بدقة كاملة',
    },
  };

  const t = content[activeLanguage as keyof typeof content] || content.en;

  const kittyImg = '/assets/aistudio/image_2f98b010.png';
  const siegeImg = '/assets/aistudio/image_d1a84294.png';

  return (
    <section id="seasonal" className="py-20 lg:py-28 bg-[#070b16] relative overflow-hidden border-b border-blue-500/20">
      
      {/* Ambient glowing orbs tuned to the Chibi Logo colors (Sapphire Blue, Poring Pink, and Sun Gold) */}
      <div className="absolute top-1/3 -left-36 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-36 w-96 h-96 bg-pink-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[32rem] h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
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

        {/* 2-Card Side-by-Side Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Campus Kitty - Pastel Sapphire & Poring Pink Theme */}
          <div className="rounded-3xl border-2 border-sky-500/40 hover:border-pink-500/60 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-[#0c1328] shadow-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 group hover:shadow-sky-500/10">
            <div>
              {/* Image Preview Container */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] mb-5 border border-sky-500/30 bg-black cursor-pointer group/img">
                <img
                  src={kittyImg}
                  alt={t.kittyTitle}
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700"
                  onClick={() => onInspectImage(kittyImg, `${t.kittyTitle} - Official Ragnarok Chibi Artwork`)}
                />
                
                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Badge Top Left */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-slate-950/85 border border-pink-400/70 text-[11px] font-black text-pink-300 uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5 shadow-md">
                    <Cat className="w-3.5 h-3.5 text-pink-400" />
                    <span>{t.kittyBadge}</span>
                  </span>
                </div>

                {/* Inspect Button Top Right */}
                <button
                  type="button"
                  onClick={() => onInspectImage(kittyImg, `${t.kittyTitle} - Official Ragnarok Chibi Artwork`)}
                  className="absolute top-3.5 right-3.5 p-2 rounded-xl bg-slate-950/85 hover:bg-sky-500 hover:text-slate-950 text-sky-300 border border-sky-400/60 text-xs font-bold transition-all backdrop-blur-md shadow-md cursor-pointer flex items-center gap-1.5"
                  title="Inspect Full Image"
                >
                  <Eye className="w-4 h-4" />
                  <span className="hidden sm:inline text-[11px]">Inspect Art</span>
                </button>
              </div>

              {/* Title & Description */}
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-sky-300 transition-colors flex items-center gap-2">
                <span>{t.kittyTitle}</span>
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-5">
                {t.kittyDesc}
              </p>

              {/* Pills */}
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

            {/* Bottom Action */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs font-mono text-sky-400 font-semibold">
                RAGNARÖK • THE NEW WORLD
              </span>
              <button
                type="button"
                onClick={() => onInspectImage(kittyImg, `${t.kittyTitle} - Official Ragnarok Chibi Artwork`)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-sky-500/20 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{t.inspectBtn}</span>
              </button>
            </div>
          </div>

          {/* Card 2: Siege War - Fiery Gold & Celestial Sapphire Battle */}
          <div className="rounded-3xl border-2 border-amber-500/40 hover:border-red-500/60 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-[#1b0e12] shadow-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 group hover:shadow-amber-500/10">
            <div>
              {/* Image Preview Container */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] mb-5 border border-amber-500/30 bg-black cursor-pointer group/img">
                <img
                  src={siegeImg}
                  alt={t.siegeTitle}
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700"
                  onClick={() => onInspectImage(siegeImg, `${t.siegeTitle} - Imperial Castle Siege (GvG)`)}
                />

                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Badge Top Left */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-slate-950/85 border border-amber-400/70 text-[11px] font-black text-amber-300 uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5 shadow-md">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    <span>{t.siegeBadge}</span>
                  </span>
                </div>

                {/* Inspect Button Top Right */}
                <button
                  type="button"
                  onClick={() => onInspectImage(siegeImg, `${t.siegeTitle} - Imperial Castle Siege (GvG)`)}
                  className="absolute top-3.5 right-3.5 p-2 rounded-xl bg-slate-950/85 hover:bg-amber-500 hover:text-slate-950 text-amber-300 border border-amber-400/60 text-xs font-bold transition-all backdrop-blur-md shadow-md cursor-pointer flex items-center gap-1.5"
                  title="Inspect Full Image"
                >
                  <Eye className="w-4 h-4" />
                  <span className="hidden sm:inline text-[11px]">Inspect Art</span>
                </button>
              </div>

              {/* Title & Description */}
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors flex items-center gap-2">
                <span>{t.siegeTitle}</span>
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-5">
                {t.siegeDesc}
              </p>

              {/* Pills */}
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

            {/* Bottom Action */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs font-mono text-amber-400 font-semibold">
                WAR OF EMPERIUM • MIDGARD
              </span>
              <button
                type="button"
                onClick={() => onInspectImage(siegeImg, `${t.siegeTitle} - Imperial Castle Siege (GvG)`)}
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
