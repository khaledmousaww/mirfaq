"use client";

import { useEffect, useState } from "react";

type Params = {
  prayerName: string;
  prayerTime: string; // HH:mm
  isPrayed: boolean;
};

export function useAfterAdhanPrompt({
  prayerName,
  prayerTime,
  isPrayed,
}: Params) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!prayerTime || isPrayed) return;

    const [h, m] = prayerTime.split(":").map(Number);
    const adhan = new Date();
    adhan.setHours(h, m, 0, 0);

    // +15 دقيقة
    const promptTime = new Date(adhan.getTime() + 15 * 60 * 1000);
    const now = new Date();

    let delay = promptTime.getTime() - now.getTime();
    if (delay < 0) return;

    const timer = setTimeout(() => {
      setShow(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [prayerTime, isPrayed, prayerName]);

  function close() {
    setShow(false);
  }

  return { show, close };
}
