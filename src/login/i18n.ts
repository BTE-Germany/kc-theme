import { i18nBuilder } from "keycloakify/login";
import type { ThemeName } from "../kc.gen";

const { useI18n, ofTypeI18n } = i18nBuilder
    .withThemeName<ThemeName>()
    .withCustomTranslations({
    de: {
        loginAccountTitle: "Hey! Willkommen zurück.",
        loginAccountSubtitle: "Bitte gebe deine Daten unten ein, um fortzufahren!",
        registerTitle: 'Schön, dass du hier bist.',
        registerSubtitle: "Bitte gebe deine Daten unten ein, um fortzufahren!",
        linkIdpActionTitle: "Mit {0} verbinden?",
        linkIdpActionMessage: "Willst du wirklich dein Konto mit {0} verbinden?",
    }
}).build();

type I18n = typeof ofTypeI18n;
export { useI18n, type I18n };
