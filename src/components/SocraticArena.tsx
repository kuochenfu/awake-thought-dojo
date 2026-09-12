import React, { useState } from 'react';
import { ArenaMessage, SocraticDebateTopic } from '../types';
import { ARENA_TOPICS } from '../data/featureData';
import {
  Swords,
  HelpCircle,
  Sparkles,
  ShieldAlert,
  Send,
  RotateCcw,
  CheckCircle2,
  Award,
  Flame,
  ArrowRight
} from 'lucide-react';

interface SocraticArenaProps {
  onCompleteDebate: () => void;
  currentArena?: SocraticDebateTopic;
  arenaCursor?: number;
  arenaTotal?: number;
  onNextArenaTopic?: () => void;
  onMarkSeen?: (id: string) => void;
}

export const SocraticArena: React.FC<SocraticArenaProps> = ({
  onCompleteDebate,
  currentArena,
  arenaCursor = 0,
  arenaTotal = ARENA_TOPICS.length,
  onNextArenaTopic,
  onMarkSeen
}) => {
  const [selectedTopicIdx, setSelectedTopicIdx] = useState(0);
  const [currentRound, setCurrentRound] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [soundnessScore, setSoundnessScore] = useState(30);
  const [isFinished, setIsFinished] = useState(false);

  const topic: SocraticDebateTopic =
    currentArena || ARENA_TOPICS[selectedTopicIdx] || ARENA_TOPICS[0];

  const [messages, setMessages] = useState<ArenaMessage[]>([
    {
      id: 'msg-init-user',
      sender: 'user',
      text: topic.initialPremise
    },
    {
      id: 'msg-init-socrates',
      sender: 'socrates',
      text: topic.socratesOpening,
      soundnessDelta: 0
    }
  ]);

  // 當 currentArena 變動時同步更新對話
  React.useEffect(() => {
    setCurrentRound(0);
    setUserInput('');
    setSoundnessScore(30);
    setIsFinished(false);
    setMessages([
      {
        id: 'msg-init-user',
        sender: 'user',
        text: topic.initialPremise
      },
      {
        id: 'msg-init-socrates',
        sender: 'socrates',
        text: topic.socratesOpening,
        soundnessDelta: 0
      }
    ]);
  }, [topic.id]);

  // 重設當前對話
  const handleResetTopic = (idx?: number) => {
    if (idx !== undefined) {
      setSelectedTopicIdx(idx);
    }
    setCurrentRound(0);
    setUserInput('');
    setSoundnessScore(30);
    setIsFinished(false);
    const newTopic = idx !== undefined ? ARENA_TOPICS[idx] : topic;
    setMessages([
      {
        id: 'msg-init-user',
        sender: 'user',
        text: newTopic.initialPremise
      },
      {
        id: 'msg-init-socrates',
        sender: 'socrates',
        text: newTopic.socratesOpening,
        soundnessDelta: 0
      }
    ]);
  };

  // 玩家發送回應，蘇格拉底進行反詰
  const handleSendMessage = () => {
    if (!userInput.trim() || isFinished) return;

    const userText = userInput.trim();
    setUserInput('');

    // 新增玩家發言
    const userMsg: ArenaMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText
    };

    const treeStep = topic.dialogueTree[currentRound];

    if (treeStep) {
      const nextScore = Math.min(100, soundnessScore + 35);
      const isNextFinish = currentRound + 1 >= topic.dialogueTree.length;

      const socratesMsg: ArenaMessage = {
        id: `soc-${Date.now()}`,
        sender: 'socrates',
        text: treeStep.socraticCounter,
        hiddenPremiseRevealed: treeStep.revealedAssumption,
        soundnessDelta: 35
      };

      setMessages((prev) => [...prev, userMsg, socratesMsg]);
      setCurrentRound((prev) => prev + 1);
      setSoundnessScore(nextScore);

      if (isNextFinish) {
        setIsFinished(true);
        onCompleteDebate();
        if (onMarkSeen) {
          onMarkSeen(topic.id);
        }
      }
    } else {
      // 自由結尾
      const socratesFinal: ArenaMessage = {
        id: `soc-${Date.now()}`,
        sender: 'socrates',
        text: '「善哉！你看，當我們不再急著防衛立場，而是直視證據與邊界時，智慧便自然自內心萌發。這正是真正的批判思考！」'
      };
      setMessages((prev) => [...prev, userMsg, socratesFinal]);
      setIsFinished(true);
      setSoundnessScore(100);
      onCompleteDebate();
      if (onMarkSeen) {
        onMarkSeen(topic.id);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-950/80 via-slate-900 to-slate-900 border border-red-500/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3.5 bg-red-500/20 text-red-400 rounded-2xl border border-red-500/30 shrink-0">
              <Swords className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                  Interactive Socratic Arena
                </span>
                <span className="text-xs text-slate-400">
                  產婆術反詰 • 逼出隱含假設 • 破除盲信
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                蘇格拉底 AI 對辯沙盒 (Socratic Sparring)
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                「我不給予你答案，我只是一面鏡子。」進入雅典心智擂台，與冷酷而睿智的蘇格拉底進行多回合哲學反詰，直至論述達到真正穩健！
              </p>
            </div>
          </div>

          {/* Soundness Gauge */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 shrink-0 min-w-[200px]">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">論證穩健度 (Soundness)</span>
              <span
                className={`font-black font-mono ${
                  soundnessScore >= 80
                    ? 'text-emerald-400'
                    : soundnessScore >= 50
                    ? 'text-amber-400'
                    : 'text-rose-400'
                }`}
              >
                {soundnessScore}%
              </span>
            </div>
            <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  soundnessScore >= 80
                    ? 'bg-emerald-500'
                    : soundnessScore >= 50
                    ? 'bg-amber-500'
                    : 'bg-rose-500'
                }`}
                style={{ width: `${soundnessScore}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Arena Stage */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
        {/* Topic Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-bold">對辯焦點：</span>
            <div className="flex flex-wrap gap-2 items-center">
              {ARENA_TOPICS.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => handleResetTopic(idx)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                    (currentArena ? currentArena.id === t.id : selectedTopicIdx === idx)
                      ? 'bg-red-900/40 border-red-500 text-white font-bold'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                  }`}
                >
                  爭論 {idx + 1}
                </button>
              ))}
              {onNextArenaTopic && (
                <button
                  onClick={onNextArenaTopic}
                  className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-red-950/60 border border-red-500/40 text-red-300 hover:text-white hover:bg-red-900/60 transition-all font-semibold"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>隨機下一主題 ({arenaCursor + 1}/{arenaTotal})</span>
                </button>
              )}
            </div>
          </div>

          <button
            onClick={() => handleResetTopic()}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-white self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>重新開局</span>
          </button>
        </div>

        {/* Message Dialogue Stream */}
        <div className="space-y-4 max-h-[480px] overflow-y-auto pr-2 no-scrollbar">
          {messages.map((m) => {
            const isSocrates = m.sender === 'socrates';

            return (
              <div
                key={m.id}
                className={`flex gap-3 ${
                  isSocrates ? 'justify-start' : 'justify-end'
                }`}
              >
                {isSocrates && (
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center shrink-0">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                )}

                <div
                  className={`max-w-xl p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-2.5 ${
                    isSocrates
                      ? 'bg-slate-800/90 border border-slate-700 text-slate-200'
                      : 'bg-red-600/90 text-white border border-red-500/50'
                  }`}
                >
                  <div className="font-bold text-[11px] opacity-75 uppercase tracking-wider">
                    {isSocrates ? '🏛️ 蘇格拉底 (Socrates)' : '🧑 我堅持的立場'}
                  </div>
                  <div>{m.text}</div>

                  {m.hiddenPremiseRevealed && (
                    <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs">
                      <span className="font-bold flex items-center gap-1 text-amber-300 mb-0.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        【逼出的隱含前提】：
                      </span>
                      {m.hiddenPremiseRevealed}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isFinished && (
            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-2">
              <Award className="w-8 h-8 text-emerald-400 mx-auto" />
              <div className="text-base font-bold text-white">
                🎉 論述穩健度已達巔峰！真理越辯越明！
              </div>
              <p className="text-xs text-slate-300 max-w-lg mx-auto">
                恭喜您在蘇格拉底的多輪反詰下，成功卸下了主觀權威的迷思，完成了批判性思考的昇華！
              </p>
            </div>
          )}
        </div>

        {/* Input Bar */}
        {!isFinished ? (
          <div className="pt-2 border-t border-slate-800 flex gap-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="請誠實回答蘇格拉底的反詰，或說出你的修正假設..."
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-red-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={!userInput.trim()}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-red-600/20 disabled:opacity-50 transition-all"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">發送交鋒</span>
            </button>
          </div>
        ) : (
          <div className="flex justify-end pt-2">
            <button
              onClick={() => handleResetTopic((selectedTopicIdx + 1) % ARENA_TOPICS.length)}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all flex items-center gap-1.5"
            >
              <span>挑戰下一場思維爭論</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
