
import React, { useState } from "react";
import {
  BookOpen,
  ChevronRight,
  GraduationCap,
  Baby,
  School,
  Calculator,
  Ruler,
  ChartNoAxesCombined,
  ArrowLeft,
} from "lucide-react";

import {
  LEVEL_GROUPS,
  getLevelsByGroup,
  getCurriculumForLevel,
  getStrandsForLevel,
} from "../data/curriculum";

const STRAND_ICONS = [
  Calculator,
  Ruler,
  ChartNoAxesCombined,
];

export default function Curriculum({ onBack }) {
  const [selectedGroup, setSelectedGroup] = useState("preschool");
  const [selectedLevel, setSelectedLevel] = useState(null);


const groups = [
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


  const levels = getLevelsByGroup(selectedGroup);

  const curriculum = selectedLevel
    ? getCurriculumForLevel(selectedLevel.id)
    : null;

  const strands = selectedLevel
    ? getStrandsForLevel(selectedLevel.id)
    : [];

  const handleBack = () => {
    if (selectedLevel) {
      setSelectedLevel(null);
    } else if (onBack) {
      onBack();
    }
  };

  return (
    <div className="curriculum-page">
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
              {groups.map((group) => {
                const Icon = group.icon;
                const isActive = selectedGroup === group.id;

                return (
                  <button
                    key={group.id}
                    className={`curriculum-group-card ${
                      isActive ? "active" : ""
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
        <section className="curriculum-detail">
          <div className="curriculum-selected-level">
            <BookOpen size={28} />
            <div>
              <p>หลักสูตรระดับ</p>
              <h2>{selectedLevel.name}</h2>
            </div>
          </div>

          {curriculum && (
            <>
              <h3>สาระการเรียนรู้</h3>

              <div className="curriculum-strand-list">
                {strands.map((strand, index) => {
                  const Icon =
                    STRAND_ICONS[index % STRAND_ICONS.length];

                  return (
                    <article
                      className="curriculum-strand-card"
                      key={strand.id || strand.name}
                    >
                      <span className="curriculum-strand-icon">
                        <Icon size={24} />
                      </span>

                      <div>
                        <strong>{strand.name}</strong>
                        {strand.description && (
                          <p>{strand.description}</p>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="curriculum-coming-soon">
                <BookOpen size={22} />
                <div>
                  <strong>บทเรียนและกิจกรรม</strong>
                  <p>
                    โครงสร้างหลักสูตรพร้อมแล้ว
                    เนื้อหาบทเรียนจะทยอยเพิ่มหลังตรวจสอบตัวชี้วัด
                  </p>
                </div>
              </div>
            </>
          )}

          {!curriculum && (
            <p>ยังไม่พบข้อมูลหลักสูตรระดับชั้นนี้</p>
          )}
        </section>
      )}
    </div>
  );
}

