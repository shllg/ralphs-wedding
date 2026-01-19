import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Header, Footer } from "@/components";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wedding Invitations",
  description: "Wedding invitation management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${inter.variable} flex min-h-screen flex-col bg-canvas antialiased`}
      >
        <Header />
        <main id="main-content" className="mx-auto w-full max-w-5xl flex-1 px-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
