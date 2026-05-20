/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { QuantumFile, SyncLog } from '../types';
import { 
  Download, 
  Search, 
  Orbit, 
  CheckCircle2, 
  Wifi, 
  HelpCircle,
  FileDown,
  Sparkles,
  Zap,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LocalReceiverProps {
  activePayloads: QuantumFile[];
  logs: SyncLog[];
  addLog: (msg: string, type: 'info' | 'success' | 'warning' | 'error' | 'pulse') => void;
  onClearPayloads: () => void;
}

export function LocalReceiver({ activePayloads, logs, addLog, onClearPayloads }: LocalReceiverProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [targetPayload, setTargetPayload] = useState<QuantumFile | null>(null);
  const [progress, setProgress] = useState(0);
  const [transferState, setTransferState] = useState<'idle' | 'receiving' | 'done'>('idle');

  // Automatically search for payloads if any exist in the app memory
  useEffect(() => {
    if (activePayloads.length > 0) {
      setTargetPayload(activePayloads[0]);
    }
  }, [activePayloads]);

  const startScan = () => {
    setIsScanning(true);
    setTargetPayload(null);
    addLog(`🔍 جارِ الاستماع لحزم البث في المجال الكوني المزدوج...`, 'pulse');

    setTimeout(() => {
      if (activePayloads.length > 0) {
        setTargetPayload(activePayloads[ac_len()]);
        addLog(`📡 تم كشف ذبذبات الهاتف السحابي النشط: ${activePayloads[0].planetSource}`, 'success');
      } else {
        // Fallback to preset simulator if user didn't register custom sender file to keep sandbox fun
        const fallbackFile: QuantumFile = {
          id: 'fb-ideal',
          name: 'تأثير_البعد_الكمي_للأجهزة.mp4',
          size: 18000000,
          type: 'video/mp4',
          planetSource: 'كوكب فيدا السحابي (Kepler-452b)',
          transmissionMethod: 'Quantum Beam'
        };
        setTargetPayload(fallbackFile);
        addLog(`📡 تم استكشاف قناة هاتف سحابي محاكاة (مجاني الطيف).`, 'info');
      }
      setIsScanning(false);
    }, 3000);
  };

  const ac_len = () => activePayloads.length - 1;

  const handlePullFile = () => {
    if (!targetPayload) return;
    setTransferState('receiving');
    setProgress(0);
    addLog(`📥 بدأ الاستحواذ وسحب جزيئات الملف: ${targetPayload.name}`, 'pulse');

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTransferState('done');
          addLog(`✨ تم إعادة تجميع وبناء الملف ${targetPayload.name} بنجاح محليًا!`, 'success');
          return 100;
        }
        // Increment speeds resembling super-fast near-space quantum link
        const step = Math.floor(Math.random() * 8) + 12;
        const next = prev + step;
        return next > 100 ? 100 : next;
      });
    }, 200);
  };

  // Triggers real client browser download for simulated dummy or user file
  const triggerBrowserDownload = () => {
    if (!targetPayload) return;
    
    // We generate a valid offline HTML representation or text representing the quantum payload
    const fileContent = targetPayload.content || `
      =============================
      SPACE DIRECT TRANSFER SYSTEM
      =============================
      الملف: ${targetPayload.name}
      الحجم: ${(targetPayload.size / 1024 / 1024).toFixed(3)} MB
      المصدر: ${targetPayload.planetSource}
      بروتوكول تحويل: ${targetPayload.transmissionMethod}
      الحالة: تم النقل والتمثيل بنجاح 100% بدون إنترنت!
      
      بروتوكول البث محمي بالكامل أوفلاين.
    `;
    
    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    // Keep name matching user source
    link.setAttribute('download', targetPayload.name.endsWith('.txt') ? targetPayload.name : `${targetPayload.name}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addLog(`💾 تم حفظ الملف في ذاكرة التنزيلات بجهازك الرئيسي الحالي!`, 'success');
  };

  return (
    <div className="flex flex-col p-4 space-y-4 font-sans text-right leading-relaxed">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-1 bg-purple-950/40 px-2 py-1 rounded border border-purple-800/40 text-[10px] text-purple-400 font-mono">
          <Wifi className="w-3.5 h-3.5 text-purple-400" />
          REC_NODE_WAITING
        </div>
        <div className="text-right">
          <h2 className="text-lg font-bold text-slate-100">استلام جهازك الرئيسي</h2>
          <p className="text-[10px] text-slate-400">استقبال وتجسيد ذرات الملفات من الفضاء</p>
        </div>
      </div>

      {/* Radar scanning screen */}
      <div className="relative py-8 bg-slate-900/60 border border-slate-850 rounded-2xl flex flex-col items-center justify-center overflow-hidden">
        {/* Radar concentric circular grid */}
        <div className="absolute inset-0 flex items-center justify-center opacity-25">
          <div className="w-48 h-48 rounded-full border border-purple-500/40 animate-ping duration-3000"></div>
          <div className="w-32 h-32 rounded-full border border-purple-500/30"></div>
          <div className="w-16 h-16 rounded-full border border-purple-550/20"></div>
        </div>

        {isScanning ? (
          <div className="relative z-10 flex flex-col items-center text-center space-y-3">
            <Orbit className="w-12 h-12 text-purple-400 animate-spin" />
            <p className="text-xs text-purple-300 animate-pulse font-mono font-medium">
              الاستماع للأثير الكمي (محلي الصنع)...
            </p>
          </div>
        ) : targetPayload ? (
          <div className="relative z-10 flex flex-col items-center text-center space-y-2 px-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white scale-110 shadow-lg shadow-purple-950/40">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[9px] font-bold bg-purple-900 border border-purple-700 text-purple-200 px-2 py-0.5 rounded">
                تم كشف مسار الهاتف السحابي
              </span>
              <h3 className="font-bold text-slate-100 text-sm mt-2 truncate max-w-[280px]">
                {targetPayload.name}
              </h3>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                {(targetPayload.size / 1024 / 1024).toFixed(2)} MB • {targetPayload.planetSource}
              </p>
            </div>
          </div>
        ) : (
          <div className="relative z-10 flex flex-col items-center text-center space-y-3">
            <Search className="w-10 h-10 text-slate-600" />
            <div>
              <p className="text-xs font-semibold text-slate-300">لم يتم العثور على بث نشط حتى الآن</p>
              <p className="text-[11px] text-slate-500 mt-1 max-w-[240px]">
                شغّل كاشف البوابة السفلية للبحث عن أي ملف يبثه الهاتف السحابي في الجوار.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Manual Scanning & Actions Console */}
      <div className="space-y-3">
        {!targetPayload && (
          <motion.button
            whileTap={{ scale: 0.98 }}
            disabled={isScanning}
            onClick={startScan}
            className="w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 bg-gradient-to-l from-purple-600 to-indigo-500 text-slate-100 shadow-md shadow-purple-950/20 disabled:opacity-50"
          >
            <Orbit className="w-4 h-4 animate-spin text-white" />
            استمع والتقط الملف من بوابة الفضاء
          </motion.button>
        )}

        {targetPayload && transferState === 'idle' && (
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <p className="text-xs text-slate-300">
              الملف مهيأ تمامًا لاستلامه في جهازك الرئيسي. العملية لا تتطلب حزم بيانات إنترنت خلوية أو مودم مركزي.
            </p>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handlePullFile}
              className="w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 bg-gradient-to-l from-emerald-600 to-teal-500 text-slate-950 shadow-md shadow-emerald-950/35"
            >
              <Download className="w-4 h-4 text-slate-950" />
              سحب وتنزيل الملف بجسيمات الضوء
            </motion.button>
          </div>
        )}

        {transferState === 'receiving' && (
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-center">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-cyan-400 font-mono">{progress}%</span>
              <span className="text-slate-300">جارِ استقبال الحزم الضوئية...</span>
            </div>
            
            {/* Progress Container */}
            <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-900/60">
              <motion.div 
                className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500"
                style={{ width: `${progress}%` }}
              ></motion.div>
            </div>

            <p className="text-[10px] text-slate-500 text-center font-mono animate-pulse">
              [ SPEED: 1.4 Gbps / SYNCLINK: DIRECT_OFFLINE ]
            </p>
          </div>
        )}

        {transferState === 'done' && (
          <div className="p-4 rounded-xl bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/30 text-center space-y-4">
            <div className="mx-auto w-10 h-10 rounded-full bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            
            <div>
              <h4 className="font-bold text-slate-100 text-sm">تم التجسيد وبناء الملف بالكامل!</h4>
              <p className="text-[11px] text-slate-300 mt-1">
                يمكنك الآن تنزيله وحفظه مباشرة في ملفات هذا الموبايل للاطلاع الفوري.
              </p>
            </div>

            <div className="flex gap-2">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={triggerBrowserDownload}
                className="flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 bg-emerald-500 text-slate-950 shadow-sm shadow-emerald-900"
              >
                <FileDown className="w-4 h-4 text-slate-950" />
                حفظ في الموبايل 💾
              </motion.button>
              
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setTransferState('idle');
                  setProgress(0);
                  onClearPayloads();
                  setTargetPayload(null);
                }}
                className="py-2.5 px-3 rounded-xl font-bold text-xs bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200"
              >
                مسح القناة
              </motion.button>
            </div>
          </div>
        )}
      </div>

      {/* Explanation Tip Card */}
      <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-850 flex gap-3 text-right">
        <div className="flex-1">
          <h4 className="text-xs font-bold text-slate-300 flex items-center justify-end gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            مفهوم النقل السحابي بدون نت
          </h4>
          <p className="text-[10px] text-slate-400 mt-1">
            يقوم الخادم بتجزئة الملف وفهمه وحقنه في المتصفح المحلي مشفرًا، وبمجرد اقتران التردد الضوئي أو الرمزي مع جهازك الآخر، يتم نقل الحزم وبناؤها أوفلاين كليًا من الذاكرة المخزنة مؤقتًا!
          </p>
        </div>
      </div>
    </div>
  );
}
