// J.A.R.V.I.S. High-Tech App Library Database
// Contains 50+ major apps across iOS and Android with tech codes and direct URL schemes

export const APP_CATEGORIES = [
  { id: 'all', label: 'ทั้งหมด (All Apps)' },
  { id: 'social', label: 'โซเชียล & แชท (Social & Chat)' },
  { id: 'media', label: 'บันเทิง & สตรีม (Media & Stream)' },
  { id: 'system', label: 'ระบบ & เครื่องมือ (System & Tools)' },
  { id: 'finance', label: 'การเงิน & ช้อปปิ้ง (Finance & Shop)' },
  { id: 'work', label: 'ทำงาน & AI (Work & AI)' },
  { id: 'lifestyle', label: 'ไลฟ์สไตล์ (Lifestyle)' }
];

export const APPS_DATA = [
  // --- Social & Chat ---
  {
    id: 'line',
    name: 'LINE',
    category: 'social',
    techCode: 'COMM.LINE//01',
    description: 'Encrypted Neural Communication',
    iconName: 'MessageSquareShare',
    defaultColor: '#00ff88',
    iosScheme: 'line://',
    defaultLabel: 'LINE'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    category: 'social',
    techCode: 'SOC.FEED//FB',
    description: 'Global Social Grid Link',
    iconName: 'Facebook',
    defaultColor: '#00a2ff',
    iosScheme: 'fb://',
    defaultLabel: 'FACEBOOK'
  },
  {
    id: 'messenger',
    name: 'Messenger',
    category: 'social',
    techCode: 'MSG.SYNC//02',
    description: 'Direct Telemetry Messaging',
    iconName: 'MessageCircle',
    defaultColor: '#00c3ff',
    iosScheme: 'fb-messenger://',
    defaultLabel: 'MESSENGER'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    category: 'social',
    techCode: 'VIS.FEED//IG',
    description: 'Holographic Visual Stream',
    iconName: 'Instagram',
    defaultColor: '#ff007f',
    iosScheme: 'instagram://',
    defaultLabel: 'INSTAGRAM'
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    category: 'social',
    techCode: 'VID.PULSE//TT',
    description: 'Shortwave Neural Stream',
    iconName: 'Flame',
    defaultColor: '#00f0ff',
    iosScheme: 'tiktok://',
    defaultLabel: 'TIKTOK'
  },
  {
    id: 'x-twitter',
    name: 'X (Twitter)',
    category: 'social',
    techCode: 'SATELLITE//X',
    description: 'Global Transmission Feed',
    iconName: 'Radio',
    defaultColor: '#e0f2fe',
    iosScheme: 'twitter://',
    defaultLabel: 'X // TWITTER'
  },
  {
    id: 'discord',
    name: 'Discord',
    category: 'social',
    techCode: 'AUDIO.VOX//DSC',
    description: 'Sub-space Voice Frequency',
    iconName: 'Headphones',
    defaultColor: '#7289da',
    iosScheme: 'discord://',
    defaultLabel: 'DISCORD'
  },
  {
    id: 'telegram',
    name: 'Telegram',
    category: 'social',
    techCode: 'CIPHER//TG',
    description: 'Quantum Encrypted Relay',
    iconName: 'Send',
    defaultColor: '#26a5e4',
    iosScheme: 'tg://',
    defaultLabel: 'TELEGRAM'
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    category: 'social',
    techCode: 'COMM.SEC//WA',
    description: 'P2P Encrypted Carrier',
    iconName: 'PhoneCall',
    defaultColor: '#25d366',
    iosScheme: 'whatsapp://',
    defaultLabel: 'WHATSAPP'
  },
  {
    id: 'threads',
    name: 'Threads',
    category: 'social',
    techCode: 'MATRIX.TH//07',
    description: 'Connected Thread Matrix',
    iconName: 'AtSign',
    defaultColor: '#f1f5f9',
    iosScheme: 'threads://',
    defaultLabel: 'THREADS'
  },

  // --- Media & Stream ---
  {
    id: 'youtube',
    name: 'YouTube',
    category: 'media',
    techCode: 'REACTOR.MEDIA//YT',
    description: 'Quantum Video Core',
    iconName: 'Youtube',
    defaultColor: '#ff0033',
    iosScheme: 'youtube://',
    defaultLabel: 'YOUTUBE'
  },
  {
    id: 'spotify',
    name: 'Spotify',
    category: 'media',
    techCode: 'SONIC.CORE//SPT',
    description: 'Sonic Acoustic Resonance',
    iconName: 'Music',
    defaultColor: '#1db954',
    iosScheme: 'spotify://',
    defaultLabel: 'SPOTIFY'
  },
  {
    id: 'apple-music',
    name: 'Apple Music',
    category: 'media',
    techCode: 'HARMONIC//AM',
    description: 'Lossless Audio Array',
    iconName: 'Disc',
    defaultColor: '#fa2d48',
    iosScheme: 'music://',
    defaultLabel: 'MUSIC'
  },
  {
    id: 'netflix',
    name: 'Netflix',
    category: 'media',
    techCode: 'CINEMA.OPT//NFLX',
    description: 'Orbital Cinema Projection',
    iconName: 'Tv',
    defaultColor: '#e50914',
    iosScheme: 'nflx://',
    defaultLabel: 'NETFLIX'
  },
  {
    id: 'disney',
    name: 'Disney+',
    category: 'media',
    techCode: 'DIMENSION//DIS',
    description: 'Multi-Universe Stream',
    iconName: 'Sparkles',
    defaultColor: '#0063e5',
    iosScheme: 'disneyplus://',
    defaultLabel: 'DISNEY+'
  },
  {
    id: 'twitch',
    name: 'Twitch',
    category: 'media',
    techCode: 'BROADCAST//TWC',
    description: 'Live Synaptic Telecast',
    iconName: 'Gamepad2',
    defaultColor: '#9146ff',
    iosScheme: 'twitch://',
    defaultLabel: 'TWITCH'
  },
  {
    id: 'podcast',
    name: 'Podcasts',
    category: 'media',
    techCode: 'TRANSMIT//POD',
    description: 'Sub-Frequency Archives',
    iconName: 'Mic',
    defaultColor: '#b150e2',
    iosScheme: 'podcasts://',
    defaultLabel: 'PODCAST'
  },

  // --- System & Tools ---
  {
    id: 'camera',
    name: 'Camera (กล้อง)',
    category: 'system',
    techCode: 'OPTICAL.SENSOR//01',
    description: 'High-Res Optical Scanner',
    iconName: 'Camera',
    defaultColor: '#00f0ff',
    iosScheme: 'camera:',
    defaultLabel: 'CAMERA'
  },
  {
    id: 'photos',
    name: 'Photos (รูปภาพ)',
    category: 'system',
    techCode: 'HOLO.ARCHIVE//IMG',
    description: 'Visual Data Archive',
    iconName: 'Image',
    defaultColor: '#ffb703',
    iosScheme: 'photos-redirect://',
    defaultLabel: 'PHOTOS'
  },
  {
    id: 'safari',
    name: 'Safari / Browser',
    category: 'system',
    techCode: 'NEURAL.NET//WEB',
    description: 'Global Cyber Matrix Navigator',
    iconName: 'Compass',
    defaultColor: '#00f0ff',
    iosScheme: 'http://',
    defaultLabel: 'BROWSER'
  },
  {
    id: 'chrome',
    name: 'Google Chrome',
    category: 'system',
    techCode: 'QUANTUM.NAV//GC',
    description: 'High-Speed Grid Gateway',
    iconName: 'Globe',
    defaultColor: '#ffaa00',
    iosScheme: 'googlechrome://',
    defaultLabel: 'CHROME'
  },
  {
    id: 'settings',
    name: 'Settings (ตั้งค่า)',
    category: 'system',
    techCode: 'STARK.CORE//SYS',
    description: 'Hardware System Configuration',
    iconName: 'Settings',
    defaultColor: '#94a3b8',
    iosScheme: 'App-Prefs:root',
    defaultLabel: 'SETTINGS'
  },
  {
    id: 'phone',
    name: 'Phone (โทรศัพท์)',
    category: 'system',
    techCode: 'VOICE.RELAY//TEL',
    description: 'Sub-GHz Cellular Link',
    iconName: 'Phone',
    defaultColor: '#00ff88',
    iosScheme: 'tel://',
    defaultLabel: 'PHONE'
  },
  {
    id: 'messages',
    name: 'Messages (ข้อความ)',
    category: 'system',
    techCode: 'PACKET.COMM//SMS',
    description: 'Direct Signal Transmission',
    iconName: 'MessageSquare',
    defaultColor: '#00e5ff',
    iosScheme: 'sms://',
    defaultLabel: 'MESSAGES'
  },
  {
    id: 'maps',
    name: 'Maps (แผนที่ / GPS)',
    category: 'system',
    techCode: 'ORBITAL.GPS//NAV',
    description: 'Global Satellite Navigation',
    iconName: 'MapPin',
    defaultColor: '#ff3366',
    iosScheme: 'maps://',
    defaultLabel: 'NAVIGATION'
  },
  {
    id: 'calendar',
    name: 'Calendar (ปฏิทิน)',
    category: 'system',
    techCode: 'CHRONO.LOG//CAL',
    description: 'Temporal Scheduling Matrix',
    iconName: 'Calendar',
    defaultColor: '#ff3838',
    iosScheme: 'calshow://',
    defaultLabel: 'CHRONO'
  },
  {
    id: 'clock',
    name: 'Clock / Alarm (นาฬิกา)',
    category: 'system',
    techCode: 'QUANTUM.CLOCK//RTC',
    description: 'Atomic Precision Chronometer',
    iconName: 'Clock',
    defaultColor: '#ffb703',
    iosScheme: 'clock-alarm://',
    defaultLabel: 'CLOCK'
  },
  {
    id: 'calculator',
    name: 'Calculator (เครื่องคิดเลข)',
    category: 'system',
    techCode: 'QUANTUM.ALU//CALC',
    description: 'High-Density Math Coprocessor',
    iconName: 'Calculator',
    defaultColor: '#ff8800',
    iosScheme: 'calc://',
    defaultLabel: 'ALU // CALC'
  },
  {
    id: 'notes',
    name: 'Notes (โน้ต)',
    category: 'system',
    techCode: 'SYNAPSE.MEM//NOTE',
    description: 'Volatile Memory Storage',
    iconName: 'FileText',
    defaultColor: '#facc15',
    iosScheme: 'mobilenotes://',
    defaultLabel: 'NOTES'
  },
  {
    id: 'files',
    name: 'Files (ไฟล์)',
    category: 'system',
    techCode: 'SECTOR.DATA//STORAGE',
    description: 'Encrypted Cryptographic Drive',
    iconName: 'FolderArchive',
    defaultColor: '#38bdf8',
    iosScheme: 'shareddocuments://',
    defaultLabel: 'STORAGE'
  },
  {
    id: 'appstore',
    name: 'App Store / Play Store',
    category: 'system',
    techCode: 'REPO.MARKET//DEPOT',
    description: 'Stark Module Repository',
    iconName: 'ShoppingBag',
    defaultColor: '#00a2ff',
    iosScheme: 'itms-apps://',
    defaultLabel: 'DEPOT'
  },

  // --- Finance & Shopping ---
  {
    id: 'kplus',
    name: 'K PLUS (กสิกรไทย)',
    category: 'finance',
    techCode: 'VAULT.SEC//KBANK',
    description: 'Biometric Quantum Vault',
    iconName: 'ShieldCheck',
    defaultColor: '#138f2d',
    iosScheme: 'kplus://',
    defaultLabel: 'K PLUS'
  },
  {
    id: 'scbeasy',
    name: 'SCB EASY (ไทยพาณิชย์)',
    category: 'finance',
    techCode: 'VAULT.PRIME//SCB',
    description: 'Secured Financial Terminal',
    iconName: 'CreditCard',
    defaultColor: '#4e2a84',
    iosScheme: 'scbeasy://',
    defaultLabel: 'SCB EASY'
  },
  {
    id: 'krungthai',
    name: 'Krungthai NEXT',
    category: 'finance',
    techCode: 'VAULT.NEXT//KTB',
    description: 'National Reserve Grid',
    iconName: 'Building2',
    defaultColor: '#00a4e4',
    iosScheme: 'ktbnext://',
    defaultLabel: 'KTB NEXT'
  },
  {
    id: 'truemoney',
    name: 'TrueMoney Wallet',
    category: 'finance',
    techCode: 'ENERGY.COIN//TMN',
    description: 'Digital Credit Terminal',
    iconName: 'Wallet',
    defaultColor: '#f97316',
    iosScheme: 'truemoney://',
    defaultLabel: 'WALLET'
  },
  {
    id: 'binance',
    name: 'Binance / Crypto',
    category: 'finance',
    techCode: 'BLOCKCHAIN//BNB',
    description: 'Decentralized Asset Ledger',
    iconName: 'Coins',
    defaultColor: '#f0b90b',
    iosScheme: 'bnc://',
    defaultLabel: 'BINANCE'
  },
  {
    id: 'shopee',
    name: 'Shopee',
    category: 'finance',
    techCode: 'LOGISTICS//SHOPEE',
    description: 'Automated Supply Procurement',
    iconName: 'ShoppingBag',
    defaultColor: '#ee4d2d',
    iosScheme: 'shopee://',
    defaultLabel: 'SHOPEE'
  },
  {
    id: 'lazada',
    name: 'Lazada',
    category: 'finance',
    techCode: 'DEPOT.SUPPLY//LAZ',
    description: 'Material Requisition Hub',
    iconName: 'Package',
    defaultColor: '#0f156d',
    iosScheme: 'lazada://',
    defaultLabel: 'LAZADA'
  },

  // --- Work & AI ---
  {
    id: 'chatgpt',
    name: 'ChatGPT / AI',
    category: 'work',
    techCode: 'JARVIS.NEURAL//AI',
    description: 'Synthetic Intelligence Matrix',
    iconName: 'Bot',
    defaultColor: '#10a37f',
    iosScheme: 'chatgpt://',
    defaultLabel: 'JARVIS AI'
  },
  {
    id: 'gmail',
    name: 'Gmail',
    category: 'work',
    techCode: 'DISPATCH//GMAIL',
    description: 'Encrypted Quantum Dispatch',
    iconName: 'Mail',
    defaultColor: '#ea4335',
    iosScheme: 'googlegmail://',
    defaultLabel: 'GMAIL'
  },
  {
    id: 'gdrive',
    name: 'Google Drive',
    category: 'work',
    techCode: 'CLOUD.ORBIT//DRIVE',
    description: 'Orbital Storage Array',
    iconName: 'HardDrive',
    defaultColor: '#ffba08',
    iosScheme: 'googledrive://',
    defaultLabel: 'DRIVE'
  },
  {
    id: 'notion',
    name: 'Notion',
    category: 'work',
    techCode: 'KNOWLEDGE//NOTION',
    description: 'Synaptic Knowledge Base',
    iconName: 'BookOpen',
    defaultColor: '#ffffff',
    iosScheme: 'notion://',
    defaultLabel: 'NOTION'
  },
  {
    id: 'slack',
    name: 'Slack',
    category: 'work',
    techCode: 'TACTICAL.COM//SLACK',
    description: 'Stark Operative Channel',
    iconName: 'Hash',
    defaultColor: '#4a154b',
    iosScheme: 'slack://',
    defaultLabel: 'SLACK'
  },
  {
    id: 'canva',
    name: 'Canva',
    category: 'work',
    techCode: 'HOLO.DESIGN//CANVA',
    description: 'Holographic Blueprint Engine',
    iconName: 'Palette',
    defaultColor: '#7d2ae8',
    iosScheme: 'canva://',
    defaultLabel: 'CANVA'
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'work',
    techCode: 'CODE.SOURCE//GIT',
    description: 'Firmware & Matrix Registry',
    iconName: 'Code2',
    defaultColor: '#00f0ff',
    iosScheme: 'github://',
    defaultLabel: 'GITHUB'
  },

  // --- Lifestyle & Health ---
  {
    id: 'health',
    name: 'Health / Vitals (สุขภาพ)',
    category: 'lifestyle',
    techCode: 'BIOMETRIC//VITALS',
    description: 'Cardiovascular & Vitals Telemetry',
    iconName: 'Activity',
    defaultColor: '#ff0055',
    iosScheme: 'x-apple-health://',
    defaultLabel: 'VITALS'
  },
  {
    id: 'weather',
    name: 'Weather (สภาพอากาศ)',
    category: 'lifestyle',
    techCode: 'ATMOS.SENSOR//WX',
    description: 'Tropospheric Radar Array',
    iconName: 'CloudSun',
    defaultColor: '#00c3ff',
    iosScheme: 'weather://',
    defaultLabel: 'ATMOSPHERE'
  },
  {
    id: 'lineman',
    name: 'LINE MAN',
    category: 'lifestyle',
    techCode: 'DRONE.DELIVERY//LM',
    description: 'Rapid Sustenance Transport',
    iconName: 'Bike',
    defaultColor: '#00b900',
    iosScheme: 'lineman://',
    defaultLabel: 'LINE MAN'
  },
  {
    id: 'grab',
    name: 'Grab',
    category: 'lifestyle',
    techCode: 'MOBILITY//GRAB',
    description: 'Autonomous Transport Dispatch',
    iconName: 'Car',
    defaultColor: '#00b14f',
    iosScheme: 'grab://',
    defaultLabel: 'GRAB'
  }
];

export const HUD_THEMES = [
  {
    id: 'stark-cyan',
    name: 'Stark Arc Cyan',
    nameTh: 'ฟ้าปฏิกรณ์อาร์ก (Stark Blue/Cyan)',
    primaryColor: '#00f0ff',
    secondaryColor: '#0077ff',
    glowColor: 'rgba(0, 240, 255, 0.7)',
    bgStyle: 'amoled'
  },
  {
    id: 'iron-gold',
    name: 'Mark VII Gold & Red',
    nameTh: 'เกราะทอง-แดง มาร์ค 7 (Iron Armor)',
    primaryColor: '#ffb703',
    secondaryColor: '#e63946',
    glowColor: 'rgba(255, 183, 3, 0.75)',
    bgStyle: 'amoled'
  },
  {
    id: 'matrix-emerald',
    name: 'Stealth Emerald',
    nameTh: 'เขียวนีออนสเตลธ์ (Matrix Neon)',
    primaryColor: '#00ff88',
    secondaryColor: '#00aa55',
    glowColor: 'rgba(0, 255, 136, 0.7)',
    bgStyle: 'amoled'
  },
  {
    id: 'quantum-purple',
    name: 'Quantum Violet',
    nameTh: 'ม่วงควอนตัม (Wakanda Vibranium)',
    primaryColor: '#b026ff',
    secondaryColor: '#590d99',
    glowColor: 'rgba(176, 38, 255, 0.7)',
    bgStyle: 'amoled'
  },
  {
    id: 'solar-orange',
    name: 'Solar Plasma',
    nameTh: 'ส้มพลาสมาพลังงานสูง (Solar Core)',
    primaryColor: '#ff6600',
    secondaryColor: '#cc3300',
    glowColor: 'rgba(255, 102, 0, 0.75)',
    bgStyle: 'amoled'
  },
  {
    id: 'tactical-white',
    name: 'Tactical Spec White',
    nameTh: 'ขาวมินิมอลไซไฟ (Ghost Protocol)',
    primaryColor: '#e2e8f0',
    secondaryColor: '#64748b',
    glowColor: 'rgba(226, 232, 240, 0.65)',
    bgStyle: 'amoled'
  }
];

export const FRAME_STYLES = [
  {
    id: 'arc-reactor',
    name: 'Arc Reactor Core',
    nameTh: 'วงแหวนปฏิกรณ์อาร์ก (Arc Core)',
    desc: 'Concentric energy rings with reactor ticks'
  },
  {
    id: 'cyber-hexagon',
    name: 'Cyber Hexagon',
    nameTh: 'หกเหลี่ยมไฮเทค (Hex Shield)',
    desc: 'Facet armored sci-fi hexagon'
  },
  {
    id: 'holo-octagon',
    name: 'Tactical Octagon',
    nameTh: 'แปดเหลี่ยมยุทธวิธี (HUD Octagon)',
    desc: 'Beveled corners with targeting indices'
  },
  {
    id: 'tachyon-ring',
    name: 'Tachyon Minimal Ring',
    nameTh: 'วงกลมมินิมอลเท่ๆ (Tachyon)',
    desc: 'Clean circle with tech notches'
  },
  {
    id: 'matrix-bracket',
    name: 'Matrix HUD Square',
    nameTh: 'สี่เหลี่ยมเป้าล็อก HUD (Target Square)',
    desc: 'Squared profile with cyber corner brackets'
  }
];
