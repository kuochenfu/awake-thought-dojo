import { BlitzQuestion, StrategicIndustryMeta, StrategicIndustry } from '../types';

export const STRATEGIC_INDUSTRIES: StrategicIndustryMeta[] = [
  {
    key: 'digital_info',
    label: '資訊及數位產業',
    shortLabel: '資訊數位',
    iconName: 'Cpu',
    description: '研發新世代半導體技術、推動AIoT（人工智慧物聯網）應用與籌組5G國家隊。',
    colorClass: 'from-blue-500/20 to-indigo-500/20 border-blue-500/40 text-blue-400'
  },
  {
    key: 'cyber_security',
    label: '資安卓越產業',
    shortLabel: '資安卓越',
    iconName: 'ShieldCheck',
    description: '強化5G與半導體防護技術，並建立資安攻防及跨國合作機構。',
    colorClass: 'from-purple-500/20 to-violet-500/20 border-purple-500/40 text-purple-400'
  },
  {
    key: 'precision_health',
    label: '臺灣精準健康產業',
    shortLabel: '精準健康',
    iconName: 'HeartPulse',
    description: '建構基因與健保巨量資料庫，發展精準預防、診斷及防疫產品。',
    colorClass: 'from-rose-500/20 to-pink-500/20 border-rose-500/40 text-rose-400'
  },
  {
    key: 'green_energy',
    label: '綠電及再生能源產業',
    shortLabel: '綠電能創',
    iconName: 'Leaf',
    description: '推動太陽光電、風力發電等綠能科技與相關基礎設施。',
    colorClass: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-400'
  },
  {
    key: 'national_defense',
    label: '國防及戰略產業',
    shortLabel: '國防戰略',
    iconName: 'Crosshair',
    description: '推動航空、船艦等國防自主，發展軍民通用先進科技。',
    colorClass: 'from-amber-500/20 to-orange-500/20 border-amber-500/40 text-amber-400'
  },
  {
    key: 'strategic_reserve',
    label: '民生及戰備產業',
    shortLabel: '民生戰備',
    iconName: 'Boxes',
    description: '確保醫療製藥、關鍵民生物資與關鍵電子零組件的自主供應與應變能力。',
    colorClass: 'from-cyan-500/20 to-sky-500/20 border-cyan-500/40 text-cyan-400'
  }
];

// 國發會六大核心戰略產業 60 題批判性思維辨析庫（每產業嚴謹收錄 10 題：5 客觀事實 vs 5 隱含假設/邏輯盲點）
export const STRATEGIC_INDUSTRY_QUESTIONS: BlitzQuestion[] = [
  // ==========================================
  // 1. 資訊及數位產業 (10 題)
  // ==========================================
  {
    id: 'ind-dig-1',
    industry: 'digital_info',
    industryName: '資訊及數位產業',
    statement: '台積電在 2 奈米節點全面導入 GAA（全環繞閘極電晶體）架構，並於新竹寶山與高雄廠規劃量產產能。',
    sourceType: 'fact',
    hint: '半導體製程藍圖與廠區公開規劃，具客觀工程規格依據。'
  },
  {
    id: 'ind-dig-2',
    industry: 'digital_info',
    industryName: '資訊及數位產業',
    statement: '只要政府大力補助購買 GPU 算力，台灣所有製造業中小企業就能在一年內全面實現獲利倍增。',
    sourceType: 'assumption',
    hint: '過度樂觀假設！無視企業內部資料品質、流程治理與商業模式成熟度。'
  },
  {
    id: 'ind-dig-3',
    industry: 'digital_info',
    industryName: '資訊及數位產業',
    statement: '經濟部技術處推動的 5G 開放式架構（O-RAN）互通測試實驗室，已通過多項跨廠牌端到端封包連線驗證。',
    sourceType: 'fact',
    hint: '國家標準實驗室與技術處公佈之測試數據，屬於可檢驗事實。'
  },
  {
    id: 'ind-dig-4',
    industry: 'digital_info',
    industryName: '資訊及數位產業',
    statement: '邊緣 AIoT 晶片算力越高越好，在智慧工廠佈署時散熱功耗與維護成本根本不需要優先列入權衡。',
    sourceType: 'assumption',
    hint: '盲目指標崇拜！工廠端極度講求功耗、熱穩定性與長期 MTBF 壽命。'
  },
  {
    id: 'ind-dig-5',
    industry: 'digital_info',
    industryName: '資訊及數位產業',
    statement: '矽光子（Silicon Photonics）技術將光電元件整合於晶片，旨在突破傳統銅導線的頻寬與高熱能耗瓶頸。',
    sourceType: 'fact',
    hint: '物理特性與半導體先進封裝之客觀技術定義。'
  },
  {
    id: 'ind-dig-6',
    industry: 'digital_info',
    industryName: '資訊及數位產業',
    statement: '只要我們搶先成立 5G 專網國家隊，國外所有電信營運商就一定會放棄既有供應鏈改買台灣整套方案。',
    sourceType: 'assumption',
    hint: '一廂情願推論！忽略國際電信生態系之既有長期合約、在地化法規與認證壁壘。'
  },
  {
    id: 'ind-dig-7',
    industry: 'digital_info',
    industryName: '資訊及數位產業',
    statement: '台灣晶圓代工在全球先進製程（7奈米以下）市占率長期超過 60%，形成全球高階運算供應鏈核心。',
    sourceType: 'fact',
    hint: '國內外研調機構（如 TrendForce、Gartner）長期統計之市場客觀事實。'
  },
  {
    id: 'ind-dig-8',
    industry: 'digital_info',
    industryName: '資訊及數位產業',
    statement: '量子運算成熟後，所有現行半導體晶片製造商必定會在三年內全面失去市場價值而破產。',
    sourceType: 'assumption',
    hint: '滑坡謬誤與偽二元對立！量子運算與古典數位運算屬於互補協同，而非全然替代。'
  },
  {
    id: 'ind-dig-9',
    industry: 'digital_info',
    industryName: '資訊及數位產業',
    statement: 'AI 模型推論晶片在伺服器端目前普遍採用 HBM（高頻寬記憶體）以降低記憶體牆（Memory Wall）瓶頸。',
    sourceType: 'fact',
    hint: '伺服器架構與微電子硬體客觀設計規範。'
  },
  {
    id: 'ind-dig-10',
    industry: 'digital_info',
    industryName: '資訊及數位產業',
    statement: '只要我們把產品名字冠上「AIoT 智慧賦能」，消費者就會心甘情願支付三倍以上的溢價。',
    sourceType: 'assumption',
    hint: '典型行銷虛榮腦補！忽視產品實質痛點解決能力與使用者體驗。'
  },

  // ==========================================
  // 2. 資安卓越產業 (10 題)
  // ==========================================
  {
    id: 'ind-sec-1',
    industry: 'cyber_security',
    industryName: '資安卓越產業',
    statement: '國家資通安全法明定，關鍵基礎設施（CI）提供者每年必須實施資安內部稽核與定期實戰防禦演練。',
    sourceType: 'fact',
    hint: '國家法律條文與法規公告事項，為法律事實。'
  },
  {
    id: 'ind-sec-2',
    industry: 'cyber_security',
    industryName: '資安卓越產業',
    statement: '我們公司已經購買了世界第一品牌的防火牆與防毒軟體，內部網路就永遠不可能被勒索軟體入侵。',
    sourceType: 'assumption',
    hint: '虛假安全感假設！未考慮釣魚郵件、特權憑證外洩、供應鏈攻擊與 0-day 漏洞。'
  },
  {
    id: 'ind-sec-3',
    industry: 'cyber_security',
    industryName: '資安卓越產業',
    statement: '半導體供應鏈資訊安全標準 SEMI E187 針對晶圓廠設備之作業系統防護、網路安全與端點驗證訂定規範。',
    sourceType: 'fact',
    hint: 'SEMI 國際半導體產業標準之正式公開文件。'
  },
  {
    id: 'ind-sec-4',
    industry: 'cyber_security',
    industryName: '資安卓越產業',
    statement: '這次官網短暫無法連線，肯定是境外國家級 APT 駭客軍團對我們進行的精準滅絕式網路戰攻擊。',
    sourceType: 'assumption',
    hint: '戲劇化陰謀假設！違反奧坎剃刀，缺乏伺服器日誌分析，可能是單純 CDN 路由或 DNS 事故。'
  },
  {
    id: 'ind-sec-5',
    industry: 'cyber_security',
    industryName: '資安卓越產業',
    statement: '零信任（Zero Trust）安全架構核心原則為「永不信任，始終驗證」，要求動態存取權限與身分鑑別。',
    sourceType: 'fact',
    hint: '美國 NIST SP 800-207 與國家資安院推廣之架構規範定義。'
  },
  {
    id: 'ind-sec-6',
    industry: 'cyber_security',
    industryName: '資安卓越產業',
    statement: '只要把工廠的 OT 營運網路跟對外網路實體斷開（Air-Gap），就絕對不會存在任何感染木馬惡意程式的風險。',
    sourceType: 'assumption',
    hint: '危險隱含前提！忽略了維護人員 USB 隨身碟、工程維護筆電與供應商韌體更新實體傳播路徑。'
  },
  {
    id: 'ind-sec-7',
    industry: 'cyber_security',
    industryName: '資安卓越產業',
    statement: '軟體物料清單（SBOM）旨在透明化軟體組件與開源依賴庫，以加速排查已知漏洞（如 Log4j）。',
    sourceType: 'fact',
    hint: '資安供應鏈治理與國際資安合規之通用工程標準。'
  },
  {
    id: 'ind-sec-8',
    industry: 'cyber_security',
    industryName: '資安卓越產業',
    statement: '資安防護只要全部推給 IT 部門一人搞定就好，高層主管的商業郵件密碼不需要強制雙因素驗證。',
    sourceType: 'assumption',
    hint: '權限偏見盲點！高階主管與特權帳號通常是社交工程與變臉詐騙（BEC）的最脆弱突破口。'
  },
  {
    id: 'ind-sec-9',
    industry: 'cyber_security',
    industryName: '資安卓越產業',
    statement: '紅藍軍對抗演練（Red Teaming）透過模擬真實攻擊者戰術手段，檢驗企業應變組織與偵測時效。',
    sourceType: 'fact',
    hint: '現代資安防禦檢驗之標準作業規範。'
  },
  {
    id: 'ind-sec-10',
    industry: 'cyber_security',
    industryName: '資安卓越產業',
    statement: '只要我們將資料通訊協議從 HTTP 改成 HTTPS，就能保證內部資料庫永遠不會被 SQL 注入攻擊拖庫。',
    sourceType: 'assumption',
    hint: '混淆安全層級！HTTPS 僅保障傳輸層加密，無法防護應用層程式碼注入漏洞。'
  },

  // ==========================================
  // 3. 臺灣精準健康產業 (10 題)
  // ==========================================
  {
    id: 'ind-hlt-1',
    industry: 'precision_health',
    industryName: '臺灣精準健康產業',
    statement: '衛生福利部中央健康保險署已將特定實體腫瘤的「次世代基因定序（NGS）」納入健保給付範圍。',
    sourceType: 'fact',
    hint: '衛福部健保署公告之真實給付政策與給付項目。'
  },
  {
    id: 'ind-hlt-2',
    industry: 'precision_health',
    industryName: '臺灣精準健康產業',
    statement: '只要經過 AI 醫療影像演算法判定為良性的肺結節，臨床醫師就絕對不需要安排追蹤或切片審核。',
    sourceType: 'assumption',
    hint: '偽權威假設！AI 輔助軟體（SaMD）屬於輔助決策，不得取代醫師臨床病理判斷責任。'
  },
  {
    id: 'ind-hlt-3',
    industry: 'precision_health',
    industryName: '臺灣精準健康產業',
    statement: '臺灣人體生物資料庫（Taiwan Biobank）依法收集長期追蹤之台灣本土人體生物檢體與健康資訊。',
    sourceType: 'fact',
    hint: '中研院與主管機關建置之科研數據庫事實。'
  },
  {
    id: 'ind-hlt-4',
    industry: 'precision_health',
    industryName: '臺灣精準健康產業',
    statement: '有了全台灣超過 2300 萬人的健保巨量數據，我們就能毫無阻礙地壟斷全世界所有新藥專利研發。',
    sourceType: 'assumption',
    hint: '跳躍推論！忽略跨國臨床試驗、專利壁壘、人種基因多樣性與各國法規批准極高門檻。'
  },
  {
    id: 'ind-hlt-5',
    industry: 'precision_health',
    industryName: '臺灣精準健康產業',
    statement: '醫療器材軟體（SaMD）在申請上市許可時，必須依規定提出臨床評估與軟體確效驗證報告。',
    sourceType: 'fact',
    hint: 'FDA 及 TFDA 醫療器材查驗登記法規要求。'
  },
  {
    id: 'ind-hlt-6',
    industry: 'precision_health',
    industryName: '臺灣精準健康產業',
    statement: '這個精準抗癌標靶藥物在小鼠動物實驗中腫瘤縮小了，所以人體臨床三期試驗成功率一定是 100%。',
    sourceType: 'assumption',
    hint: '以偏概全與過早樂觀！新藥自動物試驗到人體三期臨床之成功率平均低於 10%。'
  },
  {
    id: 'ind-hlt-7',
    industry: 'precision_health',
    industryName: '臺灣精準健康產業',
    statement: '體外診斷醫療器材（IVD）的客觀評價指標包括分析敏感度（Sensitivity）與分析特異度（Specificity）。',
    sourceType: 'fact',
    hint: '檢驗醫學與統計學核心技術規格定義。'
  },
  {
    id: 'ind-hlt-8',
    industry: 'precision_health',
    industryName: '臺灣精準健康產業',
    statement: '基因定序報告顯示帶有心臟疾病相關基因變異的人，其未來必定會在 40 歲前發病。',
    sourceType: 'assumption',
    hint: '宿命論假設！忽略外顯率（Penetrance）、表觀遺傳學以及後天生活飲食運動環境因素。'
  },
  {
    id: 'ind-hlt-9',
    industry: 'precision_health',
    industryName: '臺灣精準健康產業',
    statement: '臺灣通過《再生醫療法》與《再生醫療製劑條例》，為細胞治療與再生醫療技術提供明確法律規範。',
    sourceType: 'fact',
    hint: '立法院三讀通過公佈之國家法律制度。'
  },
  {
    id: 'ind-hlt-10',
    industry: 'precision_health',
    industryName: '臺灣精準健康產業',
    statement: '傳統中藥和西藥結合的保健食品只要包裝印上「增強免疫力」，任何病患吃再多都絕對不會產生交互作用。',
    sourceType: 'assumption',
    hint: '缺乏藥理學依據的盲信！藥物交互作用可能引發肝腎負擔或代謝競爭。'
  },

  // ==========================================
  // 4. 綠電及再生能源產業 (10 題)
  // ==========================================
  {
    id: 'ind-grn-1',
    industry: 'green_energy',
    industryName: '綠電及再生能源產業',
    statement: '離岸風力發電具有季節性差異，台灣海峽在冬季東北季風時期的發電容量因數通常顯著高於夏季。',
    sourceType: 'fact',
    hint: '氣象歷史觀測與風場實際併網發電紀錄之物理事實。'
  },
  {
    id: 'ind-grn-2',
    industry: 'green_energy',
    industryName: '綠電及再生能源產業',
    statement: '只要在全台灣所有屋頂鋪滿太陽能板，台灣就立刻再也不需要任何儲能系統或水力調頻設施。',
    sourceType: 'assumption',
    hint: '忽視間歇性電力特質（夜間零發電、鴨子曲線負荷）的極端無效假設。'
  },
  {
    id: 'ind-grn-3',
    industry: 'green_energy',
    industryName: '綠電及再生能源產業',
    statement: '台電推動「強化電網韌性建設計畫」，以「分散、強固、防衛」為主軸降低單一電網事故停電風險。',
    sourceType: 'fact',
    hint: '國家電力公司公開之十年電網重大建設規劃方針。'
  },
  {
    id: 'ind-grn-4',
    industry: 'green_energy',
    industryName: '綠電及再生能源產業',
    statement: '歐盟碳邊境調整機制（CBAM）正式開徵後，台灣所有出口傳統產業必定會在半年內完全倒閉。',
    sourceType: 'assumption',
    hint: '災難化滑坡推論！忽視企業碳盤查自願減碳、低碳技術改造與國際抵減機制。'
  },
  {
    id: 'ind-grn-5',
    industry: 'green_energy',
    industryName: '綠電及再生能源產業',
    statement: '儲能系統（BESS）於電網的主要功能包含頻率調節（dReg/E-dReg）、削峰填谷與備用電源支援。',
    sourceType: 'fact',
    hint: '電力輔助服務市場與電能管理之工程定義。'
  },
  {
    id: 'ind-grn-6',
    industry: 'green_energy',
    industryName: '綠電及再生能源產業',
    statement: '再生能源的所有設備從原物料開採、製造到除役回收，保證完全是零碳排放且無任何碳足跡。',
    sourceType: 'assumption',
    hint: '偽全善假設！任何綠能設備生命週期評估（LCA）在原料提煉與生產中仍產生隱含碳。'
  },
  {
    id: 'ind-grn-7',
    industry: 'green_energy',
    industryName: '綠電及再生能源產業',
    statement: '國際 RE100 倡議要求會員企業承諾在特定年份前達成 100% 使用再生能源電力目標。',
    sourceType: 'fact',
    hint: 'Climate Group 與 CDP 國際組織發起之公開倡議準則。'
  },
  {
    id: 'ind-grn-8',
    industry: 'green_energy',
    industryName: '綠電及再生能源產業',
    statement: '地熱發電在台灣地質條件下，不需進行任何鑽探地質調查就能百分之百找到高溫蒸汽儲集層。',
    sourceType: 'assumption',
    hint: '輕忽地質風險與前置鑽探探勘成本的盲目推想。'
  },
  {
    id: 'ind-grn-9',
    industry: 'green_energy',
    industryName: '綠電及再生能源產業',
    statement: '國家氣候變遷因應法已明定推動碳費徵收機制，並依不同對象分階段申報與繳納。',
    sourceType: 'fact',
    hint: '立法院審議通過之環境部法定規範事項。'
  },
  {
    id: 'ind-grn-10',
    industry: 'green_energy',
    industryName: '綠電及再生能源產業',
    statement: '只要我們把所有公車全面汰換成電動巴士，城市的尖峰交通塞車問題就會徹底完全消失。',
    sourceType: 'assumption',
    hint: '偷換概念！動力來源電動化改變的是排碳排放，無法直接解決都市道路容量與交通擁塞。'
  },

  // ==========================================
  // 5. 國防及戰略產業 (10 題)
  // ==========================================
  {
    id: 'ind-def-1',
    industry: 'national_defense',
    industryName: '國防及戰略產業',
    statement: '國機國造之勇鷹新式高教機已正式進入量產交付空軍服役，執行部訓戰技教學任務。',
    sourceType: 'fact',
    hint: '國防部與漢翔航空工業公開之軍品交付交機事實。'
  },
  {
    id: 'ind-def-2',
    industry: 'national_defense',
    industryName: '國防及戰略產業',
    statement: '只要購買市售一般民用消費級無人機加掛夜視鏡頭，就能在強烈電磁干擾環境下徹底取代戰規軍用無人機。',
    sourceType: 'assumption',
    hint: '無視軍規耐受度！忽視跳頻加密、抗干擾 GPS、軍用複合材料與低雷達截面積（RCS）的本質差異。'
  },
  {
    id: 'ind-def-3',
    industry: 'national_defense',
    industryName: '國防及戰略產業',
    statement: '潛艦國造首艘原型艦「海鯤軍艦」依建造規劃進行泊港測試（HAT）與出海測試（SAT）。',
    sourceType: 'fact',
    hint: '台船公司與海軍造艦專案公開之客觀進程紀錄。'
  },
  {
    id: 'ind-def-4',
    industry: 'national_defense',
    industryName: '國防及戰略產業',
    statement: '戰時只要國際海底電纜被切斷，只要民眾家裡裝有小型天線就一定能無限頻寬收看 4K 超高畫質直播。',
    sourceType: 'assumption',
    hint: '對衛星頻寬容量的過度幻想！低軌與中軌衛星備援頻寬有限，優先保障國防指揮與關鍵政軍通訊。'
  },
  {
    id: 'ind-def-5',
    industry: 'national_defense',
    industryName: '國防及戰略產業',
    statement: '軍民通用科技指同時具備國防防禦作戰需求與民間商業產值潛力之先進雙重用途技術。',
    sourceType: 'fact',
    hint: '國防部資源規劃司與先進研發計畫之明確術語定義。'
  },
  {
    id: 'ind-def-6',
    industry: 'national_defense',
    industryName: '國防及戰略產業',
    statement: '高階飛彈與雷達系統所使用的軍規耐輻射防護晶片，可以直接用一般市售智慧型手機的低階晶片完美無縫替代。',
    sourceType: 'assumption',
    hint: '致命假設！軍規與太空規格對極端溫度（-55°C~125°C）、抗高壓震動與抗電磁脈衝有嚴苛認證標準。'
  },
  {
    id: 'ind-def-7',
    industry: 'national_defense',
    industryName: '國防及戰略產業',
    statement: '台灣無人機產業發展已成立「無人機國家隊」，並於嘉義設立無人機 AI 創新應用研發中心。',
    sourceType: 'fact',
    hint: '政府正式揭牌設置並引進產學研進駐之實體園區設施。'
  },
  {
    id: 'ind-def-8',
    industry: 'national_defense',
    industryName: '國防及戰略產業',
    statement: '現代戰爭已經全面數位化，所以部隊實彈野戰射擊訓練與後勤運補體能完全沒有任何保留的必要。',
    sourceType: 'assumption',
    hint: '以偏概全謬誤！現代衝突（如烏俄戰爭）證明傳統後勤彈藥、掩體構築與單兵作戰基礎仍然是戰略根基。'
  },
  {
    id: 'ind-def-9',
    industry: 'national_defense',
    industryName: '國防及戰略產業',
    statement: '主動相位陣列雷達（AESA）透過眾多小型收發模組以電子掃描方式快速變換波束方向。',
    sourceType: 'fact',
    hint: '現代現代防空雷達射控技術客觀物理特徵。'
  },
  {
    id: 'ind-def-10',
    industry: 'national_defense',
    industryName: '國防及戰略產業',
    statement: '既然我們是島嶼防衛，只要擁有足夠的海岸巡邏艇，空中制空權就完全不用投入任何心力爭取。',
    sourceType: 'assumption',
    hint: '單一作戰面向狹隘思維！失去制空權與防空保護傘下，水面艦艇生存空間極其有限。'
  },

  // ==========================================
  // 6. 民生及戰備產業 (10 題)
  // ==========================================
  {
    id: 'ind-res-1',
    industry: 'strategic_reserve',
    industryName: '民生及戰備產業',
    statement: '糧食管理法規定，政府為因應非常災害或糧食供應緊急情事，應儲備不低於法定期間之公糧稻米。',
    sourceType: 'fact',
    hint: '農業部糧食管理法明訂之法定存糧要求。'
  },
  {
    id: 'ind-res-2',
    industry: 'strategic_reserve',
    industryName: '民生及戰備產業',
    statement: '台灣是四面環海的島嶼，因此只要在海邊設立海水淡化設備，就永遠不可能會遇到工業與民生缺水危機。',
    sourceType: 'assumption',
    hint: '忽略淡化能耗極高、產水輸送管線、成本與單位時間最大處理量的實務限制。'
  },
  {
    id: 'ind-res-3',
    industry: 'strategic_reserve',
    industryName: '民生及戰備產業',
    statement: '關鍵原料藥（API）是製造西藥製劑的核心有效成分，其自給率直接影響國家重大疫情時的藥物自主韌性。',
    sourceType: 'fact',
    hint: '衛福部與醫藥品查驗中心之藥政供應鏈定義。'
  },
  {
    id: 'ind-res-4',
    industry: 'strategic_reserve',
    industryName: '民生及戰備產業',
    statement: '只要在國內廣設地下物資倉庫，就算遭遇任何外部航運阻斷超過三年，所有民生工業物資也絲毫不會受影響。',
    sourceType: 'assumption',
    hint: '無視庫存保鮮期、能源消耗動態平衡與原料零件全球分工鏈的非現實假想。'
  },
  {
    id: 'ind-res-5',
    industry: 'strategic_reserve',
    industryName: '民生及戰備產業',
    statement: '國家重要基礎電子被動元件（如 MLCC 積層陶瓷電容、電阻）廣泛應用於電力網控制板與各類電子儀器中。',
    sourceType: 'fact',
    hint: '電子工業工程架構之客觀事實。'
  },
  {
    id: 'ind-res-6',
    industry: 'strategic_reserve',
    industryName: '民生及戰備產業',
    statement: '天然氣儲槽安全存量天數無論在夏季或冬季都完全沒有安全存量天數波動，永遠維持 365 天不中斷。',
    sourceType: 'assumption',
    hint: '與實際數據不符！台灣天然氣法定安全存量天數為數週等級，且受天候海象航運與季節用量影響。'
  },
  {
    id: 'ind-res-7',
    industry: 'strategic_reserve',
    industryName: '民生及戰備產業',
    statement: '血液透析所需之人工腎臟與耗材，在醫療體系中屬於需要建立戰備供應鏈名冊的關鍵民生醫療物資。',
    sourceType: 'fact',
    hint: '緊急醫療體系與衛福部重大傷病關鍵救命物資指引。'
  },
  {
    id: 'ind-res-8',
    industry: 'strategic_reserve',
    industryName: '民生及戰備產業',
    statement: '只要超市貨架今天被搶購一空，就代表全國總儲備糧食已經在今天全部徹底耗盡。',
    sourceType: 'assumption',
    hint: '混淆末端物流配送補貨延遲與全國後端大宗安全存糧總量的恐慌偏差。'
  },
  {
    id: 'ind-res-9',
    industry: 'strategic_reserve',
    industryName: '民生及戰備產業',
    statement: '經濟部水利署建置「珍珠串計畫」將桃竹幹管、曾文南化連通管等跨區調度管網相互串接以調度水資源。',
    sourceType: 'fact',
    hint: '台灣水資源跨區域水源調度建設之客觀施政工程。'
  },
  {
    id: 'ind-res-10',
    industry: 'strategic_reserve',
    industryName: '民生及戰備產業',
    statement: '只要全面限制所有醫療防護物資出口，國內製藥廠的化學合成原料就能無中生有自動產出。',
    sourceType: 'assumption',
    hint: '把成品管制與化學原料供應鏈混為一談的荒謬前提，忽略化學上游原料進口依存性。'
  }
];
