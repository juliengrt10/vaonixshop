import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, type Language } from '@/lib/i18n';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>(() => {
        // Check localStorage first
        const saved = localStorage.getItem('vaonix-language');
        if (saved === 'fr' || saved === 'en') return saved;

        // Check browser language
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith('fr')) return 'fr';

        // Default to French
        return 'fr';
    });

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('vaonix-language', lang);
        document.documentElement.lang = lang;
    };

    const t = (path: string): string => {
        const keys = path.split('.');
        let value: any = translations[language];

        for (const key of keys) {
            value = value?.[key];
            if (value === undefined) {
                console.warn(`Translation missing for key: ${path} in language: ${language}`);
                return path;
            }
        }

        return value as string;
    };

    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
