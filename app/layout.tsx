import type { Metadata } from "next";
import { Geist, Roboto_Mono, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geist = Geist({
  variable: "--font-body",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-math",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Geometry Gym",
  description: "Daily geometry workouts that build real math muscle. Train your brain one rep at a time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${spaceGrotesk.variable} ${robotoMono.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
