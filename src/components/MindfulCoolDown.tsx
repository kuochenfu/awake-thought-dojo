import React, { useState, useEffect } from 'react';
import { Heart, X, CheckSquare, Sparkles, Shield, RotateCcw } from 'lucide-react';

interface MindfulCoolDownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MindfulCoolDown: React.FC<MindfulCoolDownProps> = ({ isOpen, onClose }) => {
  const [seconds, setSeconds] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');

  // 呼吸週期管理
  useEffect(() => {
    let interval: any = null;
    if (isOpen && isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((s) => s - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isOpen, isActive, seconds]);

  useEffect(() => {
    if (!isActive) return;
    const mod = (30 - seconds) % 8;
    if (mod < 3) {
      setBreathPhase('inhale');
    } else if (mod < 5) {
      setBreathPhase('hold');
    } else {
      setBreathPhase('exhale');
    }
  }, [seconds, isActive]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6 max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-teal-500/20 text-teal-400 rounded-2xl border border-teal-500/30">
            <Heart className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white">
              「聽看停」心智降溫室 (Stop-Look-Listen)
            </h3>
            <p className="text-xs text-slate-400">
              暫停直覺防衛 • 讓前額葉皮質（理性腦）奪回主導權
            </p>
          </div>
        </div>

        {/* Breathing Animation Circle */}
        <div className="flex flex-col items-center justify-center py-6 space-y-4">
          <div
            className={`w-36 h-36 rounded-full border-4 flex items-center justify-center transition-all duration-1000 ${
              breathPhase === 'inhale'
                ? 'scale-110 border-teal-400 bg-teal-500/20 shadow-xl shadow-teal-500/20'
                : breathPhase === 'hold'
                ? 'scale-110 border-amber-400 bg-amber-500/20'
                : 'scale-95 border-blue-400 bg-blue-500/10'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl font-black font-mono text-white">{seconds}s</div>
              <div className="text-xs font-bold uppercase tracking-wider text-teal-300 mt-1">
                {breathPhase === 'inhale' ? '深深吸氣' : breathPhase === 'hold' ? '平靜屏息' : '緩慢吐氣'}
              </div>
            </div>
          </div>

          {!isActive && seconds > 0 && (
            <button
              onClick={() => setIsActive(true)}
              className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md transition-all"
            >
              開始 30 秒深呼吸冷卻
            </button>
          )}

          {seconds === 0 && (
            <div className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>心智已回歸清醒平靜！請對照下方檢核清單：</span>
            </div>
          )}
        </div>

        {/* Five Questions Checklist */}
        <div className="space-y-3 pt-4 border-t border-slate-800">
          <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <CheckSquare className="w-4 h-4 text-teal-400" />
            <span>批判思維 • 決策前 5 問自我核對：</span>
          </div>

          <div className="space-y-2 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
              1. <span className="font-bold text-white">我現在是在「聽看停」，還是被恐慌情緒牽著走急著反對？</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
              2. <span className="font-bold text-white">「我憑什麼相信？」</span> 這段話裡哪些是可驗證的事實，哪些是我自己的腦補？
            </div>
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
              3. <span className="font-bold text-white">奧坎剃刀原則：</span> 是否存在假設更少、更單純的日常解釋？
            </div>
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
              4. <span className="font-bold text-white">蘇格拉底提問：</span> 這個決策背後最大的隱含前提是什麼？如果前提不成立會怎樣？
            </div>
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
              5. <span className="font-bold text-white">我是否真的做好準備：</span> 當新的客觀證據出現時，願意誠實修正自己？
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all"
          >
            心智就緒，返回道場
          </button>
        </div>
      </div>
    </div>
  );
};
