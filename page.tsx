'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoginCard from '@/components/LoginCard';
import Dashboard from '@/components/Dashboard';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio element
    const audio = new Audio('/background-music.mp3');
    audio.loop = true;
    setAudioElement(audio);

    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    // Play music after successful login
    if (audioElement) {
      audioElement.play().catch(e => console.log('Audio play failed:', e));
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-black">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 rotating-conic opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <AnimatePresence mode="wait">
          {!isAuthenticated ? (
            <LoginCard key="login" onLogin={handleLogin} />
          ) : (
            <Dashboard key="dashboard" onLogout={handleLogout} />
          )}
        </AnimatePresence>
      </div>

      {/* Floating Particles Effect */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-500 rounded-full animate-pulse-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.3
            }}
          />
        ))}
      </div>
    </main>
  );
}