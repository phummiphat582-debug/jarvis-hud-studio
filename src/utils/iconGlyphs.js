// Procedural Sci-Fi Vector Glyphs for Canvas 2D Drawing
// Each glyph is rendered relative to (0, 0) within a given bounding box size

export const GLYPH_RENDERERS = {
  // LINE Messenger
  MessageSquareShare: (ctx, s) => {
    const r = s * 0.45;
    ctx.beginPath();
    ctx.arc(0, -s * 0.04, r, 0, Math.PI * 2);
    ctx.stroke();
    // Chat tail
    ctx.beginPath();
    ctx.moveTo(-r * 0.5, r * 0.6);
    ctx.lineTo(-r * 0.8, r * 1.0);
    ctx.lineTo(-r * 0.1, r * 0.85);
    ctx.stroke();
    // Inner "L" or chat bubble dots
    ctx.beginPath();
    ctx.arc(-r * 0.35, -s * 0.04, s * 0.04, 0, Math.PI * 2);
    ctx.arc(0, -s * 0.04, s * 0.04, 0, Math.PI * 2);
    ctx.arc(r * 0.35, -s * 0.04, s * 0.04, 0, Math.PI * 2);
    ctx.fill();
  },

  // Facebook
  Facebook: (ctx, s) => {
    const h = s * 0.5;
    ctx.beginPath();
    ctx.moveTo(s * 0.1, -h);
    ctx.lineTo(-s * 0.05, -h);
    ctx.arcTo(-s * 0.25, -h, -s * 0.25, -h * 0.4, s * 0.2);
    ctx.lineTo(-s * 0.25, h);
    ctx.stroke();
    // Crossbar
    ctx.beginPath();
    ctx.moveTo(-s * 0.4, -s * 0.05);
    ctx.lineTo(s * 0.2, -s * 0.05);
    ctx.stroke();
  },

  // Messenger
  MessageCircle: (ctx, s) => {
    const r = s * 0.45;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.stroke();
    // Lightning bolt in middle
    ctx.beginPath();
    ctx.moveTo(-r * 0.45, r * 0.1);
    ctx.lineTo(-r * 0.05, -r * 0.25);
    ctx.lineTo(r * 0.1, -r * 0.05);
    ctx.lineTo(r * 0.45, -r * 0.25);
    ctx.lineTo(r * 0.05, r * 0.25);
    ctx.lineTo(-r * 0.1, r * 0.05);
    ctx.closePath();
    ctx.fill();
  },

  // Instagram
  Instagram: (ctx, s) => {
    const h = s * 0.42;
    // Rounded camera body
    ctx.beginPath();
    ctx.roundRect(-h, -h, h * 2, h * 2, s * 0.18);
    ctx.stroke();
    // Lens circle
    ctx.beginPath();
    ctx.arc(0, 0, h * 0.48, 0, Math.PI * 2);
    ctx.stroke();
    // Flash dot
    ctx.beginPath();
    ctx.arc(h * 0.55, -h * 0.55, s * 0.04, 0, Math.PI * 2);
    ctx.fill();
  },

  // TikTok (Flame / Cyber Note)
  Flame: (ctx, s) => {
    const h = s * 0.45;
    ctx.beginPath();
    // Stylized musical note with cyber hooks
    ctx.moveTo(-s * 0.1, h * 0.6);
    ctx.arc(-s * 0.2, h * 0.6, s * 0.14, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-s * 0.06, h * 0.6);
    ctx.lineTo(-s * 0.06, -h * 0.7);
    ctx.quadraticCurveTo(s * 0.25, -h * 0.7, s * 0.35, -h * 0.15);
    ctx.stroke();
  },

  // X (Twitter)
  Radio: (ctx, s) => {
    const h = s * 0.42;
    // Stylized high-tech X
    ctx.beginPath();
    ctx.moveTo(-h, -h);
    ctx.lineTo(h, h);
    ctx.moveTo(h, -h);
    ctx.lineTo(-h, h);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, s * 0.1, 0, Math.PI * 2);
    ctx.fill();
  },

  // Discord (Headphones)
  Headphones: (ctx, s) => {
    const r = s * 0.38;
    ctx.beginPath();
    ctx.arc(0, -s * 0.05, r, Math.PI, 0, false);
    ctx.stroke();
    // Left & right ear pads
    ctx.beginPath();
    ctx.roundRect(-r - s * 0.06, -s * 0.08, s * 0.12, s * 0.35, s * 0.04);
    ctx.roundRect(r - s * 0.06, -s * 0.08, s * 0.12, s * 0.35, s * 0.04);
    ctx.fill();
  },

  // Telegram (Paper plane / Send)
  Send: (ctx, s) => {
    const h = s * 0.42;
    ctx.beginPath();
    ctx.moveTo(-h, 0);
    ctx.lineTo(h, -h * 0.8);
    ctx.lineTo(0, h * 0.8);
    ctx.lineTo(-h * 0.2, h * 0.1);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-h * 0.2, h * 0.1);
    ctx.lineTo(h, -h * 0.8);
    ctx.stroke();
  },

  // WhatsApp
  PhoneCall: (ctx, s) => {
    const r = s * 0.42;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.stroke();
    // Receiver curve
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.6, -Math.PI * 0.2, Math.PI * 0.6);
    ctx.stroke();
  },

  // Threads
  AtSign: (ctx, s) => {
    const r = s * 0.4;
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.45, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, r, 0.2, Math.PI * 1.85);
    ctx.stroke();
  },

  // YouTube
  Youtube: (ctx, s) => {
    const w = s * 0.48;
    const h = s * 0.35;
    ctx.beginPath();
    ctx.roundRect(-w, -h, w * 2, h * 2, s * 0.12);
    ctx.stroke();
    // Play triangle
    ctx.beginPath();
    ctx.moveTo(-w * 0.25, -h * 0.5);
    ctx.lineTo(w * 0.35, 0);
    ctx.lineTo(-w * 0.25, h * 0.5);
    ctx.closePath();
    ctx.fill();
  },

  // Spotify (Music Waves)
  Music: (ctx, s) => {
    const r = s * 0.44;
    // 3 Curved Soundwaves
    [-0.18, 0.05, 0.28].forEach((offsetY, idx) => {
      const radius = r * (0.8 - idx * 0.18);
      ctx.beginPath();
      ctx.arc(0, s * offsetY + radius * 0.3, radius, -Math.PI * 0.75, -Math.PI * 0.25);
      ctx.stroke();
    });
  },

  // Apple Music (Disc)
  Disc: (ctx, s) => {
    const r = s * 0.42;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.4, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.12, 0, Math.PI * 2);
    ctx.fill();
  },

  // Netflix (TV)
  Tv: (ctx, s) => {
    const w = s * 0.45;
    const h = s * 0.32;
    ctx.beginPath();
    ctx.roundRect(-w, -h + s * 0.05, w * 2, h * 2, s * 0.08);
    ctx.stroke();
    // Antenna
    ctx.beginPath();
    ctx.moveTo(-w * 0.5, -h - s * 0.1);
    ctx.lineTo(0, -h + s * 0.05);
    ctx.lineTo(w * 0.5, -h - s * 0.1);
    ctx.stroke();
    // Stylized "N" inside
    ctx.beginPath();
    ctx.moveTo(-w * 0.35, h * 0.6);
    ctx.lineTo(-w * 0.35, -h * 0.4);
    ctx.lineTo(w * 0.35, h * 0.6);
    ctx.lineTo(w * 0.35, -h * 0.4);
    ctx.stroke();
  },

  // Disney+ (Sparkles)
  Sparkles: (ctx, s) => {
    const r = s * 0.42;
    // 4-point star
    ctx.beginPath();
    ctx.moveTo(0, -r);
    ctx.quadraticCurveTo(0, 0, r, 0);
    ctx.quadraticCurveTo(0, 0, 0, r);
    ctx.quadraticCurveTo(0, 0, -r, 0);
    ctx.quadraticCurveTo(0, 0, 0, -r);
    ctx.closePath();
    ctx.fill();
    // Mini sparkle
    ctx.beginPath();
    ctx.arc(r * 0.6, -r * 0.6, s * 0.06, 0, Math.PI * 2);
    ctx.fill();
  },

  // Twitch (Gamepad2)
  Gamepad2: (ctx, s) => {
    const w = s * 0.46;
    const h = s * 0.3;
    ctx.beginPath();
    ctx.roundRect(-w, -h, w * 2, h * 2, s * 0.12);
    ctx.stroke();
    // D-Pad cross
    ctx.beginPath();
    ctx.moveTo(-w * 0.55, -h * 0.25);
    ctx.lineTo(-w * 0.55, h * 0.25);
    ctx.moveTo(-w * 0.7, 0);
    ctx.lineTo(-w * 0.4, 0);
    ctx.stroke();
    // Action buttons
    ctx.beginPath();
    ctx.arc(w * 0.55, -h * 0.15, s * 0.04, 0, Math.PI * 2);
    ctx.arc(w * 0.4, h * 0.15, s * 0.04, 0, Math.PI * 2);
    ctx.fill();
  },

  // Camera
  Camera: (ctx, s) => {
    const w = s * 0.45;
    const h = s * 0.32;
    ctx.beginPath();
    ctx.roundRect(-w, -h + s * 0.06, w * 2, h * 2, s * 0.08);
    ctx.stroke();
    // Top bump
    ctx.beginPath();
    ctx.moveTo(-w * 0.35, -h + s * 0.06);
    ctx.lineTo(-w * 0.2, -h - s * 0.04);
    ctx.lineTo(w * 0.2, -h - s * 0.04);
    ctx.lineTo(w * 0.35, -h + s * 0.06);
    ctx.stroke();
    // Lens
    ctx.beginPath();
    ctx.arc(0, s * 0.06, h * 0.5, 0, Math.PI * 2);
    ctx.stroke();
  },

  // Photos (Image)
  Image: (ctx, s) => {
    const h = s * 0.4;
    ctx.beginPath();
    ctx.roundRect(-h, -h, h * 2, h * 2, s * 0.08);
    ctx.stroke();
    // Sun
    ctx.beginPath();
    ctx.arc(h * 0.4, -h * 0.4, s * 0.06, 0, Math.PI * 2);
    ctx.fill();
    // Mountains
    ctx.beginPath();
    ctx.moveTo(-h, h * 0.5);
    ctx.lineTo(-h * 0.3, -h * 0.1);
    ctx.lineTo(h * 0.2, h * 0.4);
    ctx.lineTo(h * 0.5, 0);
    ctx.lineTo(h, h * 0.5);
    ctx.stroke();
  },

  // Browser / Safari (Compass)
  Compass: (ctx, s) => {
    const r = s * 0.42;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.stroke();
    // Needle diamond
    ctx.beginPath();
    ctx.moveTo(0, -r * 0.75);
    ctx.lineTo(r * 0.3, 0);
    ctx.lineTo(0, r * 0.75);
    ctx.lineTo(-r * 0.3, 0);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, -r * 0.75);
    ctx.lineTo(r * 0.3, 0);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fill();
  },

  // Chrome (Globe)
  Globe: (ctx, s) => {
    const r = s * 0.42;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.stroke();
    // Equator and meridian
    ctx.beginPath();
    ctx.moveTo(-r, 0);
    ctx.lineTo(r, 0);
    ctx.moveTo(0, -r);
    ctx.lineTo(0, r);
    ctx.stroke();
    // Elliptical curves
    ctx.beginPath();
    ctx.ellipse(0, 0, r * 0.5, r, 0, 0, Math.PI * 2);
    ctx.stroke();
  },

  // Settings
  Settings: (ctx, s) => {
    const rOuter = s * 0.42;
    const rInner = s * 0.32;
    const teeth = 8;
    ctx.beginPath();
    for (let i = 0; i < teeth; i++) {
      const a1 = (i * 2 * Math.PI) / teeth;
      const a2 = a1 + (Math.PI / teeth) * 0.5;
      const a3 = a1 + (Math.PI / teeth);
      ctx.lineTo(rOuter * Math.cos(a1), rOuter * Math.sin(a1));
      ctx.lineTo(rOuter * Math.cos(a2), rOuter * Math.sin(a2));
      ctx.lineTo(rInner * Math.cos(a2), rInner * Math.sin(a2));
      ctx.lineTo(rInner * Math.cos(a3), rInner * Math.sin(a3));
    }
    ctx.closePath();
    ctx.stroke();
    // Hole
    ctx.beginPath();
    ctx.arc(0, 0, s * 0.15, 0, Math.PI * 2);
    ctx.stroke();
  },

  // Phone
  Phone: (ctx, s) => {
    const r = s * 0.38;
    ctx.save();
    ctx.rotate(-Math.PI * 0.15);
    ctx.beginPath();
    ctx.roundRect(-r * 0.6, -r, r * 1.2, r * 2, s * 0.1);
    ctx.stroke();
    // Speaker & Home dot
    ctx.beginPath();
    ctx.moveTo(-r * 0.25, -r * 0.7);
    ctx.lineTo(r * 0.25, -r * 0.7);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, r * 0.7, s * 0.04, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },

  // Messages (MessageSquare)
  MessageSquare: (ctx, s) => {
    const w = s * 0.42;
    const h = s * 0.34;
    ctx.beginPath();
    ctx.roundRect(-w, -h, w * 2, h * 2, s * 0.08);
    ctx.stroke();
    // Tail
    ctx.beginPath();
    ctx.moveTo(-w * 0.4, h);
    ctx.lineTo(-w * 0.7, h + s * 0.15);
    ctx.lineTo(-w * 0.1, h);
    ctx.stroke();
  },

  // Maps (MapPin)
  MapPin: (ctx, s) => {
    const r = s * 0.24;
    ctx.beginPath();
    ctx.arc(0, -s * 0.12, r, Math.PI * 0.75, Math.PI * 0.25, true);
    ctx.lineTo(0, s * 0.38);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, -s * 0.12, r * 0.4, 0, Math.PI * 2);
    ctx.fill();
  },

  // Calendar
  Calendar: (ctx, s) => {
    const w = s * 0.4;
    const h = s * 0.36;
    ctx.beginPath();
    ctx.roundRect(-w, -h + s * 0.08, w * 2, h * 2, s * 0.08);
    ctx.stroke();
    // Hooks
    ctx.beginPath();
    ctx.moveTo(-w * 0.5, -h);
    ctx.lineTo(-w * 0.5, -h + s * 0.12);
    ctx.moveTo(w * 0.5, -h);
    ctx.lineTo(w * 0.5, -h + s * 0.12);
    ctx.stroke();
    // Top separator
    ctx.beginPath();
    ctx.moveTo(-w, -h + s * 0.25);
    ctx.lineTo(w, -h + s * 0.25);
    ctx.stroke();
    // Grid dots
    ctx.beginPath();
    ctx.arc(0, 0, s * 0.03, 0, Math.PI * 2);
    ctx.arc(w * 0.45, 0, s * 0.03, 0, Math.PI * 2);
    ctx.arc(-w * 0.45, 0, s * 0.03, 0, Math.PI * 2);
    ctx.arc(0, h * 0.5, s * 0.03, 0, Math.PI * 2);
    ctx.fill();
  },

  // Clock
  Clock: (ctx, s) => {
    const r = s * 0.42;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.stroke();
    // Hands
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -r * 0.65); // Minute hand
    ctx.moveTo(0, 0);
    ctx.lineTo(r * 0.45, 0); // Hour hand
    ctx.stroke();
    // Center dot
    ctx.beginPath();
    ctx.arc(0, 0, s * 0.03, 0, Math.PI * 2);
    ctx.fill();
  },

  // Calculator
  Calculator: (ctx, s) => {
    const w = s * 0.38;
    const h = s * 0.46;
    ctx.beginPath();
    ctx.roundRect(-w, -h, w * 2, h * 2, s * 0.08);
    ctx.stroke();
    // Display screen
    ctx.beginPath();
    ctx.rect(-w * 0.75, -h * 0.75, w * 1.5, h * 0.35);
    ctx.stroke();
    // Grid keys
    [-0.1, 0.25, 0.6].forEach(rowY => {
      [-0.5, 0, 0.5].forEach(colX => {
        ctx.beginPath();
        ctx.arc(w * colX, h * rowY, s * 0.04, 0, Math.PI * 2);
        ctx.fill();
      });
    });
  },

  // Notes (FileText)
  FileText: (ctx, s) => {
    const w = s * 0.36;
    const h = s * 0.46;
    ctx.beginPath();
    ctx.moveTo(-w, -h);
    ctx.lineTo(w * 0.4, -h);
    ctx.lineTo(w, -h + w * 0.6);
    ctx.lineTo(w, h);
    ctx.lineTo(-w, h);
    ctx.closePath();
    ctx.stroke();
    // Lines of text
    [-0.2, 0.1, 0.4].forEach(y => {
      ctx.beginPath();
      ctx.moveTo(-w * 0.6, h * y);
      ctx.lineTo(w * 0.6, h * y);
      ctx.stroke();
    });
  },

  // Files (FolderArchive)
  FolderArchive: (ctx, s) => {
    const w = s * 0.46;
    const h = s * 0.34;
    ctx.beginPath();
    ctx.moveTo(-w, -h + s * 0.08);
    ctx.lineTo(-w * 0.3, -h + s * 0.08);
    ctx.lineTo(-w * 0.1, -h);
    ctx.lineTo(w, -h);
    ctx.lineTo(w, h);
    ctx.lineTo(-w, h);
    ctx.closePath();
    ctx.stroke();
  },

  // App Store / Shopping
  ShoppingBag: (ctx, s) => {
    const w = s * 0.38;
    const h = s * 0.4;
    ctx.beginPath();
    ctx.roundRect(-w, -h + s * 0.15, w * 2, h * 1.8, s * 0.06);
    ctx.stroke();
    // Handle
    ctx.beginPath();
    ctx.arc(0, -h + s * 0.15, w * 0.5, Math.PI, 0, false);
    ctx.stroke();
  },

  // Security Vault / K PLUS (ShieldCheck)
  ShieldCheck: (ctx, s) => {
    const w = s * 0.42;
    const h = s * 0.46;
    ctx.beginPath();
    ctx.moveTo(0, -h);
    ctx.lineTo(w, -h * 0.5);
    ctx.lineTo(w, h * 0.1);
    ctx.quadraticCurveTo(w * 0.7, h * 0.8, 0, h);
    ctx.quadraticCurveTo(-w * 0.7, h * 0.8, -w, h * 0.1);
    ctx.lineTo(-w, -h * 0.5);
    ctx.closePath();
    ctx.stroke();
    // Check mark
    ctx.beginPath();
    ctx.moveTo(-w * 0.4, 0);
    ctx.lineTo(-w * 0.1, h * 0.3);
    ctx.lineTo(w * 0.4, -h * 0.2);
    ctx.stroke();
  },

  // Credit Card / SCB (CreditCard)
  CreditCard: (ctx, s) => {
    const w = s * 0.46;
    const h = s * 0.32;
    ctx.beginPath();
    ctx.roundRect(-w, -h, w * 2, h * 2, s * 0.06);
    ctx.stroke();
    // Chip
    ctx.beginPath();
    ctx.rect(-w * 0.7, -h * 0.3, w * 0.4, h * 0.5);
    ctx.stroke();
  },

  // Bank / Krungthai (Building2)
  Building2: (ctx, s) => {
    const w = s * 0.44;
    const h = s * 0.42;
    // Pediment roof
    ctx.beginPath();
    ctx.moveTo(-w, -h * 0.4);
    ctx.lineTo(0, -h);
    ctx.lineTo(w, -h * 0.4);
    ctx.closePath();
    ctx.stroke();
    // Columns
    [-0.6, -0.2, 0.2, 0.6].forEach(x => {
      ctx.beginPath();
      ctx.moveTo(w * x, -h * 0.35);
      ctx.lineTo(w * x, h * 0.7);
      ctx.stroke();
    });
    // Base
    ctx.beginPath();
    ctx.rect(-w, h * 0.7, w * 2, h * 0.25);
    ctx.stroke();
  },

  // Wallet / TrueMoney
  Wallet: (ctx, s) => {
    const w = s * 0.45;
    const h = s * 0.34;
    ctx.beginPath();
    ctx.roundRect(-w, -h, w * 2, h * 2, s * 0.08);
    ctx.stroke();
    // Flap
    ctx.beginPath();
    ctx.roundRect(w * 0.2, -h * 0.4, w * 0.8, h * 0.8, s * 0.04);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(w * 0.6, 0, s * 0.04, 0, Math.PI * 2);
    ctx.fill();
  },

  // Crypto / Binance (Coins)
  Coins: (ctx, s) => {
    const r = s * 0.34;
    ctx.beginPath();
    ctx.arc(-s * 0.1, -s * 0.1, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(s * 0.1, s * 0.1, r, 0, Math.PI * 2);
    ctx.stroke();
    // Inner symbol
    ctx.beginPath();
    ctx.moveTo(s * 0.1, -s * 0.05);
    ctx.lineTo(s * 0.1, s * 0.25);
    ctx.stroke();
  },

  // Package / Logistics / Lazada
  Package: (ctx, s) => {
    const w = s * 0.42;
    const h = s * 0.42;
    ctx.beginPath();
    // Cube isometric
    ctx.moveTo(0, -h);
    ctx.lineTo(w, -h * 0.45);
    ctx.lineTo(w, h * 0.45);
    ctx.lineTo(0, h);
    ctx.lineTo(-w, h * 0.45);
    ctx.lineTo(-w, -h * 0.45);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, h);
    ctx.moveTo(0, 0);
    ctx.lineTo(w, -h * 0.45);
    ctx.moveTo(0, 0);
    ctx.lineTo(-w, -h * 0.45);
    ctx.stroke();
  },

  // ChatGPT / AI (Bot)
  Bot: (ctx, s) => {
    const w = s * 0.38;
    const h = s * 0.34;
    // Antenna
    ctx.beginPath();
    ctx.moveTo(0, -h);
    ctx.lineTo(0, -h - s * 0.12);
    ctx.arc(0, -h - s * 0.15, s * 0.04, 0, Math.PI * 2);
    ctx.stroke();
    // Head
    ctx.beginPath();
    ctx.roundRect(-w, -h, w * 2, h * 2, s * 0.1);
    ctx.stroke();
    // Eyes
    ctx.beginPath();
    ctx.arc(-w * 0.45, 0, s * 0.06, 0, Math.PI * 2);
    ctx.arc(w * 0.45, 0, s * 0.06, 0, Math.PI * 2);
    ctx.fill();
    // Mouth
    ctx.beginPath();
    ctx.moveTo(-w * 0.4, h * 0.55);
    ctx.lineTo(w * 0.4, h * 0.55);
    ctx.stroke();
  },

  // Gmail (Mail)
  Mail: (ctx, s) => {
    const w = s * 0.45;
    const h = s * 0.32;
    ctx.beginPath();
    ctx.roundRect(-w, -h, w * 2, h * 2, s * 0.06);
    ctx.stroke();
    // Flap
    ctx.beginPath();
    ctx.moveTo(-w, -h);
    ctx.lineTo(0, h * 0.2);
    ctx.lineTo(w, -h);
    ctx.stroke();
  },

  // Google Drive (HardDrive / Triangular Shield)
  HardDrive: (ctx, s) => {
    const r = s * 0.44;
    // Delta triangle
    ctx.beginPath();
    ctx.moveTo(0, -r);
    ctx.lineTo(r * 0.9, r * 0.7);
    ctx.lineTo(-r * 0.9, r * 0.7);
    ctx.closePath();
    ctx.stroke();
    // Inner triangle
    ctx.beginPath();
    ctx.moveTo(0, -r * 0.3);
    ctx.lineTo(r * 0.4, r * 0.4);
    ctx.lineTo(-r * 0.4, r * 0.4);
    ctx.closePath();
    ctx.stroke();
  },

  // Notion (BookOpen)
  BookOpen: (ctx, s) => {
    const w = s * 0.44;
    const h = s * 0.38;
    ctx.beginPath();
    ctx.moveTo(0, -h * 0.4);
    ctx.quadraticCurveTo(-w * 0.5, -h * 0.9, -w, -h * 0.6);
    ctx.lineTo(-w, h * 0.7);
    ctx.quadraticCurveTo(-w * 0.5, h * 0.4, 0, h * 0.8);
    ctx.quadraticCurveTo(w * 0.5, h * 0.4, w, h * 0.7);
    ctx.lineTo(w, -h * 0.6);
    ctx.quadraticCurveTo(w * 0.5, -h * 0.9, 0, -h * 0.4);
    ctx.lineTo(0, h * 0.8);
    ctx.stroke();
  },

  // Slack (Hash)
  Hash: (ctx, s) => {
    const h = s * 0.4;
    ctx.beginPath();
    ctx.moveTo(-h * 0.3, -h);
    ctx.lineTo(-h * 0.4, h);
    ctx.moveTo(h * 0.4, -h);
    ctx.lineTo(h * 0.3, h);
    ctx.moveTo(-h, -h * 0.3);
    ctx.lineTo(h, -h * 0.3);
    ctx.moveTo(-h, h * 0.3);
    ctx.lineTo(h, h * 0.3);
    ctx.stroke();
  },

  // Canva (Palette)
  Palette: (ctx, s) => {
    const r = s * 0.42;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.stroke();
    // Color dots
    [-0.4, 0, 0.4].forEach(deg => {
      ctx.beginPath();
      ctx.arc(r * 0.5 * Math.cos(deg), r * 0.5 * Math.sin(deg), s * 0.04, 0, Math.PI * 2);
      ctx.fill();
    });
  },

  // GitHub (Code2)
  Code2: (ctx, s) => {
    const h = s * 0.4;
    ctx.beginPath();
    ctx.moveTo(-h * 0.3, -h * 0.6);
    ctx.lineTo(-h * 0.8, 0);
    ctx.lineTo(-h * 0.3, h * 0.6);
    ctx.moveTo(h * 0.3, -h * 0.6);
    ctx.lineTo(h * 0.8, 0);
    ctx.lineTo(h * 0.3, h * 0.6);
    ctx.stroke();
  },

  // Health (Activity / Heartbeat)
  Activity: (ctx, s) => {
    const w = s * 0.45;
    ctx.beginPath();
    ctx.moveTo(-w, 0);
    ctx.lineTo(-w * 0.5, 0);
    ctx.lineTo(-w * 0.3, -s * 0.3);
    ctx.lineTo(-w * 0.05, s * 0.35);
    ctx.lineTo(w * 0.2, -s * 0.2);
    ctx.lineTo(w * 0.35, 0);
    ctx.lineTo(w, 0);
    ctx.stroke();
  },

  // Weather (CloudSun)
  CloudSun: (ctx, s) => {
    const r = s * 0.32;
    // Sun rays
    ctx.beginPath();
    ctx.arc(r * 0.4, -r * 0.4, r * 0.45, 0, Math.PI * 2);
    ctx.stroke();
    // Cloud front
    ctx.beginPath();
    ctx.arc(-r * 0.3, r * 0.2, r * 0.45, 0, Math.PI * 2);
    ctx.arc(r * 0.3, r * 0.25, r * 0.35, 0, Math.PI * 2);
    ctx.stroke();
  },

  // LINE MAN (Bike / Transport)
  Bike: (ctx, s) => {
    const r = s * 0.2;
    ctx.beginPath();
    ctx.arc(-s * 0.25, s * 0.15, r, 0, Math.PI * 2);
    ctx.arc(s * 0.25, s * 0.15, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-s * 0.25, s * 0.15);
    ctx.lineTo(0, -s * 0.15);
    ctx.lineTo(s * 0.25, s * 0.15);
    ctx.moveTo(0, -s * 0.15);
    ctx.lineTo(-s * 0.1, -s * 0.25);
    ctx.stroke();
  },

  // Grab (Car)
  Car: (ctx, s) => {
    const w = s * 0.45;
    const h = s * 0.28;
    ctx.beginPath();
    ctx.moveTo(-w, h * 0.3);
    ctx.lineTo(-w * 0.6, -h * 0.7);
    ctx.lineTo(w * 0.6, -h * 0.7);
    ctx.lineTo(w, h * 0.3);
    ctx.lineTo(w, h * 0.7);
    ctx.lineTo(-w, h * 0.7);
    ctx.closePath();
    ctx.stroke();
    // Wheels
    ctx.beginPath();
    ctx.arc(-w * 0.5, h * 0.7, s * 0.08, 0, Math.PI * 2);
    ctx.arc(w * 0.5, h * 0.7, s * 0.08, 0, Math.PI * 2);
    ctx.fill();
  }
};
