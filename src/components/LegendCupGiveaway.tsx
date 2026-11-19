import React, { useState } from 'react';
import { Trophy, Share2, Copy, Check, ExternalLink, Coins, Calendar, Eye, Swords, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SupportedLanguage } from '../utils/trackingAndLocale';

interface LegendCupGiveawayProps {
  activeLanguage: string;
  onInspectImage?: (src: string, caption: string) => void;
}

export const LegendCupGiveaway: React.FC<LegendCupGiveawayProps> = ({
  activeLanguage,
  onInspectImage,
}) => {
  const [copied, setCopied] = useState(false);

  const legendCupPoster = '/assets/aistudio/image_81863f60.png';
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '#go2offer#';

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#f59e0b', '#3b82f6', '#ec4899'],
        });
      })
      .catch(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
  };

  const content: Record<
    SupportedLanguage,
    {
      eventBadge: string;
      headline: string;
      subheadline: string;
      description: string;
      prizePoolHighlight: string;
      tournamentDate: string;
      tokenBadge: string;
      tokenTitle: string;
      tokenSub: string;
      step1Title: string;
      step1Desc: string;
      step2Title: string;
      step2Desc: string;
      step3Title: string;
      step3Desc: string;
      playNowCta: string;
      copyBtn: string;
      copiedBtn: string;
      inspectPosterBtn: string;
      shareWhatsApp: string;
      shareX: string;
      shareFacebook: string;
    }
  > = {
    en: {
      eventBadge: 'PLAY STAGES & COLLECT TOKENS TO WIN',
      headline: 'Legend Cup: Fight To Be Legend',
      subheadline: '2026 Inaugural Legend Cup Global • US$1.01M Official Tournament Pool • Starts Nov 9',
      description:
        'Earn real in-game tournament rewards strictly through gameplay! Clear stages, battle bosses, and collect Event Tokens in Ragnarok: The New World to unlock exclusive Poring headgear and Legend Cup progression milestones.',
      prizePoolHighlight: 'US$1.01M Tournament Pool',
      tournamentDate: 'Starts Nov 9, 2026',
      tokenBadge: 'PLAY-TO-EARN IN-GAME TOKENS',
      tokenTitle: 'Clear Stages & Collect Tokens to Unlock Rewards',
      tokenSub:
        'No random forms — rewards are earned directly inside the game by completing stages, collecting tokens, and climbing the Midgard leaderboard with your guild.',
      step1Title: '1. Play Stages & Dungeons',
      step1Desc: 'Complete story stages, daily quests, and MVP boss encounters across Midgard.',
      step2Title: '2. Collect Event Tokens',
      step2Desc: 'Gather Legend Tokens from every cleared stage and guild challenge.',
      step3Title: '3. Redeem Exclusive Rewards',
      step3Desc: 'Exchange collected tokens in-game for limited Poring gear, outfits, and upgrades.',
      playNowCta: 'Play Now & Start Collecting Tokens',
      copyBtn: 'Copy Invite Link',
      copiedBtn: 'Invite Link Copied!',
      inspectPosterBtn: 'Inspect Full 4K Poster (3840×2160)',
      shareWhatsApp: 'Share on WhatsApp',
      shareX: 'Share on X (Twitter)',
      shareFacebook: 'Share on Facebook',
    },
    id: {
      eventBadge: 'MAIN STAGE & KUMPULKAN TOKEN UNTUK MENANG',
      headline: 'Legend Cup: Bertarung Menjadi Legenda',
      subheadline: 'Turnamen Global Perdana 2026 • Total Hadiah Resmi US$1,01 Juta • Mulai 9 Nov',
      description:
        'Raih hadiah langsung lewat permainan! Selesaikan stage, kalahkan bos, dan kumpulkan Token Event di Ragnarok: The New World untuk membuka headgear Poring eksklusif serta hadiah progres Legend Cup.',
      prizePoolHighlight: 'Hadiah Turnamen US$1,01 Juta',
      tournamentDate: 'Mulai 9 Nov 2026',
      tokenBadge: 'MAIN STAGE & KUMPULKAN TOKEN',
      tokenTitle: 'Selesaikan Stage & Kumpulkan Token untuk Buka Hadiah',
      tokenSub:
        'Hadiah diperoleh langsung di dalam game dengan menaklukkan stage, mengumpulkan token, dan bersaing bersama guild di Midgard.',
      step1Title: '1. Mainkan Stage & Dungeon',
      step1Desc: 'Selesaikan stage cerita, misi harian, dan pertempuran bos MVP di Midgard.',
      step2Title: '2. Kumpulkan Token Event',
      step2Desc: 'Dapatkan Legend Token dari setiap stage dan tantangan guild yang diselesaikan.',
      step3Title: '3. Tukar Hadiah Eksklusif',
      step3Desc: 'Tukarkan token di dalam game dengan kostum, headgear Poring, dan item upgrade.',
      playNowCta: 'Main Sekarang & Mulai Kumpulkan Token',
      copyBtn: 'Salin Tautan Undangan',
      copiedBtn: 'Tautan Berhasil Disalin!',
      inspectPosterBtn: 'Lihat Poster 4K Penuh (3840×2160)',
      shareWhatsApp: 'Bagikan ke WhatsApp',
      shareX: 'Bagikan ke X (Twitter)',
      shareFacebook: 'Bagikan ke Facebook',
    },
    th: {
      eventBadge: 'เล่นด่านและสะสมโทเค็นเพื่อรับรางวัล',
      headline: 'Legend Cup: ศึกชิงความเป็นตำนาน',
      subheadline: 'การแข่งขัน Legend Cup Global 2026 • เงินรางวัลทัวร์นาเมนต์ทางการ $1.01M • เริ่ม 9 พ.ย.',
      description:
        'รับรางวัลจากการเล่นจริงในเกม! ผ่านด่าน ปราบบอส และสะสมโทเค็นอีเวนต์ใน Ragnarok: The New World เพื่อปลดล็อกหมวก Poring สุดพิเศษและรางวัลประจำซีซัน Legend Cup',
      prizePoolHighlight: 'เงินรางวัลทัวร์นาเมนต์ $1.01M',
      tournamentDate: 'เริ่ม 9 พ.ย. 2026',
      tokenBadge: 'ระบบเล่นด่านสะสมโทเค็นในเกม',
      tokenTitle: 'ผ่านด่านและสะสมโทเค็นเพื่อปลดล็อกของรางวัล',
      tokenSub:
        'ผู้เล่นรับรางวัลได้จริงจากการลุยด่านและสะสมโทเค็นภายในเกม พร้อมร่วมทีมกับกิลด์เพื่อไต่อันดับใน Midgard',
      step1Title: '1. เล่นด่านและลุยดันเจี้ยน',
      step1Desc: 'เคลียร์ด่านเนื้อเรื่อง เควสต์ประจำวัน และบอส MVP ทั่วโลก Midgard',
      step2Title: '2. สะสมโทเค็นอีเวนต์',
      step2Desc: 'รับ Legend Token จากทุกด่านที่ผ่านและภารกิจของกิลด์',
      step3Title: '3. แลกรับของรางวัลพิเศษ',
      step3Desc: 'นำโทเค็นที่สะสมมาแลกชุดแฟชั่น หมวก Poring และไอเทมอัปเกรดในเกม',
      playNowCta: 'เข้าเล่นเลยและเริ่มสะสมโทเค็น',
      copyBtn: 'คัดลอกลิงก์ชวนเพื่อน',
      copiedBtn: 'คัดลอกลิงก์เรียบร้อย!',
      inspectPosterBtn: 'ดูโปสเตอร์ 4K เต็มตา (3840×2160)',
      shareWhatsApp: 'แชร์บน WhatsApp',
      shareX: 'แชร์บน X (Twitter)',
      shareFacebook: 'แชร์บน Facebook',
    },
    zh: {
      eventBadge: '挑战关卡收集代币赢取游戏好礼',
      headline: '传奇杯：为传奇而战（Legend Cup）',
      subheadline: '2026 首届全球传奇杯赛事 • 官方总奖金池 101 万美元 • 11 月 9 日开赛',
      description:
        '凭实力畅玩赢取奖励！在《Ragnarok: The New World》中通关副本关卡、挑战首领并收集活动代币，即可在游戏内兑换限定波利头饰与传奇杯专属成长奖励。',
      prizePoolHighlight: '101 万美元赛事奖金池',
      tournamentDate: '2026 年 11 月 9 日开赛',
      tokenBadge: '通关关卡 • 收集代币兑换奖励',
      tokenTitle: '挑战关卡并收集代币解锁丰厚奖励',
      tokenSub:
        '所有奖励均通过游戏内真实游玩获取——完成关卡挑战、积累活动代币，并与公会战友冲击米德加尔特排行榜。',
      step1Title: '1. 畅玩关卡与副本',
      step1Desc: '完成主线关卡、每日委托与世界 MVP 首领讨伐战。',
      step2Title: '2. 收集活动代币',
      step2Desc: '每次通关关卡与完成公会挑战皆可获得传奇代币。',
      step3Title: '3. 兑换游戏限定好礼',
      step3Desc: '在游戏内使用代币兑换限定波利头饰、外观时装与强化材料。',
      playNowCta: '立即进入游戏开始收集代币',
      copyBtn: '复制邀请链接',
      copiedBtn: '邀请链接已复制！',
      inspectPosterBtn: '查看 4K 官方海报（3840×2160）',
      shareWhatsApp: '分享至 WhatsApp',
      shareX: '分享至 X (Twitter)',
      shareFacebook: '分享至 Facebook',
    },
  };

  const t = content[activeLanguage as SupportedLanguage] || content.en;
  const shareText = encodeURIComponent(`${t.headline} — Ragnarok: The New World — ${shareUrl}`);

  return (
    <section
      id="legend-cup"
      className="py-20 lg:py-28 bg-[#090b14]/50 backdrop-blur-[2px] relative overflow-hidden border-b border-amber-500/30"
    >
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-red-500/20 to-amber-500/20 border border-amber-500/50 text-amber-400 text-xs sm:text-sm font-extrabold uppercase tracking-widest mb-4 shadow-lg shadow-amber-500/10">
            <Coins className="w-4 h-4 text-amber-400" />
            <span>{t.eventBadge}</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 tracking-tight mb-4 drop-shadow-md">
            {t.headline}
          </h2>

          <p className="text-amber-200/90 font-mono text-sm sm:text-base font-semibold mb-3 tracking-wide">
            {t.subheadline}
          </p>

          <p className="text-slate-200 text-base sm:text-lg max-w-3xl mx-auto">{t.description}</p>
        </div>

        {/* 4K Official Tournament Poster */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/50 bg-gradient-to-b from-slate-900 to-slate-950 shadow-2xl shadow-amber-500/15 mb-12 group">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
            <img
              src={legendCupPoster}
              alt={t.headline}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40 pointer-events-none" />

            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap gap-2 z-10">
              <span className="px-3.5 py-1.5 rounded-xl bg-slate-950/90 border border-amber-500/70 text-xs sm:text-sm font-black text-amber-400 uppercase tracking-wider backdrop-blur-md shadow-lg flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-400" />
                {t.prizePoolHighlight}
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-red-950/90 border border-red-500/70 text-xs sm:text-sm font-black text-red-300 uppercase tracking-wider backdrop-blur-md shadow-lg flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-red-400" />
                {t.tournamentDate}
              </span>
            </div>

            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10">
              <button
                type="button"
                onClick={() => onInspectImage?.(legendCupPoster, `${t.headline} (4K UHD)`)}
                className="px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-amber-500 hover:text-slate-950 text-amber-300 border border-amber-500/60 text-xs font-bold transition-all shadow-xl backdrop-blur-md flex items-center gap-2 cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">{t.inspectPosterBtn}</span>
                <span className="sm:hidden">4K</span>
              </button>
            </div>
          </div>
        </div>

        {/* Play Stages & Collect Tokens Card (Replaces removed $10 Lucky Ticket block) */}
        <div className="bg-slate-900/80 border border-amber-500/35 rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-md shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/35 text-amber-300 text-xs font-bold mb-3 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.tokenBadge}</span>
              </div>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-black text-white mb-2">
                {t.tokenTitle}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl">{t.tokenSub}</p>
            </div>

            <a
              href="#go2offer#"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 shrink-0"
            >
              <span>{t.playNowCta}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-5 rounded-2xl bg-slate-950/75 border border-sky-500/30">
              <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-400/30 text-sky-300 flex items-center justify-center mb-3">
                <Swords className="w-5 h-5" />
              </div>
              <div className="text-base font-extrabold text-white mb-1">{t.step1Title}</div>
              <p className="text-xs text-slate-300 leading-relaxed">{t.step1Desc}</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/75 border border-amber-500/35">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-400/35 text-amber-300 flex items-center justify-center mb-3">
                <Coins className="w-5 h-5" />
              </div>
              <div className="text-base font-extrabold text-amber-300 mb-1">{t.step2Title}</div>
              <p className="text-xs text-slate-300 leading-relaxed">{t.step2Desc}</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/75 border border-emerald-500/30">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 flex items-center justify-center mb-3">
                <Trophy className="w-5 h-5" />
              </div>
              <div className="text-base font-extrabold text-emerald-300 mb-1">{t.step3Title}</div>
              <p className="text-xs text-slate-300 leading-relaxed">{t.step3Desc}</p>
            </div>
          </div>

          {/* Share Bar with Guildmates */}
          <div className="pt-6 border-t border-slate-800/80 flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
              <a
                href={`https://api.whatsapp.com/send?text=${shareText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{t.shareWhatsApp}</span>
              </a>

              <a
                href={`https://twitter.com/intent/tweet?text=${shareText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-sky-600/90 hover:bg-sky-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{t.shareX}</span>
              </a>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-indigo-600/90 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{t.shareFacebook}</span>
              </a>
            </div>

            <button
              type="button"
              onClick={handleCopyLink}
              className={`w-full lg:w-auto px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 ${
                copied
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-400/40'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? t.copiedBtn : t.copyBtn}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
