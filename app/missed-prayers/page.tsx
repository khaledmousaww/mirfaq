"use client";

import { useEffect, useState } from "react";
import MissedNavbar from "../components/MissedNavbar";
import MissedFooter from "../components/MissedFooter";
import "./missed-prayers.css";

/* ===== ثوابت ===== */

const STORAGE_KEY = "qadaData";

const PRAYERS = ["الفجر", "الظهر", "العصر", "المغرب", "العشاء"];

const MODES = [
  { label: "انقطاع تام", value: 1 },
  { label: "تقصير شديد", value: 0.8 },
  { label: "تقصير متوسط", value: 0.5 },
  { label: "تقصير بسيط", value: 0.2 },
];

type ViewMode = "calculator" | "plan";

export default function MissedPrayersPage() {
  /* ===== الحالة ===== */

  const [view, setView] = useState<ViewMode>("calculator");

  const [age, setAge] = useState(0);
  const [pubertyAge, setPubertyAge] = useState(13);
  const [commitYears, setCommitYears] = useState(0);
  const [gender, setGender] = useState("male");

  const [nonPrayerDays, setNonPrayerDays] = useState(0); // للإناث

  const [modeRate, setModeRate] = useState(1);
  const [fiqhMode, setFiqhMode] = useState<"easy" | "safe">("safe");

  const [total, setTotal] = useState(0);
  const [initialTotal, setInitialTotal] = useState(0);
  const [missedByPrayer, setMissedByPrayer] = useState<number[]>([]);

  const [motivation, setMotivation] = useState("");

  /* ===== تحميل البيانات ===== */

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    const data = JSON.parse(saved);

    setTotal(data.missedTotal ?? 0);
    setInitialTotal(data.initialTotal ?? 0);
    setMissedByPrayer(data.missedByPrayer ?? []);
    setView(data.qadaPlan?.active ? "plan" : "calculator");
  }, []);

  /* ===== الحساب ===== */

  function calculate() {
    let negligenceYears = age - pubertyAge - commitYears;

    if (negligenceYears < 0) negligenceYears = 0;

    let grossDays = negligenceYears * 365.25;

    if (gender === "female") {
      const annualExclude = nonPrayerDays * 12;
      grossDays -= annualExclude * negligenceYears;
    }

    let targetDays = grossDays * modeRate;

    // التيسير أو الأحوط
    if (fiqhMode === "safe") {
      targetDays = Math.ceil(targetDays);
    } else {
      targetDays = Math.floor(targetDays);
    }

    const result = Math.max(0, Math.round(targetDays));

    setTotal(result);
    setInitialTotal(result);

    const data = {
      missedTotal: result,
      initialTotal: result,
      qadaPlan: { active: false },
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  /* ===== بدء الخطة ===== */

  function startPlan() {
    const perPrayer = total;

    const data = {
      missedTotal: total * 5,
      initialTotal: total * 5,
      missedByPrayer: PRAYERS.map(() => perPrayer),
      qadaPlan: { active: true },
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    setMissedByPrayer(data.missedByPrayer);
    setTotal(data.missedTotal);
    setInitialTotal(data.initialTotal);

    setView("plan");
  }

  /* ===== خصم صلاة ===== */

  function handleQada(index: number) {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

    if (!saved.qadaPlan?.active) return;

    const updated = [...saved.missedByPrayer];

    if (updated[index] <= 0) return;

    updated[index] -= 1;
    saved.missedTotal -= 1;
    saved.missedByPrayer = updated;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));

    setMissedByPrayer(updated);
    setTotal(saved.missedTotal);

    const msgs = [
      "🔥 ممتاز.. استمر",
      "✨ خطوة نور",
      "🤍 ربنا يتقبل",
      "🚀 قربت توصل",
    ];

    setMotivation(msgs[Math.floor(Math.random() * msgs.length)]);
  }

  /* ===== إعادة الحساب ===== */

  function resetAll() {
    localStorage.removeItem(STORAGE_KEY);
    setView("calculator");
    setTotal(0);
    setMissedByPrayer([]);
  }

  const progress =
    initialTotal > 0
      ? Math.round(((initialTotal - total) / initialTotal) * 100)
      : 0;

  return (
    <>
      <MissedNavbar />

      <main className="missed-container missed-page">
        <h1>قضاء الصلوات</h1>

        {/* ================= الحساب ================= */}

        {view === "calculator" && (
          <div className="calculator-box">
            <label>السن الحالي:</label>
            <input
              value={age || ""}
              inputMode="numeric"
              onChange={(e) =>
                setAge(Number(e.target.value.replace(/\D/g, "")))
              }
            />

            <label>سن البلوغ:</label>
            <input
              value={pubertyAge || ""}
              inputMode="numeric"
              onChange={(e) =>
                setPubertyAge(Number(e.target.value.replace(/\D/g, "")))
              }
            />

            <label>سنوات الالتزام:</label>
            <input
              value={commitYears || ""}
              inputMode="numeric"
              onChange={(e) =>
                setCommitYears(Number(e.target.value.replace(/\D/g, "")))
              }
            />

            <label>النوع:</label>
            <select onChange={(e) => setGender(e.target.value)}>
              <option value="male">ذكر</option>
              <option value="female">أنثى</option>
            </select>

            {gender === "female" && (
              <>
                <label>الأيام غير المكلّفة بالصلاة شهريًا:</label>
                <input
                  inputMode="numeric"
                  value={nonPrayerDays || ""}
                  onChange={(e) =>
                    setNonPrayerDays(
                      Number(e.target.value.replace(/\D/g, ""))
                    )
                  }
                />
              </>
            )}

            <label>نمط التقصير:</label>
            <select onChange={(e) => setModeRate(Number(e.target.value))}>
              {MODES.map((m) => (
                <option key={m.label} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>

            <label>طريقة الحساب الفقهي:</label>
            <select onChange={(e) => setFiqhMode(e.target.value as any)}>
              <option value="safe">الأحوط (الأكثر)</option>
              <option value="easy">التيسير (الأقل)</option>
            </select>

            <button onClick={calculate}>احسب الصلوات</button>

            {total > 0 && (
              <>
                <p>
                  عدد الأيام التقريبية: <strong>{total}</strong>
                </p>
                <button onClick={startPlan}>ابدأ خطة القضاء</button>
              </>
            )}
          </div>
        )}

        {/* ================= الخطة ================= */}

        {view === "plan" && (
          <>
            <div className="plan-header">
              <h2>الخطة الجارية</h2>
              <button onClick={resetAll}>إعادة الحساب</button>
            </div>

            <div className="progress-wrapper">
              <div className="progress-label">التقدم {progress}%</div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="qada-cards">
              {PRAYERS.map((p, i) => (
                <div key={p} className="qada-card">
                  <strong>{p}</strong>
                  <p>المتبقي: {missedByPrayer[i]}</p>

                  <button
                    onClick={() => handleQada(i)}
                    disabled={missedByPrayer[i] === 0}
                  >
                    تم القضاء
                  </button>
                </div>
              ))}
            </div>

            <div className="motivation-text">
              {total === 0
                ? "🎉 تقبّل الله منك"
                : motivation || "🌱 استمر… أنت على الطريق"}
            </div>
          </>
        )}
      </main>

      <MissedFooter />
    </>
  );
}
