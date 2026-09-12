import React, { useState, useEffect } from 'react';
import {
  ActiveTab,
  UserStats,
  GameModuleType,
  Achievement,
  UserStatsSchema
} from './types';
import { INITIAL_ACHIEVEMENTS } from './data/featureData';
import { Navbar } from './components/Navbar';
import { GamifiedPlayground } from './components/GamifiedPlayground';
import { BusinessProposal } from './components/BusinessProposal';
import { ArchitectureRoast } from './components/ArchitectureRoast';
import { MindPathGraph } from './components/MindPathGraph';
import { FallacyDetector } from './components/FallacyDetector';
import { DailyChallengeView } from './components/DailyChallengeView';
import { AchievementView } from './components/AchievementView';
import { SocraticArena } from './components/SocraticArena';
import { SpeedDebunkBlitz } from './components/SpeedDebunkBlitz';
import { DiagnosticReport } from './components/DiagnosticReport';
import { MindfulCoolDown } from './components/MindfulCoolDown';
import { BackupModal } from './components/BackupModal';
import { LevelUpModal } from './components/LevelUpModal';
import { QuestionPoolStatusBar } from './components/QuestionPoolStatusBar';
import { useQuestionEngine } from './hooks/useQuestionEngine';
import { calculateLevelAndTitle } from './utils/engine';
import { Award } from 'lucide-react';

const STORAGE_KEY_STATS = 'awake_user_stats_v3';
const STORAGE_KEY_ACHIEVEMENTS = 'awake_achievements_v3';

const DEFAULT_USER_STATS: UserStats = {
  clarityPoints: 30,
  level: 1,
  title: '入門審查員',
  completedCounts: {
    h15: 0,
    socrates: 0,
    occam: 0,
    bias: 0
  },
  unlockedBadges: [],
  streakDays: 1,
  lastActiveDate: new Date().toISOString().slice(0, 10),
  totalFallaciesDetected: 0,
  pathsExplored: 0,
  blitzHighScore: 0,
  arenaDebatesCompleted: 0
};

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('playground');
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [isCoolDownOpen, setIsCoolDownOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 全域統一題庫隨機排程引擎（題庫有多少就用多少、零重複隨機分佈）
  const questionEngine = useQuestionEngine();

  // 流光溢彩升階儀式彈窗狀態
  const [levelUpModalData, setLevelUpModalData] = useState<{
    isOpen: boolean;
    level: number;
    title: string;
    points: number;
  }>({
    isOpen: false,
    level: 1,
    title: '入門審查員',
    points: 30
  });

  // 初始化 UserStats（使用 Zod 做嚴格的安全解析防線）
  const [userStats, setUserStats] = useState<UserStats>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STATS);
      if (saved) {
        const raw = JSON.parse(saved);
        const parsed = UserStatsSchema.safeParse(raw);
        if (parsed.success) {
          return parsed.data;
        }
      }
    } catch (e) {
      console.error('Failed to load userStats from localStorage', e);
    }
    return DEFAULT_USER_STATS;
  });

  // 初始化 Achievements
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ACHIEVEMENTS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load achievements from localStorage', e);
    }
    return INITIAL_ACHIEVEMENTS;
  });

  // 同步保存至 localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(userStats));
    } catch (e) {
      console.error('Save stats error', e);
    }
  }, [userStats]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ACHIEVEMENTS, JSON.stringify(achievements));
    } catch (e) {
      console.error('Save achievements error', e);
    }
  }, [achievements]);

  // 顯示通知 Toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // 統一加點與升階檢查演算法（保證觸發流光溢彩視覺獎勵）
  const awardPointsWithLevelCheck = (
    pointsDelta: number,
    updater?: (prev: UserStats) => Partial<UserStats>
  ) => {
    setUserStats((prev) => {
      const nextPoints = Math.max(0, prev.clarityPoints + pointsDelta);
      const { level: nextLevel, title: nextTitle } = calculateLevelAndTitle(nextPoints);

      // 檢查是否突破升階
      if (nextLevel > prev.level) {
        setLevelUpModalData({
          isOpen: true,
          level: nextLevel,
          title: nextTitle,
          points: nextPoints
        });
        showToast(`✨ 階位突破！恭喜晉升為【${nextTitle}】！`);
      }

      const extra = updater ? updater(prev) : {};

      return {
        ...prev,
        ...extra,
        clarityPoints: nextPoints,
        level: nextLevel,
        title: nextTitle
      };
    });
  };

  // 檢查並解鎖成就通用方法
  const triggerAchievementProgress = (
    achId: string,
    addCount: number = 1
  ) => {
    setAchievements((prevList) => {
      return prevList.map((ach) => {
        if (ach.id !== achId || ach.isUnlocked) return ach;
        const newCount = ach.currentCount + addCount;
        const willUnlock = newCount >= ach.requiredCount;

        if (willUnlock) {
          showToast(`🏆 達成新成就：【${ach.title}】！獲得 +${ach.rewardXP} XP！`);
          // 呼叫升階加點
          setTimeout(() => {
            awardPointsWithLevelCheck(ach.rewardXP);
          }, 100);
        }

        return {
          ...ach,
          currentCount: newCount,
          isUnlocked: willUnlock,
          unlockedAt: willUnlock ? new Date().toISOString() : ach.unlockedAt
        };
      });
    });
  };

  // 基礎修煉題型完成
  const handleUpdateStats = (pointsDelta: number, module: GameModuleType) => {
    awardPointsWithLevelCheck(pointsDelta, (prev) => ({
      completedCounts: {
        ...prev.completedCounts,
        [module]: (prev.completedCounts[module] || 0) + 1
      }
    }));

    if (module === 'h15') {
      triggerAchievementProgress('ach-first-h15', 1);
    } else if (module === 'socrates') {
      triggerAchievementProgress('ach-socrates-master', 1);
    } else if (module === 'occam') {
      triggerAchievementProgress('ach-occam-blade', 1);
    } else if (module === 'bias') {
      triggerAchievementProgress('ach-bias-detective', 1);
    }
  };

  // 思維路徑圖推演完成
  const handleCompletePath = () => {
    awardPointsWithLevelCheck(45, (prev) => ({
      pathsExplored: (prev.pathsExplored || 0) + 1
    }));
    triggerAchievementProgress('ach-path-explorer', 1);
    showToast('🌱 完成思維路徑分支推演！已掌握隱含前提與偏誤陷阱！');
  };

  // 謬誤偵測器抓出謬誤
  const handleFallaciesDetected = (count: number) => {
    awardPointsWithLevelCheck(count * 10, (prev) => ({
      totalFallaciesDetected: (prev.totalFallaciesDetected || 0) + count
    }));
    triggerAchievementProgress('ach-fallacy-hunter', count);
  };

  // 每日挑戰完成
  const handleCompleteDaily = (bonusXP: number) => {
    awardPointsWithLevelCheck(bonusXP, (prev) => ({
      streakDays: prev.streakDays + 1
    }));
    triggerAchievementProgress('ach-daily-streak', 1);
    showToast(`🔥 每日思維挑戰通關！連續天數提升至 ${userStats.streakDays + 1} 天！`);
  };

  // 蘇格拉底沙盒對辯通關
  const handleCompleteDebate = () => {
    awardPointsWithLevelCheck(80, (prev) => ({
      arenaDebatesCompleted: (prev.arenaDebatesCompleted || 0) + 1
    }));
    triggerAchievementProgress('ach-arena-champion', 1);
    showToast('⚔️ 雅典心智擂台獲勝！成功逼出隱含前提！');
  };

  // 閃電快問快答結束
  const handleFinishBlitz = (score: number) => {
    awardPointsWithLevelCheck(Math.floor(score / 2), (prev) => ({
      blitzHighScore: Math.max(prev.blitzHighScore || 0, score)
    }));
    if (score >= 500) {
      triggerAchievementProgress('ach-blitz-master', score);
    }
  };

  // 備份還原
  const handleRestoreBackup = (
    restoredStats: UserStats,
    restoredAchievements: Achievement[]
  ) => {
    setUserStats(restoredStats);
    if (restoredAchievements && restoredAchievements.length > 0) {
      setAchievements(restoredAchievements);
    }
    showToast('💾 離線進度已完全還原！');
  };

  // 備份重設
  const handleResetProgress = () => {
    setUserStats(DEFAULT_USER_STATS);
    setAchievements(INITIAL_ACHIEVEMENTS);
    localStorage.removeItem(STORAGE_KEY_STATS);
    localStorage.removeItem(STORAGE_KEY_ACHIEVEMENTS);
    setIsBackupModalOpen(false);
    showToast('進度已重設為初始狀態。');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userStats={userStats}
        onOpenBackup={() => setIsBackupModalOpen(true)}
        onOpenCoolDown={() => setIsCoolDownOpen(true)}
        onOpenLevelUpCeremony={() =>
          setLevelUpModalData({
            isOpen: true,
            level: userStats.level,
            title: userStats.title,
            points: userStats.clarityPoints
          })
        }
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* 全域題庫統一分佈與不重複狀態欄 */}
        {['playground', 'arena', 'blitz', 'daily'].includes(activeTab) && (
          <QuestionPoolStatusBar
            bankStats={questionEngine.bankStats}
            onResetHistory={questionEngine.resetQuestionHistory}
          />
        )}

        {activeTab === 'playground' && (
          <GamifiedPlayground
            userStats={userStats}
            onUpdateStats={handleUpdateStats}
            questionEngine={questionEngine}
          />
        )}

        {activeTab === 'arena' && (
          <SocraticArena
            onCompleteDebate={handleCompleteDebate}
            currentArena={questionEngine.currentArena}
            arenaCursor={questionEngine.arenaCursor}
            arenaTotal={questionEngine.arenaTotal}
            onNextArenaTopic={questionEngine.nextArenaTopic}
            onMarkSeen={(id) => questionEngine.markAsSeen('arena', id)}
          />
        )}

        {activeTab === 'blitz' && (
          <SpeedDebunkBlitz
            highScore={userStats.blitzHighScore || 0}
            onFinishBlitz={handleFinishBlitz}
            getShuffledBlitzPool={questionEngine.getShuffledBlitzPool}
            onQuestionAnswered={(id) => questionEngine.markAsSeen('blitz', id)}
          />
        )}

        {activeTab === 'mindmap' && (
          <MindPathGraph onCompletePath={handleCompletePath} />
        )}

        {activeTab === 'detector' && (
          <FallacyDetector onFallaciesDetected={handleFallaciesDetected} />
        )}

        {activeTab === 'daily' && (
          <DailyChallengeView
            userStats={userStats}
            onCompleteDaily={handleCompleteDaily}
            currentDaily={questionEngine.currentDaily}
            dailyCursor={questionEngine.dailyCursor}
            dailyTotal={questionEngine.dailyTotal}
            onNextDaily={questionEngine.nextDailyQuestion}
            onMarkSeen={(id) => questionEngine.markAsSeen('daily', id)}
          />
        )}

        {activeTab === 'diagnostic' && (
          <DiagnosticReport
            userStats={userStats}
            achievements={achievements}
          />
        )}

        {activeTab === 'achievements' && (
          <AchievementView
            achievements={achievements}
            userStats={userStats}
            onOpenLevelUpCeremony={() =>
              setLevelUpModalData({
                isOpen: true,
                level: userStats.level,
                title: userStats.title,
                points: userStats.clarityPoints
              })
            }
          />
        )}

        {activeTab === 'roast' && <ArchitectureRoast />}

        {activeTab === 'business' && <BusinessProposal />}
      </main>

      {/* Iridescent Level Up Ceremony Modal (流光溢彩視覺獎勵) */}
      <LevelUpModal
        isOpen={levelUpModalData.isOpen}
        onClose={() =>
          setLevelUpModalData((prev) => ({ ...prev, isOpen: false }))
        }
        level={levelUpModalData.level}
        title={levelUpModalData.title}
        points={levelUpModalData.points}
        onViewDiagnostic={() => setActiveTab('diagnostic')}
      />

      {/* Mindful Cool Down Modal */}
      <MindfulCoolDown
        isOpen={isCoolDownOpen}
        onClose={() => setIsCoolDownOpen(false)}
      />

      {/* Offline Backup Modal */}
      <BackupModal
        isOpen={isBackupModalOpen}
        onClose={() => setIsBackupModalOpen(false)}
        userStats={userStats}
        achievements={achievements}
        onRestore={handleRestoreBackup}
        onReset={handleResetProgress}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-amber-500 text-slate-950 font-bold px-4 py-3 rounded-xl shadow-2xl shadow-amber-500/40 animate-bounce">
          <Award className="w-5 h-5 shrink-0" />
          <span className="text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            AWAKE 清醒術思維修煉道場 • 「我憑什麼相信？願在證據改變時修正自己」
          </div>
          <div className="text-slate-600">
            Zod 執行期型態防線 • 蘇格拉底對辯沙盒 • 閃電快問快答 • 體檢報告雷達圖
          </div>
        </div>
      </footer>
    </div>
  );
}
