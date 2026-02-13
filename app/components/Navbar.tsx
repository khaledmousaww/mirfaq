"use client";

import { useEffect, useState } from "react";

export default function TopBar() {

  const [dateText, setDateText] = useState("");

  useEffect(() => {
    const now = new Date();

    const formatted = now.toLocaleDateString("ar-EG", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    setDateText(formatted);
  }, []);

  return (
    <header className="top-bar">
      <div className="header-left">
        <div className="date-time">
          <p className="current-date">
            {dateText || "…"}
          </p>
        </div>
      </div>
    </header>
  );
}
