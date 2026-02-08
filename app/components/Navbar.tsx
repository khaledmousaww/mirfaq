export default function Navbar() {
  return (
    <nav className="site-navbar">
      <div className="nav-inner">

        {/* اليمين: اللوجو + السلوچن */}
        <div className="nav-right">
          <span className="logo">مِرفاق</span>
          <span className="slogan">خيرُ رفيقٍ لخيرِ طريق</span>
        </div>

        {/* الشمال: الروابط */}
        <div className="nav-left">
          <a href="/">الرئيسية</a>
          <a href="/missed-fasting">الصيام</a>
          <a href="/tasbih">السبحة</a>
          <a href="/azkar">الأذكار</a>
        </div>

      </div>
    </nav>
  );
}
