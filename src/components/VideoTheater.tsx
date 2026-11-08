import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { Play, Pause, Volume2, VolumeX, Maximize, Film, Youtube, ExternalLink, Sparkles, Radio, Eye } from 'lucide-react';

interface VideoTheaterProps {
  activeLanguage: 'en' | 'fil' | 'fr' | 'ar';
}

export const VideoTheater: React.FC<VideoTheaterProps> = ({ activeLanguage }) => {
  const [activeTab, setActiveTab] = useState<'steam' | 'youtube'>('steam');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [hlsReady, setHlsReady] = useState(false);
  const [miniPlayer, setMiniPlayer] = useState(false);

  const steamHlsUrl =
    'https://video.akamai.steamstatic.com/store_trailers/4212480/247566644/93bac4cbb55c38157a6c4cb203ad9eb1768803c5/1775620731/hls_264_master.m3u8';
  // With autoplay=1, mute=1, loop=1, playlist=RUjnauha-aU so YouTube automatically runs without stopping
  const youtubeEmbedUrl =
    'https://www.youtube.com/embed/RUjnauha-aU?autoplay=1&mute=1&loop=1&playlist=RUjnauha-aU&enablejsapi=1&rel=0';

  useEffect(() => {
    if (activeTab !== 'steam') return;

    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    const tryAutoPlay = () => {
      video.muted = true;
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Retry on user interaction if browser has strict initial policy
          setIsPlaying(false);
        });
    };

    if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90,
        autoStartLoad: true,
      });

      hls.loadSource(steamHlsUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setHlsReady(true);
        tryAutoPlay();
      });

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls?.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls?.recoverMediaError();
              break;
            default:
              hls?.destroy();
              break;
          }
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native Safari HLS
      video.src = steamHlsUrl;
      video.addEventListener('loadedmetadata', () => {
        setHlsReady(true);
        tryAutoPlay();
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [activeTab]);

  // Keep alive: ensure video is always playing automatically
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const checkInterval = setInterval(() => {
      if (video.paused && activeTab === 'steam') {
        video.muted = true;
        video.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }, 2000);

    return () => clearInterval(checkInterval);
  }, [activeTab]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
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

  const titles = {
    en: {
      tag: 'CONTINUOUS 60FPS GAMEPLAY STREAM',
      heading: 'Experience Midgard in Non-Stop Motion',
      subheading:
        'Official high-definition launch trailer running automatically 24/7. Watch open world exploration, real-time boss battles, and player street markets.',
      steamTab: 'Steam 60FPS Direct (Auto-Running)',
      ytTab: 'YouTube 4K Cinema Stream',
      autoBadge: 'AUTOPLAY ACTIVE • CONTINUOUS LOOP',
      unmuteBanner: 'Audio is muted for browser autoplay. Click here to UNMUTE audio! 🔊',
      mutedBanner: 'Audio Playing! Click to Mute 🔈',
      steamStoreBtn: 'Visit Official Steam Page',
      specsBadge: '60 FPS Direct Stream • Uncompressed Bitrate',
    },
    fr: {
      tag: 'FLUX DE GAMEPLAY CONTINU 60FPS',
      heading: 'Découvrez Midgard en action continue',
      subheading:
        'Bande-annonce officielle diffusée automatiquement sans interruption. Admirez l’exploration 360°, les marchés de Prontera et les combats mythiques.',
      steamTab: 'Steam 60FPS Direct (Lecture Automatique)',
      ytTab: 'YouTube 4K Flux Cinématique',
      autoBadge: 'LECTURE AUTO ACTIVE • BOUCLE CONTINUE',
      unmuteBanner: 'Vidéo en cours sans son. Cliquez ici pour ACTIVER LE SON ! 🔊',
      mutedBanner: 'Son activé ! Cliquez pour couper 🔈',
      steamStoreBtn: 'Visiter la page Steam officielle',
      specsBadge: 'Flux direct 60 FPS • Qualité non compressée',
    },
    fil: {
      tag: 'PATULOY NA 60FPS GAMEPLAY STREAM',
      heading: 'Damhin ang Midgard sa Tuluy-tuloy na Aksyon',
      subheading:
        'Opisyal na high-definition launch trailer na awtomatikong tumatakbo 24/7. Panoorin ang open world exploration, real-time boss battles, at mga tindahan ng mga manlalaro.',
      steamTab: 'Steam 60FPS Direct (Awtomatikong Tumatakbo)',
      ytTab: 'YouTube 4K Cinema Stream',
      autoBadge: 'AUTOPLAY AKTIBO • PATULOY NA TUGTOG',
      unmuteBanner: 'Naka-mute ang audio para sa browser autoplay. Pindutin dito para i-UNMUTE ang audio! 🔊',
      mutedBanner: 'Tumutugtog ang Audio! Pindutin para i-Mute 🔈',
      steamStoreBtn: 'Puntahan ang Opisyal na Steam Page',
      specsBadge: '60 FPS Direct Stream • Walang Bawas na Kalidad',
    },
    ar: {
      tag: 'فيديو رسمي خدام أوطوماتيك 24/7',
      heading: 'شوف عالم اللعبة كيفاش كينبض بالحياة بلا توقف',
      subheading:
        'تريلر اللعبة كيدور أوطوماتيك بلا حبس! جرافيك 60 إطار فالثانية، العالم المفتوح، وأجواء المغامرة.',
      steamTab: 'Steam تريلر خدام أوطوماتيك',
      ytTab: 'YouTube بجودة 4K على',
      autoBadge: 'الفيديو خدام أوطوماتيك بلا توقف ⚡',
      unmuteBanner: 'الفيديو خدام أوطوماتيك. كليكي هنا باش تطلق الصوت ديال اللعبة! 🔊',
      mutedBanner: 'الصوت مشعول دابا! كليكي باش تكتمه 🔈',
      steamStoreBtn: 'Steam زور صفحة اللعبة الرسمية على',
      specsBadge: 'بث مباشر 60FPS عالي الدقة',
    },
  };

  const t = titles[activeLanguage as keyof typeof titles] || titles.en;

  return (
    <section id="media" className="py-20 lg:py-28 bg-[#090e18] relative overflow-hidden border-b border-slate-800">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        
        {/* Section Header */}
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

        {/* Tab Controls: Steam HLS vs YouTube */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('steam')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'steam'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 border border-blue-400 ring-2 ring-blue-400/30'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping mr-1"></span>
            <Film className="w-4 h-4 text-sky-400" />
            <span>{t.steamTab}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('youtube')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'youtube'
                ? 'bg-red-600 text-white shadow-lg shadow-red-500/30 border border-red-400 ring-2 ring-red-400/30'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700'
            }`}
          >
            <Youtube className="w-4 h-4 text-red-400" />
            <span>{t.ytTab}</span>
          </button>
        </div>

        {/* Audio Unmute Callout Ribbon */}
        <div
          onClick={toggleMute}
          className={`max-w-5xl mx-auto mb-4 p-3 rounded-2xl flex items-center justify-between gap-4 cursor-pointer transition-all border shadow-lg ${
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

          <span className="text-xs font-extrabold px-3 py-1 rounded-lg bg-slate-950/80 border border-white/20">
            {isMuted ? 'CLICK TO UNMUTE' : 'SOUND ON'}
          </span>
        </div>

        {/* Main Video Screen Container */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-slate-700/80 bg-slate-950 shadow-2xl shadow-blue-950/60 aspect-video max-w-5xl mx-auto group">
          
          {/* Autoplay status overlay tag */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 border border-emerald-400/40 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-[11px] font-bold text-emerald-400 font-mono tracking-wider">
              {t.autoBadge}
            </span>
          </div>

          {activeTab === 'steam' ? (
            <div className="relative w-full h-full flex items-center justify-center bg-black">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                loop
                muted={isMuted}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className="w-full h-full object-contain cursor-pointer"
                onClick={toggleMute}
                poster="/assets/steam_hd/steam_ss_3.jpg"
              />

              {/* Player Bottom Control Bar */}
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
                        <span>Unmute</span>
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
          ) : (
            <div className="w-full h-full">
              <iframe
                src={youtubeEmbedUrl}
                title="Ragnarok: The New World Trailer (Continuous Stream)"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>

        {/* Bottom Steam Store Banner Link */}
        <div className="mt-8 max-w-5xl mx-auto bg-gradient-to-r from-slate-900/90 via-blue-950/40 to-slate-900/90 border border-blue-500/30 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-sky-400" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                Steam Store Official Page Available
              </h3>
              <p className="text-xs text-slate-400">
                Check screenshots, community discussions, and system requirements directly on Steam.
              </p>
            </div>
          </div>

          <a
            href="https://store.steampowered.com/app/4212480/Ragnarok_The_New_World/?location=hero_banner"
            target="_blank"
            rel="noopener noreferrer"
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
