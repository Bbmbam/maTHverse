
// =============================================
// maTHVerse — CURRICULUM DATABASE
// Phase 2 : Curriculum & Interactive Learning
// Version 1.0
// =============================================

// หลักสูตรอ้างอิง
export const CURRICULUM_INFO = {
  name: "หลักสูตรคณิตศาสตร์ maTHVerse",
  language: "th",
  levels: 15,
  references: {
    preschool: {
      name: "หลักสูตรการศึกษาปฐมวัย พุทธศักราช 2560",
      authority: "กระทรวงศึกษาธิการ"
    },
    basicEducation: {
      name: "มาตรฐานการเรียนรู้และตัวชี้วัด กลุ่มสาระการเรียนรู้คณิตศาสตร์",
      edition: "ฉบับปรับปรุง พ.ศ. 2560",
      authority: "กระทรวงศึกษาธิการ",
      url: "https://academic.obec.go.th/images/document/1559638928_d_1.pdf"
    }
  }
};

// =============================================
// 1. สาระการเรียนรู้
// =============================================

// ปฐมวัย: เป็นพื้นที่ประสบการณ์ที่ออกแบบสำหรับเด็กเล็ก
export const PRESCHOOL_AREAS = [
  {
    id: "number",
    name: "จำนวนและการคิดเชิงคณิตศาสตร์",
    description: "การนับ จำนวน การเปรียบเทียบ และการคิด"
  },
  {
    id: "pattern",
    name: "แบบรูปและความสัมพันธ์",
    description: "การสังเกต จัดกลุ่ม และต่อแบบรูป"
  },
  {
    id: "measurement",
    name: "การวัดและรูปทรง",
    description: "ขนาด น้ำหนัก เวลา และรูปทรงรอบตัว"
  },
  {
    id: "data",
    name: "ข้อมูลและการจัดหมวดหมู่",
    description: "การสังเกต จำแนก และนำเสนอข้อมูลอย่างง่าย"
  }
];

// ประถมและมัธยม: สาระการเรียนรู้ตามหลักสูตรคณิตศาสตร์
export const MATH_STRANDS = [
  {
    id: "number-algebra",
    name: "จำนวนและพีชคณิต",
    description: "จำนวน ระบบจำนวน การดำเนินการ และพีชคณิต"
  },
  {
    id: "measurement-geometry",
    name: "การวัดและเรขาคณิต",
    description: "การวัด รูปเรขาคณิต และความสัมพันธ์ทางเรขาคณิต"
  },
  {
    id: "statistics-probability",
    name: "สถิติและความน่าจะเป็น",
    description: "ข้อมูล การนำเสนอข้อมูล และความน่าจะเป็น"
  }
];

// =============================================
// 2. สร้างข้อมูลระดับชั้นทั้ง 15 ระดับ
// =============================================

const preschoolLevels = [
  {
    id: "A1",
    code: "อ.1",
    name: "อนุบาล 1",
    shortName: "อ.1",
    ageRange: "3–4 ปี",
    group: "preschool",
    groupName: "ปฐมวัย",
    curriculum: "preschool"
  },
  {
    id: "A2",
    code: "อ.2",
    name: "อนุบาล 2",
    shortName: "อ.2",
    ageRange: "4–5 ปี",
    group: "preschool",
    groupName: "ปฐมวัย",
    curriculum: "preschool"
  },
  {
    id: "A3",
    code: "อ.3",
    name: "อนุบาล 3",
    shortName: "อ.3",
    ageRange: "5–6 ปี",
    group: "preschool",
    groupName: "ปฐมวัย",
    curriculum: "preschool"
  }
];

const primaryLevels = Array.from({ length: 6 }, (_, i) => ({
  id: `P${i + 1}`,
  code: `ป.${i + 1}`,
  name: `ประถมศึกษาปีที่ ${i + 1}`,
  shortName: `ป.${i + 1}`,
  ageRange: `${i + 6}–${i + 7} ปี`,
  group: "primary",
  groupName: "ประถมศึกษา",
  curriculum: "basic"
}));

const lowerSecondaryLevels = Array.from({ length: 3 }, (_, i) => ({
  id: `M${i + 1}`,
  code: `ม.${i + 1}`,
  name: `มัธยมศึกษาปีที่ ${i + 1}`,
  shortName: `ม.${i + 1}`,
  ageRange: `${i + 12}–${i + 13} ปี`,
  group: "lower-secondary",
  groupName: "มัธยมศึกษาตอนต้น",
  curriculum: "basic"
}));

const upperSecondaryLevels = Array.from({ length: 3 }, (_, i) => ({
  id: `M${i + 4}`,
  code: `ม.${i + 4}`,
  name: `มัธยมศึกษาปีที่ ${i + 4}`,
  shortName: `ม.${i + 4}`,
  ageRange: `${i + 15}–${i + 16} ปี`,
  group: "upper-secondary",
  groupName: "มัธยมศึกษาตอนปลาย",
  curriculum: "basic"
}));

export const LEVELS = [
  ...preschoolLevels,
  ...primaryLevels,
  ...lowerSecondaryLevels,
  ...upperSecondaryLevels
];

// =============================================
// 3. โครงสร้างหลักสูตรแต่ละระดับชั้น
// =============================================

export const CURRICULUM = LEVELS.map((level) => ({
  ...level,

  strands:
    level.curriculum === "preschool"
      ? PRESCHOOL_AREAS
      : MATH_STRANDS,

  // หน่วยการเรียนรู้จะเติมหลังตรวจสอบตัวชี้วัด
  units: [],

  status: "structure_ready"
}));

// =============================================
// 4. ฟังก์ชันเรียกใช้ข้อมูลหลักสูตร
// =============================================

// ค้นหาระดับชั้นด้วย ID
export function getLevelById(id) {
  return CURRICULUM.find(level => level.id === id) || null;
}

// เรียกระดับชั้นทั้งหมดในกลุ่ม
export function getLevelsByGroup(group) {
  return CURRICULUM.filter(level => level.group === group);
}

// เรียกข้อมูลหลักสูตรของระดับชั้น
export function getCurriculumForLevel(id) {
  return getLevelById(id);
}

// เรียกสาระการเรียนรู้
export function getStrandsForLevel(id) {
  const level = getLevelById(id);
  return level ? level.strands : [];
}

// เรียกหน่วยการเรียนรู้
export function getUnitsForLevel(id) {
  const level = getLevelById(id);
  return level ? level.units : [];
}

// ตรวจสอบว่ามีระดับชั้นหรือไม่
export function isValidLevel(id) {
  return LEVELS.some(level => level.id === id);
}

// =============================================
// 5. กลุ่มระดับชั้นสำหรับหน้าแสดงผล
// =============================================

export const LEVEL_GROUPS = [
  {
    id: "preschool",
    name: "ปฐมวัย",
    description: "เรียนรู้คณิตศาสตร์ผ่านการเล่น",
    levels: ["A1", "A2", "A3"]
  },
  {
    id: "primary",
    name: "ประถมศึกษา",
    description: "สร้างพื้นฐานคณิตศาสตร์",
    levels: ["P1", "P2", "P3", "P4", "P5", "P6"]
  },
  {
    id: "lower-secondary",
    name: "มัธยมศึกษาตอนต้น",
    description: "พัฒนาทักษะการคิดวิเคราะห์",
    levels: ["M1", "M2", "M3"]
  },
  {
    id: "upper-secondary",
    name: "มัธยมศึกษาตอนปลาย",
    description: "ต่อยอดคณิตศาสตร์ระดับสูง",
    levels: ["M4", "M5", "M6"]
  }
];

// =============================================
// END OF CURRICULUM DATABASE
// =============================================
