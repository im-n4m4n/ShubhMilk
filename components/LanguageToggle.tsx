"use client";

import { useLang } from "@/lib/i18n";

/**
 * LanguageToggle — हिंदी / English switch for the header.
 * Writes the choice to a cookie + localStorage (see lib/i18n.tsx), so the
 * whole site follows the selection on the next visit too.
 */
export default function LanguageToggle({ tone = "ink" }: { tone?: "ink" | "bone" }) {
  const { lang, setLang, t } = useLang();

  const base =
    "rounded-full px-2.5 py-1 font-mono text-[11px] tracking-[0.15em] transition-colors";
  const active = tone === "ink" ? "bg-ink text-bone" : "bg-bone text-ink";
  const idle =
    tone === "ink" ? "text-ink/60 hover:text-ink" : "text-bone/60 hover:text-bone";

  return (
    <div
      role="group"
      aria-label={t.nav.languageToggle}
      className={`flex items-center gap-0.5 rounded-full border p-0.5 ${
        tone === "ink" ? "border-hairline bg-milk/70" : "border-bone/25 bg-bone/10"
      }`}
    >
      <button
        type="button"
        onClick={() => setLang("hi")}
        aria-pressed={lang === "hi"}
        aria-label="हिंदी में देखें"
        className={`${base} ${lang === "hi" ? active : idle}`}
      >
        हिंदी
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        aria-label="View in English"
        className={`${base} ${lang === "en" ? active : idle}`}
      >
        EN
      </button>
    </div>
  );
}
