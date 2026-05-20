/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { BookOpen, Sparkles, Orbit, Smartphone, Volume2, QrCode, HelpCircle, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HowItWorksProps {
  onBack: () => void;
}

export function HowItWorks({ onBack }: HowItWorksProps) {
  const [activeTab, setActiveTab] = useState<'cloud' | 'offline' | 'optical' | 'termux'>('cloud');

  const tabs = [
    { id: 'cloud', title: 'الهاتف السحابي', icon: Orbit },
    { id: 'offline', title: 'النقل بدون نت', icon: Smartphone },
    { id: 'optical', title: 'موجات البث', icon: QrCode },
    { id: 'termux', title: 'دليل تيرمكس 💻', icon: Sparkles },
  ];

  return (
    <div className="flex flex-col p-5 space-y-5 text-right font-sans leading-relaxed">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <button 
          onClick={onBack}
          className="p-1 px-3 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          رجوع
        </button>
        <div className="text-right">
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-1.5 justify-end">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            أكاديمية كلاود بورت
          </h2>
          <p className="text-[10px] text-slate-400">فهم علوم وتقنيات النقل الكمي المباشر أوفلاين</p>
        </div>
      </div>

      {/* Intro visual */}
      <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800 text-center space-y-2">
        <Sparkles className="w-8 h-8 mx-auto text-cyan-400 animate-pulse" />
        <h3 className="font-bold text-sm text-slate-200">الربط الكهرومغناطيسي المباشر</h3>
        <p className="text-[11px] text-slate-300">
          كيف يستطيع متصفح ويب على هاتفين تبادل ملفات فيديو ضخمة دون دفع تكلفة حزم إنترنت وبآمان تام؟
        </p>
      </div>

      {/* Horiz tab select */}
      <div className="grid grid-cols-2 xs:grid-cols-4 gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800 text-xs text-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isSel = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`p-2 rounded-md font-bold text-[10px] flex flex-col items-center gap-1 transition-colors ${
                isSel ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.title}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents explained in beautiful layout */}
      <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 min-h-[160px]">
        <AnimatePresence mode="wait">
          {activeTab === 'cloud' && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="space-y-2 text-right"
            >
              <h4 className="font-bold text-xs text-cyan-400">💡 ما هو الهاتف السحابي ومنظومة الفضاء؟</h4>
              <p className="text-slate-300 text-[11px]">
                الهاتف السحابي هو جهاز يعمل بكامل طاقته على خوادم سحابية متباعدة (في مدينة أخرى أو منطقة شمسية بعيدة). 
              </p>
              <p className="text-slate-400 text-[10px] leading-relaxed">
                نقوم في **كلاود بورت** بتبخير الملف من هاتفك السحابي وتحويله إلى صيغة نبضية مشفرة، ليتم سحبه والتقاطه من هاتفك الرئيسي بلمحة بصر وبدون استهلاك كابلات أو إنترنت.
              </p>
            </motion.div>
          )}

          {activeTab === 'offline' && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="space-y-2 text-right"
            >
              <h4 className="font-bold text-xs text-cyan-400">📶 كيف يتم النقل أوفلاين بالكامل (بدون نت)؟</h4>
              <p className="text-slate-300 text-[11px]">
                معظم تطبيقات المتصفحات الحديثة تحفظ الكود الفعلي للعمل محليًا (عبر مخازن الكاش والـ Service Workers).
              </p>
              <p className="text-slate-400 text-[10px] leading-relaxed">
                بمجرد فتحك للتطبيق أول مرة، يعمل الموقع محليًا كليًا على هاتفك. يمكنك فصل الواي فاي وبيانات الهاتف كليًا، وسيظل بإمكان الجهازين إستقاء وبث الملفات الضوئية أو عبر شبكات الإرسال لشبكة الويب الداخلية Local P2P!
              </p>
            </motion.div>
          )}

          {activeTab === 'optical' && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="space-y-2 text-right"
            >
              <h4 className="font-bold text-xs text-cyan-400">🔊 النبضات الضوئية والصوتية التفاعلية</h4>
              <p className="text-slate-300 text-[11px]">
                عند انقطاع الأثير، نستخدم الحواس الرائدة للموبايل للتحويل:
              </p>
              <ul className="text-slate-400 text-[10px] space-y-1.5 list-disc pr-3">
                <li>
                  <strong>البث الكودي الضوئي</strong>: تفتيت الملف إلى بلوكات بكسلية تومض بسرعة عالية، لتلتقطها شاشة الموبايل الآخر ويدمج الـ Bytes.
                </li>
                <li>
                  <strong>بث الهرتز الصوتي</strong>: حاقن بروتوكول صوتي يعيد توليد ثوابت الملف بنبضات ميكانيكية تلتقطها الميكروفونات.
                </li>
              </ul>
            </motion.div>
          )}

          {activeTab === 'termux' && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="space-y-3 text-right"
            >
              <h4 className="font-bold text-xs text-cyan-400">🛡️ كيف تشغل هذا الكود داخل Termux لنقل أوفلاين 100%؟</h4>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                سؤالك ذكي جداً! إذا قمت بتشغيل هذا التطبيق على هاتفك محلياً داخل **تيرمكس (Termux)**، سيمتلك خادماً حقيقياً بالكامل على جهازك. إليك الخطوات بالترتيب لجعله مجانياً تماماً وبدون إنترنت:
              </p>
              
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850 space-y-1 text-[9.5px] text-slate-300 font-mono text-left tracking-wide">
                <div># 1. تثبيت Node.js و Git في تيرمكس:</div>
                <div className="text-cyan-450 font-bold">pkg update && pkg install nodejs git -y</div>
                <div className="mt-1.5"># 2. تشغيل السيرفر والمشروع محلياً:</div>
                <div className="text-emerald-400 font-bold">npm install && npm run build && node dist/server.cjs</div>
              </div>

              <div className="space-y-1.5 text-[10px] text-slate-400">
                <p className="font-bold text-slate-200">🚀 آلية التحميل بدون إنترنت (0% باقة):</p>
                <ol className="list-decimal list-inside space-y-1 pr-1.5 leading-relaxed">
                  <li>شغّل <strong>نقطة اتصال المحمول (Hotspot)</strong> من هاتفك الرئيسي (لا يشترط وجود نت على الخط).</li>
                  <li>اجعل الهاتف السحابي (أو أي جهاز آخر متصل بالنت) يرفع الملف أولاً ثم قم بتنزيله وقتما تشاء عندما تتصل بالإنترنت.</li>
                  <li><strong>نقل محلي بدون نت كامل:</strong> اتصل مع جهازك الآخر على نفس نقطة الواي فاي، وافتح الرابط <code className="text-cyan-400 px-1 bg-slate-950 font-mono text-[9px] rounded">http://[YOUR_IP]:3000</code> وسيحدث نقل محلي بسرعة الهواء الصاروخية ومجاناً تماماً!</li>
                </ol>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scientific Trivia */}
      <div className="p-3 bg-slate-950 rounded-xl border border-slate-900 border-r-4 border-r-cyan-500 font-mono text-[10px] text-slate-400">
        <div>🔒 النقل آمن محليًا ولا يُبث لأي جهة خارجية.</div>
        <div className="mt-1">✅ أقصى قدرة محصنة للمتصفحات الحديثة.</div>
      </div>
    </div>
  );
}
