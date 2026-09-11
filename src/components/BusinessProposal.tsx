import React from 'react';
import { BUSINESS_BLUEPRINT } from '../data/learningData';
import {
  Target,
  Compass,
  Repeat,
  TrendingUp,
  Layers,
  Award,
  Users,
  Briefcase,
  CheckCircle2
} from 'lucide-react';

export const BusinessProposal: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/80 border border-blue-500/40 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-600/20 text-blue-400 rounded-2xl border border-blue-500/30 shrink-0">
            <Compass className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                Product & Business Blueprint
              </span>
              <span className="text-xs text-slate-400">
                AWAKE 清醒術商業模式與遊戲化架構
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              遊戲化學習平台商業需求與產品提案
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              {BUSINESS_BLUEPRINT.vision}
            </p>
          </div>
        </div>
      </div>

      {/* Target Audience & Pain Points */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {BUSINESS_BLUEPRINT.targetAudience.map((audience, idx) => (
          <div
            key={idx}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-slate-800 text-blue-400 rounded-xl">
                {idx === 0 ? (
                  <Briefcase className="w-5 h-5" />
                ) : (
                  <Users className="w-5 h-5" />
                )}
              </div>
              <div>
                <span className="text-xs font-mono text-slate-400">
                  SEGMENT #{idx + 1}
                </span>
                <h3 className="text-base font-bold text-white">
                  {audience.segment}
                </h3>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/30 text-rose-200">
                <span className="font-bold text-rose-300">核心痛點：</span>{' '}
                {audience.painPoint}
              </div>
              <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-200">
                <span className="font-bold text-emerald-300">價值主張：</span>{' '}
                {audience.valueProp}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Core Loop & Gamification Framework */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl">
            <Repeat className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">
              遊戲化核心循環（Core Gamification Loop）
            </h2>
            <p className="text-xs text-slate-400">
              將認知鍛鍊包裝成高刺激的成就回饋迴路
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BUSINESS_BLUEPRINT.coreLoop.map((step, sIdx) => (
            <div
              key={sIdx}
              className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 space-y-2 relative"
            >
              <div className="text-xs font-mono font-bold text-amber-400">
                PHASE 0{sIdx + 1}
              </div>
              <div className="text-sm font-bold text-white leading-snug">
                {step.step}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {step.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Conceptual Architecture Map */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 bg-purple-500/20 text-purple-400 rounded-xl">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">
              AWAKE 概念與遊戲化系統映射矩陣
            </h2>
            <p className="text-xs text-slate-400">
              文章理論如何精準落實為軟體功能模組
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-3 px-4">原始理論概念</th>
                <th className="py-3 px-4">本質角色</th>
                <th className="py-3 px-4">轉化遊戲機制</th>
                <th className="py-3 px-4">使用者獲取感</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              <tr>
                <td className="py-3 px-4 font-bold text-amber-300">
                  批判性思考
                </td>
                <td className="py-3 px-4">思考的精神與有紀律的判斷原則</td>
                <td className="py-3 px-4">
                  「我憑什麼相信？」驗證卡牌、動態修正加分
                </td>
                <td className="py-3 px-4 text-emerald-400">
                  破除盲從、決策底氣
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-blue-300">
                  蘇格拉底提問法
                </td>
                <td className="py-3 px-4">提問引擎，隱性轉顯性</td>
                <td className="py-3 px-4">
                  提問維度武器庫（概念釐清、證據追查、推演）
                </td>
                <td className="py-3 px-4 text-emerald-400">
                  溝通主導權、逼出真前提
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-amber-400">H15 分析法</td>
                <td className="py-3 px-4">論證拆解器，拆成零件</td>
                <td className="py-3 px-4">
                  互動句子切分刀、事實 vs 腦補拖曳歸類
                </td>
                <td className="py-3 px-4 text-emerald-400">
                  識破卸責與邏輯跳躍
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-emerald-300">
                  奧坎剃刀原則
                </td>
                <td className="py-3 px-4">解釋力相近時選擇最少假設</td>
                <td className="py-3 px-4">
                  剃刀修剪台：砍掉多餘腦補，追求最高解釋力比
                </td>
                <td className="py-3 px-4 text-emerald-400">
                  避免過度複雜化陰謀論
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-purple-300">
                  6 大認知偏誤機制
                </td>
                <td className="py-3 px-4">有限資源與心理捷徑造成的系統性偏差</td>
                <td className="py-3 px-4">
                  「思維盲點圖鑑」收集與每日情境防禦挑戰
                </td>
                <td className="py-3 px-4 text-emerald-400">
                  自我內觀敏銳度、免繳智商稅
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* North Star Metric & Milestone Roadmap */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">
              北極星指標與分階段實作路線
            </h2>
            <p className="text-xs text-slate-400">
              北極星指標：{BUSINESS_BLUEPRINT.northStarMetric}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700/70 space-y-2">
            <div className="font-bold text-amber-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Phase 1: 核心玩法 MVP (當前階段)</span>
            </div>
            <p className="text-slate-300">
              全端 TypeScript 原型，內建四大經典遊戲模組與零延遲規則引擎，完成心流與商業假說驗證。
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700/70 space-y-2">
            <div className="font-bold text-blue-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              <span>Phase 2: 異步 AI 教練覆盤</span>
            </div>
            <p className="text-slate-300">
              串接 Gemini 2.5 進行使用者自定義場景論證拆解與提問點評，提供長篇認知健康度報告。
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700/70 space-y-2">
            <div className="font-bold text-purple-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
              <span>Phase 3: B2B 團隊思維熱力圖</span>
            </div>
            <p className="text-slate-300">
              企業級多租戶、團隊共鳴討論室、週會決策結構化輔助外掛，解鎖高客單價企業 SaaS。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
