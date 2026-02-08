"use client";
import { useEffect, useState } from "react";
import MissedNavbar from "../components/MissedNavbar";
import MissedFooter from "../components/MissedFooter";
import "./missed-prayers.css";

/* ===== ثوابت ===== */
const STORAGE_KEY = "qadaData";
const PRAYERS = ["الفجر", "الظهر", "العصر", "المغرب", "العشاء"];
const PRAYERS_PER_DAY = 5;
const DAYS_PER_YEAR = 365;
const MAX_YEARS = 80;
const DEFAULT_PLAN_DAYS = 365;

const MOTIVATION = [
  "🌱 لا تنظر لكثرة ما فات، بل لصدق ما بدأ.",
  "⭐ كل صلاة خطوة نور.",
  "🤍 الطريق طويل، لكنك بدأت.",
  "🕊️ الله لا يضيع مجهود الصادقين.",
  "☀️ استمر، فالأجر أمامك.",
];

type ViewMode = "calculator" | "plan";

export default function MissedPrayersPage() {
  /* ===== وضع الصفحة ===== */
  const [view, setView] = useState<ViewMode>("calculator");

  /* ===== إدخالات ===== */
  const [years, setYears] = useState(0);
  const [mode, setMode] = useState("none");
  const [dailyPrayed, setDailyPrayed] = useState(0);
  const [yearRatio, setYearRatio] = useState(0);

  /* ===== نتائج ===== */
  const [total, setTotal] = useState(0);
  const [initialTotal, setInitialTotal] = useState(0);
  const [byPrayer, setByPrayer] = useState<number[]>([]);
  const [motivation, setMotivation] = useState("");

  /* ===== الخطة ===== */
  const [planDays, setPlanDays] = useState<number | null>(null);
  const [autoSuggested, setAutoSuggested] = useState(false);

  const dailyTarget =
    planDays && total > 0 ? Math.ceil(total / planDays) : null;

  /* ===== إنجاز اليوم ===== */
  const [todayDone, setTodayDone] = useState(0);
  const todayKey = new Date().toISOString().slice(0, 10);

  /* ===== تحميل ===== */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    const data = JSON.parse(saved);

    setYears(data.years ?? 0);
    setMode(data.mode ?? "none");
    setDailyPrayed(data.dailyPrayed ?? 0);
    setYearRatio(data.yearRatio ?? 0);
    setTotal(data.missedTotal ?? 0);
    setInitialTotal(data.initialTotal ?? data.missedTotal ?? 0);
    setByPrayer(data.missedByPrayer ?? []);
    setPlanDays(data.planDays ?? null);
    setView(data.qadaPlan?.active ? "plan" : "calculator");

    if (data.todayKey === todayKey) {
      setTodayDone(data.todayDone ?? 0);
    } else {
      setTodayDone(0);
    }

    if (data.qadaPlan?.active && !data.planDays) {
      setPlanDays(DEFAULT_PLAN_DAYS);
      setAutoSuggested(true);
      data.planDays = DEFAULT_PLAN_DAYS;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    setMotivation(MOTIVATION[Math.floor(Math.random() * MOTIVATION.length)]);
  }, []);

  /* ===== حساب ===== */
  const calculate = () => {
    let missed = 0;

    if (mode === "none") {
      missed = years * DAYS_PER_YEAR * PRAYERS_PER_DAY;
    } else if (mode === "sometimes") {
      missed =
        years *
        DAYS_PER_YEAR *
        Math.max(0, PRAYERS_PER_DAY - dailyPrayed);
    } else {
      missed =
        years *
        DAYS_PER_YEAR *
        PRAYERS_PER_DAY *
        yearRatio;
    }

    const result = Math.round(missed);
    const perPrayer = Math.round(result / PRAYERS_PER_DAY);

    const data = {
      years,
      mode,
      dailyPrayed,
      yearRatio,
      missedTotal: result,
      initialTotal: result,
      missedByPrayer: PRAYERS.map(() => perPrayer),
      qadaPlan: { active: false },
    };

    setTotal(result);
    setInitialTotal(result);
    setByPrayer(data.missedByPrayer);
    setMotivation(MOTIVATION[Math.floor(Math.random() * MOTIVATION.length)]);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  /* ===== بدء الخطة ===== */
  const startPlan = () => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    saved.qadaPlan = { active: true };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    setView("plan");
  };

  /* ===== قضاء ===== */
  const doQada = (index: number) => {
    if (byPrayer[index] === 0) return;

    const updated = [...byPrayer];
    updated[index] -= 1;

    const newTotal = Math.max(0, total - 1);

    setByPrayer(updated);
    setTotal(newTotal);
    setTodayDone((p) => p + 1);

    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    saved.missedByPrayer = updated;
    saved.missedTotal = newTotal;
    saved.todayDone = (saved.todayDone ?? 0) + 1;
    saved.todayKey = todayKey;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  };

  /* ===== Reset ===== */
  const resetAll = () => {
    localStorage.removeItem(STORAGE_KEY);
    setView("calculator");
    setTotal(0);
    setInitialTotal(0);
    setByPrayer([]);
    setPlanDays(null);
    setTodayDone(0);
    setAutoSuggested(false);
  };

  const progress =
    initialTotal > 0
      ? Math.round(((initialTotal - total) / initialTotal) * 100)
      : 0;

  return (
    <>
      <MissedNavbar />

      <main className="missed-container missed-page">
        <h1>الصلوات الفائتة</h1>

        {/* ===== الحاسبة ===== */}
        {view === "calculator" && (
          <div className="calculator-box">
            <label>عدد السنوات:</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="مثال: 5"
              value={years === 0 ? "" : years}
              onChange={(e) => {
                const v = e.target.value.replace(/\D/g, "");
                const n = v ? Number(v) : 0;
                setYears(n > MAX_YEARS ? MAX_YEARS : n);
              }}
            />

            <label>حالتك مع الصلاة:</label>
            <select value={mode} onChange={(e) => setMode(e.target.value)}>
              <option value="none">لم أكن أصلي</option>
              <option value="sometimes">أصلي أحيانًا</option>
              <option value="periods">أصلي فترة وأترك فترة</option>
            </select>

            {mode === "sometimes" && (
              <>
                <label>كنت تصلي كام صلاة يوميًا؟</label>
                <select
                  value={dailyPrayed}
                  onChange={(e) => setDailyPrayed(+e.target.value)}
                >
                  <option value={1}>صلاة واحدة</option>
                  <option value={2}>صلاتين</option>
                  <option value={3}>ثلاث صلوات</option>
                  <option value={4}>أربع صلوات</option>
                </select>
              </>
            )}

            {mode === "periods" && (
              <>
                <label>كنت تصلي قد إيه من السنة؟</label>
                <select
                  value={yearRatio}
                  onChange={(e) => setYearRatio(+e.target.value)}
                >
                  <option value={0.25}>ربع السنة</option>
                  <option value={0.5}>نصف السنة</option>
                  <option value={0.75}>ثلاثة أرباع السنة</option>
                </select>
              </>
            )}

            <button onClick={calculate}>احسب الصلوات الفائتة</button>

            {total > 0 && (
              <>
                <p>إجمالي الصلوات: <strong>{total}</strong></p>
                <div className="motivation-text">{motivation}</div>
                <button onClick={startPlan}>ابدأ خطة القضاء</button>
              </>
            )}
          </div>
        )}

        {/* ===== الخطة ===== */}
        {view === "plan" && (
          <>
            <div className="plan-header">
              <h2>خطة القضاء الجارية</h2>
              <button className="reset-btn" onClick={resetAll}>
                تعديل الحساب
              </button>
            </div>

            <div className="progress-wrapper">
              <div className="progress-label">التقدم: {progress}%</div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="calculator-box">
              <label>مدة الخطة:</label>
              <select
                value={planDays ?? ""}
                onChange={(e) => {
                  const d = +e.target.value;
                  setPlanDays(d);
                  setAutoSuggested(false);

                  const s = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
                  s.planDays = d;
                  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
                }}
              >
                <option value={365}>سنة</option>
                <option value={730}>سنتين</option>
                <option value={1095}>3 سنوات</option>
                <option value={1278}>3 سنين ونص</option>
                <option value={1460}>4 سنوات</option>
              </select>

              {autoSuggested && (
                <div className="motivation-text" style={{ opacity: 0.8 }}>
                  📌 تم اقتراح خطة سنة تلقائيًا – يمكنك تغييرها
                </div>
              )}

              <div className="motivation-text">
                📅 ستقضي يوميًا {dailyTarget} صلوات
                <br />
                ✅ أنجزت اليوم: {todayDone} / {dailyTarget}
              </div>
            </div>

            <div className="qada-cards">
              {PRAYERS.map((p, i) => (
                <div key={p} className="qada-card">
                  <strong>{p}</strong>
                  <p>المتبقي: {byPrayer[i]}</p>
                  <button onClick={() => doQada(i)}>تم القضاء</button>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      <MissedFooter />
    </>
  );
}
