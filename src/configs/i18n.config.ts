import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import vi from "../../public/locales/vi/translation.json";
import en from "../../public/locales/en/translation.json";
import LanguageDetector from "i18next-browser-languagedetector";

export const Languages = {
	en: { translation: en },
	vi: { translation: vi },
};

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: "en",
		debug: true,
		interpolation: { escapeValue: false },
		resources: Languages,
	});

export default i18n;
