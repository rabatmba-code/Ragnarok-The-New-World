import React, { useState } from 'react';
import { Compass, ShoppingBag, Shirt, Heart, Sparkles, CheckCircle2, ChevronRight, Eye, Users } from 'lucide-react';

interface GameModesProps {
  activeLanguage: 'en' | 'fil' | 'fr' | 'ar';
  onInspectImage: (imageSrc: string, caption: string) => void;
}

export const GameModes: React.FC<GameModesProps> = ({
  activeLanguage,
  onInspectImage,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [fashionSubImage, setFashionSubImage] = useState<number>(0);
  const [socialSubImage, setSocialSubImage] = useState<number>(0);

  const fashionImages = [
    {
      src: '/assets/aistudio/image_2f98b010.png',
      label: 'Campus Kitty Wonder Tour',
      caption: 'Official Chibi Art: Campus Kitty Wonder Tour Feline Outfit, cat ears, and companion kittens in Midgard.',
    },
    {
      src: '/assets/steam_hd/steam_ss_2.jpg',
      label: '1080p Wardrobe & Angel Wings',
      caption: 'Full HD 1080p in-game Wardrobe interface: Celestial angel wings, hairstyles, and outfits catalog.',
    },
    {
      src: '/assets/steam_hd/steam_ss_5.jpg',
      label: '1080p Giant Poring Hat',
      caption: 'Full HD 1080p chibi avatars showcasing maids, tuxedos, and the iconic animated oversized pink Poring headgear.',
    },
    {
      src: '/assets/steam_hd/steam_ss_4.jpg',
      label: '1080p Boss Arena Titan',
      caption: 'Full HD 1080p Colossal MVP Boss Titan battle in the ancient Midgard arena.',
    },
  ];

  const socialImages = [
    {
      src: '/assets/aistudio/image_d1a84294.png',
      label: 'Siege War Imperial Clash',
      caption: 'Official Siege War (WoE): Epic cross-server battle between guilds clashing for imperial castle control.',
    },
    {
      src: '/assets/steam_hd/steam_ss_8.jpg',
      label: '1080p Cathedral Holy Matrimony',
      caption: 'Full HD 1080p wedding ceremony at Prontera Chapel with flower petals, floral arch, and cheering guests.',
    },
    {
      src: '/assets/steam_hd/steam_ss_6.jpg',
      label: '1080p Guild WoE Castle Siege',
      caption: 'Full HD 1080p intense Guild vs Guild War of Emperium castle battle with guild banners and damage bursts.',
    },
    {
      src: '/assets/steam_hd/steam_ss_7.jpg',
      label: '1080p Midnight Neon Festival',
      caption: 'Full HD 1080p night festival with glowing purple neon slimes and guild party celebrations.',
    },
  ];

  const modesData = [
    {
      id: 'exploration',
      title: '360° Open World Freedom',
      titleFr: 'Exploration 360° Sans Limite',
      titleFil: '360° Kalayaan sa Open World',
      titleAr: 'استكشاف حر 360 درجة بلا حدود',
      icon: Compass,
      tag: '1080p Full HD • Exploration & Parkour',
      tagFr: 'Full HD 1080p • Exploration & Parkour',
      tagFil: '1080p Full HD • Paglalakbay at Parkour',
      tagAr: 'دقة عالية 1080p • حرية وحركات باركور',
      badgeColor: 'from-sky-500 to-blue-600',
      image: '/assets/steam_hd/steam_ss_10.jpg',
      caption: 'Full HD 1080p: spire steeple scaling, freshwater swimming, and celestial bubble gliders.',
      description:
        'Climb to the very tip of the Prontera church steeple to scout the realm, dive into crystal-clear rivers to uncover sunken ruins, or summon ethereal anti-gravity bubbles to glide under the starry night canopy.',
      features: [
        'Free vertical parkour: scale any rooftop, fortress, or ancient ruins',
        'Dynamic aquatic swimming & underwater exploration mechanics',
        'Astral bubble flight with panoramic 360-degree camera view',
        'Real-time day, sunset, and starry celestial night cycles',
      ],
      gamerQuote:
        '"Forget invisible walls. If you can see the top of that cathedral, you can climb it."',
    },
    {
      id: 'economy',
      title: 'Prontera Living Market & Street Stalls',
      titleFr: 'Le Grand Marché Vivant de Prontera',
      titleFil: 'Buhay na Palengke at Tindahan sa Prontera',
      titleAr: 'سوق برونتيرا الشعبي وتجارة اللاعبين',
      icon: ShoppingBag,
      tag: 'Living Player Economy',
      tagFr: 'Économie 100% Joueur',
      tagFil: 'Buhay na Ekonomiya ng Manlalaro',
      tagAr: 'اقتصاد حر وتجارة حية',
      badgeColor: 'from-amber-500 to-yellow-600',
      image: '/assets/steam_hd/steam_ss_1.jpg',
      caption: 'Full HD 1080p: The heart of Midgard: hundreds of player merchant shops packed across Prontera plaza.',
      description:
        'The true soul of Ragnarok lives in its street stalls! Sit your character down anywhere in Prontera, pop up a custom sign bubble like "No. 1 Gold Gear", "Clearance Sale", or "Lucky Stall", and trade rare MVP cards and crafted elixirs directly with fellow players.',
      features: [
        'Open player vending stalls with custom dialogue bubbles',
        'Offline stall persistence: keep earning millions of Zeny while sleeping',
        'P2P direct trading with zero hidden broker tax cuts',
        'Live market price graphs and MVP card drop notifications',
      ],
      gamerQuote:
        '"Opening a shop with a funny slogan in Prontera is an art form in itself."',
    },
    {
      id: 'fashion',
      title: 'Haute Couture & Wardrobe Freedom',
      titleFr: 'Garde-Robe & Personnalisation Chibi',
      titleFil: 'Moda at Wardrobe ng mga Pakpak ng Anghel',
      titleAr: 'أزياء أنمي فاخرة، أجنحة واستوديو الملابس',
      icon: Shirt,
      tag: 'Wardrobe & Angel Wings',
      tagFr: 'Costumes & Ailes Célestes',
      tagFil: 'Kasuotan at Pakpak ng Anghel',
      tagAr: 'أجنحة ملاك وقبعات البورينغ الشهيرة',
      badgeColor: 'from-pink-500 to-purple-600',
      image: fashionImages[fashionSubImage].src,
      caption: fashionImages[fashionSubImage].caption,
      description:
        'Your character, your aesthetic identity! Equip feathered angel wings, customize hair colors, accessorize with bubblegum emotes, and collect sets like Star Dream, Sweet Doll, and Sunny Sailor in the live wardrobe studio.',
      features: [
        'Equip majestic feathered angel wings and animated headgears',
        'Over 2,500+ collectable hats, suits, maid gowns, and weapons',
        'Dye workshop: custom hex palette colors for outfits and hair',
        'Stat-free wardrobe transmog: look stylish without sacrificing combat stats',
      ],
      gamerQuote:
        '"Fashion is the true end-game. Feathered wings and a bubblegum emote are worth more than any sword."',
    },
    {
      id: 'romance',
      title: 'Midnight Guilds & Holy Matrimony',
      titleFr: 'Soirées de Guilde & Mariage Sacré',
      titleFil: 'Hatinggabi ng Guild at Banal na Kasalan',
      titleAr: 'حفلات الغيلد الليلية والزواج الملكي',
      icon: Heart,
      tag: 'Guild Night Festivals & Romance',
      tagFr: 'Festivals de Nuit & Romance',
      tagFil: 'Pista ng Guild sa Gabi at Romansa',
      tagAr: 'حفلات القلعة والزواج داخل اللعبة',
      badgeColor: 'from-rose-500 to-red-600',
      image: socialImages[socialSubImage].src,
      caption: socialImages[socialSubImage].caption,
      description:
        'Midgard comes alive at night! Gather your guild in front of the royal castle for lantern festivals and guild photo sessions, or host a lavish wedding at the Prontera Chapel with fireworks and rose petals.',
      features: [
        'Night castle square festivals with lanterns and guild group poses',
        'Full cathedral wedding ceremony with custom vows and invitations',
        'Couple skill "I Miss You": instant teleportation to your partner’s side',
        'Guild banquets, rooftop campfire acoustic sessions, and duo buffs',
      ],
      gamerQuote:
        '"Taking guild photos at midnight in front of the castle with lanterns floating into the sky is pure magic."',
    },
  ];

  const currentMode = modesData[activeTab];

  const headers = {
    en: {
      tag: 'LIVING THE GAME MODE',
      heading: 'Not Just Playing A Game. Living In It.',
      subheading:
        'Explore the 4 core pillars that make Ragnarok: The New World an unforgettable second home for true MMO gamers.',
    },
    fil: {
      tag: 'BUHAYIN ANG MODE NG LARO',
      heading: 'Hindi Lang Basta Naglalaro. Naninirahan Dito.',
      subheading:
        'Tuklasin ang 4 na pangunahing haligi na nagbibigay-buhay sa Ragnarok: The New World para sa mga tunay na MMO gamers.',
    },
    fr: {
      tag: 'VIVRE LE MODE DE JEU',
      heading: 'Ne jouez pas simplement. Habitez ce monde.',
      subheading:
        'Découvrez les 4 piliers d’immersion totale conçus spécialement pour les passionnés de MMORPG.',
    },
    ar: {
      tag: 'عيش المود دو جو الحقيقي',
      heading: 'ماشي غي لعبة... هاذا عالم كتعيش فيه!',
      subheading:
        'اكتشف الركائز الـ 4 لي كتخلي راغناروك تجربة غيمينغ أسطورية كتعيشها بكل تفاصيلها.',
    },
  };

  const h = headers[activeLanguage as keyof typeof headers] || headers.en;

  return (
    <section id="modes" className="py-20 lg:py-28 bg-[#080c14] relative overflow-hidden border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{h.tag}</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            {h.heading}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            {h.subheading}
          </p>
        </div>

        {/* 4 Interactive Mode Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 max-w-4xl mx-auto">
          {modesData.map((mode, index) => {
            const Icon = mode.icon;
            const isSelected = activeTab === index;
            const title =
              activeLanguage === 'fil'
                ? mode.titleFil
                : activeLanguage === 'fr'
                ? mode.titleFr
                : activeLanguage === 'ar'
                ? mode.titleAr
                : mode.title;

            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => setActiveTab(index)}
                className={`p-3.5 sm:p-4 rounded-2xl flex flex-col items-center text-center transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-slate-900 border-amber-400 shadow-lg shadow-amber-500/10 transform -translate-y-1'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center mb-2.5 bg-gradient-to-br ${
                    isSelected ? mode.badgeColor : 'from-slate-800 to-slate-900'
                  } text-white shadow-md`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-xs sm:text-sm font-bold ${isSelected ? 'text-amber-400' : 'text-slate-300'}`}>
                  {title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Mode Deep Dive Showcase */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-xl shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Visual Area with Sub-Switchers and Click-to-Zoom */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            
            {/* Sub-image Switcher buttons for Fashion and Social */}
            {activeTab === 2 && (
              <div className="flex items-center gap-2 mb-1 overflow-x-auto pb-1">
                {fashionImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFashionSubImage(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      fashionSubImage === idx
                        ? 'bg-pink-500 text-white shadow-md shadow-pink-500/30'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
                    }`}
                  >
                    {img.label}
                  </button>
                ))}
              </div>
            )}

            {activeTab === 3 && (
              <div className="flex items-center gap-2 mb-1 overflow-x-auto pb-1">
                {socialImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSocialSubImage(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      socialSubImage === idx
                        ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
                    }`}
                  >
                    {img.label}
                  </button>
                ))}
              </div>
            )}

            <div className="relative group rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 shadow-xl aspect-[16/10]">
              <img
                src={currentMode.image}
                alt={currentMode.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 cursor-pointer"
                onClick={() => onInspectImage(currentMode.image, currentMode.caption)}
              />
              
              {/* Overlay hover badge */}
              <div
                onClick={() => onInspectImage(currentMode.image, currentMode.caption)}
                className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer backdrop-blur-[2px]"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 text-amber-400 text-xs font-bold border border-amber-400/50 shadow-lg">
                  <Eye className="w-4 h-4" />
                  <span>Click to Inspect High-Res Capture</span>
                </span>
              </div>

              {/* Bottom Caption Pill */}
              <div className="absolute bottom-3 inset-x-3 bg-slate-950/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                <span className="truncate">{currentMode.caption}</span>
                <span className="text-[10px] text-amber-400 font-mono shrink-0 ml-2">RO: NEXT-GEN</span>
              </div>
            </div>
          </div>

          {/* Right Explanatory Details */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-bold text-amber-400 w-fit mb-4">
              <span>{currentMode.tag}</span>
            </div>

            <h3 className="font-cinzel text-2xl sm:text-3xl font-black text-white mb-4 leading-snug">
              {activeLanguage === 'fil'
                ? currentMode.titleFil
                : activeLanguage === 'fr'
                ? currentMode.titleFr
                : activeLanguage === 'ar'
                ? currentMode.titleAr
                : currentMode.title}
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              {currentMode.description}
            </p>

            {/* Feature Bullets */}
            <div className="space-y-2.5 mb-6">
              {currentMode.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Gamer Quote Card */}
            <div className="p-3.5 rounded-xl bg-slate-950/70 border-l-4 border-amber-400 text-xs italic text-amber-200/90 mb-4 font-mono">
              {currentMode.gamerQuote}
            </div>

            {/* Sub-CTA */}
            <a
              href="#market"
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 group transition-colors"
            >
              <span>Explore the Prontera Live Marketplace</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

          </div>

        </div>

      </div>
    </section>
  );
};
