import React, { useState } from 'react';
import { DailyChallengeItem, UserStats } from '../types';
import { DAILY_CHALLENGES } from '../data/featureData';
import {
  Sun,
  Flame,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  Sparkles,
  Calendar,
  Zap,
  ArrowRight
} from 'lucide-react';

interface DailyChallengeViewProps {
  userStats: UserStats;
  onCompleteDaily: (xpReward: number) => void;
  currentDaily?: DailyChallengeItem;
  dailyCursor?: number;
  dailyTotal?: number;
  onNextDaily?: () => void;
  onMarkSeen?: (id: string) => void;
}

export const DailyChallengeView: React.FC<DailyChallengeViewProps> = ({
  userStats,
  onCompleteDaily,
  currentDaily,
  dailyCursor = 0,
  dailyTotal = DAILY_CHALLENGES.length,
  onNextDaily,
  onMarkSeen
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [localIdx, setLocalIdx] = useState(0);

  const challenge = currentDaily || DAILY_CHALLENGES[localIdx] || DAILY_CHALLENGES[0];
  const selectedOption = challenge.options.find((o) => o.id === selectedOptionId);

  const handleSubmit = () => {
    if (!selectedOptionId) return;
    setIsSubmitted(true);
    if (selectedOption?.isOptimal) {
      onCompleteDaily(challenge.bonusXP);
    }
    if (onMarkSeen) {
      onMarkSeen(challenge.id);
    }
  };

  const handleNextChallenge = () => {
    setSelectedOptionId(null);
    setIsSubmitted(false);
    if (onNextDaily) {
      onNextDaily();
    } else {
      setLocalIdx((prev) => (prev + 1) % DAILY_CHALLENGES.length);
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-orange-950/80 via-slate-900 to-slate-900 border border-orange-500/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3.5 bg-orange-500/20 text-orange-400 rounded-2xl border border-orange-500/30 shrink-0">
              <Sun className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                  Daily Mind Workout
                </span>
                <span className="text-xs text-slate-400">
                  每日一練 • 保持心智清醒
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                每日思維挑戰 (Daily Mind Sparring)
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                「批判性思考不是與生俱來的本能，而是每天對抗直覺惰性的紀律。」今日你聽看停了嗎？
              </p>
            </div>
          </div>

          {/* Streak Counter */}
          <div className="flex items-center gap-3 bg-slate-800/80 border border-slate-700/80 rounded-xl p-3 shrink-0">
            <div className="p-2.5 rounded-lg bg-orange-500/20 text-orange-400">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                連續清醒天數 (Streak)
              </div>
              <div className="text-xl font-black text-white flex items-center gap-1.5">
                <span>{userStats.streakDays}</span>
                <span className="text-xs font-normal text-orange-400">天連勝</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Challenge Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
        {/* Scenario Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs font-bold text-orange-400">
            <Calendar className="w-4 h-4" />
            <span>{challenge.dateStr}</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300 font-normal">{challenge.tag}</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-orange-300 border border-orange-500/30 text-[11px] font-bold">
              第 {dailyCursor + 1} / {dailyTotal} 題 (隨機不重複)
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold">
            <Zap className="w-3.5 h-3.5" />
            <span>通關獎勵: +{challenge.bonusXP} XP</span>
          </div>
        </div>

        {/* Story Scenario */}
        <div className="space-y-3">
          <h3 className="text-base sm:text-lg font-bold text-white">
            {challenge.title}
          </h3>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-sm leading-relaxed">
            {challenge.scenario}
          </div>
        </div>

        {/* Core Socratic Question */}
        <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-2.5">
          <HelpCircle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm font-semibold text-slate-200">
            {challenge.question}
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {challenge.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            let optionStyle =
              'bg-slate-800/60 border-slate-700/70 hover:border-slate-600 text-slate-200';

            if (isSubmitted) {
              if (opt.isOptimal) {
                optionStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-medium';
              } else if (isSelected && !opt.isOptimal) {
                optionStyle = 'bg-rose-950/40 border-rose-500 text-rose-200';
              } else {
                optionStyle = 'opacity-50 border-slate-800 text-slate-400';
              }
            } else if (isSelected) {
              optionStyle = 'bg-orange-500/10 border-orange-500 ring-2 ring-orange-500/20 text-white';
            }

            return (
              <button
                key={opt.id}
                disabled={isSubmitted}
                onClick={() => setSelectedOptionId(opt.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 ${optionStyle}`}
              >
                <div className="mt-0.5">
                  {isSubmitted && opt.isOptimal && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {isSubmitted && isSelected && !opt.isOptimal && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                  {!isSubmitted && (
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs font-mono ${
                        isSelected
                          ? 'border-orange-500 bg-orange-500 text-white'
                          : 'border-slate-600 text-slate-400'
                      }`}
                    >
                      {opt.id.split('-')[1]}
                    </div>
                  )}
                </div>
                <div className="text-xs sm:text-sm leading-relaxed">{opt.text}</div>
              </button>
            );
          })}
        </div>

        {/* Submit or Feedback */}
        {!isSubmitted ? (
          <div className="flex justify-end pt-2">
            <button
              disabled={!selectedOptionId}
              onClick={handleSubmit}
              className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm shadow-lg shadow-orange-600/20 disabled:opacity-50 transition-all"
            >
              提交今日判斷
            </button>
          </div>
        ) : (
          <div className="mt-6 pt-6 border-t border-slate-800 space-y-4">
            <div
              className={`p-4 rounded-xl border ${
                selectedOption?.isOptimal
                  ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                  : 'bg-rose-950/20 border-rose-500/40 text-rose-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm mb-1">
                {selectedOption?.isOptimal ? (
                  <>
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>思維判斷精準！成功維持批判清醒之刃！</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-400" />
                    <span>直覺陷阱！大腦掉進了情緒或簡化歸因中！</span>
                  </>
                )}
              </div>
              <p className="text-xs leading-relaxed">{selectedOption?.explanation}</p>
            </div>

            {selectedOption && (
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 space-y-1">
                <span className="font-bold text-orange-400">💡 蘇格拉底深層洞察：</span>
                <p className="italic">{selectedOption.socraticInsight}</p>
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={handleNextChallenge}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition-all"
              >
                <span>下一題演練</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
