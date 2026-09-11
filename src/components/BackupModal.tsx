import React, { useState } from 'react';
import { UserStats, Achievement, OfflineBackupData, OfflineBackupDataSchema } from '../types';
import {
  Download,
  Upload,
  RotateCcw,
  Check,
  Copy,
  AlertCircle,
  X,
  HardDrive,
  ShieldCheck
} from 'lucide-react';

interface BackupModalProps {
  isOpen: boolean;
  onClose: () => void;
  userStats: UserStats;
  achievements: Achievement[];
  onRestore: (stats: UserStats, achievements: Achievement[]) => void;
  onReset: () => void;
}

export const BackupModal: React.FC<BackupModalProps> = ({
  isOpen,
  onClose,
  userStats,
  achievements,
  onRestore,
  onReset
}) => {
  const [copied, setCopied] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importError, setImportError] = useState<string | null>(null);
  const [restoreSuccess, setRestoreSuccess] = useState(false);

  if (!isOpen) return null;

  const currentBackupData: OfflineBackupData = {
    appVersion: '2.0.0-awake',
    exportDate: new Date().toISOString(),
    stats: userStats,
    achievements,
    dailyHistory: []
  };

  const backupString = JSON.stringify(currentBackupData, null, 2);

  // 下載 JSON 檔案
  const handleDownloadFile = () => {
    const blob = new Blob([backupString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `awake-critical-thinking-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // 複製到剪貼簿
  const handleCopy = () => {
    navigator.clipboard.writeText(backupString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 匯入與解析（採用 Zod 執行期嚴格校驗防線）
  const handleImport = () => {
    setImportError(null);
    setRestoreSuccess(false);

    try {
      if (!importJsonText.trim()) {
        setImportError('請先貼上有效的 JSON 備份內容');
        return;
      }

      const rawParsed = JSON.parse(importJsonText);
      // 使用 Zod 防線嚴格驗證
      const validData = OfflineBackupDataSchema.parse(rawParsed);

      onRestore(validData.stats, validData.achievements);
      setRestoreSuccess(true);
      setImportJsonText('');
      setTimeout(() => {
        setRestoreSuccess(false);
        onClose();
      }, 1500);
    } catch (err: any) {
      const msg = err.errors ? err.errors.map((e: any) => `${e.path.join('.')}: ${e.message}`).join(', ') : err.message;
      setImportError(`Zod 安全防線攔截：${msg || 'JSON 格式或欄位不合法'}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-cyan-500/20 text-cyan-400 rounded-xl border border-cyan-500/30">
            <HardDrive className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white">
              離線進度備份與還原 (Data Vault)
            </h3>
            <p className="text-xs text-slate-400">
              隱私優先 • Zod 執行期型態防護 • 零雲端依賴
            </p>
          </div>
        </div>

        {/* Privacy Note */}
        <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-xs text-cyan-300 flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 shrink-0" />
          <span>
            完全無需綁定伺服器帳號，沒有任何隱私數據外洩風險。您的成就、等級、思考路徑隨時一手掌握。
          </span>
        </div>

        {/* Export Section */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-300">
            一鍵匯出當前進度 (Export)
          </div>
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={handleDownloadFile}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md transition-all"
            >
              <Download className="w-4 h-4" />
              <span>下載備份 JSON 檔案</span>
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">已複製備份文字！</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>複製 JSON 代碼</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Import Section */}
        <div className="space-y-3 pt-4 border-t border-slate-800">
          <div className="text-xs font-bold text-slate-300">
            貼上備份還原進度 (Import & Zod Guard)
          </div>
          <textarea
            rows={3}
            value={importJsonText}
            onChange={(e) => setImportJsonText(e.target.value)}
            placeholder="貼上先前匯出的 JSON 內容..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 font-mono focus:outline-none focus:border-cyan-500"
          />

          {importError && (
            <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-950/30 p-2.5 rounded-lg border border-rose-500/30">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{importError}</span>
            </div>
          )}

          {restoreSuccess && (
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/30 p-2.5 rounded-lg border border-emerald-500/30">
              <Check className="w-4 h-4 shrink-0" />
              <span>恭喜！思維進度通過 Zod 嚴格檢驗並已成功還原！</span>
            </div>
          )}

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 px-3 py-1.5 rounded-lg transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>重設為初始狀態</span>
            </button>

            <button
              onClick={handleImport}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-xs shadow-md transition-all"
            >
              <Upload className="w-4 h-4" />
              <span>確認還原</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
