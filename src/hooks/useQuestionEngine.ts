import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  H15Challenge,
  SocraticChallenge,
  OccamChallenge,
  BiasScenario,
  BlitzQuestion,
  DailyChallengeItem,
  SocraticDebateTopic,
  StrategicIndustry
} from '../types';
import {
  H15_CHALLENGES,
  SOCRATIC_CHALLENGES,
  OCCAM_CHALLENGES,
  BIAS_SCENARIOS
} from '../data/learningData';
import {
  BLITZ_QUESTIONS_POOL,
  DAILY_CHALLENGES,
  ARENA_TOPICS,
  PRESET_DETECTOR_SNIPPETS
} from '../data/featureData';
import { shuffleArray } from '../utils/engine';

const STORAGE_KEY_SEEN_QUESTIONS = 'awake_seen_questions_v1';

export interface SeenQuestionsState {
  h15: string[];
  socratic: string[];
  occam: string[];
  bias: string[];
  blitz: string[];
  daily: string[];
  arena: string[];
}

const DEFAULT_SEEN_STATE: SeenQuestionsState = {
  h15: [],
  socratic: [],
  occam: [],
  bias: [],
  blitz: [],
  daily: [],
  arena: []
};

/**
 * 全域題庫統一隨機分佈與不重複排程 Engine
 * 1. 題庫有多少就用多少，保證覆蓋全部題庫
 * 2. 跨題型均勻隨機打亂（Fisher-Yates 洗牌）
 * 3. 避免題目重複出現，紀錄已完成/已見題目 ID
 * 4. 當某一題型的題庫全部答完時，觸發無縫循環重置並重新洗牌，並提供重置控制
 */
export function useQuestionEngine() {
  // 載入 localStorage 中的已作答紀錄
  const [seenIds, setSeenIds] = useState<SeenQuestionsState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SEEN_QUESTIONS);
      if (saved) {
        return { ...DEFAULT_SEEN_STATE, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Failed to parse seen questions state', e);
    }
    return DEFAULT_SEEN_STATE;
  });

  // 持久化已作答紀錄
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SEEN_QUESTIONS, JSON.stringify(seenIds));
    } catch (e) {
      console.error('Failed to save seen questions state', e);
    }
  }, [seenIds]);

  // 1. H15 隨機分佈佇列
  const [h15Queue, setH15Queue] = useState<H15Challenge[]>(() => {
    return shuffleArray(H15_CHALLENGES);
  });
  const [h15Cursor, setH15Cursor] = useState(0);

  // 2. Socratic 隨機分佈佇列
  const [socraticQueue, setSocraticQueue] = useState<SocraticChallenge[]>(() => {
    return shuffleArray(SOCRATIC_CHALLENGES);
  });
  const [socraticCursor, setSocraticCursor] = useState(0);

  // 3. Occam 隨機分佈佇列
  const [occamQueue, setOccamQueue] = useState<OccamChallenge[]>(() => {
    return shuffleArray(OCCAM_CHALLENGES);
  });
  const [occamCursor, setOccamCursor] = useState(0);

  // 4. Bias 隨機分佈佇列
  const [biasQueue, setBiasQueue] = useState<BiasScenario[]>(() => {
    return shuffleArray(BIAS_SCENARIOS);
  });
  const [biasCursor, setBiasCursor] = useState(0);

  // 5. Daily 隨機分佈佇列
  const [dailyQueue, setDailyQueue] = useState<DailyChallengeItem[]>(() => {
    return shuffleArray(DAILY_CHALLENGES);
  });
  const [dailyCursor, setDailyCursor] = useState(0);

  // 6. Arena 隨機分佈佇列
  const [arenaQueue, setArenaQueue] = useState<SocraticDebateTopic[]>(() => {
    return shuffleArray(ARENA_TOPICS);
  });
  const [arenaCursor, setArenaCursor] = useState(0);

  // 標記題目為已作答
  const markAsSeen = useCallback((type: keyof SeenQuestionsState, id: string) => {
    setSeenIds((prev) => {
      if (prev[type].includes(id)) return prev;
      return {
        ...prev,
        [type]: [...prev[type], id]
      };
    });
  }, []);

  // 重置題庫歷史紀錄（允許使用者隨時重新來過）
  const resetQuestionHistory = useCallback(() => {
    setSeenIds(DEFAULT_SEEN_STATE);
    setH15Queue(shuffleArray(H15_CHALLENGES));
    setH15Cursor(0);
    setSocraticQueue(shuffleArray(SOCRATIC_CHALLENGES));
    setSocraticCursor(0);
    setOccamQueue(shuffleArray(OCCAM_CHALLENGES));
    setOccamCursor(0);
    setBiasQueue(shuffleArray(BIAS_SCENARIOS));
    setBiasCursor(0);
    setDailyQueue(shuffleArray(DAILY_CHALLENGES));
    setDailyCursor(0);
    setArenaQueue(shuffleArray(ARENA_TOPICS));
    setArenaCursor(0);
    try {
      localStorage.removeItem(STORAGE_KEY_SEEN_QUESTIONS);
    } catch (e) {
      console.error(e);
    }
  }, []);

  // 取得下一個 H15 題目（不重複，循環前洗牌）
  const nextH15Question = useCallback(() => {
    setH15Cursor((prevCursor) => {
      const nextIdx = prevCursor + 1;
      if (nextIdx >= h15Queue.length) {
        // 題庫已全部用過一輪，重新洗牌開啟新一輪
        setH15Queue(shuffleArray(H15_CHALLENGES));
        return 0;
      }
      return nextIdx;
    });
  }, [h15Queue.length]);

  // 取得下一個 Socratic 題目
  const nextSocraticQuestion = useCallback(() => {
    setSocraticCursor((prevCursor) => {
      const nextIdx = prevCursor + 1;
      if (nextIdx >= socraticQueue.length) {
        setSocraticQueue(shuffleArray(SOCRATIC_CHALLENGES));
        return 0;
      }
      return nextIdx;
    });
  }, [socraticQueue.length]);

  // 取得下一個 Occam 題目
  const nextOccamQuestion = useCallback(() => {
    setOccamCursor((prevCursor) => {
      const nextIdx = prevCursor + 1;
      if (nextIdx >= occamQueue.length) {
        setOccamQueue(shuffleArray(OCCAM_CHALLENGES));
        return 0;
      }
      return nextIdx;
    });
  }, [occamQueue.length]);

  // 取得下一個 Bias 題目
  const nextBiasQuestion = useCallback(() => {
    setBiasCursor((prevCursor) => {
      const nextIdx = prevCursor + 1;
      if (nextIdx >= biasQueue.length) {
        setBiasQueue(shuffleArray(BIAS_SCENARIOS));
        return 0;
      }
      return nextIdx;
    });
  }, [biasQueue.length]);

  // 取得下一個 Daily 題目
  const nextDailyQuestion = useCallback(() => {
    setDailyCursor((prevCursor) => {
      const nextIdx = prevCursor + 1;
      if (nextIdx >= dailyQueue.length) {
        setDailyQueue(shuffleArray(DAILY_CHALLENGES));
        return 0;
      }
      return nextIdx;
    });
  }, [dailyQueue.length]);

  // 取得下一個 Arena 主題
  const nextArenaTopic = useCallback(() => {
    setArenaCursor((prevCursor) => {
      const nextIdx = prevCursor + 1;
      if (nextIdx >= arenaQueue.length) {
        setArenaQueue(shuffleArray(ARENA_TOPICS));
        return 0;
      }
      return nextIdx;
    });
  }, [arenaQueue.length]);

  // 當前題目指標
  const currentH15 = h15Queue[h15Cursor] || H15_CHALLENGES[0];
  const currentSocratic = socraticQueue[socraticCursor] || SOCRATIC_CHALLENGES[0];
  const currentOccam = occamQueue[occamCursor] || OCCAM_CHALLENGES[0];
  const currentBias = biasQueue[biasCursor] || BIAS_SCENARIOS[0];
  const currentDaily = dailyQueue[dailyCursor] || DAILY_CHALLENGES[0];
  const currentArena = arenaQueue[arenaCursor] || ARENA_TOPICS[0];

  // 快問快答專用生成器：在指定產業（或全部）下，保證不重複且完全隨機均勻洗牌
  const getShuffledBlitzPool = useCallback(
    (industry: StrategicIndustry | 'all') => {
      let pool = BLITZ_QUESTIONS_POOL;
      if (industry !== 'all') {
        pool = BLITZ_QUESTIONS_POOL.filter((q) => q.industry === industry);
      }
      return shuffleArray(pool);
    },
    []
  );

  // 題庫統計總計量
  const bankStats = useMemo(() => {
    const totalBlitz = BLITZ_QUESTIONS_POOL.length;
    const totalH15 = H15_CHALLENGES.length;
    const totalSocratic = SOCRATIC_CHALLENGES.length;
    const totalOccam = OCCAM_CHALLENGES.length;
    const totalBias = BIAS_SCENARIOS.length;
    const totalDaily = DAILY_CHALLENGES.length;
    const totalArena = ARENA_TOPICS.length;
    const totalSnippets = PRESET_DETECTOR_SNIPPETS.length;
    const totalGrand =
      totalBlitz +
      totalH15 +
      totalSocratic +
      totalOccam +
      totalBias +
      totalDaily +
      totalArena +
      totalSnippets;

    return {
      totalGrand,
      totalBlitz,
      totalH15,
      totalSocratic,
      totalOccam,
      totalBias,
      totalDaily,
      totalArena,
      totalSnippets,
      seenCounts: {
        h15: seenIds.h15.length,
        socratic: seenIds.socratic.length,
        occam: seenIds.occam.length,
        bias: seenIds.bias.length,
        blitz: seenIds.blitz.length,
        daily: seenIds.daily.length,
        arena: seenIds.arena.length
      }
    };
  }, [seenIds]);

  return {
    // 題目佇列與指標
    currentH15,
    h15Cursor,
    h15Total: h15Queue.length,
    nextH15Question,

    currentSocratic,
    socraticCursor,
    socraticTotal: socraticQueue.length,
    nextSocraticQuestion,

    currentOccam,
    occamCursor,
    occamTotal: occamQueue.length,
    nextOccamQuestion,

    currentBias,
    biasCursor,
    biasTotal: biasQueue.length,
    nextBiasQuestion,

    currentDaily,
    dailyCursor,
    dailyTotal: dailyQueue.length,
    nextDailyQuestion,

    currentArena,
    arenaCursor,
    arenaTotal: arenaQueue.length,
    nextArenaTopic,

    getShuffledBlitzPool,
    markAsSeen,
    resetQuestionHistory,
    seenIds,
    bankStats
  };
}
