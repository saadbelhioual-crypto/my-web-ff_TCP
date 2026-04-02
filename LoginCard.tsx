'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Key, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

interface LoginCardProps {
  onLogin: (password: string) => void;
}

const CORRECT_PASSWORD = 'RAGNAR-FF10-FREE';

export default function LoginCard({ onLogin }: LoginCardProps) {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      if (password === CORRECT_PASSWORD) {
        toast.success('Access Granted! Welcome Ragnar.');
        onLogin(password);
      } else {
        toast.error('Access Denied! Invalid Security Key.');
        setPassword('');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="relative z-10 w-full max-w-md"
    >
      <div className="relative p-[2px] rounded-2xl overflow-hidden">
        <div className="absolute inset-0 rotating-conic rounded-2xl" />
        <div className="relative bg-black/90 backdrop-blur-xl rounded-2xl p-8">
          <div className="text-center mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-4"
            >
              <Shield className="w-16 h-16 text-blue-500" />
            </motion.div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              RAGNAR SECURITY
            </h1>
            <p className="text-gray-400 mt-2">Enter your access key</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Security Key"
                className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-white"
                autoFocus
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-red-600 to-blue-600 rounded-lg font-semibold text-white relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Key className="w-5 h-5" />
                {isLoading ? 'VERIFYING...' : 'UNLOCK SYSTEM'}
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-red-600"
                initial={{ x: '100%' }}
                animate={{ x: isLoading ? '0%' : '100%' }}
                transition={{ duration: 0.5 }}
              />
            </motion.button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-500">
            <p>⚡ RAGNAR SECURE ACCESS ⚡</p>
            <p className="mt-1">Authorized Personnel Only</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}