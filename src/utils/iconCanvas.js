// High-Resolution J.A.R.V.I.S. HUD Icon Generator Engine
import JSZip from 'jszip';

// Helper to draw rounded rectangle
function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

// Helper to draw regular polygon (hexagon, octagon, etc.)
function drawPolygon(ctx, cx, cy, radius, sides, rotateAngle = 0) {
  ctx.beginPath();
  for (let i = 0; i < sides; i++) {
    const angle = rotateAngle + (i * 2 * Math.PI) / sides;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

/**
 * Render complete J.A.R.V.I.S. HUD icon onto an HTML5 Canvas
 */
export async function renderJarvisIcon(canvas, options = {}) {
  const {
    size = 1024,
    frameStyle = 'arc-reactor', // 'arc-reactor' | 'cyber-hexagon' | 'holo-octagon' | 'tachyon-ring' | 'matrix-bracket'
    themeColor = '#00f0ff',
    secondaryColor = '#0077ff',
    bgType = 'amoled', // 'amoled' | 'transparent' | 'grid'
    showLabel = true,
    labelText = 'COMM // 01',
    showTechDecals = true,
    glowIntensity = 1.2, // multiplier
    svgPathOrImg = null,
    iconGlyph = null, // fallback draw function or icon symbol
  } = options;

  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const cx = size / 2;
  const cy = size / 2;

  // Clear canvas
  ctx.clearRect(0, 0, size, size);

  // 1. Background
  if (bgType === 'amoled') {
    // Deep AMOLED space black with subtle radial cyber gradient
    const bgGradient = ctx.createRadialGradient(cx, cy, size * 0.1, cx, cy, size * 0.7);
    bgGradient.addColorStop(0, '#0a1426');
    bgGradient.addColorStop(0.6, '#040915');
    bgGradient.addColorStop(1, '#02050d');

    roundRect(ctx, size * 0.04, size * 0.04, size * 0.92, size * 0.92, size * 0.22);
    ctx.fillStyle = bgGradient;
    ctx.fill();

    // Subtle outer border
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
    ctx.lineWidth = size * 0.005;
    ctx.stroke();
  } else if (bgType === 'grid') {
    // Holographic grid background
    roundRect(ctx, size * 0.04, size * 0.04, size * 0.92, size * 0.92, size * 0.22);
    ctx.fillStyle = '#030814';
    ctx.fill();

    // Draw grid lines
    ctx.save();
    ctx.clip();
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
    ctx.lineWidth = 2;
    const step = size / 16;
    for (let x = 0; x <= size; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, size);
      ctx.stroke();
    }
    for (let y = 0; y <= size; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(size, y);
      ctx.stroke();
    }
    ctx.restore();
  }

  // 2. Futuristic Frame Rendering
  ctx.save();

  // Glow config
  ctx.shadowColor = themeColor;
  ctx.shadowBlur = 18 * glowIntensity;

  if (frameStyle === 'arc-reactor') {
    // Concentric Stark Arc Reactor
    const rOuter = size * 0.40;
    const rMid = size * 0.35;
    const rInner = size * 0.28;

    // Outer segmented dashed ring
    ctx.beginPath();
    ctx.arc(cx, cy, rOuter, 0, Math.PI * 2);
    ctx.strokeStyle = themeColor;
    ctx.lineWidth = size * 0.016;
    ctx.stroke();

    // Reactor Core Notches (10 radial coils)
    const coils = 10;
    for (let i = 0; i < coils; i++) {
      const ang = (i * 2 * Math.PI) / coils;
      const x1 = cx + Math.cos(ang) * (rOuter + size * 0.01);
      const y1 = cy + Math.sin(ang) * (rOuter + size * 0.01);
      const x2 = cx + Math.cos(ang) * (rMid - size * 0.01);
      const y2 = cy + Math.sin(ang) * (rMid - size * 0.01);

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = themeColor;
      ctx.lineWidth = size * 0.014;
      ctx.stroke();

      // Mini node block
      const bx = cx + Math.cos(ang) * (rOuter - size * 0.025);
      const by = cy + Math.sin(ang) * (rOuter - size * 0.025);
      ctx.beginPath();
      ctx.arc(bx, by, size * 0.016, 0, Math.PI * 2);
      ctx.fillStyle = secondaryColor;
      ctx.fill();
    }

    // Secondary middle dashed ring
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, rMid, 0, Math.PI * 2);
    ctx.strokeStyle = secondaryColor;
    ctx.setLineDash([size * 0.04, size * 0.02]);
    ctx.lineWidth = size * 0.008;
    ctx.stroke();
    ctx.restore();

    // Inner glowing ring
    ctx.beginPath();
    ctx.arc(cx, cy, rInner, 0, Math.PI * 2);
    ctx.strokeStyle = themeColor;
    ctx.lineWidth = size * 0.018;
    ctx.stroke();

  } else if (frameStyle === 'cyber-hexagon') {
    // 6-sided Tactical Hexagon
    const rOuter = size * 0.40;
    const rInner = size * 0.34;

    // Outer Hex
    drawPolygon(ctx, cx, cy, rOuter, 6, -Math.PI / 2);
    ctx.strokeStyle = themeColor;
    ctx.lineWidth = size * 0.02;
    ctx.stroke();

    // Corner tech nodes
    for (let i = 0; i < 6; i++) {
      const ang = -Math.PI / 2 + (i * 2 * Math.PI) / 6;
      const x = cx + rOuter * Math.cos(ang);
      const y = cy + rOuter * Math.sin(ang);
      ctx.beginPath();
      ctx.arc(x, y, size * 0.022, 0, Math.PI * 2);
      ctx.fillStyle = themeColor;
      ctx.fill();
    }

    // Inner Hex with dashed accent
    ctx.save();
    drawPolygon(ctx, cx, cy, rInner, 6, -Math.PI / 2);
    ctx.strokeStyle = secondaryColor;
    ctx.setLineDash([size * 0.03, size * 0.015]);
    ctx.lineWidth = size * 0.01;
    ctx.stroke();
    ctx.restore();

  } else if (frameStyle === 'holo-octagon') {
    // 8-sided Octagon HUD Shield
    const rOuter = size * 0.41;
    const rInner = size * 0.35;

    drawPolygon(ctx, cx, cy, rOuter, 8, Math.PI / 8);
    ctx.strokeStyle = themeColor;
    ctx.lineWidth = size * 0.02;
    ctx.stroke();

    // Crosshair corner brackets
    for (let i = 0; i < 8; i++) {
      const ang = Math.PI / 8 + (i * 2 * Math.PI) / 8;
      const x = cx + rOuter * Math.cos(ang);
      const y = cy + rOuter * Math.sin(ang);

      ctx.beginPath();
      ctx.arc(x, y, size * 0.015, 0, Math.PI * 2);
      ctx.fillStyle = secondaryColor;
      ctx.fill();
    }

    // Inner ring
    ctx.beginPath();
    ctx.arc(cx, cy, rInner, 0, Math.PI * 2);
    ctx.strokeStyle = secondaryColor;
    ctx.lineWidth = size * 0.008;
    ctx.stroke();

  } else if (frameStyle === 'tachyon-ring') {
    // Clean Minimal High-Tech Ring
    const rOuter = size * 0.40;
    ctx.beginPath();
    ctx.arc(cx, cy, rOuter, 0, Math.PI * 2);
    ctx.strokeStyle = themeColor;
    ctx.lineWidth = size * 0.022;
    ctx.stroke();

    // 4 cardinal HUD indicators (top, right, bottom, left)
    const cardinals = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
    cardinals.forEach(ang => {
      const x1 = cx + Math.cos(ang) * (rOuter - size * 0.04);
      const y1 = cy + Math.sin(ang) * (rOuter - size * 0.04);
      const x2 = cx + Math.cos(ang) * (rOuter + size * 0.04);
      const y2 = cy + Math.sin(ang) * (rOuter + size * 0.04);

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = size * 0.015;
      ctx.stroke();
    });

  } else if (frameStyle === 'text-only') {
    // Minimalist HUD Typography Box
    const boxW = size * 0.82;
    const boxH = size * 0.82;
    const x = (size - boxW) / 2;
    const y = (size - boxH) / 2;

    // Outer delicate neon border
    ctx.strokeStyle = themeColor;
    ctx.lineWidth = size * 0.012;
    roundRect(ctx, x, y, boxW, boxH, size * 0.12);
    ctx.stroke();

    // Corner tech tick marks
    const tickLen = size * 0.08;
    ctx.lineWidth = size * 0.024;
    ctx.strokeStyle = '#ffffff';
    ctx.lineCap = 'square';
    // top-left
    ctx.beginPath();
    ctx.moveTo(x + tickLen, y); ctx.lineTo(x, y); ctx.lineTo(x, y + tickLen);
    ctx.stroke();
    // top-right
    ctx.beginPath();
    ctx.moveTo(x + boxW - tickLen, y); ctx.lineTo(x + boxW, y); ctx.lineTo(x + boxW, y + tickLen);
    ctx.stroke();
    // bottom-right
    ctx.beginPath();
    ctx.moveTo(x + boxW - tickLen, y + boxH); ctx.lineTo(x + boxW, y + boxH); ctx.lineTo(x + boxW, y + boxH - tickLen);
    ctx.stroke();
    // bottom-left
    ctx.beginPath();
    ctx.moveTo(x + tickLen, y + boxH); ctx.lineTo(x, y + boxH); ctx.lineTo(x, y + boxH - tickLen);
    ctx.stroke();
  } else {
    // 'matrix-bracket' - Squared HUD Target Brackets
    const boxSize = size * 0.72;
    const half = boxSize / 2;
    const cornerLen = size * 0.16;

    ctx.strokeStyle = themeColor;
    ctx.lineWidth = size * 0.024;
    ctx.lineCap = 'round';

    // Top-Left
    ctx.beginPath();
    ctx.moveTo(cx - half, cy - half + cornerLen);
    ctx.lineTo(cx - half, cy - half);
    ctx.lineTo(cx - half + cornerLen, cy - half);
    ctx.stroke();

    // Top-Right
    ctx.beginPath();
    ctx.moveTo(cx + half - cornerLen, cy - half);
    ctx.lineTo(cx + half, cy - half);
    ctx.lineTo(cx + half, cy - half + cornerLen);
    ctx.stroke();

    // Bottom-Right
    ctx.beginPath();
    ctx.moveTo(cx + half, cy + half - cornerLen);
    ctx.lineTo(cx + half, cy + half);
    ctx.lineTo(cx + half - cornerLen, cy + half);
    ctx.stroke();

    // Bottom-Left
    ctx.beginPath();
    ctx.moveTo(cx - half + cornerLen, cy + half);
    ctx.lineTo(cx - half, cy + half);
    ctx.lineTo(cx - half, cy + half - cornerLen);
    ctx.stroke();

    // Sub-frame inside
    ctx.save();
    roundRect(ctx, cx - half * 0.8, cy - half * 0.8, boxSize * 0.8, boxSize * 0.8, size * 0.05);
    ctx.strokeStyle = secondaryColor;
    ctx.setLineDash([size * 0.03, size * 0.02]);
    ctx.lineWidth = size * 0.008;
    ctx.stroke();
    ctx.restore();
  }

  ctx.restore();

  // 3. Technical Decals & Indicators
  if (showTechDecals) {
    ctx.save();
    ctx.fillStyle = themeColor;
    ctx.font = `bold ${Math.round(size * 0.032)}px 'Share Tech Mono', monospace`;
    ctx.textAlign = 'left';
    ctx.fillText('MK-VII // STARK', size * 0.09, size * 0.13);

    ctx.textAlign = 'right';
    ctx.fillText('STATUS: ONLINE', size * 0.91, size * 0.13);

    // Battery / Power bar indicator top right
    const pX = size * 0.77;
    const pY = size * 0.145;
    ctx.strokeStyle = themeColor;
    ctx.lineWidth = 2;
    ctx.strokeRect(pX, pY, size * 0.14, size * 0.016);
    ctx.fillStyle = themeColor;
    ctx.fillRect(pX + 2, pY + 2, size * 0.11, size * 0.016 - 4);

    ctx.restore();
  }

  // 4. Center Content (Glyph or Pure Cyber Typography)
  ctx.save();
  const iconTargetSize = size * 0.32;

  if (frameStyle === 'text-only') {
    // Pure Typography Centerpiece
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Sub-title code
    ctx.font = `bold ${Math.round(size * 0.042)}px 'Share Tech Mono', monospace`;
    ctx.fillStyle = secondaryColor;
    ctx.fillText('// STARK // SYS //', cx, cy - size * 0.16);

    // Huge bold glowing App Name
    ctx.font = `900 ${Math.round(size * 0.115)}px 'Orbitron', sans-serif`;
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = themeColor;
    ctx.shadowBlur = 30 * glowIntensity;
    const mainTxt = (labelText || 'APP').toUpperCase();
    ctx.fillText(mainTxt, cx, cy);

    // Decorative cyber accent line
    ctx.strokeStyle = themeColor;
    ctx.lineWidth = size * 0.008;
    ctx.beginPath();
    ctx.moveTo(cx - size * 0.28, cy + size * 0.11);
    ctx.lineTo(cx + size * 0.28, cy + size * 0.11);
    ctx.stroke();

    // Bottom tech status
    ctx.font = `bold ${Math.round(size * 0.038)}px 'Share Tech Mono', monospace`;
    ctx.fillStyle = themeColor;
    ctx.fillText('PROTOCOL // ONLINE', cx, cy + size * 0.19);

  } else if (svgPathOrImg) {
    // If an image element or loaded image is passed
    if (svgPathOrImg instanceof HTMLImageElement || svgPathOrImg instanceof Image) {
      ctx.shadowColor = themeColor;
      ctx.shadowBlur = 24 * glowIntensity;
      ctx.drawImage(
        svgPathOrImg,
        cx - iconTargetSize / 2,
        cy - iconTargetSize / 2 - (showLabel ? size * 0.03 : 0),
        iconTargetSize,
        iconTargetSize
      );
    }
  } else if (iconGlyph) {
    // Custom vector glyph rendering function
    ctx.save();
    ctx.translate(cx, cy - (showLabel ? size * 0.03 : 0));
    ctx.strokeStyle = themeColor;
    ctx.fillStyle = themeColor;
    ctx.shadowColor = themeColor;
    ctx.shadowBlur = 25 * glowIntensity;
    ctx.lineWidth = size * 0.025;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    iconGlyph(ctx, iconTargetSize);
    ctx.restore();
  }

  ctx.restore();

  // 5. Tech Label (Only if not text-only mode)
  if (frameStyle !== 'text-only' && showLabel && labelText) {
    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = themeColor;
    ctx.shadowBlur = 10 * glowIntensity;
    ctx.font = `600 ${Math.round(size * 0.046)}px 'Orbitron', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.letterSpacing = '2px';

    const labelY = size * 0.83;
    ctx.fillText(labelText.toUpperCase(), cx, labelY);

    // Subtle tech brackets around label: [ LABEL ]
    ctx.strokeStyle = secondaryColor;
    ctx.lineWidth = size * 0.005;
    const textWidth = ctx.measureText(labelText.toUpperCase()).width;
    const pad = size * 0.03;

    // Left bracket
    ctx.beginPath();
    ctx.moveTo(cx - textWidth / 2 - pad + size * 0.015, labelY - size * 0.025);
    ctx.lineTo(cx - textWidth / 2 - pad, labelY - size * 0.025);
    ctx.lineTo(cx - textWidth / 2 - pad, labelY + size * 0.025);
    ctx.lineTo(cx - textWidth / 2 - pad + size * 0.015, labelY + size * 0.025);
    ctx.stroke();

    // Right bracket
    ctx.beginPath();
    ctx.moveTo(cx + textWidth / 2 + pad - size * 0.015, labelY - size * 0.025);
    ctx.lineTo(cx + textWidth / 2 + pad, labelY - size * 0.025);
    ctx.lineTo(cx + textWidth / 2 + pad, labelY + size * 0.025);
    ctx.lineTo(cx + textWidth / 2 + pad - size * 0.015, labelY + size * 0.025);
    ctx.stroke();

    ctx.restore();
  }
}

/**
 * Generate iOS .mobileconfig WebClip Profile
 * Enables 1-click home screen icon installation on iPhones and iPads!
 */
export function generateIosMobileConfig(iconsToExport, globalTheme = 'Stark Arc Cyan') {
  const uuid1 = '9C26685B-B7B4-4CD8-8B7C-' + Math.random().toString(16).substring(2, 14).toUpperCase();
  const uuid2 = 'A1D54F62-8E31-41C2-9E99-' + Math.random().toString(16).substring(2, 14).toUpperCase();

  // Create WebClip payloads for each icon
  let payloads = '';
  iconsToExport.forEach((item, index) => {
    const payloadUuid = '3D72B8C' + index + '-5E4A-4B61-9BCF-' + Math.random().toString(16).substring(2, 14).toUpperCase();
    const cleanBase64 = item.iconBase64 ? item.iconBase64.replace(/^data:image\/[a-z]+;base64,/, '') : '';

    payloads += `
    <dict>
      <key>PayloadType</key>
      <string>com.apple.webClip.managed</string>
      <key>PayloadVersion</key>
      <integer>1</integer>
      <key>PayloadIdentifier</key>
      <string>com.stark.jarvis.webclip.${item.id}</string>
      <key>PayloadUUID</key>
      <string>${payloadUuid}</string>
      <key>PayloadDisplayName</key>
      <string>${item.name}</string>
      <key>Label</key>
      <string>${item.defaultLabel || item.name}</string>
      <key>URL</key>
      <string>${item.iosScheme || 'https://stark-jarvis.internal'}</string>
      <key>IsRemovable</key>
      <true/>
      <key>FullScreen</key>
      <true/>
      ${cleanBase64 ? `<key>Icon</key><data>${cleanBase64}</data>` : ''}
    </dict>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>PayloadDisplayName</key>
  <string>J.A.R.V.I.S. HUD Icons Pack (${globalTheme})</string>
  <key>PayloadDescription</key>
  <string>Stark Industries J.A.R.V.I.S. High-Tech HUD Home Screen Theme for iOS &amp; iPadOS</string>
  <key>PayloadIdentifier</key>
  <string>com.stark.jarvis.theme</string>
  <key>PayloadOrganization</key>
  <string>Stark Industries / J.A.R.V.I.S.</string>
  <key>PayloadRemovalDisallowed</key>
  <false/>
  <key>PayloadType</key>
  <string>Configuration</string>
  <key>PayloadUUID</key>
  <string>${uuid1}</string>
  <key>PayloadVersion</key>
  <integer>1</integer>
  <key>PayloadContent</key>
  <array>
    ${payloads}
  </array>
</dict>
</plist>`;
}

/**
 * Batch generate and package all icons into a .ZIP archive
 */
export async function downloadAllIconsZip(iconsList, renderFunction, onProgress) {
  const zip = new JSZip();
  const folder = zip.folder('JARVIS_HUD_ICONS_1024x1024');

  const total = iconsList.length;
  for (let i = 0; i < total; i++) {
    const item = iconsList[i];
    if (onProgress) {
      onProgress(Math.round(((i + 1) / total) * 100), item.name);
    }
    const dataUrl = await renderFunction(item);
    if (dataUrl) {
      const base64 = dataUrl.replace(/^data:image\/png;base64,/, '');
      folder.file(`JARVIS_${item.id.toUpperCase()}_1024.png`, base64, { base64: true });
    }
  }

  const blob = await zip.generateAsync({ type: 'blob' });
  const downloadUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = `JARVIS-MarkVII-Icons-Pack-${Date.now()}.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(downloadUrl);
}
