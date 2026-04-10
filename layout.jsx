import { Fraunces, Outfit } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata = {
  title: "NorthBound Visas — The Green Mamba's Gateway to the World",
  description:
    "Premium visa concierge for South African travelers. 689+ visas handled, 98% approval rate. 100% service fee refund if denied.",
  keywords: [
    "South Africa visa agency",
    "UK visa South Africa",
    "Schengen visa",
    "USA visa",
    "visa concierge",
    "NorthBound Visas",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${outfit.variable}`}>
      <body className="font-sans relative">
        <Navbar />
        <main className="relative z-10">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
