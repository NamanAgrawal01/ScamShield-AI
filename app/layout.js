import { DM_Sans, Syne } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

export const metadata = {
  title: "ScamShield AI | Fraud Detection Engine",
  description: "AI-powered protection against phishing, fraud, and suspicious links.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${syne.variable}`}>
        {children}
      </body>
    </html>
  );
}
