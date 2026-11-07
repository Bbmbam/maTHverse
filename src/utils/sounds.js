
let audioContext = null;

// ==================================
// Thai Voice
// ==================================

export function speakThai(text, options = {}) {
  if (!("speechSynthesis" in window)) {
    console.warn("เบราว์เซอร์นี้ไม่รองรับเสียงพูด");
    return;
  }

  window.speechSynthesis.cancel();

  const message = new SpeechSynthesisUtterance(text);

  message.lang = "th-TH";
  message.rate = options.rate ?? 0.85;
  message.pitch = options.pitch ?? 1.15;
  message.volume = options.volume ?? 1;

  const voices = window.speechSynthesis.getVoices();

  const thaiVoice = voices.find(
    (voice) => voice.lang.toLowerCase().startsWith("th")
  );

  if (thaiVoice) {
    message.voice = thaiVoice;
  }

  window.speechSynthesis.speak(message);
}

// ==================================
// Sound Effects
// ==================================

function getAudioContext() {
  if (!audioContext) {
    const AudioContextClass =
      window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) return null;

    audioContext = new AudioContextClass();
  }

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  return audioContext;
}

function playTone(frequency, startTime, duration, volume = 0.12) {
  const context = getAudioContext();
  if (!context) return;

  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = "sine";
  oscillator.frequency.value = frequency;

  gain.gain.setValueAtTime(volume, startTime);
  gain.gain.exponentialRampToValueAtTime(
    0.001,
    startTime + duration
  );

  oscillator.connect(gain);
  gain.connect(context.destination);

  oscillator.start(startTime);
  oscillator.stop(startTime + duration);
}

// เสียงเมื่อเด็กแตะสิ่งของ
export function playTap() {
  const context = getAudioContext();
  if (!context) return;

  playTone(650, context.currentTime, 0.12, 0.08);
}

// เสียงเมื่อเด็กทำกิจกรรมสำเร็จ
export function playSuccess() {
  const context = getAudioContext();
  if (!context) return;

  const now = context.currentTime;

  playTone(523.25, now, 0.18);
  playTone(659.25, now + 0.16, 0.18);
  playTone(783.99, now + 0.32, 0.3);
}

// เสียงเมื่อเด็กเริ่มกิจกรรม
export function playStart() {
  const context = getAudioContext();
  if (!context) return;

  const now = context.currentTime;

  playTone(440, now, 0.12);
  playTone(587.33, now + 0.13, 0.2);
}
