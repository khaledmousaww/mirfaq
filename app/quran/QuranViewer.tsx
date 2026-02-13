"use client";

export default function QuranViewer() {
  return (
    <div style={{width:"100%",height:"85vh"}}>
      <object
        data="/quran.pdf"
        type="application/pdf"
        width="100%"
        height="100%"
      >
        <p>المتصفح لم يستطع تحميل المصحف.</p>
      </object>
    </div>
  );
}
