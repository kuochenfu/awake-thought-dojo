import { describe, it, expect } from 'vitest';
import {
  UserStatsSchema,
  AchievementSchema,
  OfflineBackupDataSchema,
  UserStats
} from '../types';
import {
  calculateLevelAndTitle,
  calculateBlitzPoints,
  evaluateOccamHypothesis,
  analyzeFallacies,
  calculateRadarScores
} from '../utils/engine';
import { BLITZ_QUESTIONS_POOL } from '../data/featureData';
import { STRATEGIC_INDUSTRIES, STRATEGIC_INDUSTRY_QUESTIONS } from '../data/strategicIndustryData';

describe('AWAKE 全方位批判邏輯與邊界安全單元測試 (Comprehensive Test Suite)', () => {
  describe('1. 等級與頭銜升階曲線邊界測試 (Level Boundary Tests)', () => {
    it('低於 70 XP 應始終保持 Lv.1 入門審查員', () => {
      expect(calculateLevelAndTitle(0)).toEqual({ level: 1, title: '入門審查員' });
      expect(calculateLevelAndTitle(69)).toEqual({ level: 1, title: '入門審查員' });
    });

    it('達到 70 XP 邊界應升階為 Lv.2 敏銳辨析者', () => {
      expect(calculateLevelAndTitle(70)).toEqual({ level: 2, title: '敏銳辨析者' });
      expect(calculateLevelAndTitle(179)).toEqual({ level: 2, title: '敏銳辨析者' });
    });

    it('達到 180 XP 邊界應升階為 Lv.3 剃刀論證大師', () => {
      expect(calculateLevelAndTitle(180)).toEqual({ level: 3, title: '剃刀論證大師' });
      expect(calculateLevelAndTitle(299)).toEqual({ level: 3, title: '剃刀論證大師' });
    });

    it('達到 300 XP 邊界應升階為 Lv.4 清醒哲人宗師', () => {
      expect(calculateLevelAndTitle(300)).toEqual({ level: 4, title: '清醒哲人宗師' });
      expect(calculateLevelAndTitle(449)).toEqual({ level: 4, title: '清醒哲人宗師' });
    });

    it('達到 450 XP 應登頂為 Lv.5 清醒真理大宗師', () => {
      expect(calculateLevelAndTitle(450)).toEqual({ level: 5, title: '清醒真理大宗師' });
      expect(calculateLevelAndTitle(99999)).toEqual({ level: 5, title: '清醒真理大宗師' });
    });

    it('輸入負數經驗值時應優雅保底為 0 並回傳 Lv.1', () => {
      expect(calculateLevelAndTitle(-100)).toEqual({ level: 1, title: '入門審查員' });
    });
  });

  describe('2. 閃電快問快答計分與連擊乘數演算法 (Blitz Combo Math)', () => {
    it('0 連擊或 1 連擊時給予基礎 10 分 (1x 倍率)', () => {
      expect(calculateBlitzPoints(0)).toBe(10);
      expect(calculateBlitzPoints(1)).toBe(10);
    });

    it('2~3 連擊時給予 20 分 (2x 倍率)', () => {
      expect(calculateBlitzPoints(2)).toBe(20);
      expect(calculateBlitzPoints(3)).toBe(20);
    });

    it('4~5 連擊時給予 30 分 (3x 倍率)', () => {
      expect(calculateBlitzPoints(4)).toBe(30);
    });

    it('連擊乘數最高不得超過 5x (50分封頂)', () => {
      expect(calculateBlitzPoints(10)).toBe(50);
      expect(calculateBlitzPoints(100)).toBe(50);
    });

    it('負數連擊數應自動校正為 0 並給予 10 分', () => {
      expect(calculateBlitzPoints(-5)).toBe(10);
    });
  });

  describe('3. 奧坎剃刀簡約度公式邊界測試 (Occam Razor Scoring)', () => {
    it('相同解釋力下，假設數量越少得分越高', () => {
      const singleAssumptionScore = evaluateOccamHypothesis(90, 1);
      const multiAssumptionScore = evaluateOccamHypothesis(90, 4);
      expect(singleAssumptionScore).toBe(45);
      expect(multiAssumptionScore).toBe(18);
      expect(singleAssumptionScore).toBeGreaterThan(multiAssumptionScore);
    });

    it('假設數量為 0 時能除以 1 正常運算，不發生除以零例外', () => {
      expect(evaluateOccamHypothesis(100, 0)).toBe(100);
    });

    it('負數假設數量應保底為 0', () => {
      expect(evaluateOccamHypothesis(80, -2)).toBe(80);
    });
  });

  describe('4. 思維錯誤偵測引擎深度辨析 (Fallacy Engine Analysis)', () => {
    it('處理空字串或純空白時應安全返回滿分 100 且 0 謬誤', () => {
      const result = analyzeFallacies('   ');
      expect(result.clarityScore).toBe(100);
      expect(result.items.length).toBe(0);
    });

    it('純客觀事實文本應判定為 0 謬誤，清晰度為 100', () => {
      const factText = '今日核心資料庫連線數為 140，CPU 使用率為 42%，未出現超時警報。';
      const result = analyzeFallacies(factText);
      expect(result.items.length).toBe(0);
      expect(result.clarityScore).toBe(100);
      expect(result.overallCritique).toContain('✅');
    });

    it('精準偵測「滑坡謬誤」特徵句型', () => {
      const slopeText = '如果今天不加班，大家下個月就會全體拿丙等，而且公司一定會倒閉等死。';
      const result = analyzeFallacies(slopeText);
      expect(result.items.some((i) => i.id === 'fallacy-slope')).toBe(true);
      expect(result.clarityScore).toBeLessThan(100);
    });

    it('精準偵測「沉沒成本謬誤」特徵句型', () => {
      const sunkCostText = '我們在這個爛系統上已經花了五百萬，現在放棄之前的心血就全白費了！';
      const result = analyzeFallacies(sunkCostText);
      expect(result.items.some((i) => i.id === 'fallacy-sunk-cost')).toBe(true);
    });

    it('精準偵測「假兩難/非黑即白」特徵句型', () => {
      const dilemmaText = '如果不立刻改寫成 Rust，我們就是食古不化等死！';
      const result = analyzeFallacies(dilemmaText);
      expect(result.items.some((i) => i.id === 'fallacy-dilemma')).toBe(true);
    });

    it('多重複合謬誤疊加時，清晰度分數扣減且不得低於保底 15 分', () => {
      const compoundText =
        '如果不加班就會全體拿丙等而且一定會取消合約！況且我們已經花了三個月心血，放棄就全白費了！如果不這樣做就是食古不化！大公司現在都這麼幹！';
      const result = analyzeFallacies(compoundText);
      expect(result.items.length).toBeGreaterThanOrEqual(3);
      expect(result.clarityScore).toBeGreaterThanOrEqual(15);
    });
  });

  describe('5. 心智六邊形雷達圖數值封頂與邊界 (Radar Range Clamp)', () => {
    it('極限高數值情況下各維度不得超過 100 分', () => {
      const godStats: UserStats = {
        clarityPoints: 99999,
        level: 5,
        title: '清醒真理大宗師',
        completedCounts: { h15: 100, socrates: 100, occam: 100, bias: 100 },
        unlockedBadges: [],
        streakDays: 365,
        lastActiveDate: '2026-09-11',
        totalFallaciesDetected: 1000,
        pathsExplored: 50,
        blitzHighScore: 5000,
        arenaDebatesCompleted: 50
      };

      const scores = calculateRadarScores(godStats);
      expect(scores.h15).toBe(100);
      expect(scores.socrates).toBe(100);
      expect(scores.occam).toBe(100);
      expect(scores.bias).toBe(100);
      expect(scores.path).toBe(100);
      expect(scores.blitz).toBe(100);
    });

    it('全新使用者狀態下各維度皆有合理基準分且不為負數', () => {
      const freshStats: UserStats = {
        clarityPoints: 0,
        level: 1,
        title: '入門審查員',
        completedCounts: { h15: 0, socrates: 0, occam: 0, bias: 0 },
        unlockedBadges: [],
        streakDays: 1,
        lastActiveDate: '',
        totalFallaciesDetected: 0,
        pathsExplored: 0,
        blitzHighScore: 0,
        arenaDebatesCompleted: 0
      };

      const scores = calculateRadarScores(freshStats);
      expect(scores.h15).toBeGreaterThan(0);
      expect(scores.bias).toBeGreaterThan(0);
    });
  });

  describe('6. Zod 執行期型態防護網嚴格性 (Zod Runtime Guard)', () => {
    it('缺少必填欄位時應拋出 ValidationError', () => {
      const incomplete = { clarityPoints: 100 };
      expect(UserStatsSchema.safeParse(incomplete).success).toBe(false);
    });

    it('經驗值為負數時應被 Zod 精確拒絕', () => {
      const negativeXP = {
        clarityPoints: -1,
        level: 1,
        title: '測試',
        completedCounts: { h15: 0, socrates: 0, occam: 0, bias: 0 }
      };
      expect(UserStatsSchema.safeParse(negativeXP).success).toBe(false);
    });

    it('成就不合法的分類 category 應被 Zod 阻擋', () => {
      const invalidAchievement = {
        id: 'ach-test',
        title: '非法成就',
        description: '描述',
        category: 'hacker_category_unknown', // 非法列舉值
        icon: 'Award',
        requiredCount: 1,
        currentCount: 0,
        isUnlocked: false,
        rewardXP: 10
      };
      expect(AchievementSchema.safeParse(invalidAchievement).success).toBe(false);
    });
  });

  describe('7. 國發會六大核心戰略產業題庫完整性與分佈測試 (Strategic Industries Pool Guard)', () => {
    it('六大核心戰略產業定義完整，包含 6 個標準產業領域', () => {
      expect(STRATEGIC_INDUSTRIES.length).toBe(6);
      const keys = STRATEGIC_INDUSTRIES.map((i) => i.key);
      expect(keys).toEqual([
        'digital_info',
        'cyber_security',
        'precision_health',
        'green_energy',
        'national_defense',
        'strategic_reserve'
      ]);
    });

    it('戰略產業專題擴充總數恰好為 60 題，且總題庫增至 72 題', () => {
      expect(STRATEGIC_INDUSTRY_QUESTIONS.length).toBe(60);
      expect(BLITZ_QUESTIONS_POOL.length).toBe(72);
    });

    it('六大戰略產業每個產業均恰好分配 10 題 (5 客觀事實 + 5 隱含假設)', () => {
      for (const industry of STRATEGIC_INDUSTRIES) {
        const industryQuestions = STRATEGIC_INDUSTRY_QUESTIONS.filter(
          (q) => q.industry === industry.key
        );
        expect(industryQuestions.length).toBe(10);

        const facts = industryQuestions.filter((q) => q.sourceType === 'fact');
        const assumptions = industryQuestions.filter((q) => q.sourceType === 'assumption');
        expect(facts.length).toBe(5);
        expect(assumptions.length).toBe(5);
      }
    });

    it('所有戰略題目皆具備非空白陳述句、有效提示與產業中文標籤', () => {
      for (const q of STRATEGIC_INDUSTRY_QUESTIONS) {
        expect(q.statement.trim().length).toBeGreaterThan(10);
        expect(q.hint.trim().length).toBeGreaterThan(5);
        expect(q.industryName).toBeDefined();
        expect(['fact', 'assumption']).toContain(q.sourceType);
      }
    });
  });
});
