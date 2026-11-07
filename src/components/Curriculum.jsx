
import React, { useState } from "react";
import {
  ChevronRight, ArrowLeft, GraduationCap, Baby, School,
  BookOpen, Star, Sparkles, CheckCircle2, RotateCcw
} from "lucide-react";

import { LEVEL_GROUPS, getLevelsByGroup } from "../data/curriculum";

const groups = [
  { id: "preschool", name: "อนุบาล", description: "มาเล่นและเรียนรู้กัน", icon: Baby },
  { id: "primary", name: "ประถมศึกษา", description: "สร้างพื้นฐานให้แข็งแรง", icon: School },
  { id: "lower-secondary", name: "มัธยมต้น", description: "ฝึกคิดและแก้โจทย์", icon: GraduationCap },
  { id: "upper-secondary", name: "มัธยมปลาย", description: "ค้นพบคณิตศาสตร์ที่ท้าทาย", icon: BookOpen },
];

const A1_LESSONS = [
  {
    id: "count",
    title: "มานับเลขกัน!",
    description: "มานับสิ่งของแสนน่ารักกันเถอะ",
    emoji: "🍎",
    color: "blue",
    activity: "count",
  },
  {
    id: "pattern",
    title: "อะไรต่อดีนะ?",
    description: "สังเกตสีและลวดลาย",
    emoji: "🌈",
    color: "purple",
    activity: "pattern",
  },
  {
    id: "measure",
    title: "ใหญ่หรือเล็กนะ?",
    description: "ลองเปรียบเทียบสิ่งของ",
    emoji: "🐘",
    color: "peach",
    activity: "measure",
  },
  {
    id: "sort",
    title: "มาแยกกลุ่มกัน!",
    description: "มาช่วยกันจัดของให้เข้าพวก",
    emoji: "🧸",
    color: "mint",
    activity: "sort",
  },
];

const ACTIVITIES = {
  count: {
    question: "มีแอปเปิลทั้งหมดกี่ลูกนะ?",
    objects: ["🍎", "🍎", "🍎"],
    choices: ["1", "2", "3"],
    answer: "3",
    success: "เก่งมาก! หนูนับได้ 3 ลูก 🎉",
    hint: "ลองใช้นิ้วนับทีละลูกนะ",
  },
  pattern: {
    question: "ต่อไปควรเป็นสีอะไรนะ?",
    objects: ["🔴", "🔵", "🔴", "❓"],
    choices: ["🔴", "🔵", "🟡"],
    answer: "🔵",
    success: "เยี่ยมเลย! หนูสังเกตแบบรูปเก่งมาก 🌟",
    hint: "ลองดูนะ สีแดง สีน้ำเงิน แล้วสีแดง...",
  },
  measure: {
    question: "ตัวไหนใหญ่กว่ากันนะ?",
    objects: ["🐘", "🐭"],
    choices: ["🐘", "🐭"],
    answer: "🐘",
    success: "ถูกต้อง! ช้างตัวใหญ่กว่าหนู 🐘",
    hint: "ลองสังเกตขนาดของสัตว์ทั้งสองตัวนะ",
  },
  sort: {
    question: "อะไรไม่ใช่ผลไม้นะ?",
    objects: ["🍎", "🍌", "⚽"],
    choices: ["🍎", "🍌", "⚽"],
    answer: "⚽",
    success: "เก่งมาก! ลูกบอลไม่ใช่ผลไม้ ⚽",
    hint: "ผลไม้กินได้นะ ลองคิดดูอีกครั้ง",
  },
};

function LessonActivity({ lesson, onBack, onComplete }) {
  const activity = ACTIVITIES[lesson.activity];
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);

  const correct = answer === activity.answer;

  function checkAnswer() {
    if (!answer) return;
    setChecked(true);
    if (correct) onComplete(lesson.id);
  }

  function retry() {
    setAnswer("");
    setChecked(false);
  }

  return (
    <section className="mv-lesson">
      <button className="mv-back" onClick={onBack}>
        <ArrowLeft size={18} /> กลับไปเลือกบทเรียน
      </button>

      <div className="mv-lesson-heading">
        <span className="mv-eyebrow">มาเรียนรู้ไปด้วยกัน</span>
        <h1>{lesson.title}</h1>
        <p>{lesson.description}</p>
      </div>

      <div className="mv-activity-card">
        <div className="mv-mascot">☺</div>
        <span className="mv-eyebrow">น้องพายถามว่า...</span>
        <h2>{activity.question}</h2>

        <div className="mv-objects">
          {activity.objects.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>

        <p className="mv-choice-title">เลือกคำตอบของหนูได้เลย!</p>

        <div className="mv-choice-grid">
          {activity.choices.map((choice) => (
            <button
              key={choice}
              className={`mv-choice ${answer === choice ? "selected" : ""}`}
              onClick={() => {
                setAnswer(choice);
                setChecked(false);
              }}
            >
              {choice}
            </button>
          ))}
        </div>

        {checked && (
          <div className={`mv-feedback ${correct ? "correct" : "try-again"}`}>
            {correct ? (
              <><CheckCircle2 size={22} /> {activity.success}</>
            ) : (
              <><Sparkles size={22} /> {activity.hint}</>
            )}
          </div>
        )}

        {checked && correct ? (
          <button className="mv-primary-button" onClick={onBack}>
            <Star size={18} /> กลับไปเลือกบทเรียน
          </button>
        ) : (
          <button
            className="mv-primary-button"
            disabled={!answer}
            onClick={checked ? retry : checkAnswer}
          >
            {checked ? <><RotateCcw size={17} /> ลองอีกครั้ง</> : "ตรวจคำตอบ"}
          </button>
        )}
      </div>
    </section>
  );
}

export default function Curriculum({ onBack }) {
  const [selectedGroup, setSelectedGroup] = useState("preschool");
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [completed, setCompleted] = useState([]);

  const levels = getLevelsByGroup(selectedGroup);

  const lessons = selectedLevel?.id === "A1" ? A1_LESSONS : [];

  function completeLesson(id) {
    setCompleted((previous) =>
      previous.includes(id) ? previous : [...previous, id]
    );
  }

  function goBack() {
    if (selectedLesson) {
      setSelectedLesson(null);
    } else if (selectedLevel) {
      setSelectedLevel(null);
    } else {
      onBack?.();
    }
  }

  if (selectedLesson) {
    return (
      <div className="curriculum-page">
        <LessonActivity
          lesson={selectedLesson}
          onBack={() => setSelectedLesson(null)}
          onComplete={completeLesson}
        />
      </div>
    );
  }

  return (
    <div className="curriculum-page mv-page">
      <header className="curriculum-header">
        <button className="curriculum-back" onClick={goBack}>
          <ArrowLeft size={20} />
        </button>
        <div>
          <p className="curriculum-eyebrow">MATHVERSE LEARNING</p>
          <h1>{selectedLevel ? selectedLevel.name : "โลกแห่งการเรียนรู้"}</h1>
          <p>
            {selectedLevel
              ? "วันนี้เราจะมาเรียนรู้อะไรกันดี?"
              : "เลือกเส้นทางการเรียนรู้ของหนูได้เลย"}
          </p>
        </div>
      </header>

      {!selectedLevel ? (
        <>
          <section className="curriculum-groups">
            <h2>เลือกช่วงวัย</h2>
            <div className="curriculum-group-grid">
              {groups.map((group) => {
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
            <h2>เลือกชั้นเรียน</h2>
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
      ) : selectedLevel.id === "A1" ? (
        <section className="mv-lessons">
          <div className="mv-welcome">
            <div>
              <span className="mv-eyebrow">สวัสดีเพื่อนตัวน้อย!</span>
              <h2>วันนี้มาเล่นคณิตศาสตร์กัน 💙</h2>
              <p>เลือกกิจกรรมที่หนูอยากเล่นได้เลย</p>
            </div>
            <div className="mv-big-mascot">☺</div>
          </div>

          <div className="mv-progress">
            <div>
              <strong>ความเก่งของหนู</strong>
              <span>{completed.length} / {lessons.length} บทเรียน</span>
            </div>
            <div className="mv-progress-track">
              <span style={{ width: `${completed.length / lessons.length * 100}%` }} />
            </div>
          </div>

          <div className="mv-lesson-grid">
            {lessons.map((lesson, index) => (
              <button
                key={lesson.id}
                className={`mv-lesson-card ${lesson.color}`}
                onClick={() => setSelectedLesson(lesson)}
              >
                <span className="mv-lesson-number">บทเรียน {index + 1}</span>
                <span className="mv-lesson-emoji">{lesson.emoji}</span>
                <strong>{lesson.title}</strong>
                <small>{lesson.description}</small>
                <span className="mv-lesson-footer">
                  {completed.includes(lesson.id) ? (
                    <><CheckCircle2 size={15} /> เล่นแล้ว</>
                  ) : (
                    <>ไปเล่นกัน <ChevronRight size={15} /></>
                  )}
                </span>
              </button>
            ))}
          </div>
        </section>
      ) : (
        <section className="mv-coming">
          <span>🌱</span>
          <h2>กำลังเตรียมการผจญภัย!</h2>
          <p>เรากำลังออกแบบบทเรียนให้เหมาะกับวัยของหนูนะ</p>
        </section>
      )}
    </div>
  );
}
