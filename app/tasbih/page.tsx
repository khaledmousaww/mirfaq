"use client";

import { useEffect, useState } from "react";

/* ===== أذكار افتراضية موسّعة ===== */
const DEFAULT_AZKAR = [
  "سبحان الله",
  "الحمد لله",
  "الله أكبر",
  "لا إله إلا الله",
  "أستغفر الله",
  "سبحان الله وبحمده",
  "سبحان الله العظيم",
  "لا حول ولا قوة إلا بالله",
  "سبحان الله والحمد لله ولا إله إلا الله والله أكبر (الباقيات الصالحات)",
  "أستغفر الله الذي لا إله إلا هو الحي القيوم وأتوب إليه",
  "اللهم صل وسلم على نبينا محمد",
  "اللهم إني أسألك الهدى والتقى والعفاف والغنى",
  "رضيت بالله ربا، وبالإسلام دينا، وبمحمد ﷺ نبيا",
  "حسبي الله لا اله الا هو عليه توكلت وهو رب العرش العظيم",
  "اللهم اغفر لي",
  "يا حي يا قيوم برحمتك أستغيث، أصلح لي شأني كله، ولا تكلني إلى نفسي طرفة عين",
  "اللهم اعني على ذكرك وشكرك وحسن عبادتك",
];

/* ===== رسائل تحفيزية شبابية ===== */
const MOTIVATION_TEXTS = [
  "🔥 كمل، انت بتعمل حاجة عظيمة",
  "💪 كل ضغطة في ميزان حسناتك",
  "✨ شغل عالي، ربنا شايف",
  "🌿 هدوء قلبك في الذكر",
  "🤍 ما تستهونش باللي بتعمله",
  "🚀 قربت توصل، كمل",
];

export default function TasbihPage() {
  /* ===== الحالات ===== */
  const [azkar, setAzkar] = useState<string[]>(DEFAULT_AZKAR);
  const [zikr, setZikr] = useState(DEFAULT_AZKAR[0]);
  const [count, setCount] = useState(0);

  const [targets, setTargets] = useState<number[]>([33, 100, 120]);
  const [target, setTarget] = useState<number | null>(33);
  const [customTarget, setCustomTarget] = useState("");

  const [newZikr, setNewZikr] = useState("");
  const [newZikrTarget, setNewZikrTarget] = useState("");

  const [motivation, setMotivation] = useState("");

  /* ===== تحميل البيانات ===== */
  useEffect(() => {
    const savedAzkar = localStorage.getItem("custom_azkar");
    const savedTargets = localStorage.getItem("tasbih_targets");

    if (savedAzkar) {
      const parsed = JSON.parse(savedAzkar);
      setAzkar([...DEFAULT_AZKAR, ...parsed]);
    }

    if (savedTargets) {
      setTargets(JSON.parse(savedTargets));
    }
  }, []);

  /* ===== تحميل العداد ===== */
  useEffect(() => {
    const saved = localStorage.getItem(`tasbih_${zikr}`);
    setCount(saved ? Number(saved) : 0);
  }, [zikr]);

  /* ===== حفظ العداد ===== */
  useEffect(() => {
    localStorage.setItem(`tasbih_${zikr}`, String(count));
  }, [count, zikr]);

  /* ===== تغيير رسالة التحفيز ===== */
  useEffect(() => {
    if (count > 0 && count % 10 === 0) {
      setMotivation(
        MOTIVATION_TEXTS[
          Math.floor(Math.random() * MOTIVATION_TEXTS.length)
        ]
      );
    }
  }, [count]);

  /* ===== تسبيح ===== */
  const increment = () => setCount((c) => c + 1);

  /* ===== تصفير ===== */
  const reset = () => setCount(0);

  /* ===== إضافة ذكر ===== */
  const addZikr = () => {
    if (!newZikr.trim()) return;

    const updated = [...azkar, newZikr.trim()];
    setAzkar(updated);
    setZikr(newZikr.trim());

    const customOnly = updated.filter(
      (z) => !DEFAULT_AZKAR.includes(z)
    );
    localStorage.setItem("custom_azkar", JSON.stringify(customOnly));

    if (newZikrTarget) {
      setTarget(Number(newZikrTarget));
    }

    setNewZikr("");
    setNewZikrTarget("");
    setCount(0);
  };

  /* ===== إضافة هدف ثابت ===== */
  const addCustomTarget = () => {
    if (!customTarget) return;

    const num = Number(customTarget);
    if (targets.includes(num)) return;

    const updated = [...targets, num].sort((a, b) => a - b);
    setTargets(updated);
    setTarget(num);

    localStorage.setItem("tasbih_targets", JSON.stringify(updated));
    setCustomTarget("");
  };

  return (
    <main style={{ maxWidth: 460, margin: "40px auto", padding: 16, textAlign: "center" }}>
      <h1>📿 السبحة</h1>

      {/* اختيار الذكر */}
      <select value={zikr} onChange={(e) => setZikr(e.target.value)} style={selectStyle}>
        {azkar.map((z) => (
          <option key={z} value={z}>{z}</option>
        ))}
      </select>

      {/* اختيار الهدف */}
      <select
        value={target ?? ""}
        onChange={(e) => setTarget(e.target.value ? Number(e.target.value) : null)}
        style={selectStyle}
      >
        {targets.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
        <option value="">بدون هدف</option>
      </select>

      {/* إضافة هدف جديد */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <input
          type="number"
          placeholder="أضف عدد جديد"
          value={customTarget}
          onChange={(e) => setCustomTarget(e.target.value)}
          style={inputStyle}
        />
        <button onClick={addCustomTarget} style={btnGreen}>إضافة</button>
      </div>

      {/* دائرة التسبيح */}
      <div onClick={increment} style={circleStyle}>
        <div style={{ fontSize: "3.5rem", fontWeight: "bold" }}>{count}</div>
        <div style={{ fontSize: "0.9rem", opacity: 0.9 }}>اضغط للتسبيح</div>
      </div>

      {/* رسالة الهدف */}
      {target && count >= target && (
        <div style={successBox}>🎉 وصلت للهدف، شغل عالي 👌</div>
      )}

      {/* تحفيز */}
      {motivation && <div style={motivationBox}>{motivation}</div>}

      {/* تصفير */}
      <button onClick={reset} style={resetBtn}>تصفير العداد</button>

      {/* إضافة ذكر */}
      <div style={{ marginTop: 30, borderTop: "1px solid #eee", paddingTop: 20 }}>
        <h3>➕ إضافة ذكر</h3>

        <input
          type="text"
          placeholder="اكتب الذكر"
          value={newZikr}
          onChange={(e) => setNewZikr(e.target.value)}
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="هدف مبدئي (اختياري)"
          value={newZikrTarget}
          onChange={(e) => setNewZikrTarget(e.target.value)}
          style={{ ...inputStyle, marginTop: 10 }}
        />

        <button onClick={addZikr} style={{ ...btnBlue, marginTop: 10 }}>
          إضافة الذكر
        </button>
      </div>
    </main>
  );
}

/* ===== Styles ===== */
const selectStyle = {
  padding: 10,
  borderRadius: 12,
  marginBottom: 10,
  width: "100%",
};

const inputStyle = {
  flex: 1,
  padding: 10,
  borderRadius: 10,
  border: "1px solid #ddd",
};

const btnGreen = {
  padding: "10px 14px",
  borderRadius: 10,
  border: "none",
  background: "#16a34a",
  color: "#fff",
  cursor: "pointer",
};

const btnBlue = {
  width: "100%",
  padding: 12,
  borderRadius: 12,
  border: "none",
  background: "#0ea5e9",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
};

const circleStyle = {
  width: 220,
  height: 220,
  borderRadius: "50%",
  background: "linear-gradient(135deg, #16a34a, #22c55e)",
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "center",
  alignItems: "center",
  margin: "20px auto",
  color: "#fff",
  cursor: "pointer",
  userSelect: "none" as const,
  boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
};

const successBox = {
  background: "#dcfce7",
  color: "#166534",
  padding: 12,
  borderRadius: 14,
  marginTop: 10,
  fontWeight: "bold",
};

const motivationBox = {
  marginTop: 10,
  color: "#0f172a",
  fontWeight: "bold",
};

const resetBtn = {
  marginTop: 12,
  background: "transparent",
  border: "none",
  color: "#ef4444",
  cursor: "pointer",
  fontSize: "0.95rem",
};
