import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BookOpen, Brain, Calculator, Camera, Gamepad2, BookHeart, UserRound,
  Sparkles, ChevronRight, Settings, CalendarDays, Trophy, LockKeyhole,
  Pencil, CheckCircle2, Star, ArrowRight, GraduationCap, Shapes, Heart
} from "lucide-react";
import "./styles.css";
import Curriculum from "./components/Curriculum";

const LEVELS = [
  { id:"อ.1", name:"อนุบาล 1", group:"ปฐมวัย" },
  { id:"อ.2", name:"อนุบาล 2", group:"ปฐมวัย" },
  { id:"อ.3", name:"อนุบาล 3", group:"ปฐมวัย" },
  ...Array.from({length:6},(_,i)=>({id:`ป.${i+1}`,name:`ประถมศึกษาปีที่ ${i+1}`,group:"ประถมศึกษา"})),
  ...Array.from({length:3},(_,i)=>({id:`ม.${i+1}`,name:`มัธยมศึกษาปีที่ ${i+1}`,group:"มัธยมศึกษาตอนต้น"})),
  ...Array.from({length:3},(_,i)=>({id:`ม.${i+4}`,name:`มัธยมศึกษาปีที่ ${i+4}`,group:"มัธยมศึกษาตอนปลาย"}))
];

function ageFromBirthdate(value) {
  if (!value) return null;
  const birth = new Date(`${value}T00:00:00`);
  const today = new Date();
  if (Number.isNaN(birth.getTime()) || birth > today) return null;
  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  if (today.getDate() < birth.getDate()) months--;
  if (months < 0) { years--; months += 12; }
  return { years, months };
}
function recommendedIndex(age) {
  if (!age) return 0;
  const y = age.years + age.months / 12;
  if (y < 4) return 0;
  if (y < 5) return 1;
  if (y < 6) return 2;
  if (y < 7) return 3;
  if (y < 8) return 4;
  if (y < 9) return 5;
  if (y < 10) return 6;
  if (y < 11) return 7;
  if (y < 12) return 8;
  if (y < 13) return 9;
  if (y < 14) return 10;
  if (y < 15) return 11;
  if (y < 16) return 12;
  if (y < 17) return 13;
  return 14;
}
const MASCOTS = [
  {name:"น้องพาย", role:"เพื่อนตัวกลม ร่าเริง ชวนลงมือทำ", shape:"circle", face:"☺"},
  {name:"น้องมิว", role:"สาวเนิร์ด ช่วยอธิบายอย่างเป็นขั้นตอน", shape:"square", face:"✦"},
  {name:"พี่ซิกมาร์", role:"พี่เลี้ยงสุดเนี้ยบ สำหรับโจทย์ท้าทาย", shape:"triangle", face:"Σ"}
];
const tiles = [
  {icon:BookOpen,title:"บทเรียน",desc:"เรียนรู้ผ่านกิจกรรมโต้ตอบ",tag:"เร็ว ๆ นี้",tone:"blue"},
  {icon:Brain,title:"วัดระดับความรู้",desc:"แบบประเมินปรับระดับ 90 ข้อ",tag:"เร็ว ๆ นี้",tone:"violet"},
  {icon:BookHeart,title:"คลังข้อสอบ",desc:"ฝึกจากข้อสอบและโจทย์ฝึก",tag:"เร็ว ๆ นี้",tone:"peach"},
  {icon:Calculator,title:"เครื่องคิดเลข",desc:"สแกนโจทย์และดูวิธีคิด",tag:"เร็ว ๆ นี้",tone:"mint"},
  {icon:Gamepad2,title:"เกมคณิตศาสตร์",desc:"เรียนรู้ผ่านการเล่น",tag:"เร็ว ๆ นี้",tone:"yellow"},
  {icon:Heart,title:"นิทานคณิตศาสตร์",desc:"อ่านสนุกกับครอบครัว",tag:"เร็ว ๆ นี้",tone:"pink"}
];

function App() {
  const [profile,setProfile] = useState(()=>JSON.parse(localStorage.getItem("mathverse-profile") || "null"));
  const [name,setName] = useState(profile?.name || "");
  const [birthdate,setBirthdate] = useState(profile?.birthdate || "");
  const [active,setActive] = useState("home");
  const [showLevels,setShowLevels] = useState(false);
  const [editing,setEditing] = useState(false);
  const age = useMemo(()=>ageFromBirthdate(profile?.birthdate),[profile?.birthdate]);
  const recIndex = recommendedIndex(age);
  const recommended = LEVELS[recIndex];

  useEffect(()=>{ if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(()=>{}); },[]);
  function saveProfile(e) {
    e.preventDefault();
    if (!name.trim() || !birthdate || !ageFromBirthdate(birthdate)) return;
    const next={name:name.trim(),birthdate};
    localStorage.setItem("mathverse-profile",JSON.stringify(next));
    setProfile(next); setEditing(false);
  }
  function resetProfile() { localStorage.removeItem("mathverse-profile"); setProfile(null); setName(""); setBirthdate(""); }
  if (!profile || editing) return <Welcome name={name} setName={setName} birthdate={birthdate} setBirthdate={setBirthdate} onSave={saveProfile} editing={editing} onCancel={()=>setEditing(false)}/>;

  return <div className="app-shell">
    <header className="topbar">
      <button className="brand" onClick={()=>setActive("home")} aria-label="กลับหน้าหลัก"><span className="brand-mark">M</span><span>Math<span>Verse</span></span></button>
      <div className="top-actions"><span className="age-chip"><CalendarDays size={15}/>{age?.years} ปี {age?.months} เดือน</span><button className="avatar" onClick={()=>setEditing(true)} aria-label="แก้ไขโปรไฟล์"><UserRound size={19}/></button></div>
    </header>

    <main className="main">   
      {active === "curriculum" ? (     
        <Curriculum onBack={() => setActive("home")} />  
      ) : (     
        <>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><Sparkles size={15}/> YOUR MATH JOURNEY</div>
          <h1>สวัสดี {profile.name} <span className="wave">✦</span></h1>
          <p>วันนี้อยากออกผจญภัยในโลกคณิตศาสตร์เรื่องไหน?</p>
          <div className="recommend-card">
            <div className="recommend-icon"><GraduationCap size={23}/></div>
            <div><small>ระดับเริ่มต้นที่แนะนำ</small><strong>{recommended.name}</strong><small>เลือกเรียนระดับอื่นล่วงหน้าได้เสมอ</small></div>
            <button className="text-button" onClick={()=>setActive("curriculum")}>ดูระดับทั้งหมด <ChevronRight size={16}/></button>
          </div>
        </div>
        <div className="hero-art" aria-label="มาสคอต MathVerse">
          <div className="orbit orbit-one"></div><div className="orbit orbit-two"></div>
          <div className="mascot-pie">☺</div><div className="mascot-square">✦</div><div className="mascot-triangle">Σ</div>
          <span className="sparkle s1">✧</span><span className="sparkle s2">✦</span><span className="sparkle s3">·</span>
        </div>
      </section>

      <section className="section-heading"><div><span className="eyebrow">EXPLORE</span><h2>โลกของ MathVerse</h2><p>เลือกสิ่งที่อยากเรียนรู้ได้เลย</p></div><span className="section-count">6 หมวดการเรียนรู้</span></section>
      <section className="feature-grid">
        {tiles.map(({icon:Icon,title,desc,tag,tone})=><button className={`feature-card ${tone}`} key={title} onClick={()=>setActive(title === "บทเรียน" ? "curriculum" : title)}>
          <span className="feature-icon"><Icon size={25}/></span><span className="feature-title">{title}</span><span className="feature-desc">{desc}</span><span className="feature-tag">{tag}</span>
        </button>)}
      </section>

      <section className="lower-grid">
        <div className="panel level-panel">
          <div className="panel-head"><div><span className="eyebrow">CURRICULUM</span><h3>เส้นทางการเรียนรู้</h3></div><button className="icon-button" onClick={()=>setActive("curriculum")}><ArrowRight size={18}/></button></div>
          <p className="muted">หลักสูตรตั้งแต่อนุบาล 1 ถึงมัธยมศึกษาปีที่ 6</p>
          <div className="level-track"><span className="track-dot active"></span><span className="track-line"></span><span className="track-dot"></span><span className="track-line"></span><span className="track-dot"></span></div>
          <div className="track-labels"><span>ปฐมวัย</span><span>ประถม</span><span>มัธยม</span></div>
          <button className="outline-button" onClick={()=>setActive("curriculum")}>สำรวจ 15 ระดับชั้น <ChevronRight size={16}/></button>
        </div>
        <div className="panel mascot-panel">
          <div className="panel-head"><div><span className="eyebrow">YOUR FRIENDS</span><h3>เพื่อนร่วมเรียนรู้</h3></div><Sparkles size={20} className="soft-icon"/></div>
          <div className="mascot-list">{MASCOTS.map(m=><div className="mascot-row" key={m.name}><span className={`mini-mascot ${m.shape}`}>{m.face}</span><span><strong>{m.name}</strong><small>{m.role}</small></span></div>)}</div>
        </div>
      </section>
      <footer>MathVerse <span>คิดเป็น เล่นเป็น เรียนรู้ได้ทุกวัน</span><small>Phase 1 · Starter experience</small></footer>
    </>
  )}
</main>

    <nav className="bottom-nav">
      {[["home","⌂","หน้าหลัก"],["เรียนรู้","▤","เรียนรู้"],["รางวัล","☆","รางวัล"],["profile","◉","โปรไฟล์"]].map(([id,icon,label])=><button key={id} className={active===id?"selected":""} onClick={()=>id==="profile"?setEditing(true):setActive(id)}><span>{icon}</span>{label}</button>)}
    </nav>

    {showLevels && <div className="modal-backdrop" onClick={()=>setShowLevels(false)}><div className="modal" onClick={e=>e.stopPropagation()}>
      <div className="modal-head"><div><span className="eyebrow">CURRICULUM MAP</span><h2>เลือกเส้นทางการเรียน</h2><p>ทุกระดับเปิดให้ทดลองเรียนล่วงหน้าได้</p></div><button className="close-button" onClick={()=>setShowLevels(false)}>×</button></div>
      {["ปฐมวัย","ประถมศึกษา","มัธยมศึกษาตอนต้น","มัธยมศึกษาตอนปลาย"].map(group=><div className="level-group" key={group}><h4>{group}</h4><div className="level-buttons">{LEVELS.filter(l=>l.group===group).map(l=><button key={l.id} className={l.id===recommended.id?"recommended":""} onClick={()=>setShowLevels(false)}><strong>{l.id}</strong>{l.id===recommended.id&&<small>แนะนำ</small>}</button>)}</div></div>)}
      <p className="modal-note"><Star size={14}/> ระดับที่แนะนำอ้างอิงจากวันเกิดเท่านั้น สามารถเลือกเรียนระดับอื่นได้ตามความพร้อม</p>
    </div></div>}
    {active!=="home" && active!=="profile" && <div className="toast" role="status"><Sparkles size={16}/> {active} จะเปิดให้ใช้งานในเฟสถัดไป</div>}
  </div>;
}

function Welcome({name,setName,birthdate,setBirthdate,onSave,editing,onCancel}) {
  const age=ageFromBirthdate(birthdate);
  const rec=LEVELS[recommendedIndex(age)];
  return <div className="welcome-page">
    <div className="welcome-card">
      <div className="welcome-brand"><span className="brand-mark">M</span><span>Math<span>Verse</span></span></div>
      <div className="welcome-art"><div className="welcome-circle">☺</div><div className="welcome-square">✦</div><div className="welcome-triangle">Σ</div></div>
      <span className="eyebrow">A LITTLE MATH, A LOT OF MAGIC</span>
      <h1>{editing?"แก้ไขข้อมูลผู้เรียน":"ยินดีต้อนรับสู่ MathVerse"}</h1>
      <p className="welcome-sub">พื้นที่เรียนรู้คณิตศาสตร์ที่เติบโตไปพร้อมกับคุณ</p>
      <form onSubmit={onSave} className="profile-form">
        <label>ชื่อเล่น <input value={name} onChange={e=>setName(e.target.value)} placeholder="อยากให้เราเรียกคุณว่าอะไร?" maxLength="30" required/></label>
        <label>วัน / เดือน / ปีเกิด <input type="date" value={birthdate} onChange={e=>setBirthdate(e.target.value)} max={new Date().toISOString().slice(0,10)} required/></label>
        {age && <div className="age-preview"><span className="preview-icon"><CalendarDays size={19}/></span><span><small>อายุปัจจุบัน</small><strong>{age.years} ปี {age.months} เดือน</strong></span><span className="preview-level"><small>ระดับเริ่มต้น</small><strong>{rec.name}</strong></span></div>}
        <button className="primary-button" type="submit" disabled={!name.trim()||!birthdate||!age}>เริ่มต้นการเรียนรู้ <ArrowRight size={18}/></button>
        {editing&&<button type="button" className="cancel-button" onClick={onCancel}>ยกเลิก</button>}
      </form>
      <div className="privacy-note"><LockKeyhole size={13}/> ข้อมูลนี้จัดเก็บไว้ในอุปกรณ์นี้ และไม่ต้องสมัครสมาชิก</div>
    </div>
    <div className="welcome-footer">MathVerse · คิดเป็น เล่นเป็น เรียนรู้ได้ทุกวัน</div>
  </div>;
}

createRoot(document.getElementById("root")).render(<App/>);
