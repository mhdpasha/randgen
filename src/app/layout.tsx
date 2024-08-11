import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "MS Bet",
  description: "Moba Squad Bet",
  robots: "index, follow",
  keywords: ["Moba Squad", "Moba Squad Gacor", "MS Bet"],
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full w-full">
      <body className={`${inter.className} h-full w-full`}>
        {children}
      </body>
    </html>
  );
}
