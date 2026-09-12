import { FallacyDetectionItem, FallacyDetectionResult, UserStats } from '../types';

/**
 * 批判思維等級與稱號升階演算法
 */
export function calculateLevelAndTitle(points: number): { level: number; title: string } {
  const safePoints = Math.max(0, points);
  if (safePoints >= 450) {
    return { level: 5, title: '清醒真理大宗師' };
  }
  if (safePoints >= 300) {
    return { level: 4, title: '清醒哲人宗師' };
  }
  if (safePoints >= 180) {
    return { level: 3, title: '剃刀論證大師' };
  }
  if (safePoints >= 70) {
    return { level: 2, title: '敏銳辨析者' };
  }
  return { level: 1, title: '入門審查員' };
}

/**
 * 閃電快問快答計分演算法
 */
export function calculateBlitzPoints(currentCombo: number): number {
  const safeCombo = Math.max(0, currentCombo);
  const multiplier = Math.min(5, Math.floor(safeCombo / 2) + 1);
  return 10 * multiplier;
}

/**
 * 陣列隨機洗牌演算法（Fisher-Yates 洗牌法，確保均勻分佈且不重複）
 */
export function shuffleArray<T>(array: readonly T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * 奧坎剃刀比較演算法
 */
export function evaluateOccamHypothesis(power: number, assumptionCount: number): number {
  const safeAssumptions = Math.max(0, assumptionCount);
  const safePower = Math.max(0, Math.min(100, power));
  // 核心公式：解釋力 / (假設數 + 1)
  return parseFloat((safePower / (safeAssumptions + 1)).toFixed(2));
}

/**
 * 思維錯誤偵測引擎（純函數演算法）
 */
export function analyzeFallacies(text: string): FallacyDetectionResult {
  if (!text || !text.trim()) {
    return {
      originalText: '',
      clarityScore: 100,
      items: [],
      overallCritique: '未輸入任何待檢驗文本。'
    };
  }

  const items: FallacyDetectionItem[] = [];

  // 1. 滑坡謬誤
  if (
    text.includes('如果') &&
    (text.includes('就會全體') ||
      text.includes('一定會取消') ||
      text.includes('一定會大量') ||
      text.includes('等死') ||
      text.includes('就會自然迎刃而解'))
  ) {
    items.push({
      id: 'fallacy-slope',
      matchedText: '如果...就會全體...而且一定會...',
      fallacyName: '滑坡謬誤（Slippery Slope）',
      biasMechanism: '捷徑猜測與情緒恐慌放大',
      severity: 'critical',
      analysis: '在未經證實的多個連續環節間強制建立因果必然後果，用極端最壞情境脅迫決策。',
      socraticQuestion: '「從 A 事件到 Z 極端災難之間，中間有哪些獨立變數？有何證據證明必然連續倒下？」',
      fixRecommendation: '將推演鏈條切成單一獨立事件，分別評估各自的發生機率。'
    });
  }

  // 2. 沉沒成本
  if (
    text.includes('已經花了') ||
    text.includes('放棄就全白費') ||
    text.includes('之前的心血') ||
    text.includes('投了幾百萬')
  ) {
    items.push({
      id: 'fallacy-sunk-cost',
      matchedText: '已經花了...現在放棄之前的心血就全白費了',
      fallacyName: '沉沒成本謬誤（Sunk Cost Fallacy）',
      biasMechanism: '得失反應不對稱（損失規避）',
      severity: 'critical',
      analysis: '決策時受制於過去已無法回收的資源投入，寧願承擔未來更高虧損。',
      socraticQuestion: '「如果今天第一天接手此案且過去零投入，以未來 ROI 來看還會做此選擇嗎？」',
      fixRecommendation: '純粹基於未來的邊際成本與邊際收益做決策。'
    });
  }

  // 3. 假兩難
  if (
    text.includes('只有一個原因') ||
    text.includes('如果不...就是') ||
    text.includes('食古不化') ||
    text.includes('非黑即白')
  ) {
    items.push({
      id: 'fallacy-dilemma',
      matchedText: '如果不...就是食古不化等死 / 只有一個原因',
      fallacyName: '假兩難謬誤（False Dilemma）',
      biasMechanism: '篩選資訊與認知簡化',
      severity: 'moderate',
      analysis: '人為消滅中間選項，將複雜的多維問題簡化為二元極端對立。',
      socraticQuestion: '「在 A 與 B 之間，是否存在漸進式或局部試點的第三條路徑？」',
      fixRecommendation: '列出至少 3 種折衷與混合方案，評估各方案的成本效益比。'
    });
  }

  // 4. 可用性捷徑
  if (
    text.includes('大公司現在都') ||
    text.includes('矽谷所有') ||
    text.includes('當年微信一樣') ||
    text.includes('上一季我們加班衝刺就成功了')
  ) {
    items.push({
      id: 'fallacy-availability',
      matchedText: '矽谷大公司都... / 就像當年一樣',
      fallacyName: '可用性啟發與過度類比（False Analogy）',
      biasMechanism: '捷徑猜測與重建記憶',
      severity: 'moderate',
      analysis: '將記憶中最鮮明或名氣最大的單一案例無條件套用到當前不同的環境與規模。',
      socraticQuestion: '「當年或大公司的成功要素，有多少是來自特定時代紅利而我們目前並不具備？」',
      fixRecommendation: '進行嚴格的異同對照表分析，辨別底層邊界條件的根本差異。'
    });
  }

  // 計算清晰度得分（最低保底 15 分，每項謬誤扣 20 分）
  const clarityScore = Math.max(15, 100 - items.length * 20);

  return {
    originalText: text,
    clarityScore,
    items,
    overallCritique:
      items.length === 0
        ? '✅ 該段論述邏輯結構嚴密，客觀事實與推理界限分明，未檢測出明顯的典型謬誤。'
        : `⚠️ 偵測到 ${items.length} 處系統性思考偏誤！該論述充滿隱含腦補、情緒綁架與因果跳躍。`
  };
}

/**
 * 計算 6 維度雷達圖分數（保證在 0-100 之間）
 */
export function calculateRadarScores(stats: UserStats) {
  const clamp = (val: number) => Math.max(0, Math.min(100, Math.round(val)));

  return {
    h15: clamp((stats.completedCounts.h15 || 0) * 25 + 40),
    socrates: clamp((stats.completedCounts.socrates || 0) * 20 + 35),
    occam: clamp((stats.completedCounts.occam || 0) * 25 + 45),
    bias: clamp((stats.completedCounts.bias || 0) * 20 + (stats.totalFallaciesDetected || 0) * 5 + 30),
    path: clamp((stats.pathsExplored || 0) * 40 + 35),
    blitz: clamp(Math.floor((stats.blitzHighScore || 0) / 5) + 30)
  };
}
