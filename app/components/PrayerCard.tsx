"use client";

import { useState } from "react";
import { useCountdown } from "../hooks/useCountdown";
import { usePrayerLog } from "../hooks/usePrayerLog";
import { useAfterAdhanPrompt } from "../hooks/useAfterAdhanPrompt";

import StarModal from "./StarModal";
import AfterAdhanModal from "./AfterAdhanModal";

type Props = {
  name: string;
  time: string;        // HH:mm
  prayerIndex: number; // 0..4
};

export default function PrayerCard({ name, time, prayerIndex }: Props) {
  /* ===== مفاتيح اليوم ===== */
  const today = new Date().toISOString().split("T")[0];
  const qadaKey = `qada_${name}_${today}`;
  const isQadaDone =
    typeof window !== "undefined" &&
    localStorage.getItem(qadaKey) === "true";

  /* ===== العد التنازلي ===== */
  const countdown = useCountdown(time);

  /* ===== سجل الصلاة ===== */
  const { save, isPrayed } = usePrayerLog();
  const prayed = isPrayed(name);

  /* ===== نجمة التشجيع ===== */
  const [showStar, setShowStar] = useState(false);

  /* ===== انبثاق بعد الأذان ===== */
  const prompt = useAfterAdhanPrompt({
    prayerName: name,
    prayerTime: time,
    isPrayed: prayed,
  });

  /* ===== صليت ===== */
  function handlePrayed() {
    save(name);
    setShowStar(true);
    prompt.close();
  }

  /* ===== قضيت (خصم من الخطة لو موجودة) ===== */
  function handleQada() {
    // علّم الزر لليوم
    localStorage.setItem(qadaKey, "true");

    // ⭐ نجمة تشجيع
    setShowStar(true);

    const saved = localStorage.getItem("qadaData");
    if (!saved) return;

    const data = JSON.parse(saved);

    // لو مفيش خطة قضاء شغالة
    if (!data.qadaPlan?.active) return;

    // لو مفيش متبقي
    if (data.missedByPrayer?.[prayerIndex] <= 0) return;

    // خصم صلاة واحدة
    data.missedByPrayer[prayerIndex] -= 1;
    data.missedTotal = Math.max(0, data.missedTotal - 1);

    localStorage.setItem("qadaData", JSON.stringify(data));
  }

  return (
    <>
      <div className="prayer-card">
        <h3>{name}</h3>

        {/* وقت الصلاة (12 ساعة – للعرض فقط) */}
        <p className="prayer-time">
          {new Date(`1970-01-01T${time}:00`).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </p>

        {/* العد التنازلي */}
        <p className="countdown">{countdown}</p>

        {/* الأزرار */}
        <div className="prayer-buttons">
          <button
            className="prayed-btn"
            onClick={handlePrayed}
            disabled={prayed}
          >
            {prayed ? "✅ تمت" : "صليت"}
          </button>

          <button
            className="qada-btn"
            onClick={handleQada}
            disabled={isQadaDone}
          >
            {isQadaDone ? "✅ تم القضاء" : "قضيت"}
          </button>
        </div>
      </div>

      {/* ⭐ نجمة التشجيع */}
      <StarModal
        open={showStar}
        onClose={() => setShowStar(false)}
      />

      {/* ⏰ هل صليت بعد الأذان */}
      <AfterAdhanModal
        open={prompt.show}
        prayerName={name}
        onPrayed={handlePrayed}
        onClose={prompt.close}
      />
    </>
  );
}
