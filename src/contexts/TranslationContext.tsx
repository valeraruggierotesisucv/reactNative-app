// src/contexts/TranslationContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { I18n } from "i18n-js";
import { en, es } from "../../translations";
import { getLanguage, setLanguage } from "../../utils/languageUtils";

const i18n = new I18n({
  en,
  es,
});

export enum Locale {
  EN = "en",
  ES = "es",
}

interface TranslationContextProps {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, options?: any) => string;
}

const TranslationContext = createContext<TranslationContextProps | undefined>(
  undefined
);

export const TranslationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [locale, setLocale] = useState<Locale | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLanguage = async () => {
      const language = await getLanguage();
      setLocale(language as Locale);
      setLoading(false);
      console.log("language", language);
      i18n.locale = language;
    };

    fetchLanguage();
  }, []);

  useEffect(() => {
    if (locale) {
      i18n.locale = locale;
      const fetchSetLanguage = async () => {
        await setLanguage(locale);
      };
      fetchSetLanguage();
    }
  }, [locale]);

  

  if (loading || !locale) {
    return null; // or a loading spinner
  }

  const value = {
    locale: locale,
    setLocale,
    t: i18n.t.bind(i18n),
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};
