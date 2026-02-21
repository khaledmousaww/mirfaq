"use client";

import { useEffect, useState } from "react";
import { useCountdown } from "../hooks/useCountdown";
import { usePrayerLog } from "../hooks/usePrayerLog";
import { useAfterAdhanPrompt } from "../hooks/useAfterAdhanPrompt";
import { useXP } from "../hooks/useXP";
import StarModal from "./StarModal";
import AfterAdhanModal from "./AfterAdhanModal";
import { questPrayed, updateStreak } from "../hooks/useQuestSystem";

type Props = {
  name: string;
  time: string;
  prayerIndex: number;
};

const PRAYERS = ["الفجر","الظهر","العصر","المغرب","العشاء"];

export default function PrayerCard({ name, time, prayerIndex }: Props) {

  /* ⭐ XP SYSTEM */
  const { addXP,  unlockBadge, getStats } = useXP();

  /* ===== مفاتيح اليوم ===== */
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(new Date().toISOString().split("T")[0]);
  }, []);

  const qadaKey = `qada_${name}_${today}`;

  const [isQadaDone, setIsQadaDone] = useState(false);

  useEffect(() => {
    if (!today) return;
    setIsQadaDone(localStorage.getItem(qadaKey) === "true");
  }, [qadaKey, today]);

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

  /* ===========================================
        ⭐ صليت
  =========================================== */
  function handlePrayed() {
    save(name);
    setShowStar(true);
    prompt.close();

    questPrayed();
    updateStreak();

    /* ⭐ XP بسيط لكل صلاة */
    addXP(5);

    /* ======================================
       ⭐ حساب اليوم الكامل (RPG PRO)
    ====================================== */

    const todayKey = `dayCompleted_${today}`;
    if (localStorage.getItem(todayKey)) return;

    // تحقق هل كل الصلوات تمت
    const allDone = PRAYERS.every((p)=> isPrayed(p) || p===name);

    if(allDone){
      localStorage.setItem(todayKey,"true");

      addXP(50);            // XP كبير لليوم الكامل
          // ⭐ أهم نقطة
      unlockBadge("prayer_day");
    }

    unlockBadge("first_prayer");

    window.dispatchEvent(new Event("xpUpdate"));
  }

  /* ===========================================
        ⭐ قضيت
  =========================================== */
  function handleQada() {
    if (isQadaDone) return;

    localStorage.setItem(qadaKey, "true");
    setIsQadaDone(true);
    setShowStar(true);

    addXP(10);

    const saved = localStorage.getItem("qadaData");
    if (!saved) return;

    const data = JSON.parse(saved);

    if (!data.qadaPlan?.active) return;
    if (data.missedByPrayer?.[prayerIndex] <= 0) return;

    data.missedByPrayer[prayerIndex] -= 1;
    data.missedTotal = Math.max(0, data.missedTotal - 1);

    localStorage.setItem("qadaData", JSON.stringify(data));

    window.dispatchEvent(new Event("xpUpdate"));
  }

  return (
    <>
      <div className="prayer-card">
        <h3>{name}</h3>

        <p className="prayer-time">
          {new Date(`1970-01-01T${time}:00`).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </p>

        <p className="countdown">{countdown}</p>

        <div className="prayer-buttons">
          <button
            className="prayed-btn"
            onClick={handlePrayed}
            disabled={prayed}
          >
            {prayed ? "✅ تمت" : "صليت؟"}
          </button>

          <button
            className="qada-btn"
            onClick={handleQada}
            disabled={isQadaDone}
          >
            {isQadaDone ? "✅ تم القضاء" : "قضيت؟"}
          </button>
        </div>
      </div>

      <StarModal open={showStar} onClose={() => setShowStar(false)} />

      <AfterAdhanModal
        open={prompt.show}
        prayerName={name}
        onPrayed={handlePrayed}
        onClose={prompt.close}
      />
    </>
  );
}
