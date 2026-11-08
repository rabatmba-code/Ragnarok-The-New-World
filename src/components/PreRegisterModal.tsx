import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, Gift, ShieldCheck, Ticket, Download, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PreRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeLanguage: 'en' | 'fil' | 'fr' | 'ar';
}

export const PreRegisterModal: React.FC<PreRegisterModalProps> = ({
  isOpen,
  onClose,
  activeLanguage,
}) => {
  const [email, setEmail] = useState('');
  const [platform, setPlatform] = useState<'steam' | 'pc'>('steam');
  const [region, setRegion] = useState('Europe & MENA');
  const [isSuccess, setIsSuccess] = useState(false);
  const [passportId, setPassportId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    const generatedId = `RO-${Math.floor(100000 + Math.random() * 900000)}`;
    setPassportId(generatedId);
    setIsSuccess(true);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#3b82f6', '#10b981', '#ec4899'],
    });
  };

  const handleReset = () => {
    setIsSuccess(false);
    setEmail('');
    onClose();
  };

  const milestones = [
    { target: '100K', reward: '50,000 Zeny + 10 Fly Wings', unlocked: true },
    { target: '250K', reward: 'Exclusive "Pioneer" Title', unlocked: true },
    { target: '500K', reward: 'Cute Giant Poring Hat', unlocked: true },
    { target: '1.0M', reward: 'Celestial Grand Peco Mount', unlocked: true },
  ];

  const texts = {
    en: {
      title: 'Pre-Register for Midgard Launch',
      subtitle: 'Join over 1,248,930 adventurers and unlock every milestone tier instantly on Day 1.',
      submitBtn: 'Claim Launch Starter Pack',
      emailLabel: 'Adventurer Email Address *',
      platformLabel: 'Preferred Gaming Platform',
      regionLabel: 'Preferred Server Region',
      successTitle: 'Pre-Registration Confirmed!',
      successSubtitle: 'Your Midgard Adventurer Passport has been officially issued.',
      passLabel: 'Passport No.',
      rewardsIncluded: 'Your Rewards Included:',
    },
    fil: {
      title: 'Mag-pre-register para sa Midgard Launch',
      subtitle: 'Sumali sa mahigit 1,248,930 adventurers at i-unlock agad ang bawat milestone reward sa Araw 1.',
      submitBtn: 'Kunin ang Launch Starter Pack',
      emailLabel: 'Email Address ng Adventurer *',
      platformLabel: 'Paboritong Gaming Platform',
      regionLabel: 'Rehiyon ng Server',
      successTitle: 'Kumpirmado ang Pre-Registration!',
      successSubtitle: 'Opisyal nang naibigay ang iyong Midgard Adventurer Passport.',
      passLabel: 'Passport Blg.',
      rewardsIncluded: 'Kasama sa Iyong mga Gantimpala:',
    },
    fr: {
      title: 'Pré-inscription officielle',
      subtitle: 'Rejoignez plus de 1 248 930 aventuriers et recevez toutes les récompenses de lancement dès le jour 1.',
      submitBtn: 'Réclamer le pack de démarrage',
      emailLabel: 'Adresse email de l’aventurier *',
      platformLabel: 'Plateforme de jeu préférée',
      regionLabel: 'Région du serveur',
      successTitle: 'Pré-inscription validée !',
      successSubtitle: 'Votre passeport d’aventurier de Midgard a été délivré.',
      passLabel: 'N° de Passeport',
      rewardsIncluded: 'Vos récompenses incluses :',
    },
    ar: {
      title: 'سجل مسبقاً فـ العالم الجديد',
      subtitle: 'انضم لأكثر من 1,248,930 غيمر واستفد من جميع الهدايا الحصرية فور إطلاق السيرفر.',
      submitBtn: 'احصل على باقة البداية المجانية',
      emailLabel: 'البريد الإلكتروني للغيمر *',
      platformLabel: 'منصة اللعب المفضلة',
      regionLabel: 'منطقة السيرفر',
      successTitle: 'مبروك! تم التسجيل بنجاح',
      successSubtitle: 'جواز السفر لميدغارد جاهز دابا.',
      passLabel: 'رقم الجواز',
      rewardsIncluded: 'الهدايا لي غادي تاخد فالحساب ديالك:',
    },
  };

  const t = texts[activeLanguage as keyof typeof texts] || texts.en;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative animate-in zoom-in-95 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Pre-register Modal"
          className="absolute top-5 right-5 p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <>
            {/* Modal Header */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 flex items-center justify-center">
                <Gift className="w-5 h-5" />
              </div>
              <h3 className="font-cinzel text-xl sm:text-2xl font-black text-white">
                {t.title}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mb-6">
              {t.subtitle}
            </p>

            {/* Milestones Progress Bar */}
            <div className="mb-6 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-2">
                <span>Milestone Progress (100% Unlocked)</span>
                <span className="text-amber-400">1.2M+ / 1.0M</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden mb-3">
                <div className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full w-full" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {milestones.map((m, idx) => (
                  <div key={idx} className="bg-slate-900/80 p-2 rounded-lg border border-slate-800 text-[11px] text-center">
                    <div className="font-mono font-bold text-amber-400">{m.target}</div>
                    <div className="text-[10px] text-slate-300 truncate mt-0.5">{m.reward}</div>
                    <div className="mt-1 text-[9px] text-emerald-400 font-bold uppercase flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Unlocked
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  {t.emailLabel}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="adventurer@ragnarok.com"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    {t.platformLabel}
                  </label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="steam">Steam PC (Recommended)</option>
                    <option value="pc">Standalone PC Client</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    {t.regionLabel}
                  </label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Europe & MENA">Europe & MENA (Morocco/France/EU)</option>
                    <option value="North America">North America</option>
                    <option value="Asia">Asia-Pacific</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-amber-400/25 transition-all cursor-pointer transform hover:-translate-y-0.5"
                >
                  {t.submitBtn}
                </button>
              </div>

              <p className="text-[11px] text-slate-400 text-center">
                Free to play. No purchase required. Unsubscribe anytime.
              </p>
            </form>
          </>
        ) : (
          /* SUCCESS BOARDING PASS VIEW */
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8" />
            </div>

            <h3 className="font-cinzel text-2xl font-black text-white mb-1">
              {t.successTitle}
            </h3>
            <p className="text-xs text-slate-300 mb-6">
              {t.successSubtitle}
            </p>

            {/* Passport Ticket Card */}
            <div className="bg-gradient-to-br from-slate-950 to-slate-900 border-2 border-amber-400/60 rounded-2xl p-5 mb-6 text-left relative overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <Ticket className="w-4 h-4 text-amber-400" />
                  <span className="font-cinzel text-xs font-bold text-white tracking-wider">
                    MIDGARD ADVENTURER PASS
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded">
                  VIP DAY-1
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                <div>
                  <span className="text-slate-400 block text-[10px]">{t.passLabel}</span>
                  <span className="font-mono font-bold text-amber-300 text-sm">{passportId}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Registered Email</span>
                  <span className="font-mono text-white truncate block">{email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Platform</span>
                  <span className="font-semibold text-slate-200 uppercase">{platform}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Cluster</span>
                  <span className="font-semibold text-slate-200">{region}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 text-xs">
                <span className="font-bold text-amber-400 block mb-1">{t.rewardsIncluded}</span>
                <ul className="text-[11px] text-slate-300 space-y-0.5">
                  <li>✨ 1x Animated Giant Pink Poring Headgear</li>
                  <li>🐎 1x Celestial Grand Peco Mount (Speed +60%)</li>
                  <li>💰 50,000 Starting Zeny + 10x Fly Wings</li>
                  <li>👑 Exclusive "Pioneer of Midgard" Title</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href="https://store.steampowered.com/app/4212480/Ragnarok_The_New_World/?location=hero_banner"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all"
              >
                Wishlist on Steam Now
              </a>
              <button
                type="button"
                onClick={handleReset}
                className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
