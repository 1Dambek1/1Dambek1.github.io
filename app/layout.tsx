"use client";
import { usePathname } from "next/navigation";
// Manrope можно убрать из импорта, если он больше нигде не нужен,
// но оставим на всякий случай, если захотите вернуть его как запасной вариант.
import { Manrope } from "next/font/google";
import "./globals.css";

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
  // Проверяем, находимся ли мы в админке Sanity (Studio)
  const isStudio = pathname?.startsWith("/studio");

  return (
    <html lang="ru">
      <body
        data-route={pathname}
        // Убираем manrope.className для основного сайта, чтобы работал наш кастомный шрифт из CSS
        // Для студии оставляем дефолтные стили (пустую строку)
        className={isStudio ? "" : ""}
      >
        {children}
      </body>
    </html>
  );
}
