import { createUseI18n } from "keycloakify/login";

export const { useI18n, ofTypeI18n } = createUseI18n({
    de: {
        loginAccountTitle: "Hey! Willkommen zurück.",
        loginAccountSubtitle: "Bitte gebe deine Daten unten ein, um fortzufahren!",
        registerTitle: 'Schön, dass du hier bist.',
        registerSubtitle: "Bitte gebe deine Daten unten ein, um fortzufahren!",
    }
});

export type I18n = typeof ofTypeI18n;
