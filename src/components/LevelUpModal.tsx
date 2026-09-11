import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Award,
  Crown,
  ShieldCheck,
  Zap,
  Flame,
  X,
  Share2
} from 'lucide-react';

interface LevelUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  level: number;
  title: string;
  points: number;
  onViewDiagnostic?: () => void;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({
  isOpen,
  onClose,
  level,
  title,
  points,
  onViewDiagnostic
}) => {
  if (!isOpen) return null;

  const isGrandmaster = level >= 5;
  const isPhilosopher = level === 4;
  const isOccamMaster = level === 3;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl overflow-hidden">
        {/* 背景旋轉光芒（流光溢彩） */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <div className="cosmic-rays-bg" />
          <div
            className={`w-[600px] h-[600px] rounded-full blur-3xl opacity-40 animate-pulse ${
              isGrandmaster
                ? 'bg-gradient-to-tr from-amber-500 via-fuchsia-600 to-cyan-400'
                : isPhilosopher
                ? 'bg-gradient-to-tr from-purple-600 to-amber-400'
                : 'bg-gradient-to-tr from-cyan-500 to-blue-600'
            }`}
          />
        </div>

        {/* 浮動粒子效果 (Framer Motion) */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: 0,
              y: 0,
              scale: 0,
              opacity: 0
            }}
            animate={{
              x: (Math.random() - 0.5) * 500,
              y: (Math.random() - 0.5) * 500,
              scale: [0, 1.5, 0],
              opacity: [0, 0.9, 0]
            }}
            transition={{
              duration: 2.5 + Math.random() * 1.5,
              repeat: Infinity,
              ease: 'easeOut',
              delay: i * 0.2
            }}
            className={`absolute w-3 h-3 rounded-full pointer-events-none ${
              i % 3 === 0
                ? 'bg-amber-300 shadow-[0_0_12px_#fde047]'
                : i % 3 === 1
                ? 'bg-fuchsia-400 shadow-[0_0_12px_#e879f9]'
                : 'bg-cyan-300 shadow-[0_0_12px_#67e8f9]'
            }`}
          />
        ))}

        {/* 主卡片 */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 20, stiffness: 220 }}
          className={`relative w-full max-w-lg rounded-3xl p-8 text-center text-white overflow-hidden shadow-2xl border ${
            isGrandmaster
              ? 'grandmaster-badge-glow border-amber-400/80'
              : isPhilosopher
              ? 'bg-slate-900/95 master-level4-glow border-purple-500'
              : 'bg-slate-900/95 master-level3-glow border-cyan-500'
          }`}
        >
          {/* 關閉按鈕 */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* 頂部徽記 */}
          <motion.div
            initial={{ rotate: -180, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
            className="relative mx-auto w-24 h-24 mb-6 flex items-center justify-center"
          >
            <div
              className={`absolute inset-0 rounded-3xl rotate-45 opacity-80 blur-md ${
                isGrandmaster
                  ? 'bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 animate-pulse'
                  : 'bg-gradient-to-r from-cyan-400 to-blue-600'
              }`}
            />
            <div
              className={`relative w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl border ${
                isGrandmaster
                  ? 'bg-gradient-to-br from-amber-400 via-orange-500 to-purple-700 border-amber-300'
                  : 'bg-slate-800 border-slate-700'
              }`}
            >
              {isGrandmaster ? (
                <Crown className="w-11 h-11 text-amber-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]" />
              ) : isPhilosopher ? (
                <Award className="w-10 h-10 text-purple-300" />
              ) : (
                <Zap className="w-10 h-10 text-cyan-300" />
              )}
            </div>

            {/* 額外小星芒 */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-2 -right-2"
            >
              <Sparkles className="w-6 h-6 text-amber-300 fill-amber-300" />
            </motion.div>
          </motion.div>

          {/* 頭銜晉升字樣 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <span className="inline-block text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 font-mono text-amber-300 mb-2 border border-white/15">
              ✦ 心智階位全面突破 · LEVEL {level} ✦
            </span>

            <h2
              className={`text-3xl sm:text-4xl font-black tracking-tight mb-2 ${
                isGrandmaster
                  ? 'grandmaster-text-shimmer'
                  : 'bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-200 bg-clip-text text-transparent'
              }`}
            >
              {title}
            </h2>

            <p className="text-sm text-slate-300 max-w-sm mx-auto mb-6 leading-relaxed">
              {isGrandmaster
                ? '恭喜登頂思維至高境界！你已穿透一切話術、腦補與偏誤，手握奧坎剃刀與產婆之問，達成「我憑什麼相信」之絕對清醒！'
                : isPhilosopher
                ? '你已經具備穿透複雜煙幕的哲人洞見，能在紛雜嘈雜的架構爭論中直指隱含前提。'
                : isOccamMaster
                ? '你已熟練揮動奧坎剃刀，能俐落剃除所有多餘的妄念假設，回歸最簡約的真理。'
                : '恭喜完成基礎思維洗禮，正式開啟批判性思維的修行之路！'}
            </p>
          </motion.div>

          {/* 榮譽特權卡片 */}
          <div className="bg-slate-950/60 rounded-2xl p-4 border border-white/10 mb-6 text-left space-y-2.5">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>已解鎖心智權能</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2 text-slate-200 bg-white/5 p-2 rounded-xl border border-white/5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>全息流光尊爵頭銜徽章</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200 bg-white/5 p-2 rounded-xl border border-white/5">
                <Flame className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>架構火烤即時免死金牌</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200 bg-white/5 p-2 rounded-xl border border-white/5">
                <Award className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>個人體檢大師六邊形印記</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200 bg-white/5 p-2 rounded-xl border border-white/5">
                <Crown className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                <span>累積滿載 {points} 點清醒 XP</span>
              </div>
            </div>
          </div>

          {/* 底部行動按鈕 */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {onViewDiagnostic && (
              <button
                onClick={() => {
                  onClose();
                  onViewDiagnostic();
                }}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm transition-all border border-slate-700"
              >
                <Award className="w-4 h-4 text-cyan-400" />
                <span>檢視體檢證書</span>
              </button>
            )}

            <button
              onClick={onClose}
              className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-black text-sm text-slate-950 transition-all shadow-lg hover:brightness-110 active:scale-95 ${
                isGrandmaster
                  ? 'bg-gradient-to-r from-amber-300 via-orange-400 to-amber-200 shadow-amber-500/30'
                  : 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-orange-500/30'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>領取榮譽，繼續修煉</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
