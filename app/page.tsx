import Navbar from "./components/Navbar";
import TopBar from "./components/TopBar";
import IntroHint from "./components/IntroHint";
import DailyPrayers from "./components/DailyPrayers";
import QuickAccess from "./components/QuickAccess";
import PrayerNotice from "./components/PrayerNotice";
import Footer from "./components/Footer";
import AdhanEngine from "./components/AdhanUltraEngine";















export default function HomePage() {
  return (
    <main>

      {/* الناف بار */}
      <Navbar />

      {/* التوب بار (التاريخ - الوقت) */}
      <TopBar />

   
<AdhanEngine />

      {/* تنبيه المواقيت */}
      <PrayerNotice />

      {/* رسالة إرشادية */}
      <IntroHint />

      {/* الصلوات اليومية */}
      <DailyPrayers />

      {/* أدوات الوصول السريع */}
      <QuickAccess />

      {/* الفوتر */}
      <Footer />

    </main>
  );
}
