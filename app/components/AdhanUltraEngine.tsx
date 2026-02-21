"use client";

import { useEffect, useRef, useState } from "react";
import { usePrayerTimes } from "../hooks/usePrayerTimes";

/* ===========================================
        🕌 ULTRA ADHAN ENGINE
=========================================== */

type Settings = {
  volume: number;
  preAdhan: number;
  prayers: {
    [key: string]: {
      enabled: boolean;
      sound: string;
    };
  };
};

const DEFAULT_SETTINGS: Settings = {
  volume: 0.8,
  preAdhan: 5,
  prayers: {
    fajr: { enabled: true, sound: "makkah" },
    dhuhr: { enabled: true, sound: "madinah" },
    asr: { enabled: true, sound: "makkah" },
    maghrib: { enabled: true, sound: "madinah" },
    isha: { enabled: true, sound: "makkah" },
  },
};

export default function AdhanUltraEngine() {
  /* =============================
        🧠 Prayer Times
  ============================== */

  const prayer = usePrayerTimes();
  const times = (prayer as any)?.times ?? null; // ⭐ Fix TypeScript Error

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [nextPrayer, setNextPrayer] = useState("");
  const [countdown, setCountdown] = useState("");

  /* =============================
        🔊 تشغيل الصوت
  ============================== */
  function play(sound: string) {
    const settings: Settings =
      JSON.parse(localStorage.getItem("adhanSettings") || "null") ||
      DEFAULT_SETTINGS;

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(`/adhan/${sound}.mp3`);
    audio.volume = settings.volume ?? 0.8;

    audio.play().catch(() => {});

    audioRef.current = audio;
  }

  /* =============================
        ⏳ حساب أقرب صلاة
  ============================== */
  function calcNext() {
    if (!times) return;

    const now = new Date();

    const list = Object.entries(times).map(([name, time]) => {
      const [h, m] = (time as string).split(":").map(Number);
      const date = new Date();
      date.setHours(h, m, 0, 0);

      return { name, date };
    });

    const upcoming =
      list.find((p) => p.date.getTime() > now.getTime()) || list[0];

    setNextPrayer(upcoming.name);

    const diff = upcoming.date.getTime() - now.getTime();

    const min = Math.floor(diff / 60000);
    const sec = Math.floor((diff % 60000) / 1000);

    setCountdown(`${min}m ${sec}s`);
  }

  /* =============================
        🧠 فحص الأذان
  ============================== */
  function checkAdhan() {
    if (!times) return;

    const settings: Settings =
      JSON.parse(localStorage.getItem("adhanSettings") || "null") ||
      DEFAULT_SETTINGS;

    const now = new Date();

    const hh = now.getHours().toString().padStart(2, "0");
    const mm = now.getMinutes().toString().padStart(2, "0");

    const current = `${hh}:${mm}`;

    Object.entries(times).forEach(([name, time]) => {
      const prayerSettings = settings.prayers[name];
      if (!prayerSettings?.enabled) return;

      /* 🔔 وقت الأذان */
      if (current === time) {
        play(prayerSettings.sound);
      }

      /* ⭐ Pre Adhan */
      const [h, m] = (time as string).split(":").map(Number);

      const pre = new Date();
      pre.setHours(h, m - settings.preAdhan, 0, 0);

      const preHH = pre.getHours().toString().padStart(2, "0");
      const preMM = pre.getMinutes().toString().padStart(2, "0");

      if (current === `${preHH}:${preMM}`) {
        if (Notification.permission === "granted") {
          new Notification("اقترب موعد الصلاة 🕌");
        }
      }
    });
  }

  /* =============================
        🔥 ENGINE LOOP
  ============================== */
  useEffect(() => {
    if (!times) return;

    const loop = setInterval(() => {
      calcNext();
      checkAdhan();
    }, 15000);

    return () => clearInterval(loop);
  }, [prayer]); // ⭐ Fix Hydration + Typescript

  /* UI خفي */
  return null;
}