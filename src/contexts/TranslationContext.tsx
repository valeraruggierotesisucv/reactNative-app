// src/contexts/TranslationContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";
import { I18n } from "i18n-js";
import { en, es } from "../../localizations";

const i18n = new I18n({
  en,
  es,
});

interface TranslationContextProps {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string, options?: any) => string;
}

const TranslationContext = createContext<TranslationContextProps | undefined>(
  undefined
);

export const TranslationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [locale, setLocale] = useState("en");

  i18n.locale = locale;

  const value = {
    locale,
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
