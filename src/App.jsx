import React, { useState, useEffect } from 'react';
import { 
  Shield, Volume2, VolumeX, Sparkles, Smartphone, 
  Layers, Clock, HelpCircle, Maximize2, Minimize2, 
  Terminal, Zap, Radio
} from 'lucide-react';
import { HUD_THEMES } from './data/apps';
import TextLauncher from './components/TextLauncher';
import IconStudio from './components/IconStudio';
import WidgetsSuite from './components/WidgetsSuite';
import DeviceSimulator from './components/DeviceSimulator';
import InstallGuide from './components/InstallGuide';
import { 
  playClickSound, playHoverSound, playJarvisBoot, 
  setSoundEnabled, isSoundEnabled, speakJarvis 
} from './utils/audio';

export default function App() {
  const [currentTheme, setCurrentTheme] = useState(HUD_THEMES[0]); // Default Stark Cyan
  const [activeTab, setActiveTab] = useState('launcher'); // 'launcher' | 'studio' | 'widgets' | 'simulator' | 'guide'
  const [soundOn, setSoundOn] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Initialize sound on first user interaction
  const handleToggleSound = () => {
    const newState = !soundOn;
    setSoundOn(newState);
    setSoundEnabled(newState);
    if (newState) {
      playJarvisBoot();
    }
  };

  const handleJarvisGreeting = () => {
    playJarvisBoot();
    speakJarvis('J.A.R.V.I.S. Protocol Online. All text-only systems nominal.');
  };

  const toggleFullscreen = () => {
    playClickSound();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-cyan-400 bg-hex-grid bg-scanlines relative flex flex-col justify-between selection:bg-cyan-500 selection:text-black">
      
      {/* Background Hologram Ambient Core Graphic */}
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0 opacity-10">
        <div 
          className="w-[700px] h-[700px] rounded-full border border-dashed animate-spin-slow"
          style={{ borderColor: currentTheme.primaryColor }}
        />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full border border-dashed animate-spin-reverse-slow"
          style={{ borderColor: currentTheme.secondaryColor }}
        />
      </div>

      {/* Top Main Cyber HUD Header */}
      <header className="relative z-10 border-b border-cyan-500/20 bg-[#030917]/85 backdrop-blur-md px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo & System Brand */}
          <div className="flex items-center gap-3">
            <div 
              onClick={handleJarvisGreeting}
              className="relative w-10 h-10 rounded-xl bg-black/60 border flex items-center justify-center cursor-pointer transition-all hover:scale-105 glow-cyan-sm"
              style={{ borderColor: currentTheme.primaryColor }}
              title="กดเพื่อสั่งให้ J.A.R.V.I.S. รายงานตัว"
            >
              <Zap className="w-5 h-5 text-white animate-pulse" />
              <div 
                className="absolute inset-0 rounded-xl border border-dashed animate-spin-slow pointer-events-none"
                style={{ borderColor: currentTheme.primaryColor }}
              />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-orbitron font-extrabold text-base sm:text-lg tracking-wider text-glow">
                  J.A.R.V.I.S. HUD STUDIO
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono-tech font-bold bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                  MARK-VII
                </span>
              </div>
              <div className="text-[11px] font-mono-tech text-cyan-500/90 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping"></span>
                <span>SYSTEM ONLINE // TEXT HUD &amp; MOBILE CORE</span>
              </div>
            </div>
          </div>

          {/* Controls: Audio Toggle, Greeting, Fullscreen */}
          <div className="flex items-center gap-2 font-mono-tech text-xs">
            {/* Voice Greeting Button */}
            <button
              onClick={handleJarvisGreeting}
              onMouseEnter={playHoverSound}
              className="px-3 py-1.5 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-700/50 text-cyan-300 rounded flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span className="hidden sm:inline">ทักทาย J.A.R.V.I.S.</span>
            </button>

            {/* Sound FX Toggle */}
            <button
              onClick={handleToggleSound}
              className={`px-3 py-1.5 rounded border flex items-center gap-1.5 cursor-pointer transition-all ${
                soundOn
                  ? 'bg-cyan-950/80 border-cyan-400 text-white glow-cyan-sm'
                  : 'bg-black/50 border-neutral-700 text-neutral-400'
              }`}
            >
              {soundOn ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{soundOn ? 'SFX ON' : 'SFX MUTED'}</span>
            </button>

            {/* Fullscreen / Desk Dock */}
            <button
              onClick={toggleFullscreen}
              className="p-1.5 bg-black/60 hover:bg-cyan-950 border border-cyan-900/60 text-cyan-400 rounded cursor-pointer transition-all"
              title="โหมดเต็มจอสำหรับวางแท็บเล็ตบนโต๊ะทำงาน"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Global Navigation Tabs */}
        <div className="max-w-7xl mx-auto mt-3.5 flex items-center gap-2 overflow-x-auto pb-1 font-mono-tech text-xs sm:text-sm">
          {/* New Featured Text Launcher Tab */}
          <button
            onClick={() => { playClickSound(); setActiveTab('launcher'); }}
            onMouseEnter={playHoverSound}
            className={`px-4 py-2 rounded-t-lg border-b-2 font-bold cursor-pointer transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'launcher'
                ? 'border-cyan-400 text-white bg-cyan-950/80 text-glow'
                : 'border-transparent text-cyan-400/70 hover:text-white hover:bg-cyan-950/20'
            }`}
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>ลอนเชอร์ตัวหนังสือล้วน (TEXT LAUNCHER)</span>
            <span className="px-1.5 py-0.2 bg-cyan-500 text-black text-[10px] font-extrabold rounded-full animate-pulse">
              1-CLICK
            </span>
          </button>

          <button
            onClick={() => { playClickSound(); setActiveTab('studio'); }}
            onMouseEnter={playHoverSound}
            className={`px-4 py-2 rounded-t-lg border-b-2 font-bold cursor-pointer transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'studio'
                ? 'border-cyan-400 text-white bg-cyan-950/60 text-glow'
                : 'border-transparent text-cyan-400/70 hover:text-white hover:bg-cyan-950/20'
            }`}
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>สตูดิโอเปลี่ยนไอคอน (ICON STUDIO)</span>
          </button>

          <button
            onClick={() => { playClickSound(); setActiveTab('widgets'); }}
            onMouseEnter={playHoverSound}
            className={`px-4 py-2 rounded-t-lg border-b-2 font-bold cursor-pointer transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'widgets'
                ? 'border-cyan-400 text-white bg-cyan-950/60 text-glow'
                : 'border-transparent text-cyan-400/70 hover:text-white hover:bg-cyan-950/20'
            }`}
          >
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>วิดเจ็ตไฮเทค (TELEMETRY WIDGETS)</span>
          </button>

          <button
            onClick={() => { playClickSound(); setActiveTab('simulator'); }}
            onMouseEnter={playHoverSound}
            className={`px-4 py-2 rounded-t-lg border-b-2 font-bold cursor-pointer transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'simulator'
                ? 'border-cyan-400 text-white bg-cyan-950/60 text-glow'
                : 'border-transparent text-cyan-400/70 hover:text-white hover:bg-cyan-950/20'
            }`}
          >
            <Smartphone className="w-4 h-4 text-cyan-400" />
            <span>จำลองหน้าจอ &amp; ภาพพื้นหลัง (DEVICE PREVIEW)</span>
          </button>

          <button
            onClick={() => { playClickSound(); setActiveTab('guide'); }}
            onMouseEnter={playHoverSound}
            className={`px-4 py-2 rounded-t-lg border-b-2 font-bold cursor-pointer transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'guide'
                ? 'border-cyan-400 text-white bg-cyan-950/60 text-glow'
                : 'border-transparent text-cyan-400/70 hover:text-white hover:bg-cyan-950/20'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span>คู่มือติดตั้ง (GUIDE)</span>
          </button>
        </div>
      </header>

      {/* Main Content Viewport */}
      <main className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-8 py-6 flex-1">
        {activeTab === 'launcher' && (
          <TextLauncher
            currentTheme={currentTheme}
            onThemeChange={setCurrentTheme}
          />
        )}

        {activeTab === 'studio' && (
          <IconStudio
            currentTheme={currentTheme}
            onThemeChange={setCurrentTheme}
          />
        )}

        {activeTab === 'widgets' && (
          <WidgetsSuite
            theme={currentTheme}
            soundEnabled={soundOn}
          />
        )}

        {activeTab === 'simulator' && (
          <DeviceSimulator
            currentTheme={currentTheme}
          />
        )}

        {activeTab === 'guide' && (
          <InstallGuide />
        )}
      </main>

      {/* Cyberpunk Footer Bar */}
      <footer className="relative z-10 border-t border-cyan-500/20 bg-[#020612]/90 backdrop-blur px-4 sm:px-8 py-4 font-mono-tech text-xs text-cyan-500/70">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span>STARK INDUSTRIES // J.A.R.V.I.S. PROTOCOL MK-VII</span>
          </div>

          <div className="text-[11px] text-cyan-400/60">
            TEXT-ONLY MINIMALIST LAUNCHER &amp; ONE-CLICK MOBILECONFIG
          </div>

          <div className="text-[10px] text-cyan-600">
            QUANTUM SECURED // 2026
          </div>
        </div>
      </footer>

    </div>
  );
}
