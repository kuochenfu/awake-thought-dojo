import React, { useState } from 'react';
import { UserStats, Achievement } from '../types';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Share2,
  Sparkles,
  FileCheck,
  TrendingUp,
  BrainCircuit
} from 'lucide-react';

interface DiagnosticReportProps {
  userStats: UserStats;
  achievements: Achievement[];
}

export const DiagnosticReport: React.FC<DiagnosticReportProps> = ({
  userStats,
  achievements
}) => {
  const [copied, setCopied] = useState(false);

  // 計算 6 維度指標 (0-100)
  const h15Score = Math.min(100, (userStats.completedCounts.h15 || 0) * 25 + 40);
  const socratesScore = Math.min(100, (userStats.completedCounts.socrates || 0) * 20 + 35);
  const occamScore = Math.min(100, (userStats.completedCounts.occam || 0) * 25 + 45);
  const biasScore = Math.min(100, (userStats.completedCounts.bias || 0) * 20 + (userStats.totalFallaciesDetected || 0) * 5 + 30);
  const pathScore = Math.min(100, (userStats.pathsExplored || 0) * 40 + 35);
  const blitzScore = Math.min(100, Math.floor((userStats.blitzHighScore || 0) / 5) + 30);

  const dimensions = [
    { label: '事實辨析 (H15)', score: h15Score },
    { label: '提問穿透 (Socrates)', score: socratesScore },
    { label: '奧坎簡約 (Occam)', score: occamScore },
    { label: '偏誤抗性 (Bias)', score: biasScore },
    { label: '路徑演繹 (Path)', score: pathScore },
    { label: '閃電直覺 (Blitz)', score: blitzScore }
  ];

  // SVG 六邊形雷達圖座標計算
  const size = 260;
  const center = size / 2;
  const radius = 90;

  const getCoordinates = (index: number, total: number, value: number) => {
    const angle = (Math.PI * 2 / total) * index - Math.PI / 2;
    const r = (radius * value) / 100;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const polygonPoints = dimensions
    .map((d, i) => {
      const { x, y } = getCoordinates(i, dimensions.length, d.score);
      return `${x},${y}`;
    })
    .join(' ');

  const certNumber = `AWAKE-CERT-${userStats.level}0${userStats.clarityPoints}-${(userStats.lastActiveDate || '2026-09-11').replace(/-/g, '')}`;

  const handleCopySummary = () => {
    const text = `【AWAKE 批判思維體檢證書】\n稱號：${userStats.title} (Lv.${userStats.level})\n清醒值：${userStats.clarityPoints} XP\n認證編號：${certNumber}\n核心原則：「我憑什麼相信？願在證據改變時修正自己。」`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950/80 via-slate-900 to-slate-900 border border-blue-500/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3.5 bg-blue-500/20 text-blue-400 rounded-2xl border border-blue-500/30 shrink-0">
              <BrainCircuit className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Cognitive Diagnostic Report
                </span>
                <span className="text-xs text-slate-400">
                  全維度心智六邊形 • 認證證書
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                個人思維體檢報告與證書 (Diagnostic Audit)
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                綜合評估您在事實拆解、奧坎剃刀簡約性、偏誤防禦與即時辨析上的能力雷達圖，生成專屬數位證書！
              </p>
            </div>
          </div>

          <button
            onClick={handleCopySummary}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs shadow-md transition-all shrink-0 self-start sm:self-auto"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300">已複製體檢證書文字！</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>複製認證摘要分享</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Grid: Radar Chart + Certificate */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <span>思維維度雷達分析 (Cognitive Spider Radar)</span>
              </h3>
              <span className="text-xs font-mono text-slate-400">
                綜合指數: {Math.round(dimensions.reduce((a, b) => a + b.score, 0) / dimensions.length)} / 100
              </span>
            </div>

            {/* SVG Radar */}
            <div className="flex justify-center my-4">
              <svg width={size} height={size} className="overflow-visible">
                {/* Background Web Rings */}
                {[0.25, 0.5, 0.75, 1].map((scale, idx) => (
                  <circle
                    key={idx}
                    cx={center}
                    cy={center}
                    r={radius * scale}
                    fill="none"
                    stroke="#334155"
                    strokeDasharray="3 3"
                  />
                ))}

                {/* Axes */}
                {dimensions.map((_, i) => {
                  const { x, y } = getCoordinates(i, dimensions.length, 100);
                  return (
                    <line
                      key={i}
                      x1={center}
                      y1={center}
                      x2={x}
                      y2={y}
                      stroke="#475569"
                    />
                  );
                })}

                {/* Data Polygon */}
                <polygon
                  points={polygonPoints}
                  fill="rgba(59, 130, 246, 0.25)"
                  stroke="#3b82f6"
                  strokeWidth="2.5"
                />

                {/* Points & Labels */}
                {dimensions.map((d, i) => {
                  const { x, y } = getCoordinates(i, dimensions.length, d.score);
                  const labelCoord = getCoordinates(i, dimensions.length, 125);
                  return (
                    <g key={i}>
                      <circle cx={x} cy={y} r="4" fill="#60a5fa" stroke="#1e3a8a" strokeWidth="1.5" />
                      <text
                        x={labelCoord.x}
                        y={labelCoord.y}
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="text-[10px] fill-slate-300 font-semibold"
                      >
                        {d.label.split(' ')[0]}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Metric Details List */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-xs">
            {dimensions.map((d, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-slate-800/60 flex justify-between items-center">
                <span className="text-slate-400">{d.label}</span>
                <span className="font-mono font-bold text-blue-400">{d.score}分</span>
              </div>
            ))}
          </div>
        </div>

        {/* Certificate Card */}
        <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-amber-950/20 border-2 border-amber-500/40 rounded-2xl p-6 shadow-2xl space-y-6 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-amber-500/30">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-amber-400" />
                <span className="font-black tracking-widest text-xs uppercase text-amber-300">
                  AWAKE CERTIFIED MIND
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                NO: {certNumber}
              </span>
            </div>

            <div className="text-center py-4 space-y-2">
              <div className="text-xs uppercase tracking-wider text-slate-400">
                批判性思考修煉認證證書
              </div>
              <h2 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                {userStats.title}
              </h2>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>累計心智清醒值：{userStats.clarityPoints} XP</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-2">
              <div className="font-bold text-amber-300 flex items-center gap-1.5">
                <FileCheck className="w-4 h-4" />
                <span>修煉核心誓詞：</span>
              </div>
              <p className="italic">
                「在聽到任何狀況與主張時，我願意聽看停，先問『我憑什麼相信？』，絕不輕信直覺腦補，絕不因情緒防衛立場，並願在客觀證據改變時修正自己。」
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <div>
              <span>已解鎖成就：</span>
              <span className="text-amber-400 font-bold ml-1">
                {achievements.filter((a) => a.isUnlocked).length} / {achievements.length} 項
              </span>
            </div>
            <div>
              <span>連續清醒：</span>
              <span className="text-orange-400 font-bold ml-1">{userStats.streakDays} 天</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
