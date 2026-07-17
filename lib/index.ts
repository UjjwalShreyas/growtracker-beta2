// Centralized exports for the organized lib directory structure

// Data
export { mockPantryItems, mockRecipes, mockDetectedItems, chatbotResponses } from "./data/mockData";
export type { PantryItem, Recipe, DetectedItem } from "./data/mockData";

// Hooks
export { useAuth, AuthProvider } from "./hooks/useAuth";
export { usePantry } from "./hooks/usePantry";

// i18n
export { LanguageProvider, useLanguageContext } from "./i18n/LanguageContext";
export { useLanguage } from "./i18n/useLanguage";
export { translations, translateCategory, translateItemName } from "./i18n/translations";
export type { Lang, Translations } from "./i18n/translations";

// Utils
export { estimateServings, formatServingsLabel } from "./utils/servingsEstimator";
