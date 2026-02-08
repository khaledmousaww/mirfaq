"use client";

import { useEffect, useState } from "react";

export function useCountdown(time: string) {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    function update() {
      const now = new Date();

      const [h, m] = time.split(":").map(Number);

      const prayerTime = new Date();
      prayerTime.setHours(h, m, 0, 0);

      // لو الصلاة عدّت نحسب لليوم اللي بعده
      if (prayerTime <= now) {
        prayerTime.setDate(prayerTime.getDate() + 1);
      }

      const diff = prayerTime.getTime() - now.getTime();

      const hours = Math.floor(diff / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);

      setCountdown(`${hours}س ${minutes}د ${seconds}ث`);
    }

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [time]);

  return countdown;
}
