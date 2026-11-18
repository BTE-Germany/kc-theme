/* eslint-disable @typescript-eslint/no-unused-vars */
import { i18nBuilder } from "keycloakify/login";
import type { ThemeName } from "../kc.gen";

/**
 * Theme specific messages. Everything else comes from Keycloak's default message bundles.
 * @see https://docs.keycloakify.dev/features/i18n
 */
const { useI18n, ofTypeI18n } = i18nBuilder
    .withThemeName<ThemeName>()
    .withCustomTranslations({
        en: {
            welcomeBack: "Welcome back",
            loginSubtitle: "Sign in to your BTE Germany account to continue.",
            registerTitle: "Create your account",
            registerSubtitle: "Join BuildTheEarth Germany. It only takes a minute.",
            signingInAs: "Signing in as",
            orContinueWith: "or continue with",
            legalNotice: "Legal notice",
            privacyPolicy: "Privacy",
            imageCredit: "Photo",
            goBack: "Go back",
            returnToApplication: "Back to application",
            proceed: "Continue",
            requiredField: "required",
            copyFailed:
                "Copying failed. Please select the codes manually or use Download.",
            alreadyHaveAccount: "Already have an account?",
            acceptTermsText:
                "I have read and agree to the terms of use and the privacy policy of BuildTheEarth Germany e.V.",
            changeLanguage: "Change language"
        },
        de: {
            welcomeBack: "Willkommen zurück",
            loginSubtitle: "Melde dich mit deinem BTE-Germany-Konto an, um fortzufahren.",
            registerTitle: "Konto erstellen",
            registerSubtitle:
                "Werde Teil von BuildTheEarth Germany. Das dauert nur eine Minute.",
            signingInAs: "Anmeldung als",
            orContinueWith: "oder weiter mit",
            legalNotice: "Impressum",
            privacyPolicy: "Datenschutz",
            imageCredit: "Foto",
            goBack: "Zurück",
            returnToApplication: "Zurück zur Anwendung",
            proceed: "Weiter",
            requiredField: "Pflichtfeld",
            copyFailed:
                "Kopieren fehlgeschlagen. Bitte markiere die Codes manuell oder nutze „Herunterladen“.",
            alreadyHaveAccount: "Du hast bereits ein Konto?",
            acceptTermsText:
                "Ich habe die Nutzungsbedingungen und die Datenschutzerklärung von BuildTheEarth Germany e.V. gelesen und stimme ihnen zu.",
            changeLanguage: "Sprache ändern"
        }
    })
    .build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
