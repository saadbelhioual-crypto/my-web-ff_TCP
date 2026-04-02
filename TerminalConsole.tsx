'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Terminal as TerminalIcon } from 'lucide-react';

interface LogEntry {
  id: number;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
  timestamp: Date;
}

interface TerminalConsoleProps {
  logs: LogEntry[];
  onClose: () => void;
}

export default function TerminalConsole({ logs, onClose }: TerminalConsoleProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const getLogColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-400';
      case 'error': return 'text-red-400';
      case 'warning': return 'text-yellow-400';
      default: return 'text-blue-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="relative p-[2px] rounded-2xl overflow-hidden"
    >
      <div className="absolute inset-0 rotating-conic rounded-2xl" />
      <div className="relative bg-black/95 backdrop-blur-xl rounded-2xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-5 h-5 text-green-400" />
            <h3 className="text-lg font-semibold text-green-400">RAGNAR TERMINAL v1.0</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div
          ref={scrollRef}
          className="h-96 overflow-y-auto p-4 font-mono text-sm terminal-scroll"
        >
          {logs.map((log) => (
            <div key={log.id} className="mb-2">
              <span className="text-gray-500">[{log.timestamp.toLocaleTimeString()}]</span>{' '}
              <span className={getLogColor(log.type)}>{log.message}</span>
            </div>
          ))}
          {logs.length === 0 && (
            <div className="text-gray-500 text-center mt-32">
              <TerminalIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Waiting for bot initialization...</p>
              <p className="text-xs mt-2">System ready</p>
            </div>
          )}
        </div>
        
        <div className="p-2 border-t border-gray-800 bg-black/50">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Active Connection: {logs.length} logs recorded</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}