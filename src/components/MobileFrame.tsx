/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode, useState, useEffect } from 'react';
import { WifiOff, ShieldCheck, Battery, Radio } from 'lucide-react';

interface MobileFrameProps {
  children: ReactNode;
}

export function MobileFrame({ children }: MobileFrameProps) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="mobile-shell" className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col justify-start items-center p-0 md:p-4 overflow-hidden selection:bg-cyan-500 selection:text-slate-900">
      {/* Outer desktop mockup container - if viewed on desktop, it makes it look like a phone */}
      <div className="w-full max-w-md md:max-w-sm h-screen md:h-[840px] bg-slate-900 md:rounded-[40px] md:border-8 md:border-slate-800 md:shadow-2xl relative flex flex-col overflow-hidden">
        {/* Dynamic Notch / Island on top */}
        <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-slate-900 rounded-b-2xl z-50 flex items-center justify-center">
          <div className="w-12 h-1 bg-slate-950 rounded-full mb-1"></div>
        </div>

        {/* Top Status Bar tailored for Local Space Transfer */}
        <div id="status-bar" className="w-full h-10 px-6 pt-2 bg-slate-950 flex items-center justify-between text-[11px] font-mono tracking-widest text-slate-400 select-none z-40 shrink-0">
          <div className="flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="text-[10px] font-bold text-cyan-300">QUANTUM_NET</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <ShieldCheck className="w-3 h-3" />
              أوفلاين وبآمان 
            </span>
            <WifiOff className="w-3.5 h-3.5 text-amber-500" />
            <Battery className="w-4 h-4 text-slate-300" />
            <span className="font-semibold text-slate-200">{time}</span>
          </div>
        </div>

        {/* App Main Body View */}
        <div className="flex-1 w-full bg-slate-950 flex flex-col relative overflow-y-auto overflow-x-hidden pb-6">
          {children}
        </div>
      </div>
    </div>
  );
}
