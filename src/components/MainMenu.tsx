/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AppMode } from '../types';
import { 
  Cloud, 
  Download, 
  QrCode, 
  Volume2, 
  BookOpen, 
  Radio, 
  Sparkles,
  Cpu, 
  Zap 
} from 'lucide-react';
import { motion } from 'motion/react';

interface MainMenuProps {
  onSelectMode: (mode: AppMode) => void;
  activePeers: number;
}

export function MainMenu({ onSelectMode, activePeers }: MainMenuProps) {
  return (
    <div className="flex flex-col p-5 space-y-5 text-right font-sans leading-relaxed">
      {/* Dynamic Cosmic Portal Graphic */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-cyan-950/80 to-slate-900 border border-cyan-500/30 p-5 mt-2 shadow-lg shadow-cyan-950/20">
        <div className="absolute right-0 top-0 -mr-6 -mt-6 w-32 h-32 rounded-full bg-cyan-500/10 blur-2xl animate-pulse"></div>
        <div className="absolute left-0 bottom-0 -ml-6 -mb-6 w-32 h-32 rounded-full bg-purple-500/10 blur-2xl animate-pulse"></div>

        <div className="relative flex justify-between items-start">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-900/40 border border-cyan-500/40 text-[10px] text-cyan-300 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            ACTIVE MODE
          </span>
          <div className="text-right">
            <h1 className="text-2xl font-bold bg-gradient-to-l from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent tracking-tight">
              كلاود بورت الكمي
            </h1>
            <p className="text-xs text-cyan-400 font-mono mt-0.5">CloudPort Quantum v3.9</p>
          </div>
        </div>

        <p className="text-slate-300 text-xs mt-3 leading-relaxed">
          انقل ملفاتك وفيديوهاتك من الهاتف السحابي (في كوكب أو مدينة أخرى) إلى هاتفك الرئيسي **بدون إنترنت** وبأقصى سرعة ممكنة عبر الأمواج الضوئية والكمية والصوتية المباشرة!
        </p>

        {/* Local Telemetry */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-800/80 text-[10px] font-mono text-slate-400">
          <div className="bg-slate-950/60 p-1.5 rounded border border-slate-800/50 flex flex-col items-center">
            <span className="text-cyan-400 text-xs font-semibold">تكامل كمي</span>
            <span>مدعوم بالبث الذاتي</span>
          </div>
          <div className="bg-slate-950/60 p-1.5 rounded border border-slate-800/50 flex flex-col items-center">
            <span className="text-emerald-400 text-xs font-semibold">الشبكة المحلية</span>
            <span>بث محلي بالهاتف {activePeers}</span>
          </div>
        </div>
      </div>

      {/* Main Actions Divider */}
      <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest px-1 flex items-center justify-between">
        <span className="h-[1px] bg-slate-800 flex-1 ml-3"></span>
        <span>اختر دور هذا الهاتف للبدء</span>
        <span className="h-[1px] bg-slate-800 flex-1 mr-3"></span>
      </div>

      {/* Role Selection Grid */}
      <div className="grid grid-cols-1 gap-3">
        {/* Real Cloud Link Transfer Card - Primary Highlighted Solution */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectMode('cloud_tunnel')}
          className="relative overflow-hidden w-full text-right p-4.5 rounded-2xl bg-gradient-to-l from-cyan-950/90 to-slate-900 border-2 border-cyan-500 flex items-center gap-4 group transition-all shadow-xl shadow-cyan-950/30"
        >
          <div className="absolute top-0 right-0 w-2 h-full bg-cyan-400"></div>
          <div className="p-3 rounded-xl bg-cyan-500 text-slate-950 ml-auto shrink-0 group-hover:scale-105 transition-transform">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
          <div className="flex-1 min-w-0 pr-1">
            <div className="flex items-center gap-1.5 justify-end">
              <span className="text-[9px] font-black bg-cyan-400 text-slate-950 px-2 py-0.5 rounded-full">🔥 الأكثر طلباً وحقيقي 100%</span>
              <h3 className="font-extrabold text-white text-sm">بوابة الرابط المخصص لك</h3>
            </div>
            <p className="text-[11px] text-cyan-300 font-semibold mt-1">
              ضع هذا الرابط في أي جهاز سحابي وارسل أي فيديو أو ملف كبير، لتجده يظهر على هاتفك ويتحمل فوراً وبكل سهولة!
            </p>
          </div>
        </motion.button>

        {/* Button 1: Cloud Phone Sender */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectMode('cloud_sender')}
          className="relative overflow-hidden w-full text-right p-4 rounded-xl bg-slate-900/90 border border-cyan-800/40 hover:border-cyan-500/80 flex items-center gap-4 group transition-colors shadow-sm"
        >
          <div className="absolute top-0 right-0 w-1.5 h-full bg-cyan-800/60"></div>
          <div className="p-3 rounded-lg bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 ml-auto shrink-0 group-hover:scale-105 transition-transform">
            <Cloud className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0 pr-1">
            <div className="flex items-center gap-1.5 justify-end">
              <span className="text-[9px] font-bold bg-cyan-900 text-cyan-200 px-1.5 py-0.2 rounded">كوكب بعيد</span>
              <h3 className="font-bold text-slate-100 text-sm">الهاتف السحابي (المرسل)</h3>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 lines-2">
              جهز وارفع ملفاتك من الهاتف السحابي البعيد تمهيدًا لبثها بالكم بدون تشغيل إنترنت خلوية أو واي فاي خارجي.
            </p>
          </div>
        </motion.button>

        {/* Button 2: Main Phone Receiver */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectMode('local_receiver')}
          className="relative overflow-hidden w-full text-right p-4 rounded-xl bg-slate-900/90 border border-purple-800/40 hover:border-purple-500/80 flex items-center gap-4 group transition-colors shadow-sm"
        >
          <div className="absolute top-0 right-0 w-1.5 h-full bg-purple-500"></div>
          <div className="p-3 rounded-lg bg-purple-950/80 border border-purple-500/30 text-purple-400 ml-auto shrink-0 group-hover:scale-105 transition-transform">
            <Download className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0 pr-1">
            <div className="flex items-center gap-1.5 justify-end">
              <span className="text-[9px] font-bold bg-purple-900 text-purple-200 px-1.5 py-0.2 rounded">هاتفك الحالي</span>
              <h3 className="font-bold text-slate-100 text-sm">جهازي الرئيسي (المستلم)</h3>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              استقبل وجسّد الملفات المحولة فورًا من الفضاء السحابي إلى جهازك الحالي مباشرة بنقرة واحدة.
            </p>
          </div>
        </motion.button>
      </div>

      {/* Advanced Offline Channels Divider */}
      <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest px-1 flex items-center justify-between pt-1">
        <span className="h-[1px] bg-slate-800 flex-1 ml-3"></span>
        <span>نواتج البث المباشر (أوفلاين 100%)</span>
        <span className="h-[1px] bg-slate-800 flex-1 mr-3"></span>
      </div>

      {/* Futuristic Pure Offline Protocols */}
      <div className="grid grid-cols-2 gap-3">
        {/* QR Beam Code */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => onSelectMode('qr_beam')}
          className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-amber-500/60 flex flex-col items-center justify-center text-center gap-2 group transition-colors"
        >
          <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-900/40 text-amber-400 group-hover:scale-105 transition-transform">
            <QrCode className="w-5 h-5" />
          </div>
          <div className="flex flex-col items-center">
            <h4 className="font-bold text-slate-200 text-xs">شعاع الأكواد الضوئي</h4>
            <span className="text-[9px] text-amber-400 mt-0.5 font-semibold">بث بصري بدون شبكة</span>
          </div>
        </motion.button>

        {/* Acoustic waves code */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => onSelectMode('sound_pulse')}
          className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/60 flex flex-col items-center justify-center text-center gap-2 group transition-colors"
        >
          <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-900/40 text-emerald-400 group-hover:scale-105 transition-transform">
            <Volume2 className="w-5 h-5" />
          </div>
          <div className="flex flex-col items-center">
            <h4 className="font-bold text-slate-200 text-xs">نبض الصوت الكوني</h4>
            <span className="text-[9px] text-emerald-400 mt-0.5 font-semibold">ترددات هرتز المباشرة</span>
          </div>
        </motion.button>
      </div>

      {/* Academy & Info Panel */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => onSelectMode('how_it_works')}
        className="w-full mt-1 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 flex items-center justify-between text-right text-xs"
      >
        <span className="text-cyan-400 font-bold flex items-center gap-1">
          ابدأ التعلم <Sparkles className="w-3.5 h-3.5 animate-bounce" />
        </span>
        <div className="flex items-center gap-2 text-slate-300">
          <span>شرح تقنية الإرسال من كوكب آخر بدون نت</span>
          <BookOpen className="w-4 h-4 text-cyan-400" />
        </div>
      </motion.button>

      {/* Quick notice bottom */}
      <div className="text-center pt-2">
        <p className="text-[9px] text-slate-500 font-mono tracking-wider">
          💡 لا تطلب هذه الأداة أي خوادم خارجية - يتم النقل داخليًا ومحليًا 100%
        </p>
      </div>
    </div>
  );
}
