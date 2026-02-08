"use client";

import { useEffect, useState } from "react";

export default function TopBar() {
  const [now, setNow] = useState(new Date());
  const [dark, setDark] = useState(false);
  const [simple, setSimple] = useState(false);
  const [focus, setFocus] = useState(false);

  // تحديث الوقت
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // تحميل الإعدادات من localStorage
  useEffect(() => {
    setDark(localStorage.getItem("darkMode") === "true");
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
    localStorage.setItem("darkMode", String(dark));
  }, [dark]);

  const gregorian = now.toLocaleDateString("ar-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const hijri = now.toLocaleDateString("ar-SA-u-ca-islamic", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="top-bar">
      <div className="header-left">
        <div className="date-time">
          <p className="current-date">
            {gregorian} | {hijri}
          </p>
          <p className="current-time">
            {now.toLocaleTimeString("ar-EG")}
          </p>
        </div>

        <div className="header-buttons">
          <button onClick={() => setDark(!dark)}>🌙 الوضع الليلي</button>
          <button onClick={() => setSimple(!simple)}>🔹 Simple Mode</button>
          <button onClick={() => setFocus(!focus)}>🎯 Focus Mode</button>
        </div>
      </div>

      <div className="header-right">
        <img src="test.png" alt="صورة دينية" className="religious-img" />
        <p className="slogan">مِرفاق.. خيرُ رفيقٍ لخيرِ طريق.</p>
      </div>
    </header>
  );
}
