import React, { useState } from 'react';
import { FallacyDetectionResult } from '../types';
import { PRESET_DETECTOR_SNIPPETS } from '../data/featureData';
import { analyzeFallacies } from '../utils/engine';
import {
  AlertTriangle,
  Search,
  HelpCircle,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  Lightbulb,
  FileText
} from 'lucide-react';

interface FallacyDetectorProps {
  onFallaciesDetected: (count: number) => void;
}

export const FallacyDetector: React.FC<FallacyDetectorProps> = ({
  onFallaciesDetected
}) => {
  const [inputText, setInputText] = useState(PRESET_DETECTOR_SNIPPETS[0].text);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<FallacyDetectionResult | null>(null);

  // 批判性剖析規則引擎（委派至通過 100% 單元測試的純函數引擎）
  const runDetection = (text: string) => {
    setIsScanning(true);

    setTimeout(() => {
      const detectionResult = analyzeFallacies(text);
      setResult(detectionResult);
      setIsScanning(false);
      if (detectionResult.items.length > 0) {
        onFallaciesDetected(detectionResult.items.length);
      }
    }, 400);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950/80 via-slate-900 to-slate-900 border border-purple-500/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-start gap-4">
          <div className="p-3.5 bg-purple-500/20 text-purple-400 rounded-2xl border border-purple-500/30 shrink-0">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Cognitive Fallacy Radar
              </span>
              <span className="text-xs text-slate-400">
                滑坡謬誤 • 假兩難 • 沉沒成本 • 類比崩塌
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              思維錯誤偵測器 (Fallacy Radar)
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              輸入主管的週會發言、商業企劃話術或自己的決策筆記，自動掃描並標註隱藏在文字中的因果漏洞與心理盲區！
            </p>
          </div>
        </div>
      </div>

      {/* Main Detection Workbench */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
        {/* Preset Samples */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-purple-400" />
            <span>快速載入經典案例練習：</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {PRESET_DETECTOR_SNIPPETS.map((snip, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInputText(snip.text);
                  setResult(null);
                }}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700/80 transition-all"
              >
                {snip.title}
              </button>
            ))}
          </div>
        </div>

        {/* Input Textarea */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300">
            待檢驗文本內容（可自由修改或貼上真實工作情境）：
          </label>
          <textarea
            rows={4}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="請輸入一段待檢驗的對話、技術主張或企劃論述..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-slate-200 text-sm focus:outline-none focus:border-purple-500 font-sans leading-relaxed"
          />
        </div>

        {/* Scan Button */}
        <div className="flex justify-end">
          <button
            disabled={isScanning || !inputText.trim()}
            onClick={() => runDetection(inputText)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-purple-500/20 disabled:opacity-50 transition-all"
          >
            {isScanning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>正在進行批判邏輯拓撲分析...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>啟動思維錯誤掃描</span>
              </>
            )}
          </button>
        </div>

        {/* Result Area */}
        {result && (
          <div className="mt-8 pt-6 border-t border-slate-800 space-y-6">
            {/* Score & Verdict Banner */}
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-mono text-purple-400 font-bold mb-1">
                  DETECTION REPORT
                </div>
                <div className="text-sm font-bold text-white">
                  {result.overallCritique}
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <div className="text-[10px] text-slate-400">邏輯清晰度評分</div>
                  <div
                    className={`text-xl font-black font-mono ${
                      result.clarityScore >= 80
                        ? 'text-emerald-400'
                        : result.clarityScore >= 50
                        ? 'text-amber-400'
                        : 'text-rose-400'
                    }`}
                  >
                    {result.clarityScore} / 100
                  </div>
                </div>
              </div>
            </div>

            {/* Finding Items */}
            <div className="space-y-4">
              <div className="text-xs font-bold text-slate-300">
                偵測到的具體邏輯謬誤與拆解處方箋 ({result.items.length} 處)：
              </div>

              <div className="grid gap-4">
                {result.items.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-xl bg-slate-800/50 border border-slate-700/80 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold px-2.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          {item.fallacyName}
                        </span>
                        <span className="text-xs text-slate-400">
                          • 底層偏誤: {item.biasMechanism}
                        </span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-700 text-slate-300 self-start sm:self-auto font-mono">
                        嚴重度：{item.severity.toUpperCase()}
                      </span>
                    </div>

                    <div className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800 font-medium">
                      <span className="text-slate-400 font-bold">涉及句型特徵：</span>{' '}
                      <span className="text-rose-300 italic">"{item.matchedText}"</span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.analysis}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      <div className="p-3 rounded-lg bg-blue-950/20 border border-blue-500/30 text-xs">
                        <div className="font-bold text-blue-300 flex items-center gap-1 mb-1">
                          <HelpCircle className="w-3.5 h-3.5" />
                          <span>建議祭出的蘇格拉底提問：</span>
                        </div>
                        <p className="text-slate-300 italic">{item.socraticQuestion}</p>
                      </div>

                      <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-xs">
                        <div className="font-bold text-emerald-300 flex items-center gap-1 mb-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>理性校準處方箋：</span>
                        </div>
                        <p className="text-slate-300">{item.fixRecommendation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
