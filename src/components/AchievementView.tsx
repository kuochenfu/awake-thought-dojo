import React from 'react';
import { Achievement, UserStats } from '../types';
import {
  Award,
  Scissors,
  HelpCircle,
  ScissorsLineDashed,
  Search,
  Sun,
  GitBranch,
  AlertTriangle,
  Lock,
  CheckCircle2,
  Sparkles,
  Zap
} from 'lucide-react';

interface AchievementViewProps {
  achievements: Achievement[];
  userStats: UserStats;
  onOpenLevelUpCeremony?: () => void;
}

export const AchievementView: React.FC<AchievementViewProps> = ({
  achievements,
  userStats,
  onOpenLevelUpCeremony
}) => {
  const unlockedCount = achievements.filter((a) => a.isUnlocked).length;
  const totalCount = achievements.length;
  const progressPercent = Math.round((unlockedCount / totalCount) * 100);
  const isGrandmaster = userStats.level >= 5;

  // 取得圖示
  const renderIcon = (iconName: string, isUnlocked: boolean) => {
    const className = `w-6 h-6 ${
      isUnlocked ? 'text-amber-400' : 'text-slate-500'
    }`;
    switch (iconName) {
      case 'Scissors':
        return <Scissors className={className} />;
      case 'HelpCircle':
        return <HelpCircle className={className} />;
      case 'ScissorsLineDashed':
        return <ScissorsLineDashed className={className} />;
      case 'Search':
        return <Search className={className} />;
      case 'Sun':
        return <Sun className={className} />;
      case 'GitBranch':
        return <GitBranch className={className} />;
      case 'AlertTriangle':
        return <AlertTriangle className={className} />;
      default:
        return <Award className={className} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-slate-900 border border-amber-500/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3.5 bg-amber-500/20 text-amber-400 rounded-2xl border border-amber-500/30 shrink-0">
              <Award className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Mind Mastery Hall
                </span>
                <span className="text-xs text-slate-400">
                  AWAKE 認知成就勳章
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                思維段位與成就解鎖殿堂
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                將抽象的「思考紀律」轉化為真實可見的肌肉記憶與榮譽圖鑑。
              </p>
            </div>
          </div>

          {/* Level Badge Card with Iridescent Visual FX */}
          <div
            className={`rounded-2xl p-5 shrink-0 min-w-[240px] border transition-all ${
              isGrandmaster
                ? 'grandmaster-badge-glow border-amber-400/90 shadow-2xl'
                : userStats.level === 4
                ? 'bg-purple-950/40 master-level4-glow border-purple-500'
                : userStats.level === 3
                ? 'bg-cyan-950/40 master-level3-glow border-cyan-500'
                : 'bg-slate-800/80 border-slate-700/80'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-slate-400">當前稱號段位</span>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded border ${
                  isGrandmaster
                    ? 'bg-amber-400/30 text-amber-200 border-amber-300 animate-pulse'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                }`}
              >
                Lv.{userStats.level}
              </span>
            </div>
            <div className="text-base font-extrabold flex items-center gap-2">
              <Sparkles
                className={`w-4 h-4 ${
                  isGrandmaster
                    ? 'text-amber-300 animate-spin [animation-duration:5s]'
                    : 'text-amber-400'
                }`}
              />
              <span
                className={
                  isGrandmaster
                    ? 'grandmaster-text-shimmer text-lg font-black'
                    : 'text-white'
                }
              >
                {userStats.title}
              </span>
            </div>

            {onOpenLevelUpCeremony && (
              <button
                onClick={onOpenLevelUpCeremony}
                className={`mt-3 w-full py-1.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 ${
                  isGrandmaster
                    ? 'bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 text-white hover:brightness-110'
                    : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {isGrandmaster ? '✦ 盛大宗師流光儀式' : '預覽階位流光儀式'}
                </span>
              </button>
            )}

            <div className="mt-3 space-y-1">
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>成就達成度</span>
                <span className="text-amber-300 font-bold">
                  {unlockedCount} / {totalCount} ({progressPercent}%)
                </span>
              </div>
              <div className="h-2 w-full bg-slate-700/80 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((ach) => {
          const isUnlocked = ach.isUnlocked;
          const current = Math.min(ach.currentCount, ach.requiredCount);
          const percent = Math.round((current / ach.requiredCount) * 100);

          return (
            <div
              key={ach.id}
              className={`rounded-2xl p-5 border transition-all relative flex flex-col justify-between ${
                isUnlocked
                  ? 'bg-slate-900/90 border-amber-500/50 shadow-lg shadow-amber-950/20'
                  : 'bg-slate-900/40 border-slate-800 opacity-80'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div
                    className={`p-3 rounded-xl border ${
                      isUnlocked
                        ? 'bg-amber-500/10 border-amber-500/30'
                        : 'bg-slate-800/60 border-slate-700/60'
                    }`}
                  >
                    {renderIcon(ach.icon, isUnlocked)}
                  </div>
                  {isUnlocked ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>已解鎖</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                      <Lock className="w-3 h-3" />
                      <span>鎖定中</span>
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-white mb-1">
                  {ach.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed min-h-[36px]">
                  {ach.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">解鎖進度</span>
                  <span
                    className={`font-mono font-semibold ${
                      isUnlocked ? 'text-amber-300' : 'text-slate-400'
                    }`}
                  >
                    {current} / {ach.requiredCount}
                  </span>
                </div>

                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      isUnlocked ? 'bg-amber-400' : 'bg-slate-600'
                    }`}
                    style={{ width: `${percent}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-slate-500">獎勵清醒值</span>
                  <span className="text-amber-400 font-bold flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    +{ach.rewardXP} XP
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
