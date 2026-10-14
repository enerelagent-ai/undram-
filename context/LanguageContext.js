"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const LanguageContext = createContext();

const VALID_LANGS = ["mn", "en", "zh", "ko"];
const STORAGE_KEY = "undram-lang";

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState("mn");
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      // Match the static Mongolian server snapshot before restoring a preference.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (VALID_LANGS.includes(saved)) setLanguageState(saved);
    } catch {
      /* Browser storage is optional. */
    }
  }, []);

  const setLanguage = useCallback((lang) => {
    if (!VALID_LANGS.includes(lang)) return;
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Language selection still works when persistence is unavailable.
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((current) => (current === "mn" ? "en" : "mn"));
  }, []);

  useEffect(() => {
    document.documentElement.lang =
      language === "zh" ? "zh-CN" : language === "ko" ? "ko" : language;
  }, [language]);

  const value = useMemo(
    () => ({ language, setLanguage, toggleLanguage }),
    [language, setLanguage, toggleLanguage],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
