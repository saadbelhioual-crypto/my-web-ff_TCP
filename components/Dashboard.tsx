'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, Play, LogOut, Terminal } from 'lucide-react';
import toast from 'react-hot-toast';
import TerminalConsole from './TerminalConsole';

interface DashboardProps {
  onLogout: () => void;
}

interface LogEntry {
  id: number;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
  timestamp: Date;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [guestId, setGuestId] = useState('');
  const [guestPassword, setGuestPassword] = useState('');
  const [isBotRunning, setIsBotRunning] = useState(false);
  const [showConsole, setShowConsole] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const addLog = (message: string, type: LogEntry['type'] = 'info') => {
    setLogs(prev => [...prev, {
      id: Date.now(),
      message,
      type,
      timestamp: new Date()
    }]);
  };

  const startBot = async () => {
    if (!guestId || !guestPassword) {
      toast.error('Please enter both Guest ID and Password');
      return;
    }

    setIsBotRunning(true);
    setShowConsole(true);
    addLog('🚀 Initializing RAGNAR Bot System...', 'info');
    addLog(`📝 Target Guest ID: ${guestId}`, 'info');
    
    try {
      addLog('🔐 Authenticating credentials...', 'info');
      
      const response = await fetch('/api/bot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          guest_id: guestId,
          guest_password: guestPassword,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        addLog('✅ Authentication successful!', 'success');
        addLog('🎮 Starting Free Fire Bot Engine...', 'info');
        addLog('🔄 Connecting to game servers...', 'info');
        
        // Simulate bot process with real-time logs
        setTimeout(() => addLog('⚙️ Initializing protocol buffers...', 'info'), 1000);
        setTimeout(() => addLog('🌐 Establishing secure connection...', 'info'), 2000);
        setTimeout(() => addLog('🎯 Bot is now active and farming!', 'success'), 3000);
        setTimeout(() => addLog('💎 Resources collected: 1,234 Diamonds', 'success'), 5000);
        setTimeout(() => addLog('🏆 XP Gained: 5,000', 'success'), 7000);
        
        toast.success('Bot started successfully!');
      } else {
        addLog(`❌ Error: ${data.error || 'Authentication failed'}`, 'error');
        toast.error('Failed to start bot');
        setIsBotRunning(false);
      }
    } catch (error) {
      addLog(`❌ Connection error: ${error}`, 'error');
      toast.error('Failed to connect to server');
      setIsBotRunning(false);
    }
  };

  const stopBot = () => {
    setIsBotRunning(false);
    addLog('🛑 Bot stopped by user', 'warning');
    toast.success('Bot stopped');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-6xl mx-auto px-4"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Control Panel */}
        <div className="relative p-[2px] rounded-2xl overflow-hidden">
          <div className="absolute inset-0 rotating-conic rounded-2xl" />
          <div className="relative bg-black/90 backdrop-blur-xl rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
                BOT CONTROL PANEL
              </h2>
              <button
                onClick={onLogout}
                className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors flex items-center gap-2 text-sm"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={guestId}
                  onChange={(e) => setGuestId(e.target.value)}
                  placeholder="YOUR GUEST ID"
                  className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-white"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  value={guestPassword}
                  onChange={(e) => setGuestPassword(e.target.value)}
                  placeholder="YOUR GUEST PASSWORD"
                  className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-white"
                />
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={startBot}
                  disabled={isBotRunning}
                  className="flex-1 py-3 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg font-semibold text-white relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Play className="w-5 h-5" />
                    {isBotRunning ? 'BOT RUNNING...' : 'START BOT'}
                  </span>
                </motion.button>

                {isBotRunning && (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    onClick={stopBot}
                    className="px-6 py-3 bg-red-600 rounded-lg font-semibold text-white hover:bg-red-700 transition-colors"
                  >
                    STOP
                  </motion.button>
                )}
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-900/30 rounded-lg border border-gray-800">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Terminal className="w-4 h-4" />
                <span>System Status:</span>
                <span className={isBotRunning ? 'text-green-500' : 'text-red-500'}>
                  {isBotRunning ? 'ACTIVE' : 'STANDBY'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Terminal Console */}
        <AnimatePresence>
          {showConsole && (
            <TerminalConsole logs={logs} onClose={() => setShowConsole(false)} />
          )}
        </AnimatePresence>
      </div>

      {/* Background Music */}
      <audio
        id="bg-music"
        loop
        preload="auto"
        className="hidden"
      >
        <source src="/background-music.mp3" type="audio/mpeg" />
      </audio>
    </motion.div>
  );
}
