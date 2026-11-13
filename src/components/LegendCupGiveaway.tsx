import React, { useState } from 'react';
import { Trophy, Gift, Share2, Copy, Check, Sparkles, ExternalLink, ShieldCheck, Ticket, Users, Calendar, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LegendCupGiveawayProps {
  activeLanguage: 'en' | 'fil' | 'fr' | 'ar';
  onInspectImage?: (src: string, caption: string) => void;
}

export const LegendCupGiveaway: React.FC<LegendCupGiveawayProps> = ({
  activeLanguage,
  onInspectImage,
}) => {
  const [copied, setCopied] = useState(false);
  const [participantInput, setParticipantInput] = useState('');
  const [rewardChoice, setRewardChoice] = useState<'steam' | 'discord'>('steam');
  const [ticketNumber, setTicketNumber] = useState<string | null>(null);
  const [ticketsClaimedCount, setTicketsClaimedCount] = useState(14820);

  const legendCupPoster = '/assets/aistudio/image_81863f60.png';
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '#go2offer#';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#f59e0b', '#3b82f6', '#ec4899'],
      });
    }).catch(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleClaimTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!participantInput.trim()) return;

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newTicket = `LC-${rewardChoice.toUpperCase()}-${randomNum}`;
    setTicketNumber(newTicket);
    setTicketsClaimedCount((prev) => prev + 1);

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#e11d48', '#38bdf8', '#10b981'],
    });
  };

  const content = {
    en: {
      tag: 'OFFICIAL TOURNAMENT & COMMUNITY CAMPAIGN',
      giveawayBadge: '🎁 Share & Win a $10 Gift Card!',
      headline: 'Legend Cup: Fight To Be Legend',
      subheadline: '2026 Inaugural Legend Cup Global • US$1.01M Prize Pool & Growing • Starts Nov 9',
      description:
        'Celebrate the historic arrival of the Legend Cup tournament in Ragnarok: The New World! Share the launch with your companions, guildmates, and gaming community to earn free daily entries for $10 Steam Gift Cards and exclusive in-game Poring headgear.',
      prizePoolHighlight: 'US$1.01M Prize Pool',
      tournamentDate: 'Starts Nov 9, 2026',
      formats: 'Two Competitive Formats',
      shareSectionTitle: '🎁 Share & Win a $10 Gift Card!',
      shareSectionSub: 'Copy your unique invite link or share directly to your gaming networks to enter today’s draw.',
      copyBtn: 'Copy Share Link',
      copiedBtn: 'Link Copied to Clipboard!',
      enterDrawTitle: 'Claim Your Daily $10 Lucky Ticket',
      enterDrawSub: 'Enter your email or Discord username to join the next prize distribution.',
      inputPlaceholder: 'Enter your email or Discord handle (e.g. Adventurer#1234)...',
      claimBtn: 'Get Free Lucky Draw Ticket',
      ticketIssued: 'Your Lucky Draw Ticket Has Been Issued!',
      ticketDesc: 'Winners are announced daily in our Discord and Steam community hubs. Save your ticket number:',
      steamCardOption: '$10 Steam Wallet Card',
      discordCardOption: '$10 Discord Nitro / Zeny Pack',
      statParticipants: 'Adventurers Entered Today',
      inspectPosterBtn: 'Inspect Full 4K Poster (3840×2160)',
      shareWhatsApp: 'Share on WhatsApp',
      shareX: 'Share on X (Twitter)',
      shareFacebook: 'Share on Facebook',
    },
    fil: {
      tag: 'OPISYAL NA TOURNAMENT AT REWARD PARA SA KOMUNIDAD',
      giveawayBadge: '🎁 I-share at Manalo ng $10 Gift Card!',
      headline: 'Legend Cup: Lumaban Para Maging Alamat',
      subheadline: '2026 Inaugural Legend Cup Global • US$1.01M Prize Pool & Lumalaki Pa • Simula sa Nobyembre 9',
      description:
        'Ipagdiwang ang makasaysayang pagdating ng Legend Cup sa Ragnarok: The New World! I-share ang laro sa iyong mga kaibigan, guildmates, at gaming barkada para sa araw-araw na pagkakataong manalo ng $10 Steam Gift Card at libreng Poring headgear.',
      prizePoolHighlight: 'US$1.01M Prize Pool',
      tournamentDate: 'Magsisimula sa Nob 9, 2026',
      formats: 'Dalawang Competitive Format',
      shareSectionTitle: '🎁 I-share at Manalo ng $10 Gift Card!',
      shareSectionSub: 'Kopyahin ang iyong natatanging invite link o i-share sa social media para makasali sa araw-araw na draw.',
      copyBtn: 'Kopyahin ang Share Link',
      copiedBtn: 'Nakopya na ang Link!',
      enterDrawTitle: 'Kunin ang Iyong Pang-araw-araw na $10 Lucky Ticket',
      enterDrawSub: 'Ipasok ang iyong email o Discord username para makasali sa susunod na bunutan.',
      inputPlaceholder: 'Ipasok ang email o Discord handle (hal. PinoyGamer#1234)...',
      claimBtn: 'Kumuha ng Libreng Lucky Draw Ticket',
      ticketIssued: 'Naibigay na ang Iyong Lucky Draw Ticket!',
      ticketDesc: 'Araw-araw na inaanunsyo ang mga nanalo sa aming Discord at Steam community hubs. Itago ang ticket number na ito:',
      steamCardOption: '$10 Steam Wallet Card',
      discordCardOption: '$10 Discord Nitro / Zeny Pack',
      statParticipants: 'Mga Naka-rehistro Ngayong Araw',
      inspectPosterBtn: 'Tingnan ang 4K Poster (3840×2160)',
      shareWhatsApp: 'I-share sa WhatsApp',
      shareX: 'I-share sa X (Twitter)',
      shareFacebook: 'I-share sa Facebook',
    },
    fr: {
      tag: 'TOURNOI OFFICIEL & CAMPAGNE COMMUNAUTAIRE',
      giveawayBadge: '🎁 Partagez & Gagnez une carte cadeau de 10 $ !',
      headline: 'Legend Cup : Battez-vous pour devenir une Légende',
      subheadline: 'Inaugural Legend Cup Global 2026 • 1,01 M$ USD de récompenses • Début le 9 Novembre',
      description:
        'Célébrez l’arrivée historique du tournoi mondial Legend Cup dans Ragnarok: The New World ! Partagez le jeu avec vos amis et votre guilde pour tenter de remporter une carte cadeau Steam de 10 $ chaque jour.',
      prizePoolHighlight: '1,01 M$ USD de Prix',
      tournamentDate: 'Début le 9 Nov 2026',
      formats: 'Deux Formats Compétitifs',
      shareSectionTitle: '🎁 Partagez & Gagnez une carte cadeau de 10 $ !',
      shareSectionSub: 'Copiez votre lien d’invitation ou partagez directement pour participer au tirage au sort.',
      copyBtn: 'Copier le lien de partage',
      copiedBtn: 'Lien copié !',
      enterDrawTitle: 'Réclamez votre ticket de tirage au sort',
      enterDrawSub: 'Entrez votre email ou pseudo Discord pour participer au tirage quotidien.',
      inputPlaceholder: 'Votre email ou Discord (ex: Gamer#1234)...',
      claimBtn: 'Obtenir mon ticket gratuit',
      ticketIssued: 'Votre ticket de tirage au sort est validé !',
      ticketDesc: 'Les gagnants sont annoncés chaque jour sur Discord et Steam. Conservez votre ticket :',
      steamCardOption: 'Carte cadeau Steam 10 $',
      discordCardOption: 'Discord Nitro 10 $ / Pack Zeny',
      statParticipants: 'Participants inscrits aujourd’hui',
      inspectPosterBtn: 'Voir le poster officiel en 4K (3840×2160)',
      shareWhatsApp: 'Partager sur WhatsApp',
      shareX: 'Partager sur X (Twitter)',
      shareFacebook: 'Partager sur Facebook',
    },
    ar: {
      tag: 'البطولة العالمية الكبرى ومسابقة اللاعبين',
      giveawayBadge: '🎁 بارطاجي وربح بطاقة هدايا بقيمة 10 دولار!',
      headline: 'كأس الأساطير: قاتل لتصبح أسطورة (LEGEND CUP)',
      subheadline: 'البطولة العالمية الافتتاحية 2026 • جوائز تزيد عن 1.01 مليون دولار • الانطلاق 9 نونبر',
      description:
        'احتفل بانطلاق أقوى بطولة ألعاب عالمية فـ Ragnarok: The New World! شارك اللعبة مع صحابك والغيلد ديالك وربح بطاقات Steam و Discord بقيمة 10 دولار كل نهار مع هدايا أزياء حصرية داخل اللعبة.',
      prizePoolHighlight: '1.01 مليون دولار جوائز',
      tournamentDate: 'الانطلاق: 9 نونبر 2026',
      formats: 'نمطان للتنافس (Two Formats)',
      shareSectionTitle: '🎁 بارطاجي وربح بطاقة هدايا بقيمة 10 دولار!',
      shareSectionSub: 'نسخ رابط الدعوة الخاص بك ولا بارطاجي مباشرة مع صحابك فـ الواتساب وتويتر.',
      copyBtn: 'نسخ رابط المشاركة',
      copiedBtn: 'تم نسخ الرابط بنجاح!',
      enterDrawTitle: 'احصل على تذكرة السحب اليومي لربح $10',
      enterDrawSub: 'دخل الإيميل ديالك ولا حساب ديسكورد باش تشارك فـ السحب الجاي.',
      inputPlaceholder: 'كتب الإيميل ولا حساب ديسكورد (مثال: Adventurer#1234)...',
      claimBtn: 'خد تذكرة السحب المجانية',
      ticketIssued: 'مبروك! تم إصدار تذكرة السحب الخاصة بك',
      ticketDesc: 'كيتم الإعلان على الرابحين يومياً فـ ديسكورد وسيرفر Steam. احتفظ برقم التذكرة:',
      steamCardOption: 'بطاقة Steam بقيمة 10 دولار',
      discordCardOption: 'اشتراك Discord Nitro ولا باقة Zeny',
      statParticipants: 'مشارك تسجلو اليوم',
      inspectPosterBtn: 'شاهد البوستر الرسمي بدقة 4K فائقة (3840×2160)',
      shareWhatsApp: 'شارك فـ واتساب',
      shareX: 'شارك فـ تويتر (X)',
      shareFacebook: 'شارك فـ فيسبوك',
    },
  };

  const t = content[activeLanguage as keyof typeof content] || content.en;
  const shareText = encodeURIComponent(`🎁 Share & Win a $10 Gift Card! Join me in Ragnarok: The New World & the $1.01M Legend Cup Tournament! Check it out here: ${shareUrl}`);

  return (
    <section id="legend-cup" className="py-20 lg:py-28 bg-[#090b14] relative overflow-hidden border-b border-amber-500/30">
      
      {/* Background glow effects */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header Badge */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-red-500/20 to-amber-500/20 border border-amber-500/50 text-amber-400 text-xs sm:text-sm font-extrabold uppercase tracking-widest mb-4 shadow-lg shadow-amber-500/10 animate-pulse">
            <Gift className="w-4 h-4 text-amber-400" />
            <span>{t.giveawayBadge}</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 tracking-tight mb-4 drop-shadow-md">
            {t.headline}
          </h2>

          <p className="text-amber-200/90 font-mono text-sm sm:text-base font-semibold mb-3 tracking-wide">
            {t.subheadline}
          </p>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto">
            {t.description}
          </p>
        </div>

        {/* 4K Official Tournament Poster Showcase Card */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/50 bg-gradient-to-b from-slate-900 to-slate-950 shadow-2xl shadow-amber-500/15 mb-14 group">
          
          {/* Main Poster Image */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
            <img
              src={legendCupPoster}
              alt="Ragnarok Legend Cup 2026 - US$1.01M Prize Pool"
              className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
            />

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40 pointer-events-none" />

            {/* Floating Top Badges */}
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

            {/* Inspect in Fullscreen Button */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10">
              <button
                type="button"
                onClick={() => onInspectImage?.(legendCupPoster, 'Ragnarok Legend Cup 2026 - Official Tournament Poster (3840×2160 4K UHD)')}
                className="px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-amber-500 hover:text-slate-950 text-amber-300 border border-amber-500/60 text-xs font-bold transition-all shadow-xl backdrop-blur-md flex items-center gap-2 cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">{t.inspectPosterBtn}</span>
                <span className="sm:hidden">4K View</span>
              </button>
            </div>

          </div>
        </div>

        {/* 🎁 Share & Win a $10 Gift Card Interactive Hub Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Share Options (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-3 uppercase tracking-wider">
                <Share2 className="w-3.5 h-3.5" />
                <span>COMMUNITY REWARD EVENT</span>
              </div>

              <h3 className="font-cinzel text-2xl sm:text-3xl font-black text-white mb-2">
                {t.shareSectionTitle}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base mb-6">
                {t.shareSectionSub}
              </p>

              {/* Direct Social Share Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <a
                  href={`https://api.whatsapp.com/send?text=${shareText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{t.shareWhatsApp}</span>
                </a>

                <a
                  href={`https://twitter.com/intent/tweet?text=${shareText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-xl bg-sky-600/90 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{t.shareX}</span>
                </a>

                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-xl bg-indigo-600/90 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{t.shareFacebook}</span>
                </a>
              </div>

              {/* Copy Referral Link Box */}
              <div className="p-3.5 bg-slate-950/80 rounded-2xl border border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
                <div className="truncate text-xs font-mono text-slate-300 w-full sm:w-auto">
                  {shareUrl}
                </div>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 ${
                    copied
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                      : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md shadow-amber-400/20'
                  }`}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? t.copiedBtn : t.copyBtn}</span>
                </button>
              </div>

              {/* Prize Details Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-amber-500/20">
                  <div className="text-xl sm:text-2xl font-black text-amber-400 mb-1">
                    100 Winners
                  </div>
                  <div className="text-xs text-slate-300 font-medium">
                    Daily $10 Steam Wallet Gift Cards distributed to verified entrants.
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/60 border border-amber-500/20">
                  <div className="text-xl sm:text-2xl font-black text-amber-400 mb-1">
                    100% Guaranteed
                  </div>
                  <div className="text-xs text-slate-300 font-medium">
                    Every entrant gets an exclusive in-game Poring Headgear voucher code.
                  </div>
                </div>
              </div>
            </div>

            {/* Live participation stats */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-400" />
                <span>{t.statParticipants}: <strong className="text-white font-bold">{ticketsClaimedCount.toLocaleString()}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Active Giveaway Round</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Lucky Ticket Form (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold mb-3 uppercase tracking-wider">
              <Ticket className="w-3.5 h-3.5" />
              <span>ENTRY TICKETS</span>
            </div>

            <h3 className="font-cinzel text-xl sm:text-2xl font-black text-white mb-2">
              {t.enterDrawTitle}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mb-6">
              {t.enterDrawSub}
            </p>

            {ticketNumber ? (
              /* Success Issued Ticket Card */
              <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/15 via-slate-900 to-slate-950 border border-amber-500/50 text-center animate-in zoom-in-95">
                <div className="w-14 h-14 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Check className="w-7 h-7" />
                </div>
                <h4 className="font-cinzel text-lg font-bold text-white mb-1">
                  {t.ticketIssued}
                </h4>
                <p className="text-xs text-slate-300 mb-4">
                  {t.ticketDesc}
                </p>

                <div className="p-3 bg-slate-950 border-2 border-dashed border-amber-400/60 rounded-xl font-mono text-lg font-black text-amber-400 tracking-widest shadow-inner mb-4">
                  {ticketNumber}
                </div>

                <div className="text-[11px] text-slate-400 mb-4">
                  Registered for: <strong className="text-white">{participantInput}</strong> ({rewardChoice === 'steam' ? '$10 Steam Card' : '$10 Discord Nitro'})
                </div>

                <div className="flex flex-col gap-2">
                  <a
                    href="#go2offer#"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2"
                  >
                    <Gift className="w-4 h-4" />
                    <span>Claim Reward Now</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setTicketNumber(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-bold transition-colors cursor-pointer"
                  >
                    Enter Another Account
                  </button>
                </div>
              </div>
            ) : (
              /* Ticket Claim Form */
              <form onSubmit={handleClaimTicket} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1.5 uppercase tracking-wider">
                    Select Your Reward Preference
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRewardChoice('steam')}
                      className={`p-3 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer ${
                        rewardChoice === 'steam'
                          ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md shadow-amber-400/20'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-black text-sm">Steam $10</div>
                      <div className={`text-[10px] ${rewardChoice === 'steam' ? 'text-slate-900 font-medium' : 'text-slate-400'}`}>
                        {t.steamCardOption}
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRewardChoice('discord')}
                      className={`p-3 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer ${
                        rewardChoice === 'discord'
                          ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md shadow-amber-400/20'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-black text-sm">Discord / Zeny</div>
                      <div className={`text-[10px] ${rewardChoice === 'discord' ? 'text-slate-900 font-medium' : 'text-slate-400'}`}>
                        {t.discordCardOption}
                      </div>
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="giveaway-input" className="block text-xs font-bold text-slate-200 mb-1.5 uppercase tracking-wider">
                    Your Email or Discord Handle *
                  </label>
                  <input
                    id="giveaway-input"
                    type="text"
                    required
                    value={participantInput}
                    onChange={(e) => setParticipantInput(e.target.value)}
                    placeholder={t.inputPlaceholder}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Gift className="w-4 h-4 text-slate-950" />
                  <span>{t.claimBtn}</span>
                </button>

                <a
                  href="#go2offer#"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Claim $10 Offer &amp; Play Now</span>
                </a>

                <div className="flex items-center gap-2 text-[11px] text-slate-400 justify-center pt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>100% Free Entry • No purchase necessary • Fair random draw</span>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
