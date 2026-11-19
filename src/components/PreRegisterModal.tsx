import React, { useState } from 'react';
import { X, CheckCircle2, Gift, Ticket, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SupportedLanguage } from '../utils/trackingAndLocale';

interface PreRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeLanguage: SupportedLanguage;
}

export const PreRegisterModal: React.FC<PreRegisterModalProps> = ({
  isOpen,
  onClose,
  activeLanguage,
}) => {
  const [email, setEmail] = useState('');
  const [platform, setPlatform] = useState<'steam' | 'pc'>('steam');
  const [region, setRegion] = useState('SEA / Asia');
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

  const texts: Record<
    SupportedLanguage,
    {
      title: string;
      subtitle: string;
      milestoneTitle: string;
      unlockedLabel: string;
      submitBtn: string;
      emailLabel: string;
      platformLabel: string;
      steamOption: string;
      pcOption: string;
      regionLabel: string;
      disclaimer: string;
      successTitle: string;
      successSubtitle: string;
      passTitle: string;
      passLabel: string;
      regEmailLabel: string;
      platformShort: string;
      clusterLabel: string;
      rewardsIncluded: string;
      ctaBtn: string;
      doneBtn: string;
      closeLabel: string;
      milestones: { target: string; reward: string }[];
      rewardList: string[];
    }
  > = {
    en: {
      title: 'Pre-Register for Midgard PC Launch',
      subtitle: 'Join over 1,248,930 adventurers on Windows PC via Steam and unlock milestone starter rewards.',
      milestoneTitle: 'Milestone Progress (100% Unlocked)',
      unlockedLabel: 'Unlocked',
      submitBtn: 'Claim Launch Starter Pack',
      emailLabel: 'Adventurer Email Address *',
      platformLabel: 'Gaming Platform',
      steamOption: 'Windows PC via Steam (Recommended)',
      pcOption: 'Gravity Launcher PC',
      regionLabel: 'Preferred Server Region',
      disclaimer: 'Free-to-Play (optional in-game purchases / gacha). Gravity Account required via launcher.',
      successTitle: 'Pre-Registration Confirmed!',
      successSubtitle: 'Your Midgard Adventurer Passport has been officially issued.',
      passTitle: 'MIDGARD ADVENTURER PASS',
      passLabel: 'Passport No.',
      regEmailLabel: 'Registered Email',
      platformShort: 'Platform',
      clusterLabel: 'Cluster',
      rewardsIncluded: 'Your Rewards Included:',
      ctaBtn: 'Download & Play on Steam',
      doneBtn: 'Done',
      closeLabel: 'Close Modal',
      milestones: [
        { target: '100K', reward: '50,000 Zeny + 10 Fly Wings' },
        { target: '250K', reward: 'Exclusive "Pioneer" Title' },
        { target: '500K', reward: 'Giant Poring Hat' },
        { target: '1.0M', reward: 'Grand Peco Mount' },
      ],
      rewardList: [
        '✨ 1x Animated Giant Pink Poring Headgear',
        '🐎 1x Celestial Grand Peco Mount',
        '💰 50,000 Starting Zeny + 10x Fly Wings',
        '👑 Exclusive "Pioneer of Midgard" Title',
      ],
    },
    id: {
      title: 'Pra-Registrasi Peluncuran PC Midgard',
      subtitle: 'Bergabung bersama lebih dari 1.248.930 petualang di PC Windows via Steam dan buka semua hadiah milestone.',
      milestoneTitle: 'Progres Milestone (100% Terbuka)',
      unlockedLabel: 'Terbuka',
      submitBtn: 'Klaim Paket Awal Peluncuran',
      emailLabel: 'Alamat Email Petualang *',
      platformLabel: 'Platform Game',
      steamOption: 'PC Windows via Steam (Disarankan)',
      pcOption: 'PC Gravity Launcher',
      regionLabel: 'Wilayah Server Pilihan',
      disclaimer: 'Free-to-Play (pembelian dalam game / gacha opsional). Akun Gravity diperlukan melalui launcher.',
      successTitle: 'Pra-Registrasi Dikonfirmasi!',
      successSubtitle: 'Paspor Petualang Midgard milikmu telah resmi diterbitkan.',
      passTitle: 'PASPOR PETUALANG MIDGARD',
      passLabel: 'No. Paspor',
      regEmailLabel: 'Email Terdaftar',
      platformShort: 'Platform',
      clusterLabel: 'Wilayah',
      rewardsIncluded: 'Hadiah yang Kamu Dapatkan:',
      ctaBtn: 'Unduh & Main di Steam',
      doneBtn: 'Selesai',
      closeLabel: 'Tutup Jendela',
      milestones: [
        { target: '100K', reward: '50.000 Zeny + 10 Fly Wing' },
        { target: '250K', reward: 'Gelar Eksklusif "Pioneer"' },
        { target: '500K', reward: 'Topi Poring Raksasa' },
        { target: '1.0M', reward: 'Mount Grand Peco' },
      ],
      rewardList: [
        '✨ 1x Topi Poring Merah Muda Raksasa Beranimasi',
        '🐎 1x Mount Celestial Grand Peco',
        '💰 50.000 Zeny Awal + 10x Fly Wing',
        '👑 Gelar Eksklusif "Pioneer of Midgard"',
      ],
    },
    th: {
      title: 'ลงทะเบียนล่วงหน้าสำหรับเปิดตัว PC Midgard',
      subtitle: 'เข้าร่วมกับนักผจญภัยกว่า 1,248,930 คนบน Windows PC ผ่าน Steam เพื่อปลดล็อกของรางวัลครบทุกระดับ',
      milestoneTitle: 'ความคืบหน้าเป้าหมาย (ปลดล็อก 100%)',
      unlockedLabel: 'ปลดล็อกแล้ว',
      submitBtn: 'รับแพ็กเริ่มต้นวันเปิดตัว',
      emailLabel: 'อีเมลนักผจญภัย *',
      platformLabel: 'แพลตฟอร์มการเล่น',
      steamOption: 'Windows PC ผ่าน Steam (แนะนำ)',
      pcOption: 'PC Gravity Launcher',
      regionLabel: 'ภูมิภาคเซิร์ฟเวอร์ที่ต้องการ',
      disclaimer: 'เล่นฟรี (มีการซื้อในเกม / กาชาแบบเลือกได้) และต้องเข้าสู่ระบบบัญชี Gravity ผ่านตัวเปิดเกม',
      successTitle: 'ยืนยันการลงทะเบียนล่วงหน้าแล้ว!',
      successSubtitle: 'พาสปอร์ตนักผจญภัย Midgard ของคุณออกให้เรียบร้อยแล้ว',
      passTitle: 'พาสปอร์ตนักผจญภัย MIDGARD',
      passLabel: 'หมายเลขพาสปอร์ต',
      regEmailLabel: 'อีเมลที่ลงทะเบียน',
      platformShort: 'แพลตฟอร์ม',
      clusterLabel: 'ภูมิภาค',
      rewardsIncluded: 'รางวัลที่รวมอยู่ด้วย:',
      ctaBtn: 'ดาวน์โหลดและเล่นบน Steam',
      doneBtn: 'เสร็จสิ้น',
      closeLabel: 'ปิดหน้าต่าง',
      milestones: [
        { target: '100K', reward: '50,000 Zeny + 10 Fly Wing' },
        { target: '250K', reward: 'ฉายาพิเศษ "Pioneer"' },
        { target: '500K', reward: 'หมวก Poring ยักษ์' },
        { target: '1.0M', reward: 'สัตว์ขี่ Grand Peco' },
      ],
      rewardList: [
        '✨ 1x หมวก Poring สีชมพูยักษ์แบบขยับได้',
        '🐎 1x สัตว์ขี่ Celestial Grand Peco',
        '💰 50,000 Zeny เริ่มต้น + 10x Fly Wing',
        '👑 ฉายาพิเศษ "Pioneer of Midgard"',
      ],
    },
    zh: {
      title: '米德加尔特 PC 上线预约',
      subtitle: '加入超过 1,248,930 名 Windows PC（Steam）冒险者，解锁全部预约里程碑开服好礼。',
      milestoneTitle: '里程碑进度（已 100% 解锁）',
      unlockedLabel: '已解锁',
      submitBtn: '领取开服新手礼包',
      emailLabel: '冒险者电子邮箱 *',
      platformLabel: '游玩平台',
      steamOption: 'Windows PC（经由 Steam 推荐）',
      pcOption: 'Gravity 启动器 PC 版',
      regionLabel: '首选服务器大区',
      disclaimer: '免费游玩（含可选内购 / 扭蛋机制），通过启动器登录需使用 Gravity 账号。',
      successTitle: '预约已确认！',
      successSubtitle: '你的米德加尔特冒险者通行证已正式签发。',
      passTitle: '米德加尔特冒险者通行证',
      passLabel: '通行证编号',
      regEmailLabel: '绑定邮箱',
      platformShort: '平台',
      clusterLabel: '服务器大区',
      rewardsIncluded: '包含以下开服奖励：',
      ctaBtn: '前往 Steam 免费下载游玩',
      doneBtn: '完成',
      closeLabel: '关闭弹窗',
      milestones: [
        { target: '100K', reward: '50,000 Zeny + 10 苍蝇翅膀' },
        { target: '250K', reward: '专属“开拓者”称号' },
        { target: '500K', reward: '巨型波利头饰' },
        { target: '1.0M', reward: '大嘴鸟坐骑' },
      ],
      rewardList: [
        '✨ 1x 动态巨型粉色波利头饰',
        '🐎 1x 圣光大嘴鸟坐骑',
        '💰 50,000 初始 Zeny + 10x 苍蝇翅膀',
        '👑 限定“米德加尔特开拓者”称号',
      ],
    },
  };

  const t = texts[activeLanguage] || texts.en;

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
          aria-label={t.closeLabel}
          className="absolute top-5 right-5 p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 flex items-center justify-center">
                <Gift className="w-5 h-5" />
              </div>
              <h3 className="font-cinzel text-xl sm:text-2xl font-black text-white">{t.title}</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mb-6">{t.subtitle}</p>

            {/* Milestones Progress Bar */}
            <div className="mb-6 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-2">
                <span>{t.milestoneTitle}</span>
                <span className="text-amber-400">1.2M+ / 1.0M</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden mb-3">
                <div className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full w-full" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {t.milestones.map((m, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-900/80 p-2 rounded-lg border border-slate-800 text-[11px] text-center"
                  >
                    <div className="font-mono font-bold text-amber-400">{m.target}</div>
                    <div className="text-[10px] text-slate-300 truncate mt-0.5">{m.reward}</div>
                    <div className="mt-1 text-[9px] text-emerald-400 font-bold uppercase flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> {t.unlockedLabel}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">{t.emailLabel}</label>
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
                  <label className="block text-slate-300 font-semibold mb-1">{t.platformLabel}</label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value as 'steam' | 'pc')}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="steam">{t.steamOption}</option>
                    <option value="pc">{t.pcOption}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">{t.regionLabel}</label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="SEA / Asia">SEA / Asia-Pacific</option>
                    <option value="Europe & Global">Europe & Global</option>
                    <option value="North America">North America</option>
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

              <p className="text-[11px] text-slate-400 text-center">{t.disclaimer}</p>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8" />
            </div>

            <h3 className="font-cinzel text-2xl font-black text-white mb-1">{t.successTitle}</h3>
            <p className="text-xs text-slate-300 mb-6">{t.successSubtitle}</p>

            <div className="bg-gradient-to-br from-slate-950 to-slate-900 border-2 border-amber-400/60 rounded-2xl p-5 mb-6 text-left relative overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <Ticket className="w-4 h-4 text-amber-400" />
                  <span className="font-cinzel text-xs font-bold text-white tracking-wider">{t.passTitle}</span>
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
                  <span className="text-slate-400 block text-[10px]">{t.regEmailLabel}</span>
                  <span className="font-mono text-white truncate block">{email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">{t.platformShort}</span>
                  <span className="font-semibold text-slate-200 uppercase">{platform}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">{t.clusterLabel}</span>
                  <span className="font-semibold text-slate-200">{region}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 text-xs">
                <span className="font-bold text-amber-400 block mb-1">{t.rewardsIncluded}</span>
                <ul className="text-[11px] text-slate-300 space-y-0.5">
                  {t.rewardList.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href="#go2offer#"
                className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all"
              >
                {t.ctaBtn}
              </a>
              <button
                type="button"
                onClick={handleReset}
                className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
              >
                {t.doneBtn}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
