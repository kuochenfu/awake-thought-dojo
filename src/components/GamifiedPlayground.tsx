import React, { useState } from 'react';
import {
  GameModuleType,
  UserStats
} from '../types';
import {
  H15_CHALLENGES,
  SOCRATIC_CHALLENGES,
  OCCAM_CHALLENGES,
  BIAS_SCENARIOS,
  BIAS_MECHANISMS
} from '../data/learningData';
import {
  Scissors,
  HelpCircle,
  ScissorsLineDashed,
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Sparkles
} from 'lucide-react';

interface GamifiedPlaygroundProps {
  userStats: UserStats;
  onUpdateStats: (pointsDelta: number, module: GameModuleType) => void;
}

export const GamifiedPlayground: React.FC<GamifiedPlaygroundProps> = ({
  userStats,
  onUpdateStats
}) => {
  const [currentModule, setCurrentModule] = useState<GameModuleType>('h15');

  // H15 state
  const [h15Index, setH15Index] = useState(0);
  const [h15UserAnswers, setH15UserAnswers] = useState<Record<string, 'fact' | 'assumption'>>({});
  const [h15Submitted, setH15Submitted] = useState(false);

  // Socratic state
  const [socraticIndex, setSocraticIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  // Occam state
  const [occamIndex, setOccamIndex] = useState(0);
  const [selectedHypothesisId, setSelectedHypothesisId] = useState<string | null>(null);

  // Bias state
  const [biasIndex, setBiasIndex] = useState(0);
  const [selectedMechanismId, setSelectedMechanismId] = useState<string | null>(null);
  const [biasSubmitted, setBiasSubmitted] = useState(false);

  const activeH15 = H15_CHALLENGES[h15Index % H15_CHALLENGES.length];
  const activeSocratic = SOCRATIC_CHALLENGES[socraticIndex % SOCRATIC_CHALLENGES.length];
  const activeOccam = OCCAM_CHALLENGES[occamIndex % OCCAM_CHALLENGES.length];
  const activeBias = BIAS_SCENARIOS[biasIndex % BIAS_SCENARIOS.length];

  // H15 Submit Handler
  const handleH15Submit = () => {
    if (Object.keys(h15UserAnswers).length < activeH15.parts.length) return;
    setH15Submitted(true);
    let correctCount = 0;
    activeH15.parts.forEach((p) => {
      if (h15UserAnswers[p.id] === p.type) correctCount++;
    });
    const pts = correctCount * 25;
    onUpdateStats(pts, 'h15');
  };

  const nextH15 = () => {
    setH15Index((prev) => prev + 1);
    setH15UserAnswers({});
    setH15Submitted(false);
  };

  // Socratic Handler
  const handleSelectSocraticOption = (optionId: string) => {
    setSelectedOptionId(optionId);
    const chosen = activeSocratic.options.find((o) => o.id === optionId);
    if (chosen) {
      onUpdateStats(chosen.clarityBonus, 'socrates');
    }
  };

  const nextSocratic = () => {
    setSocraticIndex((prev) => prev + 1);
    setSelectedOptionId(null);
  };

  // Occam Handler
  const handleSelectOccam = (hypoId: string) => {
    setSelectedHypothesisId(hypoId);
    const hyp = activeOccam.hypotheses.find((h) => h.id === hypoId);
    if (hyp && hyp.isOccamBest) {
      onUpdateStats(50, 'occam');
    } else {
      onUpdateStats(10, 'occam');
    }
  };

  const nextOccam = () => {
    setOccamIndex((prev) => prev + 1);
    setSelectedHypothesisId(null);
  };

  // Bias Handler
  const handleSelectBias = (mechId: string) => {
    if (biasSubmitted) return;
    setSelectedMechanismId(mechId);
    setBiasSubmitted(true);
    if (mechId === activeBias.correctMechanismId) {
      onUpdateStats(50, 'bias');
    } else {
      onUpdateStats(15, 'bias');
    }
  };

  const nextBias = () => {
    setBiasIndex((prev) => prev + 1);
    setSelectedMechanismId(null);
    setBiasSubmitted(false);
  };

  return (
    <div className="space-y-6">
      {/* Module Selector Hero */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 sm:p-6 shadow-xl backdrop-blur-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                AWAKE 思維武器庫
              </span>
              <span className="text-xs text-slate-400">
                提問把隱性變顯性 • 拆解去腦補
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              批判性思考實戰道場
            </h1>
            <p className="text-sm text-slate-300 mt-1">
              「先問我憑什麼相信，在證據改變時修正自己。」體驗四大思維工具的互動反饋：
            </p>
          </div>

          {/* Module Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              id="module-btn-h15"
              onClick={() => setCurrentModule('h15')}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                currentModule === 'h15'
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md shadow-amber-500/10'
                  : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Scissors className="w-4 h-4 text-amber-400 shrink-0" />
              <div className="text-left">
                <div className="font-bold">H15 拆解器</div>
                <div className="text-[10px] text-slate-400">拆零件破腦補</div>
              </div>
            </button>

            <button
              id="module-btn-socrates"
              onClick={() => setCurrentModule('socrates')}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                currentModule === 'socrates'
                  ? 'bg-blue-500/20 border-blue-500 text-blue-300 shadow-md shadow-blue-500/10'
                  : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-blue-400 shrink-0" />
              <div className="text-left">
                <div className="font-bold">蘇格拉底提問</div>
                <div className="text-[10px] text-slate-400">逼出隱性前提</div>
              </div>
            </button>

            <button
              id="module-btn-occam"
              onClick={() => setCurrentModule('occam')}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                currentModule === 'occam'
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/10'
                  : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              <ScissorsLineDashed className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="text-left">
                <div className="font-bold">奧坎剃刀台</div>
                <div className="text-[10px] text-slate-400">砍冗餘假設</div>
              </div>
            </button>

            <button
              id="module-btn-bias"
              onClick={() => setCurrentModule('bias')}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                currentModule === 'bias'
                  ? 'bg-purple-500/20 border-purple-500 text-purple-300 shadow-md shadow-purple-500/10'
                  : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Search className="w-4 h-4 text-purple-400 shrink-0" />
              <div className="text-left">
                <div className="font-bold">偏誤偵探社</div>
                <div className="text-[10px] text-slate-400">抓 6 大機制</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage */}
      {currentModule === 'h15' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl">
                <Scissors className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>H15 論證拆解刀：零件檢驗</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-amber-500/30 font-normal">
                    第 {h15Index + 1} 題
                  </span>
                </h2>
                <p className="text-xs text-slate-400">
                  真正在做的事：把一句看起來很順的話拆成零件，看哪裡成立、哪裡只是腦補！
                </p>
              </div>
            </div>
            <button
              onClick={nextH15}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-300 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 transition-all border border-slate-700/60"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>換一題</span>
            </button>
          </div>

          {/* Context & Original Statement */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              [ 遭遇場景 ] {activeH15.context}
            </div>
            <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-4 text-slate-200 text-sm md:text-base font-medium leading-relaxed">
              「{activeH15.statement}」
            </div>
          </div>

          {/* Parts Dissection Workbench */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-amber-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>請替每個拆解零件標記屬性：</span>
              </div>
              <span className="text-xs text-slate-400">
                已標記: {Object.keys(h15UserAnswers).length} / {activeH15.parts.length}
              </span>
            </div>

            <div className="grid gap-3">
              {activeH15.parts.map((part, pIdx) => {
                const answer = h15UserAnswers[part.id];
                const isSubmitted = h15Submitted;
                const isCorrect = answer === part.type;

                return (
                  <div
                    key={part.id}
                    className={`p-4 rounded-xl border transition-all ${
                      isSubmitted
                        ? isCorrect
                          ? 'bg-emerald-950/30 border-emerald-500/50'
                          : 'bg-rose-950/30 border-rose-500/50'
                        : answer
                        ? 'bg-slate-800/90 border-slate-600'
                        : 'bg-slate-800/50 border-slate-700/50'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                            零件 #{pIdx + 1}
                          </span>
                          <span className="text-sm font-semibold text-white">
                            {part.text}
                          </span>
                        </div>
                      </div>

                      {/* Choice Buttons */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          disabled={isSubmitted}
                          onClick={() =>
                            setH15UserAnswers((prev) => ({
                              ...prev,
                              [part.id]: 'fact'
                            }))
                          }
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                            answer === 'fact'
                              ? 'bg-blue-600 border-blue-500 text-white shadow'
                              : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                          } ${isSubmitted ? 'cursor-not-allowed opacity-80' : ''}`}
                        >
                          客觀成立事實
                        </button>
                        <button
                          disabled={isSubmitted}
                          onClick={() =>
                            setH15UserAnswers((prev) => ({
                              ...prev,
                              [part.id]: 'assumption'
                            }))
                          }
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                            answer === 'assumption'
                              ? 'bg-orange-600 border-orange-500 text-white shadow'
                              : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                          } ${isSubmitted ? 'cursor-not-allowed opacity-80' : ''}`}
                        >
                          隱含腦補假設
                        </button>
                      </div>
                    </div>

                    {/* Feedback After Submit */}
                    {isSubmitted && (
                      <div className="mt-3 pt-3 border-t border-slate-700/60 flex items-start gap-2 text-xs">
                        {isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <span
                            className={`font-semibold ${
                              isCorrect ? 'text-emerald-300' : 'text-rose-300'
                            }`}
                          >
                            正解：{part.type === 'fact' ? '客觀成立事實' : '隱含腦補假設'} —{' '}
                          </span>
                          <span className="text-slate-300">{part.explanation}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Bar */}
          {!h15Submitted ? (
            <div className="flex justify-end">
              <button
                id="btn-h15-submit"
                disabled={Object.keys(h15UserAnswers).length < activeH15.parts.length}
                onClick={handleH15Submit}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-sm shadow-lg shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <span>執行 H15 刀刃審查</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="bg-amber-950/30 border border-amber-500/40 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-200">
                  <div className="font-bold text-amber-300 mb-0.5">AWAKE 核心心法：</div>
                  {activeH15.keyTakeaway}
                </div>
              </div>
              <button
                onClick={nextH15}
                className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-all"
              >
                <span>下一關挑戰</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Socratic Module */}
      {currentModule === 'socrates' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-xl">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>蘇格拉底提問引擎：隱性轉顯性</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-blue-300 border border-blue-500/30 font-normal">
                    第 {socraticIndex + 1} 題
                  </span>
                </h2>
                <p className="text-xs text-slate-400">
                  用有結構的提問，把隱性思考逼出來，而不是挑毛病或情緒反對！
                </p>
              </div>
            </div>
            <button
              onClick={nextSocratic}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-300 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 transition-all border border-slate-700/60"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>換一題</span>
            </button>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              [ 對方提出的主張 ]
            </div>
            <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-4 text-slate-200 text-sm md:text-base font-semibold leading-relaxed">
              「{activeSocratic.statement}」
            </div>
            <div className="p-3 bg-slate-800/40 border border-dashed border-slate-700 rounded-lg text-xs text-slate-400">
              <span className="text-blue-300 font-semibold">對方的隱性盲盒：</span>{' '}
              {activeSocratic.hiddenPremise}
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-bold text-blue-400">
              作為批判性思考者，你要祭出哪一把「蘇格拉底提問武器」？
            </div>

            <div className="grid gap-3">
              {activeSocratic.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                const isMaster = opt.effectiveness === 'master';

                return (
                  <button
                    key={opt.id}
                    disabled={selectedOptionId !== null}
                    onClick={() => handleSelectSocraticOption(opt.id)}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      isSelected
                        ? isMaster
                          ? 'bg-emerald-950/40 border-emerald-500 text-white'
                          : 'bg-amber-950/30 border-amber-500 text-white'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-sm font-medium leading-snug">
                        {opt.question}
                      </div>
                      {isSelected && (
                        <span
                          className={`text-xs px-2 py-0.5 rounded font-bold shrink-0 ${
                            isMaster
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          {isMaster ? '宗師級提問 (+50 XP)' : '次級提問 (+25 XP)'}
                        </span>
                      )}
                    </div>

                    {isSelected && (
                      <div className="mt-3 pt-3 border-t border-slate-700/60 text-xs text-slate-300">
                        <span className="font-semibold text-blue-300">提問剖析：</span>{' '}
                        {opt.feedback}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {selectedOptionId && (
            <div className="flex justify-end">
              <button
                onClick={nextSocratic}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-md"
              >
                <span>下一題修煉</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Occam Module */}
      {currentModule === 'occam' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl">
                <ScissorsLineDashed className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>奧坎剃刀手術台：不加不必要的假設</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-emerald-300 border border-emerald-500/30 font-normal">
                    第 {occamIndex + 1} 案
                  </span>
                </h2>
                <p className="text-xs text-slate-400">
                  奧坎剃刀核心：在解釋力相近時，選擇假設較少、較簡單的解釋！
                </p>
              </div>
            </div>
            <button
              onClick={nextOccam}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-300 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 transition-all border border-slate-700/60"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>換一案</span>
            </button>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              [ 異常現象 ]
            </div>
            <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-4 text-slate-200 text-sm md:text-base font-semibold">
              {activeOccam.phenomenon}
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-bold text-emerald-400">
              揮動奧坎剃刀，選擇最具解釋力且假設最少的理性解釋：
            </div>

            <div className="grid gap-3">
              {activeOccam.hypotheses.map((hyp) => {
                const isSelected = selectedHypothesisId === hyp.id;
                return (
                  <div
                    key={hyp.id}
                    onClick={() => !selectedHypothesisId && handleSelectOccam(hyp.id)}
                    className={`p-4 rounded-xl border transition-all ${
                      !selectedHypothesisId ? 'cursor-pointer hover:border-emerald-500/70 hover:bg-slate-800' : ''
                    } ${
                      isSelected
                        ? hyp.isOccamBest
                          ? 'bg-emerald-950/30 border-emerald-500'
                          : 'bg-rose-950/30 border-rose-500'
                        : selectedHypothesisId && hyp.isOccamBest
                        ? 'border-emerald-500/60 bg-slate-800/40'
                        : 'bg-slate-800/50 border-slate-700/60'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="font-bold text-sm text-white">
                        {hyp.title}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                          額外假設數: {hyp.assumptionCount} 個
                        </span>
                        <span className="text-[11px] px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                          解釋力: {hyp.explanatoryPower}%
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 mt-2">{hyp.description}</p>

                    {selectedHypothesisId && (
                      <div className="mt-3 pt-3 border-t border-slate-700/60 text-xs">
                        <span
                          className={`font-semibold ${
                            hyp.isOccamBest ? 'text-emerald-300' : 'text-slate-400'
                          }`}
                        >
                          剃刀點評：
                        </span>{' '}
                        <span className="text-slate-300">{hyp.critique}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {selectedHypothesisId && (
            <div className="bg-emerald-950/30 border border-emerald-500/40 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-xs text-emerald-200">
                <span className="font-bold text-emerald-300">奧坎準則總結：</span>{' '}
                {activeOccam.idealConclusion}
              </div>
              <button
                onClick={nextOccam}
                className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-all"
              >
                <span>下一案挑戰</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Bias Detective Module */}
      {currentModule === 'bias' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-purple-500/20 text-purple-400 rounded-xl">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>認知偏誤偵探社：抓出 6 大底層心理捷徑</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-purple-300 border border-purple-500/30 font-normal">
                    第 {biasIndex + 1} 案
                  </span>
                </h2>
                <p className="text-xs text-slate-400">
                  大腦因為有限資源（資訊、時間、記憶、情緒）而產生系統性偏差，持續內觀是否中招！
                </p>
              </div>
            </div>
            <button
              onClick={nextBias}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-purple-300 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 transition-all border border-slate-700/60"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>換一案</span>
            </button>
          </div>

          {/* Scenario */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              [ 決策迷航故事 ] {activeBias.title}
            </div>
            <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-4 text-slate-200 text-sm md:text-base leading-relaxed">
              {activeBias.story}
            </div>
          </div>

          {/* 6 Bias Mechanisms Grid */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-purple-400">
              偵測此決策背後的「底層偏誤機制」：
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {BIAS_MECHANISMS.map((mech) => {
                const isSelected = selectedMechanismId === mech.id;
                const isCorrect = mech.id === activeBias.correctMechanismId;

                return (
                  <button
                    key={mech.id}
                    disabled={biasSubmitted}
                    onClick={() => handleSelectBias(mech.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      biasSubmitted
                        ? isCorrect
                          ? 'bg-emerald-950/40 border-emerald-500 text-white'
                          : isSelected
                          ? 'bg-rose-950/40 border-rose-500 text-white'
                          : 'bg-slate-800/40 border-slate-700/40 text-slate-400'
                        : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-purple-500 hover:bg-slate-800'
                    }`}
                  >
                    <div className="font-bold text-sm flex items-center justify-between mb-1">
                      <span>{mech.name}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2">
                      {mech.description}
                    </p>
                    <div className="text-[10px] text-purple-300/80 mt-2 font-mono">
                      觸發誘因: {mech.triggerCause}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback & Reflective Prompt */}
          {biasSubmitted && (
            <div className="space-y-4">
              <div
                className={`p-4 rounded-xl border ${
                  selectedMechanismId === activeBias.correctMechanismId
                    ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
                    : 'bg-amber-950/30 border-amber-500/50 text-amber-200'
                }`}
              >
                <div className="font-bold text-sm mb-1">
                  {selectedMechanismId === activeBias.correctMechanismId
                    ? '🎯 精準識破！'
                    : '💡 內觀視角：'}
                </div>
                <p className="text-xs leading-relaxed text-slate-200">
                  {activeBias.explanation}
                </p>
                <div className="mt-3 pt-3 border-t border-slate-700/60 text-xs">
                  <span className="font-bold text-purple-300">
                    AWAKE 每日內觀提問：
                  </span>{' '}
                  <span className="italic text-slate-300">
                    「{activeBias.reflectiveQuestion}」
                  </span>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={nextBias}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all shadow-md"
                >
                  <span>下一偏誤診斷</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
