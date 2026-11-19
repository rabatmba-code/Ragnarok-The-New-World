import React, { useState } from 'react';
import { Compass, ShoppingBag, Shirt, Heart, Sparkles, CheckCircle2, ChevronRight, Eye } from 'lucide-react';
import { SupportedLanguage } from '../utils/trackingAndLocale';

interface GameModesProps {
  activeLanguage: SupportedLanguage;
  onInspectImage: (imageSrc: string, caption: string) => void;
}

interface ModeCopy {
  id: string;
  title: string;
  tag: string;
  caption: string;
  description: string;
  features: string[];
  gamerQuote: string;
}

interface SubImageCopy {
  src: string;
  label: string;
  caption: string;
}

export const GameModes: React.FC<GameModesProps> = ({
  activeLanguage,
  onInspectImage,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [fashionSubImage, setFashionSubImage] = useState<number>(0);
  const [socialSubImage, setSocialSubImage] = useState<number>(0);

  const fashionImagesByLang: Record<SupportedLanguage, SubImageCopy[]> = {
    en: [
      {
        src: '/assets/aistudio/image_2f98b010.png',
        label: 'Campus Kitty Wonder Tour',
        caption: 'Official Chibi Art: Campus Kitty Wonder Tour feline outfit, cat ears, and companion kittens in Midgard.',
      },
      {
        src: '/assets/steam_hd/steam_ss_2.jpg',
        label: '1080p Wardrobe & Angel Wings',
        caption: 'Full HD 1080p in-game Wardrobe interface: celestial angel wings, hairstyles, and outfits catalog.',
      },
      {
        src: '/assets/steam_hd/steam_ss_5.jpg',
        label: '1080p Giant Poring Hat',
        caption: 'Full HD 1080p chibi avatars showcasing maids, tuxedos, and the iconic animated oversized pink Poring headgear.',
      },
      {
        src: '/assets/steam_hd/steam_ss_4.jpg',
        label: '1080p Boss Arena Titan',
        caption: 'Full HD 1080p colossal MVP Boss Titan battle in the ancient Midgard arena.',
      },
    ],
    id: [
      {
        src: '/assets/aistudio/image_2f98b010.png',
        label: 'Tur Campus Kitty',
        caption: 'Seni Chibi Resmi: Kostum kucing Campus Kitty Wonder Tour, telinga kucing, dan anak kucing pendamping di Midgard.',
      },
      {
        src: '/assets/steam_hd/steam_ss_2.jpg',
        label: 'Lemari 1080p & Sayap Malaikat',
        caption: 'Antarmuka Lemari 1080p dalam game: sayap malaikat surgawi, gaya rambut, dan katalog kostum.',
      },
      {
        src: '/assets/steam_hd/steam_ss_5.jpg',
        label: 'Topi Poring Raksasa 1080p',
        caption: 'Avatar chibi 1080p menampilkan kostum pelayan, tuksedo, dan topi Poring merah muda raksasa beranimasi.',
      },
      {
        src: '/assets/steam_hd/steam_ss_4.jpg',
        label: 'Arena Bos Titan 1080p',
        caption: 'Pertarungan Bos MVP Titan raksasa 1080p di arena kuno Midgard.',
      },
    ],
    th: [
      {
        src: '/assets/aistudio/image_2f98b010.png',
        label: 'ชุด Campus Kitty Wonder Tour',
        caption: 'ภาพอาร์ตจิบิทางการ: ชุดแมว Campus Kitty พร้อมหูแมวและลูกแมวคู่หูใน Midgard',
      },
      {
        src: '/assets/steam_hd/steam_ss_2.jpg',
        label: 'ตู้เสื้อผ้า 1080p และปีกนางฟ้า',
        caption: 'หน้าต่างตู้เสื้อผ้าในเกม Full HD 1080p: ปีกนางฟ้า ทรงผม และแคตตาล็อกแฟชั่น',
      },
      {
        src: '/assets/steam_hd/steam_ss_5.jpg',
        label: 'หมวก Poring ยักษ์ 1080p',
        caption: 'ตัวละครจิบิ 1080p ในชุดเมด ทักซิโด้ และหมวก Poring สีชมพูขนาดยักษ์สุดไอคอนิก',
      },
      {
        src: '/assets/steam_hd/steam_ss_4.jpg',
        label: 'สังเวียนบอสไททัน 1080p',
        caption: 'การต่อสู้กับบอส MVP ยักษ์ระดับ Full HD 1080p ในสังเวียนโบราณแห่ง Midgard',
      },
    ],
    zh: [
      {
        src: '/assets/aistudio/image_2f98b010.png',
        label: '校园猫咪巡礼时装',
        caption: '官方 Q 版原画：校园猫咪主题时装、猫耳饰品与米德加尔特猫咪伙伴。',
      },
      {
        src: '/assets/steam_hd/steam_ss_2.jpg',
        label: '1080p 衣橱与天使之翼',
        caption: '1080p 游戏内实时衣橱界面：圣洁天使羽翼、发型与海量时装图鉴。',
      },
      {
        src: '/assets/steam_hd/steam_ss_5.jpg',
        label: '1080p 巨型波利头饰',
        caption: '1080p Q 版角色展示女仆装、礼服与标志性动态超大粉色波利头饰。',
      },
      {
        src: '/assets/steam_hd/steam_ss_4.jpg',
        label: '1080p 巨型 MVP 首领战',
        caption: '1080p 高清实机：米德加尔特远古竞技场的巨型 MVP 首领激战。',
      },
    ],
  };

  const socialImagesByLang: Record<SupportedLanguage, SubImageCopy[]> = {
    en: [
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
    ],
    id: [
      {
        src: '/assets/aistudio/image_d1a84294.png',
        label: 'Perang Pengepungan Kastil',
        caption: 'Siege War (WoE) Resmi: Pertempuran epik lintas server antar guild memperebutkan kastil kekaisaran.',
      },
      {
        src: '/assets/steam_hd/steam_ss_8.jpg',
        label: 'Pernikahan Katedral 1080p',
        caption: 'Upacara pernikahan 1080p di Kapel Prontera dengan kelopak bunga, gerbang bunga, dan tamu yang bersorak.',
      },
      {
        src: '/assets/steam_hd/steam_ss_6.jpg',
        label: 'Pengepungan Guild WoE 1080p',
        caption: 'Pertempuran Guild vs Guild War of Emperium 1080p penuh aksi dengan panji guild dan ledakan skill.',
      },
      {
        src: '/assets/steam_hd/steam_ss_7.jpg',
        label: 'Festival Neon Tengah Malam',
        caption: 'Festival malam 1080p dengan slime neon ungu bercahaya dan perayaan pesta guild.',
      },
    ],
    th: [
      {
        src: '/assets/aistudio/image_d1a84294.png',
        label: 'ศึกตีปราสาท Siege War',
        caption: 'Siege War (WoE) ทางการ: มหาสงครามกิลด์ข้ามเซิร์ฟเวอร์เพื่อชิงความเป็นเจ้าของปราสาทจักรวรรดิ',
      },
      {
        src: '/assets/steam_hd/steam_ss_8.jpg',
        label: 'พิธีแต่งงานมหาวิหาร 1080p',
        caption: 'พิธีวิวาห์ Full HD 1080p ณ โบสถ์พรอนเทรา พร้อมกลีบดอกไม้ ซุ้มดอกไม้ และแขกผู้ร่วมยินดี',
      },
      {
        src: '/assets/steam_hd/steam_ss_6.jpg',
        label: 'สงครามกิลด์ WoE 1080p',
        caption: 'การปะทะสุดเดือด Guild vs Guild War of Emperium 1080p พร้อมธงกิลด์และสกิลอลังการ',
      },
      {
        src: '/assets/steam_hd/steam_ss_7.jpg',
        label: 'เทศกาลนีออนยามค่ำคืน',
        caption: 'เทศกาลกลางคืน 1080p พร้อมสไลม์นีออนสีม่วงเรืองแสงและงานฉลองปาร์ตี้กิลด์',
      },
    ],
    zh: [
      {
        src: '/assets/aistudio/image_d1a84294.png',
        label: '跨服攻城战（WoE）',
        caption: '官方攻城战（WoE）：各大公会跨服激战，争夺帝国城堡与华丽金属归属。',
      },
      {
        src: '/assets/steam_hd/steam_ss_8.jpg',
        label: '1080p 普隆德拉圣殿婚礼',
        caption: '1080p 高清普隆德拉教堂婚礼现场，花瓣飞舞与公会好友齐声祝福。',
      },
      {
        src: '/assets/steam_hd/steam_ss_6.jpg',
        label: '1080p 公会城堡攻防实机',
        caption: '1080p 热血公会战（GvG）城堡冲锋，旗帜飘扬与全屏爆发伤害。',
      },
      {
        src: '/assets/steam_hd/steam_ss_7.jpg',
        label: '1080p 午夜霓虹波利庆典',
        caption: '1080p 夜晚庆典盛况，闪耀的紫色霓虹史莱姆与公会狂欢派对。',
      },
    ],
  };

  const fashionImages = fashionImagesByLang[activeLanguage] || fashionImagesByLang.en;
  const socialImages = socialImagesByLang[activeLanguage] || socialImagesByLang.en;

  const modesByLang: Record<SupportedLanguage, ModeCopy[]> = {
    en: [
      {
        id: 'exploration',
        title: '360° Open World Freedom',
        tag: '1080p Full HD • Exploration & Parkour',
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
        tag: 'Living Player Economy',
        caption: 'Full HD 1080p: The heart of Midgard — hundreds of player merchant shops packed across Prontera plaza.',
        description:
          'The true soul of Ragnarok lives in its street stalls! Sit your character down anywhere in Prontera, pop up a custom sign bubble like "No. 1 Gold Gear", "Clearance Sale", or "Lucky Stall", and trade rare MVP cards and crafted elixirs directly with fellow players.',
        features: [
          'Open player vending stalls with custom dialogue bubbles',
          'Offline stall persistence: keep earning Zeny even while idle',
          'P2P direct trading with transparent player-driven pricing',
          'Live market trends and rare MVP card drop alerts',
        ],
        gamerQuote:
          '"Opening a shop with a funny slogan in Prontera is an art form in itself."',
      },
      {
        id: 'fashion',
        title: 'Haute Couture & Wardrobe Freedom',
        tag: 'Wardrobe & Angel Wings',
        caption: fashionImages[fashionSubImage].caption,
        description:
          'Your character, your aesthetic identity! Equip feathered angel wings, customize hair colors, accessorize with bubblegum emotes, and collect sets like Star Dream, Sweet Doll, and Sunny Sailor in the live wardrobe studio.',
        features: [
          'Equip majestic feathered angel wings and animated headgears',
          'Over 2,500+ collectable hats, suits, maid gowns, and weapon skins',
          'Dye workshop: custom palette colors for outfits and hairstyles',
          'Stat-free wardrobe transmog: look stylish without losing combat stats',
        ],
        gamerQuote:
          '"Fashion is the true end-game. Feathered wings and a giant Poring hat never go out of style."',
      },
      {
        id: 'romance',
        title: 'Midnight Guilds & Holy Matrimony',
        tag: 'Guild Night Festivals & Romance',
        caption: socialImages[socialSubImage].caption,
        description:
          'Midgard comes alive at night! Gather your guild in front of the royal castle for lantern festivals and guild photo sessions, or host a lavish wedding at the Prontera Chapel with fireworks and rose petals.',
        features: [
          'Night castle square festivals with lanterns and guild group poses',
          'Full cathedral wedding ceremony with custom vows and invitations',
          'Couple skill "I Miss You": instant teleportation to your partner’s side',
          'Guild banquets, War of Emperium castle sieges, and duo buffs',
        ],
        gamerQuote:
          '"Taking guild photos at midnight in front of the castle with lanterns floating into the sky is pure magic."',
      },
    ],
    id: [
      {
        id: 'exploration',
        title: 'Kebebasan Dunia Terbuka 360°',
        tag: '1080p Full HD • Eksplorasi & Parkour',
        caption: 'Full HD 1080p: memanjat menara gereja, berenang di sungai jernih, dan meluncur dengan gelembung langit.',
        description:
          'Panjat puncak menara gereja Prontera untuk memantau kerajaan, selami sungai sebening kristal guna menemukan reruntuhan tersembunyi, atau panggil gelembung antigravitasi untuk melayang di bawah langit berbintang.',
        features: [
          'Parkour vertikal bebas: panjat atap, benteng, dan reruntuhan kuno',
          'Mekanik berenang dinamis & eksplorasi bawah air',
          'Terbang dengan gelembung astral dan kamera panorama 360 derajat',
          'Siklus siang, senja, dan malam berbintang secara real-time',
        ],
        gamerQuote:
          '"Lupakan dinding tak terlihat. Jika kamu bisa melihat puncak katedral itu, kamu bisa memanjatnya."',
      },
      {
        id: 'economy',
        title: 'Pasar Hidup & Lapak Jalanan Prontera',
        tag: 'Ekonomi Pemain yang Hidup',
        caption: 'Full HD 1080p: Jantung Midgard — ratusan lapak pedagang pemain memenuhi alun-alun Prontera.',
        description:
          'Jiwa sejati Ragnarok ada di lapak jalanannya! Dudukkan karaktermu di sudut Prontera, pasang papan balon kustom seperti "Gear Emas No. 1" atau "Cuci Gudang", dan perdagangkan kartu MVP langka langsung dengan pemain lain.',
        features: [
          'Buka lapak dagang pemain dengan balon teks kustom',
          'Lapak tetap aktif offline: terus hasilkan Zeny meski sedang santai',
          'Perdagangan langsung antar pemain dengan harga transparan',
          'Notifikasi drop kartu MVP dan pantauan harga pasar langsung',
        ],
        gamerQuote:
          '"Membuka lapak dengan slogan lucu di Prontera adalah seni tersendiri."',
      },
      {
        id: 'fashion',
        title: 'Fashion & Kebebasan Lemari Pakaian',
        tag: 'Wardrobe & Sayap Malaikat',
        caption: fashionImages[fashionSubImage].caption,
        description:
          'Karaktermu, gaya unikmu! Pasang sayap malaikat berbulu, ubah warna rambut, tambahkan aksesori permen karet, dan koleksi set seperti Star Dream, Sweet Doll, dan Sunny Sailor di studio lemari langsung.',
        features: [
          'Pasang sayap malaikat megah dan topi beranimasi',
          'Lebih dari 2.500+ topi, jas, gaun pelayan, dan skin senjata',
          'Bengkel pewarna: kustomisasi warna kostum dan gaya rambut',
          'Transmog bebas stat: tampil keren tanpa mengorbankan kekuatan tempur',
        ],
        gamerQuote:
          '"Fashion adalah end-game sejati. Sayap malaikat dan topi Poring raksasa tak tergantikan."',
      },
      {
        id: 'romance',
        title: 'Guild Tengah Malam & Pernikahan Suci',
        tag: 'Festival Malam Guild & Romansa',
        caption: socialImages[socialSubImage].caption,
        description:
          'Midgard semakin hidup di malam hari! Kumpulkan guild di depan kastil kerajaan untuk festival lampion dan foto bersama, atau gelar pernikahan megah di Kapel Prontera dengan kembang api dan kelopak mawar.',
        features: [
          'Festival alun-alun kastil malam hari dengan lampion dan pose guild',
          'Upacara pernikahan katedral lengkap dengan janji dan undangan',
          'Skill pasangan "I Miss You": teleportasi instan ke sisi pasanganmu',
          'Perjamuan guild, pengepungan kastil WoE, dan buff pasangan',
        ],
        gamerQuote:
          '"Berfoto bersama guild tengah malam di depan kastil dengan lampion terbang adalah keajaiban."',
      },
    ],
    th: [
      {
        id: 'exploration',
        title: 'อิสระโลกเปิด 360° ไร้ขีดจำกัด',
        tag: '1080p Full HD • สำรวจและปาร์กัวร์',
        caption: 'Full HD 1080p: ปีนยอดโบสถ์ ว่ายน้ำในแม่น้ำใส และลอยตัวด้วยฟองสบู่แห่งดวงดาว',
        description:
          'ปีนขึ้นสู่ยอดหอคอยโบสถ์พรอนเทราเพื่อชมวิวทั่วอาณาจักร ดำน้ำลงสู่แม่น้ำใสสะอาดเพื่อค้นหาซากโบราณ หรือเรียกฟองอากาศไร้แรงโน้มถ่วงล่องลอยใต้ท้องฟ้ายามค่ำคืน',
        features: [
          'ปาร์กัวร์แนวตั้งอิสระ: ปีนได้ทุกหลังคา ป้อมปราการ และซากปรักหักพัง',
          'ระบบว่ายน้ำและดำน้ำสำรวจใต้น้ำแบบสมจริง',
          'ลอยตัวกลางอากาศด้วยฟองสบู่พร้อมมุมกล้องพาโนรามา 360 องศา',
          'วงจรกลางวัน ยามเย็น และกลางคืนที่เต็มไปด้วยดวงดาวแบบเรียลไทม์',
        ],
        gamerQuote:
          '"ลืมกำแพงล่องหนไปได้เลย ถ้าคุณมองเห็นยอดมหาวิหารนั้น คุณก็ปีนขึ้นไปได้"',
      },
      {
        id: 'economy',
        title: 'ตลาดมีชีวิตและแผงร้านค้าพรอนเทรา',
        tag: 'เศรษฐกิจผู้เล่นแบบมีชีวิต',
        caption: 'Full HD 1080p: หัวใจของ Midgard — ร้านค้าผู้เล่นนับร้อยเรียงรายเต็มจัตุรัสพรอนเทรา',
        description:
          'จิตวิญญาณของ Ragnarok อยู่ที่ตลาดตั้งร้าน! นั่งตั้งแผงที่ไหนก็ได้ในพรอนเทรา ใส่ป้ายร้านสุดฮาอย่าง "ของทองอันดับ 1" หรือ "ลดล้างสต็อก" แล้วแลกเปลี่ยนการ์ด MVP หายากกับผู้เล่นอื่นโดยตรง',
        features: [
          'ตั้งแผงขายของพร้อมข้อความป้ายร้านที่ปรับแต่งเองได้',
          'ระบบตั้งร้านออฟไลน์: รับ Zeny ต่อเนื่องแม้ไม่ได้อยู่หน้าจอ',
          'ซื้อขายตรงระหว่างผู้เล่นด้วยราคาตลาดจริง',
          'แจ้งเตือนดรอปการ์ด MVP หายากและติดตามแนวโน้มราคาตลาด',
        ],
        gamerQuote:
          '"การตั้งชื่อร้านให้คนสะดุดตาในพรอนเทราคือศิลปะอย่างหนึ่งของชาว RO"',
      },
      {
        id: 'fashion',
        title: 'แฟชั่นจัดเต็มและตู้เสื้อผ้าอิสระ',
        tag: 'ตู้เสื้อผ้าและปีกนางฟ้า',
        caption: fashionImages[fashionSubImage].caption,
        description:
          'ตัวละครของคุณ สไตล์ของคุณเอง! สวมปีกนางฟ้าสุดอลังการ ปรับสีผม ใส่ลูกเล่นเคี้ยวหมากฝรั่ง และสะสมเซ็ตแฟชั่นอย่าง Star Dream, Sweet Doll และ Sunny Sailor ได้ในตู้เสื้อผ้าแบบเรียลไทม์',
        features: [
          'สวมใส่ปีกนางฟ้าและหมวกแฟชั่นที่มีแอนิเมชันเคลื่อนไหว',
          'หมวก ชุดเมด สูท และสกินอาวุธให้สะสมมากกว่า 2,500+ ชิ้น',
          'ห้องย้อมสี: ปรับเฉดสีชุดและทรงผมได้ตามใจชอบ',
          'ระบบแฟชั่นแยกจากค่าพลัง: แต่งตัวสวยได้เต็มที่โดยไม่เสียสเตตัสต่อสู้',
        ],
        gamerQuote:
          '"แฟชั่นคือคอนเทนต์ระดับสูงสุด ปีกนางฟ้ากับหมวก Poring ยักษ์ไม่มีวันตกยุค"',
      },
      {
        id: 'romance',
        title: 'ปาร์ตี้กิลด์ยามค่ำคืนและพิธีวิวาห์',
        tag: 'เทศกาลกลางคืนและระบบคู่รัก',
        caption: socialImages[socialSubImage].caption,
        description:
          'Midgard มีชีวิตชีวาที่สุดในยามค่ำคืน! รวมตัวชาวกิลด์หน้าปราสาทหลวงเพื่อชมเทศกาลโคมลอยและถ่ายรูปหมู่ หรือจัดงานแต่งงานสุดหรูที่โบสถ์พรอนเทราพร้อมดอกไม้ไฟและกลีบกุหลาบ',
        features: [
          'เทศกาลโคมลอยหน้าปราสาทหลวงพร้อมท่าโพสถ่ายภาพหมู่กิลด์',
          'พิธีแต่งงานเต็มรูปแบบในมหาวิหารพร้อมคำสาบานและบัตรเชิญ',
          'สกิลคู่รัก "I Miss You": วาร์ปไปหาคนรักได้ทันทีทุกที่',
          'งานเลี้ยงกิลด์ ศึกตีปราสาท War of Emperium และบัฟคู่รัก',
        ],
        gamerQuote:
          '"การถ่ายรูปหมู่กับกิลด์ตอนเที่ยงคืนหน้าปราสาทท่ามกลางโคมลอยคือความทรงจำสุดพิเศษ"',
      },
    ],
    zh: [
      {
        id: 'exploration',
        title: '360° 开放世界自由探索',
        tag: '1080p 全高清 • 探索与立体跑酷',
        caption: '1080p 全高清实机：攀爬教堂尖顶、畅游清澈河流与星夜气泡滑翔。',
        description:
          '爬上普隆德拉大教堂的最高尖顶俯瞰王国，潜入清澈河底发掘沉没遗迹，或召唤反重力星光气泡，在漫天繁星下自由滑翔探索。',
        features: [
          '自由立体跑酷：攀登任意屋顶、城堡要塞与古老遗迹',
          '动态水域游泳与水下隐藏遗迹探索机制',
          '星光气泡飞行，搭配 360 度全景自由视角',
          '实时昼夜交替、日落晚霞与璀璨星空循环',
        ],
        gamerQuote:
          '“忘掉空气墙吧——只要你能看到那座大教堂的塔尖，就能亲自爬上去。”',
      },
      {
        id: 'economy',
        title: '普隆德拉活态集市与玩家摆摊',
        tag: '玩家主导的自由经济',
        caption: '1080p 全高清：米德加尔特的心脏——数以百计的玩家摊位铺满普隆德拉广场。',
        description:
          '《仙境传说》的灵魂就在热闹的露天摊位！在普隆德拉任意角落坐下摆摊，挂上“全服第一金装”或“清仓大甩卖”等个性招牌气泡，与其他玩家直接交易稀有 MVP 卡片与神装。',
        features: [
          '自定义招牌气泡的露天玩家商店系统',
          '离线挂机摆摊：休息时照样持续赚取 Zeny',
          '玩家间点对点自由交易，价格公开透明',
          '实时市场行情与稀有 MVP 卡片掉落播报',
        ],
        gamerQuote:
          '“在普隆德拉起一个搞笑又吸睛的摊位招牌，本身就是一门艺术。”',
      },
      {
        id: 'fashion',
        title: '百变时装与自由衣橱美学',
        tag: '实时衣橱与天使羽翼',
        caption: fashionImages[fashionSubImage].caption,
        description:
          '你的角色，由你定义！装备圣洁天使之翼、自由定制发色与泡泡糖表情，在实时衣橱工作室中收集星梦、甜心人偶、晴空水手等主题套装。',
        features: [
          '装备华丽羽翼与生动有趣的动态头饰',
          '超过 2,500+ 款可收集帽子、礼服、女仆装与武器外观',
          '自由染色工坊：随心调配时装与发型配色',
          '外观与属性解耦幻化：兼顾颜值与巅峰战力',
        ],
        gamerQuote:
          '“时尚才是真正的终极玩法，天使翅膀配巨型波利帽永不过时。”',
      },
      {
        id: 'romance',
        title: '午夜公会狂欢与圣殿婚礼',
        tag: '公会夜景庆典与浪漫羁绊',
        caption: socialImages[socialSubImage].caption,
        description:
          '夜幕降临时，米德加尔特更加迷人！与公会战友齐聚王城广场放飞祈福天灯、合影留念，或在普隆德拉教堂举办烟花与玫瑰花瓣环绕的盛大婚礼。',
        features: [
          '王城广场午夜天灯节与公会集体合影姿势',
          '完整大教堂婚礼仪式，支持专属誓言与宾客邀请',
          '伴侣专属技能“好想你”：瞬间传送至另一半身旁',
          '公会宴会、攻城战（WoE）争夺与双人羁绊增益',
        ],
        gamerQuote:
          '“午夜时分和公会伙伴在城堡前看天灯升空合影，真的无比梦幻。”',
      },
    ],
  };

  const icons = [Compass, ShoppingBag, Shirt, Heart];
  const badgeColors = [
    'from-sky-500 to-blue-600',
    'from-amber-500 to-yellow-600',
    'from-pink-500 to-purple-600',
    'from-rose-500 to-red-600',
  ];

  const localizedModes = modesByLang[activeLanguage] || modesByLang.en;
  const currentMode = localizedModes[activeTab];
  const currentImage =
    activeTab === 0
      ? '/assets/steam_hd/steam_ss_10.jpg'
      : activeTab === 1
      ? '/assets/steam_hd/steam_ss_1.jpg'
      : activeTab === 2
      ? fashionImages[fashionSubImage].src
      : socialImages[socialSubImage].src;

  const headers: Record<
    SupportedLanguage,
    {
      tag: string;
      heading: string;
      subheading: string;
      inspectPill: string;
      exploreMarket: string;
    }
  > = {
    en: {
      tag: 'LIVING THE GAME MODE',
      heading: 'Not Just Playing A Game. Living In It.',
      subheading:
        'Explore the 4 core pillars that make Ragnarok: The New World an unforgettable second home for PC MMORPG players.',
      inspectPill: 'Click to Inspect High-Res Capture',
      exploreMarket: 'Explore the Prontera Live Marketplace',
    },
    id: {
      tag: 'HIDUP DI DALAM DUNIA GAME',
      heading: 'Bukan Sekadar Bermain. Tapi Hidup di Dalamnya.',
      subheading:
        'Jelajahi 4 pilar utama yang menjadikan Ragnarok: The New World rumah kedua tak terlupakan bagi gamer MMORPG PC.',
      inspectPill: 'Klik untuk Lihat Tangkapan HD',
      exploreMarket: 'Jelajahi Pasar Langsung Prontera',
    },
    th: {
      tag: 'ใช้ชีวิตในโลกของเกมอย่างแท้จริง',
      heading: 'ไม่ใช่แค่เล่นเกม แต่คือการใช้ชีวิตในโลกนี้',
      subheading:
        'สำรวจ 4 เสาหลักที่ทำให้ Ragnarok: The New World เป็นบ้านหลังที่สองสุดประทับใจสำหรับชาว MMORPG บน PC',
      inspectPill: 'คลิกเพื่อดูภาพความละเอียดสูง',
      exploreMarket: 'สำรวจตลาดสดพรอนเทรา',
    },
    zh: {
      tag: '沉浸式核心玩法',
      heading: '不只是游玩，而是真正栖居其中',
      subheading:
        '探索构成《Ragnarok: The New World》独特魅力的 4 大核心支柱，为 PC MMORPG 玩家打造难忘的第二家园。',
      inspectPill: '点击查看大图实机截图',
      exploreMarket: '前往普隆德拉实时露天市场',
    },
  };

  const h = headers[activeLanguage] || headers.en;

  return (
    <section id="modes" className="py-20 lg:py-28 bg-[#080c14]/50 backdrop-blur-[2px] relative overflow-hidden border-b border-slate-800">
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
          <p className="text-slate-300 text-base sm:text-lg">{h.subheading}</p>
        </div>

        {/* 4 Interactive Mode Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 max-w-4xl mx-auto">
          {localizedModes.map((mode, index) => {
            const Icon = icons[index];
            const isSelected = activeTab === index;

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
                    isSelected ? badgeColors[index] : 'from-slate-800 to-slate-900'
                  } text-white shadow-md`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-xs sm:text-sm font-bold ${isSelected ? 'text-amber-400' : 'text-slate-300'}`}>
                  {mode.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Mode Deep Dive Showcase */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-xl shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Visual Area with Sub-Switchers and Click-to-Zoom */}
          <div className="lg:col-span-7 flex flex-col gap-3">
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
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
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
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {img.label}
                  </button>
                ))}
              </div>
            )}

            <div className="relative group rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 shadow-xl aspect-[16/10]">
              <img
                src={currentImage}
                alt={currentMode.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 cursor-pointer"
                onClick={() => onInspectImage(currentImage, currentMode.caption)}
              />

              {/* Overlay hover badge */}
              <div
                onClick={() => onInspectImage(currentImage, currentMode.caption)}
                className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer backdrop-blur-[2px]"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 text-amber-400 text-xs font-bold border border-amber-400/50 shadow-lg">
                  <Eye className="w-4 h-4" />
                  <span>{h.inspectPill}</span>
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
              {currentMode.title}
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
              <span>{h.exploreMarket}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
