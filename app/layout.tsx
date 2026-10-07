import type { Metadata } from "next";
import Script from "next/script";
import "@fontsource/fraunces/latin-400.css";
import "@fontsource/fraunces/latin-500.css";
import "@fontsource/fraunces/latin-600.css";
import "@fontsource/fraunces/latin-400-italic.css";
import "@fontsource/fraunces/latin-500-italic.css";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/jetbrains-mono/latin-400.css";
import "@fontsource/jetbrains-mono/latin-500.css";
import "./globals.css";
import SmoothScroll from "@/components/motion/SmoothScroll";
import PaperGrain from "@/components/patterns/PaperGrain";
import { Toasts } from "@/components/motion/toast";
import { LanguageProvider } from "@/lib/i18n";
import { brand, location } from "@/lib/businessConfig";

/**
 * Default metadata. Individual pages override title/description from
 * lib/translations.ts (see the per-route metadata exports).
 * The old version claimed "since 2019" — an unverified date — so it now
 * reads brand.since from lib/businessConfig.ts instead.
 */
export const metadata: Metadata = {
  title: "Shubh Milk — fresh dairy, delivered every morning",
  description: `Fresh cow, buffalo and A2 milk, dahi, paneer and ghee delivered home in ${location.city}. Returnable glass bottles, no adulteration. Order on WhatsApp.`,
  applicationName: brand.name,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* lang starts as Hindi (the default); LanguageProvider updates it on switch. */
    <html lang="hi">
      <body>
        <LanguageProvider>
          <PaperGrain />
          <Toasts />
          <SmoothScroll>{children}</SmoothScroll>
        </LanguageProvider>
        {/* Razorpay checkout.js — lazy: loads after first paint, only ever
            needed if a customer actually opens the cart and pays. */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
