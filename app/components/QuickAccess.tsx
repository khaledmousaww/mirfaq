"use client";

import { useRouter } from "next/navigation";

const dailyTools = [
  { title: "القرآن الكريم", icon: "📖", path: "/quran" },
  { title: "رمضان", icon: "🌛", path: "/ramadan" },
  { title: "الأذكار", icon: "📿", path: "/azkar" },
  { title: "السبحة الإلكترونية", icon: "🔵", path: "/tasbih" },
  { title: " مرفاق الخير", icon: "💰", path: "/rafiq-al-khair" },
  { title: "الصلوات الفائتة", icon: "🕰️", path: "/missed-prayers" },
  { title: "أيام الصيام الفائتة", icon: "🌙", path: "/missed-fasting" },
];

const trackingTools = [
  { title: "سجل الإنجازات", icon: "⭐", path: "/achievements" },
  { title: "الإحصائيات", icon: "📊", path: "/stats" },
  { title: "الإعدادات", icon: "⚙️", path: "/settings" },
];

     

export default function QuickAccess() {
  const router = useRouter();

  return (
    <>
      <h3 className="section-title">أدواتك اليومية</h3>
      <section className="quick-access improved">
        {dailyTools.map((tile) => (
          <div
            key={tile.title}
            className="tile improved-tile"
            onClick={() => router.push(tile.path)}
          >
            <div className="tile-icon">{tile.icon}</div>
            <div className="tile-title">{tile.title}</div>
          </div>
        ))}
      </section>

      <h3 className="section-title">المتابعة والإعدادات</h3>
      <section className="quick-access improved">
        {trackingTools.map((tile) => (
          <div
            key={tile.title}
            className="tile improved-tile"
            onClick={() => router.push(tile.path)}
          >
            <div className="tile-icon">{tile.icon}</div>
            <div className="tile-title">{tile.title}</div>
          </div>
        ))}
      </section>



            {/* عن مرفاق / عن المطور */}
      <section className="bottom-info">
        <div
          className="bottom-tile"
          onClick={() => router.push("/about")}
        >
          <div className="bottom-icon">ℹ️</div>
          <div className="bottom-title">عن مِرفاق</div>
          <p className="bottom-desc">
            تعرّف على فكرة ورسالة مِرفاق
          </p>
        </div>

        <div
          className="bottom-tile"
          onClick={() => router.push("/developer")}
        >
          <div className="bottom-icon">👨‍💻</div>
          <div className="bottom-title">عن المطوّر</div>
          <p className="bottom-desc">
            معلومات عن المطوّر وفكرة المشروع
          </p>
        </div>
      </section>

    </>
  );
}
