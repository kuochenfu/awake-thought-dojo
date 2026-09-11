import React, { useState } from 'react';
import { ARCHITECTURE_ROAST_TOPICS } from '../data/learningData';
import {
  Flame,
  AlertOctagon,
  ShieldCheck,
  Code,
  Terminal,
  Zap,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

export const ArchitectureRoast: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState(
    ARCHITECTURE_ROAST_TOPICS[0].id
  );
  const [activeCodeTab, setActiveCodeTab] = useState<'bad' | 'good'>('bad');

  const currentTopic =
    ARCHITECTURE_ROAST_TOPICS.find((t) => t.id === selectedTopicId) ||
    ARCHITECTURE_ROAST_TOPICS[0];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-950/80 via-slate-900 to-slate-900 border border-red-500/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-start gap-4">
          <div className="p-3 bg-red-600/20 text-red-400 rounded-2xl border border-red-500/30 shrink-0">
            <Flame className="w-8 h-8 animate-pulse" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                Pre-Implementation Technical Grill
              </span>
              <span className="text-xs text-slate-400">
                火烤架構 • 拒絕天真幻想
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              全端技術架構深度火烤與攻防評審
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              「先問我憑什麼相信這套架構能跑起來？」在寫下每一行業務程式碼之前，先用批判性思維火烤我們前後端使用
              TypeScript、AI 評判、狀態同步與內容擴展時的五大致命暗礁。
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar Topics + Detailed Roast Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Topic Selector (4 cols) */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
            火烤議題索引 (5 大攻防點)
          </div>

          <div className="space-y-2">
            {ARCHITECTURE_ROAST_TOPICS.map((topic, idx) => {
              const isSelected = topic.id === selectedTopicId;
              const severityColor =
                topic.severity === 'CRITICAL'
                  ? 'text-red-400 border-red-500/40 bg-red-950/30'
                  : topic.severity === 'HIGH'
                  ? 'text-orange-400 border-orange-500/40 bg-orange-950/30'
                  : 'text-amber-400 border-amber-500/40 bg-amber-950/30';

              return (
                <button
                  key={topic.id}
                  onClick={() => {
                    setSelectedTopicId(topic.id);
                    setActiveCodeTab('bad');
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-slate-800 border-red-500/80 shadow-lg shadow-red-950/30'
                      : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-mono text-slate-400">
                      #0{idx + 1}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border ${severityColor}`}
                    >
                      {topic.severity}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-white leading-tight">
                    {topic.title}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                    {topic.subTitle}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Architecture Radar Checklist */}
          <div className="mt-4 p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
            <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>架構健檢通過準則</span>
            </div>
            <ul className="text-[11px] text-slate-400 space-y-1.5">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>所有 API 邊界必備 Zod 運行期驗證</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>核心遊戲循環反饋延遲 &lt; 100ms</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>得分與徽章伺服端權威計算 (Server-Auth)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>AI 動態生題需過一致性測試防幻覺</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Detail Pane (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
          {/* Topic Title & Severity */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-red-400">
                  CRITICAL REVIEW
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-300">
                  {currentTopic.subTitle}
                </span>
              </div>
              <h2 className="text-xl font-black text-white">
                {currentTopic.title}
              </h2>
            </div>
            <span
              className={`text-xs font-extrabold px-3 py-1 rounded-lg border self-start sm:self-auto ${
                currentTopic.severity === 'CRITICAL'
                  ? 'bg-red-500/20 text-red-300 border-red-500/40'
                  : 'bg-orange-500/20 text-orange-300 border-orange-500/40'
              }`}
            >
              嚴重級別：{currentTopic.severity}
            </span>
          </div>

          {/* Contrast 1: The Naive Hypothesis */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <HelpCircle className="w-4 h-4" />
              <span>普遍的天真設想 (The Naive Hypothesis)</span>
            </div>
            <p className="text-sm text-slate-300 italic pl-6">
              {currentTopic.theHypothesis}
            </p>
          </div>

          {/* Contrast 2: The Brutal Roast */}
          <div className="bg-red-950/20 border border-red-500/40 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-red-400">
              <Flame className="w-4 h-4" />
              <span>毒舌火烤與致命痛點 (The Brutal Roast)</span>
            </div>
            <p className="text-xs sm:text-sm text-red-200/90 leading-relaxed pl-6 whitespace-pre-line">
              {currentTopic.theRoast}
            </p>
          </div>

          {/* Contrast 3: The Architectural Prescription */}
          <div className="bg-emerald-950/20 border border-emerald-500/40 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>架構攻防處方箋 (The Architectural Prescription)</span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed pl-6 whitespace-pre-line">
              {currentTopic.thePrescription}
            </p>
          </div>

          {/* Code Snippets if available */}
          {currentTopic.codeSnippets && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                  <Code className="w-4 h-4 text-blue-400" />
                  <span>程式碼架構對比 (Code Contrast)</span>
                </div>
                <div className="flex items-center space-x-1 bg-slate-800 p-1 rounded-lg border border-slate-700">
                  <button
                    onClick={() => setActiveCodeTab('bad')}
                    className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                      activeCodeTab === 'bad'
                        ? 'bg-red-600 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    ❌ 翻車天真代碼
                  </button>
                  <button
                    onClick={() => setActiveCodeTab('good')}
                    className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                      activeCodeTab === 'good'
                        ? 'bg-emerald-600 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    ✅ 嚴謹防禦代碼
                  </button>
                </div>
              </div>

              <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs overflow-x-auto text-slate-300">
                <pre>
                  <code>
                    {activeCodeTab === 'bad'
                      ? currentTopic.codeSnippets.bad
                      : currentTopic.codeSnippets.good}
                  </code>
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
