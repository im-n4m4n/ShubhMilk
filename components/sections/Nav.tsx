"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, MessageCircle, Phone, Search, ShoppingBag, User, X } from "lucide-react";
import { useCart } from "@/lib/store";
import LanguageToggle from "@/components/LanguageToggle";
import { useLang } from "@/lib/i18n";
import { telLink, waLink } from "@/lib/businessConfig";

/** href stays fixed; the label is read from lib/translations.ts. */
const navLinks: { key: "shop" | "subscribe" | "areas" | "order" | "contact"; href: string }[] = [
  { key: "shop", href: "/shop" },
  { key: "subscribe", href: "/subscribe" },
  { key: "areas", href: "/contact" },
  { key: "order", href: "/order" },
];

const iconButtons = [
  { label: "Search", Icon: Search },
  { label: "Account", Icon: User },
];

export default function Nav() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const toggleBtn = useRef<HTMLButtonElement>(null);
  const count = useCart((s) => s.lines.reduce((acc, l) => acc + l.qty, 0));
  const openDrawer = useCart((s) => s.openDrawer);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close the mobile menu on Escape, and lock background scroll while open. */
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        toggleBtn.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  /* Close the menu when resizing up to desktop. */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setMenuOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Announcement bar */}
      <div className="bg-peacock">
        <p className="mx-auto max-w-site px-6 py-2 text-center font-mono text-[11px] tracking-[0.2em] text-milk/80 lg:px-12">
          {t.hero.note}
        </p>
      </div>

      {/* Nav row — transparent until the page scrolls past 80px */}
      <div
        className={`transition-colors duration-200 ${
          scrolled || menuOpen ? "border-b border-hairline bg-bone/95" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-site items-center justify-between px-4 py-4 sm:px-6 lg:px-12 lg:py-5">
          {/* Wordmark */}
          <Link href="/" className="flex items-baseline gap-2" onClick={() => setMenuOpen(false)}>
            <span className="display text-2xl font-medium text-ink">
              SHUBH
              <span aria-hidden className="ml-1 inline-block h-2 w-2 rounded-full bg-kesar" />
            </span>
            <span className="font-mono text-xs tracking-[0.3em] text-ink">MILK</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((l) => (
              <Link
                key={l.key}
                href={l.href}
                className="text-sm text-ink/80 transition-colors hover:text-ink"
              >
                {t.nav[l.key]}
              </Link>
            ))}
          </div>

          {/* Icon actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <LanguageToggle />
            <div className="hidden sm:flex sm:items-center sm:gap-1">
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
            </div>
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

            {/* Hamburger — the ONLY way to reach the links on a phone */}
            <button
              ref={toggleBtn}
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? t.common.close : "Menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="rounded-full p-2 text-ink transition-colors hover:bg-milk lg:hidden"
            >
              {menuOpen ? (
                <X className="h-5 w-5" strokeWidth={1.5} />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </nav>

        {/* ── Mobile menu panel ─────────────────────────────────────────────── */}
        <div
          id="mobile-menu"
          ref={panel}
          hidden={!menuOpen}
          className="border-t border-hairline bg-bone lg:hidden"
        >
          <div className="mx-auto max-w-site px-4 py-4 sm:px-6">
            <ul className="flex flex-col">
              {navLinks.map((l) => (
                <li key={l.key}>
                  <Link
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-[52px] items-center border-b border-hairline text-[17px] text-ink"
                  >
                    {t.nav[l.key]}
                  </Link>
                </li>
              ))}
            </ul>

            {/* direct order channels, thumb-friendly */}
            <div className="mt-5 flex flex-col gap-3">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-ink text-[15px] font-medium text-bone"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.6} />
                {t.sticky.orderOnWhatsApp}
              </a>
              <a
                href={telLink()}
                className="flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-ink/20 text-[15px] font-medium text-ink"
              >
                <Phone className="h-4 w-4" strokeWidth={1.6} />
                {t.sticky.callNow}
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
