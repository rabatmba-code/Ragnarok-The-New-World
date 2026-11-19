import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  Sparkles,
  CheckCircle2,
  Coins,
  X,
  ArrowUpRight,
  Sword,
  CakeSlice,
  Ghost,
  Flame,
  Crown,
  Shield,
} from 'lucide-react';
import {
  MarketIconKey,
  MarketItem,
  INITIAL_MARKET_STALLS,
  filterMarketItems,
  formatZeny,
} from '../utils/gameData';
import { SupportedLanguage } from '../utils/trackingAndLocale';

interface PronteraMarketProps {
  activeLanguage: SupportedLanguage;
}

const MARKET_ICON_MAP: Record<
  MarketIconKey,
  {
    Icon: React.ComponentType<{ className?: string }>;
    badgeClass: string;
    iconClass: string;
  }
> = {
  sword: {
    Icon: Sword,
    badgeClass: 'bg-gradient-to-br from-amber-500/25 via-yellow-500/15 to-slate-950 border-amber-400/55 shadow-amber-500/15',
    iconClass: 'text-amber-300',
  },
  cake: {
    Icon: CakeSlice,
    badgeClass: 'bg-gradient-to-br from-pink-500/25 via-rose-500/15 to-slate-950 border-pink-400/55 shadow-pink-500/15',
    iconClass: 'text-pink-300',
  },
  ghost: {
    Icon: Ghost,
    badgeClass: 'bg-gradient-to-br from-cyan-500/25 via-indigo-500/15 to-slate-950 border-cyan-400/55 shadow-cyan-500/15',
    iconClass: 'text-cyan-300',
  },
  flame: {
    Icon: Flame,
    badgeClass: 'bg-gradient-to-br from-rose-500/25 via-orange-500/15 to-slate-950 border-rose-400/55 shadow-rose-500/15',
    iconClass: 'text-rose-300',
  },
  crown: {
    Icon: Crown,
    badgeClass: 'bg-gradient-to-br from-violet-500/25 via-fuchsia-500/15 to-slate-950 border-violet-400/55 shadow-violet-500/15',
    iconClass: 'text-violet-300',
  },
  shield: {
    Icon: Shield,
    badgeClass: 'bg-gradient-to-br from-emerald-500/25 via-teal-500/15 to-slate-950 border-emerald-400/55 shadow-emerald-500/15',
    iconClass: 'text-emerald-300',
  },
};

function renderMarketIcon(iconKey: MarketIconKey, sizeClass = 'w-6 h-6') {
  const config = MARKET_ICON_MAP[iconKey] || MARKET_ICON_MAP.sword;
  const IconComponent = config.Icon;
  return {
    badgeClass: config.badgeClass,
    element: <IconComponent className={`${sizeClass} ${config.iconClass}`} />,
  };
}

export const PronteraMarket: React.FC<PronteraMarketProps> = ({ activeLanguage }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<MarketItem | null>(null);

  const categories = ['All', 'Weapon', 'Card', 'Headgear', 'Consumable', 'Armor'] as const;

  const filteredItems = filterMarketItems(INITIAL_MARKET_STALLS, searchQuery, selectedCategory);

  const titles: Record<
    SupportedLanguage,
    {
      tag: string;
      heading: string;
      subheading: string;
      searchPlaceholder: string;
      marketCtaBtn: string;
      activeStalls: string;
      shopsUnit: string;
      syncNote: string;
      sellerLabel: string;
      viewDetails: string;
      tradeInGameCta: string;
      closeBtn: string;
      officialListing: string;
      vendingStallLabel: string;
      merchantLabel: string;
      askingPriceLabel: string;
      categoryLabels: Record<(typeof categories)[number], string>;
    }
  > = {
    en: {
      tag: 'PRONTERA CENTRAL BAZAAR',
      heading: 'Living Street Market & Player Stalls',
      subheading:
        'Inspired by the crowded merchant streets of Prontera. Browse live player shops, inspect rare MVP cards, and jump straight into free trading in-game.',
      searchPlaceholder: 'Search items, stalls, or sellers (e.g. Excalibur, Ghostring)...',
      marketCtaBtn: 'Play Free & Trade on Steam',
      activeStalls: 'Featured Stalls in Prontera:',
      shopsUnit: 'Shops',
      syncNote: '100% Free Player-to-Player Trading in Midgard',
      sellerLabel: 'Seller:',
      viewDetails: 'Inspect Item',
      tradeInGameCta: 'Download & Trade In-Game',
      closeBtn: 'Close',
      officialListing: 'Prontera Market Official Listing',
      vendingStallLabel: 'Vending Stall:',
      merchantLabel: 'Merchant / Adventurer:',
      askingPriceLabel: 'Asking Price:',
      categoryLabels: {
        All: 'All',
        Weapon: 'Weapon',
        Card: 'Card',
        Headgear: 'Headgear',
        Consumable: 'Consumable',
        Armor: 'Armor',
      },
    },
    id: {
      tag: 'BAZAR PUSAT PRONTERA',
      heading: 'Pasar Jalanan Hidup & Lapak Pemain',
      subheading:
        'Terinspirasi oleh jalanan pedagang Prontera yang ramai. Jelajahi toko pemain, cek kartu MVP langka, dan langsung mulai perdagangan bebas di dalam game.',
      searchPlaceholder: 'Cari item, lapak, atau penjual (mis. Excalibur, Ghostring)...',
      marketCtaBtn: 'Main Gratis & Dagang di Steam',
      activeStalls: 'Lapak Unggulan di Prontera:',
      shopsUnit: 'Toko',
      syncNote: '100% Perdagangan Bebas Antar Pemain di Midgard',
      sellerLabel: 'Penjual:',
      viewDetails: 'Lihat Detail',
      tradeInGameCta: 'Unduh & Dagang di Game',
      closeBtn: 'Tutup',
      officialListing: 'Daftar Resmi Pasar Prontera',
      vendingStallLabel: 'Nama Lapak:',
      merchantLabel: 'Pedagang / Petualang:',
      askingPriceLabel: 'Harga Penawaran:',
      categoryLabels: {
        All: 'Semua',
        Weapon: 'Senjata',
        Card: 'Kartu',
        Headgear: 'Topi',
        Consumable: 'Konsumsi',
        Armor: 'Zirah',
      },
    },
    th: {
      tag: 'ตลาดกลางพรอนเทรา',
      heading: 'ตลาดมีชีวิตและแผงร้านค้าของผู้เล่น',
      subheading:
        'แรงบันดาลใจจากถนนพ่อค้าสุดคึกคักแห่งพรอนเทรา สำรวจร้านค้าผู้เล่น ดูการ์ด MVP หายาก แล้วเข้าเกมไปค้าขายอย่างอิสระได้ทันที',
      searchPlaceholder: 'ค้นหาไอเทม ร้านค้า หรือผู้ขาย (เช่น Excalibur, Ghostring)...',
      marketCtaBtn: 'เล่นฟรีและค้าขายบน Steam',
      activeStalls: 'ร้านค้าแนะนำในพรอนเทรา:',
      shopsUnit: 'ร้าน',
      syncNote: 'ค้าขายอิสระ 100% ระหว่างผู้เล่นในมิดการ์ด',
      sellerLabel: 'ผู้ขาย:',
      viewDetails: 'ดูรายละเอียด',
      tradeInGameCta: 'ดาวน์โหลดและค้าขายในเกม',
      closeBtn: 'ปิด',
      officialListing: 'รายการสินค้าทางการตลาดพรอนเทรา',
      vendingStallLabel: 'ชื่อแผงร้านค้า:',
      merchantLabel: 'พ่อค้า / นักผจญภัย:',
      askingPriceLabel: 'ราคาขาย:',
      categoryLabels: {
        All: 'ทั้งหมด',
        Weapon: 'อาวุธ',
        Card: 'การ์ด',
        Headgear: 'หมวก',
        Consumable: 'ไอเทมฟื้นฟู',
        Armor: 'ชุดเกราะ',
      },
    },
    zh: {
      tag: '普隆德拉中央露天集市',
      heading: '活态街头集市与玩家露天摊位',
      subheading:
        '还原人声鼎沸的普隆德拉商业街！浏览玩家精选摊位、检视稀有 MVP 卡片，立即进入游戏体验自由交易与露天摆摊。',
      searchPlaceholder: '搜索装备、摊位名或卖家（如 Excalibur、Ghostring）...',
      marketCtaBtn: '免费畅玩并自由摆摊',
      activeStalls: '普隆德拉精选营业摊位：',
      shopsUnit: '家摊位',
      syncNote: '米德加尔特 100% 自由玩家交易',
      sellerLabel: '卖家：',
      viewDetails: '查看详情',
      tradeInGameCta: '立即下载进入游戏交易',
      closeBtn: '关闭',
      officialListing: '普隆德拉集市官方挂牌',
      vendingStallLabel: '摊位招牌：',
      merchantLabel: '商人 / 冒险者：',
      askingPriceLabel: '标价：',
      categoryLabels: {
        All: '全部',
        Weapon: '武器',
        Card: '卡片',
        Headgear: '头饰',
        Consumable: '消耗品',
        Armor: '防具',
      },
    },
  };

  const t = titles[activeLanguage] || titles.en;

  const selectedIcon = selectedItem ? renderMarketIcon(selectedItem.iconKey, 'w-7 h-7') : null;

  return (
    <section
      id="market"
      className="py-20 lg:py-28 bg-[#070b12]/50 backdrop-blur-[2px] relative overflow-hidden border-b border-slate-800"
    >
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
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mt-2">{t.subheading}</p>
          </div>

          <a
            href="#go2offer#"
            data-testid="market-cta"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-extrabold text-sm text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-xl shadow-amber-400/20 transform hover:-translate-y-0.5 transition-all cursor-pointer shrink-0 self-start md:self-auto"
          >
            <span>{t.marketCtaBtn}</span>
            <ArrowUpRight className="w-5 h-5 text-slate-950" />
          </a>
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
                {t.categoryLabels[cat]}
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

        {/* Stalls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => {
            const iconVisual = renderMarketIcon(item.iconKey, 'w-6 h-6');
            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                data-testid={`market-stall-card-${item.id}`}
                data-icon-key={item.iconKey}
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
                  <div
                    className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform ${iconVisual.badgeClass}`}
                  >
                    {iconVisual.element}
                  </div>

                  <div className="overflow-hidden">
                    <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                      {item.itemName}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                      <span>{t.sellerLabel}</span>
                      <span className="text-slate-200 font-medium truncate">{item.seller}</span>
                      {item.verified && <CheckCircle2 className="w-3 h-3 text-sky-400 shrink-0" />}
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
            );
          })}
        </div>

        {/* Live Stalls Counter */}
        <div className="mt-8 text-center text-xs text-slate-400">
          <span>{t.activeStalls} </span>
          <strong className="text-amber-400 font-bold">
            {filteredItems.length} {t.shopsUnit}
          </strong>
          <span> • {t.syncNote}</span>
        </div>
      </div>

      {/* Modal: Item Details Inspector */}
      {selectedItem && selectedIcon && (
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
              aria-label={t.closeBtn}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.officialListing}</span>
            </div>

            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 mb-4 flex items-center gap-4">
              <div
                className={`w-14 h-14 rounded-xl border flex items-center justify-center shrink-0 shadow-md ${selectedIcon.badgeClass}`}
              >
                {selectedIcon.element}
              </div>
              <div>
                <h3 className="text-base font-bold text-white">{selectedItem.itemName}</h3>
                <span className="inline-block mt-0.5 text-[11px] font-bold px-2 py-0.5 rounded bg-amber-400/20 text-amber-300">
                  {selectedItem.rarity} • {t.categoryLabels[selectedItem.category]}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-300 mb-6 bg-slate-950/50 p-3.5 rounded-xl border border-slate-800/80">
              <div className="flex justify-between">
                <span className="text-slate-400">{t.vendingStallLabel}</span>
                <span className="font-bold text-amber-300">"{selectedItem.shopName}"</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{t.merchantLabel}</span>
                <span className="font-semibold text-white">{selectedItem.seller}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{t.askingPriceLabel}</span>
                <span className="font-extrabold text-amber-400 text-sm">{formatZeny(selectedItem.price)}</span>
              </div>
              {selectedItem.notes && (
                <div className="pt-2 border-t border-slate-800 text-slate-300 italic">"{selectedItem.notes}"</div>
              )}
            </div>

            <div className="flex gap-3">
              <a
                href="#go2offer#"
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider hover:from-amber-300 hover:to-yellow-300 transition-all cursor-pointer inline-flex items-center justify-center gap-1.5"
              >
                <span>{t.tradeInGameCta}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="py-3 px-4 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700 cursor-pointer"
              >
                {t.closeBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
