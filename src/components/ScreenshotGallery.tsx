import React, { useState } from 'react';
import { Eye, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { SupportedLanguage } from '../utils/trackingAndLocale';

interface ScreenshotGalleryProps {
  activeLanguage: SupportedLanguage;
}

type CategoryKey =
  | 'All'
  | 'Key Visual'
  | 'Town Life'
  | 'Exploration'
  | 'Customization'
  | 'Guild Life'
  | 'Social & Romance';

interface ScreenshotItem {
  id: string;
  src: string;
  category: Exclude<CategoryKey, 'All'>;
  copy: Record<
    SupportedLanguage,
    {
      title: string;
      subtitle: string;
      description: string;
    }
  >;
}

export const ScreenshotGallery: React.FC<ScreenshotGalleryProps> = ({ activeLanguage }) => {
  const screenshots: ScreenshotItem[] = [
    {
      id: 'campus_kitty_wonder',
      src: '/assets/aistudio/image_2f98b010.png',
      category: 'Customization',
      copy: {
        en: {
          title: 'Campus Kitty: Wonder Tour Feline Outfit',
          subtitle: 'Official Chibi Visual • Cat Ears, Sailor Uniforms & Midgard Kittens',
          description:
            'Official Ragnarok: The New World chibi artwork celebrating the Campus Kitty Wonder Tour! Features feline-eared adventurers in pastel sailor suits with companion kittens.',
        },
        id: {
          title: 'Campus Kitty: Kostum Kucing Wonder Tour',
          subtitle: 'Visual Chibi Resmi • Telinga Kucing, Seragam Pelaut & Anak Kucing',
          description:
            'Karya seni chibi resmi Ragnarok: The New World merayakan Campus Kitty Wonder Tour dengan kostum pelaut pastel dan anak kucing pendamping.',
        },
        th: {
          title: 'Campus Kitty: ชุดแฟชั่นแมว Wonder Tour',
          subtitle: 'ภาพจิบิทางการ • หูแมว ชุดกะลาสี และลูกแมวคู่หู',
          description:
            'ภาพอาร์ตจิบิทางการของ Ragnarok: The New World เฉลิมฉลอง Campus Kitty Wonder Tour พร้อมนักผจญภัยหูแมวและลูกแมวสุดน่ารัก',
        },
        zh: {
          title: '校园猫咪：奇幻巡礼主题时装',
          subtitle: '官方 Q 版视觉 • 猫耳、水手服与米德加尔特小猫伙伴',
          description:
            '《Ragnarok: The New World》官方 Q 版原画，展示校园猫咪巡礼主题的柔和系水手服与可爱的猫咪伙伴。',
        },
      },
    },
    {
      id: 'siege_war_emperium',
      src: '/assets/aistudio/image_d1a84294.png',
      category: 'Guild Life',
      copy: {
        en: {
          title: 'Imperial Siege War: War of Emperium (GvG)',
          subtitle: 'Official Battle Art • Cross-Server Castle Clash & Emperium Siege',
          description:
            'Fierce guild warfare visual showing Knights, Monks, Priests, and Hunters in cross-server castle conquest.',
        },
        id: {
          title: 'Perang Pengepungan Kastil: War of Emperium (GvG)',
          subtitle: 'Seni Pertempuran Resmi • Perebutan Kastil Lintas Server',
          description:
            'Visual perang guild sengit menampilkan Knight, Monk, Priest, dan Hunter dalam perebutan kastil lintas server.',
        },
        th: {
          title: 'มหาสงครามตีปราสาท: War of Emperium (GvG)',
          subtitle: 'ภาพศึกทางการ • สงครามชิงปราสาทข้ามเซิร์ฟเวอร์',
          description:
            'ภาพสงครามกิลด์สุดดุเดือดที่เหล่าอัศวิน นักบวช และนักธนูเข้าปะทะกันเพื่อชิงความเป็นเจ้าของปราสาทข้ามเซิร์ฟเวอร์',
        },
        zh: {
          title: '帝国攻城战：华丽金属争夺战（GvG）',
          subtitle: '官方战斗原画 • 跨服城堡对决与公会荣耀',
          description:
            '震撼的跨服公会战视觉图，骑士、祭司与猎人齐聚一堂争夺帝国城堡控制权。',
        },
      },
    },
    {
      id: 'legend_cup_4k',
      src: '/assets/aistudio/image_81863f60.png',
      category: 'Key Visual',
      copy: {
        en: {
          title: 'Legend Cup 2026: Fight To Be Legend (4K UHD)',
          subtitle: 'Global Tournament Visual • US$1.01M Prize Pool & Growing',
          description:
            'Official 4K key visual for the 2026 Inaugural Legend Cup Global Tournament featuring the golden Poring trophy.',
        },
        id: {
          title: 'Legend Cup 2026: Fight To Be Legend (4K UHD)',
          subtitle: 'Visual Turnamen Global • Total Hadiah US$1,01 Juta+',
          description:
            'Key visual 4K resmi untuk Turnamen Global Legend Cup 2026 dengan trofi Poring emas yang ikonik.',
        },
        th: {
          title: 'Legend Cup 2026: Fight To Be Legend (4K UHD)',
          subtitle: 'ภาพการแข่งขันระดับโลก • เงินรางวัลรวมกว่า 1.01 ล้านดอลลาร์สหรัฐ',
          description:
            'ภาพคีย์วิชวลระดับ 4K ทางการของการแข่งขันระดับโลก Legend Cup 2026 พร้อมถ้วยรางวัล Poring ทองคำ',
        },
        zh: {
          title: '2026 传奇杯全球锦标赛（4K 超清）',
          subtitle: '全球赛事主视觉 • 超过 101 万美元奖金池',
          description:
            '2026 首届传奇杯全球锦标赛官方 4K 主视觉，呈现荣耀的黄金波利奖杯与冠军阵容。',
        },
      },
    },
    {
      id: 'keyart',
      src: '/assets/steam_hd/steam_ss_3.jpg',
      category: 'Key Visual',
      copy: {
        en: {
          title: 'Across Time Into The New World',
          subtitle: 'Official Key Visual • Free-to-Play PC Adventure (1080p Full HD)',
          description:
            'Adventurers aboard the royal airship cruising high above Midgard, gazing at the majestic spires of Prontera.',
        },
        id: {
          title: 'Melintasi Waktu Menuju Dunia Baru',
          subtitle: 'Key Visual Resmi • Petualangan PC Gratis Dimainkan (1080p Full HD)',
          description:
            'Para petualang di atas kapal udara kerajaan melayang tinggi di langit Midgard memandang menara megah Prontera.',
        },
        th: {
          title: 'ข้ามกาลเวลาสู่โลกใบใหม่แห่ง Midgard',
          subtitle: 'คีย์วิชวลทางการ • ผจญภัยบน PC เล่นฟรี (1080p Full HD)',
          description:
            'เหล่านักผจญภัยบนเรือเหาะหลวงที่ล่องลอยเหนือท้องฟ้า Midgard มองลงไปยังหอคอยอันยิ่งใหญ่แห่งพรอนเทรา',
        },
        zh: {
          title: '跨越时空，步入米德加尔特新世界',
          subtitle: '官方主视觉 • PC 免费畅玩冒险（1080p 全高清）',
          description:
            '冒险者搭乘皇家飞空艇翱翔于米德加尔特上空，俯瞰普隆德拉巍峨尖塔与世界树。',
        },
      },
    },
    {
      id: 'prontera',
      src: '/assets/steam_hd/steam_ss_1.jpg',
      category: 'Town Life',
      copy: {
        en: {
          title: 'Prontera Central Bazaar & Street Stalls',
          subtitle: '1080p Full HD • Living Player Market & Free Trade Plaza',
          description:
            'Hundreds of players gathered in the heart of Prontera running personal stalls and trading rare MVP cards.',
        },
        id: {
          title: 'Bazar Pusat Prontera & Lapak Jalanan',
          subtitle: '1080p Full HD • Pasar Pemain Hidup & Alun-Alun Perdagangan',
          description:
            'Ratusan pemain berkumpul di jantung Prontera membuka lapak pribadi dan memperdagangkan kartu MVP langka.',
        },
        th: {
          title: 'ตลาดกลางพรอนเทราและถนนร้านค้าผู้เล่น',
          subtitle: '1080p Full HD • ตลาดผู้เล่นมีชีวิตและลานแลกเปลี่ยนอิสระ',
          description:
            'ผู้เล่นนับร้อยรวมตัวใจกลางพรอนเทรา ตั้งแผงขายของและแลกเปลี่ยนการ์ด MVP หายากอย่างคึกคัก',
        },
        zh: {
          title: '普隆德拉中央广场与露天集市',
          subtitle: '1080p 全高清 • 玩家自由摆摊与交易广场',
          description:
            '数以百计的玩家齐聚普隆德拉城中心，开设个人摊位、交易稀有 MVP 卡片并结交好友。',
        },
      },
    },
    {
      id: 'exploration',
      src: '/assets/steam_hd/steam_ss_10.jpg',
      category: 'Exploration',
      copy: {
        en: {
          title: 'Tri-Modal 360° Open World Freedom',
          subtitle: '1080p Full HD • Steeple Climbing • River Swimming • Starry Flight',
          description:
            'Seamless three-dimensional travel: scale gothic church towers, swim across rivers, and float under starlit skies.',
        },
        id: {
          title: 'Kebebasan Dunia Terbuka 360°',
          subtitle: '1080p Full HD • Memanjat Menara • Berenang • Terbang Berbintang',
          description:
            'Eksplorasi tiga dimensi mulus: panjat menara gereja, berenang melintasi sungai, dan melayang di bawah bintang.',
        },
        th: {
          title: 'อิสระโลกเปิด 360° สามมิติเต็มรูปแบบ',
          subtitle: '1080p Full HD • ปีนหอคอย • ว่ายน้ำ • ลอยตัวใต้แสงดาว',
          description:
            'เดินทางได้ทุกมิติอย่างไร้รอยต่อ ทั้งปีนยอดโบสถ์ ว่ายน้ำข้ามแม่น้ำ และลอยตัวในฟองสบู่ใต้ฟ้าประดับดาว',
        },
        zh: {
          title: '360° 海陆空立体开放世界探索',
          subtitle: '1080p 全高清 • 攀爬尖塔 • 河流畅游 • 星夜飞行',
          description:
            '无缝三维立体探索：攀登哥特教堂塔尖、畅游清澈河流，或在星光气泡中自由翱翔。',
        },
      },
    },
    {
      id: 'wardrobe_ui',
      src: '/assets/steam_hd/steam_ss_2.jpg',
      category: 'Customization',
      copy: {
        en: {
          title: 'In-Game Wardrobe Studio & Angel Wings',
          subtitle: '1080p Full HD • Dynamic Wings, Bubblegum Emote & Outfit Catalog',
          description:
            'Equip feathered angel wings, playful bubblegum accessories, and unlock full themed sets in the live wardrobe UI.',
        },
        id: {
          title: 'Studio Lemari Dalam Game & Sayap Malaikat',
          subtitle: '1080p Full HD • Sayap Dinamis & Katalog Kostum',
          description:
            'Pasang sayap malaikat berbulu, aksesori lucu, dan koleksi beragam set kostum di antarmuka lemari langsung.',
        },
        th: {
          title: 'สตูดิโอตู้เสื้อผ้าในเกมและปีกนางฟ้า',
          subtitle: '1080p Full HD • ปีกเคลื่อนไหวและแคตตาล็อกแฟชั่น',
          description:
            'สวมใส่ปีกนางฟ้าสุดอลังการ เครื่องประดับสุดน่ารัก และปลดล็อกชุดแฟชั่นครบเซ็ตในหน้าต่างตู้เสื้อผ้า',
        },
        zh: {
          title: '游戏内实时衣橱与圣洁天使之翼',
          subtitle: '1080p 全高清 • 动态羽翼、气泡表情与海量时装库',
          description:
            '在实时衣橱中自由搭配羽翼、俏皮脸饰，解锁星梦、甜心人偶等精美主题套装。',
        },
      },
    },
    {
      id: 'guild_siege',
      src: '/assets/steam_hd/steam_ss_6.jpg',
      category: 'Guild Life',
      copy: {
        en: {
          title: 'War of Emperium & Guild Castle Siege',
          subtitle: '1080p Full HD • Epic Guild vs Guild Battles & Imperial Banners',
          description:
            'Fierce guild competition inside imperial fortresses: coordinate guild skills and claim castle ownership.',
        },
        id: {
          title: 'War of Emperium & Pengepungan Kastil Guild',
          subtitle: '1080p Full HD • Pertarungan Guild vs Guild & Panji Kekaisaran',
          description:
            'Persaingan guild sengit di dalam benteng kekaisaran: koordinasikan skill guild dan rebut kepemilikan kastil.',
        },
        th: {
          title: 'War of Emperium และศึกตีปราสาทกิลด์',
          subtitle: '1080p Full HD • การปะทะกิลด์ต่อกิลด์และธงจักรวรรดิ',
          description:
            'การแข่งขันกิลด์สุดดุเดือดในป้อมปราการหลวง ประสานสกิลกิลด์เพื่อครอบครองปราสาทแห่งศักดิ์ศรี',
        },
        zh: {
          title: '华丽金属攻城战与公会城堡对决',
          subtitle: '1080p 全高清 • 热血公会战与帝国旗帜',
          description:
            '深入帝国要塞展开大规模公会激战，精密配合团队技能，将公会旗帜镌刻在城堡之巅。',
        },
      },
    },
    {
      id: 'boss_arena',
      src: '/assets/steam_hd/steam_ss_4.jpg',
      category: 'Exploration',
      copy: {
        en: {
          title: 'Colossal MVP Boss Arena Encounter',
          subtitle: '1080p Full HD • Ancient Dungeon Titans & Raid Coordination',
          description:
            'Face off against towering mythological bosses with telegraphed mechanics, elemental synergies, and rare drops.',
        },
        id: {
          title: 'Pertarungan Arena Bos MVP Raksasa',
          subtitle: '1080p Full HD • Titan Dungeon Kuno & Koordinasi Raid',
          description:
            'Hadapi bos mitologi raksasa dengan mekanik terukur, sinergi elemen, dan drop peralatan legendaris.',
        },
        th: {
          title: 'เผชิญหน้าบอส MVP ยักษ์กลางสังเวียน',
          subtitle: '1080p Full HD • ไททันดันเจี้ยนโบราณและเรดปาร์ตี้',
          description:
            'ท้าทายบอสตำนานขนาดมหึมาด้วยระบบหลบสกิล การประสานธาตุ และลุ้นรับอุปกรณ์ระดับตำนาน',
        },
        zh: {
          title: '巨型 MVP 首领竞技场激战',
          subtitle: '1080p 全高清 • 远古巨兽与团队副本协作',
          description:
            '迎战体型庞大的神话级首领，巧妙应对机制、打出元素联动并赢取传说掉落。',
        },
      },
    },
    {
      id: 'wardrobe_poring',
      src: '/assets/steam_hd/steam_ss_5.jpg',
      category: 'Customization',
      copy: {
        en: {
          title: 'Chibi Wardrobe & The Giant Poring Hat',
          subtitle: '1080p Full HD • Over 2,500+ Costumes & Animated Headgears',
          description:
            'Express your style with chibi avatars, formal wear, maid outfits, and the iconic animated giant pink Poring hat.',
        },
        id: {
          title: 'Lemari Chibi & Topi Poring Raksasa',
          subtitle: '1080p Full HD • Lebih dari 2.500+ Kostum & Topi Beranimasi',
          description:
            'Ekspresikan gayamu lewat avatar chibi, busana formal, kostum pelayan, dan topi Poring raksasa ikonik.',
        },
        th: {
          title: 'ตู้เสื้อผ้าจิบิและหมวก Poring ยักษ์',
          subtitle: '1080p Full HD • ชุดแฟชั่นและหมวกเคลื่อนไหวกว่า 2,500+ ชิ้น',
          description:
            'บ่งบอกตัวตนของคุณด้วยตัวละครจิบิสุดน่ารัก ชุดทางการ ชุดเมด และหมวก Poring สีชมพูขนาดยักษ์',
        },
        zh: {
          title: 'Q 版百变衣橱与巨型波利头饰',
          subtitle: '1080p 全高清 • 2,500+ 款时装与动态头饰',
          description:
            '用可爱的 Q 版造型、礼服、女仆装以及标志性的动态巨型粉色波利帽展现你的独特风格。',
        },
      },
    },
    {
      id: 'romance',
      src: '/assets/steam_hd/steam_ss_8.jpg',
      category: 'Social & Romance',
      copy: {
        en: {
          title: 'Holy Matrimony & Cathedral Vows',
          subtitle: '1080p Full HD • Prontera Wedding Chapel • Rose Petal Procession',
          description:
            'Tie the knot with your gaming partner in a grand floral ceremony, unlocking couple teleportation and duo buffs.',
        },
        id: {
          title: 'Pernikahan Suci & Janji Katedral',
          subtitle: '1080p Full HD • Kapel Pernikahan Prontera • Taburan Kelopak Mawar',
          description:
            'Ikat janji suci bersama pasangan mainmu dalam upacara megah untuk membuka teleportasi pasangan dan buff duo.',
        },
        th: {
          title: 'พิธีวิวาห์ศักดิ์สิทธิ์และคำสาบานในมหาวิหาร',
          subtitle: '1080p Full HD • โบสถ์พรอนเทรา • ขบวนกลีบกุหลาบสุดโรแมนติก',
          description:
            'จัดงานวิวาห์กับคู่หูของคุณท่ามกลางเพื่อนกิลด์ พร้อมปลดล็อกสกิลวาร์ปหาคู่รักและบัฟพิเศษ',
        },
        zh: {
          title: '圣殿婚礼与大教堂誓言',
          subtitle: '1080p 全高清 • 普隆德拉婚礼教堂 • 玫瑰花瓣巡礼',
          description:
            '在公会亲友的见证下与伴侣步入花海礼堂，解锁专属伴侣传送与双人羁绊增益。',
        },
      },
    },
    {
      id: 'midnight_fest',
      src: '/assets/steam_hd/steam_ss_7.jpg',
      category: 'Guild Life',
      copy: {
        en: {
          title: 'Midnight Slime & Poring Light Festival',
          subtitle: '1080p Full HD • Neon Celebrations & Festive Bonfires',
          description:
            'Dance beneath neon-lit night skies, join festival mini-games, and earn commemorative tokens with your guild.',
        },
        id: {
          title: 'Festival Cahaya Slime & Poring Tengah Malam',
          subtitle: '1080p Full HD • Perayaan Neon & Api Unggun Meriah',
          description:
            'Menari di bawah langit malam neon, ikut mini-game festival, dan kumpulkan token kenangan bersama guild.',
        },
        th: {
          title: 'เทศกาลแสงสีสไลม์และ Poring ยามค่ำคืน',
          subtitle: '1080p Full HD • งานฉลองนีออนและกองไฟเทศกาล',
          description:
            'ร่วมเต้นรำใต้แสงนีออนยามค่ำคืน เล่นมินิเกมเทศกาล และสะสมเหรียญที่ระลึกร่วมกับเพื่อนร่วมปาร์ตี้',
        },
        zh: {
          title: '午夜霓虹史莱姆与波利灯光节',
          subtitle: '1080p 全高清 • 霓虹狂欢与篝火庆典',
          description:
            '在霓虹夜空下起舞、参与趣味庆典小游戏，与公会好友一同收集限定纪念徽章。',
        },
      },
    },
    {
      id: 'sunset_coast',
      src: '/assets/steam_hd/steam_ss_11.jpg',
      category: 'Exploration',
      copy: {
        en: {
          title: 'Tropical Sunset Coastline & Horizons',
          subtitle: '1080p Full HD • Coastal Breezes & Exotic Island Dungeons',
          description:
            'Relax along golden beaches, sail toward uncharted islands, and uncover hidden marine grottos.',
        },
        id: {
          title: 'Pantai Senja Tropis & Cakrawala Luas',
          subtitle: '1080p Full HD • Angin Pantai & Dungeon Pulau Eksotis',
          description:
            'Bersantai di pantai keemasan, berlayar menuju pulau baru, dan temukan gua laut tersembunyi penuh harta.',
        },
        th: {
          title: 'ชายฝั่งพระอาทิตย์ตกเขตร้อนสุดสายตา',
          subtitle: '1080p Full HD • ลมทะเลและดันเจี้ยนเกาะลึกลับ',
          description:
            'พักผ่อนริมหาดทรายสีทอง ล่องเรือสู่เกาะที่ไม่เคยมีใครสำรวจ และค้นพบถ้ำใต้ทะเลที่ซ่อนสมบัติไว้',
        },
        zh: {
          title: '热带日落海岸线与海天远景',
          subtitle: '1080p 全高清 • 滨海微风与异域海岛副本',
          description:
            '漫步金色夕阳沙滩、乘船探索未知海岛，发掘深藏于海洋洞穴中的神秘宝藏。',
        },
      },
    },
  ];

  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [filterCategory, setFilterCategory] = useState<CategoryKey>('All');

  const categories: CategoryKey[] = [
    'All',
    'Key Visual',
    'Town Life',
    'Exploration',
    'Customization',
    'Guild Life',
    'Social & Romance',
  ];

  const filteredScreenshots =
    filterCategory === 'All'
      ? screenshots
      : screenshots.filter((s) => s.category === filterCategory);

  const openLightbox = (index: number) => {
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

  const titles: Record<
    SupportedLanguage,
    {
      tag: string;
      heading: string;
      subheading: string;
      showingCount: string;
      capturesUnit: string;
      closeLabel: string;
      prevLabel: string;
      nextLabel: string;
      categoryLabels: Record<CategoryKey, string>;
    }
  > = {
    en: {
      tag: 'IN-GAME VISUAL ARCHIVE',
      heading: 'Every Frame Tells An Epic Story',
      subheading:
        'High-resolution captures directly from the game engine showing authentic gameplay, social towns, wardrobe studio, guild parties, and open-world freedom.',
      showingCount: 'Showing captures from Midgard:',
      capturesUnit: 'Full HD (1080p) Captures',
      closeLabel: 'Close Lightbox',
      prevLabel: 'Previous Image',
      nextLabel: 'Next Image',
      categoryLabels: {
        All: 'All',
        'Key Visual': 'Key Visual',
        'Town Life': 'Town Life',
        Exploration: 'Exploration',
        Customization: 'Customization',
        'Guild Life': 'Guild Life',
        'Social & Romance': 'Social & Romance',
      },
    },
    id: {
      tag: 'ARSIP VISUAL DALAM GAME',
      heading: 'Setiap Bingkai Menyimpan Kisah Epik',
      subheading:
        'Tangkapan layar resolusi tinggi langsung dari engine game yang menampilkan gameplay asli, kota sosial, studio lemari, pesta guild, dan kebebasan dunia terbuka.',
      showingCount: 'Menampilkan tangkapan dari Midgard:',
      capturesUnit: 'Tangkapan Full HD (1080p)',
      closeLabel: 'Tutup Galeri',
      prevLabel: 'Gambar Sebelumnya',
      nextLabel: 'Gambar Berikutnya',
      categoryLabels: {
        All: 'Semua',
        'Key Visual': 'Key Visual',
        'Town Life': 'Kehidupan Kota',
        Exploration: 'Eksplorasi',
        Customization: 'Kustomisasi',
        'Guild Life': 'Kehidupan Guild',
        'Social & Romance': 'Sosial & Romansa',
      },
    },
    th: {
      tag: 'คลังภาพสกรีนช็อตในเกม',
      heading: 'ทุกเฟรมบอกเล่าเรื่องราวสุดยิ่งใหญ่',
      subheading:
        'ภาพความละเอียดสูงจากเอนจินเกมจริง เผยให้เห็นเกมเพลย์แท้จริง เมืองแห่งสังคม สตูดิโอแฟชั่น ปาร์ตี้กิลด์ และโลกเปิดอันกว้างใหญ่',
      showingCount: 'แสดงภาพจาก Midgard:',
      capturesUnit: 'ภาพระดับ Full HD (1080p)',
      closeLabel: 'ปิดหน้าต่างภาพ',
      prevLabel: 'ภาพก่อนหน้า',
      nextLabel: 'ภาพถัดไป',
      categoryLabels: {
        All: 'ทั้งหมด',
        'Key Visual': 'คีย์วิชวล',
        'Town Life': 'ชีวิตในเมือง',
        Exploration: 'การสำรวจ',
        Customization: 'แฟชั่นและแต่งตัว',
        'Guild Life': 'ชีวิตกิลด์',
        'Social & Romance': 'สังคมและคู่รัก',
      },
    },
    zh: {
      tag: '游戏实机高清图库',
      heading: '每一帧都诉说着史诗故事',
      subheading:
        '直取自游戏引擎的高清实机截图，真实呈现主城百态、时尚衣橱、公会狂欢与开放世界自由探索。',
      showingCount: '当前展示米德加尔特实机截图：',
      capturesUnit: '张全高清（1080p）截图',
      closeLabel: '关闭大图预览',
      prevLabel: '上一张',
      nextLabel: '下一张',
      categoryLabels: {
        All: '全部',
        'Key Visual': '官方主视觉',
        'Town Life': '主城生活',
        Exploration: '世界探索',
        Customization: '外观定制',
        'Guild Life': '公会风云',
        'Social & Romance': '社交与浪漫',
      },
    },
  };

  const t = titles[activeLanguage] || titles.en;
  const activeLightboxItem = activeLightboxIndex !== null ? screenshots[activeLightboxIndex] : null;
  const activeLightboxCopy = activeLightboxItem
    ? activeLightboxItem.copy[activeLanguage] || activeLightboxItem.copy.en
    : null;

  return (
    <section className="py-20 lg:py-28 bg-[#080c14]/50 backdrop-blur-[2px] relative overflow-hidden border-b border-slate-800">
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
          <p className="text-slate-300 text-base sm:text-lg">{t.subheading}</p>
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
              {t.categoryLabels[cat]}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScreenshots.map((item, index) => {
            const isWide = item.id === 'keyart' || item.id === 'midnight_fest';
            const copy = item.copy[activeLanguage] || item.copy.en;
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
                  alt={copy.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/25 to-transparent group-hover:from-slate-950/95 transition-all" />

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-slate-950/85 border border-slate-700/80 text-[11px] font-bold text-amber-400 uppercase tracking-wider backdrop-blur-md">
                    {t.categoryLabels[item.category]}
                  </span>
                </div>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-9 h-9 rounded-full bg-slate-900/90 border border-amber-400/60 text-amber-400 flex items-center justify-center shadow-lg">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>

                <div className="absolute bottom-0 inset-x-0 p-5">
                  <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {copy.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">{copy.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center text-xs text-slate-400">
          <span>{t.showingCount} </span>
          <strong className="text-amber-400 font-bold">
            {filteredScreenshots.length} / {screenshots.length} {t.capturesUnit}
          </strong>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxItem && activeLightboxCopy && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-slate-950/95 backdrop-blur-lg animate-in fade-in"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-5xl w-full bg-slate-900 border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 px-6 bg-slate-950 flex items-center justify-between border-b border-slate-800">
              <div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest">
                  {t.categoryLabels[activeLightboxItem.category]}
                </span>
                <h4 className="font-cinzel text-lg font-bold text-white">{activeLightboxCopy.title}</h4>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={closeLightbox}
                  aria-label={t.closeLabel}
                  className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="relative aspect-[16/9] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeLightboxItem.src}
                alt={activeLightboxCopy.title}
                decoding="async"
                className="max-w-full max-h-[70vh] object-contain"
              />

              <button
                type="button"
                onClick={prevImage}
                aria-label={t.prevLabel}
                className="absolute left-4 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 shadow-xl transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextImage}
                aria-label={t.nextLabel}
                className="absolute right-4 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 shadow-xl transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 px-6 bg-slate-950 border-t border-slate-800 text-xs sm:text-sm text-slate-300">
              <p>{activeLightboxCopy.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
