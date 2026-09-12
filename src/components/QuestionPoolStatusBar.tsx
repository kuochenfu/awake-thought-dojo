import React from 'react';
import {
  Sparkles,
  Shuffle,
  RotateCcw,
  CheckCircle2,
  Database,
  Flame,
  Zap,
  HelpCircle,
  ScissorsLineDashed,
  Search,
  Scissors
} from 'lucide-react';
import { SeenQuestionsState } from '../hooks/useQuestionEngine';

interface QuestionPoolStatusBarProps {
  bankStats: {
    totalGrand: number;
    totalBlitz: number;
    totalH15: number;
    totalSocratic: number;
    totalOccam: number;
    totalBias: number;
    totalDaily: number;
    totalArena: number;
    totalSnippets: number;
    seenCounts: {
      h15: number;
      socratic: number;
      occam: number;
      bias: number;
      blitz: number;
      daily: number;
      arena: number;
    };
  };
  onResetHistory: () => void;
  className?: string;
}

export const QuestionPoolStatusBar: React.FC<QuestionPoolStatusBarProps> = ({
  bankStats,
  onResetHistory,
  className = ''
}) => {
  const totalCompleted =
    bankStats.seenCounts.h15 +
    bankStats.seenCounts.socratic +
    bankStats.seenCounts.occam +
    bankStats.seenCounts.bias +
    bankStats.seenCounts.blitz +
    bankStats.seenCounts.daily +
    bankStats.seenCounts.arena;

  const completionPercentage = Math.min(
    100,
    Math.round((totalCompleted / bankStats.totalGrand) * 100)
  );

  return (
    <div
      className={`p-3.5 sm:p-4 rounded-xl bg-slate-900/90 border border-slate-700/80 shadow-lg text-slate-200 backdrop-blur-sm ${className}`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Global Pool Stats */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold shadow-sm">
            <Database className="w-3.5 h-3.5 text-amber-400" />
            <span>全域題庫總量：{bankStats.totalGrand} 題</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-950/70 text-cyan-300 border border-cyan-500/40 text-xs font-semibold">
            <Shuffle className="w-3.5 h-3.5 text-cyan-400" />
            <span>全遊戲均勻隨機分佈 • 零重複循環</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-950/70 text-purple-300 border border-purple-500/40 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
            <span>已修煉累計：{totalCompleted} 題 ({completionPercentage}%)</span>
          </div>
        </div>

        {/* Right: Category Badges & Reset */}
        <div className="flex items-center gap-2 justify-between md:justify-end">
          {/* Quick Stats Badges */}
          <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-slate-400">
            <span title="H15 拆解刀" className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
              H15: {bankStats.seenCounts.h15}/{bankStats.totalH15}
            </span>
            <span title="蘇格拉底反詰" className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
              蘇格拉底: {bankStats.seenCounts.socratic}/{bankStats.totalSocratic}
            </span>
            <span title="奧坎剃刀" className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
              奧坎: {bankStats.seenCounts.occam}/{bankStats.totalOccam}
            </span>
            <span title="偏誤機制" className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
              偏誤: {bankStats.seenCounts.bias}/{bankStats.totalBias}
            </span>
            <span title="閃電對決" className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
              閃電: {bankStats.seenCounts.blitz}/{bankStats.totalBlitz}
            </span>
          </div>

          <button
            onClick={() => {
              if (window.confirm('確定要將所有遊戲題庫的已出題紀錄重置，重新開始全新洗牌輪替嗎？')) {
                onResetHistory();
              }
            }}
            title="重置作答進度，將所有題庫重新洗牌發放"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs transition-all active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>重置題庫洗牌</span>
          </button>
        </div>
      </div>

      {/* Mini Progress Bar */}
      <div className="mt-2.5 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500 transition-all duration-500"
          style={{ width: `${Math.max(3, completionPercentage)}%` }}
        />
      </div>
    </div>
  );
};
