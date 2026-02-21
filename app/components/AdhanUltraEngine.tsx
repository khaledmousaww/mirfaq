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
  /* ⭐ FIX TYPE ERROR نهائياً */
  const prayer: any = usePrayerTimes();
  const times = prayer?.times || null;

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [nextPrayer, setNextPrayer] = useState("");
  const [countdown, setCountdown] = useState("");

  /* =============================
        🔊 تشغيل الصوت
  ==============================*/
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
  ==============================*/
  function calcNext() {
    if (!times) return;

    const now = new Date();

    const list = Object.entries(times).map(([name, time]: any) => {
      const [h, m] = time.split(":").map(Number);
      const date = new Date();
      date.setHours(h, m, 0, 0);
      return { name, date };
    });

    const upcoming =
      list.find((p: any) => p.date.getTime() > now.getTime()) || list[0];

    setNextPrayer(upcoming.name);

    const diff = upcoming.date.getTime() - now.getTime();

    const min = Math.floor(diff / 60000);
    const sec = Math.floor((diff % 60000) / 1000);

    setCountdown(`${min}m ${sec}s`);
  }

  /* =============================
        🧠 فحص الأذان
  ==============================*/
  function checkAdhan() {
    if (!times) return;

    const settings: Settings =
      JSON.parse(localStorage.getItem("adhanSettings") || "null") ||
      DEFAULT_SETTINGS;

    const now = new Date();

    const hh = now.getHours().toString().padStart(2, "0");
    const mm = now.getMinutes().toString().padStart(2, "0");

    const current = `${hh}:${mm}`;

    Object.entries(times).forEach(([name, time]: any) => {
      const prayerSettings = settings.prayers[name];
      if (!prayerSettings?.enabled) return;

      if (current === time) {
        play(prayerSettings.sound);
      }

      const [h, m] = time.split(":").map(Number);
      const pre = new Date();
      pre.setHours(h, m - settings.preAdhan, 0, 0);

      const preHH = pre.getHours().toString().padStart(2, "0");
      const preMM = pre.getMinutes().toString().padStart(2, "0");

      if (current === `${preHH}:${preMM}`) {
        new Notification("اقترب موعد الصلاة 🕌");
      }
    });
  }

  /* =============================
        🔥 ENGINE LOOP
  ==============================*/
  useEffect(() => {
    const loop = setInterval(() => {
      calcNext();
      checkAdhan();
    }, 15000);

    return () => clearInterval(loop);
  }, [times]);

  return null;
}