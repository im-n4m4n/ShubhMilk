"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/lib/store";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Subscribe", href: "/subscribe" },
  { label: "Our Farms", href: "/farms" },
  { label: "Ghee", href: "/shop" },
  { label: "Gifting", href: "/gifting" },
];

const iconButtons = [
  { label: "Search", Icon: Search },
  { label: "Account", Icon: User },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const count = useCart((s) => s.lines.reduce((acc, l) => acc + l.qty, 0));
  const openDrawer = useCart((s) => s.openDrawer);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Announcement bar */}
      <div className="bg-peacock">
        <p className="mx-auto max-w-site px-6 py-2 text-center font-mono text-[11px] tracking-[0.2em] text-milk/80 lg:px-12">
          Free delivery on first order · Serving 12,000+ homes since 2019
        </p>
      </div>

      {/* Nav row — transparent until the page scrolls past 80px */}
      <div
        className={`transition-colors duration-200 ${
          scrolled ? "border-b border-hairline bg-bone/95" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-site items-center justify-between px-6 py-5 lg:px-12">
          {/* Wordmark */}
          <Link href="/" className="flex items-baseline gap-2">
            <span className="display text-2xl font-medium text-ink">
              SHUBH
              <span
                aria-hidden
                className="ml-1 inline-block h-2 w-2 rounded-full bg-kesar"
              />
            </span>
            <span className="font-mono text-xs tracking-[0.3em] text-ink">MILK</span>
          </Link>

          {/* Center links */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-sm text-ink/80 transition-colors hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Icon actions */}
          <div className="flex items-center gap-2">
            {iconButtons.map(({ label, Icon }) => (
              <button
                key={label}
                type="button"
                aria-label={label}
                className="rounded-full p-2 text-ink transition-colors hover:bg-milk"
              >
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </button>
            ))}
            <button
              type="button"
              aria-label={`Open basket, ${count} item${count === 1 ? "" : "s"}`}
              onClick={openDrawer}
              className="relative rounded-full p-2 text-ink transition-colors hover:bg-milk"
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
              {count > 0 && (
                <span
                  aria-hidden
                  className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-ink font-mono text-[9px] leading-none text-bone"
                >
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
