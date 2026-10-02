"use client";

/**
 * ============================================================================
 *  SHUBH MILK — LANGUAGE RUNTIME  (lib/i18n.tsx)
 * ============================================================================
 *  Powers the Hindi/English toggle. Wrap the app in <LanguageProvider> (this is
 *  already done in app/layout.tsx) and call useLang() anywhere below it:
 *
 *      const { lang, t, setLang } = useLang();
 *      <p>{t.hero.headline}</p>
 *
 *  `t` is the whole copy block for the current language, typed from the Hindi
 *  block in lib/translations.ts — so a missing key is a build error, not a
 *  blank patch of page.
 *
 *  The choice is remembered in localStorage and a cookie, so it survives a
 *  reload. Hindi is the default for first-time visitors.
 * ============================================================================
 */

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  defaultLang,
  isLang,
  langStorageKey,
  translations,
  type CopyShape,
  type Lang,
} from "./translations";

interface LangContextValue {
  lang: Lang;
  /** Copy for the current language. */
  t: CopyShape;
  setLang: (next: Lang) => void;
  toggle: () => void;
  /** False until the stored preference has been read (avoids a flash of Hindi). */
  ready: boolean;
}

const LanguageContext = createContext<LangContextValue | null>(null);

const readCookie = (): string | null => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${langStorageKey}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
};

const writeCookie = (value: Lang): void => {
  // 1 year, lax — no server-side personalisation needed.
  document.cookie = `${langStorageKey}=${value}; path=/; max-age=31536000; samesite=lax`;
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  /**
   * Always start from defaultLang so the server-rendered markup and the first
   * client render agree (no hydration mismatch). The stored choice is applied
   * in the effect below.
   */
  const [lang, setLangState] = useState<Lang>(defaultLang);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readCookie() ?? window.localStorage.getItem(langStorageKey);
    if (isLang(stored) && stored !== lang) setLangState(stored);
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "hi" ? "hi" : "en";
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    writeCookie(next);
    try {
      window.localStorage.setItem(langStorageKey, next);
    } catch {
      /* private mode — the cookie still works */
    }
  }, []);

  const toggle = useCallback(() => {
    setLang(lang === "hi" ? "en" : "hi");
  }, [lang, setLang]);

  const value = useMemo<LangContextValue>(
    () => ({ lang, t: translations[lang], setLang, toggle, ready }),
    [lang, setLang, toggle, ready],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

/** Copy + current language. Throws if used outside <LanguageProvider>. */
export function useLang(): LangContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLang() must be used inside <LanguageProvider> (see app/layout.tsx)");
  }
  return ctx;
}

export type { Lang, CopyShape };
