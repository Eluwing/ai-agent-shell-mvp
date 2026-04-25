import { useAgentStore } from "@/store/agent-store";
import { translations } from "./translations";

type TranslationParams = Record<string, string | number>;

export function useTranslation() {
  const locale = useAgentStore((state) => state.locale);

  function t(key: string, params: TranslationParams = {}) {
    const template = translations[locale][key] ?? translations.en[key] ?? key;

    return Object.entries(params).reduce(
      (text, [paramKey, value]) =>
        text.replaceAll(`{{${paramKey}}}`, String(value)),
      template,
    );
  }

  return { locale, t };
}
