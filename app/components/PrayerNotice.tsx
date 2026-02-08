"use client";

import { useEffect, useState } from "react";

export default function PrayerNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("prayerNoticeSeen");
    if (!seen) {
      setVisible(true);
    }
  }, []);

  const closeNotice = () => {
    localStorage.setItem("prayerNoticeSeen", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="prayer-notice">
      <div className="notice-content">
        <strong>معلومة المواقيت</strong>
        <p>
          يتم حساب مواقيت الصلاة تلقائيًا حسب <strong>القاهرة</strong> ووفق
          <strong> هيئة المساحة المصرية</strong>.
          <br />
          يمكنك تعديل ذلك لاحقًا من <strong>الإعدادات</strong>.
        </p>
      </div>

      <button className="notice-close" onClick={closeNotice}>
        ✖
      </button>
    </div>
  );
}
