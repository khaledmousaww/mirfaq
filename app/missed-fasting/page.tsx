"use client";

import { useEffect, useState } from "react";
import MissedNavbar from "../components/MissedNavbar";
import MissedFooter from "../components/MissedFooter";
import "./missed-fasting.css";

const STORAGE_KEY = "fastingData";

type ViewMode = "calculator" | "plan";

const MOTIVATION = [
  "🌱 خطوة صغيرة النهارده، راحة كبيرة بكرة",
  "🤍 ربنا شايف نيتك قبل تعبك",
  "💪 الاستمرار أعظم من الكثرة",
  "🌙 يوم صيام يقربك أكتر",
  "✨ اللي بدأته النهارده هيشفعلك بكرة",
];

export default function MissedFastingPage() {
  const [view, setView] = useState<ViewMode>("calculator");

  const [mode, setMode] = useState<"none" | "months" | "days">("none");
  const [months, setMonths] = useState(0);
  const [customDays, setCustomDays] = useState(0);

  const [total, setTotal] = useState(0);
  const [initialTotal, setInitialTotal] = useState(0);
  const [message, setMessage] = useState("");

  /* ===== تحميل ===== */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    const data = JSON.parse(saved);
    setMode(data.mode ?? "none");
    setMonths(data.months ?? 0);
    setCustomDays(data.customDays ?? 0);
    setTotal(data.missedTotal ?? 0);
    setInitialTotal(data.initialTotal ?? 0);
    setView(data.plan?.active ? "plan" : "calculator");
  }, []);

  /* ===== حساب ===== */
  const calculate = () => {
    let missed = 0;

    if (mode === "none") {
      missed = months * 30;
    }

    if (mode === "months") {
      missed = months * 30;
    }

    if (mode === "days") {
      missed = customDays;
    }

    const data = {
      mode,
      months,
      customDays,
      missedTotal: missed,
      initialTotal: missed,
      plan: { active: false },
    };

    setTotal(missed);
    setInitialTotal(missed);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  /* ===== بدء الخطة ===== */
  const startPlan = () => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    saved.plan.active = true;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    setView("plan");
  };

  /* ===== صمت اليوم ===== */
  const fastToday = () => {
    if (total <= 0) return;

    const newTotal = total - 1;
    setTotal(newTotal);
    setMessage(MOTIVATION[Math.floor(Math.random() * MOTIVATION.length)]);

    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    saved.missedTotal = newTotal;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  };

  /* ===== إعادة الخطة ===== */
  const resetPlan = () => {
    localStorage.removeItem(STORAGE_KEY);
    setView("calculator");
    setTotal(0);
    setInitialTotal(0);
    setMonths(0);
    setCustomDays(0);
  };

  return (
    <>
      <MissedNavbar />

      <main className="fasting-page">
        <h1>قضاء الصيام</h1>

        {/* ===== الحاسبة ===== */}
        {view === "calculator" && (
          <div className="box">
            <label>حالتك مع الصيام:</label>
            <select value={mode} onChange={(e) => setMode(e.target.value as any)}>
              <option value="none">لم أكن أصوم</option>
              <option value="months">فاتني الصيام في شهور</option>
              <option value="days">أعرف عدد الأيام</option>
            </select>

            {(mode === "none" || mode === "months") && (
              <>
                <label>عدد الشهور التقريبي:</label>
                <input
                  inputMode="numeric"
                  placeholder="مثال: 4"
                  value={months === 0 ? "" : months}
                  onChange={(e) =>
                    setMonths(Number(e.target.value.replace(/\D/g, "")))
                  }
                />
              </>
            )}

            {mode === "days" && (
              <>
                <label>عدد أيام الصيام الفائتة:</label>
                <input
                  inputMode="numeric"
                  placeholder="مثال: 120"
                  value={customDays === 0 ? "" : customDays}
                  onChange={(e) =>
                    setCustomDays(Number(e.target.value.replace(/\D/g, "")))
                  }
                />
              </>
            )}

            {/* ===== النص الفقهي ===== */}
            <div className="fiqh-tip">
              <strong>📌 مسألة فقهية: الشك في عدد أيام القضاء</strong>

              <p>
                <b>أولًا: مذهب الاحتياط (رأي جمهور الفقهاء)</b><br />
                إذا ترددت بين عددين، فالأحوط الأخذ بالأكثر؛
                لأن الذمة لا تبرأ إلا بيقين.
              </p>

              <p className="example">
                مثال: إن شككت هل عليك 5 أو 6 أيام، فتصوم 6 أيام.
              </p>

              <p>
                <b>ثانيًا: مذهب التيسير (قول معتبر)</b><br />
                اليقين لا يزول بالشك، والأصل براءة الذمة،
                فيُبنى على العدد الأقل المتيقن.
              </p>

              <p className="example">
                مثال: إن شككت بين 5 أو 6 أيام، فتصوم 5.
              </p>

              <p style={{ marginTop: 8 }}>
                🔹 اختر ما يطمئن له قلبك، ولا حرج إن شاء الله.
              </p>
            </div>

            <button onClick={calculate}>احسب الصيام الفائت</button>

            {total > 0 && (
              <>
                <p>
                  إجمالي الأيام: <strong>{total}</strong>
                </p>
                <button onClick={startPlan}>ابدأ خطة القضاء</button>
              </>
            )}
          </div>
        )}

        {/* ===== الخطة ===== */}
        {view === "plan" && (
          <div className="box">
            <h2>خطة قضاء الصيام</h2>
            <p>المتبقي: {total} يوم</p>

            {total > 0 && (
              <button className="primary" onClick={fastToday}>
                🌙 صمت اليوم
              </button>
            )}

            {message && <p className="motivation">{message}</p>}

            <button className="reset" onClick={resetPlan}>
              إعادة الحساب من البداية
            </button>
          </div>
        )}
      </main>

      <MissedFooter />
    </>
  );
}
