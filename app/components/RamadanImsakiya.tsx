"use client";

import { usePrayerTimes } from "../hooks/usePrayerTimes";

export default function RamadanImsakiya() {
  const times = usePrayerTimes();

  if (!times) {
    return (
      <div className="imsakiya-box">
        <p>جاري تحميل الإمساكية…</p>
      </div>
    );
  }

  return (
    <div className="imsakiya-box">
      <h2>🌙 إمساكية اليوم</h2>

      <div className="imsakiya-grid">
        <div className="imsakiya-card">
          <span>🌅 الفجر (الإمساك)</span>
          <strong>{times.Fajr}</strong>
        </div>

        <div className="imsakiya-card">
          <span>☀️ الظهر</span>
          <strong>{times.Dhuhr}</strong>
        </div>

        <div className="imsakiya-card">
          <span>🌤️ العصر</span>
          <strong>{times.Asr}</strong>
        </div>

        <div className="imsakiya-card maghrib">
          <span>🌇 المغرب (الإفطار)</span>
          <strong>{times.Maghrib}</strong>
        </div>

        <div className="imsakiya-card">
          <span>🌙 العشاء</span>
          <strong>{times.Isha}</strong>
        </div>
      </div>

      <style jsx>{`
        .imsakiya-box {
          background: #0f172a;
          color: #fff;
          padding: 20px;
          border-radius: 18px;
          margin-top: 20px;
          text-align: center;
        }

        .imsakiya-grid {
          margin-top: 15px;
          display: grid;
          grid-template-columns: repeat(auto-fit,minmax(120px,1fr));
          gap: 10px;
        }

        .imsakiya-card {
          background: rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 12px;
        }

        .imsakiya-card span {
          display: block;
          font-size: 14px;
          opacity: 0.8;
          margin-bottom: 4px;
        }

        .imsakiya-card strong {
          font-size: 18px;
          color: #fde68a;
        }

        .maghrib {
          background: linear-gradient(135deg,#16a34a,#065f46);
        }
      `}</style>
    </div>
  );
}
