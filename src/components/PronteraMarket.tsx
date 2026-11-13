import React, { useState } from 'react';
import { ShoppingBag, Search, PlusCircle, Sparkles, Tag, CheckCircle2, Coins, Flame, X, MessageSquareQuote } from 'lucide-react';
import { MarketItem, INITIAL_MARKET_STALLS, filterMarketItems, formatZeny } from '../utils/gameData';
import confetti from 'canvas-confetti';

interface PronteraMarketProps {
  activeLanguage: 'en' | 'fil' | 'fr' | 'ar';
}

export const PronteraMarket: React.FC<PronteraMarketProps> = ({ activeLanguage }) => {
  const [items, setItems] = useState<MarketItem[]>(INITIAL_MARKET_STALLS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<MarketItem | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Form state for creating stall
  const [sellerName, setSellerName] = useState('');
  const [shopName, setShopName] = useState('');
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('250000');
  const [category, setCategory] = useState<MarketItem['category']>('Weapon');
  const [notes, setNotes] = useState('');
  const [whisperNotice, setWhisperNotice] = useState<string | null>(null);

  const categories = ['All', 'Weapon', 'Card', 'Headgear', 'Consumable', 'Armor'];

  const filteredItems = filterMarketItems(items, searchQuery, selectedCategory);

  const handleCreateStall = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shopName.trim() || !itemName.trim() || !sellerName.trim()) return;

    const newItem: MarketItem = {
      id: `item-${Date.now()}`,
      shopName: shopName.trim(),
      seller: sellerName.trim(),
      itemName: itemName.trim(),
      category: category,
      price: parseInt(price, 10) || 100000,
      rarity: category === 'Card' ? 'MVP' : 'Epic',
      verified: true,
      notes: notes.trim() || 'New stall open! PM in Prontera for negotiation.',
    };

    setItems([newItem, ...items]);
    setIsCreateModalOpen(false);

    // Reset form
    setShopName('');
    setItemName('');
    setSellerName('');
    setNotes('');

    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#3b82f6', '#ec4899'],
    });
  };

  const titles = {
    en: {
      tag: 'PRONTERA CENTRAL BAZAAR',
      heading: 'Living Street Market & Player Stalls',
      subheading:
        'Inspired by the crowded merchant streets of Prontera. Browse live player shops, inspect rare MVP cards, or set up your own vending stall right now!',
      searchPlaceholder: 'Search items, stalls, or sellers (e.g. Excalibur, Ghostring)...',
      openStallBtn: 'Open Your Own Stall',
      activeStalls: 'Active Stalls in Prontera:',
      viewDetails: 'Inspect Item',
      buyQuote: 'Send Whisper (PM)',
    },
    fil: {
      tag: 'GITNANG BAZAAR NG PRONTERA',
      heading: 'Buhay na Palengke at Tindahan ng Manlalaro',
      subheading:
        'Hango sa siksikang mga kalye ng mangangalakal sa Prontera. Mag-browse ng mga tindahan ng mga manlalaro, mag-inspeksyon ng mga bihirang MVP card, o magbenta sa sarili mong pwesto ngayon!',
      searchPlaceholder: 'Maghanap ng gamit, tindahan, o nagbebenta (hal. Excalibur, Ghostring)...',
      openStallBtn: 'Magbukas ng Sariling Tindahan',
      activeStalls: 'Aktibong Tindahan sa Prontera:',
      viewDetails: 'Suriin ang Gamit',
      buyQuote: 'Mag-whisper sa Laro (PM)',
    },
    fr: {
      tag: 'LE SOUK CENTRAL DE PRONTERA',
      heading: 'Marché de rue animé & Échoppes de joueurs',
      subheading:
        'Inspiré des ruelles marchandes bondées de Prontera. Parcourez les boutiques, inspectez les cartes MVP rares ou ouvrez votre propre stand dès maintenant !',
      searchPlaceholder: 'Rechercher un objet, un magasin ou un vendeur...',
      openStallBtn: 'Ouvrir mon échoppe',
      activeStalls: 'Échoppes actives à Prontera :',
      viewDetails: 'Examiner l’objet',
      buyQuote: 'Envoyer un MP (Whisper)',
    },
    ar: {
      tag: 'سوق برونتيرا الشعبي الكبير',
      heading: 'حوانيت وتجارة حية بين اللاعبين',
      subheading:
        'مستوحى من زحمة وتجارة برونتيرا التاريخية! قلب فالمتاجر، شوف بطاقات الإم في بي النادرة، ولا حط الحانوت ديالك وبيع مع راسك دابا!',
      searchPlaceholder: 'قلب على سلاح، كارت، ولا اسم البائع...',
      openStallBtn: 'افتح الحانوت ديالك',
      activeStalls: 'المتاجر المفتوحة دابا فـ برونتيرا:',
      viewDetails: 'شوف تفاصيل الغرض',
      buyQuote: 'صيفط ميساج خاص (PM)',
    },
  };

  const t = titles[activeLanguage as keyof typeof titles] || titles.en;

  return (
    <section id="market" className="py-20 lg:py-28 bg-[#070b12] relative overflow-hidden border-b border-slate-800">
      
      {/* Visual background image blur */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <img
          src="/assets/steam_hd/steam_ss_1.jpg"
          alt="Prontera Crowd"
          className="w-full h-full object-cover filter blur-md"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{t.tag}</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              {t.heading}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mt-2">
              {t.subheading}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-xl shadow-amber-400/20 transform hover:-translate-y-0.5 transition-all cursor-pointer shrink-0 self-start md:self-auto"
          >
            <PlusCircle className="w-5 h-5 text-slate-950" />
            <span>{t.openStallBtn}</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 mb-8 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>
        </div>

        {/* Stalls Grid matching the in-game shop bubble aesthetic */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-amber-400/70 rounded-2xl p-5 transition-all duration-300 shadow-lg hover:shadow-amber-500/10 cursor-pointer flex flex-col justify-between relative overflow-hidden"
            >
              {/* Top RO Speech Bubble Header */}
              <div className="mb-3.5">
                <div className="bg-gradient-to-r from-amber-500/15 via-yellow-500/15 to-transparent border border-amber-500/40 rounded-xl px-3 py-2 flex items-center justify-between gap-2 shadow-inner">
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="text-xs font-black text-amber-300 truncate font-mono">
                      "{item.shopName}"
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-950/80 text-amber-400 border border-amber-500/30 shrink-0">
                    {item.rarity}
                  </span>
                </div>
              </div>

              {/* Item Card Body */}
              <div className="flex items-start gap-3.5 mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  {item.category === 'Weapon' && <span className="text-2xl">⚔️</span>}
                  {item.category === 'Card' && <span className="text-2xl">🎴</span>}
                  {item.category === 'Headgear' && <span className="text-2xl">👑</span>}
                  {item.category === 'Consumable' && <span className="text-2xl">🥞</span>}
                  {item.category === 'Armor' && <span className="text-2xl">🛡️</span>}
                </div>

                <div className="overflow-hidden">
                  <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                    {item.itemName}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                    <span>Seller:</span>
                    <span className="text-slate-200 font-medium truncate">{item.seller}</span>
                    {item.verified && (
                      <CheckCircle2 className="w-3 h-3 text-sky-400 shrink-0" />
                    )}
                  </div>
                </div>
              </div>

              {/* Price and Action Footer */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-amber-400 font-extrabold text-sm">
                  <Coins className="w-4 h-4 text-amber-400" />
                  <span>{formatZeny(item.price)}</span>
                </div>

                <span className="text-xs font-semibold text-slate-400 group-hover:text-amber-300 flex items-center gap-1">
                  {t.viewDetails} &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Live Stalls Counter */}
        <div className="mt-8 text-center text-xs text-slate-400">
          <span>{t.activeStalls} </span>
          <strong className="text-amber-400 font-bold">{filteredItems.length} Shops</strong>
          <span> • Real-time synchronization with Midgard Channel 1</span>
        </div>

        {whisperNotice && (
          <div
            role="status"
            className="mt-4 max-w-xl mx-auto px-4 py-3 rounded-xl bg-emerald-500/15 border border-emerald-400/50 text-emerald-200 text-xs font-semibold flex items-center justify-between gap-3 shadow-lg"
          >
            <span>{whisperNotice}</span>
            <button
              type="button"
              onClick={() => setWhisperNotice(null)}
              aria-label="Dismiss whisper confirmation"
              className="text-emerald-300 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>

      {/* Modal: Item Details Inspector */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-slate-900 border border-amber-500/50 rounded-2xl p-6 max-w-md w-full shadow-2xl animate-in zoom-in-95 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Prontera Market Official Listing</span>
            </div>

            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 mb-4 flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-slate-900 border border-amber-500/30 flex items-center justify-center text-3xl">
                {selectedItem.category === 'Weapon' && '⚔️'}
                {selectedItem.category === 'Card' && '🎴'}
                {selectedItem.category === 'Headgear' && '👑'}
                {selectedItem.category === 'Consumable' && '🥞'}
                {selectedItem.category === 'Armor' && '🛡️'}
              </div>
              <div>
                <h3 className="text-base font-bold text-white">{selectedItem.itemName}</h3>
                <span className="inline-block mt-0.5 text-[11px] font-bold px-2 py-0.5 rounded bg-amber-400/20 text-amber-300">
                  {selectedItem.rarity} {selectedItem.category}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-300 mb-6 bg-slate-950/50 p-3.5 rounded-xl border border-slate-800/80">
              <div className="flex justify-between">
                <span className="text-slate-400">Vending Stall:</span>
                <span className="font-bold text-amber-300">"{selectedItem.shopName}"</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Merchant / Adventurer:</span>
                <span className="font-semibold text-white">{selectedItem.seller}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Asking Price:</span>
                <span className="font-extrabold text-amber-400 text-sm">{formatZeny(selectedItem.price)}</span>
              </div>
              {selectedItem.notes && (
                <div className="pt-2 border-t border-slate-800 text-slate-300 italic">
                  "{selectedItem.notes}"
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setWhisperNotice(
                    `Sent in-game whisper to ${selectedItem.seller}: "Interested in buying [${selectedItem.itemName}]!"`
                  );
                  setSelectedItem(null);
                }}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-bold text-xs uppercase tracking-wider hover:from-amber-300 hover:to-yellow-300 transition-all cursor-pointer"
              >
                {t.buyQuote}
              </button>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="py-3 px-4 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Open Your Own Stall */}
      {isCreateModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md"
          onClick={() => setIsCreateModalOpen(false)}
        >
          <div
            className="bg-slate-900 border border-amber-500/50 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h3 className="font-cinzel text-xl font-bold text-white">
                Set Up Your Prontera Stall
              </h3>
            </div>
            <p className="text-xs text-slate-400 mb-6">
              Write your stall's custom speech bubble, name your price, and broadcast it to all adventurers in Prontera.
            </p>

            <form onSubmit={handleCreateStall} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Merchant / Character Name *
                </label>
                <input
                  type="text"
                  required
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                  placeholder="e.g. Atlas_Rabat or MorrocBlade"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Stall Speech Bubble Title *
                </label>
                <input
                  type="text"
                  required
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  placeholder="e.g. Clearance Sale! Everything Must Go!"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Item Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    placeholder="e.g. +10 Assassin Katar"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Weapon">Weapon</option>
                    <option value="Card">Card</option>
                    <option value="Headgear">Headgear</option>
                    <option value="Consumable">Consumable</option>
                    <option value="Armor">Armor</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Price (in Zeny) *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="250000"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Stall Description / Note
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Clean card, no lowballers, meet near the fountain"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-bold text-xs uppercase tracking-wider hover:from-amber-300 hover:to-yellow-300 transition-all cursor-pointer shadow-lg shadow-amber-400/20"
                >
                  Publish Stall to Prontera
                </button>
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="py-3 px-5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
