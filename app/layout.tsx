import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";

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
  title: "WOS Formation Generator",
  description: "Tool to generate hero formations for the game Whiteout Survival",
  manifest: '/manifest.webmanifest',
  keywords: ['Whiteout Survival', 'Heroes', 'Formations'],
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? 'https://wos-formation-generator.davidemarcoli.dev'),
  robots: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {process.env.NODE_ENV === "production" && (
          <Script src="https://umami.homelab.davidemarcoli.dev/script.js" data-website-id="2f46cad8-357b-4ca4-bee0-d7e15e341c34"/>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
