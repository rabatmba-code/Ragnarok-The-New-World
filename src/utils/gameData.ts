export interface GameClass {
  id: string;
  name: string;
  title: string;
  role: 'Tank' | 'DPS' | 'Support' | 'Crowd Control' | 'Economy';
  playstyle: string;
  keySkills: string[];
  recommendedStats: {
    str: number;
    agi: number;
    vit: number;
    int: number;
    dex: number;
    luk: number;
  };
  quote: string;
  accentColor: string;
}

export interface MarketItem {
  id: string;
  shopName: string;
  seller: string;
  itemName: string;
  category: 'Card' | 'Weapon' | 'Headgear' | 'Consumable' | 'Armor';
  price: number;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'MVP';
  verified: boolean;
  notes?: string;
}

export const GAME_CLASSES: GameClass[] = [
  {
    id: 'knight',
    name: 'Lord Knight',
    title: 'The Steel Bastion of Prontera',
    role: 'Tank',
    playstyle: 'High defense, berserk damage, cavalry mounted combat with Bowling Bash.',
    keySkills: ['Bowling Bash', 'Frenzy / Berserk', 'Spiral Pierce', 'Parry'],
    recommendedStats: { str: 85, agi: 60, vit: 90, int: 20, dex: 50, luk: 20 },
    quote: 'My shield stands between darkness and the people of Midgard.',
    accentColor: '#3b82f6',
  },
  {
    id: 'wizard',
    name: 'High Wizard',
    title: 'Master of Celestial Elements',
    role: 'DPS',
    playstyle: 'Devastating area-of-effect elemental spells, controlling battlefields from afar.',
    keySkills: ['Meteor Storm', 'Storm Gust', 'Lord of Vermilion', 'Safety Wall'],
    recommendedStats: { str: 10, agi: 20, vit: 50, int: 99, dex: 80, luk: 30 },
    quote: 'Fire, ice, and lightning answer my command.',
    accentColor: '#8b5cf6',
  },
  {
    id: 'sniper',
    name: 'Sniper',
    title: 'The Eagle-Eyed Sharpshooter',
    role: 'DPS',
    playstyle: 'Ultra-fast ranged critical strikes, falcon companions, and strategic elemental traps.',
    keySkills: ['Arrow Shower', 'True Sight', 'Falcon Assault', 'Sharp Shooting'],
    recommendedStats: { str: 20, agi: 95, vit: 30, int: 20, dex: 99, luk: 60 },
    quote: 'Before you hear the bowstring snap, the arrow has found its mark.',
    accentColor: '#10b981',
  },
  {
    id: 'assassin',
    name: 'Assassin Cross',
    title: 'The Shadow Blade of Morroc',
    role: 'DPS',
    playstyle: 'Lethal burst stealth, dual-wield katars, poison coatings, and critical strike frenzy.',
    keySkills: ['Sonic Blow', 'Cloaking Ex', 'Meteor Assault', 'Enchant Deadly Poison'],
    recommendedStats: { str: 90, agi: 95, vit: 40, int: 10, dex: 50, luk: 40 },
    quote: 'You cannot strike what you cannot see.',
    accentColor: '#f43f5e',
  },
  {
    id: 'priest',
    name: 'High Priest',
    title: 'The Divine Envoy of Odin',
    role: 'Support',
    playstyle: 'Party benedictions, miraculous resurrections, holy purification, and protective barriers.',
    keySkills: ['Sanctuary', 'Resurrection', 'Magnificat', 'Kyrie Eleison'],
    recommendedStats: { str: 10, agi: 30, vit: 75, int: 90, dex: 70, luk: 40 },
    quote: 'In faith there is unyielding strength and light for every soul.',
    accentColor: '#eab308',
  },
  {
    id: 'whitesmith',
    name: 'Whitesmith',
    title: 'The Industrial Titan & Merchant King',
    role: 'Economy',
    playstyle: 'Over-refining supreme weapons, high-speed cart combat, and automated market mastery.',
    keySkills: ['Cart Termination', 'Maximum Over Thrust', 'Weapon Refine', 'Meltdown'],
    recommendedStats: { str: 90, agi: 80, vit: 70, int: 15, dex: 60, luk: 30 },
    quote: 'True power is forged in fire and traded for millions of Zeny.',
    accentColor: '#f97316',
  },
];

export const INITIAL_MARKET_STALLS: MarketItem[] = [
  {
    id: 'item-1',
    shopName: 'No. 1 Gold Gear on the Server',
    seller: 'KafraVIP_Leon',
    itemName: '+11 Excalibur Holy Blade',
    category: 'Weapon',
    price: 18500000,
    rarity: 'Legendary',
    verified: true,
    notes: 'Max refine, slotted with 2x Minorous Cards. PM for trade!',
  },
  {
    id: 'item-2',
    shopName: 'Pancake Shop Branch',
    seller: 'Pudding_Lover',
    itemName: 'Fluffy Strawberry Poring Pancake x99',
    category: 'Consumable',
    price: 35000,
    rarity: 'Common',
    verified: true,
    notes: 'Restores 45% HP & MP instantly + 10 All Stats for 30m.',
  },
  {
    id: 'item-3',
    shopName: "My Wife Won't Let Me Play Clearance",
    seller: 'DesperateHusband',
    itemName: 'Ghostring MVP Card',
    category: 'Card',
    price: 9999999,
    rarity: 'MVP',
    verified: true,
    notes: 'Emergency sale! Turns armor attribute to Ghost Lv.1. No lowballers.',
  },
  {
    id: 'item-4',
    shopName: 'AGI Knight Graduation Gear',
    seller: 'SpeedyGonzales',
    itemName: '+9 Muramasa Cursed Katana',
    category: 'Weapon',
    price: 3200000,
    rarity: 'Epic',
    verified: true,
    notes: 'Insane ASPD + Critical rate boost.',
  },
  {
    id: 'item-5',
    shopName: 'Rare Headgear Boutique',
    seller: 'ChibiQueen_Rose',
    itemName: 'Animated Giant Fluffy Poring Hat',
    category: 'Headgear',
    price: 4500000,
    rarity: 'Legendary',
    verified: true,
    notes: 'Jiggles when walking! +15% Movement speed in town.',
  },
  {
    id: 'item-6',
    shopName: 'Card Drop Lucky Stall',
    seller: 'Lucky_GachaGuy',
    itemName: 'Baphomet Horns + Golden Thief Bug Card',
    category: 'Card',
    price: 14200000,
    rarity: 'MVP',
    verified: true,
    notes: 'Complete magic immunity card. Clean, non-duped.',
  },
];

export function formatZeny(amount: number): string {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)}M Zeny`;
  }
  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(0)}K Zeny`;
  }
  return `${amount} Zeny`;
}

export function calculateClassMatch(answers: {
  preferredCombat: 'frontline' | 'magic' | 'ranged' | 'stealth' | 'healing' | 'wealth';
  teamRole: 'lead' | 'support' | 'solo';
  dailyGoal: 'dungeon' | 'pvp' | 'trading' | 'social';
}): GameClass {
  switch (answers.preferredCombat) {
    case 'frontline':
      return GAME_CLASSES.find((c) => c.id === 'knight')!;
    case 'magic':
      return GAME_CLASSES.find((c) => c.id === 'wizard')!;
    case 'ranged':
      return GAME_CLASSES.find((c) => c.id === 'sniper')!;
    case 'stealth':
      return GAME_CLASSES.find((c) => c.id === 'assassin')!;
    case 'healing':
      return GAME_CLASSES.find((c) => c.id === 'priest')!;
    case 'wealth':
      return GAME_CLASSES.find((c) => c.id === 'whitesmith')!;
    default:
      if (answers.dailyGoal === 'trading') {
        return GAME_CLASSES.find((c) => c.id === 'whitesmith')!;
      }
      if (answers.teamRole === 'support') {
        return GAME_CLASSES.find((c) => c.id === 'priest')!;
      }
      return GAME_CLASSES[0];
  }
}

export function filterMarketItems(
  items: MarketItem[],
  query: string,
  category: string
): MarketItem[] {
  return items.filter((item) => {
    const matchesCategory = category === 'All' || item.category === category;
    const q = query.toLowerCase().trim();
    const matchesQuery =
      !q ||
      item.itemName.toLowerCase().includes(q) ||
      item.shopName.toLowerCase().includes(q) ||
      item.seller.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });
}
