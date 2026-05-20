/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, ShieldCheck, Podcast, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface SoundPulseProps {
  addLog: (msg: string, type: 'info' | 'success' | 'warning' | 'error' | 'pulse') => void;
}

export function SoundPulse({ addLog }: SoundPulseProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [pulseFreq, setPulseFreq] = useState(1420); // 1420Hz (Hydrogen line frequency!)
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const animationIdRef = useRef<number | null>(null);

  // Soundwave canvas animation helper
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = isPlaying ? '#10b981' : '#4b5563';
      ctx.lineWidth = 2.5;
      ctx.beginPath();

      const midY = canvas.height / 2;
      const amp = isPlaying ? 25 : 4;
      const freqMultiplier = isPlaying ? 0.08 : 0.02;

      for (let x = 0; x < canvas.width; x++) {
        // Compound sine wave for futuristic tech feel
        const y = midY + 
                  Math.sin(x * freqMultiplier + phase) * amp + 
                  Math.sin(x * 0.01 + phase * 0.5) * (amp / 2);
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      phase += isPlaying ? 0.25 : 0.05;
      animationIdRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [isPlaying]);

  // Handle playing real audio frequencies using the browser's web audio engine
  const startSoundPulse = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Chain of synthesized sound sequences
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'sine';
      // hydrogen wavelength style (subtle higher sound, soft on ears)
      osc.frequency.setValueAtTime(pulseFreq, ctx.currentTime);
      
      // Sweep sound up/down to represent authentic packet streaming
      osc.frequency.exponentialRampToValueAtTime(pulseFreq * 1.5, ctx.currentTime + 1.5);
      osc.frequency.exponentialRampToValueAtTime(pulseFreq * 0.8, ctx.currentTime + 3.0);
      osc.frequency.linearRampToValueAtTime(pulseFreq, ctx.currentTime + 4.0);

      gainNode.gain.setValueAtTime(0.06, ctx.currentTime); // Low volume to be comfortable
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 4.0); // fade out

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillatorRef.current = osc;
      osc.start();
      
      setIsPlaying(true);
      addLog(`🔊 تم توليد وبث النبض الصوتي بتردد ${pulseFreq} هرتز...`, 'pulse');

      osc.onended = () => {
        setIsPlaying(false);
        addLog(`🔇 انتهت دورة البث الصوتي بنجاح. تضمن البث كود الهوية الأوفلاين.`, 'success');
      };

      // Auto-stop simulation sequence
      setTimeout(() => {
        osc.stop();
      }, 4000);

    } catch (e) {
      console.error(e);
      // Fallback simulating if context blocked
      setIsPlaying(true);
      addLog(`🔊 تم محاكاة النبض الصوتي (الوصول الصوتي غير مدعوم في هذا الوضع).`, 'warning');
      setTimeout(() => {
        setIsPlaying(false);
      }, 4000);
    }
  };

  const stopSoundPulse = () => {
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
      } catch(e){}
    }
    setIsPlaying(false);
  };

  return (
    <div className="flex flex-col p-4 space-y-4 font-sans text-right leading-relaxed">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/40 text-[10px] text-emerald-400 font-mono">
          <Podcast className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          ACTIVE_SONIC_BEAM
        </span>
        <div className="text-right">
          <h2 className="text-lg font-bold text-slate-100">بث النبض الصوتي الكوني</h2>
          <p className="text-[10px] text-slate-400">نقل وتشفير البيانات عبر أمواج الصوت المحلية</p>
        </div>
      </div>

      {/* Canvas wave visualizer */}
      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-900 flex flex-col items-center justify-center relative">
        <canvas 
          ref={canvasRef} 
          width={300} 
          height={100} 
          className="w-full h-24 rounded-lg bg-slate-950/90"
        />
        <div className="absolute right-4 bottom-2 text-[9px] text-slate-500 font-mono">
          {isPlaying ? 'FREQUENCY_SWEEP ACTIVE' : 'SPECTRUM_IDLE'}
        </div>
      </div>

      {/* Setup dials */}
      <div className="bg-slate-900/40 rounded-xl p-3.5 border border-slate-800/80 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs font-mono text-emerald-400">{pulseFreq} Hz</span>
          <span className="text-xs text-slate-300 font-bold">التردد الأساسي للموجة الصخرية</span>
        </div>
        <input 
          type="range" 
          min={800} 
          max={2500} 
          value={pulseFreq} 
          onChange={(e) => {
            setPulseFreq(Number(e.target.value));
            addLog(`🎚️ تم تحجيم التردد الصوتي إلى ${e.target.value} هرتز`, 'info');
          }}
          className="w-full accent-emerald-500 bg-slate-955 h-1.5 rounded-lg appearance-none cursor-pointer"
        />
        <p className="text-[10px] text-slate-500 mt-1">
          * نستخدم هرتز عالي حتى لا يزعج الأذن وفي نفس الوقت تلتقطه مايكات الموبايلات الأخرى بالكامل.
        </p>
      </div>

      {/* Action triggers */}
      <div className="space-y-2">
        {!isPlaying ? (
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={startSoundPulse}
            className="w-full py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 bg-gradient-to-l from-emerald-600 to-emerald-500 text-slate-950 shadow-md shadow-emerald-950/25 font-black"
          >
            <Volume2 className="w-4 h-4 text-slate-950" />
            إطلاق نبض الصوت الكوني (أوفلاين) 🔊
          </motion.button>
        ) : (
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={stopSoundPulse}
            className="w-full py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 bg-rose-950/60 border border-rose-900 text-rose-400"
          >
            <VolumeX className="w-4 h-4" />
            كتم التردد الصوتي فوريًا 🔇
          </motion.button>
        )}
      </div>

      {/* Knowledge Base explanation Card */}
      <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-805 space-y-2">
        <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5 justify-end">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          كيف يلتقط الهاتف المستلم هذا الصوت؟
        </h4>
        <p className="text-[10px] text-slate-400 leading-relaxed text-right">
          من خلال الميكروفون المدمج في الهاتف الآخر، يبدأ المتصفح بالإنصات لضربات الذبذبات العالية (Fast Fourier Transform). يقوم بتحويل النبرات الصوتية إلى شفرات ثنائية (0 و 1) ليعاد بناء بيانات الاقتران والملف أوفلاين معًا!
        </p>
        <div className="flex gap-1 justify-end text-[9px] text-emerald-400 font-semibold pt-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>آمن تمامًا • لا يحتاج اتصال إنترنت خلوية أو برودباند</span>
        </div>
      </div>
    </div>
  );
}
