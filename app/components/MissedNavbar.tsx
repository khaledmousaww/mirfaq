export default function MissedNavbar() {
  return (
    <nav className="missed-navbar">
      <div className="nav-inner">
        <div className="nav-right">
          <div className="logo">مِرفاق</div>
          <div className="page-title">خيرُ رفيقٍ لخيرِ طريق</div>
        </div>

        <div className="nav-left">
          <a href="/">الرئيسية</a>
          <a href="/missed-fasting">قضاء الصيام</a>
          <a href="/azkar">الأذكار</a>
        </div>
      </div>
    </nav>
  );
}
