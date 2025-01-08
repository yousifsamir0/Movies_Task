import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Movie Search App',
  description: 'Search for movies and manage your favorites',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="bg-blue-400 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold bg-rose-400 px-4 py-2 rounded-lg">
              Movie Search
            </Link>
            <Link href="/favourites" className="hover:underline bg-rose-400 px-4 py-2 rounded-lg">
              Favorites
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
