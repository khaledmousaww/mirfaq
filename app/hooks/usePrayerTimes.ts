"use client";

import { useEffect, useState } from "react";

type PrayerTimes = {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
};

export function usePrayerTimes(city: string = "Cairo") {
  const [times, setTimes] = useState<PrayerTimes | null>(null);

  useEffect(() => {
    fetch(
      `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Egypt&method=5&school=0`
    )
      .then((res) => res.json())
      .then((data) => {
        const t = data.data.timings;

        setTimes({
          Fajr: t.Fajr,
          Dhuhr: t.Dhuhr,
          Asr: t.Asr,
          Maghrib: t.Maghrib,
          Isha: t.Isha,
        });
      })
      .catch(() => {
        // لو النت قاطع نسيب القديمة (لو مخزنة)
        const cached = localStorage.getItem("prayerTimes");
        if (cached) {
          setTimes(JSON.parse(cached));
        }
      });
  }, [city]);

  // تخزين محلي (اختياري بس مهم)
  useEffect(() => {
    if (times) {
      localStorage.setItem("prayerTimes", JSON.stringify(times));
    }
  }, [times]);

  return times;
}
