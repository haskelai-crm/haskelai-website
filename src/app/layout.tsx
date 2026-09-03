import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HaskelAI - Intelligent Platforms for Modern Organizations",
  description: "HaskelAI builds intelligent business software platforms. Build smarter. Operate better.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-bg text-ink relative antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
