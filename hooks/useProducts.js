"use client";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/context/translations";
import { getFirebaseClient, isFirebaseConfigured } from "@/lib/firebase";
export default function useProducts() {
  const { language } = useLanguage();
  const [live, setLive] = useState([]);
  useEffect(() => {
    if (!isFirebaseConfigured) return;
    let cancelled = false,
      unsubscribe;
    getFirebaseClient()
      .then((f) => {
        if (!f || cancelled) return;
        unsubscribe = f.onSnapshot(
          f.query(
            f.collection(f.db, "products"),
            f.orderBy("createdAt", "desc"),
          ),
          (s) => setLive(s.docs.map((d) => ({ ...d.data(), id: d.id }))),
          () => {},
        );
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, []);
  return useMemo(() => {
    const base = translations[language].products.items;
    return base.map((p) => {
      const update = live.find((x) => String(x.id) === String(p.id));
      return update
        ? {
            ...p,
            ...update,
            id: p.id,
            title: p.title,
            description: p.description,
          }
        : p;
    });
  }, [language, live]);
}
