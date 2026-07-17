// useLanguage — convenience hook that returns { lang, setLang, t }
// where t is the translations object for the currently active language.
// Usage: const { t, lang, setLang } = useLanguage();

import { useLanguageContext } from "./LanguageContext";
import { type Translations, type Lang } from "./translations";

interface UseLanguageReturn {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

export function useLanguage(): UseLanguageReturn {
  const { lang, setLang, t } = useLanguageContext();
  return { lang, setLang, t };
}