import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LiquidBackground } from "@/components/layout/LiquidBackground";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LLR Cleaners | Management Platform",
  description: "Comprehensive management solution for cleaning professionals",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          <ThemeToggle />
          <LiquidBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
