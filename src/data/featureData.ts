import {
  Achievement,
  MindPathNode,
  DailyChallengeItem,
  BlitzQuestion,
  SocraticDebateTopic
} from '../types';

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-first-h15',
    title: '手術刀出鞘',
    description: '完成第一次 H15 論證零件拆解，成功分離事實與腦補',
    category: 'mastery',
    icon: 'Scissors',
    requiredCount: 1,
    currentCount: 0,
    isUnlocked: false,
    rewardXP: 30
  },
  {
    id: 'ach-socrates-master',
    title: '產婆術宗師',
    description: '在蘇格拉底提問引擎中累計挑中 3 次「宗師級提問」',
    category: 'socrates',
    icon: 'HelpCircle',
    requiredCount: 3,
    currentCount: 0,
    isUnlocked: false,
    rewardXP: 60
  },
  {
    id: 'ach-occam-blade',
    title: '剃刀行者',
    description: '揮動奧坎剃刀，成功剔除 3 次冗餘戲劇化假設',
    category: 'mastery',
    icon: 'ScissorsLineDashed',
    requiredCount: 3,
    currentCount: 0,
    isUnlocked: false,
    rewardXP: 60
  },
  {
    id: 'ach-bias-detective',
    title: '心智照妖鏡',
    description: '在偏誤偵探社精準識破 3 種底層心理捷徑',
    category: 'detector',
    icon: 'Search',
    requiredCount: 3,
    currentCount: 0,
    isUnlocked: false,
    rewardXP: 60
  },
  {
    id: 'ach-arena-champion',
    title: '雅典辯護者',
    description: '在蘇格拉底對辯沙盒中完成一場完整的深度哲學反詰交鋒',
    category: 'socrates',
    icon: 'Swords',
    requiredCount: 1,
    currentCount: 0,
    isUnlocked: false,
    rewardXP: 80
  },
  {
    id: 'ach-blitz-master',
    title: '閃電辨析神經',
    description: '在 60 秒閃電快問快答中斬獲超過 500 分',
    category: 'mastery',
    icon: 'Zap',
    requiredCount: 500,
    currentCount: 0,
    isUnlocked: false,
    rewardXP: 70
  },
  {
    id: 'ach-daily-streak',
    title: '晨曦清醒者',
    description: '完成今日的「每日思維挑戰」，保持大腦內觀紀律',
    category: 'streak',
    icon: 'Sun',
    requiredCount: 1,
    currentCount: 0,
    isUnlocked: false,
    rewardXP: 50
  },
  {
    id: 'ach-path-explorer',
    title: '思維路徑製圖師',
    description: '在互動式思維路徑圖中完整探索一條決策演化分支',
    category: 'mastery',
    icon: 'GitBranch',
    requiredCount: 1,
    currentCount: 0,
    isUnlocked: false,
    rewardXP: 45
  },
  {
    id: 'ach-fallacy-hunter',
    title: '邏輯特警隊長',
    description: '使用思維錯誤偵測器成功抓出 5 處邏輯謬誤與認知盲點',
    category: 'detector',
    icon: 'AlertTriangle',
    requiredCount: 5,
    currentCount: 0,
    isUnlocked: false,
    rewardXP: 75
  }
];

// 蘇格拉底對辯沙盒預設主題
export const ARENA_TOPICS: SocraticDebateTopic[] = [
  {
    id: 'topic-microservices',
    topic: '技術架構盲從：公司技術團隊必須全面拆分成微服務架構',
    initialPremise: '我認為只要把現在的單體（Monolith）全部拆成微服務，團隊開發效率就一定能提升十倍，因為 Netflix 和 Google 都是這麼做的！',
    socratesOpening: '「朋友，請教你：當你說『開發效率提升十倍』時，你所定義的『效率』，是指單一功能的交付週期，還是指整個系統在網路通訊、日誌追蹤與分散式一致性下的總維護成本？」',
    dialogueTree: [
      {
        round: 1,
        expectedAnalysis: '承認需要考慮網路與分散式事務複雜度',
        socraticCounter: '「既然分散式通訊會帶來延遲與故障點，那麼請教：你憑什麼相信貴團隊目前的 5 人工程編制，能夠以低於單體架構的心智負擔來駕馭 20 個獨立容器的部署監控？」',
        revealedAssumption: '隱含前提：盲目假設團隊的 DevOps 與維運治理成熟度等同於幾千人的矽谷大廠。'
      },
      {
        round: 2,
        expectedAnalysis: '發現根因在於模組邊界不清而非架構型態',
        socraticCounter: '「如果代碼混亂的根因在於業務領域（Domain）沒有劃分清晰，那麼把混沌的單體硬拆成微服務，得到的是清晰的架構，還是『分散式大泥球（Distributed Big Ball of Mud）』？」',
        revealedAssumption: '隱含前提：誤以為網路邊界可以自動代替代碼的邏輯模組化約束。'
      },
      {
        round: 3,
        expectedAnalysis: '重構為穩健假設：先做好模組化單體，再於瓶頸處逐步拆分',
        socraticCounter: '「善哉！你看，當我們剔除了『Netflix做我也必須做』的權威偏誤後，真正的路徑是否成了：『先理清模組依賴，在吞吐量出現真實瓶頸的邊界局部解耦』？」',
        revealedAssumption: '穩健推論建立完成！'
      }
    ]
  },
  {
    id: 'topic-overtime',
    topic: '專案管理迷思：只要大家願意週末全體加班，落後的時程就一定能補回來',
    initialPremise: '時程已經落後三週，只要我們宣布全體取消休假衝刺兩週，專案就能按原定計畫準時驗收！',
    socratesOpening: '「請教你：軟體專案的進度產出，主要取決於『純工時長度』，還是取決於『決策精確度與無重大缺陷的代碼品質』？」',
    dialogueTree: [
      {
        round: 1,
        expectedAnalysis: '思考疲勞工時與 Bug 率的關係',
        socraticCounter: '「若人在連續高壓疲倦狀態下，思維認知能力下降，引入致命 Bug 的機率翻倍，那麼這兩週寫出的代碼，究竟是在加快進度，還是在為下週埋下更嚴重的停機炸彈？」',
        revealedAssumption: '隱含前提：假設腦力知識工作的生產力等於工廠流水線組裝工時（人月神話盲區）。'
      },
      {
        round: 2,
        expectedAnalysis: '意識到應該砍需求 Scope 而非壓榨工時',
        socraticCounter: '「在不變更交期的客觀硬限制下，究竟是誠實砍除非核心需求（奧坎剃刀），還是假裝一切順利並把缺陷留給上線日的真實用戶更負責任？」',
        revealedAssumption: '隱含前提：損失規避恐慌導致無法向利害關係人誠實說明專案現況。'
      }
    ]
  }
];

// 60 秒閃電快問快答題庫
export const BLITZ_QUESTIONS_POOL: BlitzQuestion[] = [
  {
    id: 'b-1',
    statement: '這套系統昨天的 99.9% 請求響應時間（P99）是 142 毫秒。',
    sourceType: 'fact',
    hint: '具有可度量指標與時間日誌支撐，為客觀可檢驗事實。'
  },
  {
    id: 'b-2',
    statement: '小李今天開會一直不發言，一定是對我的技術架構提案非常不滿。',
    sourceType: 'assumption',
    hint: '腦補推測！將沈默直接歸因為反對，缺乏實證（也可能只是身體不適）。'
  },
  {
    id: 'b-3',
    statement: '新功能上線後第一週的活躍用戶留存率為 24%。',
    sourceType: 'fact',
    hint: '屬於資料庫查詢產出之客觀數據。'
  },
  {
    id: 'b-4',
    statement: '我們如果不立刻採用 AI 寫代碼，公司六個月內一定會破產倒閉。',
    sourceType: 'assumption',
    hint: '滑坡謬誤！建立未經證實的極端必死因果鏈。'
  },
  {
    id: 'b-5',
    statement: '只要把按鈕顏色改成橘色，用戶的點擊購買率一定會翻倍。',
    sourceType: 'assumption',
    hint: '單一因果腦補！忽視產品定價、信任感與核心需求。'
  },
  {
    id: 'b-6',
    statement: '目前伺服器 CPU 使用率連續 30 分鐘維持在 92% 以上。',
    sourceType: 'fact',
    hint: '系統監控指標數據，為確切事實。'
  },
  {
    id: 'b-7',
    statement: '他有十年工作經驗，所以他在資料庫設計上的決策絕對不會出錯。',
    sourceType: 'assumption',
    hint: '訴諸權威！年資長不代表特定場景下的方案必然最優。'
  },
  {
    id: 'b-8',
    statement: '今天下午兩點有 3 位付費用戶在客服表單回報無法結帳。',
    sourceType: 'fact',
    hint: '具有工單紀錄之客觀事件。'
  },
  {
    id: 'b-9',
    statement: '那家競爭對手之所以拿到融資，肯定全靠花言巧語騙投資人。',
    sourceType: 'assumption',
    hint: '酸葡萄心態與動機揣測，缺乏審查資料依據。'
  },
  {
    id: 'b-10',
    statement: '我們已經在這個舊架構上花了兩年心血，現在換掉就是虧大了。',
    sourceType: 'assumption',
    hint: '沉沒成本謬誤！決策應評估未來邊際回報而非過往沉沒代價。'
  },
  {
    id: 'b-11',
    statement: '這支 API 在壓力測試達到 5,000 QPS 時回傳 HTTP 504 逾時錯誤。',
    sourceType: 'fact',
    hint: '壓力測試壓測報告具體紀錄，屬於客觀事實。'
  },
  {
    id: 'b-12',
    statement: '客戶遲遲不簽合約，一定是在等競爭對手給更低的報價。',
    sourceType: 'assumption',
    hint: '隱含假設！客戶可能只是內部法務審核流程延誤。'
  }
];

// 互動式思維路徑圖案例
export const MIND_PATH_SCENARIOS: {
  id: string;
  title: string;
  scenario: string;
  root: MindPathNode;
}[] = [
  {
    id: 'path-microfrontends',
    title: '架構重構歧路：我們該重構成微前端 (Micro-frontends) 嗎？',
    scenario: '跨部門大型應用隨著頁面膨脹，發布頻率由每日一次驟降為每週一次。架構委員會提出提案：「全面拆分微前端，以獲得獨立部署的最佳擴展性」。請沿著思維路徑推演，檢視各假說與隱含前提：',
    root: {
      id: 'root',
      title: '起點：發布頻率延宕，是否拆分微前端？',
      type: 'root_situation',
      description: '客觀事實：發布頻率由每日降為每週。問題是：根因真的是單體代碼衝突，還是 CI/CD 與測試流暢度問題？',
      children: [
        {
          id: 'hyp-1',
          title: '假說 A：拆分 12 個獨立子應用，每隊獨立部署',
          type: 'hypothesis_branch',
          description: '主張徹底解耦，各組技術棧自主，各發各的。',
          assumptionCount: 4,
          hiddenPremise: '隱含前提：假設團隊有成熟的跨應用共享狀態、統一 CSS 隔離與嚴格的依賴版本治理能力。',
          children: [
            {
              id: 'bias-1',
              title: '偏誤陷阱：炒作驅動與可用性捷徑',
              type: 'bias_trap',
              description: '受到大廠技術博客煽動，將特定規模下的解法當作通用真理，忽略自家團隊 DevOps 能量。',
              children: [
                {
                  id: 'concl-1',
                  title: '推演結局：維護災難與割裂（奧坎剃刀剃除 ❌）',
                  type: 'sound_conclusion',
                  description: '額外假設過多，引入巨大的運行期沙盒開銷、樣式污染與跨應用通信死鎖，發布不但沒變快，除錯成本反而翻倍！'
                }
              ]
            }
          ]
        },
        {
          id: 'hyp-2',
          title: '假說 B：審查現有單體，先優化測試管線與模組邊界',
          type: 'hypothesis_branch',
          description: '先不急著拆服務，透過靜態分析（Nx / Turborepo）進行受影響測試（Affected Test）並切分業務 Domain。',
          assumptionCount: 1,
          hiddenPremise: '隱含前提：目前的瓶頸主要在於全量端對端測試耗時 45 分鐘，而非單體本身架構無法承受。',
          children: [
            {
              id: 'evid-2',
              title: '證據檢驗：排查 CI 瓶頸歷程日誌',
              type: 'evidence_check',
              evidenceStrength: 'strong',
              description: '數據證實：85% 的延宕時間消耗在未平行化的 Docker 建置與慢速 E2E 測試，代碼合併衝突僅佔 5%。',
              children: [
                {
                  id: 'concl-2',
                  title: '推演結局：高投資報酬率的穩健收斂（奧坎剃刀首選 ✅）',
                  type: 'sound_conclusion',
                  description: '假設最少、直接對準瓶頸事實！用 1/10 的工時優化 Pipeline，發布週期立即恢復至每日交付。'
                }
              ]
            }
          ]
        },
        {
          id: 'hyp-3',
          title: '假說 C：僅針對獨立演進的「後台報表模組」做隔離試點',
          type: 'hypothesis_branch',
          description: '妥協方案：不全面鋪開，只把頻繁變動且權限隔離的報表模組拆為 Sub-app。',
          assumptionCount: 2,
          hiddenPremise: '隱含前提：報表模組的商業變更與核心交易流無強烈狀態交互。',
          children: [
            {
              id: 'evid-3',
              title: '證據檢驗：業務耦合度度量',
              type: 'evidence_check',
              evidenceStrength: 'strong',
              description: '依賴分析顯示：報表只透過唯讀 API 通訊，完全無前端即時狀態共享負擔。',
              children: [
                {
                  id: 'concl-3',
                  title: '推演結局：受控風險下的漸進架構演進（可行備案 ⚖️）',
                  type: 'sound_conclusion',
                  description: '在特定邊界內驗證微前端技術棧，避免全面重構引發的全系統停擺風險。'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    id: 'path-pricing-drop',
    title: '營運危機推演：新功能轉換率驟降 30%，該立刻降價促銷嗎？',
    scenario: '付費專區上線第二週，結帳轉換率由 5.2% 掉至 3.6%。行銷總監提議：「啟動全面 5 折促銷，因為價格是用戶唯一顧慮。」請推演各假設路徑：',
    root: {
      id: 'root-pricing',
      title: '起點：新功能轉換率下滑，行銷主張半價促銷',
      type: 'root_situation',
      description: '客觀事實：轉換率 3.6%。問題是：用戶不買真的是因為貴嗎？還是功能根本沒打中痛點？',
      children: [
        {
          id: 'h-price',
          title: '假說 A：全面下殺 5 折促銷',
          type: 'hypothesis_branch',
          description: '認定價格彈性極高，薄利多銷能拉回總營收。',
          assumptionCount: 3,
          hiddenPremise: '隱含前提：假設新用戶對產品價值充分認同，僅卡在支付門檻。',
          children: [
            {
              id: 'b-price',
              title: '偏誤陷阱：損失規避與快速捷徑',
              type: 'bias_trap',
              description: '在時間壓迫與業績下滑焦慮下，大腦選擇最直接、最不需要思考的「降價」手段。',
              children: [
                {
                  id: 'c-price',
                  title: '推演結局：品牌價值受損與毛利崩潰（奧坎剃刀剃除 ❌）',
                  type: 'sound_conclusion',
                  description: '促銷吸引來羊毛黨用戶，次月留存率跌至谷底，原付費核心用戶感覺被背刺，營收永久性受損。'
                }
              ]
            }
          ]
        },
        {
          id: 'h-funnel',
          title: '假說 B：檢查漏斗各步驟，訪談放棄購買的用戶',
          type: 'hypothesis_branch',
          description: '先看數據是哪一步流失，問「我憑什麼相信是價格問題？」',
          assumptionCount: 1,
          hiddenPremise: '隱含前提：轉換率下滑可能出在結帳流程 UX 障礙或第三方支付失敗。',
          children: [
            {
              id: 'e-funnel',
              title: '證據檢驗：埋點分析與用戶訪談',
              type: 'evidence_check',
              evidenceStrength: 'strong',
              description: '驚人發現：在 iOS 瀏覽器上，新支付按鈕被底部的 Cookie 提示遮擋，用戶根本點不到結帳鍵！',
              children: [
                {
                  id: 'c-funnel',
                  title: '推演結局：修復 1 行 CSS，轉換率瞬間回升（奧坎剃刀首選 ✅）',
                  type: 'sound_conclusion',
                  description: '不加多餘假設，回歸事實數據，避免了損失幾百萬利潤的盲目打折悲劇。'
                }
              ]
            }
          ]
        }
      ]
    }
  }
];

// 思維錯誤偵測器預設案例
export const PRESET_DETECTOR_SNIPPETS = [
  {
    title: '專案管理與時程卸責案例',
    text: '這次專案如果不在這週五前把所有功能一次推上正式機，我們下季度的考績就會全體拿丙等，而且客戶一定會取消所有合約轉向對手。再說，上一季我們加班衝刺就成功了，所以這次只要大家週末全體加班兩天，所有的 Bug 就會自然迎刃而解！'
  },
  {
    title: '技術選型熱度膨脹論述',
    text: '矽谷所有大公司現在都把舊系統全部廢棄改寫成 Rust，我們如果不立刻把後端 Node.js 系統砍掉重寫，就是食古不化等死。我們工程師說寫 Rust 程式碼行數少性能好，況且我們已經花了三週開會討論，現在放棄討論之前的心血就全白費了。'
  },
  {
    title: '行銷與商業轉化妄想',
    text: '用戶不用我們的 App 只有一個原因，就是功能還不夠多。只要我們在下一版把短影音、社交圈、AI 寫作和商城全部塞進去，日活用戶一定會呈現指數型幾何級爆發，就像當年微信一樣！'
  }
];

// 每日挑戰題庫
export const DAILY_CHALLENGES: DailyChallengeItem[] = [
  {
    id: 'daily-2026-09-11',
    dateStr: '2026-09-11',
    title: '週五生產環境事故的責任審判',
    tag: '批判性思考 • 歸因偏差',
    scenario: '週五下午 5 點，核心資料庫突然出現連線池耗盡警報。資深維運工程師小明立刻在 Slack 群組發言：「一定是剛上線的新人寫了爛 SQL，每次只要新人發布就會把系統搞掛，建議立刻撤銷所有新人的發布權限！」',
    question: '身為具備 AWAKE 清醒術的團隊領導者，你在「聽看停」之後，第一時間該祭出的蘇格拉底提問是什麼？',
    bonusXP: 60,
    options: [
      {
        id: 'opt-1',
        text: '「小明說得對，新人確實經驗不足，先關閉新人權限避免週末加班。」',
        isOptimal: false,
        explanation: '陷入基本歸因謬誤與確認偏誤，直接將系統架構問題甩鍋給個人身分，未尋求客觀日誌證據。',
        socraticInsight: '這是在「挑毛病」與順從偏見，完全違背了批判性思考的紀律。'
      },
      {
        id: 'opt-2',
        text: '「小明，在怪罪新人之前，你憑什麼保證你自己寫的代碼永遠沒有 Bug？」',
        isOptimal: false,
        explanation: '訴諸人身反擊，激化情緒對立，無法引導出隱藏的事實與架構瓶頸。',
        socraticInsight: '情緒性互嗆並非蘇格拉底產婆術，而是無效的職場攻訐。'
      },
      {
        id: 'opt-3',
        text: '「我們憑什麼斷定是新人引發的？慢查詢日誌中耗盡連線池的具體 SQL Fingerprint 是哪一條？上游是否有促銷流量突然激增？」',
        isOptimal: true,
        explanation: '完美的批判性思考！立即暫停主觀歸因，追問客觀證據鏈（SQL 指紋與外部流量），迫使討論回到事實本身。',
        socraticInsight: '用結構化提問逼出隱含假設，在證據改變前絕不下主觀定論。'
      }
    ]
  },
  {
    id: 'daily-2026-09-12',
    dateStr: '2026-09-12',
    title: '奧坎剃刀與辦公室神秘斷網案',
    tag: '奧坎剃刀 • 假設簡約性',
    scenario: '辦公室全體 WiFi 突然斷線，內網與外網均無法訪問。同事甲：「肯定是隔壁商業間諜公司啟動了全頻段電磁干擾器在刺探我們機密！」同事乙：「會不會是外面大馬路施工挖斷了中華電信的主幹光纖，或者總機房核心交換機電源插頭被清潔阿姨踢掉了？」',
    question: '依照奧坎剃刀原則（在解釋力相近時選擇假設較少、較簡單的解釋），你應該優先驗證哪一個方向？',
    bonusXP: 60,
    options: [
      {
        id: 'opt-1',
        text: '相信同事甲，立刻報警並通知國安部門調查商業間諜電磁武器。',
        isOptimal: false,
        explanation: '嚴重違反奧坎剃刀！加入太多缺乏證據的戲劇化假設（間諜、高科技電磁槍、精確針對）。',
        socraticInsight: '不要用陰謀論解釋可以用單純意外解釋的事情。'
      },
      {
        id: 'opt-2',
        text: '優先檢查總機房交換機電源與數據機亮燈狀態，並向大樓物業確認施工情況。',
        isOptimal: true,
        explanation: '符合奧坎剃刀核心！僅需 1~2 個日常常見假設（插頭鬆脫或光纖施工），且解釋力高達 99%。',
        socraticInsight: '不是越簡單越正確，而是絕不平白增加不必要的額外假設。'
      }
    ]
  }
];
