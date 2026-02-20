"use client";

import "./rafiq.css";

export default function RafiqAlKhairPage() {
  return (
    <main className="khair-page">

      {/* ⭐ خلفية رمضانية */}
      <div className="moon"/>
      <div className="stars"/>

      <h1 className="khair-title"> مِرفاق الخير🤍</h1>

      {/* 🍲 الهدف */}
      <div className="goal-card">
        <h2> الهدف الحالي🎯</h2>
        <p>تجهيز 10 وجبات إفطار للصائمين</p>

        <div className="progress-bar">
          <div className="progress-fill" style={{width:"0%"}}/>
        </div>

        <span className="progress-text">0 / 10 وجبات</span>
      </div>

      {/* 🚧 الحالة */}
      <div className="coming-box">
        <h3> قريبًا بإذن الله🚀🔜</h3>
        <p>
          يجري تجهيز نظام التبرعات داخل مرفاق الخير
          وسيتم فتح باب المساهمة قريبًا.
        </p>

        <button className="disabled-btn">
          التبرع الآن (قريبًا)
        </button>
      </div>

      {/* 🤲 المبادرات */}
      <div className="initiatives">

        <h3> 🌙مبادرات مرفاق الخير</h3>

        <div className="initiative-card">
          🍲 وجبات إفطار رمضان
        </div>

        <div className="initiative-card">
          📦 كرتونة الخير (قريبًا)
        </div>

        <div className="initiative-card">
          سيتم طرح مبادرات اخري في القريب العاجل.(مستقبلاً)
        </div>

      </div>

      {/* 🛡️ الشفافية */}
      <div className="trust-box">
        جميع التبرعات مخصصة للأعمال الخيرية فقط
        ولا يحصل التطبيق أو المطور على أي نسبة.❗ 
      </div>

    </main>
  );
}
