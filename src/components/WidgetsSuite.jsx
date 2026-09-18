import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, Battery, Wifi, Cpu, Shield, Zap, Radio, Globe, 
  Wind, Droplets, Compass, Volume2, Mic, Eye, Download, 
  Copy, Check, Sparkles, RefreshCw, Maximize2, AlertCircle
} from 'lucide-react';
import { playClickSound, playHoverSound, playScanSound, speakJarvis } from '../utils/audio';

export default function WidgetsSuite({ theme, soundEnabled }) {
  // Real-time Clock State
  const [time, setTime] = useState(new Date());
  const [batteryInfo, setBatteryInfo] = useState({ level: 85, charging: true });
  const [weatherData, setWeatherData] = useState({
    city: 'กรุงเทพฯ (Bangkok)',
    temp: 31,
    condition: 'ท้องฟ้าแจ่มใส (Clear Sky)',
    humidity: 68,
    wind: 12,
    pressure: 1012,
    uv: 8
  });
  const [activeWidgetTab, setActiveWidgetTab] = useState('clock');
  const [micActive, setMicActive] = useState(false);
  const [aiResponseText, setAiResponseText] = useState('J.A.R.V.I.S. Core Online. Awaiting directive.');
  const [copiedScript, setCopiedScript] = useState(false);
  const [deviceHeading, setDeviceHeading] = useState(45);
  const [radarBlips, setRadarBlips] = useState([
    { id: 1, x: 30, y: 40, label: 'SAT-01', dist: '320km' },
    { id: 2, x: 70, y: 25, label: 'NODE-7', dist: '120km' },
    { id: 3, x: 55, y: 75, label: 'RELAY-X', dist: '85km' }
  ]);

  // Ref for canvas snapshots
  const arcReactorCanvasRef = useRef(null);

  // Clock Ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // Battery Telemetry
  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        const updateBattery = () => {
          setBatteryInfo({
            level: Math.round(battery.level * 100),
            charging: battery.charging
          });
        };
        updateBattery();
        battery.addEventListener('levelchange', updateBattery);
        battery.addEventListener('chargingchange', updateBattery);
      }).catch(() => {});
    }
  }, []);

  // Device Orientation (Compass)
  useEffect(() => {
    const handleOrientation = (e) => {
      if (e.alpha !== null) {
        setDeviceHeading(Math.round(e.alpha));
      }
    };
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation);
    }
    return () => {
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleOrientation);
      }
    };
  }, []);

  // Weather fetch (Free Open-Meteo API)
  const fetchWeather = async () => {
    try {
      const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=13.7563&longitude=100.5018&current_weather=true&hourly=relativehumidity_2m,surface_pressure');
      const data = await res.json();
      if (data && data.current_weather) {
        setWeatherData(prev => ({
          ...prev,
          temp: Math.round(data.current_weather.temperature),
          wind: Math.round(data.current_weather.windspeed),
        }));
      }
    } catch {
      // Fallback already in state
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  // Interactive Voice Action handler
  const handleVoiceCommand = (command, reply) => {
    playClickSound();
    setAiResponseText(reply);
    speakJarvis(reply);
  };

  // Copy Scriptable Code for iOS native widget
  const handleCopyScriptable = () => {
    playClickSound();
    const scriptCode = `// J.A.R.V.I.S. Arc Reactor Widget for iOS Scriptable
// Paste this in Scriptable App -> Add New Script
const widget = new ListWidget();
widget.backgroundColor = new Color("#030712");

const title = widget.addText("J.A.R.V.I.S. // STARK HUD");
title.font = Font.boldSystemFont(14);
title.textColor = new Color("${theme.primaryColor}");

widget.addSpacer(8);

const date = new Date();
const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
const timeText = widget.addText(timeStr);
timeText.font = Font.boldMonospacedSystemFont(26);
timeText.textColor = new Color("#ffffff");

widget.addSpacer(6);
const bat = Device.batteryLevel();
const batText = widget.addText("⚡ POWER LEVEL: " + Math.round(bat * 100) + "% // CORE STABLE");
batText.font = Font.systemFont(11);
batText.textColor = new Color("${theme.primaryColor}");

widget.addSpacer(4);
const status = widget.addText("SYSTEM STATUS: ALL PROTOCOLS NOMINAL");
status.font = Font.systemFont(9);
status.textColor = new Color("#94a3b8");

Script.setWidget(widget);
Script.complete();
widget.presentMedium();`;

    navigator.clipboard.writeText(scriptCode);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  // Download Widget as PNG Image for Widgetsmith / Photo Widgets
  const downloadWidgetSnapshot = (elementId, name) => {
    playClickSound();
    const element = document.getElementById(elementId);
    if (!element) return;

    // Simple canvas snapshot
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 420;
    const ctx = canvas.getContext('2d');
    
    // Fill background
    ctx.fillStyle = '#030814';
    ctx.fillRect(0, 0, 800, 420);

    // Draw HUD borders
    ctx.strokeStyle = theme.primaryColor;
    ctx.lineWidth = 3;
    ctx.strokeRect(20, 20, 760, 380);

    // Tech text
    ctx.fillStyle = theme.primaryColor;
    ctx.font = 'bold 24px monospace';
    ctx.fillText('STARK INDUSTRIES // J.A.R.V.I.S. HUD WIDGET', 45, 65);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 64px monospace';
    const timeStr = time.toTimeString().split(' ')[0] + '.' + Math.floor(time.getMilliseconds() / 100);
    ctx.fillText(timeStr, 45, 160);

    ctx.fillStyle = theme.primaryColor;
    ctx.font = '22px monospace';
    ctx.fillText(`⚡ BATTERY: ${batteryInfo.level}% // STATUS: NOMINAL`, 45, 230);
    ctx.fillText(`📍 LOCATION: ${weatherData.city} // ${weatherData.temp}°C`, 45, 275);
    ctx.fillText('SECURITY: ENCRYPTED // PROTOCOL MK-VII ACTIVE', 45, 320);

    // Corner tech ticks
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(20, 20, 15, 15);
    ctx.fillRect(765, 20, 15, 15);
    ctx.fillRect(20, 385, 15, 15);
    ctx.fillRect(765, 385, 15, 15);

    const link = document.createElement('a');
    link.download = `JARVIS-Widget-${name}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const hours = String(time.getHours()).padStart(2, '0');
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const seconds = String(time.getSeconds()).padStart(2, '0');
  const ms = Math.floor(time.getMilliseconds() / 10);
  const dateStr = time.toLocaleDateString('th-TH', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="space-y-6">
      {/* Top Header & Widget Navigation */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-cyan-900/40">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
            <h3 className="text-xl md:text-2xl font-orbitron font-bold text-white tracking-wider flex items-center gap-2">
              J.A.R.V.I.S. TELEMETRY WIDGETS
            </h3>
          </div>
          <p className="text-sm text-cyan-400/80 font-mono-tech mt-1">
            ชุดวิดเจ็ตแสดงผลแบบเรียลไทม์ พร้อมระบบส่งออกเป็นภาพสำหรับ Widgetsmith หรือโค้ด iOS Scriptable
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleCopyScriptable}
            onMouseEnter={playHoverSound}
            className="px-3.5 py-2 bg-cyan-950/70 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 text-xs font-mono-tech rounded flex items-center gap-2 transition-all hover:bg-cyan-900/50 cursor-pointer"
          >
            {copiedScript ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            <span>{copiedScript ? 'คัดลอกโค้ดสำเร็จ!' : 'คัดลอกโค้ด iOS Scriptable'}</span>
          </button>
        </div>
      </div>

      {/* Widget Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2 font-mono-tech text-xs">
        <button
          onClick={() => { playClickSound(); setActiveWidgetTab('clock'); }}
          className={`px-3 py-2.5 rounded border transition-all text-left flex items-center gap-2 cursor-pointer ${
            activeWidgetTab === 'clock' 
              ? 'bg-cyan-950/80 border-cyan-400 text-white glow-cyan-sm' 
              : 'bg-black/40 border-cyan-900/40 text-cyan-400 hover:border-cyan-500/50'
          }`}
        >
          <Clock className="w-4 h-4 text-cyan-400" />
          <span>ARC CLOCK & TIME</span>
        </button>

        <button
          onClick={() => { playClickSound(); setActiveWidgetTab('system'); }}
          className={`px-3 py-2.5 rounded border transition-all text-left flex items-center gap-2 cursor-pointer ${
            activeWidgetTab === 'system' 
              ? 'bg-cyan-950/80 border-cyan-400 text-white glow-cyan-sm' 
              : 'bg-black/40 border-cyan-900/40 text-cyan-400 hover:border-cyan-500/50'
          }`}
        >
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span>BATTERY & TELEMETRY</span>
        </button>

        <button
          onClick={() => { playClickSound(); setActiveWidgetTab('weather'); }}
          className={`px-3 py-2.5 rounded border transition-all text-left flex items-center gap-2 cursor-pointer ${
            activeWidgetTab === 'weather' 
              ? 'bg-cyan-950/80 border-cyan-400 text-white glow-cyan-sm' 
              : 'bg-black/40 border-cyan-900/40 text-cyan-400 hover:border-cyan-500/50'
          }`}
        >
          <Globe className="w-4 h-4 text-cyan-400" />
          <span>ATMOSPHERE & RADAR</span>
        </button>

        <button
          onClick={() => { playClickSound(); setActiveWidgetTab('voice'); }}
          className={`px-3 py-2.5 rounded border transition-all text-left flex items-center gap-2 cursor-pointer ${
            activeWidgetTab === 'voice' 
              ? 'bg-cyan-950/80 border-cyan-400 text-white glow-cyan-sm' 
              : 'bg-black/40 border-cyan-900/40 text-cyan-400 hover:border-cyan-500/50'
          }`}
        >
          <Radio className="w-4 h-4 text-cyan-400" />
          <span>AI VOICE & WAVEFORM</span>
        </button>

        <button
          onClick={() => { playClickSound(); setActiveWidgetTab('radar'); }}
          className={`px-3 py-2.5 rounded border transition-all text-left flex items-center gap-2 cursor-pointer ${
            activeWidgetTab === 'radar' 
              ? 'bg-cyan-950/80 border-cyan-400 text-white glow-cyan-sm' 
              : 'bg-black/40 border-cyan-900/40 text-cyan-400 hover:border-cyan-500/50'
          }`}
        >
          <Compass className="w-4 h-4 text-cyan-400" />
          <span>ORBITAL COMPASS</span>
        </button>
      </div>

      {/* Main Interactive Widget Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Active Featured Interactive Widget (Medium 4x2 or Large 4x4 simulation) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* 1. CLOCK & CHRONOMETER WIDGET */}
          {activeWidgetTab === 'clock' && (
            <div id="widget-clock" className="hud-panel p-6 rounded-xl border border-cyan-500/40 bg-gradient-to-b from-[#061226]/90 to-[#020713]/90 relative overflow-hidden">
              {/* Corner tech specs */}
              <div className="flex justify-between items-center text-xs font-mono-tech text-cyan-400/70 mb-4 pb-2 border-b border-cyan-900/30">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                  CHRONO.SYS // ATOMIC SYNC
                </span>
                <span>UTC+07 // INDOCHINA TIME</span>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-4">
                {/* Visual Rotating Arc Reactor Core */}
                <div className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center">
                  {/* Outer notched ring */}
                  <div className="absolute inset-0 border-2 border-dashed border-cyan-400/40 rounded-full animate-spin-slow"></div>
                  {/* Middle rotating ring */}
                  <div className="absolute inset-4 border border-cyan-300/60 rounded-full animate-spin-reverse-slow border-t-transparent border-b-transparent"></div>
                  {/* Inner pulsing core */}
                  <div className="absolute inset-10 rounded-full bg-cyan-500/10 border border-cyan-400/80 flex items-center justify-center glow-cyan-sm">
                    <div className="w-14 h-14 rounded-full border-2 border-white/80 bg-cyan-400/30 flex items-center justify-center animate-pulse">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  {/* Radial degree notches */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                    <div
                      key={deg}
                      className="absolute w-1 h-2 bg-cyan-400/80 origin-bottom"
                      style={{
                        transform: `rotate(${deg}deg) translateY(-100px)`
                      }}
                    />
                  ))}
                </div>

                {/* Real-time Large Digital Display */}
                <div className="flex-1 text-center md:text-left space-y-2">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-orbitron font-extrabold text-white tracking-wider text-glow flex items-baseline justify-center md:justify-start gap-1">
                    <span>{hours}</span>
                    <span className="text-cyan-400 animate-pulse">:</span>
                    <span>{minutes}</span>
                    <span className="text-cyan-400 animate-pulse">:</span>
                    <span>{seconds}</span>
                    <span className="text-xl sm:text-2xl text-cyan-400 font-mono-tech font-normal ml-2">.{ms}</span>
                  </div>

                  <div className="text-cyan-300 font-mono-tech text-base">
                    {dateStr}
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-3 font-mono-tech text-xs">
                    <div className="p-2 bg-cyan-950/40 border border-cyan-800/40 rounded">
                      <div className="text-cyan-500">STARK CYCLE</div>
                      <div className="text-white font-bold">MK-VII 2026.09</div>
                    </div>
                    <div className="p-2 bg-cyan-950/40 border border-cyan-800/40 rounded">
                      <div className="text-cyan-500">REACTOR STATUS</div>
                      <div className="text-green-400 font-bold">100% OPERATIONAL</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Download Snapshot Button */}
              <div className="mt-4 pt-3 border-t border-cyan-900/30 flex justify-end">
                <button
                  onClick={() => downloadWidgetSnapshot('widget-clock', 'Clock')}
                  className="text-xs font-mono-tech text-cyan-300 hover:text-white px-3 py-1.5 bg-cyan-900/30 hover:bg-cyan-800/40 border border-cyan-700/50 rounded flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>ส่งออกเป็นภาพวิดเจ็ต (PNG)</span>
                </button>
              </div>
            </div>
          )}

          {/* 2. SYSTEM TELEMETRY & BATTERY */}
          {activeWidgetTab === 'system' && (
            <div id="widget-system" className="hud-panel p-6 rounded-xl border border-cyan-500/40 bg-[#040c1e]/90 relative">
              <div className="flex justify-between items-center text-xs font-mono-tech text-cyan-400/70 mb-4 pb-2 border-b border-cyan-900/30">
                <span className="flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  DIAGNOSTIC TELEMETRY // CORE HARDWARE
                </span>
                <span className="text-green-400">STATUS: NOMINAL</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Battery Gauge */}
                <div className="space-y-3 p-4 bg-black/40 border border-cyan-900/40 rounded-lg">
                  <div className="flex justify-between items-center font-mono-tech">
                    <span className="text-xs text-cyan-400 flex items-center gap-1.5">
                      <Battery className="w-4 h-4 text-cyan-400" />
                      CELLULAR BATTERY LEVEL
                    </span>
                    <span className="text-lg font-bold text-white">{batteryInfo.level}%</span>
                  </div>

                  {/* Battery Bar */}
                  <div className="h-5 w-full bg-cyan-950/60 rounded-sm border border-cyan-500/40 overflow-hidden p-0.5">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        batteryInfo.level > 20 ? 'bg-gradient-to-r from-cyan-500 to-blue-400' : 'bg-red-500'
                      }`}
                      style={{ width: `${batteryInfo.level}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-xs font-mono-tech text-cyan-400/80">
                    <span>สถานะ: {batteryInfo.charging ? '⚡ กำลังชาร์จ (Charging)' : 'ทำงานจากแบตเตอรี่'}</span>
                    <span>แรงดัน: 4.15V STABLE</span>
                  </div>
                </div>

                {/* Simulated Synaptic Core / RAM Allocation */}
                <div className="space-y-3 p-4 bg-black/40 border border-cyan-900/40 rounded-lg">
                  <div className="flex justify-between items-center font-mono-tech">
                    <span className="text-xs text-cyan-400 flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-cyan-400" />
                      SYNAPSE NEURAL LOAD
                    </span>
                    <span className="text-lg font-bold text-cyan-300">34.8 GFLOPS</span>
                  </div>

                  {/* Frequency bars */}
                  <div className="flex items-end gap-1.5 h-10 pt-2">
                    {[45, 68, 30, 85, 92, 40, 75, 55, 90, 60, 48, 80].map((val, idx) => (
                      <div 
                        key={idx}
                        className="flex-1 bg-cyan-400/60 rounded-t-sm transition-all duration-300 hover:bg-cyan-300"
                        style={{ height: `${val}%` }}
                      />
                    ))}
                  </div>

                  <div className="flex justify-between text-xs font-mono-tech text-cyan-400/80">
                    <span>RAM: 3.8GB / 8.0GB</span>
                    <span>TEMP: 38°C OPTIMAL</span>
                  </div>
                </div>
              </div>

              {/* Hardware Sensors Grid */}
              <div className="grid grid-cols-3 gap-3 mt-4 text-center font-mono-tech text-xs">
                <div className="p-3 bg-cyan-950/20 border border-cyan-800/30 rounded">
                  <div className="text-cyan-500">ENCRYPTION</div>
                  <div className="text-white font-bold">AES-512 QUANTUM</div>
                </div>
                <div className="p-3 bg-cyan-950/20 border border-cyan-800/30 rounded">
                  <div className="text-cyan-500">SIGNAL LINK</div>
                  <div className="text-white font-bold">5G // -64 dBm</div>
                </div>
                <div className="p-3 bg-cyan-950/20 border border-cyan-800/30 rounded">
                  <div className="text-cyan-500">FIREWALL</div>
                  <div className="text-green-400 font-bold">STARK SHIELD ON</div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-cyan-900/30 flex justify-end">
                <button
                  onClick={() => downloadWidgetSnapshot('widget-system', 'System')}
                  className="text-xs font-mono-tech text-cyan-300 hover:text-white px-3 py-1.5 bg-cyan-900/30 hover:bg-cyan-800/40 border border-cyan-700/50 rounded flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>ส่งออกเป็นภาพวิดเจ็ต (PNG)</span>
                </button>
              </div>
            </div>
          )}

          {/* 3. ATMOSPHERIC & WEATHER RADAR */}
          {activeWidgetTab === 'weather' && (
            <div id="widget-weather" className="hud-panel p-6 rounded-xl border border-cyan-500/40 bg-[#040c1e]/90 relative">
              <div className="flex justify-between items-center text-xs font-mono-tech text-cyan-400/70 mb-4 pb-2 border-b border-cyan-900/30">
                <span className="flex items-center gap-1.5">
                  <Wind className="w-4 h-4 text-cyan-400" />
                  ATMOSPHERIC SCANNER // TROPOSPHERE RADAR
                </span>
                <button 
                  onClick={fetchWeather}
                  className="text-cyan-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>REFRESH RADAR</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                {/* Temperature HUD */}
                <div className="space-y-1">
                  <div className="text-xs font-mono-tech text-cyan-400">LOCATION TARGET</div>
                  <div className="text-xl font-bold text-white font-orbitron">{weatherData.city}</div>
                  <div className="text-5xl font-extrabold font-orbitron text-white text-glow">
                    {weatherData.temp}°C
                  </div>
                  <div className="text-sm font-mono-tech text-cyan-300 pt-1">
                    {weatherData.condition}
                  </div>
                </div>

                {/* Radar Grid Graphic */}
                <div className="relative w-40 h-40 mx-auto border-2 border-cyan-500/40 rounded-full flex items-center justify-center bg-black/40">
                  <div className="absolute inset-0 rounded-full border border-cyan-400/20"></div>
                  <div className="absolute inset-4 rounded-full border border-cyan-400/30"></div>
                  <div className="absolute inset-10 rounded-full border border-cyan-400/40"></div>
                  {/* Crosshairs */}
                  <div className="absolute w-full h-[1px] bg-cyan-400/30"></div>
                  <div className="absolute h-full w-[1px] bg-cyan-400/30"></div>
                  {/* Radar sweep beam */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-cyan-400/10 to-cyan-400/30 animate-radar-sweep pointer-events-none"></div>
                  {/* Blip */}
                  <div className="absolute w-2 h-2 rounded-full bg-cyan-400 top-10 right-12 animate-ping"></div>
                </div>

                {/* Atmosphere Telemetry Details */}
                <div className="space-y-2 font-mono-tech text-xs">
                  <div className="p-2.5 bg-black/40 border border-cyan-900/40 rounded flex justify-between">
                    <span className="text-cyan-400">ความชื้นสัมพัทธ์ (Humidity)</span>
                    <span className="text-white font-bold">{weatherData.humidity}%</span>
                  </div>
                  <div className="p-2.5 bg-black/40 border border-cyan-900/40 rounded flex justify-between">
                    <span className="text-cyan-400">ความเร็วลม (Wind Vector)</span>
                    <span className="text-white font-bold">{weatherData.wind} km/h</span>
                  </div>
                  <div className="p-2.5 bg-black/40 border border-cyan-900/40 rounded flex justify-between">
                    <span className="text-cyan-400">ความกดอากาศ (Barometric)</span>
                    <span className="text-white font-bold">{weatherData.pressure} hPa</span>
                  </div>
                  <div className="p-2.5 bg-black/40 border border-cyan-900/40 rounded flex justify-between">
                    <span className="text-cyan-400">รังสี UV Index</span>
                    <span className="text-amber-400 font-bold">MODERATE (UV {weatherData.uv})</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-cyan-900/30 flex justify-end">
                <button
                  onClick={() => downloadWidgetSnapshot('widget-weather', 'Atmosphere')}
                  className="text-xs font-mono-tech text-cyan-300 hover:text-white px-3 py-1.5 bg-cyan-900/30 hover:bg-cyan-800/40 border border-cyan-700/50 rounded flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>ส่งออกเป็นภาพวิดเจ็ต (PNG)</span>
                </button>
              </div>
            </div>
          )}

          {/* 4. AI VOICE & WAVEFORM */}
          {activeWidgetTab === 'voice' && (
            <div id="widget-voice" className="hud-panel p-6 rounded-xl border border-cyan-500/40 bg-[#040c1e]/90 relative">
              <div className="flex justify-between items-center text-xs font-mono-tech text-cyan-400/70 mb-4 pb-2 border-b border-cyan-900/30">
                <span className="flex items-center gap-1.5">
                  <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                  J.A.R.V.I.S. SYNAPTIC VOICE COCKPIT
                </span>
                <span className="text-cyan-400">VOICE ENGINE ACTIVE</span>
              </div>

              {/* AI Terminal Message Display */}
              <div className="p-4 bg-black/60 border border-cyan-500/30 rounded-lg relative overflow-hidden mb-5">
                <div className="text-xs font-mono-tech text-cyan-500 mb-1 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>JARVIS RESPONSE MATRIX:</span>
                </div>
                <div className="text-lg md:text-xl font-mono-tech text-white leading-relaxed text-glow">
                  &ldquo;{aiResponseText}&rdquo;
                </div>
              </div>

              {/* Holographic Waveform Animation */}
              <div className="flex items-center justify-center gap-1.5 h-16 py-2 px-4 bg-cyan-950/20 border border-cyan-900/30 rounded-lg mb-6">
                {[20, 45, 75, 90, 60, 30, 85, 100, 70, 40, 95, 80, 50, 65, 85, 30, 60, 95, 45, 20].map((height, i) => (
                  <div
                    key={i}
                    className="w-1.5 bg-gradient-to-t from-cyan-600 to-cyan-300 rounded-full animate-pulse"
                    style={{ 
                      height: `${height}%`,
                      animationDelay: `${i * 0.05}s`,
                      animationDuration: '1.2s'
                    }}
                  />
                ))}
              </div>

              {/* Preset Voice Directives */}
              <div className="space-y-2">
                <div className="text-xs font-mono-tech text-cyan-400">คำสั่งเสียงสำเร็จรูป (PROMPT DIRECTIVES):</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono-tech text-xs">
                  <button
                    onClick={() => handleVoiceCommand(
                      'status',
                      'ระบบทุกภาคส่วนทำงานสมบูรณ์แบบ แบตเตอรี่และระบบประมวลผลพร้อมใช้งานครับ'
                    )}
                    className="p-2.5 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-700/40 hover:border-cyan-400 text-left text-cyan-300 rounded flex items-center gap-2 cursor-pointer transition-all"
                  >
                    <Shield className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>รายงานสถานะระบบ (Status Report)</span>
                  </button>

                  <button
                    onClick={() => handleVoiceCommand(
                      'defense',
                      'เปิดโปรโตคอลป้องกันภัยระดับมาร์ค 7 สัญญาณเข้ารหัสควอนตัมทำงานเต็มรูปแบบครับ'
                    )}
                    className="p-2.5 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-700/40 hover:border-cyan-400 text-left text-cyan-300 rounded flex items-center gap-2 cursor-pointer transition-all"
                  >
                    <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>เปิดระบบป้องกันความปลอดภัย (Defense)</span>
                  </button>

                  <button
                    onClick={() => handleVoiceCommand(
                      'power',
                      'เตาปฏิกรณ์อาร์กกำลังจ่ายพลังงานคงที่ คลื่นความถี่สมดุล ไร้ความผิดปกติครับ'
                    )}
                    className="p-2.5 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-700/40 hover:border-cyan-400 text-left text-cyan-300 rounded flex items-center gap-2 cursor-pointer transition-all"
                  >
                    <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>ตรวจสอบระดับพลังงาน (Power Check)</span>
                  </button>

                  <button
                    onClick={() => handleVoiceCommand(
                      'scan',
                      'เริ่มการสแกนคลื่นเรดาร์ 360 องศา ตรวจพบพิกัดดาวเทียมเชื่อมต่อ 3 ดวงครับ'
                    )}
                    className="p-2.5 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-700/40 hover:border-cyan-400 text-left text-cyan-300 rounded flex items-center gap-2 cursor-pointer transition-all"
                  >
                    <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>สแกนพื้นที่รอบตัว (Environment Scan)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 5. ORBITAL RADAR & COMPASS */}
          {activeWidgetTab === 'radar' && (
            <div id="widget-radar" className="hud-panel p-6 rounded-xl border border-cyan-500/40 bg-[#040c1e]/90 relative">
              <div className="flex justify-between items-center text-xs font-mono-tech text-cyan-400/70 mb-4 pb-2 border-b border-cyan-900/30">
                <span className="flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-cyan-400" />
                  ORBITAL SATELLITE RADAR & HEADING COMPASS
                </span>
                <span>HEADING: {deviceHeading}° N</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* 360 Rotating Compass Gauge */}
                <div className="relative w-52 h-52 mx-auto border-2 border-cyan-400/50 rounded-full flex items-center justify-center bg-black/40">
                  {/* Outer degree ring */}
                  <div 
                    className="absolute inset-0 rounded-full border border-dashed border-cyan-400/40 transition-transform duration-500"
                    style={{ transform: `rotate(${-deviceHeading}deg)` }}
                  >
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 text-xs font-bold text-red-500">N</div>
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs font-bold text-white">S</div>
                    <div className="absolute right-1 top-1/2 -translate-y-1/2 text-xs font-bold text-white">E</div>
                    <div className="absolute left-1 top-1/2 -translate-y-1/2 text-xs font-bold text-white">W</div>
                  </div>

                  {/* Radar sweep beam */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-cyan-400/10 to-cyan-400/25 animate-radar-sweep pointer-events-none"></div>

                  {/* Central Heading Indicator */}
                  <div className="w-16 h-16 rounded-full bg-cyan-950/80 border border-cyan-400 flex flex-col items-center justify-center font-orbitron">
                    <span className="text-lg font-bold text-white">{deviceHeading}°</span>
                    <span className="text-[10px] text-cyan-400 font-mono-tech">TRUE</span>
                  </div>
                </div>

                {/* Radar Blips Telemetry List */}
                <div className="space-y-3 font-mono-tech text-xs">
                  <div className="text-cyan-400 font-bold">ดาวเทียมและจุดส่งสัญญาณที่ตรวจพบ:</div>
                  {radarBlips.map((blip) => (
                    <div key={blip.id} className="p-3 bg-black/40 border border-cyan-900/40 rounded flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-ping"></span>
                        <span className="text-white font-bold">{blip.label}</span>
                      </div>
                      <span className="text-cyan-400">ระยะห่าง: {blip.dist}</span>
                      <span className="px-2 py-0.5 bg-cyan-950 border border-cyan-500/30 text-[10px] text-cyan-300 rounded">
                        LOCKED
                      </span>
                    </div>
                  ))}
                  <div className="p-2.5 bg-cyan-950/30 border border-cyan-800/40 rounded text-[11px] text-cyan-300/80">
                    💡 รองรับการหมุนตามเซนเซอร์เข็มทิศจริงเมื่อเปิดบนอุปกรณ์พกพา / แท็บเล็ต
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-cyan-900/30 flex justify-end">
                <button
                  onClick={() => downloadWidgetSnapshot('widget-radar', 'Compass')}
                  className="text-xs font-mono-tech text-cyan-300 hover:text-white px-3 py-1.5 bg-cyan-900/30 hover:bg-cyan-800/40 border border-cyan-700/50 rounded flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>ส่งออกเป็นภาพวิดเจ็ต (PNG)</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Right Side: Quick Guide & Widgetsmith / iOS / Android Instructions */}
        <div className="lg:col-span-4 space-y-4">
          <div className="hud-panel p-5 rounded-xl border border-cyan-500/30 bg-[#040916]/90 space-y-4">
            <h4 className="text-base font-orbitron font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              วิธีติดตั้งวิดเจ็ตบนมือถือ & แท็บเล็ต
            </h4>

            {/* iOS Steps */}
            <div className="space-y-2 text-xs font-mono-tech text-cyan-300/90">
              <div className="font-bold text-white flex items-center gap-1.5 text-sm">
                <span>🍎</span> สำหรับ iPhone &amp; iPad:
              </div>
              <ul className="list-disc pl-4 space-y-1.5 text-cyan-300/80">
                <li>
                  <strong>วิธีที่ 1 (ภาพนิ่ง HD):</strong> กดปุ่ม <em>"ส่งออกเป็นภาพวิดเจ็ต"</em> แล้วนำไปใส่ในแอพ <strong>Widgetsmith</strong> หรือ <strong>Photo Widget</strong> เลือกขนาด Small หรือ Medium
                </li>
                <li>
                  <strong>วิธีที่ 2 (วิดเจ็ตสด Real-time):</strong> กดปุ่ม <em>"คัดลอกโค้ด iOS Scriptable"</em> ด้านบน แล้วเปิดแอพ <strong>Scriptable</strong> บน iPhone/iPad วางโค้ด แล้วเพิ่ม Widget ของ Scriptable มาที่หน้าโฮม!
                </li>
                <li>
                  <strong>วิธีที่ 3 (Dashboard เต็มจอ):</strong> กดแชร์ใน Safari แล้วเลือก <strong>"เพิ่มไปยังหน้าจอโฮม" (Add to Home Screen)</strong> จะได้แผงควบคุมจาวิสเต็มจอเหมือนในภาพยนตร์!
                </li>
              </ul>
            </div>

            <div className="border-t border-cyan-900/30 pt-3 space-y-2 text-xs font-mono-tech text-cyan-300/90">
              <div className="font-bold text-white flex items-center gap-1.5 text-sm">
                <span>🤖</span> สำหรับ Android &amp; แท็บเล็ต:
              </div>
              <ul className="list-disc pl-4 space-y-1.5 text-cyan-300/80">
                <li>
                  นำภาพที่ส่งออกไปใส่ในแอพ <strong>KWGT Kustom Widget</strong> หรือ <strong>Simple Photo Widget</strong>
                </li>
                <li>
                  หรือกดติดตั้งเป็น PWA ใน Chrome / Edge เพื่อแสดงแดชบอร์ดจาวิสแบบ Standby Mode ขณะชาร์จแบตเตอรี่บนโต๊ะทำงาน
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
