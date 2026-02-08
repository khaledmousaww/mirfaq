"use client";

import { useEffect, useState } from "react";

type Log = {
  [date: string]: {
    [prayer: string]: "prayed" | "qada";
  };
};

export function usePrayerLog() {
  const [log, setLog] = useState<Log>({});

  useEffect(() => {
    const saved = localStorage.getItem("prayerLog");
    if (saved) setLog(JSON.parse(saved));
  }, []);

  function save(prayer: string) {
    const today = new Date().toISOString().split("T")[0];

   const updated: Log = {
  ...log,
  [today]: {
    ...(log[today] || {}),
    [prayer]: "prayed",
  },
};


    setLog(updated);
    localStorage.setItem("prayerLog", JSON.stringify(updated));
  }

  function isPrayed(prayer: string) {
    const today = new Date().toISOString().split("T")[0];
    return log[today]?.[prayer] === "prayed";
  }

  return { save, isPrayed };
}
