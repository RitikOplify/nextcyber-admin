import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ReduxWrapper from "@/wrapper/ReduxWrapper";
import tr from "zod/v4/locales/tr.cjs";

const inter = Inter({
  variable: "--font-interFontFamily",
  subsets: ["latin"],
});

export const metadata = {
  title:
    "Admin Panel - NEXTCYBR | An AI Powered Cyber Security Skills Learning Platform",
  description:
    "NEXTCYBR - An AI Powered Cyber Security Skills Learning Platform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-inter`}
        suppressHydrationWarning={true}
      >
        <ReduxWrapper>{children}</ReduxWrapper>
      </body>
    </html>
  );
}
