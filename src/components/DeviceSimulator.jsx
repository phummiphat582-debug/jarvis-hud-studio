import React, { useState } from 'react';
import { 
  Smartphone, Tablet, Download, Sparkles, RefreshCw, 
  Battery, Wifi, Zap, Clock, ShieldCheck, Check, Layers
} from 'lucide-react';
import { playClickSound, playHoverSound, playDownloadSound } from '../utils/audio';

export default function DeviceSimulator({ currentTheme }) {
  const [deviceType, setDeviceType] = useState('iphone'); // 'iphone' | 'ipad' | 'android'
  const [wallpaperStyle, setWallpaperStyle] = useState('arc-blueprint');
  const [activeAppModal, setActiveAppModal] = useState(null);

  const wallpapers = [
    {
      id: 'arc-blueprint',
      name: 'Stark Arc Reactor AMOLED',
      desc: 'พิมพ์เขียวปฏิกรณ์อาร์กเรืองแสง บนพื้นดำสนิท',
      bgGradient: 'radial-gradient(circle at 50% 35%, #082f49 0%, #030a16 50%, #010409 100%)',
    },
    {
      id: 'cyber-grid',
      name: 'Holographic Matrix Grid',
      desc: 'ตารางควอนตัมเรืองแสง ไฮเทคแบบภาพยนตร์',
      bgGradient: 'radial-gradient(circle at 50% 50%, #022c22 0%, #020f12 60%, #000508 100%)',
    },
    {
      id: 'iron-core',
      name: 'Mark VII Titanium Core',
      desc: 'เกราะไททาเนียมสีทอง-แดง Stark Industries',
      bgGradient: 'radial-gradient(circle at 50% 30%, #451a03 0%, #1c0901 60%, #050201 100%)',
    },
    {
      id: 'deep-space',
      name: 'Tactical Stealth Black',
      desc: 'ดำสนิทถนอมสายตา และประหยัดแบตเตอรี่หน้าจอ OLED',
      bgGradient: '#020408',
    }
  ];

  const currentWp = wallpapers.find(w => w.id === wallpaperStyle) || wallpapers[0];

  // Download High-Resolution HUD Wallpaper
  const handleDownloadWallpaper = (isTablet = false) => {
    playDownloadSound();
    const canvas = document.createElement('canvas');
    canvas.width = isTablet ? 2732 : 1290;
    canvas.height = isTablet ? 2048 : 2796;
    const ctx = canvas.getContext('2d');

    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h * (isTablet ? 0.45 : 0.35);

    // Background
    ctx.fillStyle = '#02050e';
    ctx.fillRect(0, 0, w, h);

    // Radial glow
    const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, w * 0.6);
    grad.addColorStop(0, currentTheme.primaryColor + '33');
    grad.addColorStop(0.5, '#030b1e');
    grad.addColorStop(1, '#01040a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Draw Arc Reactor Rings on Wallpaper
    ctx.strokeStyle = currentTheme.primaryColor;
    ctx.lineWidth = 4;
    ctx.shadowColor = currentTheme.primaryColor;
    ctx.shadowBlur = 25;

    // Outer ring
    ctx.beginPath();
    ctx.arc(cx, cy, w * 0.22, 0, Math.PI * 2);
    ctx.stroke();

    // Notches
    for (let i = 0; i < 12; i++) {
      const ang = (i * 2 * Math.PI) / 12;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(ang) * (w * 0.20), cy + Math.sin(ang) * (w * 0.20));
      ctx.lineTo(cx + Math.cos(ang) * (w * 0.24), cy + Math.sin(ang) * (w * 0.24));
      ctx.stroke();
    }

    // Mid ring dashed
    ctx.beginPath();
    ctx.setLineDash([20, 10]);
    ctx.arc(cx, cy, w * 0.16, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Core circle
    ctx.beginPath();
    ctx.arc(cx, cy, w * 0.08, 0, Math.PI * 2);
    ctx.fillStyle = currentTheme.primaryColor + '44';
    ctx.fill();
    ctx.stroke();

    // Tech HUD Grid Lines
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.12)';
    ctx.lineWidth = 2;
    const step = 80;
    for (let x = 0; x <= w; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y <= h; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Stark Industries watermark footer
    ctx.font = 'bold 36px monospace';
    ctx.fillStyle = currentTheme.primaryColor;
    ctx.textAlign = 'center';
    ctx.fillText('STARK INDUSTRIES // J.A.R.V.I.S. INTERFACE SYSTEM', cx, h - 80);

    const a = document.createElement('a');
    a.download = `JARVIS-Wallpaper-${isTablet ? 'Tablet' : 'Phone'}-${currentTheme.id}.png`;
    a.href = canvas.toDataURL('image/png');
    a.click();
  };

  const sampleIcons = [
    { name: 'LINE', code: 'COMM//01', color: '#00ff88' },
    { name: 'YOUTUBE', code: 'MEDIA//YT', color: '#ff0033' },
    { name: 'TIKTOK', code: 'FEED//TT', color: '#00f0ff' },
    { name: 'INSTAGRAM', code: 'VIS//IG', color: '#ff007f' },
    { name: 'SPOTIFY', code: 'SONIC//02', color: '#1db954' },
    { name: 'CAMERA', code: 'OPTICAL', color: '#00f0ff' },
    { name: 'K PLUS', code: 'VAULT//KB', color: '#138f2d' },
    { name: 'JARVIS AI', code: 'NEURAL', color: '#10a37f' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-cyan-900/40">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <h3 className="text-xl md:text-2xl font-orbitron font-bold text-white tracking-wider">
              HOLOGRAPHIC DEVICE SIMULATOR (จำลองหน้าจอมือถือ/แท็บเล็ต)
            </h3>
          </div>
          <p className="text-sm text-cyan-400/80 font-mono-tech mt-1">
            พรีวิวหน้าจอจริงเมื่อติดตั้งไอคอนและวิดเจ็ตสไตล์ J.A.R.V.I.S. พร้อมดาวน์โหลดภาพพื้นหลัง AMOLED ความคมชัดสูง
          </p>
        </div>

        {/* Device Switcher */}
        <div className="flex items-center gap-2 bg-black/60 p-1 rounded-xl border border-cyan-800/60 font-mono-tech text-xs">
          <button
            onClick={() => { playClickSound(); setDeviceType('iphone'); }}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer transition-all ${
              deviceType === 'iphone'
                ? 'bg-cyan-500 text-black font-bold'
                : 'text-cyan-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>iPhone 16 Pro</span>
          </button>

          <button
            onClick={() => { playClickSound(); setDeviceType('ipad'); }}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer transition-all ${
              deviceType === 'ipad'
                ? 'bg-cyan-500 text-black font-bold'
                : 'text-cyan-400 hover:text-white'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>iPad / Tablet</span>
          </button>

          <button
            onClick={() => { playClickSound(); setDeviceType('android'); }}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer transition-all ${
              deviceType === 'android'
                ? 'bg-cyan-500 text-black font-bold'
                : 'text-cyan-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Android / Galaxy</span>
          </button>
        </div>
      </div>

      {/* Simulator Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Device Stage */}
        <div className="lg:col-span-8 flex justify-center">
          <div 
            className={`relative p-3.5 bg-gradient-to-b from-neutral-800 via-neutral-900 to-black rounded-[48px] border-4 border-neutral-700 shadow-[0_0_50px_rgba(0,240,255,0.15)] transition-all duration-500 ${
              deviceType === 'ipad' ? 'w-full max-w-[620px] aspect-[4/3]' : 'w-[340px] sm:w-[360px] h-[720px]'
            }`}
          >
            {/* Dynamic Island / Camera Notch */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-20 flex items-center justify-between px-3 border border-neutral-800">
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-700"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-950 border border-cyan-800"></div>
            </div>

            {/* Screen Area */}
            <div 
              className="w-full h-full rounded-[40px] overflow-hidden relative p-5 flex flex-col justify-between select-none"
              style={{ background: currentWp.bgGradient }}
            >
              {/* Wallpaper Arc Reactor Background Silhouette */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-25">
                <div 
                  className="w-64 h-64 rounded-full border-2 border-dashed animate-spin-slow"
                  style={{ borderColor: currentTheme.primaryColor }}
                />
              </div>

              {/* Status Bar */}
              <div className="flex justify-between items-center text-xs font-mono-tech text-white z-10 pt-3 px-2">
                <span className="font-bold">20:45</span>
                <div className="flex items-center gap-2 text-cyan-400">
                  <span className="text-[10px] border border-cyan-500/50 px-1 rounded">5G</span>
                  <Wifi className="w-3.5 h-3.5" />
                  <Battery className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Upper Screen: Live J.A.R.V.I.S. Widget (Medium 4x2) */}
              <div className="z-10 mt-6 p-4 rounded-2xl bg-[#030917]/80 backdrop-blur-md border border-cyan-500/40 shadow-lg relative overflow-hidden">
                <div className="flex justify-between items-center text-[10px] font-mono-tech text-cyan-400 pb-2 border-b border-cyan-900/40 mb-2">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                    STARK // ARC REACTOR HUD
                  </span>
                  <span>POWER: 100%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold font-orbitron text-white text-glow">
                      20:45:12
                    </div>
                    <div className="text-xs font-mono-tech text-cyan-300">
                      FRI, 18 SEP // BANGKOK
                    </div>
                  </div>

                  <div className="w-12 h-12 rounded-full border-2 border-dashed border-cyan-400 flex items-center justify-center animate-spin-slow">
                    <Zap className="w-5 h-5 text-cyan-400 animate-pulse" />
                  </div>
                </div>

                <div className="mt-2 text-[10px] font-mono-tech text-cyan-400/80 flex justify-between">
                  <span>ALL PROTOCOLS NOMINAL</span>
                  <span>SECURITY: ENCRYPTED</span>
                </div>
              </div>

              {/* Middle Screen: Custom High-Tech App Icons Grid */}
              <div className="z-10 grid grid-cols-4 gap-4 my-auto px-1">
                {sampleIcons.slice(0, deviceType === 'ipad' ? 8 : 8).map((app, idx) => (
                  <div 
                    key={idx}
                    className="flex flex-col items-center gap-1 cursor-pointer transition-transform hover:scale-105 active:scale-95"
                    onClick={() => {
                      playClickSound();
                      setActiveAppModal(app.name);
                      setTimeout(() => setActiveAppModal(null), 2000);
                    }}
                  >
                    {/* Glowing Arc Reactor Icon Frame */}
                    <div 
                      className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center relative border shadow-lg transition-all"
                      style={{
                        backgroundColor: '#030814',
                        borderColor: currentTheme.primaryColor,
                        boxShadow: `0 0 10px ${currentTheme.primaryColor}55`
                      }}
                    >
                      {/* Tech frame corner ticks */}
                      <span className="absolute top-1 left-1 w-1 h-1 bg-white"></span>
                      <span className="absolute bottom-1 right-1 w-1 h-1 bg-white"></span>
                      <span 
                        className="text-[11px] font-orbitron font-extrabold"
                        style={{ color: currentTheme.primaryColor }}
                      >
                        {app.name.substring(0, 3)}
                      </span>
                    </div>

                    <span className="text-[10px] font-orbitron text-white truncate max-w-[60px] text-center drop-shadow">
                      {app.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom Dock (4 Core Apps) */}
              <div className="z-10 p-2.5 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 grid grid-cols-4 gap-2 mb-3">
                {['PHONE', 'COMM', 'SAFARI', 'CAMERA'].map((app, idx) => (
                  <div key={idx} className="flex justify-center">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center border shadow-md"
                      style={{
                        backgroundColor: '#040d21',
                        borderColor: currentTheme.primaryColor,
                        boxShadow: `0 0 8px ${currentTheme.primaryColor}66`
                      }}
                    >
                      <span 
                        className="text-[10px] font-mono-tech font-bold"
                        style={{ color: currentTheme.primaryColor }}
                      >
                        {app.substring(0, 3)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Home indicator bar */}
              <div className="w-32 h-1 bg-white/80 rounded-full mx-auto z-10 mb-1"></div>

              {/* Feedback Pop-up Simulation */}
              {activeAppModal && (
                <div className="absolute inset-x-8 top-1/3 p-4 rounded-xl bg-cyan-950/95 border border-cyan-400 text-center font-mono-tech text-xs text-white z-30 shadow-2xl animate-bounce">
                  <div className="text-cyan-400 font-bold mb-1">J.A.R.V.I.S. LINK:</div>
                  <div>กำลังเปิดแอปพลิเคชัน <strong>{activeAppModal}</strong> ด้วย Zero-Latency Protocol</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Wallpaper Picker & Download Tools */}
        <div className="lg:col-span-4 space-y-4">
          <div className="hud-panel p-5 rounded-xl border border-cyan-500/30 bg-[#040c1e]/90 space-y-4">
            <h4 className="text-base font-orbitron font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              ภาพพื้นหลัง J.A.R.V.I.S. AMOLED HUD
            </h4>

            {/* Wallpaper Selection Cards */}
            <div className="space-y-2">
              {wallpapers.map((wp) => (
                <div
                  key={wp.id}
                  onClick={() => { playClickSound(); setWallpaperStyle(wp.id); }}
                  onMouseEnter={playHoverSound}
                  className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                    wallpaperStyle === wp.id
                      ? 'bg-cyan-950/80 border-cyan-400 text-white glow-cyan-sm'
                      : 'bg-black/40 border-cyan-900/40 text-cyan-400 hover:border-cyan-600/40'
                  }`}
                >
                  <div>
                    <div className="font-bold text-xs font-orbitron text-white">{wp.name}</div>
                    <div className="text-[11px] text-cyan-400/70 font-mono-tech">{wp.desc}</div>
                  </div>
                  {wallpaperStyle === wp.id && <Check className="w-4 h-4 text-cyan-400" />}
                </div>
              ))}
            </div>

            {/* Download Wallpaper Buttons */}
            <div className="pt-3 border-t border-cyan-900/30 space-y-2">
              <button
                onClick={() => handleDownloadWallpaper(false)}
                onMouseEnter={playHoverSound}
                className="w-full py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-mono-tech text-xs rounded-lg font-bold flex items-center justify-center gap-2 cursor-pointer transition-all glow-cyan-sm"
              >
                <Download className="w-4 h-4" />
                <span>ดาวน์โหลดภาพพื้นหลังสำหรับมือถือ (HD)</span>
              </button>

              <button
                onClick={() => handleDownloadWallpaper(true)}
                onMouseEnter={playHoverSound}
                className="w-full py-2.5 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-600/50 text-cyan-300 font-mono-tech text-xs rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Tablet className="w-4 h-4" />
                <span>ดาวน์โหลดสำหรับแท็บเล็ต / iPad (2732x2048)</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
