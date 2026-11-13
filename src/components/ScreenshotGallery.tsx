import React, { useState } from 'react';
import { Eye, Sparkles, X, ChevronLeft, ChevronRight, Camera, Filter } from 'lucide-react';

interface ScreenshotGalleryProps {
  activeLanguage: 'en' | 'fil' | 'fr' | 'ar';
}

export const ScreenshotGallery: React.FC<ScreenshotGalleryProps> = ({ activeLanguage }) => {
  const screenshots = [
    {
      id: 'campus_kitty_wonder',
      src: '/assets/aistudio/image_2f98b010.png',
      title: 'Campus Kitty: Wonder Tour Feline Outfit',
      subtitle: 'Official Chibi Visual • Cat Ears, Sailor Uniforms & Midgard Kittens',
      category: 'Customization',
      description:
        'Official Ragnarok: The New World chibi artwork celebrating the Campus Kitty Wonder Tour! Features adorable feline-eared adventurers in pastel sailor suits with companion kittens.',
    },
    {
      id: 'siege_war_emperium',
      src: '/assets/aistudio/image_d1a84294.png',
      title: 'Imperial Siege War: War of Emperium (GvG)',
      subtitle: 'Official Battle Art • Cross-Server Castle Clash & Emperium Siege',
      category: 'Guild Life',
      description:
        'Fierce guild warfare visual showing Knights, Monks, Priests, and Hunters in the celestial and molten fury of cross-server castle conquest.',
    },
    {
      id: 'legend_cup_4k',
      src: '/assets/aistudio/image_81863f60.png',
      title: 'Legend Cup 2026: Fight To Be Legend (4K UHD)',
      subtitle: '🎁 Share & Win a $10 Gift Card! • US$1.01M Prize Pool & Growing',
      category: 'Key Visual',
      description:
        'Official 4K key visual for the 2026 Inaugural Legend Cup Global Tournament starting Nov 9. Features the golden Poring trophy and champions ascending to victory.',
    },
    {
      id: 'keyart',
      src: '/assets/steam_hd/steam_ss_3.jpg',
      title: 'Across Time Into The New World',
      subtitle: 'Official Key Visual • Free Ultimate Adventure (1080p Full HD)',
      category: 'Key Visual',
      description:
        'Adventurers aboard the royal airship cruising high above Midgard, gazing at the majestic spires of Prontera and the World Tree Yggdrasil.',
    },
    {
      id: 'prontera',
      src: '/assets/steam_hd/steam_ss_1.jpg',
      title: 'Prontera Central Bazaar & Street Stalls',
      subtitle: '1080p Full HD • Living Player Market & Free Trade Plaza',
      category: 'Town Life',
      description:
        'Hundreds of players gathered in the heart of Prontera, running personal trading stalls, bargaining for rare MVP cards, and socializing around the cathedral fountains.',
    },
    {
      id: 'exploration',
      src: '/assets/steam_hd/steam_ss_10.jpg',
      title: 'Tri-Modal 360° Open World Freedom',
      subtitle: '1080p Full HD • Steeple Climbing • River Swimming • Starry Flight',
      category: 'Exploration',
      description:
        'Seamless three-dimensional travel: scale gothic church towers, swim across crystalline rivers, and float in enchanted cosmic bubbles under a starlit night.',
    },
    {
      id: 'wardrobe_ui',
      src: '/assets/steam_hd/steam_ss_2.jpg',
      title: 'In-Game Wardrobe Studio & Angel Wings',
      subtitle: '1080p Full HD • Dynamic Wings, Bubblegum Emote & Outfit Catalog',
      category: 'Customization',
      description:
        'Equip majestic feathered angel wings, playful bubblegum face accessories, and unlock full sets like Star Dream, Sweet Doll, and Sunny Sailor in the live wardrobe UI.',
    },
    {
      id: 'guild_siege',
      src: '/assets/steam_hd/steam_ss_6.jpg',
      title: 'War of Emperium & Guild Castle Siege',
      subtitle: '1080p Full HD • Epic Guild vs Guild Battles & Imperial Banners',
      category: 'Guild Life',
      description:
        'Fierce guild competition inside imperial fortresses: clash for castle ownership, coordinate guild abilities, and etch your banner into Midgard history.',
    },
    {
      id: 'boss_arena',
      src: '/assets/steam_hd/steam_ss_4.jpg',
      title: 'Colossal MVP Boss Arena Encounter',
      subtitle: '1080p Full HD • Ancient Dungeon Titans & Raid Coordination',
      category: 'Exploration',
      description:
        'Face off against towering mythological bosses with deep telegraphed combat mechanics, elemental synergies, and legendary gear drops.',
    },
    {
      id: 'wardrobe_poring',
      src: '/assets/steam_hd/steam_ss_5.jpg',
      title: 'Chibi Wardrobe & The Giant Poring Hat',
      subtitle: '1080p Full HD • Over 2,500+ Costumes & Animated Headgears',
      category: 'Customization',
      description:
        'Express your unique gaming identity with adorable chibi avatars, formal wedding attire, maid dresses, and the legendary oversized animated pink Poring headgear.',
    },
    {
      id: 'romance',
      src: '/assets/steam_hd/steam_ss_8.jpg',
      title: 'Holy Matrimony & Cathedral Vows',
      subtitle: '1080p Full HD • Prontera Wedding Chapel • Rose Petal Procession',
      category: 'Social & Romance',
      description:
        'Tie the knot with your trusted gaming partner in a grand floral ceremony surrounded by guildmates, unlocking exclusive couple teleportation and synergy buffs.',
    },
    {
      id: 'midnight_fest',
      src: '/assets/steam_hd/steam_ss_7.jpg',
      title: 'Midnight Slime & Poring Light Festival',
      subtitle: '1080p Full HD • Neon Celebrations & Festive Bonfires',
      category: 'Guild Life',
      description:
        'Dance beneath neon-lit night skies, participate in festival mini-games, and collect rare commemorative tokens with your party members.',
    },
    {
      id: 'sunset_coast',
      src: '/assets/steam_hd/steam_ss_11.jpg',
      title: 'Tropical Sunset Coastline & Horizons',
      subtitle: '1080p Full HD • Coastal Breezes & Exotic Island Dungeons',
      category: 'Exploration',
      description:
        'Relax along golden sun-kissed beaches, board coastal vessels to uncharted islands, and discover hidden marine grottos filled with aquatic treasures.',
    },
  ];

  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'Key Visual', 'Town Life', 'Exploration', 'Customization', 'Guild Life', 'Social & Romance'];

  const filteredScreenshots =
    filterCategory === 'All'
      ? screenshots
      : screenshots.filter((s) => s.category === filterCategory);

  const openLightbox = (index: number) => {
    // Find the real index in original screenshots array
    const targetItem = filteredScreenshots[index];
    const realIndex = screenshots.findIndex((s) => s.id === targetItem.id);
    setActiveLightboxIndex(realIndex >= 0 ? realIndex : 0);
  };

  const closeLightbox = () => setActiveLightboxIndex(null);

  const prevImage = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((activeLightboxIndex - 1 + screenshots.length) % screenshots.length);
  };

  const nextImage = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((activeLightboxIndex + 1) % screenshots.length);
  };

  const titles = {
    en: {
      tag: 'IN-GAME VISUAL ARCHIVE',
      heading: 'Every Frame Tells An Epic Story',
      subheading:
        'High-resolution captures directly from the game engine showing authentic gameplay, social towns, wardrobe studio, guild parties, and open-world freedom.',
      showingCount: 'Showing captures from Midgard:',
    },
    fil: {
      tag: 'IN-GAME VISUAL ARCHIVE',
      heading: 'Bawat Larawan May Kuwentong Maalamat',
      subheading:
        'Mataas na kalidad na kuha direkta mula sa game engine na nagpapakita ng tunay na gameplay, mga bayan, wardrobe studio, guild parties, at open-world freedom.',
      showingCount: 'Ipinapakitang mga kuha mula sa Midgard:',
    },
    fr: {
      tag: 'ARCHIVES VISUELLES DU JEU',
      heading: 'Chaque image raconte une histoire épique',
      subheading:
        'Captures haute résolution tirées du moteur de jeu montrant l’action réelle, la garde-robe, les soirées de guilde et les paysages de Midgard.',
      showingCount: 'Captures officielles du jeu :',
    },
    ar: {
      tag: 'ألبوم صور من قلب اللعبة',
      heading: 'شوف الجرافيك والعوالم بدقة عالية',
      subheading:
        'تصاور جديدة وحقيقية من داخل اللعبة: أجنحة الملاك، حفلات الغيلد بالليل، ستايلات الأنمي، وزحمة برونتيرا.',
      showingCount: 'الصور المعروضة من عالم اللعبة:',
    },
  };

  const t = titles[activeLanguage as keyof typeof titles] || titles.en;

  return (
    <section className="py-20 lg:py-28 bg-[#080c14] relative overflow-hidden border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Camera className="w-3.5 h-3.5" />
            <span>{t.tag}</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            {t.heading}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            {t.subheading}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilterCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterCategory === cat
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid: 8 high-res captures */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScreenshots.map((item, index) => {
            const isWide = item.id === 'keyart' || item.id === 'midnight_fest';
            return (
              <div
                key={item.id}
                onClick={() => openLightbox(index)}
                className={`group relative rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-400/80 bg-slate-900 shadow-xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1 ${
                  isWide ? 'md:col-span-2 lg:col-span-2 aspect-[16/9]' : 'aspect-[16/10]'
                }`}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/25 to-transparent group-hover:from-slate-950/95 transition-all" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-slate-950/85 border border-slate-700/80 text-[11px] font-bold text-amber-400 uppercase tracking-wider backdrop-blur-md">
                    {item.category}
                  </span>
                </div>

                {/* Hover Zoom Icon */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-9 h-9 rounded-full bg-slate-900/90 border border-amber-400/60 text-amber-400 flex items-center justify-center shadow-lg">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Information */}
                <div className="absolute bottom-0 inset-x-0 p-5">
                  <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center text-xs text-slate-400">
          <span>{t.showingCount} </span>
          <strong className="text-amber-400 font-bold">{filteredScreenshots.length} / {screenshots.length} Full HD (1080p) Captures</strong>
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-slate-950/95 backdrop-blur-lg animate-in fade-in"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-5xl w-full bg-slate-900 border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="p-4 px-6 bg-slate-950 flex items-center justify-between border-b border-slate-800">
              <div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest">
                  {screenshots[activeLightboxIndex].category}
                </span>
                <h4 className="font-cinzel text-lg font-bold text-white">
                  {screenshots[activeLightboxIndex].title}
                </h4>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={closeLightbox}
                  aria-label="Close Lightbox"
                  className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Image Canvas */}
            <div className="relative aspect-[16/9] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={screenshots[activeLightboxIndex].src}
                alt={screenshots[activeLightboxIndex].title}
                className="max-w-full max-h-[70vh] object-contain"
              />

              {/* Prev / Next Controls */}
              <button
                type="button"
                onClick={prevImage}
                aria-label="Previous Image"
                className="absolute left-4 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 shadow-xl transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextImage}
                aria-label="Next Image"
                className="absolute right-4 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 shadow-xl transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Caption & Lore */}
            <div className="p-5 px-6 bg-slate-950 border-t border-slate-800 text-xs sm:text-sm text-slate-300">
              <p>{screenshots[activeLightboxIndex].description}</p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
