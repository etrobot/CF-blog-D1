import type { Metadata } from "next";
import Navbar from '@/components/navbar';
import localFont from "next/font/local";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google'
import { Providers } from '@/components/providers';
import { cn } from "@/lib/utils"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AI Could Be Fun",
  description: "AI Directory of hotest products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
         className={cn(
          "min-h-screen bg-background font-sans antialiased",
          geistSans.variable
        )}
      >
        <Providers
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
        <Navbar />
        {children}
        <GoogleAnalytics gaId="G-D6W5L8YCC4" />
        </Providers>
      </body>
    </html>
  );
}
