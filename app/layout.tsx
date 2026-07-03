import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
});

const siteUrl = "https://reverastudios.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rêvera Studio — Where Ideas Become Experiences",
    template: "%s · Rêvera Studio",
  },
  description:
    "Rêvera Studio is a creative technology studio crafting brand identity, cinematic film, photography and world-class digital products for luxury and enterprise clients.",
  keywords: [
    "creative studio",
    "brand identity",
    "cinematic photography",
    "videography",
    "web development",
    "mobile apps",
    "AI automation",
    "creative agency",
  ],
  authors: [{ name: "Rêvera Studio" }],
  openGraph: {
    title: "Rêvera Studio — Where Ideas Become Experiences",
    description:
      "A creative technology studio building brands that people remember.",
    url: siteUrl,
    siteName: "Rêvera Studio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rêvera Studio",
    description:
      "A creative technology studio building brands that people remember.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#FAFAF8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
