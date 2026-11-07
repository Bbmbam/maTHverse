
let audioContext = null;

// ==================================
// Thai Voice Settings
// ==================================

// ชื่อเสียงที่มักเป็นเสียงผู้หญิง
const FEMALE_VOICE_HINTS = [
  "female",
  "woman",
  "หญิง",
  "premwadee",
  "kanya",
];

// ชื่อเสียงที่มักเป็นเสียงผู้ชาย
const MALE_VOICE_HINTS = [
  "male",
  "man",
  "ชาย",
  "niwat",
];

// เปลี่ยนเป็นชื่อเสียงที่ต้องการได้ภายหลัง
const PREFERRED_VOICE_NAME = "";

// เก็บเสียงที่เลือกไว้
let selectedThaiVoice = null;

function getThaiVoices() {
  if (!("speechSynthesis" in window)) return [];

  return window.speechSynthesis
    .getVoices()
    .filter((voice) => voice.lang.toLowerCase().startsWith("th"));
}

function selectThaiVoice() {
  const voices = getThaiVoices();

  if (voices.length === 0) {
    selectedThaiVoice = null;
    return null;
  }

  // 1. เลือกเสียงตามชื่อที่กำหนดเอง
  if (PREFERRED_VOICE_NAME) {
    const preferred = voices.find((voice) =>
      voice.name.toLowerCase().includes(
        PREFERRED_VOICE_NAME.toLowerCase()
      )
    );

    if (preferred) {
      selectedThaiVoice = preferred;
      return preferred;
    }
  }

  // 2. พยายามหาเสียงผู้หญิงจากชื่อเสียง
  const femaleVoice = voices.find((voice) => {
    const name = voice.name.toLowerCase();

    return (
      FEMALE_VOICE_HINTS.some((hint) => name.includes(hint)) &&
      !MALE_VOICE_HINTS.some((hint) => name.includes(hint))
    );
  });

  if (femaleVoice) {
    selectedThaiVoice = femaleVoice;
    return femaleVoice;
  }

  // 3. ถ้ายังหาไม่ได้ เลือกเสียงไทยที่มีอยู่
  selectedThaiVoice = voices[0];
  return selectedThaiVoice;
}

// โหลดรายการเสียงเมื่อเบราว์เซอร์พร้อม
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  window.speechSynthesis.addEventListener(
    "voiceschanged",
    selectThaiVoice
  );
}

// ใช้ตรวจสอบเสียงภาษาไทยที่เครื่องรองรับ
export function showThaiVoices() {
  const voices = getThaiVoices();

  console.table(
    voices.map((voice) => ({
      name: voice.name,
      lang: voice.lang,
      default: voice.default,
    }))
  );

  return voices;
}

// ==================================
// Thai Voice
// ==================================

export function speakThai(text, options = {}) {
  if (
    typeof window === "undefined" ||
    !("speechSynthesis" in window)
  ) {
    console.warn("เบราว์เซอร์นี้ไม่รองรับเสียงพูด");
    return;
  }

  // ยกเลิกเสียงก่อนหน้า ป้องกันเสียงพูดซ้อน
  window.speechSynthesis.cancel();

  const message = new SpeechSynthesisUtterance(text);

  message.lang = "th-TH";
  message.rate = options.rate ?? 0.85;
  message.pitch = options.pitch ?? 1.15;
  message.volume = options.volume ?? 1;

  const voice = selectedThaiVoice || selectThaiVoice();

  if (voice) {
    message.voice = voice;
  }

  window.speechSynthesis.speak(message);
}

// ==================================
// Sound Effects
// ==================================

function getAudioContext() {
  if (typeof window === "undefined") return null;

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
