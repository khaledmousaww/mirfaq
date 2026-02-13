import MissedNavbar from "../components/MissedNavbar";
import MissedFooter from "../components/MissedFooter";
import QuranViewer from "./QuranViewer";

export default function QuranPage() {
  return (
    <>
      <MissedNavbar />

      <main className="quran-page">
        <h1>📖 المصحف الشريف</h1>

        <div className="quran-wrapper">
          <QuranViewer />
        </div>
      </main>

      <MissedFooter />
    </>
  );
}
