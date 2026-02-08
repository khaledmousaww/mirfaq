import "./globals.css";
import { Tajawal } from "next/font/google";
import RegisterSW from "./components/RegisterSW";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700"],
});

export const metadata = {
  title: "مِرفاق",
  description: "خير رفيق لخير طريق",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={tajawal.className}>
        {/* تسجيل الـ Service Worker */}
        <RegisterSW />

        {children}
      </body>
    </html>
  );
}
