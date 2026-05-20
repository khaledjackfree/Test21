/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ChangeEvent } from 'react';
import { QuantumFile, SyncLog } from '../types';
import { 
  Upload, 
  FileText, 
  Video, 
  Orbit, 
  Radio, 
  CheckCircle2, 
  RefreshCw,
  PlusCircle, 
  HelpCircle,
  QrCode,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CloudPhoneSimulatorProps {
  onAddTransferPayload: (file: QuantumFile) => void;
  logs: SyncLog[];
  addLog: (msg: string, type: 'info' | 'success' | 'warning' | 'error' | 'pulse') => void;
  onPrepareForQRBeam: (file: QuantumFile) => void;
}

const PRESET_FILES: QuantumFile[] = [
  { id: 'pres-1', name: 'فيديو_الهبوط_التاريخي.mp4', size: 45000000, type: 'video/mp4', planetSource: 'السحابي-Kepler', transmissionMethod: 'Quantum Beam' },
  { id: 'pres-2', name: 'قاعدة_بيانات_المدن.json', size: 120000, type: 'application/json', planetSource: 'السحابي-Earth-2', transmissionMethod: 'Visual Matrix' },
  { id: 'pres-3', name: 'أطلس_الحضارة_الرقمية.mov', size: 125000000, type: 'video/quicktime', planetSource: 'السحابي-Mars', transmissionMethod: 'Acoustic Sonic' }
];

export function CloudPhoneSimulator({ onAddTransferPayload, logs, addLog, onPrepareForQRBeam }: CloudPhoneSimulatorProps) {
  const [selectedFile, setSelectedFile] = useState<QuantumFile | null>(PRESET_FILES[0]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [hasSyncSuccess, setHasSyncSuccess] = useState(false);
  const [customFiles, setCustomFiles] = useState<QuantumFile[]>([]);
  const [planetName, setPlanetName] = useState('كوكب فيدا السحابي (Kepler-452b)');
  const [customFileText, setCustomFileText] = useState('');

  // Handle uploading real file through file input
  const handleRealFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    addLog(`📂 تم كشف ملف حقيقي: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`, 'info');

    const newFile: QuantumFile = {
      id: `custom-${Date.now()}`,
      name: file.name,
      size: file.size,
      type: file.type || 'application/octet-stream',
      planetSource: `الهاتف السحابي (${planetName.split(' ')[0]})`,
      transmissionMethod: 'Quantum Beam'
    };

    setCustomFiles([newFile, ...customFiles]);
    setSelectedFile(newFile);
    addLog(`⚛️ تم إعداد وحاقن حزمة البيانات في القناة الكمية بنجاح!`, 'success');
  };

  const handleRegisterTextData = () => {
    if (!customFileText.trim()) return;
    const txtSize = new Blob([customFileText]).size;
    const textFile: QuantumFile = {
      id: `text-${Date.now()}`,
      name: `رسالة_فورية_${Math.floor(Math.random() * 1000)}.txt`,
      size: txtSize,
      type: 'text/plain',
      content: customFileText,
      planetSource: planetName,
      transmissionMethod: 'Visual Matrix'
    };

    setCustomFiles([textFile, ...customFiles]);
    setSelectedFile(textFile);
    setCustomFileText('');
    addLog(`📝 تم تحويل النص الفوري إلى حزمة مشفرة جاهزة للبث`, 'success');
  };

  const startQuantumBeam = () => {
    if (!selectedFile) return;
    setIsSyncing(true);
    setHasSyncSuccess(false);

    addLog(`🔮 جارِ شحن مكررات النبض الكمي لـ: ${selectedFile.name}...`, 'pulse');
    
    setTimeout(() => {
      addLog(`🛸 تم تهيئة الاتصال بالبوابة في خط طول 41° سحابي موازي.`, 'info');
    }, 1000);

    setTimeout(() => {
      addLog(`⚡ تشغيل بروتوكول زيرو-نت للربط الكمي المزدوج...`, 'warning');
    }, 2500);

    setTimeout(() => {
      onAddTransferPayload(selectedFile);
      setIsSyncing(false);
      setHasSyncSuccess(true);
      addLog(`✨ اتصال ناجح تمامًا! الملف مغذّى في البوابة الآن بانتظار الهاتف المستلم.`, 'success');
    }, 4500);
  };

  const handleQRDirect = () => {
    if (!selectedFile) return;
    onPrepareForQRBeam(selectedFile);
  };

  return (
    <div className="flex flex-col p-4 space-y-4 font-sans text-right leading-relaxed">
      {/* Top Title Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-1 bg-cyan-950/40 px-2 py-1 rounded border border-cyan-800/40 text-[10px] text-cyan-400 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping"></span>
          CLOUD_NODE_ONLINE
        </div>
        <div className="text-right">
          <h2 className="text-lg font-bold text-slate-100">بوابة الإرسال السحابي</h2>
          <p className="text-[10px] text-slate-400">إطلاق الملفات من مدار الهاتف السحابي البعيد</p>
        </div>
      </div>

      {/* Cloud Phone Config Card */}
      <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800 space-y-3">
        <label className="block text-xs font-semibold text-slate-300">
          📍 موقع الهاتف السحابي الحالي (إعداد المدار)
        </label>
        <select 
          value={planetName} 
          onChange={(e) => {
            setPlanetName(e.target.value);
            addLog(`🚀 تم تعديل مسار الحوسبة السحابية إلى: ${e.target.value}`, 'info');
          }}
          className="w-full bg-slate-950 text-slate-200 text-xs rounded-lg p-2.5 border border-slate-800 focus:border-cyan-500/50 focus:outline-none"
        >
          <option value="كوكب فيدا السحابي (Kepler-452b)">🌌 كوكب فيدا السحابي (Kepler-452b)</option>
          <option value="مجمع سحابة دبي الفائقة (العالمي)">🏢 مجمع سحابة دبي الفائقة (العالمي)</option>
          <option value="قمر تيتان السحابي (مدار زحل)">🪐 قمر تيتان السحابي (مدار زحل)</option>
          <option value="هاتف سحابي محلي (مجهول الخدمة)">📱 هاتف سحابي كوني (أوفلاين تام)</option>
        </select>
        <p className="text-[10px] text-slate-500 leading-normal">
          * الهاتف السحابي هو جهاز يعمل عن بُعد في مركبة حاسوبية، نستخدم فيه البوابة لرمي الملف واستقباله هنا دون حاسب وسيط.
        </p>
      </div>

      {/* File Ingestor Panel */}
      <div className="bg-slate-900/45 rounded-xl border border-slate-800/80 p-4 space-y-4">
        <h3 className="text-xs font-bold text-cyan-400 flex items-center gap-1 justify-end">
          <PlusCircle className="w-3.5 h-3.5" />
          1. اختر أو ارفع الملف على الهاتف السحابي
        </h3>

        {/* Real File Input Dropzone */}
        <div className="relative border-2 border-dashed border-slate-800 hover:border-cyan-500/50 rounded-xl p-4 text-center cursor-pointer bg-slate-950/40 group transition-colors">
          <input 
            type="file" 
            onChange={handleRealFileUpload} 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
          />
          <Upload className="w-8 h-8 mx-auto text-slate-500 group-hover:text-cyan-400 group-hover:scale-110 transition-transform mb-2" />
          <p className="text-xs font-semibold text-slate-300">انقر لرفع ملف حقيقي من هاتفك السحابي</p>
          <p className="text-[10px] text-slate-500 mt-1">يدعم ملفات الفيديو، الصور، الصوتيات أو المستندات</p>
        </div>

        {/* Custom Text Ingestor instead of real file */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-[10px] text-slate-400">
            <button 
              onClick={handleRegisterTextData}
              disabled={!customFileText.trim()}
              className="text-cyan-400 font-bold disabled:text-slate-600 hover:text-cyan-300"
            >
              + حقن بنص مشفر
            </button>
            <span>أو اكتب رسالة/ملاحظة فورية لبثها</span>
          </div>
          <input
            type="text"
            value={customFileText}
            onChange={(e) => setCustomFileText(e.target.value)}
            placeholder="مثال: مرحبًا يا صديقي، هذا كود سري 9201..."
            className="w-full bg-slate-950 text-slate-200 text-xs rounded-lg p-2 border border-slate-800 focus:border-cyan-500/30 focus:outline-none placeholder:text-slate-600"
          />
        </div>

        {/* File Selection list (Preset + Custom) */}
        <div className="space-y-1.5">
          <span className="text-[11px] text-slate-400 block pb-1">الملفات المتوفرة للإرسال الآن:</span>
          <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
            {[...customFiles, ...PRESET_FILES].map((file) => {
              const isSelected = selectedFile?.id === file.id;
              const isVid = file.type.includes('video') || file.name.endsWith('.mp4') || file.name.endsWith('.mov');
              return (
                <div 
                  key={file.id}
                  onClick={() => setSelectedFile(file)}
                  className={`p-2.5 rounded-lg border text-xs cursor-pointer flex items-center justify-between transition-all ${
                    isSelected 
                      ? 'bg-cyan-950/40 border-cyan-500/80 text-cyan-200 font-medium' 
                      : 'bg-slate-950/70 border-slate-900 hover:border-slate-800 text-slate-400'
                  }`}
                >
                  <span className="text-[9px] font-mono text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                  <div className="flex items-center gap-2">
                    <span className="truncate max-w-[150px]">{file.name}</span>
                    {isVid ? (
                      <Video className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-400' : 'text-slate-600'}`} />
                    ) : (
                      <FileText className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-400' : 'text-slate-600'}`} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Connection Actions Beam */}
      {selectedFile && (
        <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 text-center space-y-4">
          <div className="flex justify-between items-center bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/80 text-right">
            <div className="text-[11px]">
              <div className="font-bold text-slate-300">السرعة المتوقعة</div>
              <div className="text-emerald-400 font-mono">1.2 Gbps (ربط كمي مدمج)</div>
            </div>
            <div className="text-[11px] border-r border-slate-800 pr-2">
              <div className="font-bold text-slate-300">الملف المحدد</div>
              <div className="text-cyan-400 truncate max-w-[120px]">{selectedFile.name}</div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {/* Primary Option: Quantum Tunnel Beam (Through Virtual Signaler) */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              disabled={isSyncing}
              onClick={startQuantumBeam}
              className="w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 bg-gradient-to-l from-cyan-600 to-cyan-500 text-slate-950 shadow-md shadow-cyan-950/30 font-sans disabled:opacity-50"
            >
              {isSyncing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  جارِ دمج الجسيمات وبث الملف...
                </>
              ) : (
                <>
                  <Orbit className="w-4 h-4 text-slate-950 animate-spin" />
                  إرسال مباشر عبر البوابة السحابية الفائقة
                </>
              )}
            </motion.button>

            {/* Alternative Option: Visual Stream Scanner (QR Code) */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleQRDirect}
              className="w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 bg-slate-950 border border-slate-800 hover:border-amber-500/50 text-amber-400 font-sans"
            >
              <QrCode className="w-4 h-4 text-amber-500" />
              تحويل الملف إلى أرسال ضوئي (كود QR) 
            </motion.button>
          </div>

          {/* Success Hologram feedback */}
          <AnimatePresence>
            {hasSyncSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-emerald-950/50 border border-emerald-500/40 rounded-xl p-3 text-emerald-300 text-xs flex items-center justify-between"
              >
                <div className="flex items-center gap-1.5 p-1 bg-emerald-900/40 rounded border border-emerald-500/20 text-[10px]">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
                  بث نشط
                </div>
                <div className="text-right">
                  <div className="font-bold flex items-center gap-1 justify-end">
                    <span>البوابة مشحونة بنجاح </span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 inline" />
                  </div>
                  <p className="text-[10px] text-slate-300 mt-1">
                    افتح الآن خيار **(جهازي الرئيسي المستلم)** في الهاتف الآخر لإنزال الملف بدون شبكة فورًا!
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Holographic Log Stream terminal */}
      <div className="bg-slate-950 rounded-xl border border-slate-800 p-3 font-mono text-[10px] space-y-1.5 text-left">
        <div className="flex justify-between items-center text-slate-500 border-b border-slate-900 pb-1.5 text-right font-sans">
          <span className="text-[9px] bg-slate-900 px-1.5 py-0.2 rounded text-slate-400">TELEMETRY_LOG</span>
          <span className="font-bold text-[10px] text-slate-400">سجل الأحداث والنبضات</span>
        </div>
        <div className="space-y-1 overflow-y-auto max-h-32 text-right">
          {logs.map((log) => {
            const isPulse = log.type === 'pulse';
            const isSuccess = log.type === 'success';
            const isWarn = log.type === 'warning';
            return (
              <div 
                key={log.id} 
                className={`transition-all duration-300 ${
                  isPulse ? 'text-cyan-400' : isSuccess ? 'text-emerald-400' : isWarn ? 'text-amber-500' : 'text-slate-400'
                }`}
              >
                <span className="text-slate-600 text-[9px] float-left font-mono">{log.time}</span>
                <span className="mr-1">›</span>
                <span>{log.message}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
