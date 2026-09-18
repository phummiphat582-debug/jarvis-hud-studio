import React, { useState, useEffect, useRef } from 'react';
import { 
  Download, Sparkles, Sliders, Palette, Layers, Eye, 
  Search, Check, FileArchive, Smartphone, Upload, RefreshCw, 
  ShieldCheck, ExternalLink, ArrowDownToLine, Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { APPS_DATA, APP_CATEGORIES, HUD_THEMES, FRAME_STYLES } from '../data/apps';
import { GLYPH_RENDERERS } from '../utils/iconGlyphs';
import { renderJarvisIcon, downloadAllIconsZip, generateIosMobileConfig } from '../utils/iconCanvas';
import { playClickSound, playHoverSound, playDownloadSound } from '../utils/audio';

export default function IconStudio({ currentTheme, onThemeChange }) {
  // Current Selected App for Studio Customization
  const [selectedApp, setSelectedApp] = useState(APPS_DATA[0]); // Default to LINE
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Customization settings
  const [selectedFrame, setSelectedFrame] = useState('arc-reactor');
  const [bgType, setBgType] = useState('amoled'); // 'amoled' | 'transparent' | 'grid'
  const [showLabel, setShowLabel] = useState(true);
  const [customLabel, setCustomLabel] = useState('LINE');
  const [showTechDecals, setShowTechDecals] = useState(true);
  const [glowIntensity, setGlowIntensity] = useState(1.2);

  // Custom Uploaded Image
  const [customUploadedImg, setCustomUploadedImg] = useState(null);

  // Batch Export State
  const [isExportingZip, setIsExportingZip] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [currentExportItem, setCurrentExportItem] = useState('');

  // Main Canvas Ref for Live Rendering
  const mainCanvasRef = useRef(null);

  // Update customLabel when selected app changes
  useEffect(() => {
    if (selectedApp) {
      setCustomLabel(selectedApp.defaultLabel || selectedApp.name);
    }
  }, [selectedApp]);

  // Render the selected icon onto the main canvas whenever options change
  useEffect(() => {
    if (!mainCanvasRef.current) return;
    const canvas = mainCanvasRef.current;

    const glyphFn = customUploadedImg 
      ? null 
      : (GLYPH_RENDERERS[selectedApp.iconName] || GLYPH_RENDERERS.MessageSquare);

    renderJarvisIcon(canvas, {
      size: 1024,
      frameStyle: selectedFrame,
      themeColor: currentTheme.primaryColor,
      secondaryColor: currentTheme.secondaryColor,
      bgType: bgType,
      showLabel: showLabel,
      labelText: customLabel,
      showTechDecals: showTechDecals,
      glowIntensity: glowIntensity,
      svgPathOrImg: customUploadedImg,
      iconGlyph: glyphFn
    });
  }, [selectedApp, selectedFrame, currentTheme, bgType, showLabel, customLabel, showTechDecals, glowIntensity, customUploadedImg]);

  // Handle single icon download
  const handleDownloadSingle = () => {
    playDownloadSound();
    if (!mainCanvasRef.current) return;

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: [currentTheme.primaryColor, '#ffffff', currentTheme.secondaryColor]
      });
    } catch {
      // Confetti fallback
    }

    const dataUrl = mainCanvasRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `JARVIS_${selectedApp.id.toUpperCase()}_1024x1024.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Handle batch ZIP export of all or filtered apps
  const handleExportAllZip = async () => {
    playClickSound();
    setIsExportingZip(true);
    setExportProgress(0);

    const appsToExport = APPS_DATA;
    const offscreenCanvas = document.createElement('canvas');

    const renderFunc = async (app) => {
      const glyph = GLYPH_RENDERERS[app.iconName] || GLYPH_RENDERERS.MessageSquare;
      await renderJarvisIcon(offscreenCanvas, {
        size: 1024,
        frameStyle: selectedFrame,
        themeColor: currentTheme.primaryColor,
        secondaryColor: currentTheme.secondaryColor,
        bgType: bgType,
        showLabel: showLabel,
        labelText: app.defaultLabel || app.name,
        showTechDecals: showTechDecals,
        glowIntensity: glowIntensity,
        iconGlyph: glyph
      });
      return offscreenCanvas.toDataURL('image/png');
    };

    try {
      await downloadAllIconsZip(appsToExport, renderFunc, (percent, itemName) => {
        setExportProgress(percent);
        setCurrentExportItem(itemName);
      });
      playDownloadSound();
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: [currentTheme.primaryColor, '#00ff88', '#ffffff']
        });
      } catch {}
    } catch (err) {
      console.error('Error generating zip:', err);
    } finally {
      setIsExportingZip(false);
    }
  };

  // Generate iOS .mobileconfig profile
  const handleDownloadMobileConfig = async () => {
    playClickSound();
    const offscreenCanvas = document.createElement('canvas');
    const enrichedList = [];

    // Render 10 prominent apps for mobileconfig
    const popularKeys = ['line', 'facebook', 'instagram', 'tiktok', 'youtube', 'spotify', 'camera', 'safari', 'kplus', 'chatgpt'];
    const filteredPopular = APPS_DATA.filter(a => popularKeys.includes(a.id));

    for (const app of filteredPopular) {
      const glyph = GLYPH_RENDERERS[app.iconName] || GLYPH_RENDERERS.MessageSquare;
      await renderJarvisIcon(offscreenCanvas, {
        size: 512,
        frameStyle: selectedFrame,
        themeColor: currentTheme.primaryColor,
        secondaryColor: currentTheme.secondaryColor,
        bgType: bgType,
        showLabel: showLabel,
        labelText: app.defaultLabel || app.name,
        showTechDecals: false,
        glowIntensity: glowIntensity,
        iconGlyph: glyph
      });
      enrichedList.push({
        ...app,
        iconBase64: offscreenCanvas.toDataURL('image/png')
      });
    }

    const xmlContent = generateIosMobileConfig(enrichedList, currentTheme.name);
    const blob = new Blob([xmlContent], { type: 'application/x-apple-aspen-config' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `JARVIS_HUD_${currentTheme.id}.mobileconfig`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Handle custom image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      playClickSound();
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setCustomUploadedImg(img);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  // Filtered Apps
  const filteredApps = APPS_DATA.filter((app) => {
    const matchesCategory = activeCategory === 'all' || app.category === activeCategory;
    const matchesQuery = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.techCode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-8">
      {/* Studio Header & Batch Actions */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-cyan-900/40">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <h3 className="text-xl md:text-2xl font-orbitron font-bold text-white tracking-wider">
              J.A.R.V.I.S. ICON WORKSHOP &amp; GENERATOR
            </h3>
          </div>
          <p className="text-sm text-cyan-400/80 font-mono-tech mt-1">
            ปรับแต่งไอคอนความละเอียด 1024x1024 ระดับ Ultra HD สำหรับ iPhone, iPad, และ Android พร้อมแพ็กดาวน์โหลดแบบรวมไฟล์
          </p>
        </div>

        {/* Global Batch Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleExportAllZip}
            disabled={isExportingZip}
            onMouseEnter={playHoverSound}
            className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-mono-tech text-xs rounded font-bold flex items-center gap-2 glow-cyan-sm cursor-pointer disabled:opacity-50 transition-all"
          >
            <FileArchive className="w-4 h-4" />
            <span>{isExportingZip ? `กำลังสังเคราะห์ ZIP (${exportProgress}%)...` : 'ดาวน์โหลดทุกไอคอน (ZIP Pack)'}</span>
          </button>

          <button
            onClick={handleDownloadMobileConfig}
            onMouseEnter={playHoverSound}
            className="px-3.5 py-2 bg-cyan-950/70 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 font-mono-tech text-xs rounded flex items-center gap-2 cursor-pointer transition-all hover:bg-cyan-900/40"
          >
            <Smartphone className="w-4 h-4" />
            <span>สร้าง iOS Profile (.mobileconfig)</span>
          </button>
        </div>
      </div>

      {/* Zip Export Progress Bar */}
      {isExportingZip && (
        <div className="hud-panel p-4 rounded-lg border border-cyan-500/60 bg-cyan-950/40 space-y-2">
          <div className="flex justify-between text-xs font-mono-tech text-cyan-300">
            <span>กำลังสังเคราะห์ไอคอน: {currentExportItem}</span>
            <span>{exportProgress}%</span>
          </div>
          <div className="h-2 w-full bg-black/60 rounded-full overflow-hidden border border-cyan-500/30">
            <div 
              className="h-full bg-cyan-400 transition-all duration-200"
              style={{ width: `${exportProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Main Studio Split View: [Live Canvas Preview + Customizer Controls] */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Live 1024x1024 HD Canvas Display */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="hud-panel p-6 rounded-2xl border border-cyan-500/40 bg-[#040a18]/90 w-full flex flex-col items-center relative overflow-hidden">
            {/* Top Bar Indicators */}
            <div className="w-full flex justify-between items-center text-[11px] font-mono-tech text-cyan-400/70 pb-3 border-b border-cyan-900/30 mb-4">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                ACTIVE MATRIX: {selectedApp.techCode}
              </span>
              <span>1024 x 1024 HD</span>
            </div>

            {/* Glowing Canvas Container */}
            <div className="relative p-2 rounded-2xl bg-black/50 border border-cyan-500/20 shadow-2xl flex items-center justify-center">
              <canvas
                ref={mainCanvasRef}
                className="w-56 h-56 sm:w-64 sm:h-64 rounded-2xl shadow-inner transition-all duration-300"
              />
              {/* Subtle holographic scanner line sweeping down */}
              <div className="absolute inset-2 pointer-events-none rounded-2xl bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent opacity-40 animate-pulse"></div>
            </div>

            {/* Current App Info */}
            <div className="mt-4 text-center space-y-1">
              <div className="text-lg font-orbitron font-bold text-white text-glow">
                {selectedApp.name}
              </div>
              <div className="text-xs font-mono-tech text-cyan-400">
                {selectedApp.description}
              </div>
              <div className="text-[11px] font-mono-tech text-cyan-500/80 pt-1">
                iOS Scheme: <code className="text-white px-1.5 py-0.5 bg-black/60 rounded border border-cyan-900/40">{selectedApp.iosScheme}</code>
              </div>
            </div>

            {/* Single Icon Download Button */}
            <div className="w-full mt-6 space-y-2">
              <button
                onClick={handleDownloadSingle}
                onMouseEnter={playHoverSound}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-orbitron font-bold text-xs sm:text-sm tracking-wider rounded-lg flex items-center justify-center gap-2 glow-cyan cursor-pointer transition-all shadow-lg"
              >
                <Download className="w-4 h-4 text-black" />
                <span>ดาวน์โหลดไอคอนนี้ (1024px PNG)</span>
              </button>

              <div className="flex items-center justify-between text-[11px] font-mono-tech text-cyan-400/60 pt-1 px-1">
                <span>FORMAT: PNG 32-BIT</span>
                <span>COLOR: {currentTheme.name}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Customizer Controls Panel */}
        <div className="lg:col-span-7 space-y-6">
          <div className="hud-panel p-6 rounded-2xl border border-cyan-500/30 bg-[#040c1e]/90 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-cyan-900/40">
              <h4 className="text-base font-orbitron font-bold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                แผงปรับแต่งสไตล์ J.A.R.V.I.S. (CUSTOMIZER ENGINE)
              </h4>
              <span className="text-xs font-mono-tech text-cyan-400">MK-VII SYSTEM</span>
            </div>

            {/* 1. Theme Color Palette */}
            <div className="space-y-2.5">
              <label className="text-xs font-mono-tech text-cyan-300 font-bold flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-cyan-400" />
                <span>1. โทนสีแสงนีออน (HUD COLOR THEME)</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono-tech text-xs">
                {HUD_THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => {
                      playClickSound();
                      onThemeChange(theme);
                    }}
                    onMouseEnter={playHoverSound}
                    className={`p-2.5 rounded border text-left flex items-center gap-2 cursor-pointer transition-all ${
                      currentTheme.id === theme.id
                        ? 'bg-cyan-950/80 border-cyan-400 text-white glow-cyan-sm'
                        : 'bg-black/40 border-cyan-900/40 text-cyan-400/80 hover:border-cyan-600/50'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full shrink-0 shadow-sm"
                      style={{ backgroundColor: theme.primaryColor, boxShadow: `0 0 8px ${theme.primaryColor}` }}
                    />
                    <div className="truncate">
                      <div className="font-bold text-[11px] truncate">{theme.name}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Frame & Geometry Style */}
            <div className="space-y-2.5">
              <label className="text-xs font-mono-tech text-cyan-300 font-bold flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>2. รูปทรงกรอบไฮเทค (CYBER FRAME STYLE)</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono-tech text-xs">
                {FRAME_STYLES.map((frame) => (
                  <button
                    key={frame.id}
                    onClick={() => {
                      playClickSound();
                      setSelectedFrame(frame.id);
                    }}
                    onMouseEnter={playHoverSound}
                    className={`p-2.5 rounded border text-left cursor-pointer transition-all ${
                      selectedFrame === frame.id
                        ? 'bg-cyan-950/80 border-cyan-400 text-white glow-cyan-sm'
                        : 'bg-black/40 border-cyan-900/40 text-cyan-400/80 hover:border-cyan-600/50'
                    }`}
                  >
                    <div className="font-bold text-white flex items-center justify-between">
                      <span>{frame.nameTh}</span>
                      {selectedFrame === frame.id && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                    </div>
                    <div className="text-[11px] text-cyan-400/70 mt-0.5">{frame.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Background & Texture Mode */}
            <div className="space-y-2.5">
              <label className="text-xs font-mono-tech text-cyan-300 font-bold flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                <span>3. พื้นหลังไอคอน (BACKGROUND TEXTURE)</span>
              </label>
              <div className="grid grid-cols-3 gap-2 font-mono-tech text-xs">
                <button
                  onClick={() => { playClickSound(); setBgType('amoled'); }}
                  className={`p-2 rounded border text-center cursor-pointer transition-all ${
                    bgType === 'amoled'
                      ? 'bg-cyan-950/80 border-cyan-400 text-white glow-cyan-sm'
                      : 'bg-black/40 border-cyan-900/40 text-cyan-400/80'
                  }`}
                >
                  AMOLED Deep Black
                </button>
                <button
                  onClick={() => { playClickSound(); setBgType('grid'); }}
                  className={`p-2 rounded border text-center cursor-pointer transition-all ${
                    bgType === 'grid'
                      ? 'bg-cyan-950/80 border-cyan-400 text-white glow-cyan-sm'
                      : 'bg-black/40 border-cyan-900/40 text-cyan-400/80'
                  }`}
                >
                  Holo Cyber Grid
                </button>
                <button
                  onClick={() => { playClickSound(); setBgType('transparent'); }}
                  className={`p-2 rounded border text-center cursor-pointer transition-all ${
                    bgType === 'transparent'
                      ? 'bg-cyan-950/80 border-cyan-400 text-white glow-cyan-sm'
                      : 'bg-black/40 border-cyan-900/40 text-cyan-400/80'
                  }`}
                >
                  Transparent PNG
                </button>
              </div>
            </div>

            {/* 4. Labels & Decals Customization */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-cyan-900/30">
              {/* Custom Text Label */}
              <div className="space-y-1.5 font-mono-tech text-xs">
                <div className="flex justify-between items-center">
                  <label className="text-cyan-300">ข้อความบนไอคอน (HUD LABEL)</label>
                  <label className="flex items-center gap-1 cursor-pointer text-cyan-400">
                    <input
                      type="checkbox"
                      checked={showLabel}
                      onChange={(e) => setShowLabel(e.target.checked)}
                      className="accent-cyan-400"
                    />
                    <span>เปิดแสดง</span>
                  </label>
                </div>
                <input
                  type="text"
                  value={customLabel}
                  disabled={!showLabel}
                  onChange={(e) => setCustomLabel(e.target.value)}
                  maxLength={16}
                  placeholder="เช่น LINE, YOUTUBE"
                  className="w-full px-3 py-2 bg-black/60 border border-cyan-800/60 rounded text-white text-xs font-mono-tech focus:border-cyan-400 focus:outline-none disabled:opacity-40"
                />
              </div>

              {/* Upload Custom Logo */}
              <div className="space-y-1.5 font-mono-tech text-xs">
                <label className="text-cyan-300 flex items-center justify-between">
                  <span>อัปโหลดรูป/โลโก้ของตัวเอง</span>
                  {customUploadedImg && (
                    <button
                      onClick={() => setCustomUploadedImg(null)}
                      className="text-red-400 hover:text-red-300 cursor-pointer"
                    >
                      ยกเลิก
                    </button>
                  )}
                </label>
                <label className="w-full py-2 px-3 bg-black/60 hover:bg-cyan-950/40 border border-dashed border-cyan-700/60 hover:border-cyan-400 rounded flex items-center justify-center gap-2 cursor-pointer transition-all text-cyan-300">
                  <Upload className="w-4 h-4 text-cyan-400" />
                  <span className="truncate">
                    {customUploadedImg ? 'เปลี่ยนภาพใหม่อีกครั้ง' : 'เลือกไฟล์รูปภาพ (PNG/JPG)'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* 5. Glow Intensity Slider */}
            <div className="space-y-1.5 font-mono-tech text-xs pt-2 border-t border-cyan-900/30">
              <div className="flex justify-between text-cyan-300">
                <span>ความสว่างของแสงนีออน (GLOW OVERCHARGE):</span>
                <span className="text-cyan-400 font-bold">{Math.round(glowIntensity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.1"
                value={glowIntensity}
                onChange={(e) => setGlowIntensity(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* App Preset Library Gallery */}
      <div className="hud-panel p-6 rounded-2xl border border-cyan-500/30 bg-[#040c1e]/90 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h4 className="text-base md:text-lg font-orbitron font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              คลังไอคอนแอพยอดนิยม 50+ รายการ (PRESET APP DIRECTORY)
            </h4>
            <p className="text-xs text-cyan-400/80 font-mono-tech mt-0.5">
              คลิกที่แอพเพื่อนำขึ้นไปปรับแต่ง หรือกดดาวน์โหลดไอคอนความละเอียดสูงได้ทันที
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาชื่อแอพ เช่น LINE, Bank..."
              className="w-full pl-9 pr-3 py-2 bg-black/60 border border-cyan-800/60 rounded text-xs font-mono-tech text-white focus:border-cyan-400 focus:outline-none placeholder:text-cyan-600"
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-cyan-900/30 font-mono-tech text-xs">
          {APP_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { playClickSound(); setActiveCategory(cat.id); }}
              className={`px-3 py-1.5 rounded-full whitespace-nowrap cursor-pointer transition-all ${
                activeCategory === cat.id
                  ? 'bg-cyan-500 text-black font-bold'
                  : 'bg-black/40 text-cyan-400 hover:bg-cyan-950/60 border border-cyan-900/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredApps.map((app) => {
            const isSelected = selectedApp.id === app.id;
            return (
              <div
                key={app.id}
                onClick={() => {
                  playClickSound();
                  setSelectedApp(app);
                  setCustomUploadedImg(null);
                }}
                onMouseEnter={playHoverSound}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col items-center justify-between text-center relative group ${
                  isSelected
                    ? 'bg-cyan-950/80 border-cyan-400 glow-cyan-sm'
                    : 'bg-black/40 border-cyan-900/40 hover:border-cyan-500/60 hover:bg-cyan-950/30'
                }`}
              >
                {/* Mini Preview Ring */}
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center border transition-all mb-2"
                  style={{
                    backgroundColor: '#030814',
                    borderColor: isSelected ? currentTheme.primaryColor : 'rgba(0, 240, 255, 0.3)',
                    boxShadow: isSelected ? `0 0 12px ${currentTheme.primaryColor}` : 'none'
                  }}
                >
                  <span 
                    className="text-xs font-bold font-mono-tech"
                    style={{ color: currentTheme.primaryColor }}
                  >
                    {app.name.substring(0, 3).toUpperCase()}
                  </span>
                </div>

                <div className="w-full">
                  <div className="font-bold text-xs text-white truncate font-orbitron">
                    {app.name}
                  </div>
                  <div className="text-[10px] text-cyan-400/70 font-mono-tech truncate">
                    {app.techCode}
                  </div>
                </div>

                {isSelected && (
                  <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
