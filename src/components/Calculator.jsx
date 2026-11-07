
import React, { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Camera,
  ImagePlus,
  RefreshCw,
  X,
  Sparkles,
  LockKeyhole,
} from "lucide-react";

import { playTap, playStart } from "../utils/sounds";

export default function Calculator({ onBack }) {
  const fileInputRef = useRef(null);

  const [image, setImage] = useState(null);

  // ล้าง URL ของรูปเมื่อเปลี่ยนรูปหรือออกจากหน้านี้
  useEffect(() => {
    return () => {
      if (image?.url) {
        URL.revokeObjectURL(image.url);
      }
    };
  }, [image]);

  // เลือกรูปจากกล้องหรืออุปกรณ์
  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("กรุณาเลือกไฟล์รูปภาพ");
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setImage({
      file,
      url: imageUrl,
    });

    playStart();

    // ให้สามารถเลือกรูปเดิมซ้ำได้
    event.target.value = "";
  };

  const openCamera = () => {
    playTap();
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    playTap();
    setImage(null);
  };

  return (
    <div className="calculator-page">

      {/* Header */}
      <header className="calculator-header">
        <button
          className="calculator-back"
          onClick={onBack}
          aria-label="กลับหน้าหลัก"
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <span className="calculator-eyebrow">
            MATHVERSE · SMART SOLVER
          </span>
          <h1>เครื่องคิดเลขอัจฉริยะ</h1>
        </div>
      </header>

      {/* Introduction */}
      <section className="calculator-intro">
        <h2>ถ่ายรูปโจทย์ แล้วมาแก้ไปด้วยกัน!</h2>
        <p>
          ไม่ว่าจะเป็นโจทย์คณิตศาสตร์แบบไหน
          เราจะช่วยให้เข้าใจวิธีคิดมากขึ้น
        </p>
      </section>

      {/* Mascot */}
      <section className="calculator-mascot-tip">
        <div className="calculator-mascot">
          ✦
        </div>

        <div>
          <strong>น้องมิวบอกว่า...</strong>
          <p>
            ลองถ่ายรูปโจทย์ให้ชัดเจนนะ
            เดี๋ยวเรามาช่วยกันหาคำตอบ!
          </p>
        </div>
      </section>

      {/* Camera upload */}
      <section className="calculator-scan-card">

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleImageChange}
          hidden
        />

        {!image ? (
          <div className="calculator-empty">
            <div className="calculator-camera-icon">
              <Camera size={42} />
            </div>

            <h2>ถ่ายรูปโจทย์คณิตศาสตร์</h2>

            <p>
              วางโจทย์ให้อยู่ในภาพ
              แล้วถ่ายให้เห็นตัวเลขชัดเจน
            </p>
          </div>
        ) : (
          <div className="calculator-image-preview">
            <img
              src={image.url}
              alt="รูปโจทย์คณิตศาสตร์ที่เลือก"
            />

            <button
              className="calculator-remove-image"
              onClick={removeImage}
              aria-label="ลบรูปภาพ"
            >
              <X size={20} />
            </button>
          </div>
        )}

        <button
          className="calculator-camera-button"
          onClick={openCamera}
        >
          {image ? (
            <>
              <RefreshCw size={20} />
              เปลี่ยนรูปโจทย์
            </>
          ) : (
            <>
              <Camera size={21} />
              เปิดกล้องถ่ายโจทย์
            </>
          )}
        </button>

        <button
          className="calculator-gallery-button"
          onClick={openCamera}
        >
          <ImagePlus size={18} />
          หรือเลือกรูปจากอุปกรณ์
        </button>

        {image && (
          <div className="calculator-processing-note">
            <LockKeyhole size={16} />
            ระบบอ่านและวิเคราะห์โจทย์กำลังพัฒนา
          </div>
        )}
      </section>

      {/* Future AI feature */}
      <section className="calculator-ai-card">
        <div className="calculator-ai-icon">
          <Sparkles size={22} />
        </div>

        <div>
          <strong>AI ช่วยวิเคราะห์โจทย์ข้อความ</strong>
          <p>
            สำหรับโจทย์ปัญหา โจทย์คำถาม
            และโจทย์ที่ไม่ใช่สมการ
          </p>
          <span>กำลังพัฒนา · ยังไม่เปิดใช้งาน</span>
        </div>
      </section>

    </div>
  );
}
