import React, { useState, useEffect, useRef, useMemo } from 'react';
import { BlitzQuestion, StrategicIndustry } from '../types';
import { BLITZ_QUESTIONS_POOL } from '../data/featureData';
import { STRATEGIC_INDUSTRIES } from '../data/strategicIndustryData';
import {
  Zap,
  Flame,
  RotateCcw,
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  Play,
  Filter,
  ShieldCheck,
  Cpu,
  HeartPulse,
  Leaf,
  Crosshair,
  Boxes,
  Globe2,
  Sparkles
} from 'lucide-react';

interface SpeedDebunkBlitzProps {
  highScore: number;
  onFinishBlitz: (score: number) => void;
}

export const SpeedDebunkBlitz: React.FC<SpeedDebunkBlitzProps> = ({
  highScore,
  onFinishBlitz
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<StrategicIndustry | 'all'>('all');
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; hint: string } | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const timerRef = useRef<any>(null);

  // 依據篩選條件過濾題庫，並在開始時隨機洗牌
  const [shuffledQuestions, setShuffledQuestions] = useState<BlitzQuestion[]>([]);

  const filteredPool = useMemo(() => {
    if (selectedIndustry === 'all') {
      return BLITZ_QUESTIONS_POOL;
    }
    return BLITZ_QUESTIONS_POOL.filter((q) => q.industry === selectedIndustry);
  }, [selectedIndustry]);

  const questions = shuffledQuestions.length > 0 ? shuffledQuestions : filteredPool;
  const currentQ = questions[currentIdx % questions.length];

  const startGame = () => {
    // 隨機洗牌目前選定類別的題目
    const shuffled = [...filteredPool].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
    setIsPlaying(true);
    setIsGameOver(false);
    setTimeLeft(60);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setCurrentIdx(0);
    setFeedback(null);
  };

  // 計時器
  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft <= 0 && isPlaying) {
      clearInterval(timerRef.current);
      setIsPlaying(false);
      setIsGameOver(true);
      onFinishBlitz(score);
    }

    return () => clearInterval(timerRef.current);
  }, [isPlaying, timeLeft, score, onFinishBlitz]);

  const handleAnswer = (chosenType: 'fact' | 'assumption') => {
    if (!isPlaying || !currentQ) return;

    const isCorrect = chosenType === currentQ.sourceType;

    if (isCorrect) {
      const newCombo = combo + 1;
      setCombo(newCombo);
      if (newCombo > maxCombo) setMaxCombo(newCombo);
      const points = 10 * Math.min(5, Math.floor(newCombo / 2) + 1);
      setScore((s) => s + points);
      setFeedback({ isCorrect: true, hint: `正解！${currentQ.hint}` });
    } else {
      setCombo(0);
      setFeedback({ isCorrect: false, hint: `答錯！${currentQ.hint}` });
    }

    setCurrentIdx((i) => i + 1);
  };

  // 圖標對應
  const renderIndustryIcon = (iconName: string, className = 'w-3.5 h-3.5') => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className={className} />;
      case 'ShieldCheck':
        return <ShieldCheck className={className} />;
      case 'HeartPulse':
        return <HeartPulse className={className} />;
      case 'Leaf':
        return <Leaf className={className} />;
      case 'Crosshair':
        return <Crosshair className={className} />;
      case 'Boxes':
        return <Boxes className={className} />;
      default:
        return <Globe2 className={className} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-slate-900 border border-amber-500/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3.5 bg-amber-500/20 text-amber-400 rounded-2xl border border-amber-500/30 shrink-0">
              <Zap className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Speed Debunk Blitz
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1 font-semibold">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  國發會六大核心戰略產業題庫共 72 題已就緒
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                閃電思維快問快答 (Debunk Blitz)
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                職場會議與國家戰略決策沒有時間讓你慢思！在 60 秒極限倒數下快速辨析「客觀事實」與「主觀腦補」，打出思維直覺的肌肉記憶！
              </p>
            </div>
          </div>

          {/* High Score */}
          <div className="flex items-center gap-3 bg-slate-800/80 border border-slate-700/80 rounded-xl p-3 shrink-0">
            <Trophy className="w-6 h-6 text-amber-400" />
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">最高連擊紀錄</div>
              <div className="text-lg font-black text-white font-mono">{highScore} 分</div>
            </div>
          </div>
        </div>
      </div>

      {/* 產業分類篩選器 (Filter Tabs) */}
      {!isPlaying && (
        <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-4 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
              <Filter className="w-4 h-4 text-amber-400" />
              <span>產業領域練習篩選：</span>
              <span className="text-amber-400">
                （當前題庫池：{filteredPool.length} 題）
              </span>
            </div>
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              點選指定六大戰略產業或全部綜合對決
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedIndustry('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                selectedIndustry === 'all'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 scale-[1.02]'
                  : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>全部綜合 (72題)</span>
            </button>

            {STRATEGIC_INDUSTRIES.map((ind) => {
              const isSelected = selectedIndustry === ind.key;
              return (
                <button
                  key={ind.key}
                  onClick={() => setSelectedIndustry(ind.key)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/20 scale-[1.02]'
                      : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                  }`}
                  title={ind.description}
                >
                  {renderIndustryIcon(ind.iconName)}
                  <span>{ind.shortLabel} (10題)</span>
                </button>
              );
            })}
          </div>

          {/* 產業簡述提示 */}
          {selectedIndustry !== 'all' && (
            <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50 text-[11px] text-slate-300 flex items-start gap-2">
              <span className="font-bold text-amber-400 shrink-0">戰略重點：</span>
              <span>
                {STRATEGIC_INDUSTRIES.find((i) => i.key === selectedIndustry)?.description}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Main Blitz Arena */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6 text-center">
        {!isPlaying && !isGameOver && (
          <div className="py-10 space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto">
              <Zap className="w-8 h-8 animate-pulse" />
            </div>
            <h3 className="text-lg font-bold text-white">
              {selectedIndustry === 'all'
                ? '全領域極限挑戰：準備好辨析 72 題庫了嗎？'
                : `專項特訓：${
                    STRATEGIC_INDUSTRIES.find((i) => i.key === selectedIndustry)?.label
                  }`}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              您將有 60 秒時間辨別隨機飛入的言論。連對將啟動 Combo 翻倍加乘！
            </p>
            <button
              onClick={startGame}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/30 flex items-center gap-2 mx-auto transition-all"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>啟動 60 秒閃電對決</span>
            </button>
          </div>
        )}

        {isPlaying && currentQ && (
          <div className="space-y-6">
            {/* Status Bar */}
            <div className="flex flex-wrap items-center justify-between p-4 rounded-xl bg-slate-800/80 border border-slate-700 gap-2">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-400 font-mono">
                <Clock className="w-4 h-4" />
                <span>倒數計時：{timeLeft} 秒</span>
              </div>

              {/* 題目所屬產業標籤 */}
              {currentQ.industryName && (
                <div className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 text-xs font-bold flex items-center gap-1.5 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{currentQ.industryName}</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                {combo > 1 && (
                  <span className="flex items-center gap-1 text-xs font-black px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 animate-pulse">
                    <Flame className="w-3.5 h-3.5" />
                    <span>{combo} COMBO!</span>
                  </span>
                )}
                <span className="text-base font-black text-white font-mono">
                  得分: {score}
                </span>
              </div>
            </div>

            {/* Time progress line */}
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-400 transition-all duration-1000"
                style={{ width: `${(timeLeft / 60) * 100}%` }}
              />
            </div>

            {/* Statement Card */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 min-h-[170px] flex flex-col items-center justify-center relative">
              <span className="text-[10px] text-slate-500 font-bold tracking-wider uppercase mb-2">
                第 {(currentIdx % questions.length) + 1} / {questions.length} 題
              </span>
              <h3 className="text-base sm:text-xl font-bold text-white leading-relaxed max-w-2xl">
                「{currentQ.statement}」
              </h3>
            </div>

            {/* Feedback Pop */}
            {feedback && (
              <div
                className={`text-xs font-semibold p-2.5 rounded-lg border transition-all ${
                  feedback.isCorrect
                    ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                    : 'bg-rose-950/40 border-rose-500 text-rose-300'
                }`}
              >
                {feedback.hint}
              </div>
            )}

            {/* Answer Buttons */}
            <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto pt-2">
              <button
                onClick={() => handleAnswer('fact')}
                className="p-5 rounded-2xl bg-gradient-to-b from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-black text-base sm:text-lg shadow-xl shadow-blue-500/20 flex flex-col items-center gap-1 transition-all active:scale-95"
              >
                <CheckCircle2 className="w-6 h-6" />
                <span>這是【客觀事實】</span>
                <span className="text-[10px] opacity-75 font-normal">可實證度量、數據規範與驗收</span>
              </button>

              <button
                onClick={() => handleAnswer('assumption')}
                className="p-5 rounded-2xl bg-gradient-to-b from-amber-600 to-orange-700 hover:from-amber-500 hover:to-orange-600 text-white font-black text-base sm:text-lg shadow-xl shadow-orange-500/20 flex flex-col items-center gap-1 transition-all active:scale-95"
              >
                <XCircle className="w-6 h-6" />
                <span>這是【主觀腦補】</span>
                <span className="text-[10px] opacity-75 font-normal">隱含盲點、滑坡推想與情感假設</span>
              </button>
            </div>
          </div>
        )}

        {isGameOver && (
          <div className="py-8 space-y-4 max-w-md mx-auto">
            <Trophy className="w-16 h-16 text-amber-400 mx-auto animate-bounce" />
            <h3 className="text-xl font-black text-white">時間到！對決結束！</h3>
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="text-xs text-slate-400">本次戰績結算</div>
              <div className="text-3xl font-black text-amber-400 font-mono">{score} 分</div>
              <div className="text-xs text-slate-300">
                最高連續答對：<span className="text-orange-400 font-bold">{maxCombo} 次</span>
              </div>
              <div className="text-[11px] text-slate-400 pt-1">
                領域類別：
                <span className="text-amber-300 font-bold">
                  {selectedIndustry === 'all'
                    ? '全部綜合 (72題)'
                    : STRATEGIC_INDUSTRIES.find((i) => i.key === selectedIndustry)?.label}
                </span>
              </div>
            </div>
            <button
              onClick={startGame}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 mx-auto transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>再來一局挑戰極限</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
