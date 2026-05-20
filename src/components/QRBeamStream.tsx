/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { QuantumFile } from '../types';
import { 
  QrCode, 
  Camera, 
  StopCircle, 
  ShieldAlert, 
  RefreshCw, 
  Sparkles, 
  CheckCircle2,
  Lock,
  Bolt
} from 'lucide-react';
import { motion } from 'motion/react';

interface QRBeamStreamProps {
  preparedFile: QuantumFile | null;
  addLog: (msg: string, type: 'info' | 'success' | 'warning' | 'error' | 'pulse') => void;
}

export function QRBeamStream({ preparedFile, addLog }: QRBeamStreamProps) {
  const [beamMode, setBeamMode] = useState<'send' | 'receive'>('send');
  const [isPlayingStream, setIsPlayingStream] = useState(false);
  const [currentChunk, setCurrentChunk] = useState(0);
  const [totalChunks, setTotalChunks] = useState(24);
  const [scanProgress, setScanProgress] = useState(0);
  const [isCapturingWebcam, setIsCapturingWebcam] = useState(false);
  const [cameraPermissionError, setCameraPermissionError] = useState(false);
  const [lockStatus, setLockStatus] = useState<'searching' | 'locked' | 'success'>('searching');

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const fileToTransmit = preparedFile || {
    id: 'qr-sample',
    name: 'بيانات_الفضاء_المشفرة.mp4',
    size: 5200000,
    type: 'video/mp4',
    planetSource: 'كوكب فيدا السحابي (Kepler-452b)'
  };

  // Fast flashing chunk simulator for Broadcaster mode
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlayingStream && beamMode === 'send') {
      timer = setInterval(() => {
        setCurrentChunk((prev) => {
          if (prev >= totalChunks - 1) {
            addLog(`✅ شعاع الأكواد أكمل الدورة الكاملة للبث البصري!`, 'success');
            return 0; // loop
          }
          return prev + 1;
        });
      }, 150); // High-speed blinking
    }
    return () => clearInterval(timer);
  }, [isPlayingStream, beamMode, totalChunks]);

  // Handle webcam start for scanning mode
  const startCamera = async () => {
    setCameraPermissionError(false);
    setIsCapturingWebcam(true);
    setScanProgress(0);
    setLockStatus('searching');
    addLog(`📸 جارِ فتح كاميرا الموبايل للاستماع البصري...`, 'info');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', 'true');
        videoRef.current.play();
      }

      // Simulate a smart optical decoding locking cycle of 5 seconds
      setTimeout(() => {
        setLockStatus('locked');
        addLog(`🎯 تم إقفال البث الضوئي وجاري تفكيك ذرات الملف...`, 'warning');
      }, 2000);

      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setLockStatus('success');
            stopCamera();
            addLog(`🧬 تم امتصاص وإعادة دمج الملف من الأكواد الضوئية بنجاح 100%!`, 'success');
            return 100;
          }
          return prev + 5;
        });
      }, 300);

    } catch (err) {
      console.error(err);
      setCameraPermissionError(true);
      setIsCapturingWebcam(false);
      addLog(`❌ فشل الوصول للكاميرا. يرجى إعطاء صلاحيات الكاميرا للمتصفح.`, 'error');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCapturingWebcam(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="flex flex-col p-4 space-y-4 font-sans text-right leading-relaxed">
      {/* Tab Switcher */}
      <div className="grid grid-cols-2 p-1 bg-slate-900 rounded-xl border border-slate-800">
        <button
          onClick={() => {
            setBeamMode('receive');
            setIsPlayingStream(false);
            stopCamera();
          }}
          className={`py-2 text-xs font-bold rounded-lg transition-colors ${
            beamMode === 'receive' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          📷 استقبال بالمسح البصري
        </button>
        <button
          onClick={() => {
            setBeamMode('send');
            stopCamera();
          }}
          className={`py-2 text-xs font-bold rounded-lg transition-colors ${
            beamMode === 'send' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          ⚡ إرسال بشعاع الأكواد
        </button>
      </div>

      {/* Mode 1: TRANSMITTER (Blinker) */}
      {beamMode === 'send' && (
        <div className="space-y-4">
          <div className="text-center p-3 bg-slate-900/60 rounded-xl border border-slate-800">
            <h3 className="font-bold text-sm text-slate-200">بث ضوئي متسلسل</h3>
            <p className="text-[10px] text-slate-400 mt-1">
              الملف الحالي: <span className="font-mono text-amber-400">{fileToTransmit.name}</span>
            </p>
          </div>

          {/* Glowing Animated QR simulation box */}
          <div className="mx-auto w-64 h-64 bg-white rounded-2xl p-4 flex flex-col items-center justify-center relative shadow-lg shadow-amber-950/20">
            {isPlayingStream ? (
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                {/* Simulated high-speed Matrix pattern stream */}
                <div className="grid grid-cols-8 gap-1 w-full h-full opacity-90">
                  {Array.from({ length: 64 }).map((_, i) => {
                    const seed = (i + currentChunk) % 7;
                    const fill = seed === 0 || seed === 2 || seed === 5 || seed === 6;
                    return (
                      <div 
                        key={i} 
                        className={`w-full h-full transition-all duration-100 ${
                          fill ? 'bg-slate-950' : 'bg-transparent'
                        }`}
                      ></div>
                    );
                  })}
                </div>
                {/* Neon overlay */}
                <div className="absolute inset-0 border-4 border-amber-500/80 rounded animate-pulse pointer-events-none"></div>
                <div className="absolute bg-slate-950 text-amber-400 font-mono text-[9px] px-2 py-0.5 rounded border border-amber-500 font-bold">
                  D_CHUNK: {currentChunk + 1} / {totalChunks}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center space-y-3">
                <QrCode className="w-24 h-24 text-slate-900 animate-pulse" />
                <p className="text-[11px] text-slate-600 font-semibold px-4">
                  انقر على الزر بالأسفل لتوليد شعاع الموجات الكودية
                </p>
              </div>
            )}
          </div>

          {/* Stream Controls */}
          <div className="text-center">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsPlayingStream(!isPlayingStream)}
              className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 ${
                isPlayingStream 
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-950/20' 
                  : 'bg-amber-500 text-slate-950 shadow-md shadow-amber-950/30 font-black'
              }`}
            >
              {isPlayingStream ? (
                <>
                  <StopCircle className="w-4 h-4" />
                  إيقاف البث الكودي المباشر
                </>
              ) : (
                <>
                  <Bolt className="w-4 h-4" />
                  تفعيل الإشعاع البصري السريع 📱⚡
                </>
              )}
            </motion.button>
            <p className="text-[10px] text-slate-500 mt-2">
              * وجه كاميرا الموبايل المستلم إلى هذا المربع ليباشر فك التشفير محليًا وأوفلاين فورًا.
            </p>
          </div>
        </div>
      )}

      {/* Mode 2: RECEIVER (Camera scanner) */}
      {beamMode === 'receive' && (
        <div className="space-y-4">
          <div className="text-center p-3 bg-slate-900/60 rounded-xl border border-slate-800">
            <h3 className="font-bold text-sm text-slate-200 font-sans">امتصاص الموجات وتحليل الأكواد</h3>
            <p className="text-[10px] text-slate-400 mt-1">
              افتح كاميرا الموبايل والتقط الأنماط المتسلسة للشاشة الأخرى للحصول على الملف.
            </p>
          </div>

          {/* Camera Stream Box */}
          <div className="relative mx-auto w-64 h-64 bg-slate-900 rounded-2xl border-2 border-dashed border-slate-700 overflow-hidden flex flex-col items-center justify-center">
            {isCapturingWebcam ? (
              <div className="w-full h-full relative">
                <video 
                  ref={videoRef} 
                  className="w-full h-full object-cover scale-x-1" 
                  muted 
                  playsInline
                />
                {/* Cybernetic overlay target screen */}
                <div className="absolute inset-4 border-2 border-emerald-500/50 rounded pointer-events-none">
                  {/* Rotating Scanning HUD Corner highlights */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-emerald-400"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-emerald-400"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-emerald-400"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-emerald-400"></div>
                  
                  {/* Horiz line animate */}
                  <div className="w-full h-0.5 bg-emerald-400 opacity-80 absolute top-1/2 left-0 -translate-y-1/2 animate-bounce"></div>
                </div>

                {/* Status HUD widget */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-slate-950/80 px-2.5 py-1 rounded border border-emerald-500/50 text-[9px] font-mono text-emerald-400 flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5" />
                  {lockStatus === 'searching' && 'أبحث عن التردد...'}
                  {lockStatus === 'locked' && 'مغلق! جاري السحب...'}
                  {lockStatus === 'success' && 'تم التنزيل بالكامل!'}
                </div>
              </div>
            ) : lockStatus === 'success' ? (
              <div className="p-4 text-center space-y-3 relative z-10">
                <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-xs text-slate-200">اكتمل التفكيك وبناء الملف</h4>
                <p className="text-[10px] text-slate-400">
                  تمت محاذاة كل البلوكات بنجاح ({totalChunks}/{totalChunks})
                </p>
                <button 
                  onClick={() => setLockStatus('searching')}
                  className="px-3 py-1 bg-slate-950 text-slate-300 rounded border border-slate-800 text-[10px]"
                >
                  إعادة مسح جديد
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-4 space-y-4">
                <Camera className="w-12 h-12 text-slate-600 animate-pulse" />
                <p className="text-[11px] text-slate-500">
                  يرجى تفعيل الكاميرا والاقتراب من شاشة النقل الأخرى لبدء التدفق الضوئي.
                </p>
                <div className="w-full border-t border-slate-850 my-1"></div>
                <button
                  onClick={() => {
                    setLockStatus('searching');
                    addLog(`🧬 تم رصد نافذة بث الأكواد على نفس الهاتف! جاري امتصاص الحزم عبر البوابة الارتدادية...`, 'pulse');
                    let progress = 0;
                    const interval = setInterval(() => {
                      progress += 10;
                      setScanProgress(progress);
                      if (progress >= 100) {
                        clearInterval(interval);
                        setLockStatus('success');
                        addLog(`🎉 اكتمل النقل الذاتي بنجاح 100% بدون استهلاك باقة أو كاميرا!`, 'success');
                      }
                    }, 150);
                  }}
                  className="w-full py-2 px-3 bg-cyan-950/40 hover:bg-cyan-950/70 border border-cyan-800/40 text-cyan-300 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 animate-bounce" />
                  <span>حل مشكلة "جهازين في هاتف واحد": السحب الارتدادي الذكي</span>
                </button>
              </div>
            )}
          </div>

          {/* Action button to boot camera */}
          <div className="space-y-2">
            {!isCapturingWebcam && lockStatus !== 'success' && (
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={startCamera}
                className="w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 bg-gradient-to-l from-emerald-600 to-teal-500 text-slate-950 shadow-md shadow-emerald-950/20"
              >
                <Camera className="w-4 h-4 text-slate-950" />
                تفعيل الكاميرا الضوئية للأوفلاين 
              </motion.button>
            )}

            {isCapturingWebcam && (
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  stopCamera();
                  setIsCapturingWebcam(false);
                }}
                className="w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 bg-rose-950/60 border border-rose-900 text-rose-400"
              >
                إيقاف تشغيل دبابات الكاميرا
              </motion.button>
            )}

            {/* If camera fails or simulated scanner needs feedback, we show a nice fallback */}
            {cameraPermissionError && (
              <div className="p-3 bg-red-950/40 border border-red-900/40 rounded-lg text-red-400 text-[10px] flex items-start gap-2 text-right">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <strong>انتبه:</strong> كود الكاميرا محجوب في بيئة الإطارات الفرعية (iFrames) في المعاينة الافتراضية. لإصلاح ذلك محليًا، يمكنك تجربة الإرسال التلقائي في التبويبات الفلكية، أو استخدام زر **المحاكاة الفورية**.
                </div>
              </div>
            )}

            {isCapturingWebcam && (
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px] text-slate-400">
                  <span>{scanProgress}% اكتمل</span>
                  <span>معادلة البلوك الكودي الحقيقي</span>
                </div>
                <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${scanProgress}%` }}></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
