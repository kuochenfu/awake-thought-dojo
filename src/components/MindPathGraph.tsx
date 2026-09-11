import React, { useState } from 'react';
import { MindPathNode } from '../types';
import { MIND_PATH_SCENARIOS } from '../data/featureData';
import {
  GitBranch,
  CheckCircle2,
  AlertOctagon,
  Sparkles,
  HelpCircle,
  ScissorsLineDashed,
  ArrowRight,
  RotateCcw,
  Layers,
  ChevronDown
} from 'lucide-react';

interface MindPathGraphProps {
  onCompletePath: () => void;
}

export const MindPathGraph: React.FC<MindPathGraphProps> = ({ onCompletePath }) => {
  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState(0);
  const [activeBranchId, setActiveBranchId] = useState<string | null>('hyp-2');
  const [exploredPaths, setExploredPaths] = useState<Set<string>>(new Set(['hyp-2']));
  const [hasClaimedXP, setHasClaimedXP] = useState(false);

  const currentScenario = MIND_PATH_SCENARIOS[selectedScenarioIdx];
  const rootNode = currentScenario.root;

  // 取得目前選取的分支
  const selectedBranch =
    rootNode.children?.find((c) => c.id === activeBranchId) ||
    rootNode.children?.[0];

  const handleSelectBranch = (branchId: string) => {
    setActiveBranchId(branchId);
    setExploredPaths((prev) => {
      const next = new Set(prev);
      next.add(branchId);
      if (!hasClaimedXP && next.size >= 1) {
        setHasClaimedXP(true);
        onCompletePath();
      }
      return next;
    });
  };

  const handleReset = () => {
    setActiveBranchId(rootNode.children?.[0]?.id || null);
  };

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border border-emerald-500/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3.5 bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-500/30 shrink-0">
              <GitBranch className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Interactive Decision Tree
                </span>
                <span className="text-xs text-slate-400">
                  假設演繹 • 證據樹 • 奧坎剃刀收斂
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                互動式思維路徑圖 (Decision Graph)
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                「真理不在直覺裡，而在推演分支中。」點擊不同假設分支，展開隱含前提、偏誤陷阱與奧坎剃刀評審終局！
              </p>
            </div>
          </div>

          {/* Scenario Switcher */}
          <div className="flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60 shrink-0">
            {MIND_PATH_SCENARIOS.map((sc, idx) => (
              <button
                key={sc.id}
                onClick={() => {
                  setSelectedScenarioIdx(idx);
                  setActiveBranchId(MIND_PATH_SCENARIOS[idx].root.children?.[0]?.id || null);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedScenarioIdx === idx
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                案例 {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Graph Interactive Canvas */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
        {/* Scenario Statement */}
        <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-mono text-emerald-400 font-bold">
              [ 決策十字路口情境 ]
            </div>
            <div className="text-sm md:text-base font-bold text-white">
              {currentScenario.title}
            </div>
            <p className="text-xs text-slate-300">
              {currentScenario.scenario}
            </p>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-800 rounded-lg border border-slate-700 shrink-0 self-start md:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>重設分支</span>
          </button>
        </div>

        {/* Tree Flow: Step 1: Root -> Step 2: Hypothesis Choices -> Step 3: Evolution */}
        <div className="space-y-6">
          {/* Level 1: Root Node */}
          <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-600 relative max-w-xl mx-auto text-center shadow-lg">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 mb-2">
              <Layers className="w-3 h-3" />
              <span>起點客觀事實層</span>
            </div>
            <h3 className="text-sm font-bold text-white mb-1">
              {rootNode.title}
            </h3>
            <p className="text-xs text-slate-300">
              {rootNode.description}
            </p>
          </div>

          {/* Connection Line */}
          <div className="flex justify-center">
            <div className="w-0.5 h-6 bg-slate-700" />
          </div>

          {/* Level 2: Hypothesis Branch Tabs (Horizontal Grid) */}
          <div className="space-y-2">
            <div className="text-center text-xs font-bold text-slate-400 uppercase tracking-wider">
              ▼ 請選擇一條假說分支深入推演 (Hypothesis Exploration)
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {rootNode.children?.map((branch) => {
                const isSelected = branch.id === activeBranchId;
                const isExplored = exploredPaths.has(branch.id);

                return (
                  <button
                    key={branch.id}
                    onClick={() => handleSelectBranch(branch.id)}
                    className={`text-left p-4 rounded-xl border transition-all relative ${
                      isSelected
                        ? 'bg-slate-800 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xl'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono font-bold text-emerald-400">
                        {branch.id.toUpperCase()}
                      </span>
                      {branch.assumptionCount !== undefined && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          假設數量: {branch.assumptionCount} 個
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-bold text-white mb-1">
                      {branch.title}
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {branch.description}
                    </p>

                    {branch.hiddenPremise && (
                      <div className="mt-2 pt-2 border-t border-slate-700/60 text-[11px] text-amber-300/90">
                        <span className="font-semibold">隱含前提：</span>{' '}
                        {branch.hiddenPremise}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Level 3: Deep Dive into Active Branch */}
          {selectedBranch && (
            <div className="mt-8 pt-6 border-t border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <Sparkles className="w-4 h-4" />
                <span>正在檢視：{selectedBranch.title} 之演繹路徑</span>
              </div>

              {/* Traverse Children of Branch */}
              <div className="space-y-4 pl-4 sm:pl-8 border-l-2 border-slate-800">
                {selectedBranch.children?.map((childNode) => {
                  const isBias = childNode.type === 'bias_trap';
                  const isEvidence = childNode.type === 'evidence_check';

                  return (
                    <div key={childNode.id} className="space-y-4">
                      {/* Sub-node Card */}
                      <div
                        className={`p-4 rounded-xl border ${
                          isBias
                            ? 'bg-rose-950/20 border-rose-500/40 text-rose-200'
                            : isEvidence
                            ? 'bg-blue-950/20 border-blue-500/40 text-blue-200'
                            : 'bg-slate-800/80 border-slate-700 text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {isBias && (
                            <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0" />
                          )}
                          {isEvidence && (
                            <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                          )}
                          <span className="text-xs font-bold uppercase tracking-wider">
                            {isBias ? '偵測到偏誤陷阱' : '客觀證據檢驗關卡'}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white">
                          {childNode.title}
                        </h4>
                        <p className="text-xs mt-1 leading-relaxed">
                          {childNode.description}
                        </p>
                      </div>

                      {/* Conclusion Node if exists */}
                      {childNode.children?.map((conclNode) => {
                        const isPruned = conclNode.title.includes('剃除') || conclNode.title.includes('❌');
                        return (
                          <div
                            key={conclNode.id}
                            className={`p-5 rounded-2xl border ${
                              isPruned
                                ? 'bg-amber-950/20 border-amber-500/40'
                                : 'bg-emerald-950/20 border-emerald-500/40'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <ScissorsLineDashed
                                className={`w-5 h-5 ${
                                  isPruned ? 'text-amber-400' : 'text-emerald-400'
                                }`}
                              />
                              <span
                                className={`text-xs font-extrabold uppercase ${
                                  isPruned ? 'text-amber-300' : 'text-emerald-300'
                                }`}
                              >
                                奧坎剃刀終審裁定 (Occam Verdict)
                              </span>
                            </div>
                            <h4 className="text-base font-bold text-white mb-1">
                              {conclNode.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                              {conclNode.description}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
