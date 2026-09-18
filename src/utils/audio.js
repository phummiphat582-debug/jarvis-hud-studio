// Procedural Web Audio API sound synthesizer for J.A.R.V.I.S. HUD

let audioCtx = null;
let soundEnabled = true;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setSoundEnabled(enabled) {
  soundEnabled = enabled;
}

export function isSoundEnabled() {
  return soundEnabled;
}

// Subtle HUD hover blip
export function playHoverSound() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.04);
    
    gain.gain.setValueAtTime(0.02, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch {
    // Ignore audio error if user hasn't interacted yet
  }
}

// Sci-Fi UI Click confirm
export function playClickSound() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.07);
    
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.07);
  } catch {
    // Ignore
  }
}

// Sci-Fi Arc Reactor Boot Hum
export function playJarvisBoot() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    
    // Sub bass sweep
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(60, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.7);
    
    // Resonant Filter
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(180, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(1600, ctx.currentTime + 0.6);
    filter.Q.setValueAtTime(6, ctx.currentTime);

    gain1.gain.setValueAtTime(0.01, ctx.currentTime);
    gain1.gain.linearRampToValueAtTime(0.09, ctx.currentTime + 0.3);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.85);

    osc1.connect(filter);
    filter.connect(gain1);
    gain1.connect(ctx.destination);

    // High tech chirp
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(520, ctx.currentTime + 0.4);
    osc2.frequency.exponentialRampToValueAtTime(1040, ctx.currentTime + 0.6);
    osc2.frequency.setValueAtTime(1560, ctx.currentTime + 0.62);

    gain2.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain2.gain.setValueAtTime(0.06, ctx.currentTime + 0.4);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.75);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc1.start();
    osc2.start(ctx.currentTime + 0.4);
    osc1.stop(ctx.currentTime + 0.85);
    osc2.stop(ctx.currentTime + 0.75);
  } catch {
    // Ignore
  }
}

// Download / Synthesis Complete
export function playDownloadSound() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    
    const freqs = [523.25, 659.25, 783.99, 1046.50];
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime + idx * 0.08;
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      
      gain.gain.setValueAtTime(0.05, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.18);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(startTime);
      osc.stop(startTime + 0.18);
    });
  } catch {
    // Ignore
  }
}

// Radar scan chirp
export function playScanSound() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(2200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.15);
    
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch {
    // Ignore
  }
}

// J.A.R.V.I.S. Speech Synthesizer
export function speakJarvis(text, lang = 'en-US') {
  if (!soundEnabled) return;
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1.05;
  utterance.pitch = 0.92; // Slightly deeper, robotic AI timbre
  utterance.lang = lang;

  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    if (lang === 'th-TH') {
      const thaiVoice = voices.find(v => v.lang.includes('th') || v.lang.includes('TH'));
      if (thaiVoice) utterance.voice = thaiVoice;
    } else {
      // Look for a British or sleek English voice for JARVIS feel
      const britishVoice = voices.find(v => v.lang.includes('en-GB') || v.name.includes('George') || v.name.includes('Daniel') || v.name.includes('Oliver'));
      if (britishVoice) {
        utterance.voice = britishVoice;
      } else {
        const enVoice = voices.find(v => v.lang.includes('en'));
        if (enVoice) utterance.voice = enVoice;
      }
    }
  }

  window.speechSynthesis.speak(utterance);
}
