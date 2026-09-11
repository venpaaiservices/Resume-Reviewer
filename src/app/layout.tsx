import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-main",
});

export const metadata: Metadata = {
  title: "Resume Reviewer | AI-Powered Resume Analysis",
  description: "Upload your resume and get an AI-powered review, score, insights, and actionable improvements in seconds. See exactly what recruiters see.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body>
        <main className="flex-center" style={{ minHeight: "100vh" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
