import { z } from 'zod';

export type ActiveTab = 
  | 'playground' 
  | 'mindmap' 
  | 'detector' 
  | 'daily' 
  | 'arena'
  | 'blitz'
  | 'diagnostic'
  | 'achievements' 
  | 'roast' 
  | 'business';

export type GameModuleType = 'h15' | 'socrates' | 'occam' | 'bias';

export interface H15SentencePart {
  id: string;
  text: string;
  type: 'fact' | 'assumption';
  explanation: string;
}

export interface H15Challenge {
  id: string;
  title: string;
  context: string;
  statement: string;
  parts: H15SentencePart[];
  keyTakeaway: string;
}

export interface SocraticOption {
  id: string;
  question: string;
  category: 'clarification' | 'hidden_assumption' | 'evidence' | 'implication';
  effectiveness: 'master' | 'moderate' | 'weak';
  feedback: string;
  clarityBonus: number;
}

export interface SocraticChallenge {
  id: string;
  title: string;
  statement: string;
  hiddenPremise: string;
  options: SocraticOption[];
}

export interface OccamHypothesis {
  id: string;
  title: string;
  assumptionCount: number;
  explanatoryPower: number;
  description: string;
  isOccamBest: boolean;
  critique: string;
}

export interface OccamChallenge {
  id: string;
  title: string;
  phenomenon: string;
  hypotheses: OccamHypothesis[];
  idealConclusion: string;
}

export interface BiasMechanism {
  id: string;
  name: string;
  iconName: string;
  description: string;
  triggerCause: string;
}

export interface BiasScenario {
  id: string;
  title: string;
  story: string;
  correctMechanismId: string;
  explanation: string;
  reflectiveQuestion: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'mastery' | 'streak' | 'detector' | 'socrates';
  icon: string;
  requiredCount: number;
  currentCount: number;
  isUnlocked: boolean;
  unlockedAt?: string;
  rewardXP: number;
}

export interface UserStats {
  clarityPoints: number;
  level: number;
  title: string;
  completedCounts: Record<GameModuleType, number>;
  unlockedBadges: string[];
  streakDays: number;
  lastActiveDate: string;
  totalFallaciesDetected: number;
  pathsExplored: number;
  blitzHighScore: number;
  arenaDebatesCompleted: number;
}

export interface ArchitectureRoastTopic {
  id: string;
  title: string;
  subTitle: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  theHypothesis: string;
  theRoast: string;
  thePrescription: string;
  codeSnippets?: {
    bad: string;
    good: string;
  };
}

// 互動式思維路徑圖節點
export interface MindPathNode {
  id: string;
  title: string;
  type: 'root_situation' | 'hypothesis_branch' | 'evidence_check' | 'bias_trap' | 'sound_conclusion';
  description: string;
  assumptionCount?: number;
  evidenceStrength?: 'strong' | 'weak' | 'none';
  hiddenPremise?: string;
  status?: 'active' | 'selected' | 'pruned' | 'verified';
  children?: MindPathNode[];
}

// 思維錯誤偵測器
export interface FallacyDetectionItem {
  id: string;
  matchedText: string;
  fallacyName: string;
  biasMechanism: string;
  severity: 'critical' | 'moderate' | 'subtle';
  analysis: string;
  socraticQuestion: string;
  fixRecommendation: string;
}

export interface FallacyDetectionResult {
  originalText: string;
  clarityScore: number;
  items: FallacyDetectionItem[];
  overallCritique: string;
}

// 每日挑戰
export interface DailyChallengeItem {
  id: string;
  dateStr: string;
  title: string;
  tag: string;
  scenario: string;
  question: string;
  options: {
    id: string;
    text: string;
    isOptimal: boolean;
    explanation: string;
    socraticInsight: string;
  }[];
  bonusXP: number;
}

// 蘇格拉底對辯沙盒
export interface ArenaMessage {
  id: string;
  sender: 'socrates' | 'user';
  text: string;
  hiddenPremiseRevealed?: string;
  fallacyWarning?: string;
  soundnessDelta?: number;
}

export interface SocraticDebateTopic {
  id: string;
  topic: string;
  initialPremise: string;
  socratesOpening: string;
  dialogueTree: {
    round: number;
    expectedAnalysis: string;
    socraticCounter: string;
    revealedAssumption: string;
  }[];
}

// 國家發展委員會 六大核心戰略產業分類
export type StrategicIndustry =
  | 'digital_info'      // 資訊及數位產業
  | 'cyber_security'   // 資安卓越產業
  | 'precision_health' // 臺灣精準健康產業
  | 'green_energy'     // 綠電及再生能源產業
  | 'national_defense' // 國防及戰略產業
  | 'strategic_reserve';// 民生及戰備產業

export interface StrategicIndustryMeta {
  key: StrategicIndustry;
  label: string;
  shortLabel: string;
  iconName: string;
  description: string;
  colorClass: string;
}

// 60秒閃電快問快答
export interface BlitzQuestion {
  id: string;
  statement: string;
  sourceType: 'fact' | 'assumption';
  hint: string;
  biasType?: string;
  industry?: StrategicIndustry;
  industryName?: string;
}

// 離線進度備份包
export interface OfflineBackupData {
  appVersion: string;
  exportDate: string;
  stats: UserStats;
  achievements: Achievement[];
  dailyHistory: string[];
}

// Zod 執行期校驗 Schema
export const UserStatsSchema = z.object({
  clarityPoints: z.number().nonnegative(),
  level: z.number().int().min(1),
  title: z.string(),
  completedCounts: z.object({
    h15: z.number().default(0),
    socrates: z.number().default(0),
    occam: z.number().default(0),
    bias: z.number().default(0)
  }),
  unlockedBadges: z.array(z.string()).default([]),
  streakDays: z.number().default(1),
  lastActiveDate: z.string().default(''),
  totalFallaciesDetected: z.number().default(0),
  pathsExplored: z.number().default(0),
  blitzHighScore: z.number().default(0),
  arenaDebatesCompleted: z.number().default(0)
});

export const AchievementSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.enum(['mastery', 'streak', 'detector', 'socrates']),
  icon: z.string(),
  requiredCount: z.number(),
  currentCount: z.number(),
  isUnlocked: z.boolean(),
  unlockedAt: z.string().optional(),
  rewardXP: z.number()
});

export const OfflineBackupDataSchema = z.object({
  appVersion: z.string(),
  exportDate: z.string(),
  stats: UserStatsSchema,
  achievements: z.array(AchievementSchema),
  dailyHistory: z.array(z.string()).default([])
});
