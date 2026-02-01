"use client";
import { usePathname } from "next/navigation";
import { Manrope } from "next/font/google";
import "./globals.css";

// Оставляем только Manrope
const manrope = Manrope({
  subsets: ["cyrillic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  return (
    <html lang="ru">
      <body
        data-route={pathname}
        // Применяем только класс Manrope
        className={isStudio ? "" : manrope.className}
      >
        {children}
      </body>
    </html>
  );
}
