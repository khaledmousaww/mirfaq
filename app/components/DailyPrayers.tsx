"use client";

import PrayerCard from "./PrayerCard";
import { usePrayerTimes } from "../hooks/usePrayerTimes";

/*
  ترتيب الصلوات مهم
*/
const PRAYERS_ORDER = [
  { key: "Fajr", name: "الفجر" },
  { key: "Dhuhr", name: "الظهر" },
  { key: "Asr", name: "العصر" },
  { key: "Maghrib", name: "المغرب" },
  { key: "Isha", name: "العشاء" },
] as const;

/* =========================
   تحديد الصلاة القادمة
========================= */
function getNextPrayer(
  times: Record<string, string>
) {
  const now = new Date();

  for (const prayer of PRAYERS_ORDER) {
    const time = times[prayer.key];
    if (!time) continue;

    const [h, m] = time.split(":").map(Number);
    const prayerTime = new Date();
    prayerTime.setHours(h, m, 0, 0);

    if (prayerTime > now) {
      return { ...prayer, time };
    }
  }

  // لو اليوم خلص → الفجر
  return {
    ...PRAYERS_ORDER[0],
    time: times.Fajr,
  };
}

export default function DailyPrayers() {
  const times = usePrayerTimes("Cairo");

  if (!times) {
    return (
      <section className="daily-prayers">
        <h2>الصلوات اليومية</h2>
        <p style={{ textAlign: "center", opacity: 0.7 }}>
          جاري تحميل المواقيت…
        </p>
      </section>
    );
  }

  const nextPrayer = getNextPrayer(times);

  return (
    <section className="daily-prayers">
      <h2>الصلوات اليومية</h2>

      {/* الصلاة القادمة */}
      <div className="current-prayer">
        <h3>🕰️ الصلاة القادمة</h3>

        <PrayerCard
          name={nextPrayer.name}
          time={nextPrayer.time}
          prayerIndex={PRAYERS_ORDER.findIndex(
            (p) => p.key === nextPrayer.key
          )}
        />
      </div>

      {/* باقي الصلوات */}
      <div className="prayer-cards">
        {PRAYERS_ORDER.map((prayer, index) => (
          <PrayerCard
            key={prayer.key}
            name={prayer.name}
            time={times[prayer.key]}
            prayerIndex={index}
          />
        ))}
      </div>
    </section>
  );
}
