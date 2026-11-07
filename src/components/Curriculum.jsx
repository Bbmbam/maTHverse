
import React, { useState } from "react";
import {
  BookOpen,
  ChevronRight,
  GraduationCap,
  Baby,
  School,
  ArrowLeft,
  Volume2,
  Sparkles,
  Lock,
} from "lucide-react";

import { getLevelsByGroup } from "../data/curriculum";
import {
  speakThai,
  playTap,
  playStart,
} from "../utils/sounds";

const GROUPS = [
  {
    id: "preschool",
    name: "อนุบาล",
    description: "เรียนรู้ผ่านการเล่นและประสบการณ์",
    icon: Baby,
  },
  {
    id: "primary",
    name: "ประถมศึกษา",
    description: "สร้างพื้นฐานความคิดทางคณิตศาสตร์",
    icon: School,
  },
  {
    id: "lower-secondary",
    name: "มัธยมศึกษาตอนต้น",
    description: "พัฒนาทักษะการคิดและแก้ปัญหา",
    icon: GraduationCap,
  },
  {
    id: "upper-secondary",
    name: "มัธยมศึกษาตอนปลาย",
    description: "ต่อยอดคณิตศาสตร์ระดับสูง",
    icon: BookOpen,
  },
];

const NUMBERS = [
  { value: 0, word: "ศูนย์", objects: [], emoji: "🍎" },
  { value: 1, word: "หนึ่ง", objects: ["🍎"], emoji: "🍎" },
  { value: 2, word: "สอง", objects: ["🍎", "🍎"], emoji: "🍎" },
  { value: 3, word: "สาม", objects: ["🍎", "🍎", "🍎"], emoji: "🍎" },
  { value: 4, word: "สี่", objects: ["🍎", "🍎", "🍎", "🍎"], emoji: "🍎" },
  { value: 5, word: "ห้า", objects: ["🍎", "🍎", "🍎", "🍎", "🍎"], emoji: "🍎" },
  { value: 6, word: "หก", objects: ["🍎", "🍎", "🍎", "🍎", "🍎", "🍎"], emoji: "🍎" },
  { value: 7, word: "เจ็ด", objects: ["🍎", "🍎", "🍎", "🍎", "🍎", "🍎", "🍎"], emoji: "🍎" },
  { value: 8, word: "แปด", objects: ["🍎", "🍎", "🍎", "🍎", "🍎", "🍎", "🍎", "🍎"], emoji: "🍎" },
  { value: 9, word: "เก้า", objects: ["🍎", "🍎", "🍎", "🍎", "🍎", "🍎", "🍎", "🍎", "🍎"], emoji: "🍎" },
];

const LESSONS = [
  {
    id: "numbers",
    title: "โลกของตัวเลข 0–9",
    description: "มารู้จักตัวเลขและเสียงอ่านกัน",
    emoji: "🔢",
    available: true,
  },
  {
    id: "counting",
    title: "นักนับตัวน้อย",
    description: "ออกตามหาจำนวนสิ่งของ",
    emoji: "🍎",
  },
  {
    id: "size",
    title: "นักสำรวจขนาด",
    description: "ใหญ่ เล็ก สูง และต่ำ",
    emoji: "🐘",
  },
  {
    id: "patterns",
    title: "โลกแห่งสีและรูปแบบ",
    description: "สนุกกับสีและการเรียงลำดับ",
    emoji: "🌈",
  },
  {
    id: "sorting",
    title: "นักจัดหมวดหมู่",
    description: "มาช่วยกันจัดกลุ่มสิ่งของ",
    emoji: "🧸",
  },
];

function NumberWorld({ onBack }) {
  const [selectedNumber, setSelectedNumber] = useState(NUMBERS[1]);

  const chooseNumber = (number) => {
    setSelectedNumber(number);
    playTap();
    speakThai(`${number.value} ${number.word}`);
  };

  const repeatVoice = () => {
    playTap();
    speakThai(`เลข ${selectedNumber.value} อ่านว่า ${selectedNumber.word}`);
  };

  const startLesson = () => {
    playStart();
    speakThai("เก่งมาก! เรามารู้จักตัวเลขกัน");
  };

  return (
    <div className="mv-world">
      <button className="mv-back" onClick={onBack}>
        <ArrowLeft size={18} />
        กลับไปแผนที่ผจญภัย
      </button>

      <div className="mv-world-heading">
        <span className="mv-eyebrow">ADVENTURE 01 · NUMBER WORLD</span>
        <h1>🔢 โลกของตัวเลข 0–9</h1>
        <p>แตะตัวเลขที่หนูอยากรู้จักได้เลย!</p>
      </div>

      <div className="mv-teacher">
        <div className="mv-teacher-face">☺</div>
        <div>
          <strong>น้องพายบอกว่า...</strong>
          <p>ตัวเลขแต่ละตัวมีชื่อและมีจำนวนของตัวเองนะ ลองแตะดูสิ!</p>
        </div>
        <button
          className="mv-sound-button"
          onClick={() => speakThai("สวัสดีจ้า วันนี้เราจะมาเรียนรู้ตัวเลขศูนย์ถึงเก้ากัน")}
          aria-label="ฟังคำทักทาย"
        >
          <Volume2 size={22} />
        </button>
      </div>

      <div className="mv-number-display">
        <div className="mv-number-main">
          <span className="mv-number-digit">{selectedNumber.value}</span>
          <div>
            <span className="mv-number-caption">ตัวเลขนี้เรียกว่า</span>
            <strong className="mv-number-word">{selectedNumber.word}</strong>
            <button className="mv-listen-button" onClick={repeatVoice}>
              <Volume2 size={17} />
              ฟังเสียงอีกครั้ง
            </button>
          </div>
        </div>

        <div className="mv-number-objects">
          {selectedNumber.objects.length === 0 ? (
            <div className="mv-empty-objects">
              <span>🧺</span>
              <p>ตะกร้าว่างเปล่า ไม่มีแอปเปิลเลย!</p>
            </div>
          ) : (
            <div className="mv-apple-grid">
              {selectedNumber.objects.map((item, index) => (
                <span key={index}>{item}</span>
              ))}
            </div>
          )}
        </div>

        <p className="mv-number-explain">
          {selectedNumber.value === 0
            ? "ศูนย์ หมายถึง ไม่มีสิ่งของอยู่เลย"
            : `มีแอปเปิลทั้งหมด ${selectedNumber.word} ลูก`}
        </p>
      </div>

      <section className="mv-number-picker">
        <h2>ลองแตะตัวเลขดูสิ</h2>
        <p>เลือกเลข 0 ถึง 9 เพื่อฟังเสียงและดูจำนวน</p>

        <div className="mv-number-grid">
          {NUMBERS.map((number) => (
            <button
              key={number.value}
              className={`mv-number-card ${
                selectedNumber.value === number.value ? "active" : ""
              }`}
              onClick={() => chooseNumber(number)}
            >
              {number.value}
            </button>
          ))}
        </div>
      </section>

      <div className="mv-adventure-next">
        <div>
          <Sparkles size={22} />
          <div>
            <strong>พร้อมออกผจญภัยต่อหรือยัง?</strong>
            <p>ต่อไปเราจะฝึกเขียนตัวเลขด้วยนิ้วของหนูเอง</p>
          </div>
        </div>
        <button onClick={startLesson}>
          ไปฝึกเขียนเลขกัน
          <ChevronRight size={18} />
        </button>
        <small>กิจกรรมฝึกเขียนจะเพิ่มในขั้นตอนถัดไป</small>
      </div>
    </div>
  );
}

export default function Curriculum({ onBack }) {
  const [selectedGroup, setSelectedGroup] = useState("preschool");
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);

  const levels = getLevelsByGroup(selectedGroup);

  const handleBack = () => {
    if (activeLesson) {
      setActiveLesson(null);
    } else if (selectedLevel) {
      setSelectedLevel(null);
    } else if (onBack) {
      onBack();
    }
  };

  if (activeLesson === "numbers") {
    return (
      <div className="mv-page">
        <NumberWorld onBack={() => setActiveLesson(null)} />
      </div>
    );
  }

  return (
    <div className="curriculum-page mv-page">
      <header className="curriculum-header">
        <button
          className="curriculum-back"
          onClick={handleBack}
          aria-label="ย้อนกลับ"
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <p className="curriculum-eyebrow">MATHVERSE LEARNING</p>
          <h1>หลักสูตรคณิตศาสตร์</h1>
          <p>เลือกเส้นทางการเรียนรู้ที่เหมาะกับคุณ</p>
        </div>
      </header>

      {!selectedLevel ? (
        <>
          <section className="curriculum-groups">
            <h2>เลือกระดับการศึกษา</h2>
            <div className="curriculum-group-grid">
              {GROUPS.map((group) => {
                const Icon = group.icon;

                return (
                  <button
                    key={group.id}
                    className={`curriculum-group-card ${
                      selectedGroup === group.id ? "active" : ""
                    }`}
                    onClick={() => setSelectedGroup(group.id)}
                  >
                    <span className="curriculum-group-icon">
                      <Icon size={28} />
                    </span>
                    <strong>{group.name}</strong>
                    <small>{group.description}</small>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="curriculum-levels">
            <h2>เลือกระดับชั้น</h2>
            <div className="curriculum-level-grid">
              {levels.map((level) => (
                <button
                  key={level.id}
                  className="curriculum-level-card"
                  onClick={() => setSelectedLevel(level)}
                >
                  <span>{level.shortName}</span>
                  <ChevronRight size={20} />
                </button>
              ))}
            </div>
          </section>
        </>
      ) : (
        <section className="mv-lessons">
          <div className="mv-welcome">
            <div>
              <span className="mv-eyebrow">WELCOME TO MATHVERSE</span>
              <h2>พร้อมออกผจญภัยหรือยัง?</h2>
              <p>น้องพายจะพาหนูไปเรียนรู้คณิตศาสตร์กัน!</p>
            </div>
            <div className="mv-big-mascot">☺</div>
          </div>

          <h2>แผนที่ผจญภัย · {selectedLevel.name}</h2>

          <div className="mv-lesson-grid">
            {LESSONS.map((lesson, index) => (
              <button
                key={lesson.id}
                className={`mv-lesson-card ${
                  ["blue", "purple", "peach", "mint", "blue"][index]
                }`}
                onClick={() => {
                  if (lesson.available) {
                    setActiveLesson(lesson.id);
                    playStart();
                    speakThai("ยินดีต้อนรับสู่โลกของตัวเลข");
                  }
                }}
                disabled={!lesson.available}
              >
                <span className="mv-lesson-number">
                  ภารกิจที่ {index + 1}
                </span>
                <span className="mv-lesson-emoji">{lesson.emoji}</span>
                <strong>{lesson.title}</strong>
                <small>{lesson.description}</small>
                <span className="mv-lesson-footer">
                  {lesson.available ? (
                    <>
                      เริ่มผจญภัย <ChevronRight size={15} />
                    </>
                  ) : (
                    <>
                      <Lock size={13} /> เร็ว ๆ นี้
                    </>
                  )}
                </span>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
