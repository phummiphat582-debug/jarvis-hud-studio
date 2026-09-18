import React, { useState, useEffect } from 'react';
import { 
  Terminal, Search, Zap, Battery, Wifi, Clock, 
  ExternalLink, Sparkles, Download, Check, Plus, 
  Smartphone, Volume2, Shield, ArrowUpRight, Copy
} from 'lucide-react';
import { APPS_DATA } from '../data/apps';
import { playClickSound, playHoverSound, playDownloadSound, speakJarvis } from '../utils/audio';
import { generateIosMobileConfig, renderJarvisIcon } from '../utils/iconCanvas';

export default function TextLauncher({ currentTheme, onThemeChange }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [time, setTime] = useState(new Date());
  const [batteryLevel, setBatteryLevel] = useState(88);
  const [isCharging, setIsCharging] = useState(true);
  const [activeAppMessage, setActiveAppMessage] = useState('');
  const [isExportingProfile, setIsExportingProfile] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [displayLayout, setDisplayLayout] = useState('terminal'); // 'terminal' | 'grid' | 'minimal'

  // Clock ticker
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Battery API
  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'getBattery' in navigator) {
      navigator.getBattery().then(bat => {
        setBatteryLevel(Math.round(bat.level * 100));
        setIsCharging(bat.charging);
        bat.addEventListener('levelchange', () => setBatteryLevel(Math.round(bat.level * 100)));
        bat.addEventListener('chargingchange', () => setIsCharging(bat.charging));
      }).catch(() => {});
    }
  }, []);

  // Launch App directly via URL scheme
  const handleLaunchApp = (app) => {
    playClickSound();
    setActiveAppMessage(`INITIATING: ${app.name.toUpperCase()} ...`);
    speakJarvis(`Opening ${app.name}`);

    // Attempt to open URL scheme
    if (app.iosScheme) {
      window.location.href = app.iosScheme;
    }

    setTimeout(() => {
      setActiveAppMessage('');
    }, 2500);
  };

  // 1-Click Profile Download (.mobileconfig) with Text-Only Icons
  const handleInstallAllTextProfile = async () => {
    playClickSound();
    setIsExportingProfile(true);

    const offscreenCanvas = document.createElement('canvas');
    const enrichedList = [];

    // Select top 16 popular apps for instant 1-click home screen install
    const priorityApps = [
      'line', 'youtube', 'tiktok', 'facebook', 'instagram', 
      'spotify', 'camera', 'safari', 'kplus', 'scbeasy', 
      'chatgpt', 'settings', 'phone', 'messages', 'maps', 'notes'
    ];
    const targetApps = APPS_DATA.filter(a => priorityApps.includes(a.id));

    for (const app of targetApps) {
      // Render pure text-only icon (no icon images, pure stark cyber text)
      await renderJarvisIcon(offscreenCanvas, {
        size: 512,
        frameStyle: 'text-only',
        themeColor: currentTheme.primaryColor,
        secondaryColor: currentTheme.secondaryColor,
        bgType: 'amoled',
        showLabel: false,
        labelText: app.defaultLabel || app.name,
        showTechDecals: false,
        glowIntensity: 1.3,
        iconGlyph: null
      });

      enrichedList.push({
        ...app,
        defaultLabel: app.defaultLabel || app.name,
        iconBase64: offscreenCanvas.toDataURL('image/png')
      });
    }

    const xml = generateIosMobileConfig(enrichedList, `Text-Only ${currentTheme.name}`);
    const blob = new Blob([xml], { type: 'application/x-apple-aspen-config' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `JARVIS_TEXT_ONLY_${currentTheme.id}.mobileconfig`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setIsExportingProfile(false);
    setProfileSuccess(true);
    playDownloadSound();
    setTimeout(() => setProfileSuccess(false), 4000);
  };

  // Filtered app list
  const filteredApps = APPS_DATA.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.techCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'all' || app.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const timeStr = time.toLocaleTimeString('en-US', { hour12: false });
  const dateStr = time.toLocaleDateString('th-TH', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* 1-Click Instant Change Banner (Solves user's prompt directly!) */}
      <div className="hud-panel p-5 sm:p-6 rounded-2xl border-2 border-cyan-400/80 bg-gradient-to-r from-[#041124] via-[#020b18] to-[#010813] glow-cyan-sm relative overflow-hidden">
        {/* Animated corner notch */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-bl-full pointer-events-none"></div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative z-10">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-cyan-950 border border-cyan-400/50 text-[11px] font-mono-tech text-cyan-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>ระบบเปลี่ยนทีเดียวใน 1 คลิก ไม่ต้องทำทีละอัน (ONE-CLICK DEPLOY)</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-orbitron font-extrabold text-white text-glow">
              J.A.R.V.I.S. TEXT LAUNCHER &amp; PROFILE
            </h3>
            <p className="text-xs sm:text-sm text-cyan-300/80 font-mono-tech max-w-xl leading-relaxed">
              ไม่ต้องโหลดไอคอนมานั่งเปลี่ยนทีละอัน! เลือกว่าจะ <strong>(1) ใช้ลอนเชอร์ตัวหนังสือเต็มจอบนเว็บนี้</strong> หรือ <strong>(2) ติดตั้ง Profile เปลี่ยนไอคอนหน้าจอโฮมเป็นตัวหนังสือล้วนทีเดียวในคลิกเดียว</strong>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto shrink-0">
            <button
              onClick={handleInstallAllTextProfile}
              disabled={isExportingProfile}
              onMouseEnter={playHoverSound}
              className="px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-orbitron font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 glow-cyan cursor-pointer transition-all shadow-lg"
            >
              {profileSuccess ? (
                <>
                  <Check className="w-4 h-4 text-black font-bold" />
                  <span>โหลดโปรไฟล์สำเร็จ! (เปิดติดตั้งใน Settings)</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-black font-bold" />
                  <span>{isExportingProfile ? 'กำลังสังเคราะห์...' : 'ติดตั้งโปรไฟล์ตัวหนังสือทีเดียว (.mobileconfig)'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Futuristic Text Launcher Display Stage */}
      <div className="hud-panel rounded-3xl border border-cyan-500/40 bg-[#020612]/95 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        
        {/* Terminal Header Telemetry */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-cyan-900/40 font-mono-tech text-xs">
          {/* Real-time Ticker & Status */}
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping"></div>
            <div>
              <div className="text-white font-bold text-base sm:text-lg font-orbitron text-glow">
                {timeStr}
              </div>
              <div className="text-cyan-400/80 text-[11px]">
                {dateStr} // PROTOCOL MK-VII
              </div>
            </div>
          </div>

          {/* Battery & System */}
          <div className="flex items-center gap-4 text-cyan-300">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-black/60 rounded border border-cyan-900/50">
              <Battery className="w-4 h-4 text-cyan-400" />
              <span className="font-bold">{batteryLevel}%</span>
              <span className="text-[10px] text-cyan-500">{isCharging ? '⚡ CHG' : 'BAT'}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-black/60 rounded border border-cyan-900/50">
              <Wifi className="w-4 h-4 text-cyan-400" />
              <span className="font-bold">5G // ONLINE</span>
            </div>
          </div>
        </div>

        {/* Quick Search & Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Terminal className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="พิมพ์ชื่อแอพเพื่อค้นหาทันที เช่น LINE, YT, IG, Bank, Cam..."
              className="w-full pl-10 pr-4 py-2.5 bg-black/70 border border-cyan-500/40 rounded-xl text-xs sm:text-sm font-mono-tech text-white focus:border-cyan-400 focus:outline-none placeholder:text-cyan-700"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 font-mono-tech text-xs">
            {[
              { id: 'all', label: 'ทั้งหมด' },
              { id: 'social', label: 'โซเชียล' },
              { id: 'media', label: 'สตรีมมิ่ง' },
              { id: 'system', label: 'ระบบ' },
              { id: 'finance', label: 'การเงิน' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => { playClickSound(); setSelectedCategory(cat.id); }}
                className={`px-3 py-2 rounded-lg whitespace-nowrap cursor-pointer transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-500 text-black font-bold'
                    : 'bg-black/50 text-cyan-400 border border-cyan-900/40 hover:bg-cyan-950/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Feedback Notification */}
        {activeAppMessage && (
          <div className="p-3 rounded-lg bg-cyan-950/90 border border-cyan-400 font-mono-tech text-xs text-center text-white animate-pulse">
            <span className="text-cyan-400 font-bold mr-2">&gt;&gt;</span>
            {activeAppMessage}
          </div>
        )}

        {/* Pure High-Tech Text Apps Matrix (NO ICONS! JUST CRISP SCI-FI TEXT) */}
        <div className="space-y-2 pt-2">
          <div className="text-[11px] font-mono-tech text-cyan-500 flex justify-between px-1">
            <span>COMMAND_TARGET // แตะที่ตัวหนังสือเพื่อเปิดแอพ</span>
            <span>SHOWING: {filteredApps.length} APPS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[520px] overflow-y-auto pr-1">
            {filteredApps.map((app, index) => (
              <div
                key={app.id}
                onClick={() => handleLaunchApp(app)}
                onMouseEnter={playHoverSound}
                className="group p-3 sm:p-3.5 rounded-xl border border-cyan-900/40 hover:border-cyan-400 bg-black/40 hover:bg-cyan-950/40 transition-all cursor-pointer flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  {/* High-tech index code */}
                  <span className="text-xs font-mono-tech text-cyan-600 group-hover:text-cyan-400">
                    [{String(index + 1).padStart(2, '0')}]
                  </span>

                  {/* Pure Sci-Fi Typography Label (NO ICON IMAGE) */}
                  <div>
                    <div className="text-sm sm:text-base font-orbitron font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                      <span className="text-cyan-500 group-hover:text-cyan-300">//</span>
                      <span>{app.name.toUpperCase()}</span>
                    </div>
                    <div className="text-[10px] font-mono-tech text-cyan-500/70 truncate max-w-[200px]">
                      {app.techCode}
                    </div>
                  </div>
                </div>

                {/* Direct Launch indicator arrow */}
                <div className="flex items-center gap-1.5 text-xs font-mono-tech text-cyan-500 group-hover:text-cyan-300">
                  <span className="hidden sm:inline text-[11px] opacity-0 group-hover:opacity-100 transition-opacity">
                    LAUNCH
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-cyan-400 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tip on how to use as Home Screen */}
        <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/40 font-mono-tech text-xs text-cyan-300 space-y-1.5">
          <div className="font-bold text-white flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-cyan-400" />
            <span>วิธีใช้หน้านี้เป็นหน้าจอหลัก (Home Screen) โดยไม่ต้องโหลดไอคอน:</span>
          </div>
          <p className="text-[11px] text-cyan-300/80 leading-relaxed">
            กดปุ่ม <strong>แชร์ใน Safari (บน iPhone/iPad)</strong> หรือ <strong>จุดสามจุดใน Chrome (บน Android)</strong> &gt; เลือก <strong>"เพิ่มไปยังหน้าจอโฮม" (Add to Home Screen)</strong> จากนั้นเมื่อแตะไอคอน J.A.R.V.I.S. บนหน้าจอโฮมของคุณ จะเปิดหน้านี้แบบเต็มจอทันที โดยมีเฉพาะตัวหนังสือไฮเทคให้กดเปิดแอพได้รวดเร็วที่สุดโดยไม่มีไอคอนรูปภาพกวนสายตา!
          </p>
        </div>

      </div>

    </div>
  );
}
