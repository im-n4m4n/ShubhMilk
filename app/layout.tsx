import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Shubh Milk — Shudh. Shubh. Roz.",
  description:
    "A2 desi cow milk in returnable glass bottles, delivered before sunrise. Farm to doorstep since 2019.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PaperGrain />
        <Toasts />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
