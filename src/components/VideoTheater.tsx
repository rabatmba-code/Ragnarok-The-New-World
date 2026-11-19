import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Film, ExternalLink, Sparkles, Radio } from 'lucide-react';
import { HERO_VIDEO_1_URL, HERO_VIDEO_2_URL } from '../utils/mediaAssets';
import { SupportedLanguage } from '../utils/trackingAndLocale';

interface VideoTheaterProps {
  activeLanguage: string;
}

export const VideoTheater: React.FC<VideoTheaterProps> = ({ activeLanguage }) => {
  const [activeTab, setActiveTab] = useState<'trailer1' | 'trailer2'>('trailer1');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const userPausedRef = useRef(false);

  const activeVideoUrl = activeTab === 'trailer1' ? HERO_VIDEO_1_URL : HERO_VIDEO_2_URL;
  const activePoster =
    activeTab === 'trailer1'
      ? '/assets/aistudio/image_2f98b010.png'
      : '/assets/aistudio/image_d1a84294.png';

  useEffect(() => {
    const video = videoRef.current;
    if (!video || typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      setIsVisible(true);
      return;
    }

    const loadObs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldLoad(true);
          loadObs.disconnect();
        }
      },
      { rootMargin: '500px 0px' }
    );

    const viewObs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: '100px 0px', threshold: 0.05 }
    );

    loadObs.observe(video);
    viewObs.observe(video);

    return () => {
      loadObs.disconnect();
      viewObs.disconnect();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    if (!isVisible) {
      if (!video.paused) video.pause();
      return;
    }

    if (userPausedRef.current) return;

    video.muted = isMuted;
    video
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        video.muted = true;
        setIsMuted(true);
        video
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      });
  }, [activeTab, shouldLoad, isVisible]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      userPausedRef.current = false;
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      userPausedRef.current = true;
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      video.requestFullscreen().catch(() => {});
    }
  };

  const titles: Record<
    SupportedLanguage,
    {
      tag: string;
      heading: string;
      subheading: string;
      tab1: string;
      tab2: string;
      autoBadge: string;
      unmuteBanner: string;
      mutedBanner: string;
      clickToUnmute: string;
      soundOn: string;
      unmuteShort: string;
      steamCardTitle: string;
      steamCardSub: string;
      steamStoreBtn: string;
      specsBadge: string;
    }
  > = {
    en: {
      tag: 'DIRECT HD MP4 GAMEPLAY STREAM',
      heading: 'Experience Midgard in Non-Stop Motion',
      subheading:
        'Fast direct HD trailers running smoothly with zero buffering. Switch between Official Hero Trailer 1 and Midgard Action Trailer 2.',
      tab1: 'Hero Trailer 1 (HD MP4)',
      tab2: 'Hero Trailer 2 (HD MP4)',
      autoBadge: 'FAST DIRECT MP4 • CONTINUOUS LOOP',
      unmuteBanner: 'Audio is muted for browser autoplay. Click here to UNMUTE audio! 🔊',
      mutedBanner: 'Audio Playing! Click to Mute 🔈',
      clickToUnmute: 'CLICK TO UNMUTE',
      soundOn: 'SOUND ON',
      unmuteShort: 'Unmute',
      steamCardTitle: 'Official Windows PC Page on Steam',
      steamCardSub: 'Check screenshots, community hubs, and PC requirements directly on Steam.',
      steamStoreBtn: 'Visit Official Steam Page',
      specsBadge: 'Direct CDN MP4 Stream • Instant Playback',
    },
    id: {
      tag: 'STREAM GAMEPLAY HD MP4 LANGSUNG',
      heading: 'Rasakan Aksi Midgard Tanpa Henti',
      subheading:
        'Trailer HD langsung yang berjalan mulus tanpa buffering. Beralih antara Trailer Resmi 1 dan Trailer Aksi Midgard 2.',
      tab1: 'Trailer Utama 1 (HD MP4)',
      tab2: 'Trailer Utama 2 (HD MP4)',
      autoBadge: 'MP4 LANGSUNG CEPAT • PUTAR OTOMATIS',
      unmuteBanner: 'Audio dibisukan untuk putar otomatis browser. Klik di sini untuk NYALAKAN suara! 🔊',
      mutedBanner: 'Audio Menyala! Klik untuk Bisukan 🔈',
      clickToUnmute: 'KLIK NYALAKAN SUARA',
      soundOn: 'SUARA AKTIF',
      unmuteShort: 'Suara',
      steamCardTitle: 'Halaman Resmi PC Windows di Steam',
      steamCardSub: 'Lihat tangkapan layar, diskusi komunitas, dan spesifikasi PC langsung di Steam.',
      steamStoreBtn: 'Kunjungi Halaman Steam Resmi',
      specsBadge: 'Stream MP4 Langsung • Pemutaran Instan',
    },
    th: {
      tag: 'สตรีมเกมเพลย์ HD MP4 โดยตรง',
      heading: 'สัมผัสโลก Midgard แบบเคลื่อนไหวเต็มตา',
      subheading:
        'รับชมตัวอย่าง HD ที่เล่นได้อย่างลื่นไหลไม่สะดุด สลับรับชมระหว่างตัวอย่างหลัก 1 และตัวอย่างแอ็กชัน 2 ได้ทันที',
      tab1: 'ตัวอย่างหลัก 1 (HD MP4)',
      tab2: 'ตัวอย่างหลัก 2 (HD MP4)',
      autoBadge: 'MP4 โหลดไว • เล่นวนต่อเนื่อง',
      unmuteBanner: 'ปิดเสียงไว้สำหรับการเล่นอัตโนมัติ คลิกที่นี่เพื่อเปิดเสียง! 🔊',
      mutedBanner: 'กำลังเล่นเสียงอยู่! คลิกเพื่อปิดเสียง 🔈',
      clickToUnmute: 'คลิกเพื่อเปิดเสียง',
      soundOn: 'เปิดเสียงแล้ว',
      unmuteShort: 'เปิดเสียง',
      steamCardTitle: 'หน้าร้านค้า Steam อย่างเป็นทางการสำหรับ PC',
      steamCardSub: 'ดูภาพเกมเพลย์ คอมมูนิตี้ผู้เล่น และสเปก PC โดยตรงบน Steam',
      steamStoreBtn: 'ไปยังหน้า Steam อย่างเป็นทางการ',
      specsBadge: 'สตรีม MP4 โดยตรง • เล่นได้ทันที',
    },
    zh: {
      tag: '高清 MP4 实机演示直连播放',
      heading: '沉浸式感受米德加尔特动态世界',
      subheading:
        '高速直连高清预告片，流畅播放零缓冲。随时切换官方宣传片 1 与米德加尔特实机宣传片 2。',
      tab1: '官方宣传片 1（HD MP4）',
      tab2: '官方宣传片 2（HD MP4）',
      autoBadge: '高速直连 MP4 • 无缝循环',
      unmuteBanner: '浏览器自动播放已静音，点击此处立即开启游戏音效！🔊',
      mutedBanner: '音效播放中！点击静音 🔈',
      clickToUnmute: '点击开启声音',
      soundOn: '声音已开',
      unmuteShort: '开声音',
      steamCardTitle: 'Steam 官方 Windows PC 商店页',
      steamCardSub: '前往 Steam 查看更多官方截图、玩家社区与 PC 配置信息。',
      steamStoreBtn: '前往 Steam 官方页面',
      specsBadge: '直连 CDN 高清流 • 即点即播',
    },
  };

  const t = titles[activeLanguage as SupportedLanguage] || titles.en;

  return (
    <section id="media" className="py-20 lg:py-28 bg-[#090e18]/50 backdrop-blur-[2px] relative overflow-hidden border-b border-slate-800">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
            <span>{t.tag}</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            {t.heading}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            {t.subheading}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('trailer1')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'trailer1'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 border border-blue-400 ring-2 ring-blue-400/30'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700'
            }`}
          >
            {activeTab === 'trailer1' && (
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping mr-1" />
            )}
            <Film className="w-4 h-4 text-sky-400" />
            <span>{t.tab1}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('trailer2')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'trailer2'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 border border-indigo-400 ring-2 ring-indigo-400/30'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700'
            }`}
          >
            {activeTab === 'trailer2' && (
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping mr-1" />
            )}
            <Film className="w-4 h-4 text-amber-400" />
            <span>{t.tab2}</span>
          </button>
        </div>

        <button
          type="button"
          onClick={toggleMute}
          className={`w-full max-w-5xl mx-auto mb-4 p-3 rounded-2xl flex items-center justify-between gap-4 cursor-pointer transition-all border shadow-lg text-left ${
            isMuted
              ? 'bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 border-amber-400/40 text-amber-200 hover:border-amber-400'
              : 'bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-emerald-500/20 border-emerald-400/40 text-emerald-200 hover:border-emerald-400'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${isMuted ? 'bg-amber-400 text-slate-950 animate-bounce' : 'bg-emerald-400 text-slate-950'}`}>
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </div>
            <span className="text-xs sm:text-sm font-bold">
              {isMuted ? t.unmuteBanner : t.mutedBanner}
            </span>
          </div>

          <span className="text-xs font-extrabold px-3 py-1 rounded-lg bg-slate-950/80 border border-white/20 shrink-0">
            {isMuted ? t.clickToUnmute : t.soundOn}
          </span>
        </button>

        <div className="relative rounded-3xl overflow-hidden border-2 border-slate-700/80 bg-slate-950 shadow-2xl shadow-blue-950/60 aspect-video max-w-5xl mx-auto group">
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 border border-emerald-400/40 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[11px] font-bold text-emerald-400 font-mono tracking-wider">
              {t.autoBadge}
            </span>
          </div>

          <div className="relative w-full h-full flex items-center justify-center bg-black">
            <video
              ref={videoRef}
              key={activeVideoUrl}
              src={shouldLoad ? activeVideoUrl : undefined}
              poster={activePoster}
              autoPlay={shouldLoad && isVisible}
              playsInline
              loop
              muted={isMuted}
              preload={shouldLoad ? 'auto' : 'none'}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full h-full object-contain cursor-pointer"
              onClick={toggleMute}
            />

            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-slate-950/95 via-slate-950/80 to-transparent flex items-center justify-between gap-4 transition-opacity">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                  className="p-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white shadow-md cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>

                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                  className={`p-2.5 rounded-xl shadow-md cursor-pointer transition-all ${
                    isMuted
                      ? 'bg-amber-400 text-slate-950 hover:bg-amber-300 font-bold'
                      : 'bg-slate-800/90 hover:bg-slate-700 text-white'
                  }`}
                >
                  {isMuted ? (
                    <span className="flex items-center gap-1.5 text-xs font-bold">
                      <VolumeX className="w-4 h-4 text-slate-950" />
                      <span>{t.unmuteShort}</span>
                    </span>
                  ) : (
                    <Volume2 className="w-4 h-4 text-emerald-400" />
                  )}
                </button>

                <span className="text-xs text-slate-300 font-mono hidden sm:inline">
                  {t.specsBadge}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  aria-label="Toggle Fullscreen"
                  className="p-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white shadow-md cursor-pointer"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 max-w-5xl mx-auto bg-gradient-to-r from-slate-900/90 via-blue-950/40 to-slate-900/90 border border-blue-500/30 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-sky-400" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                {t.steamCardTitle}
              </h3>
              <p className="text-xs text-slate-400">
                {t.steamCardSub}
              </p>
            </div>
          </div>

          <a
            href="#go2offer#"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 transition-all shrink-0"
          >
            <span>{t.steamStoreBtn}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
