import Navbar from "./components/Navbar";
import TopBar from "./components/TopBar";
import IntroHint from "./components/IntroHint";
import DailyPrayers from "./components/DailyPrayers";
import QuickAccess from "./components/QuickAccess";
import PrayerNotice from "./components/PrayerNotice";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <main>
      <Navbar />

      <TopBar />

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
