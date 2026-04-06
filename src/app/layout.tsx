import type { Metadata, Viewport } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"], 
});

export const metadata: Metadata = {
  title: "Luxe Clean | Dispatch",
  description: "Professional Care Management",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#fdfaf6",
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
      <body className={`${oswald.variable} font-sans antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
