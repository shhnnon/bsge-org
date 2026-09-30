import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./aaccup.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BSGE",
  description:
    "Bachelor of Science in Geodetic Engineering - Batangas State University, Alangilan Campus.",
  icons: {
    icon: "/batstateu.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={geistSans.variable + " " + geistMono.variable + " h-full antialiased"}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
