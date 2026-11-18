# BTE Germany Keycloak theme

Login theme for the BuildTheEarth Germany Keycloak instance, built with [Keycloakify](https://keycloakify.dev) 11, React 19 and Tailwind CSS 4.

- Dark, split-screen layout: form on the left, a random build from the BTE Germany CMS on the right (or as a soft backdrop on small screens).
- Every Keycloak login page is implemented with the same components, so all flows (login, registration, password reset, OTP, passkeys, IdP linking, OAuth consent, errors, …) look consistent.
- Responsive from 320px phones to ultra-wide screens.
- Subtle motion (staggered page entrance, alert shake, Ken Burns background, loading spinners), disabled for users who prefer reduced motion.
- Theme texts in English and German (`src/login/i18n.ts`); everything else uses Keycloak's message bundles.

## Development

Requires Node `^20.19.0 || >=22.12.0` and pnpm.

```bash
pnpm install
pnpm storybook   # every page and state as a story on http://localhost:6006
```

To preview a single page with `pnpm dev`, uncomment the mock block in `src/main.tsx`.

## Project layout

| Path                                  | Purpose                                                           |
| ------------------------------------- | ----------------------------------------------------------------- |
| `src/login/Template.tsx`              | Page shell: header, language switcher, alerts, footer, background |
| `src/login/KcPage.tsx`                | Maps Keycloak page ids to page components                         |
| `src/login/pages/`                    | One component (plus `.stories.tsx`) per Keycloak page             |
| `src/login/components/`               | Theme building blocks (page header, fields, password input, …)    |
| `src/login/UserProfileFormFields.tsx` | Dynamic user profile form (registration, update profile, …)       |
| `src/components/ui/`                  | Base UI primitives (button, input, checkbox, alert, …)            |
| `src/index.css`                       | Design tokens, animations                                         |

## Building the theme

You need [Maven](https://maven.apache.org/) (>= 3.1.1) and Java (>= 7) to build the `.jar`.

```bash
pnpm build-keycloak-theme
```

The jars are written to `dist_keycloak/`. See the [Keycloakify docs](https://docs.keycloakify.dev/features/compiler-options/keycloakversiontargets) for targeting specific Keycloak versions.

## Releases

The GitHub Actions workflow builds the theme and publishes the jars as release artifacts. To release, bump `version` in `package.json` and push to `main`.
