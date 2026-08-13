"use client";

import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

const VALID_LANGS = ["mn", "en", "zh", "ko"];
const STORAGE_KEY = "undram-lang";

export function LanguageProvider({ children }) {
    // Lazy initializer reads localStorage once synchronously — avoids a second render pass
    const [language, setLanguageState] = useState(() => {
        if (typeof window === "undefined") return "mn";
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved && VALID_LANGS.includes(saved) ? saved : "mn";
        } catch {
            return "mn";
        }
    });

    const setLanguage = (lang) => {
        if (!VALID_LANGS.includes(lang)) return;
        setLanguageState(lang);
        try {
            localStorage.setItem(STORAGE_KEY, lang);
        } catch {
            // Language selection still works when persistence is unavailable.
        }
    };

    const toggleLanguage = () => {
        setLanguage(language === "mn" ? "en" : "mn");
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useLanguage must be used within LanguageProvider");
    return context;
}
