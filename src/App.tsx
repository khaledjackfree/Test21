/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AppMode, QuantumFile, SyncLog } from './types';
import { MobileFrame } from './components/MobileFrame';
import { MainMenu } from './components/MainMenu';
import { CloudPhoneSimulator } from './components/CloudPhoneSimulator';
import { LocalReceiver } from './components/LocalReceiver';
import { QRBeamStream } from './components/QRBeamStream';
import { SoundPulse } from './components/SoundPulse';
import { HowItWorks } from './components/HowItWorks';
import { CloudTunnel } from './components/CloudTunnel';
import { ChevronLeft, Info, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [mode, setMode] = useState<AppMode>('menu');
  const [activePayloads, setActivePayloads] = useState<QuantumFile[]>([]);
  const [preparedQRFile, setPreparedQRFile] = useState<QuantumFile | null>(null);
  
  // Custom public room ID
  const [roomId, setRoomId] = useState('khaled');
  
  // High-fidelity active connection points counter
  const [activePeers, setActivePeers] = useState(1);

  // Initialize immersive holographic terminal logs
  const [logs, setLogs] = useState<SyncLog[]>([
    { id: '1', time: '09:12:01', message: '📡 تم تفعيل نظام البث الكمي المتعدد للاندرويد والآيفون.', type: 'info' },
    { id: '2', time: '09:12:03', message: '📶 القناة المؤمنة أوفلاين (بدون إنترنت خارجي) مهيأة بنجاح.', type: 'success' },
    { id: '3', time: '09:12:04', message: '🪐 بانتظار إرسال الحزم من الهاتف السحابي المبتعد...', type: 'pulse' }
  ]);

  const addLog = (message: string, type: 'info' | 'success' | 'warning' | 'error' | 'pulse') => {
    const timeString = new Date().toLocaleTimeString('ar-EG', { hour12: false });
    const newLog: SyncLog = {
      id: `log-${Date.now()}`,
      time: timeString,
      message,
      type
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  // Simulate active surrounding peers oscillating
  useEffect(() => {
    // Parse room parameters directly from query to route automatically
    const params = new URLSearchParams(window.location.search);
    const urlRoom = params.get('room');
    if (urlRoom) {
      setRoomId(urlRoom.trim().toLowerCase());
      setMode('cloud_tunnel');
    }

    const interval = setInterval(() => {
      setActivePeers((prev) => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const next = prev + change;
        return next < 1 ? 1 : next > 4 ? 3 : next;
      });
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const handleAddTransferPayload = (file: QuantumFile) => {
    setActivePayloads([file]);
    addLog(`📤 تم استقبال الملف "${file.name}" في المصف السحابي الكمي البيني.`, 'success');
  };

  const handlePrepareForQRBeam = (file: QuantumFile) => {
    setPreparedQRFile(file);
    setMode('qr_beam');
    addLog(`🌟 تم تحويل الهيكل البيني للملف ليتناسب مع البث الضوئي المتسلسل.`, 'success');
  };

  const handleClearPayloads = () => {
    setActivePayloads([]);
    addLog(`🧹 تم تفريغ وتطهير قناة النقل الكمي بنجاح.`, 'info');
  };

  return (
    <MobileFrame>
      <div className="flex flex-col min-h-full">
        {/* Navigation header inside sub-menus */}
        {mode !== 'menu' && (
          <div className="bg-slate-900 border-b border-slate-800/60 px-4 py-3 flex items-center justify-between z-10 sticky top-0 shrink-0">
            <button
              onClick={() => {
                setMode('menu');
                addLog(`🏡 العودة إلى لوحة التحكم الرئيسية.`, 'info');
              }}
              className="p-1.5 px-3 rounded-lg bg-slate-950 text-slate-300 border border-slate-800 text-xs flex items-center gap-1.5 hover:text-white hover:border-slate-700 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-cyan-400" />
              <span>القائمة الرئيسية</span>
            </button>
            <span className="text-xs font-bold text-slate-200 tracking-tight font-sans">
              {mode === 'cloud_sender' && 'الهاتف السحابي (المرسل)'}
              {mode === 'local_receiver' && 'جهازي الرئيسي (المستلم)'}
              {mode === 'cloud_tunnel' && 'بوابة النقل بالرابط السحابي'}
              {mode === 'qr_beam' && 'شعاع أكواد الماتريكس'}
              {mode === 'sound_pulse' && 'بث الترددات الصوتية'}
              {mode === 'how_it_works' && 'أكاديمية كلاود بورت'}
            </span>
          </div>
        )}

        {/* Content switch with smooth slide fade motion */}
        <div className="flex-1 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.15, ease: 'easeInOut' }}
              className="w-full h-full flex flex-col"
            >
              {mode === 'menu' && (
                <MainMenu 
                  onSelectMode={setMode} 
                  activePeers={activePeers} 
                />
              )}

              {mode === 'cloud_sender' && (
                <CloudPhoneSimulator
                  onAddTransferPayload={handleAddTransferPayload}
                  logs={logs}
                  addLog={addLog}
                  onPrepareForQRBeam={handlePrepareForQRBeam}
                />
              )}

              {mode === 'local_receiver' && (
                <LocalReceiver
                  activePayloads={activePayloads}
                  logs={logs}
                  addLog={addLog}
                  onClearPayloads={handleClearPayloads}
                />
              )}

              {mode === 'qr_beam' && (
                <QRBeamStream
                  preparedFile={preparedQRFile}
                  addLog={addLog}
                />
              )}

              {mode === 'sound_pulse' && (
                <SoundPulse
                  addLog={addLog}
                />
              )}

              {mode === 'cloud_tunnel' && (
                <CloudTunnel
                  roomId={roomId}
                  setRoomId={setRoomId}
                  addLog={addLog}
                />
              )}

              {mode === 'how_it_works' && (
                <HowItWorks
                  onBack={() => setMode('menu')}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </MobileFrame>
  );
}
