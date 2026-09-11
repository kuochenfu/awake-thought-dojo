import React from 'react';
import { ActiveTab, UserStats } from '../types';
import {
  Flame,
  Gamepad2,
  FileText,
  Sparkles,
  Award,
  GitBranch,
  AlertTriangle,
  Sun,
  HardDrive,
  Swords,
  Zap,
  BrainCircuit,
  Heart
} from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  userStats: UserStats;
  onOpenBackup: () => void;
  onOpenCoolDown: () => void;
  onOpenLevelUpCeremony?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  userStats,
  onOpenBackup,
  onOpenCoolDown,
  onOpenLevelUpCeremony
}) => {
  const navItems = [
    { id: 'playground' as ActiveTab, label: '基礎修煉', icon: Gamepad2 },
    { id: 'arena' as ActiveTab, label: '對辯沙盒', icon: Swords },
    { id: 'blitz' as ActiveTab, label: '閃電對決', icon: Zap },
    { id: 'mindmap' as ActiveTab, label: '思維路徑', icon: GitBranch },
    { id: 'detector' as ActiveTab, label: '錯誤偵測', icon: AlertTriangle },
    { id: 'daily' as ActiveTab, label: '每日挑戰', icon: Sun },
    { id: 'diagnostic' as ActiveTab, label: '體檢報告', icon: BrainCircuit },
    { id: 'achievements' as ActiveTab, label: '成就殿堂', icon: Award },
    { id: 'roast' as ActiveTab, label: '架構火烤', icon: Flame },
    { id: 'business' as ActiveTab, label: '商業提案', icon: FileText }
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo & Brand */}
          <div
            onClick={() => setActiveTab('playground')}
            className="flex items-center space-x-2.5 shrink-0 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-black text-lg tracking-tight bg-gradient-to-r from-amber-400 via-orange-300 to-amber-200 bg-clip-text text-transparent">
                  AWAKE
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 font-bold border border-orange-500/30">
                  思考修煉場
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden lg:block">
                批判思維 • 蘇格拉底反詰 • 奧坎剃刀 • 本地優先
              </p>
            </div>
          </div>

          {/* Navigation Tabs - Scrollable on small screens */}
          <nav className="flex items-center space-x-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 overflow-x-auto no-scrollbar max-w-[50vw] sm:max-w-none">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? item.id === 'roast'
                        ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md'
                        : item.id === 'arena'
                        ? 'bg-gradient-to-r from-red-700 to-orange-600 text-white shadow-md'
                        : 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Tools & User Status */}
          <div className="flex items-center space-x-2 shrink-0">
            {/* Mindful Cool Down Button */}
            <button
              onClick={onOpenCoolDown}
              title="聽看停心智降溫室"
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-teal-950/40 hover:bg-teal-900/60 border border-teal-500/40 text-teal-300 text-xs font-bold transition-all"
            >
              <Heart className="w-3.5 h-3.5 text-teal-400" />
              <span className="hidden md:inline">聽看停</span>
            </button>

            {/* Backup Button */}
            <button
              onClick={onOpenBackup}
              title="離線進度備份與還原"
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs transition-all"
            >
              <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden xl:inline">備份</span>
            </button>

            {/* Clarity Status & Title Badge with Iridescent Visual FX */}
            <button
              onClick={onOpenLevelUpCeremony}
              title={
                userStats.level >= 5
                  ? '✦ 清醒真理大宗師 · 點擊重溫全息流光儀式 ✦'
                  : '點擊預覽頭銜階位與流光榮譽'
              }
              className={`hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-xl border transition-all cursor-pointer group ${
                userStats.level >= 5
                  ? 'grandmaster-badge-glow border-amber-300/80 hover:scale-105'
                  : userStats.level === 4
                  ? 'bg-purple-950/40 master-level4-glow border-purple-400/80 hover:scale-105'
                  : userStats.level === 3
                  ? 'bg-cyan-950/40 master-level3-glow border-cyan-400/80 hover:scale-105'
                  : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-700/60'
              }`}
            >
              <div className="flex items-center space-x-1.5">
                {userStats.level >= 5 ? (
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin [animation-duration:6s]" />
                ) : (
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                )}
                <span
                  className={`text-xs font-black tracking-tight ${
                    userStats.level >= 5
                      ? 'grandmaster-text-shimmer'
                      : userStats.level === 4
                      ? 'text-purple-200'
                      : userStats.level === 3
                      ? 'text-cyan-200'
                      : 'text-amber-300'
                  }`}
                >
                  {userStats.title}
                </span>
                {userStats.level >= 5 && (
                  <span className="text-[10px] px-1 rounded bg-amber-400/20 text-amber-300 font-mono font-bold border border-amber-300/40">
                    MAX
                  </span>
                )}
              </div>
              <div className="h-3 w-px bg-slate-700" />
              <div className="text-xs font-mono">
                <span className="font-extrabold text-amber-300">
                  {userStats.clarityPoints}
                </span>
                <span className="text-slate-400 text-[10px] ml-0.5">XP</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
