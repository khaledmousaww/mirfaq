export default function MissedFooter() {
  return (
    <footer className="missed-footer">
      <div className="footer-inner">
        <div className="footer-title">مِرفاق</div>

        <div className="footer-desc">
          هذا العمل خالص لوجه الله، لمساعدة المسلم على قضاء ما فاته وتنظيم عبادته.
        </div>

        <div className="footer-links">
          <a href="/">الرئيسية</a>
          <a href="/missed-prayers">الصلوات الفائتة</a>
          <a href="/about">عن مرفاق</a>
          <a href="/developer">عن المطور</a>
        </div>

        <div className="footer-copy">
          © {new Date().getFullYear()} — جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  );
}
